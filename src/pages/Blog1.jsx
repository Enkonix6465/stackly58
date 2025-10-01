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
  en: "images/bs61.jpg",
  ar: "images/bs61.jpg",
  he: "images/bs61.jpg",
};

const translations = {
  en: {
    title: "Driving Business Growth through Digital Transformation",
    author: "Alex Johnson",
    date: "March 10, 2025",
    readTime: "7 min",
    categories: ["Business Strategy", "Digital Transformation"],
    paragraphs: [
      "Digital transformation is crucial for businesses aiming to thrive in today’s competitive landscape. It involves leveraging cutting-edge technology and innovative strategies to enhance customer experiences, optimize operations, and unlock new growth opportunities.",
    ],
    headings: [
      "Key Benefits of Digital Transformation",
      "Enabling Successful Transformation",
      "Overcoming Challenges",
      "Moving Forward with Confidence",
    ],
    lists: [
      [
        "**Improved Efficiency:** Streamline workflows and reduce redundancies with automated processes.",
        "**Enhanced Customer Experience:** Personalize interactions and deliver omnichannel engagement.",
        "**Data-Driven Decisions:** Utilize analytics and real-time insights to guide strategic choices.",
        "**Increased Agility:** Quickly adapt to market changes and technological advances.",
      ],
    ],
    moreParagraphs: [
      "Building a culture of continuous innovation, investing in scalable cloud infrastructures, and empowering teams with modern tools are key steps to drive successful digital transformation.",
      "Managing legacy systems, ensuring cybersecurity, and aligning IT initiatives with business goals remain common challenges that require expert partnerships and robust planning.",
      "Embracing digital transformation positions companies to innovate at pace, respond to evolving customer needs, and sustain long-term success.",
      "The journey toward a digitally enabled business is an investment in agility, resilience, and growth.",
    ],
    backToBlog: "← Back to Blog",
  },
  ar: {
    title: "دفع نمو الأعمال من خلال التحول الرقمي",
    author: "أليكس جونسون",
    date: "10 مارس 2025",
    readTime: "٧ دقائق",
    categories: ["استراتيجية الأعمال", "التحول الرقمي"],
    paragraphs: [
      "التحول الرقمي ضروري للأعمال التي تطمح للنجاح في بيئة تنافسية اليوم. يشمل الاستفادة من أحدث التقنيات والاستراتيجيات المبتكرة لتعزيز تجارب العملاء، تحسين العمليات، وفتح آفاق جديدة للنمو.",
    ],
    headings: [
      "الفوائد الرئيسية للتحول الرقمي",
      "تمكين التحول الناجح",
      "تخطّي التحديات",
      "التقدم بثقة",
    ],
    lists: [
      [
        "**تحسين الكفاءة:** تبسيط سير العمل وتقليل التكرار من خلال الأتمتة.",
        "**تعزيز تجربة العملاء:** تخصيص التفاعلات وتقديم تواصل متعدد القنوات.",
        "**قرارات مبنية على البيانات:** استخدام التحليلات والرؤى اللحظية لاتخاذ قرارات استراتيجية.",
        "**زيادة المرونة:** التكيف السريع مع تغييرات السوق والتقنيات الحديثة.",
      ],
    ],
    moreParagraphs: [
      "بناء ثقافة الابتكار المستمر، الاستثمار في البنى التحتية السحابية القابلة للتوسع، وتمكين الفرق بالأدوات الحديثة هي خطوات رئيسية لتحقيق تحول رقمي ناجح.",
      "إدارة الأنظمة القديمة، ضمان الأمن السيبراني، وتوافق مبادرات تكنولوجيا المعلومات مع أهداف العمل تعد تحديات شائعة تتطلب شراكات خبراء وتخطيط محكم.",
      "احتضان التحول الرقمي يضع الشركات في موقع يسمح لها بالابتكار بسرعة، تلبية احتياجات العملاء المتغيرة، وتحقيق نجاح طويل الأمد.",
      "الرحلة نحو عمل رقمي تمثل استثمارًا في المرونة والقدرة على الاستدامة والنمو.",
    ],
    backToBlog: "← العودة إلى المدونة",
  },
  he: {
    title: "הנעת צמיחת עסקים באמצעות טרנספורמציה דיגיטלית",
    author: "אלכס ג'ונסון",
    date: "10 במרץ 2025",
    readTime: "7 דקות",
    categories: ["אסטרטגיית עסקים", "טרנספורמציה דיגיטלית"],
    paragraphs: [
      "טרנספורמציה דיגיטלית חשובה לעסקים השואפים להצליח בנוף התחרותי של היום. היא כוללת ניצול טכנולוגיות מתקדמות ואסטרטגיות חדשניות לשיפור חוויות הלקוחות, אופטימיזציה של תפעול, ויצירת הזדמנויות חדשות לצמיחה.",
    ],
    headings: [
      "היתרונות המרכזיים של טרנספורמציה דיגיטלית",
      "העצמת טרנספורמציה מוצלחת",
      "התמודדות עם אתגרים",
      "המשך דרכך בביטחון",
    ],
    lists: [
      [
        "**יעילות משופרת:** ייעול תהליכים והפחתת כפילויות באמצעות אוטומציה.",
        "**שיפור חוויית הלקוח:** התאמה אישית של אינטראקציות ומתן חוויות רב-ערוציות.",
        "**החלטות מבוססות נתונים:** שימוש באנליטיקה ותובנות בזמן אמת להכוונת אסטרטגיה.",
        "**גמישות מוגברת:** התאמה מהירה לשינויים בשוק ולחידושים טכנולוגיים.",
      ],
    ],
    moreParagraphs: [
      "בניית תרבות של חדשנות מתמדת, השקעה בתשתיות ענן סקיילביליות, והעצמת צוותים עם כלים מודרניים הינם צעדים מרכזיים לטרנספורמציה דיגיטלית מוצלחת.",
      "ניהול מערכות ירושה, הבטחת אבטחת סייבר, ויישור יוזמות IT עם מטרות העסק מהווים אתגרים נפוצים הדורשים שותפויות עם מומחים ותכנון קפדני.",
      "אימוץ הטרנספורמציה הדיגיטלית מאפשר לחברות לחדש בקצב מהיר, להגיב לצרכי לקוחות משתנים ולהשיג הצלחה לאורך זמן.",
      "המסע ליצירת עסק מונחה טכנולוגיה הוא השקעה בגמישות, עמידות וצמיחה.",
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
          {t.paragraphs.map((p, idx) => (
            <p key={idx} style={{ marginBottom: 25, fontSize: "1.1rem" }}>
              {p}
            </p>
          ))}

          {t.headings.map((heading, i) => (
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
                {heading}
              </h2>

              {i === 0 && (
                <ul style={{ paddingLeft: 20, marginBottom: 25 }}>
                  {t.lists[0].map((item, idx) => (
                    <li key={idx} style={{ marginBottom: 11 }} dangerouslySetInnerHTML={{ __html: item }}></li>
                  ))}
                </ul>
              )}

              <p style={{ marginBottom: 25 }}>{t.moreParagraphs[i]}</p>
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
