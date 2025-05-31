export const mockLessonsContent = {
  "l1-1": { // Corresponds to id: "l1-1" (درس ۱: ماضی ساده) in mockBookData.js
    title: "درس ۱: ماضی ساده",
    summary: "فعل ماضی ساده، فعلی است که بر انجام کاری در زمان گذشته دلالت می‌کند، بدون هیچ قید و شرط اضافی. این ساده‌ترین نوع فعل ماضی است و پایه بسیاری از ساختارهای دیگر فعل ماضی می‌باشد.",
    examples: [
      { text: "او رفت.", note: "مثال ساده از فاعل سوم شخص مفرد." },
      { text: "ما کتاب را خواندیم.", note: "مثال با مفعول و فاعل اول شخص جمع." },
      { text: "طلبه درس را فهمید.", note: "مثال با واژگان طلبگی." }
    ],
    conjugationTable: {
      title: "جدول صرف فعل «رَفْتَن» در ماضی ساده",
      headers: ["شخص", "مفرد", "جمع"],
      rows: [
        { person: "اول شخص", singular: "رفتم", plural: "رفتیم" },
        { person: "دوم شخص", singular: "رفتی", plural: "رفتید" },
        { person: "سوم شخص", singular: "رفت", plural: "رفتند" }
      ],
      imagePlaceholder: "placeholder_sarf_table_ماضی_ساده.png" // Placeholder for actual image if needed
    },
    vocabulary: [
      { word: "ماضی", explanation: "زمان گذشته، مقابل مضارع (حال و آینده) و مستقبل (آینده)." },
      { word: "صرف", explanation: "تغییر شکل فعل بر اساس شخص، شمار، زمان و وجه." },
      { word: "فاعل", explanation: "انجام‌دهنده کار در جمله." }
    ],
    interactiveElements: { // Placeholders for future interactivity
      highlightEnabled: true,
      audioAvailable: true,
      downloadOptions: ["PDF", "PNG (جدول)"]
    }
  },
  // We can add more lessons here later e.g. "l1-2", "l2-1"
  "l3-1": { // Corresponds to id: "l3-1" (درس ۱: باب إفعال) in mockBookData.js
    title: "درس ۱: باب إفعال",
    summary: "باب إفعال یکی از ابواب ثلاثی مزید فیه است که معمولاً برای متعدی کردن فعل لازم به کار می‌رود یا معنی جدیدی به فعل می‌بخشد. وزن ماضی آن «أفْعَلَ» و مضارع آن «یُفْعِلُ» و مصدر آن «إفعال» است.",
    examples: [
        { text: "جَلَسَ (نشست) ← أَجْلَسَ (نشانْد)", note: "متعدی کردن فعل لازم" },
        { text: "کَرُمَ (بزرگوار شد) ← أَکْرَمَ (گرامی داشت)", note: "ایجاد معنای جدید و اکرام" },
        { text: "خَرَجَ (خارج شد) ← أَخْرَجَ (بیرون کرد، خارج نمود)", note: "مثالی از قرآن: «أَخْرَجَ مِنْهَا مَاءَهَا وَمَرْعَاهَا»" }
    ],
    conjugationTable: {
        title: "جدول صرف فعل «أَکْرَمَ» در ماضی ساده (باب إفعال)",
        headers: ["شخص", "مفرد", "جمع"],
        rows: [
            { person: "اول شخص (متکلم)", singular: "أَکْرَمْتُ", plural: "أَکْرَمْنَا" },
            { person: "دوم شخص (مخاطب)", singular: "أَکْرَمْتَ / أَکْرَمْتِ", plural: "أَکْرَمْتُمْ / أَکْرَمْتُنَّ" },
            { person: "سوم شخص (غایب)", singular: "أَکْرَمَ / أَکْرَمَتْ", plural: "أَکْرَمُوا / أَکْرَمْنَ" }
        ],
        imagePlaceholder: "placeholder_sarf_table_باب_افعال.png"
    },
    vocabulary: [
        { word: "ثلاثی مزید فیه", explanation: "فعلی که بر سه حرف اصلی آن، یک یا چند حرف اضافه شده باشد." },
        { word: "باب", explanation: "در علم صرف، به وزن‌ها و ساختارهای مشخصی از افعال گفته می‌شود." },
        { word: "متعدی کردن", explanation: "تبدیل فعل لازم (که نیاز به مفعول ندارد) به فعلی که مفعول می‌پذیرد." }
    ],
    interactiveElements: {
        highlightEnabled: true,
        audioAvailable: false, // Example: audio might not be ready for this lesson
        downloadOptions: ["PDF", "PNG (جدول)"]
    }
  }
};
