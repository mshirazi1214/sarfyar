import React from 'react';
import { mockBook } from '../mockBookData.js'; // Import mock data

function BookStructureUploader() {
  const [bookStructure, setBookStructure] = React.useState(mockBook); // Use mock data

  const handleFileUpload = (event) => {
    // Placeholder for file handling logic
    console.log("File upload triggered (not implemented yet)");
    // Actual file processing logic will be complex and likely require
    // a backend or WebAssembly for PDF parsing, which is out of scope for this step.
  };

  // Helper function to render lessons and topics
  const renderLessons = (lessons) => {
    return (
      <ul className="list-none mr-0 pr-4 md:pr-6 space-y-2 mt-2">
        {lessons.map(lesson => (
          <li key={lesson.id} className="text-gray-800 bg-blue-50 p-2 rounded-md">
            <span className="font-semibold">{lesson.title}</span>
            {lesson.topics && lesson.topics.length > 0 && (
              <ul className="list-disc mr-5 pr-5 space-y-1 mt-1">
                {lesson.topics.map((topic, index) => (
                  <li key={index} className="text-sm text-gray-700">{topic}</li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    );
  };

  // Helper function to render chapters
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
    <div className="p-4 md:p-6 bg-white shadow-lg rounded-xl mt-5 border border-gray-200">
      <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-5 text-center border-b pb-3">
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
          ساختار کتاب: <span className="text-blue-600">{bookStructure.title}</span>
        </h3>
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
