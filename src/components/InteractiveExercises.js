import React from 'react';
import { mockExercises } from '../mockExercises.js';

function InteractiveExercises({ lessonId, lessonTitle }) {
  const [lessonExercises, setLessonExercises] = React.useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = React.useState(0);
  const [feedback, setFeedback] = React.useState({ message: '', type: '' });
  const [score, setScore] = React.useState(0);
  const [showFeedback, setShowFeedback] = React.useState(false);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = React.useState(false);
  const [error, setError] = React.useState('');

  const [selectedOptionId, setSelectedOptionId] = React.useState(null);
  const [userTrueFalseAnswer, setUserTrueFalseAnswer] = React.useState(null);
  const [userFillInput, setUserFillInput] = React.useState('');

  React.useEffect(() => {
    if (lessonId) {
      const exercises = mockExercises[lessonId] || [];
      if (exercises.length > 0) {
        setLessonExercises(exercises);
        setError('');
      } else {
        setLessonExercises([]);
        setError(`متأسفانه، تمرینی برای این درس (${lessonTitle || lessonId}) یافت نشد.`);
      }
      setCurrentQuestionIndex(0);
      setSelectedOptionId(null);
      setUserTrueFalseAnswer(null);
      setUserFillInput('');
      setFeedback({ message: '', type: '' });
      setShowFeedback(false);
      setIsAnswerSubmitted(false);
      setScore(0);
    } else {
      setLessonExercises([]);
      setError('');
    }
  }, [lessonId, lessonTitle]);

  const currentQuestion = lessonExercises[currentQuestionIndex];

  const handleOptionChange = (optionId) => {
    if (isAnswerSubmitted) return;
    setSelectedOptionId(optionId);
  };

  const handleTrueFalseChange = (answerValue) => {
    if (isAnswerSubmitted) return;
    setUserTrueFalseAnswer(answerValue);
  };

  const handleFillInputChange = (event) => {
    if (isAnswerSubmitted) return;
    setUserFillInput(event.target.value);
  };

  const handleSubmitAnswer = () => {
    if (isAnswerSubmitted || !currentQuestion) return;

    let isCorrect = false;
    let correctAnswerText = '';

    switch (currentQuestion.type) {
      case 'multiple-choice':
        const correctOption = currentQuestion.options.find(opt => opt.isCorrect);
        correctAnswerText = correctOption ? correctOption.text : 'گزینه صحیح نامشخص';
        if (selectedOptionId && correctOption && selectedOptionId === correctOption.id) {
          isCorrect = true;
        }
        break;
      case 'fill-in-the-blank':
        correctAnswerText = currentQuestion.correctAnswer;
        if (userFillInput.trim().toLowerCase() === currentQuestion.correctAnswer.trim().toLowerCase()) { // Case-insensitive comparison
          isCorrect = true;
        }
        break;
      case 'true-false':
        correctAnswerText = currentQuestion.correctAnswer ?
                              (currentQuestion.options.find(o => o.isCorrect === true)?.text || 'صحیح') :
                              (currentQuestion.options.find(o => o.isCorrect === false)?.text || 'غلط');
        if (userTrueFalseAnswer === currentQuestion.correctAnswer) {
          isCorrect = true;
        }
        break;
      default:
        setFeedback({ message: 'خطا: نوع سوال برای بررسی پاسخ نامشخص است.', type: 'incorrect'});
        setShowFeedback(true);
        setIsAnswerSubmitted(true);
        return;
    }

    if (isCorrect) {
      setScore(prevScore => prevScore + 1);
      setFeedback({ message: 'آفرین! پاسخ شما صحیح است.', type: 'correct' });
    } else {
      let incorrectMsg = `متاسفانه پاسخ شما صحیح نبود. پاسخ صحیح: <strong class="font-bold">"${correctAnswerText}"</strong> بود.`;
      if (currentQuestion.hint) {
        incorrectMsg += `<br/>راهنمایی: ${currentQuestion.hint}`;
      }
      setFeedback({ message: incorrectMsg, type: 'incorrect' });
    }

    setShowFeedback(true);
    setIsAnswerSubmitted(true);
  };

  const handleNextQuestion = () => {
    if (!isAnswerSubmitted) return;

    if (currentQuestionIndex < lessonExercises.length - 1) {
      setCurrentQuestionIndex(prevIndex => prevIndex + 1);
      setSelectedOptionId(null);
      setUserTrueFalseAnswer(null);
      setUserFillInput('');
      setShowFeedback(false);
      setIsAnswerSubmitted(false);
      setFeedback({ message: '', type: '' });
    } else {
      // This state (all questions done) is handled by the top-level conditional rendering
      // Trigger re-render to show completion message if it's the last question
      setCurrentQuestionIndex(prevIndex => prevIndex + 1);
      console.log("All questions completed. Final score:", score);
    }
  };

  const renderQuestionType = () => {
    if (!currentQuestion) return null;
    // Visual feedback styles
    const getOptionStyle = (option) => {
        if (!isAnswerSubmitted || !showFeedback) return ''; // No specific style if not submitted or no feedback yet
        if (option.isCorrect) return '!bg-green-100 !border-green-400 !text-green-700 ring-1 ring-green-300'; // Correct option style

        // For multiple-choice or true-false, if this option was selected and it's incorrect
        if (currentQuestion.type === 'multiple-choice' && selectedOptionId === option.id && !option.isCorrect) {
          return '!bg-red-100 !border-red-400 !text-red-700 ring-1 ring-red-300'; // User's incorrect selection
        }
        if (currentQuestion.type === 'true-false' && userTrueFalseAnswer === option.isCorrect && !option.isCorrect) {
            return '!bg-red-100 !border-red-400 !text-red-700 ring-1 ring-red-300'; // User's incorrect selection for T/F
        }
        return 'opacity-60 hover:opacity-80'; // Dim unselected, non-correct options after feedback
    };
    const getInputStyle = () => {
        if (!isAnswerSubmitted || !showFeedback) return '';
        const isFillCorrect = userFillInput.trim().toLowerCase() === currentQuestion.correctAnswer.trim().toLowerCase();
        if (isFillCorrect) return '!bg-green-100 !border-green-400 !text-green-700';
        return '!bg-red-100 !border-red-400 !text-red-700';
    };


    switch (currentQuestion.type) {
      case 'multiple-choice':
        return (
          <div className="space-y-3 mt-5">
            {currentQuestion.options.map((option) => (
              <button
                key={option.id}
                onClick={() => handleOptionChange(option.id)}
                className={`w-full text-right p-3.5 border rounded-lg transition-all duration-150
                            ${selectedOptionId === option.id && !isAnswerSubmitted ? 'bg-purple-100 border-purple-500 ring-2 ring-purple-400 shadow-md text-purple-700' : 'bg-white hover:bg-purple-50 hover:border-purple-300 border-gray-300 text-gray-700'}
                            ${isAnswerSubmitted ? 'cursor-not-allowed ' + getOptionStyle(option) : 'cursor-pointer'}`}
                disabled={isAnswerSubmitted}
              >
                {option.text}
              </button>
            ))}
          </div>
        );
      case 'fill-in-the-blank':
        return (
          <div className="mt-5">
            <input
              type="text"
              value={userFillInput}
              onChange={handleFillInputChange}
              placeholder={currentQuestion.placeholder || "پاسخ خود را بنویسید..."}
              className={`w-full p-3.5 border rounded-lg focus:ring-2 focus:ring-purple-400 focus:border-purple-500 transition-colors
                          ${isAnswerSubmitted ? 'cursor-not-allowed ' + getInputStyle() : 'bg-white border-gray-300'}`}
              disabled={isAnswerSubmitted}
            />
          </div>
        );
      case 'true-false':
        return (
          <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4 sm:rtl:space-x-reverse mt-5">
            {currentQuestion.options.map((option) => (
              <button
                key={option.id}
                onClick={() => handleTrueFalseChange(option.isCorrect)}
                className={`flex-1 p-3.5 border rounded-lg transition-all duration-150
                            ${userTrueFalseAnswer === option.isCorrect && userTrueFalseAnswer !== null && !isAnswerSubmitted ? 'bg-purple-100 border-purple-500 ring-2 ring-purple-400 text-purple-700' : 'bg-white hover:bg-gray-50 border-gray-300 text-gray-700'}
                            ${isAnswerSubmitted ? 'cursor-not-allowed ' + getOptionStyle(option) : 'cursor-pointer '}`}
                disabled={isAnswerSubmitted}
              >
                {option.text}
              </button>
            ))}
          </div>
        );
      default:
        return <p className="text-red-500 mt-4">نوع سوال ناشناخته: {currentQuestion.type}</p>;
    }
  };

  const isSubmitDisabled = () => {
    if (isAnswerSubmitted || !currentQuestion) return true;
    if (currentQuestion.type === 'multiple-choice') return selectedOptionId === null;
    if (currentQuestion.type === 'fill-in-the-blank') return userFillInput.trim() === '';
    if (currentQuestion.type === 'true-false') return userTrueFalseAnswer === null;
    return true;
  };

  if (!lessonId) return null;
  if (error && lessonExercises.length === 0) return <div className="p-4 my-4 text-center text-red-700 bg-red-100 border border-red-300 rounded-lg shadow-md">{error}</div>;
  if (lessonExercises.length === 0 && !error) return <div className="p-4 my-4 text-center text-gray-600 bg-gray-50 border border-gray-200 rounded-lg shadow-md">هنوز تمرینی برای این درس بارگذاری نشده است.</div>;

  if (currentQuestionIndex >= lessonExercises.length) {
    return (
        <div className="p-6 my-4 text-center text-green-800 bg-green-100 border-2 border-green-300 rounded-lg shadow-xl">
            <h3 className="text-2xl font-semibold mb-3">آفرین طلبه کوشا!</h3>
            <p className="text-lg">شما تمام تمرینات این درس را با موفقیت به پایان رساندید.</p>
            <p className="text-xl font-bold mt-3">امتیاز شما: <span className="text-2xl">{score}</span> از {lessonExercises.length}</p>
            {/* Optionally, add a button to go back to lessons or a dashboard */}
        </div>
    );
  }

  return (
    <div className="interactive-exercises p-4 md:p-6 mt-8 bg-gradient-to-br from-purple-50 to-indigo-100 shadow-xl rounded-xl border border-gray-200">
      <h2 className="text-xl md:text-2xl font-bold text-purple-800 mb-6 text-center border-b-2 border-purple-200 pb-3">
        تمرینات درس: {lessonTitle || `(درس ${lessonId})`}
      </h2>

      {currentQuestion ? (
        <div>
          <div className="flex justify-between items-center mb-4 text-sm font-medium text-gray-700">
            <span>سوال {currentQuestionIndex + 1} از {lessonExercises.length}</span>
            <span>امتیاز: <span className="font-bold text-green-600">{score}</span></span>
          </div>
          <div className="p-5 border border-purple-200 rounded-lg bg-white shadow-lg mb-6">
            <p className="font-semibold text-lg text-gray-800 leading-relaxed mb-2">{currentQuestion.questionText}</p>
            <p className="text-xs text-purple-600 font-medium">(نوع سوال: {currentQuestion.type})</p>
            {renderQuestionType()}
          </div>

          <div className="mt-6 flex flex-col items-center">
            {showFeedback && feedback.message && (
              <div dangerouslySetInnerHTML={{ __html: feedback.message }}
                   className={`p-3.5 my-4 rounded-lg text-sm w-full text-center font-semibold border ${feedback.type === 'correct' ? 'bg-green-50 text-green-700 border-green-300' : 'bg-red-50 text-red-700 border-red-300'}`}>
              </div>
            )}

            {!isAnswerSubmitted ? (
              <button
                onClick={handleSubmitAnswer}
                className="w-full md:w-1/2 lg:w-1/3 px-6 py-3 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={isSubmitDisabled()}
              >
                ثبت پاسخ
              </button>
            ) : (
              // Only show "Next Question" if there are more questions. Otherwise, the completion message will be shown.
              currentQuestionIndex < lessonExercises.length && (
                <button
                  onClick={handleNextQuestion}
                  className="w-full md:w-1/2 lg:w-1/3 px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors"
                >
                  سوال بعدی &larr;
                </button>
              )
            )}
          </div>
        </div>
      ) : null }
    </div>
  );
}

export default InteractiveExercises;
''')
