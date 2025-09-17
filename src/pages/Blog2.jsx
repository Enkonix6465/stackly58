import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { useLanguage } from "../context.jsx/LanguageContext";

const mainHeadingColors = [
  "#007bff", // Blue
  "#e67e22", // Orange
  "#16a085", // Teal
  "#8e44ad", // Purple
];

// Localized blog images if different per lang; here same for all
const blogImages = {
  en: "images/bs62.jpg",
  ar: "images/bs62.jpg",
  he: "images/bs62.jpg",
};

const translations = {
  en: {
    title: "Enhancing Productivity with Workflow Automation",
    author: "Linda Yang",
    date: "March 15, 2025",
    readTime: "8 min read",
    categories: ["Automation", "Productivity"],
    intro: "Workflow automation provides businesses with powerful tools to optimize processes, reduce errors, and improve employee productivity. By automating repetitive tasks, teams can focus on higher-value activities.",
    headings: [
      "Major Benefits of Workflow Automation",
      "Driving Transformation with Technology",
      "Addressing Implementation Challenges",
      "Next Steps for Your Business",
    ],
    benefits: [
      "**Efficiency Gains:** Automate routine tasks that consume time and resources.",
      "**Improved Accuracy:** Reduce manual errors with standardized automated processes.",
      "**Better Collaboration:** Streamline handoffs and communications across teams.",
      "**Scalable Growth:** Scale processes effortlessly as your business expands.",
    ],
    paragraphs: [
      "Investing in modern automation platforms supports strategic transformation goals, enabling businesses to adapt rapidly and deliver superior customer experiences.",
      "Successful adoption requires aligning workflows, overcoming resistance to change, and ensuring integration with existing systems.",
      "Embrace automation as a key component of your digital strategy to boost productivity, reduce costs, and gain competitive advantage.",
      "Start building smarter workflows today for lasting business success.",
    ],
    backToBlog: "← Back to Blog",
  },

  ar: {
    title: "تعزيز الإنتاجية باستخدام أتمتة سير العمل",
    author: "ليندا يانغ",
    date: "15 مارس 2025",
    readTime: "8 دقائق قراءة",
    categories: ["الأتمتة", "الإنتاجية"],
    intro: "توفر أتمتة سير العمل للشركات أدوات قوية لتحسين العمليات، تقليل الأخطاء، وزيادة إنتاجية الموظفين. من خلال أتمتة المهام المتكررة، يمكن للفرق التركيز على الأنشطة ذات القيمة العالية.",
    headings: [
      "الفوائد الرئيسية لأتمتة سير العمل",
      "دفع التحول باستخدام التكنولوجيا",
      "معالجة تحديات التنفيذ",
      "الخطوات التالية لعملك",
    ],
    benefits: [
      "**زيادة الكفاءة:** أتمتة المهام الروتينية التي تستهلك الوقت والموارد.",
      "**تحسين الدقة:** تقليل الأخطاء اليدوية من خلال العمليات الآلية الموحدة.",
      "**تحسين التعاون:** تبسيط الانتقالات والاتصالات بين الفرق.",
      "**النمو القابل للتوسع:** توسيع العمليات بسهولة مع نمو عملك.",
    ],
    paragraphs: [
      "الاستثمار في منصات الأتمتة الحديثة يدعم أهداف التحول الاستراتيجي، مما يمكّن الأعمال من التكيف بسرعة وتقديم تجارب عملاء متميزة.",
      "يتطلب النجاح في الاعتماد مواءمة سير العمل، التغلب على مقاومة التغيير، وضمان التكامل مع الأنظمة القائمة.",
      "اعتماد الأتمتة كعنصر أساسي في استراتيجيتك الرقمية لتعزيز الإنتاجية، خفض التكاليف، وتحقيق ميزة تنافسية.",
      "ابدأ في بناء سير عمل أكثر ذكاءً اليوم لتحقيق نجاح مستدام في الأعمال.",
    ],
    backToBlog: "← العودة إلى المدونة",
  },

  he: {
    title: "שיפור פרודוקטיביות באמצעות אוטומציה של תהליכי עבודה",
    author: "לינדה יאנג",
    date: "15 במרץ 2025",
    readTime: "8 דקות קריאה",
    categories: ["אוטומציה", "פרודוקטיביות"],
    intro: "אוטומציה של תהליכי עבודה מעניקה לעסקים כלים רבי עוצמה לאופטימיזציה של תהליכים, הפחתת שגיאות ושיפור פרודוקטיביות העובדים. על ידי אוטומציה של מטלות חוזרות, צוותים יכולים להתרכז במשימות בעלות ערך גבוה יותר.",
    headings: [
      "היתרונות המרכזיים של אוטומציה של תהליכי עבודה",
      "קידום טרנספורמציה באמצעות טכנולוגיה",
      "התמודדות עם אתגרי יישום",
      "הצעדים הבאים לעסק שלך",
    ],
    benefits: [
      "**שיפורי יעילות:** אוטומציה של משימות שגרתיות הצורכות זמן ומשאבים.",
      "**דיוק משופר:** הפחתת טעויות ידניות באמצעות תהליכים אוטומטיים סטנדרטיים.",
      "**שיתוף פעולה טוב יותר:** ייעול העברת מידע ותקשורת בין צוותים.",
      "**צמיחה ניתנת להרחבה:** הגדלת היקף התהליכים בקלות עם התרחבות העסק.",
    ],
    paragraphs: [
      "השקעה בפלטפורמות אוטומציה מודרניות תומכת במטרות טרנספורמציה אסטרטגית, ומאפשרת לעסקים להסתגל במהירות ולהעניק חוויות לקוח איכותיות.",
      "יישום מוצלח דורש יישור תהליכים, התגברות על התנגדות לשינוי, והבטחת אינטגרציה עם מערכות קיימות.",
      "אמץ את האוטומציה כחלק מרכזי באסטרטגיה הדיגיטלית שלך לשיפור הפרודוקטיביות, הפחתת עלויות, והשגת יתרון תחרותי.",
      "התחל לבנות תהליכי עבודה חכמים כבר היום להצלחה עסקית מתמשכת.",
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
            {t.benefits.map((item, idx) => (
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
