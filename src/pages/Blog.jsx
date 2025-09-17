import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaCalendar,
  FaUser,
  FaTag,
  FaClock,
  FaArrowRight,
  FaThumbsUp,
  FaShare,
  FaComment,
} from "react-icons/fa";
import { useLanguage } from "../context.jsx/LanguageContext";

// The translations object holds all text content and arrays per language:
const translations = {
  en: {
    documentTitle: "ForStackly IT Blog",
    heroTitle: "Blog",
    heroParagraph:
      "Welcome to ForStackly’s IT blog—a curated hub of insights, innovation, and expert advice tailored for modern businesses embracing technology.",
    heroBtn: "Reach Out Today",
    featuredBadgeText: "Featured",
    postsSectionLatest: "Latest Articles",
    postsSectionCategorySuffix: "Articles",
    postMetaAuthor: "By",
    postMetaReadTime: "min read",
    btnLike: "Like",
    btnComment: "Comment",
    btnShare: "Share",
    commentsPlaceholder: "Write a comment...",
    spotlightTitle: "In The Spotlight",
    spotlightSubtitle: "Handpicked Articles",
    spotlightDescription:
      "A curated selection of our top IT services insights, updates, and expert advice. Click any title below to explore how our solutions empower your business.",
    ctaTitle: "Ready to Transform Your Business?",
    ctaText:
      "Get started today with a free consultation and discover how we can help you achieve your goals.",
    ctaStartBtn: "Start Your Journey",
    ctaLearnBtn: "Learn More About Us",
    authorsSectionTitle: "Meet Our Authors",
    authorsSectionDesc:
      "Discover the talented writers behind our insightful articles. Click on a profile to learn more about their background and recent work.",

    // blogPosts full localized data here:
    blogPosts: [
      {
        id: 1,
        title: "Driving Business Growth through Digital Transformation",
        excerpt:
          "Discover strategies to leverage technology innovations that accelerate growth and improve competitive advantage.",
        author: "Alex Johnson",
        date: "2025-03-10",
        readTime: 7,
        category: "Business Strategy",
        image: "images/bs61.jpg",
        featured: true,
      },
      {
        id: 2,
        title: "Enhancing Productivity with Workflow Automation",
        excerpt:
          "Learn how automating core business processes can streamline operations and boost their efficiency.",
        author: "Linda Yang",
        date: "2025-02-28",
        readTime: 8,
        category: "Automation",
        image: "images/bs62.jpg",
        featured: false,
      },
      {
        id: 3,
        title: "Cloud Solutions: Empowering Scalable Business Operations",
        excerpt:
          "Explore cloud technologies that help businesses adapt faster and scale resources on demand.",
        author: "Neil Roberts",
        date: "2025-02-20",
        readTime: 9,
        category: "Cloud Computing",
        image: "images/bs63.jpg",
        featured: false,
      },
      {
        id: 4,
        title: "Building Agile Teams for Faster Market Response",
        excerpt:
          "Understand the value of agile teams and how they enable rapid innovation and customer-centric solutions.",
        author: "Maxine Patel",
        date: "2025-02-15",
        readTime: 6,
        category: "Agile Management",
        image: "images/bs64.jpg",
        featured: true,
      },
      {
        id: 5,
        title: "Optimizing Customer Experience in the Digital Age",
        excerpt:
          "Best practices to deliver seamless, personalized, and engaging experiences that drive customer loyalty and sustainable business growth.",
        author: "Sarah Mitchell",
        date: "2025-03-05",
        readTime: 7,
        category: "Customer Experience",
        image: "images/bs65.jpg",
        featured: false,
      },
    ],

    posts: [
      {
        category: "IT Infrastructure",
        title: "Maximizing Uptime with Reliable IT Infrastructure",
        author: "Alex Johnson",
        readTime: "8 min read",
        url: "#post-1",
      },
      {
        category: "Cybersecurity",
        title: "Best Practices to Safeguard Your Network",
        author: "Samantha Lee",
        readTime: "6 min read",
        url: "#post-2",
      },
      {
        category: "Cloud Computing",
        title: "How Cloud Solutions Enhance Business Agility",
        author: "Michael Chen",
        readTime: "5 min read",
        url: "#post-3",
      },
      {
        category: "Managed IT Services",
        title: "Benefits of Outsourcing IT for SMEs",
        author: "Maria Garcia",
        readTime: "10 min read",
        url: "#post-4",
      },
    ],

    authors: [
      {
        name: "Jane Doe",
        image: "images/bs66.jpg",
        title: "Senior Content Strategist",
        bio: "Jane is a technology writer with a passion for artificial intelligence and its real-world applications. She has been covering the tech industry for over 5 years.",
      },
      {
        name: "John Smith",
        image: "images/bs67.jpg",
        title: "Lead UX Designer",
        bio: "John is a seasoned UX designer and digital strategist. He focuses on creating intuitive and accessible user experiences that delight customers and drive business results.",
      },
      {
        name: "Michael Brown",
        image: "images/bs68.jpg",
        title: "Marketing Specialist",
        bio: "Michael is a marketing expert specializing in content strategy and SEO. He helps businesses build authority and reach their target audience through compelling content and data-driven insights.",
      },
    ],

    articles: [
      {
        title: "The Rise of Generative AI",
        category: "ai",
        date: "Oct 2, 2024",
        teaser: "Exploring the latest breakthroughs in AI models and their impact on content creation.",
        author: "Jane Doe",
      },
      {
        title: "Designing for Accessibility",
        category: "design",
        date: "Sep 25, 2024",
        teaser: "Best practices to ensure digital accessibility.",
        author: "John Smith",
      },
      {
        title: "Content Marketing in a Digital-First World",
        category: "marketing",
        date: "Sep 18, 2024",
        teaser: "Strategies for building brand presence.",
        author: "Jane Doe",
      },
      {
        title: "AI in Healthcare: A New Frontier",
        category: "ai",
        date: "Sep 10, 2024",
        teaser: "How AI is revolutionizing diagnostics.",
        author: "John Smith",
      },
      {
        title: "The Psychology of Color in UX",
        category: "design",
        date: "Sep 5, 2024",
        teaser: "How colour influences user behaviour.",
        author: "Michael Brown",
      },
      {
        title: "SEO Trends for 2025",
        category: "marketing",
        date: "Aug 30, 2024",
        teaser: "Staying ahead in search engines.",
        author: "Michael Brown",
      },
      {
        title: "Building Microservices Architecture",
        category: "ai",
        date: "Aug 25, 2024",
        teaser: "Guide to scalable microservices.",
        author: "Jane Doe",
      },
      {
        title: "Creating a Strong Brand Identity",
        category: "design",
        date: "Aug 20, 2024",
        teaser: "Developing a memorable brand.",
        author: "John Smith",
      },
    ],
  },

  ar: {
    documentTitle: "مدونة فورستاكلي لتقنية المعلومات",
    heroTitle: "المدونة",
    heroParagraph:
      "مرحبًا بكم في مدونة فورستاكلي لتقنية المعلومات — مركز مفصل من الرؤى والابتكار والنصائح المتخصصة الموجهة للأعمال الحديثة التي تتبنى التكنولوجيا.",
    heroBtn: "تواصل معنا",
    featuredBadgeText: "مميز",
    postsSectionLatest: "أحدث المقالات",
    postsSectionCategorySuffix: "مقالات",
    postMetaAuthor: "بواسطة",
    postMetaReadTime: "دقائق قراءة",
    btnLike: "إعجاب",
    btnComment: "تعليق",
    btnShare: "مشاركة",
    commentsPlaceholder: "اكتب تعليقًا...",
    spotlightTitle: "في دائرة الضوء",
    spotlightSubtitle: "مقالات مختارة",
    spotlightDescription:
      "تشكيلة مختارة من أبرز مقالات خدمات تكنولوجيا المعلومات لدينا. انقر على أي عنوان أدناه لاستكشاف كيفية تمكين حلولنا لنشاطك التجاري.",
    ctaTitle: "هل أنت مستعد لتحويل عملك؟",
    ctaText:
      "ابدأ اليوم مع استشارة مجانية واكتشف كيف يمكننا مساعدتك في تحقيق أهدافك.",
    ctaStartBtn: "ابدأ رحلتك",
    ctaLearnBtn: "تعرف علينا أكثر",
    authorsSectionTitle: "تعرف على مؤلفينا",
    authorsSectionDesc:
      "اكتشف الكتاب الموهوبين وراء مقالاتنا القيمة. انقر على ملف تعريفي لمعرفة المزيد عن خلفيتهم وأعمالهم الأخيرة.",

    blogPosts: [
      {
        id: 1,
        title: "دفع نمو الأعمال من خلال التحول الرقمي",
        excerpt:
          "اكتشف استراتيجيات الاستفادة من ابتكارات التكنولوجيا التي تسرع النمو وتحسن الميزة التنافسية.",
        author: "أليكس جونسون",
        date: "2025-03-10",
        readTime: 7,
        category: "استراتيجية الأعمال",
        image: "images/bs61.jpg",
        featured: true,
      },
      {
        id: 2,
        title: "تعزيز الإنتاجية باستخدام أتمتة سير العمل",
        excerpt:
          "تعلم كيف يمكن لأتمتة العمليات الأساسية للأعمال تبسيط العمليات وزيادة كفاءتها.",
        author: "ليندا يانغ",
        date: "2025-02-28",
        readTime: 8,
        category: "الأتمتة",
        image: "images/bs62.jpg",
        featured: false,
      },
      {
        id: 3,
        title: "حلول السحابة: تمكين العمليات التجارية القابلة للتوسع",
        excerpt:
          "استكشف تقنيات السحابة التي تساعد الأعمال على التكيف بسرعة أكبر وتوسيع الموارد عند الطلب.",
        author: "نيل روبرتس",
        date: "2025-02-20",
        readTime: 9,
        category: "الحوسبة السحابية",
        image: "images/bs63.jpg",
        featured: false,
      },
      {
        id: 4,
        title: "بناء فرق رشيقة للاستجابة الأسرع للسوق",
        excerpt:
          "فهم قيمة الفرق الرشيقة وكيف تمكن الابتكار السريع والحلول المتمركزة حول العميل.",
        author: "ماكسين باتيل",
        date: "2025-02-15",
        readTime: 6,
        category: "إدارة الرشاقة",
        image: "images/bs64.jpg",
        featured: true,
      },
      {
        id: 5,
        title: "تحسين تجربة العملاء في العصر الرقمي",
        excerpt:
          "أفضل الممارسات لتقديم تجارب سلسة، شخصية وجذابة تزيد من ولاء العملاء ونمو الأعمال المستدام.",
        author: "سارة ميتشل",
        date: "2025-03-05",
        readTime: 7,
        category: "تجربة العملاء",
        image: "images/bs65.jpg",
        featured: false,
      },
    ],

    posts: [
      {
        category: "البنية التحتية لتكنولوجيا المعلومات",
        title: "تعظيم الجهوزية مع بنية تحتية موثوقة لتكنولوجيا المعلومات",
        author: "أليكس جونسون",
        readTime: "8 دقائق قراءة",
        url: "#post-1",
      },
      {
        category: "الأمن السيبراني",
        title: "أفضل الممارسات لحماية شبكتك",
        author: "سامانثا لي",
        readTime: "6 دقائق قراءة",
        url: "#post-2",
      },
      {
        category: "الحوسبة السحابية",
        title: "كيف تعزز حلول السحابة المرونة التجارية",
        author: "مايكل تشين",
        readTime: "5 دقائق قراءة",
        url: "#post-3",
      },
      {
        category: "خدمات إدارة تكنولوجيا المعلومات",
        title: "فوائد الاستعانة بمصادر خارجية لتكنولوجيا المعلومات للشركات الصغيرة والمتوسطة",
        author: "ماريا غارسيا",
        readTime: "10 دقائق قراءة",
        url: "#post-4",
      },
    ],

    authors: [
      {
        name: "جين دو",
        image: "images/bs66.jpg",
        title: "استراتيجي محتوى أول",
        bio: "جين كاتبة تقنية متحمسة للذكاء الاصطناعي وتطبيقاته في العالم الحقيقي. تغطي صناعة التكنولوجيا لأكثر من 5 سنوات.",
      },
      {
        name: "جون سميث",
        image: "images/bs67.jpg",
        title: "مصمم تجربة المستخدم الرئيسي",
        bio: "جون مصمم UX ومخطط رقمي متمرس. يركز على إنشاء تجارب سهلة الوصول ومرنة تجذب العملاء وتعزز نتائج العمل.",
      },
      {
        name: "مايكل براون",
        image: "images/bs68.jpg",
        title: "أخصائي تسويق",
        bio: "مايكل خبير تسويق متخصص في استراتيجية المحتوى وتحسين محركات البحث. يساعد الشركات في بناء السلطة والوصول إلى جمهورها المستهدف من خلال محتوى مقنع ورؤى معتمدة على البيانات.",
      },
    ],

    articles: [
      {
        title: "صعود الذكاء الاصطناعي التوليدي",
        category: "الذكاء الاصطناعي",
        date: "2 أكتوبر 2024",
        teaser:
          "استكشاف أحدث الاختراقات في نماذج الذكاء الاصطناعي وتأثيرها على إنشاء المحتوى.",
        author: "جين دو",
      },
      {
        title: "التصميم من أجل الوصولية",
        category: "التصميم",
        date: "25 سبتمبر 2024",
        teaser: "أفضل الممارسات لضمان إمكانية الوصول الرقمي.",
        author: "جون سميث",
      },
      {
        title: "التسويق بالمحتوى في عالم رقمي أولاً",
        category: "التسويق",
        date: "18 سبتمبر 2024",
        teaser: "استراتيجيات بناء وجود العلامة التجارية.",
        author: "جين دو",
      },
      {
        title: "الذكاء الاصطناعي في الرعاية الصحية: جبهة جديدة",
        category: "الذكاء الاصطناعي",
        date: "10 سبتمبر 2024",
        teaser: "كيف يُحدث الذكاء الاصطناعي ثورة في التشخيص.",
        author: "جون سميث",
      },
      {
        title: "سيكولوجية اللون في تجربة المستخدم",
        category: "التصميم",
        date: "5 سبتمبر 2024",
        teaser: "كيف يؤثر اللون على سلوك المستخدم.",
        author: "مايكل براون",
      },
      {
        title: "اتجاهات تحسين محركات البحث لعام 2025",
        category: "التسويق",
        date: "30 أغسطس 2024",
        teaser: "البقاء في صدارة محركات البحث.",
        author: "مايكل براون",
      },
      {
        title: "بناء بنية الخدمات المصغرة",
        category: "الذكاء الاصطناعي",
        date: "25 أغسطس 2024",
        teaser: "دليل للبنية القابلة للتوسع للخدمات المصغرة.",
        author: "جين دو",
      },
      {
        title: "إنشاء هوية علامة تجارية قوية",
        category: "التصميم",
        date: "20 أغسطس 2024",
        teaser: "تطوير علامة تجارية لا تنسى.",
        author: "جون سميث",
      },
    ],
  },

  he: {
    documentTitle: "בלוג פורסטאקלי טכנולוגיות מידע",
    heroTitle: "בלוג",
    heroParagraph:
      "ברוכים הבאים לבלוג פורסטאקלי טכנולוגיות מידע - מרכז מקיף לתובנות, חידושים וייעוץ מומחים המותאמים לעסקים מודרניים המאמצים טכנולוגיה.",
    heroBtn: "צור קשר",
    featuredBadgeText: "מומלץ",
    postsSectionLatest: "המאמרים האחרונים",
    postsSectionCategorySuffix: "מאמרים",
    postMetaAuthor: "מאת",
    postMetaReadTime: "דקות קריאה",
    btnLike: "אהבתי",
    btnComment: "תגובה",
    btnShare: "שתף",
    commentsPlaceholder: "כתוב תגובה...",
    spotlightTitle: "במוקד",
    spotlightSubtitle: "מאמרים נבחרים",
    spotlightDescription:
      "אוסף נבחר של התובנות הטובות ביותר שלנו בשירותי IT. לחץ על כל כותרת למידע כיצד הפתרונות שלנו מאפשרים את העסק שלך.",
    ctaTitle: "מוכן לשנות את העסק שלך?",
    ctaText:
      "התחל היום עם ייעוץ חינם וגלה כיצד נוכל לעזור לך להשיג את יעדיך.",
    ctaStartBtn: "התחל את המסע שלך",
    ctaLearnBtn: "למידע נוסף",
    authorsSectionTitle: "הכירו את המחברים שלנו",
    authorsSectionDesc:
      "גלה את הכותבים המוכשרים שמאחורי המאמרים המובילים שלנו. לחץ על פרופיל למידע נוסף על הרקע והעבודות האחרונות שלהם.",

    blogPosts: [
      {
        id: 1,
        title: "הנעת צמיחת עסקים באמצעות טרנספורמציה דיגיטלית",
        excerpt:
          "גלה אסטרטגיות לניצול חידושי טכנולוגיה שמאיצים צמיחה ומשפרים יתרון תחרותי.",
        author: "אלכס ג'ונסון",
        date: "2025-03-10",
        readTime: 7,
        category: "אסטרטגיית עסקים",
        image: "images/bs61.jpg",
        featured: true,
      },
      {
        id: 2,
        title: "שיפור פרודוקטיביות באמצעות אוטומציה של תהליכי עבודה",
        excerpt:
          "למד כיצד לאוטומט תהליכים עסקיים מרכזיים כדי לפשט את הפעילות ולהגביר את היעילות.",
        author: "לינדה יאנג",
        date: "2025-02-28",
        readTime: 8,
        category: "אוטומציה",
        image: "images/bs62.jpg",
        featured: false,
      },
      {
        id: 3,
        title: "פתרונות ענן: העצמת תפעול עסקי סקלאבילי",
        excerpt:
          "חקור טכנולוגיות ענן המסייעות לעסקים להסתגל מהר יותר ולהרחיב משאבים לפי דרישה.",
        author: "ניל רוברטס",
        date: "2025-02-20",
        readTime: 9,
        category: "מחשוב ענן",
        image: "images/bs63.jpg",
        featured: false,
      },
      {
        id: 4,
        title: "בניית צוותים אג'יליים לתגובת שוק מהירה",
        excerpt:
          "הבנת הערך שבצוותים אג'יליים וכיצד הם מאפשרים חדשנות מהירה ופתרונות ממוקדי לקוח.",
        author: "מקסין פאטל",
        date: "2025-02-15",
        readTime: 6,
        category: "ניהול אג'ילי",
        image: "images/bs64.jpg",
        featured: true,
      },
      {
        id: 5,
        title: "אופטימיזציית חווית הלקוח בעידן הדיגיטלי",
        excerpt:
          "שיטות מיטביות לספק חוויות חלקות, מותאמות אישית ומרתקות שמניעות נאמנות וצמיחה עסקית בת קיימא.",
        author: "שרה מיטשל",
        date: "2025-03-05",
        readTime: 7,
        category: "חווית לקוח",
        image: "images/bs65.jpg",
        featured: false,
      },
    ],

    posts: [
      {
        category: "תשתיות IT",
        title: "מקסום זמינות עם תשתיות IT אמינות",
        author: "אלכס ג'ונסון",
        readTime: "8 דקות קריאה",
        url: "#post-1",
      },
      {
        category: "אבטחת סייבר",
        title: "הנחיות הטובות ביותר לאבטחת הרשת שלך",
        author: "סמנתה לי",
        readTime: "6 דקות קריאה",
        url: "#post-2",
      },
      {
        category: "מחשוב ענן",
        title: "כיצד פתרונות ענן משפרים את גמישות העסק",
        author: "מייקל צ'ן",
        readTime: "5 דקות קריאה",
        url: "#post-3",
      },
      {
        category: "שירותי IT מנוהלים",
        title: "יתרונות ההעברה של IT מחוץ לארגון לעסקים קטנים ובינוניים",
        author: "מריה גרסיה",
        readTime: "10 דקות קריאה",
        url: "#post-4",
      },
    ],

    authors: [
      {
        name: "ג'יין דו",
        image: "images/bs66.jpg",
        title: "אסטרטגית תוכן בכירה",
        bio: "ג'יין היא כתבת טכנולוגיה המתמחה בבינה מלאכותית ויישומיה בעולם האמיתי. מכסה את תעשיית הטכנולוגיה במשך למעלה מ-5 שנים.",
      },
      {
        name: "ג'ון סמית",
        image: "images/bs67.jpg",
        title: "מעצב UX מוביל",
        bio: "ג'ון הוא מעצב UX ותכניתן דיגיטלי מנוסה. מתמקד ביצירת חוויות שימוש אינטואיטיביות ונגישות שמרימות את הלקוחות ומניעות תוצאות עסקיות.",
      },
      {
        name: "מייקל בראון",
        image: "images/bs68.jpg",
        title: "מומחה שיווק",
        bio: "מייקל הוא מומחה שיווק המתמחה באסטרטגיית תוכן וקידום אתרים. הוא מסייע לעסקים לבנות סמכות ולהגיע לקהל היעד שלהם באמצעות תוכן משכנע ותובנות מבוססות נתונים.",
      },
    ],

    articles: [
      {
        title: "עליית ה-AI הגנרטיבי",
        category: "AI",
        date: "2 באוקטובר 2024",
        teaser: "חקר החדשות האחרונות במודלי AI והשפעתם על יצירת תוכן.",
        author: "ג'יין דו",
      },
      {
        title: "עיצוב לנגישות",
        category: "עיצוב",
        date: "25 בספטמבר 2024",
        teaser: "הנחיות הטובות ביותר להבטחת נגישות דיגיטלית.",
        author: "ג'ון סמית",
      },
      {
        title: "שיווק תוכן בעולם דיגיטלי ראשון",
        category: "שיווק",
        date: "18 בספטמבר 2024",
        teaser: "אסטרטגיות לבניית נוכחות מותג.",
        author: "ג'יין דו",
      },
      {
        title: "AI בתחום הבריאות: חזית חדשה",
        category: "AI",
        date: "10 בספטמבר 2024",
        teaser: "כיצד AI משבש את האבחון.",
        author: "ג'ון סמית",
      },
      {
        title: "פסיכולוגיית הצבע ב-UX",
        category: "עיצוב",
        date: "5 בספטמבר 2024",
        teaser: "כיצד צבע משפיע על התנהגות משתמש.",
        author: "מייקל בראון",
      },
      {
        title: "הטרנדים של SEO לשנת 2025",
        category: "שיווק",
        date: "30 באוגוסט 2024",
        teaser: "להישאר מובילים במנועי החיפוש.",
        author: "מייקל בראון",
      },
      {
        title: "בניית ארכיטקטורת מיקרו-שירותים",
        category: "AI",
        date: "25 באוגוסט 2024",
        teaser: "מדריך לארכיטקטורה סקלאבילית למיקרו-שירותים.",
        author: "ג'יין דו",
      },
      {
        title: "יצירת זהות מותג חזקה",
        category: "עיצוב",
        date: "20 באוגוסט 2024",
        teaser: "פיתוח מותג בלתי נשכח.",
        author: "ג'ון סמית",
      },
    ],
  },
};

// Helper functions (formatDate, getBlogReadInfo, etc.) remain unchanged
function formatDate(dateString) {
  if (!dateString) return "";
  const d = new Date(dateString);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(
    2,
    "0"
  )}-${String(d.getDate()).padStart(2, "0")}`;
}

function getBlogReadInfo(postId, defaultReadTime, defaultDate) {
  try {
    const stats = JSON.parse(localStorage.getItem("blogInteractions") || "{}");
    const post = stats[postId] || {};
    return {
      lastViewed: post.lastViewed,
      readTime: post.readTime || defaultReadTime,
      date: defaultDate,
    };
  } catch {
    return { lastViewed: null, readTime: defaultReadTime, date: defaultDate };
  }
}

function getInitialInteractions(posts) {
  let stored = {};
  try {
    stored = JSON.parse(localStorage.getItem("blogInteractions") || "{}");
  } catch {}
  const obj = {};
  posts.forEach((post) => {
    obj[post.id] = {
      likes: stored[post.id]?.likes || 0,
      comments: stored[post.id]?.comments || 0,
      shares: stored[post.id]?.shares || 0,
      showCommentInput: false,
      lastViewed: stored[post.id]?.lastViewed || null,
    };
  });
  return obj;
}

function saveInteractions(data) {
  localStorage.setItem("blogInteractions", JSON.stringify(data));
}

// Main Blog component
const Blog = () => {
  const { language } = useLanguage();
  const t = translations[language] || translations.en;

  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [postInteractions, setPostInteractions] = useState(() =>
    getInitialInteractions(t.blogPosts)
  );
  const [featuredPost, setFeaturedPost] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [fadeState, setFadeState] = useState("fade-in");
  const [selectedAuthor, setSelectedAuthor] = useState(null);
  const timeoutRef = useRef(null);

  useEffect(() => {
    document.documentElement.dir = ["ar", "he"].includes(language)
      ? "rtl"
      : "ltr";
    document.title = t.documentTitle;
  }, [language, t.documentTitle]);

  useEffect(() => {
    // Featured post by max likes, tiebreak by newest lastViewed
    const maxLikes = Math.max(
      ...Object.values(postInteractions).map((x) => x.likes),
      0
    );
    let candidates = t.blogPosts.filter(
      (p) => postInteractions[p.id]?.likes === maxLikes
    );
    if (candidates.length === 1) {
      setFeaturedPost(candidates[0]);
    } else if (candidates.length > 1) {
      let newestPost = candidates[0];
      let newestDate = postInteractions[newestPost.id]?.lastViewed
        ? new Date(postInteractions[newestPost.id].lastViewed)
        : new Date(newestPost.date);
      candidates.forEach((p) => {
        let viewed = postInteractions[p.id]?.lastViewed
          ? new Date(postInteractions[p.id].lastViewed)
          : new Date(p.date);
        if (viewed > newestDate) {
          newestPost = p;
          newestDate = viewed;
        }
      });
      setFeaturedPost(newestPost);
    } else {
      setFeaturedPost(null);
    }
  }, [postInteractions, t.blogPosts]);

  useEffect(() => {
    saveInteractions(postInteractions);
  }, [postInteractions]);

  useEffect(() => {
    return () => clearTimeout(timeoutRef.current);
  }, []);

  const filteredPosts = t.blogPosts.filter((post) => {
    const categoryMatch = selectedCategory === "all" || post.category === selectedCategory;
    const searchMatch =
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    return categoryMatch && searchMatch && post.id !== (featuredPost?.id || -1);
  });

  const updateInteraction = (postId, field, increment = 1) => {
    setPostInteractions((prev) => ({
      ...prev,
      [postId]: {
        ...prev[postId],
        [field]: (prev[postId][field] || 0) + increment,
        lastViewed: new Date().toISOString(),
      },
    }));
  };

  const handleLike = (postId) => updateInteraction(postId, "likes");
  const handleShare = (postId) => updateInteraction(postId, "shares");
  const toggleCommentInput = (postId) =>
    setPostInteractions((prev) => ({
      ...prev,
      [postId]: { ...prev[postId], showCommentInput: !prev[postId].showCommentInput },
    }));
  const handleCommentSubmit = (postId, e) => {
    e.preventDefault();
    updateInteraction(postId, "comments");
    setPostInteractions((prev) => ({
      ...prev,
      [postId]: { ...prev[postId], showCommentInput: false },
    }));
  };

  const onSelectPost = (index) => {
    if (index === activeIndex) return;
    setFadeState("fade-out");
    timeoutRef.current = setTimeout(() => {
      setActiveIndex(index);
      setFadeState("fade-in");
    }, 400);
  };

  const activePost = t.posts[activeIndex];

  useEffect(() => {
    if (selectedAuthor) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "unset";
  }, [selectedAuthor]);

  const closeModal = () => setSelectedAuthor(null);

  return (
    <div className="blog-page">
      {/* Hero Section */}
      <section className="hero-section">
        <video autoPlay muted loop playsInline className="hero-bg-video">
          <source src="/images/blog.mp4" type="video/mp4" />
        </video>
        <div className="hero-overlay">
          <div className="hero-content">
            <h1 className="hero-title">{t.heroTitle}</h1>
            <p className="hero-paragraph">{t.heroParagraph}</p>
            <Link to="/contact" className="hero-button">
              {t.heroBtn}
            </Link>
          </div>
        </div>
      </section>

      {/* Main Blog Content */}
      <div className="blog-main container">
        <div className="blog-grid">
          <motion.main
            className="blog-content"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Featured Post */}
            {featuredPost && (
              <motion.article
                className="featured-post"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <div className="featured-badge">{t.featuredBadgeText}</div>
                <div className="post-image">
                  <img src={featuredPost.image} alt={featuredPost.title} />
                  <div className="post-overlay">
                    <div className="post-category">{featuredPost.category}</div>
                  </div>
                </div>
                <div className="post-content">
                  {(() => {
                    const info = getBlogReadInfo(
                      featuredPost.id,
                      featuredPost.readTime,
                      featuredPost.date
                    );
                    return (
                      <div className="post-meta">
                        <span className="post-author">
                          <FaUser /> {t.postMetaAuthor} {featuredPost.author}
                        </span>
                        <span className="post-date">
                          <FaCalendar />{" "}
                          {info.lastViewed ? formatDate(info.lastViewed) : info.date}
                        </span>
                        <span className="post-read-time">
                          <FaClock /> {info.readTime} {t.postMetaReadTime}
                        </span>
                      </div>
                    );
                  })()}
                  <h2>{featuredPost.title}</h2>
                  <p>{featuredPost.excerpt}</p>
                  <div className="post-actions">
                    <Link to={`/blog${featuredPost.id}`} className="btn btn-primary">
                      Read More <FaArrowRight />
                    </Link>
                    <div className="post-buttons">
                      <button
                        className="action-btn"
                        onClick={() => handleLike(featuredPost.id)}
                        title={t.btnLike}
                      >
                        <FaThumbsUp /> {postInteractions[featuredPost.id]?.likes || 0}
                      </button>
                      <button
                        className="action-btn"
                        onClick={() => toggleCommentInput(featuredPost.id)}
                        title={t.btnComment}
                      >
                        <FaComment /> {postInteractions[featuredPost.id]?.comments || 0}
                      </button>
                      <button
                        className="action-btn"
                        onClick={() => handleShare(featuredPost.id)}
                        title={t.btnShare}
                      >
                        <FaShare /> {postInteractions[featuredPost.id]?.shares || 0}
                      </button>
                    </div>
                    {postInteractions[featuredPost.id]?.showCommentInput && (
                      <form
                        onSubmit={(e) => handleCommentSubmit(featuredPost.id, e)}
                        className="comment-form"
                      >
                        <input
                          type="text"
                          placeholder={t.commentsPlaceholder}
                          required
                          className="comment-input"
                        />
                        <button type="submit" className="btn btn-primary btn-small">
                          Post
                        </button>
                      </form>
                    )}
                  </div>
                </div>
              </motion.article>
            )}

            {/* Other Posts */}
            <div className="posts-section">
              <div className="section-header">
                <h2>
                  {selectedCategory === "all"
                    ? t.postsSectionLatest
                    : `${selectedCategory} ${t.postsSectionCategorySuffix}`}
                </h2>
                <p>{filteredPosts.length} articles found</p>
              </div>
              <div className="posts-grid">
                {filteredPosts.map((post, idx) => {
                  const interaction = postInteractions[post.id];
                  const info = getBlogReadInfo(post.id, post.readTime, post.date);
                  return (
                    <motion.article
                      key={post.id}
                      className="post-card"
                      initial={{ opacity: 0, y: 50 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: idx * 0.1 }}
                      viewport={{ once: true }}
                      whileHover={{ y: -10 }}
                    >
                      <div className="post-image">
                        <img src={post.image} alt={post.title} />
                        <div className="post-overlay">
                          <div className="post-category">
                            <FaTag /> {post.category}
                          </div>
                        </div>
                      </div>
                      <div className="post-content">
                        <div className="post-meta">
                          <span className="post-author">
                            <FaUser /> {t.postMetaAuthor} {post.author}
                          </span>
                          <span className="post-date">
                            <FaCalendar />{" "}
                            {info.lastViewed ? formatDate(info.lastViewed) : info.date}
                          </span>
                          <span className="post-read-time">
                            <FaClock /> {info.readTime} {t.postMetaReadTime}
                          </span>
                        </div>
                        <h3>{post.title}</h3>
                        <p>{post.excerpt}</p>
                        <div className="post-actions">
                          <Link to={`/blog${post.id}`} className="read-more btn btn-primary">
                            Read More <FaArrowRight />
                          </Link>
                          <div className="post-buttons">
                            <button
                              className="action-btn"
                              onClick={() => handleLike(post.id)}
                              title={t.btnLike}
                            >
                              <FaThumbsUp /> {interaction?.likes || 0}
                            </button>
                            <button
                              className="action-btn"
                              onClick={() => toggleCommentInput(post.id)}
                              title={t.btnComment}
                            >
                              <FaComment /> {interaction?.comments || 0}
                            </button>
                            <button
                              className="action-btn"
                              onClick={() => handleShare(post.id)}
                              title={t.btnShare}
                            >
                              <FaShare /> {interaction?.shares || 0}
                            </button>
                          </div>
                        </div>
                        {interaction?.showCommentInput && (
                          <form
                            onSubmit={(e) => handleCommentSubmit(post.id, e)}
                            className="comment-form"
                          >
                            <input
                              type="text"
                              placeholder={t.commentsPlaceholder}
                              required
                              className="comment-input"
                            />
                            <button type="submit" className="btn btn-primary btn-small">
                              Post
                            </button>
                          </form>
                        )}
                      </div>
                    </motion.article>
                  );
                })}
              </div>
              {filteredPosts.length === 0 && (
                <p style={{ textAlign: "center", marginTop: 30 }}>{t.blogNoArticlesText}</p>
              )}
            </div>
          </motion.main>
        </div>
      </div>

      {/* Authors Section */}
      <section className="py-16 w-full bg-[var(--bg-color)] transition-colors duration-500" data-theme="dark">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-extrabold text-center mb-4 font-sans" style={{ color: "var(--heading-color)" }}>
            {t.authorsSectionTitle}
          </h2>
          <p className="text-center text-lg mb-12 max-w-2xl mx-auto font-sans" style={{ color: "var(--text-muted)" }}>
            {t.authorsSectionDesc}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {t.authors.map((author, index) => {
              const authorArticles = t.articles.filter((a) => a.author === author.name);
              const extraClasses = index === 2 ? "md:flex md:justify-center" : "";
              return (
                <div key={author.name} className={`${extraClasses} cursor-pointer transition-transform duration-300 hover:-translate-y-2`} onClick={() => setSelectedAuthor(author)}>
                  <div className="rounded-xl shadow-xl p-8 flex flex-col items-center text-center" style={{ backgroundColor: "var(--card-bg)", color: "var(--text-color)", boxShadow: "var(--shadow)" }}>
                    <img src={author.image} alt={`${author.name} Profile`} className="w-24 h-24 rounded-full mb-4 object-cover border-4 border-transparent hover:border-indigo-600 transition-colors duration-300" loading="lazy" />
                    <h3 className="text-2xl font-bold mb-1 font-sans" style={{ color: "var(--primary-color)" }}>{author.name}</h3>
                    <p className="text-sm font-medium mb-4 font-sans" style={{ color: "var(--text-muted)" }}>{author.title}</p>
                    <p className="mb-4 font-sans" style={{ color: "var(--text-muted)" }}>
                      {author.bio.length > 100 ? author.bio.slice(0, 100) + "..." : author.bio}
                    </p>
                    <div className="flex items-center space-x-1 font-semibold font-sans" style={{ color: "var(--primary-color)" }}>
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 inline-block" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                        <path d="M12 20L9 18l-6 3 3-6-3-6 6 3 3-2" />
                      </svg>
                      <span>{authorArticles.length} Articles</span>
                    </div>
                    <span className="mt-2 font-semibold font-sans underline" style={{ color: "var(--primary-color)" }}>
                      View Profile
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Author Modal */}
      <AnimatePresence>
        {selectedAuthor && (
          <motion.div key="modal" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75 p-4">
            <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }} transition={{ duration: 0.3 }} style={{ backgroundColor: "var(--card-bg)", color: "var(--text-color)", boxShadow: "var(--shadow)" }} className="rounded-2xl p-6 md:p-8 max-w-3xl mx-auto relative overflow-y-auto max-h-[80vh] w-full">
              <button onClick={closeModal} className="absolute top-4 right-4 focus:outline-none" style={{ color: "var(--text-muted)" }} aria-label="Close modal">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
              <div className="flex flex-col md:flex-row items-center md:items-start md:space-x-6">
                <div className="flex-shrink-0 mb-4 md:mb-0">
                  <img src={selectedAuthor.image} alt={`${selectedAuthor.name} Profile`} className="w-28 h-28 rounded-full object-cover border-4 shadow-md" style={{ borderColor: "var(--primary-color)" }} />
                  <h3 className="text-2xl font-bold mt-4 font-sans" style={{ color: "var(--primary-color)" }}>
                    {selectedAuthor.name}
                  </h3>
                  <p className="text-base mt-1 font-sans" style={{ color: "var(--text-muted)" }}>
                    {selectedAuthor.title}
                  </p>
                </div>
                <div className="flex-grow mt-4 md:mt-0">
                  <p className="text-base mb-6 font-sans" style={{ color: "var(--text-muted)" }}>
                    {selectedAuthor.bio}
                  </p>
                  <h4 className="text-xl font-bold font-sans mb-3" style={{ color: "var(--heading-color)" }}>
                    Recent Articles
                  </h4>
                  <ul className="list-disc list-inside max-h-56 overflow-y-auto space-y-2 pr-2 font-sans" style={{ color: "var(--text-muted)" }}>
                    {t.articles
                      .filter((a) => a.author === selectedAuthor.name)
                      .map((article, i) => (
                        <li key={i} className="flex items-center space-x-2">
                          <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" style={{ color: "var(--primary-color)" }}>
                            <path d="M12 2L2 7l10 5 10-5" />
                            <path d="M2 17l10 5 10-5" />
                            <path d="M2 12l10 5 10-5" />
                          </svg>
                          <span>{article.title}</span>
                        </li>
                      ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Spotlight Section */}
      <section className="spotlight-section">
        <div className="spotlight-container">
          <div className="spotlight-header">
            <h2>{t.spotlightTitle}</h2>
            <p>{t.spotlightSubtitle}</p>
            <p>{t.spotlightDescription}</p>
          </div>

          <div className="spotlight-content-wrapper">
            <div id="spotlight-content" className={`spotlight-content ${fadeState}`}>
              <p className="spotlight-category">{activePost.category}</p>
              <h3 className="spotlight-post-title">
                <a href={activePost.url} className="spotlight-post-link">
                  {activePost.title}
                </a>
              </h3>
              <div className="spotlight-post-meta">
                <span>
                  {t.postMetaAuthor} {activePost.author}
                </span>
                <span className="bullet">•</span>
                <span>{activePost.readTime}</span>
              </div>
            </div>

            <nav id="spotlight-nav" className="spotlight-nav">
              {t.posts.map((post, idx) => (
                <button key={idx} type="button" className={`spotlight-tab ${idx === activeIndex ? "active" : ""}`} onClick={() => onSelectPost(idx)}>
                  {post.title}
                </button>
              ))}
            </nav>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="cta-overlay">
          <div className="container">
            <motion.div className="cta-content text-center" initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }}>
              <h2>{t.ctaTitle}</h2>
              <p>{t.ctaText}</p>
              <div className="cta-buttons">
                <Link to="/contact" className="btn btn-primary btn-large">
                  {t.ctaStartBtn} <FaArrowRight />
                </Link>
                <Link to="/about" className="btn btn-outline btn-large">
                  {t.ctaLearnBtn}
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>


 

        





       <style jsx>{`
         .home-page {
          padding-top: 80px;
        }

       .hero-section {
  position: relative;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  margin: 0;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

.hero-bg-video {
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  object-fit: cover;
  z-index: -1;
}

.hero-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1;
}

.hero-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;   /* ensures vertical centering inside overlay */
  text-align: center;
  color: #fff;
  max-width: 800px;
  z-index: 2;
  gap: 28px; /* space between title, text, and button */
}

.hero-title {
  color: #fff; /* ✅ force white text so it’s visible on dark video background in light mode */
  font-size: 2.8rem;
  font-weight: bold;
  line-height: 1.1;
  margin-bottom: 0;
  opacity: 0;
  animation: slideIn 1s ease-out forwards 0.5s;
}


.hero-paragraph {
  font-size: 1.25rem;
  margin: 0;
  opacity: 0;
  animation: fadeUp 1s ease-out forwards 1s;
}

.hero-button {
  margin-top: 0;
  padding: 14px 36px;
  font-size: 1.1rem;
  font-weight: 600;
  color: #fff;
  background-color: #224DB7;
  border-radius: 10px;
  text-decoration: none;
  border: none;
  transition: background-color 0.3s, transform 0.3s;
  opacity: 0;
  animation: fadeUp 1s ease-out forwards 1.5s;
}

.hero-button:hover {
  background-color: #000;
  transform: scale(1.05);
}

/* Responsive adjustments */
@media (max-width: 700px) {
  .hero-content {
    max-width: 95vw;
    padding: 0 10px;
    gap: 18px;
  }
  .hero-title {
    font-size: 2rem;
  }
  .hero-paragraph {
    font-size: 1rem;
  }
  .hero-button {
    font-size: 1rem;
  }
}

/* Animations */
@keyframes slideIn {
  0% { opacity: 0; transform: translateY(-20px);}
  100% { opacity: 1; transform: translateY(0);}
}
@keyframes fadeUp {
  0% { opacity: 0; transform: translateY(20px);}
  100% { opacity: 1; transform: translateY(0);}
}

        .hero-text h1 {
          font-size: 3.5rem;
          font-weight: 800;
          line-height: 1.2;
          margin-bottom: 20px;
          color: white;
        }

        .gradient-text {
          background: linear-gradient(45deg, #ffd700, #ff6b6b);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .hero-text p {
          font-size: 1.2rem;
          line-height: 1.6;
          margin-bottom: 30px;
          opacity: 0.9;
        }

        .hero-buttons {
          display: flex;
          gap: 20px;
          flex-wrap: wrap;
        }

        .hero-visual {
          position: relative;
        }

        .hero-image {
          position: relative;
          border-radius: 20px;
          overflow: hidden;
          border-radius: 200px;
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
        }

        .hero-image img {
          width: 100%;
          height: 400px;
          object-fit: cover;
        }

        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }

        .card-icon {
          font-size: 2rem;
          color: var(--primary-color);
        }

        .card-content h4 {
          color: var(--heading-color);
          margin: 0 0 5px 0;
          font-size: 1rem;
        }

        .card-content p {
          color: var(--text-muted);
          margin: 0;
          font-size: 0.9rem;
        }

/* BLOG MAIN CONTAINER */
.blog-main {
  background: var(--bg-color, #181818);
  padding: 80px 0;
  width: 100%;
}

/* FLEX CONTAINER, centers the blog content */
.blog-grid {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
}

/* CONTENT SECTION: centers and constrains width */
.blog-content {
  width: 100%;
  max-width: 900px;
  margin: 0 auto;
  padding: 40px 24px 40px 24px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  gap: 50px;
}

/* FEATURED POST */
.featured-post {
  background: var(--card-bg, #222);
  border-radius: 18px;
  box-shadow: 0 6px 30px rgba(40,40,40,0.08);
  border: 1px solid var(--border-color, #323232);
  margin-bottom: 30px;
  max-width: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  overflow: hidden;
  position: relative;
}

.featured-post .post-image {
  width: 100%;
  height: 300px;
  position: relative;
  overflow: hidden;
  background: #232323;
  display: flex;
  align-items: flex-end;
  border-top-left-radius: 18px;
  border-top-right-radius: 18px;
}

.featured-post .post-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.featured-badge {
  position: absolute;
  top: 20px;
  left: 20px;
  background: #ff6600;
  color: #fff;
  font-weight: 700;
  padding: 6px 22px;
  border-radius: 16px;
  font-size: 1rem;
  z-index: 2;
  letter-spacing: 0.02em;
}

.featured-post .post-category {
  position: absolute;
  left: 20px;
  bottom: 20px;
  background: #2563eb;
  color: white;
  padding: 8px 20px;
  border-radius: 23px;
  font-size: 1.03em;
  font-weight: 500;
  z-index: 2;
}

.featured-post .post-content {
  padding: 30px 28px 32px 28px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.featured-post .post-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 28px;
  margin-bottom: 14px;
  font-size: 1.05em;
  color: var(--text-muted, #bbb);
}

.featured-post .post-meta span {
  display: flex;
  align-items: center;
  gap: 7px;
}

.featured-post h2 {
  color: var(--heading-color, #fff);
  font-size: 2.1rem;
  margin: 0 0 8px 0;
  font-weight: 800;
  line-height: 1.17;
  word-break: break-word;
}

.featured-post p {
  color: var(--text-color, #ccc);
  margin-bottom: 10px;
  line-height: 1.6;
  font-size: 1.14rem;
}

.featured-post .post-actions {
  margin-top: 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

/* POSTS GRID - centered and even padding */
.posts-section {
  width: 100%;
}

.section-header {
  margin-bottom: 37px;
  text-align: left;
}

.section-header h2 {
  font-size: 1.7rem;
  font-weight: 800;
  color: var(--heading-color, #fff);
  margin-bottom: 7px;
}

.section-header p {
  color: var(--text-muted, #bbb);
  font-size: 1em;
}

.posts-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 32px;
  width: 100%;
}

@media (max-width: 900px) {
  .posts-grid {
    grid-template-columns: 1fr;
    gap: 24px;
  }
}

/* BLOG CARDS */
.post-card {
  background: var(--card-bg, #232323);
  border-radius: 16px;
  box-shadow: 0 3px 14px rgba(40,40,40,0.07);
  border: 1px solid var(--border-color, #232323);
  width: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  transition: box-shadow 0.14s;
}

.post-card .post-image {
  width: 100%;
  height: 175px;
  position: relative;
  background: #232323;
  display: flex;
  align-items: flex-end;
}

.post-card .post-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-top-left-radius: 16px;
  border-top-right-radius: 16px;
  display: block;
}

.post-card .post-overlay {
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  padding-left: 16px;
  padding-bottom: 10px;
  background: linear-gradient(to top, rgba(30,30,30,0.79) 38%, transparent 86%);
  box-sizing: border-box;
}
  

.post-card .post-category {
  background: #2563eb;
  color: #fff;
  display: inline-flex;
  align-items: center;
  gap: 7px;         /* Icon and text spacing */
  font-size: 1em;
  font-weight: 500;
  padding: 5px 16px; /* LESS padding: compact look */
  border-radius: 999px; /* Fully rounded pill shape */
  box-shadow: 0 2px 9px rgba(0,0,0,0.15);
  min-height: 28px; /* Ensures a small pill even with icon */
  line-height: 1;
}

/* Make the SVG icon align with the text perfectly */
.post-card .post-category svg {
  font-size: 1.08em;
  margin-right: 4px;
  vertical-align: middle;
}


.post-card .post-content {
  padding: 22px 17px 20px 17px;
  gap: 6px;
  display: flex;
  flex-direction: column;
  flex: 1 1 auto;
}

.post-card .post-meta {
  gap: 16px;
  margin-bottom: 11px;
  color: var(--text-muted, #bbb);
  font-size: 1em;
  display: flex;
  flex-wrap: wrap;
}

.post-card .post-meta span {
  display: flex;
  align-items: center;
  gap: 6px;
}

.post-card h3 {
  color: var(--heading-color, #fff);
  font-size: 1.18rem;
  line-height: 1.22;
  margin: 0 0 6px 0;
  font-weight: 700;
  word-break: break-word;
}

.post-card p {
  color: var(--text-color, #bbb);
  font-size: 1.01em;
  margin: 0 0 12px 0;
  line-height: 1.56;
}

/* Actions & Buttons */
.post-actions,
.post-buttons {
  display: flex;
  gap: 10px;
  align-items: center;
}

.post-actions {
  margin-top: 10px;
  justify-content: space-between;
}

.read-more {
  color: var(--primary-color, #2563eb);
  text-decoration: none;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: color 0.2s, transform 0.2s;
}

.read-more:hover {
  color: #183b78;
  transform: translateX(3px);
}

.action-btn {
  border: 2px solid var(--border-color, #353535);
  border-radius: 50%;
  background: transparent;
  color: var(--text-muted, #bbb);
  width: 37px;
  height: 37px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.09em;
  transition: background 0.2s, border-color 0.2s, color 0.2s;
}

.action-btn:hover {
  border-color: var(--primary-color, #2563eb);
  color: var(--primary-color, #2563eb);
  background: rgba(34, 77, 183, 0.07);
}

/* COMMENT FORM */
.comment-form {
  margin-top: 7px;
  display: flex;
  gap: 8px;
  align-items: center;
}

.comment-input {
  flex: 1;
  padding: 10px 12px;
  border-radius: 9px;
  border: 1.5px solid var(--border-color, #353535);
  font-size: 1rem;
  background: var(--input-bg, #191919);
  color: var(--text-color, #ddd);
  outline: none;
}

.comment-input:focus {
  border-color: var(--primary-color, #2563eb);
}

.btn-small {
  padding: 8px 18px;
  font-size: 0.95rem;
  border-radius: 17px;
  font-weight: 700;
  background: var(--primary-color, #2563eb);
  color: #fff;
  border: none;
  cursor: pointer;
  transition: background 0.15s;
}

.btn-small:hover {
  background: #183b78;
}

/* Responsive styles */
@media (max-width: 700px) {
  .blog-content, .featured-post .post-content {
    padding: 10px !important;
  }
  .featured-post .post-image {
    height: 180px;
  }
  .posts-grid {
    grid-template-columns: 1fr;
    gap: 15px;
  }
}

/* =========================
   Knowledge Hub Section
   ========================= */
.knowledge-hub {
  margin: 0 auto;
  max-width: 1200px;
  text-align: center;
  padding: 40px 20px;
}

.knowledge-title {
  font-size: 2.6rem;
  font-weight: 900;
  margin-bottom: 12px;
  background: linear-gradient(90deg, #6a11cb, #2575fc);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.knowledge-subtitle {
  font-size: 1.1rem;
  color: var(--text-muted);
  margin-bottom: 50px;
}

/* ==== FLEX LAYOUT FOR DYNAMIC CENTERED CARDS ==== */
.knowledge-grid {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  gap: 40px;
  flex-wrap: wrap;
  margin-top: 40px;
}

.knowledge-card {
  position: relative;
  border-radius: 22px;
  padding: 50px 30px 40px;
  background: rgba(255, 255, 255, 0.06);
  border: 2px solid transparent;
  background-clip: padding-box;
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.25);
  backdrop-filter: blur(12px);
  overflow: hidden;
  transition: transform 0.5s ease, box-shadow 0.5s ease;
  width: 350px;
  min-height: 280px;
}

.knowledge-card::before {
  content: "";
  position: absolute;
  inset: 0;
  border-radius: 22px;
  padding: 2px;
  background: linear-gradient(135deg, #6a11cb, #2575fc, #ff7eb3);
  background-size: 300% 300%;
  -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
          mask-composite: exclude;
  animation: borderShift 6s linear infinite;
}

@keyframes borderShift {
  0% { background-position: 0% 50%; }
  100% { background-position: 100% 50%; }
}

.knowledge-card:hover {
  transform: translateY(-12px) scale(1.04);
  box-shadow: 0 20px 40px rgba(0,0,0,0.35);
}

/* ==== ICON STYLES ==== */
.icon-badge {
  width: 70px;
  height: 70px;
  border-radius: 50%;
  background: linear-gradient(135deg, #6a11cb, #2575fc);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  color: #fff;
  margin: 0 auto 20px;
  box-shadow: 0 8px 20px rgba(0,0,0,0.3);
  position: relative;
  z-index: 2;
}

.knowledge-stat {
  font-size: 2.2rem;
  font-weight: 800;
  margin-bottom: 12px;
  background: linear-gradient(90deg, #ff7eb3, #ff758c);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.knowledge-text {
  font-size: 1rem;
  color: var(--text-color);
  line-height: 1.5;
}

/* ==== MOTION EFFECTS FOR DYNAMIC CARDS ==== */
.knowledge-card.left {
  animation: bubbleLeft 5s ease-in-out infinite;
}

.knowledge-card.center {
  animation: pulseCenter 5s ease-in-out infinite;
  z-index: 2;
}

.knowledge-card.right {
  animation: bubbleRight 5s ease-in-out infinite;
}

@keyframes bubbleLeft {
  0%, 100% { transform: translateX(0); }
  50% { transform: translateX(25px); }
}

@keyframes bubbleRight {
  0%, 100% { transform: translateX(0); }
  50% { transform: translateX(-25px); }
}

@keyframes pulseCenter {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.05); }
}


{/*spotlight section styles */}

:root {
  /* Light theme colors */
  --background-color: #f9fafb;
  --text-color-primary: #111827;
  --text-color-secondary: #6b7280; /* Gray 500 */
  --color-indigo-primary: #6366f1;
  --color-indigo-hover: #4f46e5;
  --nav-background: #f3f4f6;
  --nav-border: #e5e7eb;
  --tab-active-background: #4f46e5;
  --tab-active-color: #ffffff;
  --box-shadow: rgba(0, 0, 0, 0.05);
}

[data-theme="dark"] {
  /* Dark theme colors */
  --background-color: #121212;
  --text-color-primary: #e0e0e0;
  --text-color-secondary: #9ca3af;
  --color-indigo-primary: #818cf8;
  --color-indigo-hover: #6366f1;
  --nav-background: #1f2937;
  --nav-border: #374151;
  --tab-active-background: #6366f1;
  --tab-active-color: #e0e0e0;
  --box-shadow: rgba(0, 0, 0, 0.5);
}

/* Use variables in your styles */

.spotlight-section {
  padding: 4rem 1rem;
  background-color: var(--background-color);
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: 'Inter', sans-serif;
  color: var(--text-color-primary);
}

.spotlight-container {
  max-width: 48rem;
  width: 100%;
  padding: 0 1rem;
}

.spotlight-header {
  text-align: center;
  margin-bottom: 3rem;
}

.spotlight-title {
  font-weight: 600;
  color: var(--color-indigo-primary);
  text-transform: uppercase;
  font-size: 1rem;
  letter-spacing: 0.05em;
}

.spotlight-subtitle {
  font-size: 2rem;
  font-weight: 800;
  color: var(--text-color-primary);
  margin-top: 0.5rem;
}

.spotlight-description {
  font-size: 1.125rem;
  color: var(--text-color-secondary);
  margin-top: 1rem;
}

.spotlight-content-wrapper {
  background: var(--background-color);
  border-radius: 1rem;
  box-shadow: 0 4px 20px var(--box-shadow);
  overflow: hidden;
}

.spotlight-content {
  padding: 2rem;
  transition: opacity 0.4s ease-in-out, transform 0.4s ease-in-out;
}

.spotlight-content.fade-in {
  opacity: 1;
  transform: translateY(0);
}

.spotlight-content.fade-out {
  opacity: 0;
  transform: translateY(0.5rem);
}

.spotlight-category {
  font-weight: 600;
  text-transform: uppercase;
  color: var(--color-indigo-primary);
  font-size: 0.875rem;
  letter-spacing: 0.05em;
}

.spotlight-post-title {
  font-size: 1.5rem;
  font-weight: 800;
  margin-top: 1rem;
  color: var(--text-color-primary);
}

.spotlight-post-link {
  color: inherit;
  text-decoration: none;
  transition: color 0.3s;
}

.spotlight-post-link:hover {
  color: var(--color-indigo-hover);
}

.spotlight-post-meta {
  margin-top: 1.5rem;
  font-size: 0.875rem;
  color: var(--text-color-secondary);
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.bullet {
  font-weight: 900;
}

.spotlight-nav {
  background-color: var(--nav-background);
  border-top: 1px solid var(--nav-border);
  display: grid;
  grid-template-columns: repeat(auto-fit,minmax(8rem,1fr));
  gap: 0.75rem;
  padding: 1rem;
}

.spotlight-tab {
  font-size: 0.875rem;
  font-weight: 500;
  padding: 0.75rem 1rem;
  border-radius: 0.5rem;
  background: transparent;
  border: none;
  text-align: left;
  cursor: pointer;
  color: var(--text-color-primary);
  transition: background-color 0.3s, color 0.3s;
}

.spotlight-tab:hover {
  background-color: var(--nav-border);
}

.spotlight-tab.active {
  background-color: var(--tab-active-background);
  color: var(--tab-active-color);
}


{/* CTA Section */}
        .cta-section {
  position: relative;
  background: url('/images/bs69.jpg') center/cover no-repeat fixed; /* fixed background */
  padding: 0 0;
  color: white;
}

  .cta-overlay {
    background-color: rgba(0, 0, 0, 0.5); /* Dark overlay for readability */
    padding: 100px 0;
  }

  .cta-content {
    max-width: 700px;
    margin: auto;
    color:#fff;
  }

  .cta-content h2 {
    font-size: 2.5rem;
    margin-bottom: 20px;
    color:#fff;
  }

  .cta-content p {
    font-size: 1.2rem;
    margin-bottom: 30px;
  }

  .cta-buttons {
    display: flex;
    justify-content: center;
    gap: 15px;
  }

  .btn {
    padding: 12px 25px;
    border-radius: 5px;
    font-weight: bold;
    text-decoration: none;
    transition: 0.3s;
  }
    .btn-primary, .btn-outline, .btn-large {
    display: inline-flex;           /* Ensures horizontal layout! */
    align-items: center;            /* Vertically centers content */
    justify-content: center;        /* Centers content horizontally */
    gap: 8px;                       /* Space between text and icon */
  }

  .btn-primary svg {
    font-size: 1.3rem;
    vertical-align: middle;
  }


  .btn-primary {
    background: #ff6600;
    color: white;
  }

  .btn-primary:hover {
    background: #e65c00;
  }

  .btn-outline {
    border: 2px solid white;
    color: white;
  }

  .btn-outline:hover {
    background: white;
    color: black;
  }


  .btn {
    padding: 12px 25px;
    border-radius: 5px;
    font-weight: bold;
    text-decoration: none;
    transition: 0.3s;
  }

  .btn-primary {
    background: #224DB7;
    color: white;
  }

  .btn-primary:hover {
    background: #224DB7;
  }

  .btn-outline {
    border: 2px solid white;
    color: white;
  }

  .btn-outline:hover {
    background: white;
    color: black;
  }


          @media (max-width: 768px) {
            .hero-content {
              grid-template-columns: 1fr;
              text-align: center;
            }
              .services-content h2 {
            font-size: 0.9rem;
            margin-bottom: 20px;
            margin-left: -20px;
          }

          .services-content p {
            font-size: 0.9rem;
            line-height: 1.6;
            text-align: justify;
            margin-bottom: 30px;
            color: var(--text-color);
          }

            .hero-text h1 {
              font-size: 2.5rem;
            }
              .section-header h2 {
            font-size: 1.9rem;
            margin-bottom: 15px;
          }
            .cta-content h2 {
    font-size: 1.5rem;
    margin-bottom: 20px;
    color:#fff;
  }



      `}</style>
    </div>
  );
};

export default Blog;

