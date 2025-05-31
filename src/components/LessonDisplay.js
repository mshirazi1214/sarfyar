import React from 'react';
import { mockLessonsContent } from '../mockLessonContent.js';

function LessonDisplay({ lessonId }) {
  const [lessonContent, setLessonContent] = React.useState(null);
  const [error, setError] = React.useState('');

  React.useEffect(() => {
    if (lessonId) {
      const content = mockLessonsContent[lessonId];
      if (content) {
        setLessonContent(content);
        setError('');
      } else {
        setLessonContent(null);
        setError(`متأسفانه، محتوایی برای درس با شناسه "${lessonId}" یافت نشد. لطفاً از صحت داده‌های نمونه اطمینان حاصل کنید.`);
        console.warn(`No content found for lessonId: ${lessonId} in mockLessonsContent.`);
      }
    } else {
      setLessonContent(null);
      setError('');
    }
  }, [lessonId]);

  if (!lessonId) return null;

  if (error) {
    return <div className="p-4 my-4 text-red-700 bg-red-100 border border-red-300 rounded-lg shadow-md">{error}</div>;
  }

  if (!lessonContent) {
    return <div className="p-4 my-4 text-orange-700 bg-orange-100 border border-orange-300 rounded-lg shadow-md">در حال بارگذاری محتوای درس...</div>;
  }

  const { title, summary, examples, conjugationTable, vocabulary, interactiveElements } = lessonContent;

  return (
    <div className="lesson-display p-4 md:p-6 bg-white rounded-xl shadow-xl border border-gray-200"> {/* Added rounded-xl and border */}
      {/* Lesson Title */}
      <h1 className="text-2xl md:text-3xl font-bold text-indigo-800 mb-6 border-b-2 border-indigo-100 pb-4"> {/* Enhanced title style */}
        {title}
      </h1>

      {/* Summary Section */}
      {summary && (
        <section className="mb-8 p-4 bg-gray-50 rounded-lg border border-gray-200">
          <h2 className="text-xl font-semibold text-gray-700 mb-3 flex items-center">
            <svg className="w-5 h-5 mr-2 text-indigo-500" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor"><path d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
            خلاصه درس:
          </h2>
          <p className="text-gray-600 leading-relaxed whitespace-pre-line text-justify">{summary}</p>
        </section>
      )}

      {/* Examples Section */}
      {examples && examples.length > 0 && (
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-700 mb-4 flex items-center">
            <svg className="w-5 h-5 mr-2 text-green-500" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor"><path d="M9.663 17h4.673M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path><path d="M14.999 9.001H15M8.999 9.001H9"></path></svg>
            مثال‌ها:
          </h2>
          <ul className="space-y-4">
            {examples.map((example, index) => (
              <li key={index} className="p-4 bg-green-50 border-r-4 border-green-600 rounded-md shadow-sm hover:shadow-md transition-shadow">
                <p className="font-medium text-gray-800 text-lg">{example.text}</p>
                {example.note && <p className="text-sm text-green-700 mt-1.5">{example.note}</p>}
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Conjugation Table Section */}
      {conjugationTable && (
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-700 mb-4 flex items-center">
            <svg className="w-5 h-5 mr-2 text-blue-500" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor"><path d="M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"></path></svg>
            {conjugationTable.title || "جدول صرف:"}
          </h2>
          <div className="overflow-x-auto shadow-md rounded-lg border border-gray-200">
            <table className="min-w-full w-full bg-white">
              <thead className="bg-gray-100">
                <tr>
                  {conjugationTable.headers && conjugationTable.headers.map((header, index) => (
                    <th key={index} className="px-5 py-3 border-b-2 border-gray-200 text-right text-sm font-semibold text-gray-600 uppercase tracking-wider">{header}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {conjugationTable.rows && conjugationTable.rows.map((row, rowIndex) => (
                  <tr key={rowIndex} className={`transition-colors duration-150 ${rowIndex % 2 === 0 ? 'bg-white' : 'bg-blue-50'} hover:bg-blue-100`}>
                    <td className="px-5 py-3 border-b border-gray-200 text-sm font-medium text-gray-800">{row.person}</td>
                    <td className="px-5 py-3 border-b border-gray-200 text-sm text-gray-700">{row.singular}</td>
                    <td className="px-5 py-3 border-b border-gray-200 text-sm text-gray-700">{row.plural}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {conjugationTable.imagePlaceholder && (
            <p className="text-xs text-gray-500 mt-2 italic">
              (نمایش گرافیکی جدول از فایل: {conjugationTable.imagePlaceholder} در آینده امکان‌پذیر خواهد بود)
            </p>
          )}
        </section>
      )}

      {/* Vocabulary Section */}
      {vocabulary && vocabulary.length > 0 && (
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-700 mb-4 flex items-center">
            <svg className="w-5 h-5 mr-2 text-yellow-500" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor"><path d="M12 6.253v11.494m0 0A8.001 8.001 0 0012 20.253a8.001 8.001 0 000-15.001A8.001 8.001 0 0012 6.253z"></path><path d="M12 6.253V3.75m0 2.5A8.001 8.001 0 0112 3.75m0 0A8.001 8.001 0 0120.253 12 8.001 8.001 0 0112 20.253m0-2.5A8.001 8.001 0 0012 20.253m0 0A8.001 8.001 0 003.75 12 8.001 8.001 0 0012 3.75M12 20.253v2.5"></path></svg>
            واژگان کلیدی:
          </h2>
          <ul className="space-y-3">
            {vocabulary.map((item, index) => (
              <li key={index} className="p-4 bg-yellow-50 border-r-4 border-yellow-500 rounded-md shadow-sm hover:shadow-md transition-shadow">
                <strong className="text-yellow-800 font-semibold">{item.word}:</strong>
                <span className="text-gray-700 ml-2 text-justify">{item.explanation}</span>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Interactive Elements Placeholders */}
      {interactiveElements && (
        <section className="mt-10 pt-6 border-t-2 border-gray-100">
          <h2 className="text-lg font-semibold text-gray-700 mb-4 flex items-center">
            <svg className="w-5 h-5 mr-2 text-purple-500" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor"><path d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"></path><path d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
            ابزارهای تعاملی (ویژه کاربران):
          </h2>
          <div className="flex flex-wrap gap-3 items-center">
            {interactiveElements.highlightEnabled && (
              <button className="px-4 py-2 bg-yellow-400 text-yellow-800 rounded-lg hover:bg-yellow-500 transition-colors text-sm font-medium shadow-sm hover:shadow-md disabled:opacity-60 disabled:cursor-not-allowed" disabled>
                نشانه‌گذاری متن (به‌زودی)
              </button>
            )}
            {interactiveElements.audioAvailable && (
              <button className="px-4 py-2 bg-teal-400 text-teal-800 rounded-lg hover:bg-teal-500 transition-colors text-sm font-medium shadow-sm hover:shadow-md disabled:opacity-60 disabled:cursor-not-allowed" disabled>
                پخش صوتی خلاصه (به‌زودی)
              </button>
            )}
            {interactiveElements.downloadOptions && interactiveElements.downloadOptions.length > 0 && (
              interactiveElements.downloadOptions.map(option => (
                <button key={option} className="px-4 py-2 bg-purple-400 text-purple-800 rounded-lg hover:bg-purple-500 transition-colors text-sm font-medium shadow-sm hover:shadow-md disabled:opacity-60 disabled:cursor-not-allowed" disabled>
                  دانلود {option} (به‌زودی)
                </button>
              ))
            )}
          </div>
        </section>
      )}
    </div>
  );
}

export default LessonDisplay;
