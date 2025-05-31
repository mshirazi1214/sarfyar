export const mockExercises = {
  "l1-1": [ // Exercises for "درس ۱: ماضی ساده"
    {
      id: "l1-1-q1",
      type: "multiple-choice",
      questionText: "کدام گزینه شکل صحیح سوم شخص مفرد ماضی ساده از مصدر «رَفْتَن» است؟",
      options: [
        { id: "opt1", text: "رفتم", isCorrect: false },
        { id: "opt2", text: "رفتی", isCorrect: false },
        { id: "opt3", text: "رفت", isCorrect: true },
        { id: "opt4", text: "رفتند", isCorrect: false }
      ],
      hint: "سوم شخص مفرد به معنای 'او' است."
    },
    {
      id: "l1-1-q2",
      type: "fill-in-the-blank",
      questionText: "برای اول شخص جمع از مصدر «خواندن»، ماضی ساده کلمه «خواند...» است.",
      correctAnswer: "یم",
      placeholder: "شناسه را وارد کنید",
      hint: "به آخر فعل شناسه 'یم' اضافه می‌شود."
    },
    {
      id: "l1-1-q3",
      type: "true-false",
      questionText: "فعل «آمدی» دوم شخص مفرد ماضی ساده است.",
      options: [ // True/false can also be presented as options
        { id: "tf_true", text: "صحیح", isCorrect: true },
        { id: "tf_false", text: "غلط", isCorrect: false }
      ],
      correctAnswer: true, // Keep this for direct logic, options are for display
      hint: "«آمدی» یعنی تو آمدی."
    },
    {
      id: "l1-1-q4",
      type: "multiple-choice",
      questionText: "کدام فعل ماضی ساده نیست؟",
      options: [
        { id: "opt1", text: "گفت", isCorrect: false },
        { id: "opt2", text: "شنیدیم", isCorrect: false },
        { id: "opt3", text: "می‌روم", isCorrect: true },
        { id: "opt4", text: "دیدند", isCorrect: false }
      ],
      hint: "فعل ماضی ساده به گذشته اشاره دارد."
    }
  ],
  "l3-1": [ // Exercises for "درس ۱: باب إفعال"
    {
      id: "l3-1-q1",
      type: "multiple-choice",
      questionText: "وزن ماضی باب إفعال کدام است؟",
      options: [
        { id: "opt1", text: "فَعَّلَ", isCorrect: false },
        { id: "opt2", text: "أفْعَلَ", isCorrect: true },
        { id: "opt3", text: "تَفَعَّلَ", isCorrect: false },
        { id: "opt4", text: "إنْفَعَلَ", isCorrect: false }
      ],
      hint: "به اولین مثال در درس ('أَجْلَسَ') توجه کنید."
    },
    {
      id: "l3-1-q2",
      type: "fill-in-the-blank",
      questionText: "مصدر فعل «أَکْرَمَ» (بر وزن إفعال) کلمه «...» است.",
      correctAnswer: "اِکرام",
      placeholder: "مصدر را بنویسید",
      hint: "شکل نوشتاری صحیح مصدر با همزه قطع را در نظر بگیرید."
    },
    {
      id: "l3-1-q3",
      type: "true-false",
      questionText: "باب إفعال همیشه برای متعدی کردن فعل لازم به کار می‌رود.",
      options: [
        { id: "tf_true", text: "صحیح", isCorrect: false },
        { id: "tf_false", text: "غلط", isCorrect: true }
      ],
      correctAnswer: false,
      hint: "در خلاصه درس ذکر شده که 'معمولاً' برای متعدی کردن است و گاهی معنی جدیدی به فعل می‌بخشد."
    },
    {
      id: "l3-1-q4",
      type: "multiple-choice",
      questionText: "کدام یک از افعال زیر از باب إفعال است؟",
      options: [
        { id: "opt1", text: "خَرَجَ", isCorrect: false },
        { id: "opt2", text: "عَلَّمَ", isCorrect: false },
        { id: "opt3", text: "أَنْزَلَ", isCorrect: true },
        { id: "opt4", text: "تَعَلَّمَ", isCorrect: false }
      ],
      hint: "به وزن «أفْعَلَ» دقت کنید."
    }
  ]
  // Add more exercises for other lessons as needed
};
