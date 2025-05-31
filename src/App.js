// src/App.js
import React from 'react';
import { createRoot } from 'react-dom/client';
import BookStructureUploader from './components/BookStructureUploader.js';
import LessonDisplay from './components/LessonDisplay.js';
import InteractiveExercises from './components/InteractiveExercises.js';
import QuizSetup from './components/QuizSetup.js';
import QuizMode from './components/QuizMode.js'; // Import QuizMode

// Define view modes
const VIEW_MODES = {
  LESSON_MODE: 'lesson_mode', // Default mode for lessons and exercises
  QUIZ_SETUP_MODE: 'quiz_setup_mode',
  QUIZ_MODE: 'quiz_mode',
};

function App() {
  const [currentView, setCurrentView] = React.useState(VIEW_MODES.LESSON_MODE);
  const [selectedLessonId, setSelectedLessonId] = React.useState(null);
  const [selectedLessonTitle, setSelectedLessonTitle] = React.useState('');
  const [highlightInfo, setHighlightInfo] = React.useState(null);
  const [quizSettings, setQuizSettings] = React.useState(null); // To store settings from QuizSetup

  const handleSelectLesson = (lessonId, lessonTitle) => {
    setSelectedLessonId(lessonId);
    setSelectedLessonTitle(lessonTitle);
    setHighlightInfo(null);
    setCurrentView(VIEW_MODES.LESSON_MODE); // Ensure we are in lesson mode when a lesson is selected
    setTimeout(() => {
        const lessonWrapper = document.getElementById('lesson-content-and-exercises-wrapper');
        if (lessonWrapper) {
            lessonWrapper.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }, 100);
  };

  const handleNavigateToLessonSection = (reference) => {
    if (reference) {
      setHighlightInfo({ key: reference.topicKey, text: reference.displayText });
      setCurrentView(VIEW_MODES.LESSON_MODE); // Switch to lesson mode to see the highlight
      setTimeout(() => {
        const lessonDisplayElement = document.getElementById('lesson-display-component');
        if (lessonDisplayElement) {
           lessonDisplayElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 50);
    }
  };

  const handleStartQuiz = (settings) => {
    console.log("Quiz settings received in App.js:", settings);
    setQuizSettings(settings);
    setCurrentView(VIEW_MODES.QUIZ_MODE);
  };

  const handleQuizComplete = (answers, questions) => {
    console.log("Quiz complete in App.js!", { answers, questions });
    // Here you would typically calculate score, store results, and perhaps navigate to a results view
    // For now, just switch back to lesson mode or quiz setup
    alert(`آزمون تمام شد! شما به ${Object.keys(answers).length} سوال از ${questions.length} سوال پاسخ دادید. (جزئیات نتایج در آینده)`);
    setCurrentView(VIEW_MODES.QUIZ_SETUP_MODE); // Or LESSON_MODE
  };

  const renderContent = () => {
    switch (currentView) {
      case VIEW_MODES.QUIZ_SETUP_MODE:
        return <QuizSetup onStartQuiz={handleStartQuiz} />;
      case VIEW_MODES.QUIZ_MODE:
        if (!quizSettings) {
          // Should not happen if logic is correct, but as a fallback
          alert("خطا: تنظیمات آزمون یافت نشد. بازگشت به صفحه تنظیمات.");
          setCurrentView(VIEW_MODES.QUIZ_SETUP_MODE);
          return <QuizSetup onStartQuiz={handleStartQuiz} />;
        }
        return <QuizMode quizSettings={quizSettings} onQuizComplete={handleQuizComplete} />;
      case VIEW_MODES.LESSON_MODE:
      default:
        return (
          <>
            <BookStructureUploader onSelectLesson={handleSelectLesson} />
            {selectedLessonId && (
              <div id="lesson-content-and-exercises-wrapper" className="mt-8 space-y-8">
                <div id="lesson-display-section-container" className="p-0 rounded-xl">
                  <LessonDisplay lessonId={selectedLessonId} highlightInfo={highlightInfo} />
                </div>
                <InteractiveExercises
                  lessonId={selectedLessonId}
                  lessonTitle={selectedLessonTitle}
                  onNavigateToLessonSection={handleNavigateToLessonSection}
                />
              </div>
            )}
          </>
        );
    }
  };

  return (
    <div dir="rtl" className="font-vazir bg-gray-100 min-h-screen text-gray-800">
      <header className="bg-gradient-to-r from-blue-700 to-indigo-800 text-white p-6 shadow-lg sticky top-0 z-50">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl sm:text-3xl font-bold">سامانه صرف‌یار هوشمند طلبه</h1>
          <nav>
            <button
              onClick={() => { setSelectedLessonId(null); setCurrentView(VIEW_MODES.LESSON_MODE); }} // Clear selection and go to lesson browser
              className={`px-4 py-2 rounded-md text-sm font-medium mr-2 transition-colors
                          ${currentView === VIEW_MODES.LESSON_MODE && !selectedLessonId ? 'bg-white text-indigo-700' : 'text-white hover:bg-indigo-500'}`}
            >
              فهرست دروس
            </button>
            <button
              onClick={() => setCurrentView(VIEW_MODES.QUIZ_SETUP_MODE)}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors
                          ${currentView === VIEW_MODES.QUIZ_SETUP_MODE ? 'bg-white text-indigo-700' : 'text-white hover:bg-indigo-500'}`}
            >
              آزمون جامع
            </button>
          </nav>
        </div>
      </header>

      <main className="container mx-auto p-4 sm:p-6">
        {renderContent()}
      </main>

      <footer className="bg-gray-900 text-white text-center p-6 mt-12">
        <p>&copy; ۱۴۰۲ - تمامی حقوق برای صرف‌یار هوشمند محفوظ است.</p>
        <p className="text-sm text-gray-400 mt-1">با همکاری تیم توسعه جهادی</p>
      </footer>
    </div>
  );
}

const container = document.getElementById('root');
if (container) {
  const root = createRoot(container);
  root.render(<App />);
} else {
  console.error('Root element not found. React app could not be mounted.');
}
