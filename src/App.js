// src/App.js
import React from 'react';
import { createRoot } from 'react-dom/client';
import BookStructureUploader from './components/BookStructureUploader.js';
import LessonDisplay from './components/LessonDisplay.js';
import InteractiveExercises from './components/InteractiveExercises.js'; // Import the exercises component

function App() {
  const [selectedLessonId, setSelectedLessonId] = React.useState(null);
  const [selectedLessonTitle, setSelectedLessonTitle] = React.useState('');

  const handleSelectLesson = (lessonId, lessonTitle) => {
    setSelectedLessonId(lessonId);
    setSelectedLessonTitle(lessonTitle);
    console.log("Selected Lesson ID in App.js:", lessonId, "Title:", lessonTitle);
    // Optionally, scroll to the lesson display section after a short delay to allow rendering
    setTimeout(() => {
        const lessonSection = document.getElementById('lesson-content-and-exercises-wrapper');
        if (lessonSection) {
            lessonSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }, 100);
  };

  return (
    <div dir="rtl" className="font-vazir bg-gray-100 min-h-screen text-gray-800">
      <header className="bg-gradient-to-r from-blue-700 to-indigo-800 text-white p-5 shadow-lg sticky top-0 z-50">
        <h1 className="text-2xl sm:text-3xl font-bold text-center">سامانه صرف‌یار هوشمند طلبه</h1>
      </header>

      <main className="container mx-auto p-4 sm:p-6">
        <BookStructureUploader onSelectLesson={handleSelectLesson} />

        {selectedLessonId && (
          <div id="lesson-content-and-exercises-wrapper" className="mt-8 space-y-8"> {/* Wrapper & space between sections */}
            <div id="lesson-display-section" className="p-4 md:p-6 bg-white shadow-xl rounded-xl border border-gray-200">
              <h2 className="text-xl md:text-2xl font-bold text-indigo-700 mb-5 text-center border-b-2 border-indigo-100 pb-3">
                ۲. شرح درس و محتوا
              </h2>
              <LessonDisplay lessonId={selectedLessonId} />
            </div>

            {/* Interactive Exercises Section is now a sibling, benefiting from the wrapper's spacing */}
            {/* It will have its own styling for margin-top etc. as defined in InteractiveExercises.js, so mt-8 on wrapper is good */}
            <InteractiveExercises lessonId={selectedLessonId} lessonTitle={selectedLessonTitle} />
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
