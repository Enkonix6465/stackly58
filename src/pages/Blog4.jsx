import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { useLanguage } from "../context.jsx/LanguageContext";

const mainHeadingColors = [
  "#007bff", // Blue
  "#e67e22", // Orange
  "#16a085", // Teal
  "#8e44ad", // Purple
];

const blogImages = {
  en: "images/bs64.jpg",
  ar: "images/bs64.jpg",
  he: "images/bs64.jpg",
};

const translations = {
  en: {
    title: "Building Agile Teams for Faster Market Response",
    author: "Max Patel",
    date: "March 25, 2025",
    readTime: "6 min read",
    categories: ["Agile", "Team Building"],
    intro:
      "Agile teams are proven drivers of faster innovation and market responsiveness. By fostering cross-functional collaboration and iterative workflows, businesses can quickly adapt to change and deliver customer value.",
    headings: [
      "Benefits of Agile Teams",
      "Implementing Agile Practices",
      "Facing Challenges",
      "Getting Started",
    ],
    lists: [
      "**Flexibility:** Agile teams rapidly pivot with changing requirements.",
      "**Collaboration:** Breaking silos encourages empowered decision-making.",
      "**Continuous Delivery:** Frequent releases enhance product-market fit.",
      "**Transparency:** Clear communication aligns stakeholders and teams.",
    ],
    paragraphs: [
      "Successful agile adoption requires leadership buy-in, cultural shifts, and continuous learning. Teams should leverage modern tools and methodologies such as Scrum or Kanban.",
      "Common challenges include resistance to change, uneven skillsets, and scaling agile beyond initial teams. Continuous coaching and clear communication help overcome these obstacles.",
      "Begin by forming small, dedicated teams focused on specific projects. Invest in training and empower teams to drive autonomous decisions that align with business goals.",
      "Agile transformation is an ongoing journey that yields significant business agility and resilience.",
    ],
    backToBlog: "← Back to Blog",
  },

  ar: {
    title: "بناء فرق رشيقة للاستجابة الأسرع للسوق",
    author: "ماكس باتل",
    date: "25 مارس 2025",
    readTime: "6 دقائق قراءة",
    categories: ["الرشاقة", "بناء الفرق"],
    intro:
      "الفرق الرشيقة تثبت جدارتها في تعزيز الابتكار السريع والاستجابة للسوق. من خلال تعزيز التعاون متعدد الوظائف وتدفقات العمل التكرارية، يمكن للأعمال التكيف بسرعة مع التغيير وتقديم قيمة للعملاء.",
    headings: [
      "فوائد الفرق الرشيقة",
      "تطبيق ممارسات الرشاقة",
      "مواجهة التحديات",
      "البدء",
    ],
    lists: [
      "**المرونة:** الفرق الرشيقة تتحرك بسرعة مع متطلبات متغيرة.",
      "**التعاون:** كسر الحواجز يشجع على اتخاذ قرارات تمكينية.",
      "**التسليم المستمر:** الإصدارات المتكررة تحسن توافق المنتج مع السوق.",
      "**الشفافية:** التواصل الواضح يوجه أصحاب المصلحة والفرق.",
    ],
    paragraphs: [
      "يتطلب اعتماد الرشاقة الناجح دعم القيادة، وتحولات ثقافية، وتعلم مستمر. يجب على الفرق الاستفادة من الأدوات والمنهجيات الحديثة مثل سكرم أو كانبان.",
      "تشمل التحديات الشائعة مقاومة التغيير، تفاوت المهارات، وتوسيع نطاق الرشاقة إلى ما بعد الفرق الأولى. يساعد التدريب المستمر والتواصل الواضح في تخطي هذه العقبات.",
      "ابدأ بتشكيل فرق صغيرة م dedicated تركز على مشاريع محددة. استثمر في التدريب ومكّن الفرق لاتخاذ قرارات ذاتية تتماشى مع أهداف الأعمال.",
      "التحول الرشيق هو رحلة مستمرة تؤدي إلى رشاقة ومرونة أعمال كبيرة.",
    ],
    backToBlog: "← العودة إلى المدونة",
  },

  he: {
    title: "בניית צוותים אג'יליים לתגובת שוק מהירה יותר",
    author: "מקס פטל",
    date: "25 במרץ 2025",
    readTime: "6 דקות קריאה",
    categories: ["אג'ייל", "בניית צוות"],
    intro:
      "צוותים אג'יליים מוכחים כמניעים למהירות חדשנות ותגובה לשוק. באמצעות טיפוח שיתוף פעולה רב-תחומי ותהליכים איטרטיביים, עסקים יכולים להסתגל במהירות לשינויים ולספק ערך ללקוח.",
    headings: [
      "יתרונות צוותים אג'יליים",
      "יישום פרקטיקות אג'ייל",
      "התמודדות עם אתגרים",
      "התחלה",
    ],
    lists: [
      "**גמישות:** צוותים אג'יליים מתפקדים במהירות עם דרישות משתנות.",
      "**שיתוף פעולה:** שבירת סילוים מעודדת קבלת החלטות ממ empowered י.",
      "**מסירה רציפה:** שחרורים תכופים משפרים התאמת מוצר לשוק.",
      "**שקיפות:** תקשורת ברורה מיישרת בעל עניין ו צוותים.",
    ],
    paragraphs: [
      "אימוץ אג'ייל מוצלח דורש תמיכת מנהיגות, שינויי תרבות ולמידה מתמשכת. צוותים צריכים לנצל כלי עבודה ושיטות מודרניות כגון סקרום או קנבן.",
      "אתגרים נפוצים כוללים התנגדות לשינוי, מיומנויות לא אחידות והרחבת אג'ייל מעבר לצוותים הראשוניים. אימון מתמשך ותקשורת ברורה עוזרים להתגבר על מכשולים אלו.",
      "התחל ביצירת צוותים קטנים וממוקדים המתמקדים בפרויקטים ספציפיים. השקיע באימון והעצם צוותים לקבל החלטות עצמאיות התואמות מטרות עסקיות.",
      "טרנספורמציה אג'ילית היא מסע מתמשך היוצר גמישות ועמידות עסקית משמעותית.",
    ],
    backToBlog: "← חזרה לבלוג",
  },
};

const Blog1 = () => {
  const { language } = useLanguage();
  const t = translations[language] || translations.en;
  const imageSrc = blogImages[language] || blogImages.en;

  useEffect(() => {
    document.title = t.title;
    document.documentElement.dir = ["ar", "he"].includes(language) ? "rtl" : "ltr";
  }, [language, t.title]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      style={{
        padding: "120px 20px 60px",
        background: "var(--bg-color)",
        minHeight: "100vh",
        color: "var(--text-color)",
      }}
    >
      <div style={{ maxWidth: 800, margin: "0 auto" }}>
        <motion.header
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          style={{ marginBottom: 40 }}
        >
          <h1
            style={{
              fontSize: "2.5rem",
              fontWeight: 700,
              color: "var(--heading-color)",
              marginBottom: 20,
              lineHeight: 1.2,
            }}
          >
            {t.title}
          </h1>
          <div
            style={{
              width: "100%",
              borderRadius: 15,
              overflow: "hidden",
              marginBottom: 20,
            }}
          >
            <img
              src={imageSrc}
              alt={t.title}
              style={{
                width: "100%",
                height: 230,
                objectFit: "cover",
                display: "block",
                borderRadius: 12,
                background: "#eaeaea",
              }}
            />
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 20,
              fontSize: "0.95rem",
              color: "var(--text-muted)",
              marginBottom: 14,
            }}
          >
            <span>
              {language === "ar"
                ? `بقلم ${t.author}`
                : language === "he"
                ? `מאת ${t.author}`
                : `By ${t.author}`}
            </span>
            <span>•</span>
            <span>{t.date}</span>
            <span>•</span>
            <span>{t.readTime}</span>
          </div>
          <div
            style={{
              display: "flex",
              gap: 10,
              flexWrap: "wrap",
              marginBottom: 4,
            }}
          >
            {t.categories.map((cat, idx) => (
              <span
                key={idx}
                style={{
                  background: mainHeadingColors[idx] || "#16a085",
                  color: "white",
                  padding: "4px 12px",
                  borderRadius: 20,
                  fontSize: "0.85rem",
                }}
              >
                {cat}
              </span>
            ))}
          </div>
        </motion.header>

        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          style={{
            background: "var(--card-bg)",
            borderRadius: 12,
            padding: 40,
            boxShadow: "var(--shadow)",
            lineHeight: 1.8,
          }}
        >
          <p style={{ marginBottom: 25, fontSize: "1.1rem" }}>{t.intro}</p>

          <h2
            style={{
              fontSize: "1.8rem",
              color: mainHeadingColors[0],
              marginTop: 35,
              marginBottom: 20,
              fontWeight: 700,
            }}
          >
            {t.headings[0]}
          </h2>
          <ul style={{ paddingLeft: 20, marginBottom: 25 }}>
            {t.lists.map((item, idx) => (
              <li
                key={idx}
                style={{ marginBottom: 11 }}
                dangerouslySetInnerHTML={{ __html: item }}
              />
            ))}
          </ul>

          {[1, 2, 3].map((i) => (
            <React.Fragment key={i}>
              <h2
                style={{
                  fontSize: "1.8rem",
                  color: mainHeadingColors[i],
                  marginTop: 35,
                  marginBottom: 20,
                  fontWeight: 700,
                }}
              >
                {t.headings[i]}
              </h2>
              <p style={{ marginBottom: 25 }}>{t.paragraphs[i - 1]}</p>
            </React.Fragment>
          ))}
        </motion.div>

        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          style={{
            marginTop: 40,
            textAlign: "center",
          }}
        >
          <a
            href="/blog"
            style={{
              display: "inline-block",
              background: "var(--primary-color)",
              color: "white",
              padding: "12px 30px",
              borderRadius: 8,
              textDecoration: "none",
              fontWeight: 600,
              transition: "all 0.3s ease",
            }}
          >
            {t.backToBlog}
          </a>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Blog1;
