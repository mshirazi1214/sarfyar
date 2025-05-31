import React from 'react';
import { createRoot } from 'react-dom/client';
import BookStructureUploader from './components/BookStructureUploader.js'; // Import the new component

function App() {
    return (
        <div className="container mx-auto mt-10 p-5 bg-white shadow-lg rounded-lg">
            <header className="text-center mb-10">
                <h1 className="text-4xl font-bold text-blue-700 mb-2">صرف‌یار هوشمند</h1>
                <p className="text-lg text-gray-600">ابزاری برای ساختاردهی و تمرین صرف افعال فارسی</p>
            </header>

            <main>
                {/* Section 1: Book Structure Uploader */}
                <BookStructureUploader />

                {/* Placeholder for Section 2: Interactive Conjugation Practice (will be a new component) */}
                <div className="p-6 bg-white shadow-md rounded-lg mt-8">
                    <h2 className="text-2xl font-semibold text-gray-700 mb-4 text-center">۲. تمرین تعاملی صرف</h2>
                    <p className="text-gray-600 text-center">
                        (بخش تمرین تعاملی در اینجا پس از انتخاب درس از ساختار بالا فعال خواهد شد.)
                    </p>
                </div>
            </main>

            <footer className="text-center mt-12 py-4 border-t border-gray-200">
                <p className="text-sm text-gray-500">
                    ساخته شده با React و Tailwind CSS - نسخه اولیه
                </p>
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
