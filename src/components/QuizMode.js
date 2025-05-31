import React from 'react';
import { mockExercises } from '../mockExercises.js';
import { mockBook } from '../mockBookData.js';

function QuizMode({ quizSettings, onQuizComplete }) {
  const [quizQuestions, setQuizQuestions] = React.useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = React.useState(0);
  const [userAnswers, setUserAnswers] = React.useState({});
  const [timeLeft, setTimeLeft] = React.useState(0);
  const [isQuizFinished, setIsQuizFinished] = React.useState(false);
  const timerIntervalRef = React.useRef(null);

  const [currentSelectedOptionId, setCurrentSelectedOptionId] = React.useState(null);
  const [currentUserTrueFalseAnswer, setCurrentUserTrueFalseAnswer] = React.useState(null);
  const [currentUserFillInput, setCurrentUserFillInput] = React.useState('');

  const [quizResults, setQuizResults] = React.useState(null);

  // Initialize Quiz or Reset
  React.useEffect(() => {
    clearInterval(timerIntervalRef.current);
    if (quizSettings && quizSettings.lessonIds && quizSettings.lessonIds.length > 0) {
      let questions = [];
      quizSettings.lessonIds.forEach(lessonId => {
        if (mockExercises[lessonId]) {
          const questionsWithLessonId = mockExercises[lessonId].map(q => ({...q, lessonIdOrigin: lessonId}));
          questions = questions.concat(questionsWithLessonId);
        }
      });
      questions.sort(() => Math.random() - 0.5);
      setQuizQuestions(questions);

      const initialAnswers = {};
      questions.forEach(q => initialAnswers[q.id] = null); // Store null for unanswered
      setUserAnswers(initialAnswers);

      setTimeLeft(quizSettings.time > 0 ? quizSettings.time * 60 : 10 * 60);
      setCurrentQuestionIndex(0);
      setIsQuizFinished(false);
      setQuizResults(null); // Reset results
    } else {
      setQuizQuestions([]);
      setTimeLeft(0);
      setIsQuizFinished(true);
      setQuizResults(null);
    }
  }, [quizSettings]);

  const calculateResults = React.useCallback(() => {
    let correctCount = 0;
    const detailedResults = quizQuestions.map(question => {
      const userAnswer = userAnswers[question.id];
      let isCorrect = false;
      let correctAnswerDisplay = '';
      let userAnswerDisplay = userAnswer === null ? 'پاسخ نداده' : userAnswer;

      switch (question.type) {
        case 'multiple-choice':
          const correctOption = question.options.find(opt => opt.isCorrect);
          correctAnswerDisplay = correctOption ? correctOption.text : 'نامشخص';
          if (userAnswer && correctOption && userAnswer === correctOption.id) isCorrect = true;
          if (userAnswer) userAnswerDisplay = question.options.find(opt => opt.id === userAnswer)?.text || 'پاسخ نامعتبر';
          break;
        case 'fill-in-the-blank':
          correctAnswerDisplay = question.correctAnswer;
          if (typeof userAnswer === 'string' && userAnswer.trim().toLowerCase() === question.correctAnswer.trim().toLowerCase()) isCorrect = true;
          break;
        case 'true-false':
          correctAnswerDisplay = question.correctAnswer ? (question.options.find(o=>o.isCorrect===true)?.text || 'صحیح') : (question.options.find(o=>o.isCorrect===false)?.text || 'غلط');
          if (userAnswer === question.correctAnswer) isCorrect = true;
          if (userAnswer !== null) userAnswerDisplay = userAnswer ? (question.options.find(o=>o.isCorrect===true)?.text || 'صحیح') : (question.options.find(o=>o.isCorrect===false)?.text || 'غلط');
          break;
        default: break;
      }
      if (isCorrect) correctCount++;
      return { ...question, userAnswer, userAnswerDisplay, isUserCorrect: isCorrect, correctAnswerDisplay };
    });
    return { score: correctCount, totalQuestions: quizQuestions.length, results: detailedResults };
  }, [quizQuestions, userAnswers]);

  const finishQuiz = React.useCallback(() => {
    if(isQuizFinished) return;
    setIsQuizFinished(true);
    clearInterval(timerIntervalRef.current);
    const results = calculateResults();
    setQuizResults(results);
    if (onQuizComplete) onQuizComplete(results);
  }, [isQuizFinished, onQuizComplete, calculateResults]);

  // Timer Logic
  React.useEffect(() => {
    if (isQuizFinished) {
        clearInterval(timerIntervalRef.current);
        return;
    }
    if (timeLeft <= 0 && quizQuestions.length > 0 && !isQuizFinished) {
      finishQuiz();
      return;
    }
    if (timeLeft > 0 && !isQuizFinished && quizQuestions.length > 0) {
      timerIntervalRef.current = setInterval(() => {
        setTimeLeft(prevTime => prevTime - 1);
      }, 1000);
    }
    return () => clearInterval(timerIntervalRef.current);
  }, [timeLeft, isQuizFinished, quizQuestions, finishQuiz]);


  // Load saved answer for current question
  React.useEffect(() => {
    if (quizQuestions.length > 0 && currentQuestionIndex < quizQuestions.length) {
      const currentQ = quizQuestions[currentQuestionIndex];
      const savedAnswer = userAnswers[currentQ.id];

      setCurrentSelectedOptionId(null);
      setCurrentUserTrueFalseAnswer(null);
      setCurrentUserFillInput('');

      if (savedAnswer !== null && savedAnswer !== undefined) {
        if (currentQ.type === 'multiple-choice') setCurrentSelectedOptionId(savedAnswer);
        else if (currentQ.type === 'true-false') setCurrentUserTrueFalseAnswer(savedAnswer);
        else if (currentQ.type === 'fill-in-the-blank') setCurrentUserFillInput(savedAnswer);
      }
    }
  }, [currentQuestionIndex, quizQuestions, userAnswers]);


  const handleOptionChange = (optionId) => setUserAnswers(prev => ({ ...prev, [currentQuestion.id]: optionId }));
  const handleTrueFalseChange = (answerValue) => setUserAnswers(prev => ({ ...prev, [currentQuestion.id]: answerValue }));
  const handleFillInputChange = (event) => setUserAnswers(prev => ({ ...prev, [currentQuestion.id]: event.target.value }));

  const handleNextQuestion = () => (currentQuestionIndex < quizQuestions.length - 1) ? setCurrentQuestionIndex(p => p + 1) : finishQuiz();
  const handlePrevQuestion = () => (currentQuestionIndex > 0) ? setCurrentQuestionIndex(p => p - 1) : null;

  const currentQuestion = quizQuestions[currentQuestionIndex];
  const formatTime = (s) => `${Math.floor(s/60).toString().padStart(2,'0')}:${(s%60).toString().padStart(2,'0')}`;

  // RENDER LOGIC
  if (!quizSettings) return <div className="p-6 text-center">بارگذاری تنظیمات آزمون...</div>;

  if (isQuizFinished && quizResults) {
    return (
      <div className="quiz-results p-4 md:p-6 mt-8 bg-white shadow-xl rounded-xl border border-gray-200">
        <h2 className="text-2xl md:text-3xl font-bold text-center text-green-700 mb-6 pb-3 border-b-2 border-green-100">نتایج آزمون</h2>
        <div className="text-center mb-6 p-4 bg-green-50 rounded-lg border border-green-200">
          <p className="text-xl font-semibold text-gray-700">
            امتیاز شما: <span className="text-3xl text-green-600 font-bold">{quizResults.score}</span> / {quizResults.totalQuestions}
          </p>
          <p className="text-sm text-gray-600 mt-1">
            (درصد موفقیت: {quizResults.totalQuestions > 0 ? ((quizResults.score / quizResults.totalQuestions) * 100).toFixed(1) : 0}%)
          </p>
        </div>
        <div className="mb-8">
          <h3 className="text-xl font-semibold text-gray-700 mb-4">بررسی سوالات:</h3>
          <div className="space-y-3 max-h-[50vh] overflow-y-auto p-2 border rounded-md bg-gray-50">
            {quizResults.results.map((res, index) => (
              <div key={res.id} className={`p-3 border-l-4 rounded-md ${res.isUserCorrect ? 'border-green-500 bg-white' : 'border-red-500 bg-white'}`}>
                <p className="font-medium text-gray-800 mb-1.5 text-sm">سوال {index + 1}: {res.questionText}</p>
                <p className={`text-xs ${res.isUserCorrect ? 'text-green-700' : 'text-red-700'}`}>
                  پاسخ شما: <span className="font-semibold">{res.userAnswerDisplay}</span>
                  {res.isUserCorrect && <span className="ml-2"> &#10004;</span>}{/* Checkmark for correct */}
                </p>
                {!res.isUserCorrect && (
                  <p className="text-xs text-blue-600">پاسخ صحیح: <span className="font-semibold">{res.correctAnswerDisplay}</span></p>
                )}
              </div>
            ))}
          </div>
        </div>
        <div className="mb-8 p-4 bg-blue-50 rounded-lg border border-blue-200">
          <h3 className="text-lg font-semibold text-blue-700 mb-2">&#128161; توصیه‌های هوشمند (نمونه):</h3>
          <ul className="list-disc list-inside text-sm text-gray-600 space-y-1.5 pl-2">
            <li>مرور مجدد مباحثی که در آن‌ها پاسخ نادرست داده‌اید، توصیه می‌شود.</li>
            <li>از بخش تمرینات تعاملی برای تقویت نقاط ضعف خود استفاده کنید.</li>
            <li>در صورت نیاز، به متن اصلی درس مراجعه کرده و توضیحات را با دقت بیشتری مطالعه فرمایید.</li>
          </ul>
        </div>
        <div className="text-center space-y-3 mt-6">
          <button onClick={() => alert("قابلیت دانلود کارنامه (PDF) به‌زودی اضافه خواهد شد!")}
            className="w-full sm:w-auto px-6 py-2.5 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors shadow-md hover:shadow-lg">
            دانلود کارنامه (PDF) - به‌زودی
          </button>
          {/* App.js will handle navigation away via onQuizComplete if needed */}
        </div>
      </div>
    );
  }

  if (quizQuestions.length === 0 && !isQuizFinished) {
     return <div className="p-6 bg-yellow-100 text-yellow-800 rounded-xl mt-8 text-center border border-yellow-300 shadow-md">در حال آماده‌سازی سوالات یا تنظیمات آزمون نامعتبر است. لطفاً از انتخاب مبحث اطمینان حاصل کنید.</div>;
  }

  const renderQuestionTypeUI = (question) => {
    if (!question) return null;
    switch (question.type) {
      case 'multiple-choice':
        return (
          <div className="space-y-3 mt-5">
            {question.options.map((option) => (
              <button key={option.id} onClick={() => handleOptionChange(option.id)}
                className={`w-full text-right p-3.5 border rounded-lg transition-all duration-150
                            ${currentSelectedOptionId === option.id ? 'bg-indigo-100 border-indigo-500 ring-2 ring-indigo-300 text-indigo-700' : 'bg-white hover:bg-indigo-50 border-gray-300 text-gray-700'}`}>
                {option.text}
              </button>
            ))}
          </div>
        );
      case 'fill-in-the-blank':
        return (
          <div className="mt-5">
            <input type="text" value={currentUserFillInput} onChange={handleFillInputChange}
                   placeholder={question.placeholder || "پاسخ خود را بنویسید..."}
                   className="w-full p-3.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400 focus:border-indigo-500 transition-colors bg-white"/>
          </div>
        );
      case 'true-false':
        return (
          <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4 sm:rtl:space-x-reverse mt-5">
            {question.options.map((option) => (
              <button key={option.id} onClick={() => handleTrueFalseChange(option.isCorrect)}
                className={`flex-1 p-3.5 border rounded-lg transition-all duration-150
                            ${currentUserTrueFalseAnswer === option.isCorrect && currentUserTrueFalseAnswer !== null ? 'bg-indigo-100 border-indigo-500 ring-2 ring-indigo-300 text-indigo-700' : 'bg-white hover:bg-gray-50 border-gray-300 text-gray-700'}`}>
                {option.text}
              </button>
            ))}
          </div>
        );
      default: return <p className="text-red-500 mt-4">نوع سوال ناشناخته</p>;
    }
  };

  return (
    <div className="quiz-mode p-4 md:p-6 mt-8 bg-white shadow-xl rounded-xl border border-gray-200">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 pb-4 border-b-2 border-gray-200 gap-3">
        <h2 className="text-xl md:text-2xl font-bold text-purple-700 truncate max-w-md">
          آزمون: {quizSettings.lessonIds.map(id => mockBook.chapters.flatMap(c => c.lessons).find(l => l.id === id)?.title || id).join('، ') || "عمومی"}
        </h2>
        <div className={`text-lg font-semibold px-4 py-2 rounded-lg shadow-sm ${timeLeft < 60 && timeLeft > 0 ? 'text-red-700 bg-red-100 animate-pulse' : timeLeft === 0 ? 'text-gray-600 bg-gray-200' : 'text-blue-700 bg-blue-100'}`}>
          زمان: {formatTime(timeLeft)}
        </div>
      </div>

      {currentQuestion ? (
        <div>
          <div className="flex justify-between items-center mb-3 text-sm text-gray-600">
            <span>سوال {currentQuestionIndex + 1} از {quizQuestions.length}</span>
          </div>
          <div className="p-5 border border-purple-200 rounded-lg bg-gray-50 shadow-md mb-6">
            <p className="font-semibold text-lg text-gray-800 leading-relaxed">{currentQuestion.questionText}</p>
            <p className="mt-2 text-xs text-purple-500">(نوع سوال: {currentQuestion.type})</p>
            {renderQuestionTypeUI(currentQuestion)}
          </div>
          <div className="mt-8 flex flex-col sm:flex-row justify-between items-center gap-3">
            <button onClick={handlePrevQuestion} disabled={currentQuestionIndex === 0}
                    className="px-6 py-2.5 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed w-full sm:w-auto">
              &rarr; سوال قبلی
            </button>
            {currentQuestionIndex < quizQuestions.length - 1 ? (
              <button onClick={handleNextQuestion}
                      className="px-8 py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors w-full sm:w-auto">
                سوال بعدی &larr;
              </button>
            ) : (
              <button onClick={finishQuiz}
                      className="px-8 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors w-full sm:w-auto">
                پایان آزمون و مشاهده نتایج
              </button>
            )}
          </div>
        </div>
      ) : (
        <p className="text-center text-gray-500 py-5">بارگذاری سوال...</p>
      )}
    </div>
  );
}

export default QuizMode;
''')
