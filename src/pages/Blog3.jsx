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
  en: "images/bs63.jpg",
  ar: "images/bs63.jpg",
  he: "images/bs63.jpg",
};

const translations = {
  en: {
    title: "Cloud Solutions: Empowering Scalable Business Operations",
    author: "Neil Roberts",
    date: "March 20, 2025",
    readTime: "9 min read",
    categories: ["Cloud Computing", "Scalability"],
    intro:
      "Cloud solutions have revolutionized business operations by providing flexible, scalable, and cost-effective infrastructure. Organizations leverage cloud platforms to enhance agility, reduce IT overhead, and achieve rapid deployment capabilities.",
    headings: [
      "Core Advantages of Cloud Adoption",
      "Accelerating Business Innovation",
      "Overcoming Cloud Migration Challenges",
      "Preparing for a Cloud-Driven Future",
    ],
    lists: [
      "**Elastic Scalability:** Scale resources automatically to meet varying workload demands.",
      "**Reduced Costs:** Pay-as-you-go models reduce capital expenditure and optimize spending.",
      "**Improved Collaboration:** Cloud enables seamless access and collaboration across teams and locations.",
      "**Enhanced Security:** Benefit from advanced security controls and compliance certifications offered by cloud providers.",
    ],
    paragraphs: [
      "Cloud platforms empower businesses to innovate faster by simplifying development cycles, enabling testing environments, and integrating AI and analytics capabilities.",
      "Planning, expertise, and strategic execution are crucial to migrate critical workloads securely while minimizing disruption during the transition.",
      "Future-proof your business by adopting cloud-native architectures and leveraging containerization and orchestration tools.",
      "Embrace cloud solutions to unlock operational excellence, agility, and competitive advantage.",
    ],
    backToBlog: "← Back to Blog",
  },
  ar: {
    title: "حلول السحابة: تمكين العمليات التجارية القابلة للتوسع",
    author: "نيل روبرتس",
    date: "20 مارس 2025",
    readTime: "9 دقائق قراءة",
    categories: ["الحوسبة السحابية", "القابلية للتوسع"],
    intro:
      "لقد غيرت حلول السحابة من عمليات الأعمال من خلال توفير بنية تحتية مرنة، قابلة للتوسع، وفعالة من حيث التكلفة. تستفيد المؤسسات من منصات السحابة لتعزيز المرونة، تقليل تكاليف تكنولوجيا المعلومات، وتحقيق قدرات النشر السريع.",
    headings: [
      "المزايا الأساسية لاعتماد السحابة",
      "تسريع الابتكار التجاري",
      "التغلب على تحديات هجرة السحابة",
      "الاستعداد لمستقبل محرك بالسحابة",
    ],
    lists: [
      "**القابلية التوسعية المرنة:** توسيع الموارد تلقائيًا لتلبية متطلبات العمل المتغيرة.",
      "**خفض التكاليف:** تقلل نماذج الدفع حسب الاستخدام من النفقات الرأسمالية وتحسن الإنفاق.",
      "**تحسين التعاون:** توفر السحابة وصولًا سلسًا وتعاونًا عبر الفرق والمواقع.",
      "**تعزيز الأمان:** الاستفادة من ضوابط أمان متقدمة وشهادات الامتثال التي تقدمها مزودات السحابة.",
    ],
    paragraphs: [
      "تمكّن منصات السحابة الشركات من الابتكار بشكل أسرع من خلال تبسيط دورات التطوير، تمكين بيئات الاختبار، ودمج قدرات الذكاء الاصطناعي والتحليلات.",
      "التخطيط والخبرة والتنفيذ الاستراتيجي ضرورية لنقل الأحمال الحرجة بأمان مع تقليل الاضطراب أثناء الانتقال.",
      "جهز عملك للمستقبل من خلال اعتماد بنى تحتية أصلية للسحابة والاستفادة من أدوات الحاويات والتنظيم.",
      "احتضن حلول السحابة لفتح الامتياز التشغيلي والمرونة والميزة التنافسية.",
    ],
    backToBlog: "← العودة إلى المدونة",
  },
  he: {
    title: "פתרונות ענן: העצמת פעילות עסקית סקלאבילית",
    author: "ניל רוברטס",
    date: "20 במרץ 2025",
    readTime: "9 דקות קריאה",
    categories: ["מחשוב ענן", "סקלאביליות"],
    intro:
      "פתרונות ענן חוללו מהפכה בפעילות העסקית על ידי מתן תשתית גמישה, ניתנת להרחבה וחסכונית. ארגונים מנצלים פלטפורמות ענן לשיפור הגמישות, הפחתת עלויות IT, והשגת יכולות פריסה מהירה.",
    headings: [
      "יתרונות מרכזיים של אימוץ ענן",
      "האצת חדשנות עסקית",
      "התגברות על אתגרי מעבר לענן",
      "הכנה לעתיד מונחה ענן",
    ],
    lists: [
      "**סקלאביליות אלסטית:** הרחבת משאבים באופן אוטומטי כדי לעמוד בעומסי עבודה משתנים.",
      "**הפחתת עלויות:** מודלים של תשלום לפי שימוש מצמצמים הוצאות הון ואופטימיזציה של ההוצאות.",
      "**שיפור שיתוף הפעולה:** ענן מאפשר גישה ושיתוף פעולה חלקים בצוותים ומיקומים שונים.",
      "**הגברת האבטחה:** ליהנות מבקרות אבטחה מתקדמות ותעודות עמידה בתקנים שמציעים ספקי הענן.",
    ],
    paragraphs: [
      "פלטפורמות ענן מאפשרות לעסקים לחדש מהר יותר על ידי פישוט מחזורי פיתוח, יצירת סביבות בדיקה והטמעת יכולות AI וניתוח נתונים.",
      "תכנון, מומחיות וביצוע אסטרטגי הם הכרחיים להעברת עומסי עבודה קריטיים בצורה מאובטחת תוך מזעור הפרעות בתהליך.",
      "הכן את העסק לעתיד על ידי אימוץ ארכיטקטורות ענן-מקוריות וניצול כלי קונטיינרים ואורקסטרציה.",
      "אמצו פתרונות ענן כדי לשחרר מצוינות תפעולית, גמישות ויתרון תחרותי.",
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
