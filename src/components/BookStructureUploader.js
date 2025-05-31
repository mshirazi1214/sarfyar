import React from 'react';
import { mockBook } from '../mockBookData.js';

function BookStructureUploader({ onSelectLesson }) {
  const [bookStructure, setBookStructure] = React.useState(mockBook);

  const handleFileUpload = (event) => {
    console.log("File upload triggered (not implemented yet)");
  };

  const handleLessonClick = (lessonId, lessonTitle) => { // Accept lessonTitle
    if (onSelectLesson) {
      onSelectLesson(lessonId, lessonTitle); // Pass both id and title
      // Optionally scroll to the lesson display section
      const lessonSection = document.getElementById('lesson-display-section');
      if (lessonSection) {
        lessonSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  const renderLessons = (lessons) => {
    return (
      <ul className="list-none mr-0 pr-4 md:pr-6 space-y-2 mt-2">
        {lessons.map(lesson => (
          <li key={lesson.id} className="text-gray-800 bg-blue-50 p-2 rounded-md shadow-sm hover:bg-blue-100 transition-all duration-150 ease-in-out">
            <button
              onClick={() => handleLessonClick(lesson.id, lesson.title)} // Pass lesson.title here
              className="font-semibold text-blue-700 hover:text-blue-800 hover:underline w-full text-right focus:outline-none focus:ring-2 focus:ring-blue-300 rounded"
              title={`انتخاب درس: ${lesson.title}`}
            >
              {lesson.title}
            </button>
            {lesson.topics && lesson.topics.length > 0 && (
              <ul className="list-disc mr-5 pr-5 space-y-1 mt-1">
                {lesson.topics.map((topic, index) => (
                  <li key={index} className="text-sm text-gray-600">{topic}</li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    );
  };

  const renderChapters = (chapters) => {
    return (
      <div className="space-y-4">
        {chapters.map(chapter => (
          <div key={chapter.id} className="p-4 border border-gray-200 bg-gray-50 rounded-lg shadow-sm">
            <h4 className="text-lg font-bold text-blue-700">{chapter.title}</h4>
            {chapter.lessons && renderLessons(chapter.lessons)}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="p-4 md:p-6 bg-white shadow-xl rounded-xl mt-0 border border-gray-200"> {/* Removed mt-5 for closer integration */}
      <h2 className="text-xl md:text-2xl font-bold text-indigo-700 mb-5 text-center border-b-2 border-indigo-100 pb-3">
        ۱. ساختاردهی خودکار کتاب
      </h2>

      <div className="mb-6 p-4 bg-indigo-50 rounded-lg border border-indigo-200">
        <label htmlFor="file-upload" className="block text-sm font-medium text-gray-700 mb-2">
          انتخاب فایل PDF یا متن درس (فعلاً غیرفعال):
        </label>
        <input
          id="file-upload"
          name="file-upload"
          type="file"
          className="block w-full text-sm text-gray-600 bg-white border border-gray-300 rounded-lg file:mr-0 file:ml-4 file:py-2 file:px-4 file:cursor-pointer file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          onChange={handleFileUpload}
          disabled
        />
        <p className="mt-3 text-xs text-yellow-700 bg-yellow-100 p-3 rounded-md border border-yellow-300">
          <strong>توجه:</strong> قابلیت آپلود و پردازش هوشمند فایل در این مرحله پیاده‌سازی نشده است.
          ساختار کتاب نمایش داده شده در پایین، بر اساس داده‌های نمونه و پیش‌فرض می‌باشد.
        </p>
      </div>

      <div className="mt-8">
        <h3 className="text-lg md:text-xl font-semibold text-gray-800 mb-3 border-b pb-2">
          فهرست کتاب: <span className="text-blue-600">{bookStructure.title}</span>
        </h3>
        <p className="text-sm text-gray-500 mb-3">برای مشاهده محتوای هر درس، روی عنوان آن کلیک کنید.</p>
        {bookStructure.chapters && bookStructure.chapters.length > 0 ? (
          renderChapters(bookStructure.chapters)
        ) : (
          <p className="text-gray-500 p-4 bg-gray-50 rounded-md">
            هنوز ساختاری برای نمایش وجود ندارد یا داده‌های نمونه بارگذاری نشده‌اند.
          </p>
        )}
      </div>
    </div>
  );
}

export default BookStructureUploader;
