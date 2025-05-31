// src/App.js
import React from 'react';
import { createRoot } from 'react-dom/client';
import BookStructureUploader from './components/BookStructureUploader.js';
import LessonDisplay from './components/LessonDisplay.js';
import InteractiveExercises from './components/InteractiveExercises.js';

function App() {
  const [selectedLessonId, setSelectedLessonId] = React.useState(null);
  const [selectedLessonTitle, setSelectedLessonTitle] = React.useState('');
  const [highlightInfo, setHighlightInfo] = React.useState(null); // { key, text } for highlighting in LessonDisplay

  const handleSelectLesson = (lessonId, lessonTitle) => {
    setSelectedLessonId(lessonId);
    setSelectedLessonTitle(lessonTitle);
    setHighlightInfo(null); // Clear any previous highlight
    setTimeout(() => {
        const lessonWrapper = document.getElementById('lesson-content-and-exercises-wrapper');
        if (lessonWrapper) {
            lessonWrapper.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }, 100);
  };

  const handleNavigateToLessonSection = (reference) => { // reference = { lessonId (optional, for validation), topicKey, displayText }
    if (reference) {
      // Assuming navigation is within the currently selected lesson, so selectedLessonId is the target.
      // If reference.lessonId is provided, you could add a check: if (reference.lessonId === selectedLessonId)
      setHighlightInfo({ key: reference.topicKey, text: reference.displayText });

      setTimeout(() => {
        const lessonDisplayContainer = document.getElementById('lesson-display-section-container'); // This is the main container for LessonDisplay
        if (lessonDisplayContainer) {
          // The actual scrolling to the specific sub-section (e.g. summary, examples)
          // will be handled *within* LessonDisplay.js via its own useEffect watching highlightInfo.
          // App.js just needs to ensure LessonDisplay itself is visible.
          // If LessonDisplay is already visible, this scroll might be redundant or could be to the top of LessonDisplay.
          // For now, let's ensure the overall LessonDisplay container is in view.
          const lessonDisplayElement = document.getElementById('lesson-display-component'); // Assuming LessonDisplay's root div has this ID
          if (lessonDisplayElement) {
             lessonDisplayElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
          } else {
             lessonDisplayContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }
      }, 50);
    }
  };

  return (
    <div dir="rtl" className="font-vazir bg-gray-100 min-h-screen text-gray-800">
      <header className="bg-gradient-to-r from-blue-700 to-indigo-800 text-white p-5 shadow-lg sticky top-0 z-50">
        <h1 className="text-2xl sm:text-3xl font-bold text-center">سامانه صرف‌یار هوشمند طلبه</h1>
      </header>

      <main className="container mx-auto p-4 sm:p-6">
        <BookStructureUploader onSelectLesson={handleSelectLesson} />

        {selectedLessonId && (
          <div id="lesson-content-and-exercises-wrapper" className="mt-8 space-y-8">
            {/* The lesson-display-section-container helps group title + content if title were here */}
            <div id="lesson-display-section-container" className="p-0 rounded-xl">
              {/* LessonDisplay now handles its own outer styling including p-4/p-6, bg, shadow etc. */}
              <LessonDisplay lessonId={selectedLessonId} highlightInfo={highlightInfo} />
            </div>

            <InteractiveExercises
              lessonId={selectedLessonId}
              lessonTitle={selectedLessonTitle}
              onNavigateToLessonSection={handleNavigateToLessonSection}
            />
          </div>
        )}
      </main>

      <footer className="bg-gray-900 text-white text-center p-5 mt-10">
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
