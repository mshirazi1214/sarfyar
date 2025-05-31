import React from 'react';
import { mockBook } from '../mockBookData.js'; // To get chapters and lessons for selection

// Prop: onStartQuiz (Function to pass selected settings to App.js)
function QuizSetup({ onStartQuiz }) {
  const [selectedLessonIds, setSelectedLessonIds] = React.useState([]);
  const [quizTime, setQuizTime] = React.useState(10); // Default 10 minutes
  const [difficulty, setDifficulty] = React.useState('medium');
  // const [questionTypes, setQuestionTypes] = React.useState(['all']); // Example for future use

  const handleLessonSelection = (lessonId) => {
    setSelectedLessonIds(prevSelected =>
      prevSelected.includes(lessonId)
        ? prevSelected.filter(id => id !== lessonId)
        : [...prevSelected, lessonId]
    );
  };

  const handleStart = () => {
    if (selectedLessonIds.length === 0) {
      alert("لطفاً حداقل یک درس را برای آزمون انتخاب کنید.");
      return;
    }
    if (!quizTime || quizTime <= 0) {
      alert("زمان آزمون باید یک مقدار عددی مثبت باشد.");
      return;
    }
    onStartQuiz({
      lessonIds: selectedLessonIds,
      time: quizTime, // in minutes
      difficulty,
      // questionTypes
    });
  };

  return (
    <div className="quiz-setup p-4 md:p-6 mt-8 bg-white shadow-xl rounded-xl border border-gray-200">
      <h2 className="text-xl md:text-2xl font-bold text-green-700 mb-6 text-center border-b-2 border-green-100 pb-3">
        تنظیمات آزمون جامع
      </h2>

      {/* Lesson Selection */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-700 mb-3">۱. انتخاب مباحث آزمون:</h3>
        <div className="space-y-3 max-h-72 overflow-y-auto p-3 bg-gray-50 border border-gray-200 rounded-md shadow-inner">
          {mockBook.chapters.map(chapter => (
            <div key={chapter.id} className="py-2 mb-2 border-b border-gray-100 last:border-b-0">
              <h4 className="font-semibold text-gray-600 mb-1.5">{chapter.title}</h4>
              <ul className="space-y-1.5 pl-4 rtl:pr-4">
                {chapter.lessons.map(lesson => (
                  <li key={lesson.id}>
                    <label className="flex items-center space-x-2 rtl:space-x-reverse cursor-pointer hover:bg-green-50 p-1.5 rounded-md transition-colors">
                      <input
                        type="checkbox"
                        className="form-checkbox h-5 w-5 text-green-600 border-gray-300 rounded focus:ring-green-500 transition-all duration-150 ease-in-out"
                        checked={selectedLessonIds.includes(lesson.id)}
                        onChange={() => handleLessonSelection(lesson.id)}
                      />
                      <span className="text-gray-700 select-none">{lesson.title}</span>
                    </label>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        {selectedLessonIds.length === 0 && (
            <p className="text-xs text-red-600 mt-1.5">حداقل یک درس باید برای شروع آزمون انتخاب شود.</p>
        )}
      </div>

      {/* Quiz Time */}
      <div className="mb-6">
        <label htmlFor="quiz-time" className="block text-lg font-semibold text-gray-700 mb-2">
          ۲. زمان آزمون (دقیقه):
        </label>
        <input
          type="number"
          id="quiz-time"
          value={quizTime}
          onChange={(e) => setQuizTime(Math.max(1, parseInt(e.target.value, 10) || 1))} // Ensure positive and default to 1 if NaN
          min="1"
          className="w-full md:w-1/3 p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
        />
      </div>

      {/* Difficulty (Visual Only) */}
      <div className="mb-8"> {/* Increased margin bottom */}
        <h3 className="text-lg font-semibold text-gray-700 mb-2">۳. سطح سختی (صرفاً نمایشی):</h3>
        <div className="flex flex-wrap gap-2"> {/* Added gap for better wrapping on small screens */}
          {['آسان', 'متوسط', 'سخت'].map(level => (
            <button
              key={level}
              type="button" // Good practice for buttons not submitting a form
              onClick={() => setDifficulty(level)}
              className={`px-5 py-2.5 border rounded-lg transition-all duration-150 ease-in-out text-sm font-medium
                          ${difficulty === level
                            ? 'bg-green-600 text-white border-green-700 ring-2 ring-offset-1 ring-green-400 shadow-md'
                            : 'bg-white text-gray-700 hover:bg-green-50 hover:border-green-400 border-gray-300'}`}
            >
              {level}
            </button>
          ))}
        </div>
      </div>

      {/* Start Button */}
      <div className="mt-10 text-center border-t border-gray-200 pt-6">
        <button
          type="button"
          onClick={handleStart}
          className="w-full md:w-auto px-10 py-3.5 bg-green-600 text-white font-semibold text-lg rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors shadow-lg hover:shadow-xl disabled:opacity-60 disabled:cursor-not-allowed"
          disabled={selectedLessonIds.length === 0 || !quizTime || quizTime <= 0}
        >
          شروع آزمون
        </button>
      </div>
    </div>
  );
}

export default QuizSetup;
