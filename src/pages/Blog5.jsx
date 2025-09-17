import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { useLanguage } from "../context.jsx/LanguageContext";

const mainHeadingColors = [
  "#1abc9c", // Turquoise
  "#e67e22", // Orange
  "#3498db", // Blue
  "#9b59b6", // Purple
];

const blogImages = {
  en: "images/bs65.jpg",
  ar: "images/bs65.jpg",
  he: "images/bs65.jpg",
};

const translations = {
  en: {
    title: "Optimizing Customer Experience in the Digital Age",
    author: "Sarah Mitchell",
    date: "March 30, 2025",
    readTime: "7 min",
    categories: ["Customer Experience", "Digital Innovation"],
    intro:
      "Delivering outstanding customer experiences is a critical differentiator in today’s digital marketplace. Organizations must leverage data-driven insights and innovative technologies to personalize and streamline customer journeys.",
    headings: [
      "Key Components of Enhanced Customer Experience",
      "Driving Digital Innovation",
      "Overcoming Experience Challenges",
      "Future of Customer Experience",
    ],
    lists: [
      "**Personalization:** Customize interactions to meet individual customer preferences.",
      "**Seamless Omnichannel Engagement:** Provide consistent experiences across all touchpoints.",
      "**Real-Time Support:** Utilize AI and automation for instant assistance and issue resolution.",
      "**Continuous Feedback:** Leverage customer feedback to drive ongoing improvements.",
    ],
    paragraphs: [
      "Modern digital platforms enable businesses to gather valuable data, improve analytics, and implement customer-centric strategies that evolve with market needs.",
      "Integrating legacy systems, managing data privacy, and ensuring scalability can be challenging but are critical to deliver reliable and engaging experiences.",
      "Businesses that invest in digital innovation to optimize customer experience position themselves for sustained success and competitive advantage.",
      "Embrace new technologies and customer insights to transform your business.",
    ],
    backToBlog: "← Back to Blog",
  },
  ar: {
    title: "تحسين تجربة العملاء في العصر الرقمي",
    author: "سارة ميتشل",
    date: "30 مارس 2025",
    readTime: "٧ دقائق",
    categories: ["تجربة العملاء", "الابتكار الرقمي"],
    intro:
      "تقديم تجارب عملاء متميزة هو عامل تميز رئيسي في سوق الرقمية اليوم. يجب على الشركات الاستفادة من تحليلات البيانات والتقنيات المبتكرة لتخصيص وتحسين رحلات العملاء.",
    headings: [
      "المكونات الرئيسية لتحسين تجربة العملاء",
      "دفع الابتكار الرقمي",
      "تجاوز تحديات التجربة",
      "مستقبل تجربة العملاء",
    ],
    lists: [
      "**الشخصنة:** تخصيص التفاعلات وفقًا لتفضيلات العميل الفردية.",
      "**التواصل على كافة القنوات بسلاسة:** توفير تجارب متناسقة عبر جميع نقاط الاتصال.",
      "**الدعم الفوري:** استخدام الذكاء الاصطناعي والأتمتة للمساعدة الفورية وحل المشكلات.",
      "**التغذية الراجعة المستمرة:** استغلال ملاحظات العملاء لتحسين مستمر.",
    ],
    paragraphs: [
      "تمكّن المنصات الرقمية الحديثة الشركات من جمع بيانات قيمة، وتحسين التحليلات، وتنفيذ استراتيجيات مركزية على العميل تتطور مع متطلبات السوق.",
      "دمج الأنظمة القديمة، وإدارة خصوصية البيانات، وضمان القابلية للتوسع يمكن أن يكون تحديًا لكنه أمر حاسم لتقديم تجارب موثوقة وجذابة.",
      "الشركات التي تستثمر في الابتكار الرقمي لتحسين تجربة العملاء تهيئ نفسها للنجاح المستدام والميزة التنافسية.",
      "اعتمد تقنيات جديدة ورؤى العملاء لتحويل عملك.",
    ],
    backToBlog: "← العودة إلى المدونة",
  },
  he: {
    title: "אופטימיזציית חווית הלקוח בעידן הדיגיטלי",
    author: "שרה מיטשל",
    date: "30 במרץ 2025",
    readTime: "7 דקות",
    categories: ["חווית לקוח", "חדשנות דיגיטלית"],
    intro:
      "מתן חוויות לקוח מצטיינות הוא גורם מבדיל מרכזי בשוק הדיגיטלי של היום. ארגונים חייבים לנצל תובנות מונעות נתונים וטכנולוגיות חדשניות כדי להתאים באופן אישי ולייעל את מסעות הלקוחות.",
    headings: [
      "רכיבים מרכזיים של חווית לקוח משופרת",
      "קידום חדשנות דיגיטלית",
      "התמודדות עם אתגרי חווית לקוח",
      "עתיד חווית הלקוח",
    ],
    lists: [
      "**התאמה אישית:** התאמת האינטראקציות להעדפות האישיות של כל לקוח.",
      "**מעורבות אחידה בכל הערוצים:** מתן חוויות עקביות בכל נקודות המגע.",
      "**תמיכה בזמן אמת:** שימוש בבינה מלאכותית ואוטומציה לסיוע מיידי ופתרון בעיות.",
      "**משוב מתמשך:** ניצול משוב לקוחות לשיפורים מתמשכים.",
    ],
    paragraphs: [
      "פלטפורמות דיגיטליות מודרניות מאפשרות לעסקים לאסוף נתונים יקרי ערך, לשפר אנליטיקה וליישם אסטרטגיות ממוקדות לקוח שמתפתחות בהתאם לצורכי השוק.",
      "שילוב מערכות ותיקות, ניהול פרטיות נתונים והבטחת סקיילביליות יכולים להיות אתגרים אך הם חיוניים לספק חוויות אמינות ומרתקות.",
      "עסקים שמשקיעים בחדשנות דיגיטלית כדי לאופטימיזציית חווית הלקוח מציבים את עצמם להצלחה מתמשכת ויתרון תחרותי.",
      "אמצו טכנולוגיות חדשות ותובנות על הלקוח כדי לשנות את העסק שלכם.",
    ],
    backToBlog: "← חזרה לבלוג",
  },
};

const Blog1 = () => {
  const { language } = useLanguage();
  const t = translations[language] || translations.en;
  const imageSrc = blogImages[language] || blogImages.en;

  React.useEffect(() => {
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
              color: "var(--secondary-color)",
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
            }}
          >
            {t.categories.map((category, idx) => (
              <span
                key={idx}
                style={{
                  background:
                    idx === 0 ? "var(--primary-color)" : "#3498db",
                  color: "white",
                  padding: "4px 12px",
                  borderRadius: 20,
                  fontSize: "0.85rem",
                }}
              >
                {category}
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
                dangerouslySetInnerHTML={{ __html: item }}
                style={{ marginBottom: 11 }}
              />
            ))}
          </ul>

          {[1, 2, 3].map((idx) => (
            <React.Fragment key={idx}>
              <h2
                style={{
                  fontSize: "1.8rem",
                  color: mainHeadingColors[idx],
                  marginTop: 35,
                  marginBottom: 20,
                  fontWeight: 700,
                }}
              >
                {t.headings[idx]}
              </h2>
              <p style={{ marginBottom: 25 }}>{t.paragraphs[idx - 1]}</p>
            </React.Fragment>
          ))}
        </motion.div>

        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          style={{ marginTop: 40, textAlign: "center" }}
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
