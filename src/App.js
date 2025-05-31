// src/App.js
import React from 'react';
import { createRoot } from 'react-dom/client';
import BookStructureUploader from './components/BookStructureUploader.js';
import LessonDisplay from './components/LessonDisplay.js'; // Import the new component

function App() {
  const [selectedLessonId, setSelectedLessonId] = React.useState(null);

  const handleSelectLesson = (lessonId) => {
    setSelectedLessonId(lessonId);
    console.log("Selected Lesson ID in App.js:", lessonId); // For debugging
    // You could add logic here to scroll to the lesson display area if it's far down the page
  };

  return (
    <div dir="rtl" className="font-vazir bg-gray-100 min-h-screen text-gray-800">
      <header className="bg-gradient-to-r from-blue-700 to-indigo-800 text-white p-5 shadow-lg sticky top-0 z-50">
        <h1 className="text-2xl sm:text-3xl font-bold text-center">سامانه صرف‌یار هوشمند طلبه</h1>
      </header>

      <main className="container mx-auto p-4 sm:p-6">
        <BookStructureUploader onSelectLesson={handleSelectLesson} />

        {/* Placeholder for LessonDisplay - will be shown when a lesson is selected */}
        {selectedLessonId && (
          <div id="lesson-display-section" className="mt-8 p-4 md:p-6 bg-white shadow-xl rounded-xl border border-gray-200">
            <h2 className="text-xl md:text-2xl font-bold text-indigo-700 mb-5 text-center border-b-2 border-indigo-100 pb-3">
              ۲. شرح درس و محتوا
            </h2>
            {/* <p className="text-center text-lg">
              درس انتخاب شده: <span className="font-semibold text-blue-600">{selectedLessonId}</span>
            </p>
            <p className="text-center mt-2 text-gray-600">
              (محتوای کامل این درس به‌زودی در اینجا توسط کامپوننت LessonDisplay نمایش داده خواهد شد.)
            </p> */}
            <LessonDisplay lessonId={selectedLessonId} /> {/* Use the LessonDisplay component */}
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
