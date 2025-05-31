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
      hint: "سوم شخص مفرد به معنای 'او' است.",
      detailedFeedbackOnWrong: {
        explanation: "فعل ماضی ساده برای سوم شخص مفرد (او) بدون شناسه خاصی می‌آید و همان بن ماضی است. 'رفتم' اول شخص مفرد، 'رفتی' دوم شخص مفرد و 'رفتند' سوم شخص جمع است.",
        lessonReference: {
          lessonId: "l1-1",
          topicText: "جدول صرف فعل «رَفْتَن» در ماضی ساده",
          displayText: "جدول صرف ماضی ساده"
        }
      }
    },
    {
      id: "l1-1-q2",
      type: "fill-in-the-blank",
      questionText: "برای اول شخص جمع از مصدر «خواندن»، ماضی ساده کلمه «خواند...» است.",
      correctAnswer: "یم",
      placeholder: "شناسه را وارد کنید",
      hint: "به آخر فعل شناسه 'یم' اضافه می‌شود.",
      detailedFeedbackOnWrong: {
        explanation: "شناسه اول شخص جمع برای افعال ماضی ساده '-یم' است. مثلا: خواندیم، گفتیم، شنیدیم.",
        lessonReference: {
          lessonId: "l1-1",
          topicKey: "conjugationTable", // Key in mockLessonContent
          displayText: "جدول صرف و شناسه‌ها"
        }
      }
    },
    {
      id: "l1-1-q3",
      type: "true-false",
      questionText: "فعل «آمدی» دوم شخص مفرد ماضی ساده است.",
      options: [
        { id: "tf_true", text: "صحیح", isCorrect: true },
        { id: "tf_false", text: "غلط", isCorrect: false }
      ],
      correctAnswer: true,
      hint: "«آمدی» یعنی تو آمدی.",
      detailedFeedbackOnWrong: {
        explanation: "شناسه '-ی' در انتهای فعل ماضی، نشانگر دوم شخص مفرد (تو) است. بنابراین پاسخ 'غلط' نادرست است.",
        lessonReference: { lessonId: "l1-1", topicKey: "summary", displayText: "توضیحات ماضی ساده" }
      }
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
      hint: "فعل ماضی ساده به گذشته اشاره دارد. به زمان فعل دقت کنید.",
      detailedFeedbackOnWrong: {
        explanation: "فعل ماضی ساده نشان‌دهنده کاری است که در گذشته انجام شده. فعل 'می‌روم' زمان حال (مضارع اخباری) است و ماضی ساده نیست.",
        lessonReference: { lessonId: "l1-1", topicKey: "summary", displayText: "تعریف فعل ماضی ساده" }
      }
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
      hint: "به اولین مثال در درس ('أَجْلَسَ') توجه کنید.",
      detailedFeedbackOnWrong: {
        explanation: "وزن استاندارد ماضی برای باب إفعال، «أفْعَلَ» می‌باشد، مانند «أَکْرَمَ»، «أَنْزَلَ». سایر گزینه‌ها مربوط به ابواب دیگر ثلاثی مزید هستند (فَعَّلَ ← باب تفعیل، تَفَعَّلَ ← باب تفَعُّل، إنْفَعَلَ ← باب إنفعال).",
        lessonReference: {
          lessonId: "l3-1",
          topicKey: "summary", // Points to the summary section of lesson l3-1
          displayText: "توضیحات باب إفعال"
        }
      }
    },
    {
      id: "l3-1-q2",
      type: "fill-in-the-blank",
      questionText: "مصدر فعل «أَکْرَمَ» (بر وزن إفعال) کلمه «...» است.",
      correctAnswer: "اِکرام",
      placeholder: "مصدر را بنویسید",
      hint: "شکل نوشتاری صحیح مصدر با همزه قطع را در نظر بگیرید.",
      detailedFeedbackOnWrong: {
        explanation: "مصدر باب إفعال بر وزن «إِفْعَال» می‌آید. برای فعل «أَکْرَمَ»، مصدر آن «إِکْرَام» است. دقت کنید که همزه آن همزه قطع است و با الف نوشته می‌شود.",
        lessonReference: { lessonId: "l3-1", topicKey: "summary", displayText: "مصدر باب إفعال" }
      }
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
      hint: "در خلاصه درس ذکر شده که 'معمولاً' برای متعدی کردن است و گاهی معنی جدیدی به فعل می‌بخشد.",
      detailedFeedbackOnWrong: {
        explanation: "باب إفعال کاربردهای مختلفی دارد. علاوه بر متعدی کردن فعل لازم (مانند جَلَسَ ← أَجْلَسَ)، می‌تواند برای ایجاد معانی جدید (مانند کَرُمَ ← أَکْرَمَ) یا معانی دیگر نیز به کار رود. پس این گزاره که 'همیشه' برای متعدی کردن است، صحیح نمی‌باشد.",
        lessonReference: { lessonId: "l3-1", topicKey: "summary", displayText: "کاربردهای باب إفعال" }
      }
    }
  ]
};
