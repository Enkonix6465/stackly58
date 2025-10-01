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
      "Welcome to ForStackly's IT blog—a curated hub of insights, innovation, and expert advice.",
    heroBtn: "Reach Out Today",
    postsSectionLatest: "Latest Articles",
    postsSectionLatestSubheading: "Stay updated with our most recent insights and expert advice",
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
      "A curated selection of our top IT services insights, updates, and expert advice.",
    ctaTitle: "Ready to Transform Your Business?",
    ctaText:
      "Get started today with a free consultation and discover how we can help you achieve your goals.",
    ctaStartBtn: "Start Your Journey",
    ctaLearnBtn: "Learn More About Us",
    consultancyTitle: "Our Consultancy Platform",
    consultancySubtitle: "OUR SERVICES",
    consultancyDesc: "Comprehensive consultancy services designed to transform your business through expert guidance and strategic implementation.",
    service1Title: "Business Assessment & Strategy",
    service1Desc: "Comprehensive analysis of your current business state, identifying opportunities and creating a strategic roadmap for growth.",
    service2Title: "Implementation & Support",
    service2Desc: "Professional guidance through the execution phase with hands-on support and regular monitoring to ensure success.",
    service3Title: "Optimization & Growth",
    service3Desc: "Continuous improvement and scaling strategies to maximize your business potential and achieve sustainable growth.",
    authorsSectionTitle: "Meet Our Authors",
    authorsSectionDesc:
      "Discover the talented writers behind our insightful articles. Click on a profile to learn more about their background and recent work.",

    // Business cases data
    businessCases: [
      {
        id: 1,
        title: "Financial Analytics Platform",
        category: "Data Analytics",
        description: "Developed a comprehensive financial analytics platform that helped a Fortune 500 company reduce operational costs by 30%.",
        image: "images/bs1.jpg",
        featured: true
      },
      {
        id: 2,
        title: "Marketing Automation Suite",
        category: "Marketing",
        description: "Created an integrated marketing automation solution that increased customer engagement by 45% and improved conversion rates.",
        image: "images/bs2.jpg",
        featured: false
      },
      {
        id: 3,
        title: "Customer Experience Optimization",
        category: "UX/UI",
        description: "Redesigned the customer journey for a leading e-commerce platform, resulting in 25% higher customer satisfaction scores.",
        image: "images/bs3.jpg",
        featured: false
      }
    ],

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
    postsSectionLatest: "أحدث المقالات",
    postsSectionLatestSubheading: "ابق على اطلاع بأحدث رؤانا ونصائح خبرائنا",
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
      "تشكيلة مختارة من أبرز مقالات خدمات تكنولوجيا المعلومات لدينا.",
    ctaTitle: "هل أنت مستعد لتحويل عملك؟",
    ctaText:
      "ابدأ اليوم مع استشارة مجانية واكتشف كيف يمكننا مساعدتك في تحقيق أهدافك.",
    ctaStartBtn: "ابدأ رحلتك",
    ctaLearnBtn: "تعرف علينا أكثر",
    consultancyTitle: "منصة الاستشارات لدينا",
    consultancySubtitle: "خدماتنا",
    consultancyDesc: "خدمات استشارية شاملة مصممة لتحويل عملك من خلال التوجيه المتخصص والتنفيذ الاستراتيجي.",
    service1Title: "تقييم الأعمال والاستراتيجية",
    service1Desc: "تحليل شامل للوضع الحالي لعملك، وتحديد الفرص ووضع خارطة طريق استراتيجية للنمو.",
    service2Title: "التنفيذ والدعم",
    service2Desc: "إرشاد مهني خلال مرحلة التنفيذ مع الدعم العملي والمراقبة المنتظمة لضمان النجاح.",
    service3Title: "التحسين والنمو",
    service3Desc: "استراتيجيات التحسين المستمر والتوسع لتعظيم إمكانات عملك وتحقيق نمو مستدام.",
    authorsSectionTitle: "تعرف على مؤلفينا",
    authorsSectionDesc:
      "اكتشف الكتاب الموهوبين وراء مقالاتنا القيمة. انقر على ملف تعريفي لمعرفة المزيد عن خلفيتهم وأعمالهم الأخيرة.",

    // Business cases data
    businessCases: [
      {
        id: 1,
        title: "منصة التحليلات المالية",
        category: "تحليل البيانات",
        description: "طورنا منصة شاملة للتحليلات المالية ساعدت شركة من فورتشن 500 على تقليل التكاليف التشغيلية بنسبة 30%.",
        image: "images/bs1.jpg",
        featured: true
      },
      {
        id: 2,
        title: "مجموعة أتمتة التسويق",
        category: "التسويق",
        description: "أنشأنا حل أتمتة تسويق متكامل زاد من تفاعل العملاء بنسبة 45% وحسن معدلات التحويل.",
        image: "images/bs2.jpg",
        featured: false
      },
      {
        id: 3,
        title: "تحسين تجربة العملاء",
        category: "تجربة المستخدم",
        description: "أعدنا تصميم رحلة العميل لمنصة تجارة إلكترونية رائدة، مما أدى إلى زيادة درجات رضا العملاء بنسبة 25%.",
        image: "images/bs3.jpg",
        featured: false
      }
    ],

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
    postsSectionLatest: "המאמרים האחרונים",
    postsSectionLatestSubheading: "הישאר מעודכן עם התובנות והעצות המומחים העדכניות ביותר שלנו",
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
      "אוסף נבחר של התובנות הטובות ביותר שלנו בשירותי IT.",
    ctaTitle: "מוכן לשנות את העסק שלך?",
    ctaText:
      "התחל היום עם ייעוץ חינם וגלה כיצד נוכל לעזור לך להשיג את יעדיך.",
    ctaStartBtn: "התחל את המסע שלך",
    ctaLearnBtn: "למידע נוסף",
    consultancyTitle: "פלטפורמת הייעוץ שלנו",
    consultancySubtitle: "השירותים שלנו",
    consultancyDesc: "שירותי ייעוץ מקיפים המיועדים להפוך את העסק שלך באמצעות הנחיה מקצועית ויישום אסטרטגי.",
    service1Title: "הערכת עסקים ואסטרטגיה",
    service1Desc: "ניתוח מקיף של מצב העסק הנוכחי שלך, זיהוי הזדמנויות ויצירת מפת דרכים אסטרטגית לצמיחה.",
    service2Title: "יישום ותמיכה",
    service2Desc: "הנחיה מקצועית דרך שלב הביצוע עם תמיכה מעשית וניטור קבוע להבטחת הצלחה.",
    service3Title: "אופטימיזציה וצמיחה",
    service3Desc: "אסטרטגיות שיפור מתמשך וקנה מידה למקסום הפוטנציאל העסקי שלך והשגת צמיחה בת קיימא.",
    authorsSectionTitle: "הכירו את המחברים שלנו",
    authorsSectionDesc:
      "גלה את הכותבים המוכשרים שמאחורי המאמרים המובילים שלנו. לחץ על פרופיל למידע נוסף על הרקע והעבודות האחרונות שלהם.",

    // Business cases data
    businessCases: [
      {
        id: 1,
        title: "פלטפורמת אנליטיקה פיננסית",
        category: "ניתוח נתונים",
        description: "פיתחנו פלטפורמת אנליטיקה פיננסית מקיפה שעזרה לחברת Fortune 500 להפחית עלויות תפעול ב-30%.",
        image: "images/bs1.jpg",
        featured: true
      },
      {
        id: 2,
        title: "חבילת אוטומציה שיווקית",
        category: "שיווק",
        description: "יצרנו פתרון אוטומציה שיווקית משולב שהגדיל את מעורבות הלקוחות ב-45% ושיפר שיעורי המרה.",
        image: "images/bs2.jpg",
        featured: false
      },
      {
        id: 3,
        title: "אופטימיזציית חווית לקוח",
        category: "UX/UI",
        description: "עיצבנו מחדש את מסע הלקוח עבור פלטפורמת מסחר אלקטרוני מובילה, מה שהביא ל-25% יותר ציוני שביעות רצון לקוחות.",
        image: "images/bs3.jpg",
        featured: false
      }
    ],

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
  } catch { }
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
  const [activeIndex, setActiveIndex] = useState(0);
  const [fadeState, setFadeState] = useState("fade-in");
  const [selectedAuthor, setSelectedAuthor] = useState(null);
  const [showAllArticles, setShowAllArticles] = useState(false);
  const timeoutRef = useRef(null);

  useEffect(() => {
    document.title = t.documentTitle;
  }, [language, t.documentTitle]);


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
    return categoryMatch && searchMatch;
  });

  const displayedPosts = showAllArticles ? filteredPosts : filteredPosts.slice(0, 3);

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

            {/* Other Posts */}
            <div className="posts-section">
              <div className="section-header">
                <h2>
                  {selectedCategory === "all"
                    ? t.postsSectionLatest
                    : `${selectedCategory} ${t.postsSectionCategorySuffix}`}
                </h2>
                {selectedCategory === "all" && (
                  <p className="section-subheading">{t.postsSectionLatestSubheading}</p>
                )}
              </div>
              <div className="posts-grid">
                {displayedPosts.map((post, idx) => {
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
              {filteredPosts.length > 3 && !showAllArticles && (
                <div className="view-more-container">
                  <button
                    className="view-more-btn"
                    onClick={() => setShowAllArticles(true)}
                  >
                    View More Articles
                  </button>
                </div>
              )}
              {filteredPosts.length === 0 && (
                <p style={{ textAlign: "center", marginTop: 30 }}>{t.blogNoArticlesText}</p>
              )}
            </div>
          </motion.main>
        </div>
      </div>

      {/* Consultancy Platform Section */}
      <section className="consultancy-section">
        <div className="container">
          <motion.div
            className="consultancy-header"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <motion.p
              className="consultancy-subtitle"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              {t.consultancySubtitle}
            </motion.p>
            <motion.h2
              className="consultancy-title"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
            >
              {t.consultancyTitle}
            </motion.h2>
            <motion.p
              className="consultancy-desc"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              viewport={{ once: true }}
            >
              {t.consultancyDesc}
            </motion.p>
          </motion.div>

          <div className="consultancy-services">
            <motion.div
              className="service-card"
              initial={{ opacity: 0, y: 80, scale: 0.8 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              whileHover={{
                scale: 1.05,
                rotateY: 5,
                transition: { duration: 0.3 }
              }}
            >
              <motion.div
                className="service-icon"
                initial={{ scale: 0, rotate: -180 }}
                whileInView={{ scale: 1, rotate: 0 }}
                transition={{ duration: 0.8, delay: 0.4, type: "spring", stiffness: 200 }}
                viewport={{ once: true }}
                whileHover={{
                  scale: 1.1,
                  rotate: 360,
                  transition: { duration: 0.6 }
                }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24">
                  <g fill="none" fillRule="evenodd" clipRule="evenodd">
                    <path fill="#020202" d="M20.229 22.569c-3.994-.32-7.698.19-11.582.19c-.929 0-1.887 0-2.846-.11c-.549 0-1.926 0-3.115-.16c-.669-.09-1.298-.18-1.517-.51a1.5 1.5 0 0 1-.07-.758c0-.639.09-1.358.09-1.647c0-2.087-.05-4.843 0-7.339c0-1.118 0-2.186.08-3.125c0-.569.06-1.138.07-1.717c.07-2.266 0-4.533.12-6.8a.29.29 0 0 0-.3-.309a.29.29 0 0 0-.29.27C.71 2.55.67 4.547.57 6.544C.53 7.363.47 8.212.4 9.01a83 83 0 0 0-.23 4.264c-.06 2.196-.06 4.493-.07 6.3c0 .34-.11 1.228-.1 1.927c-.006.379.084.753.26 1.088c.452.498 1.07.814 1.737.889q1.856.22 3.725.19c.998.06 1.996.07 2.935 0c3.874-.09 7.518-.7 11.532-.49a.34.34 0 0 0 .34-.3a.33.33 0 0 0-.3-.309"></path>
                    <path fill="#020202" d="M6.99 6.315a1.53 1.53 0 0 0-2.097-.859a2.15 2.15 0 0 0-1.098 1.737a1.318 1.318 0 0 0 1.417 1.458q.224-.006.44-.06q.293-.093.569-.23a.3.3 0 0 0 .16-.19a1.9 1.9 0 0 0 .609-1.856M5.92 7.653a.32.32 0 0 0-.19.26H5.6a1.3 1.3 0 0 1-.339 0a.53.53 0 0 1-.489-.47a1 1 0 0 1 .11-.43c.098-.24.274-.44.5-.569c.399-.23.768.12.868.49a.26.26 0 0 0 0 .28a.56.56 0 0 1-.33.439m14.05-3.096c.276.236.635.354.998.33q.223 0 .439-.06q.292-.084.559-.23a.32.32 0 0 0 .17-.19a1.38 1.38 0 0 0 .579-1.846a1.52 1.52 0 0 0-2.087-.869a2.16 2.16 0 0 0-1.098 1.747a1.5 1.5 0 0 0 0 .29c.05.317.205.609.44.828m1.716-.669a.3.3 0 0 0-.19.26h-.13a1 1 0 0 1-.338 0a.57.57 0 0 1-.42-.26l.07-.08a.32.32 0 0 0 0-.449h-.1a.4.4 0 0 1 0-.1c.091-.247.268-.452.5-.579c.399-.24.768.13.868.5a.62.62 0 0 1-.28.708z"></path>
                    <path fill="#0c6fff" d="m7.399 8.012l.13.09l1.178.799c.07 0 .25.2.39.28a.64.64 0 0 0 .299.069a.8.8 0 0 0 .49-.24q.36-.4.628-.868q.518-.695 1.108-1.328c.8-.849.939-.58 1.608-.29l1.937.889c.24.12.559.33.868.47q.253.118.53.159a.5.5 0 0 0 .409-.14c.06-.06.19-.25.21-.27l.669-.818c.429-.52.878-.999 1.337-1.528c.44-.489.19-.998-.33-.729l-.239.22c-.509.48-.998.999-1.477 1.478l-.7.769l-.13-.07c-.239-.14-.488-.32-.678-.44l-.809-.419c-.4-.19-.808-.36-1.208-.54a5.5 5.5 0 0 0-.998-.369a1.17 1.17 0 0 0-.75 0a3.8 3.8 0 0 0-1.097.919a12 12 0 0 0-1.019 1.558c-.07.1-.31.399-.489.649l-.14-.05l-1.218-.69l-.27-.16c-.648-.019-.708.2-.239.6"></path>
                    <path fill="#020202" d="M5.073 16.279a1.52 1.52 0 0 0-1.248 0a2.23 2.23 0 0 0-1.099 1.747a1.308 1.308 0 0 0 1.438 1.448q.224 0 .44-.06q.298-.08.568-.23a.28.28 0 0 0 .16-.19a1.38 1.38 0 0 0 .59-1.846a1.72 1.72 0 0 0-.85-.87m-.2 2.236a.31.31 0 0 0-.19.25h-.13a1.3 1.3 0 0 1-.339 0a.52.52 0 0 1-.49-.47a.9.9 0 0 1 .11-.469c.096-.242.272-.443.5-.569c.4-.24.779.12.868.5a.6.6 0 0 1-.33.758M23.833 9.46a1.54 1.54 0 0 0-2.097-.869a2.18 2.18 0 0 0-1.098 1.747c-.015.354.083.704.28.999a2 2 0 0 0 1.158.489q.223 0 .44-.06q.295-.08.568-.22a.29.29 0 0 0 .16-.2a1.38 1.38 0 0 0 .589-1.886m-1.048 1.338a.29.29 0 0 0-.19.26h-.13a1 1 0 0 1-.34 0a.51.51 0 0 1-.489-.46a.94.94 0 0 1 .11-.48c.098-.24.274-.44.5-.568c.399-.24.778.13.868.499a.6.6 0 0 1-.33.749"></path>
                    <path fill="#0c6fff" d="M20.878 12.235c.379-.409.16-.998-.32-.639c-.11.1-.23.19-.34.3c-.319.31-.638.639-.928.998c-.29.36-.54.799-1.218.36a9.6 9.6 0 0 1-1.068-.999a3.7 3.7 0 0 0-.75-.609a.74.74 0 0 0-.608-.05a4.6 4.6 0 0 0-1.158.71a16.4 16.4 0 0 0-1.708 1.806a6.1 6.1 0 0 1-1.417 1.288a4 4 0 0 1-.25-.33c-.33-.299-.709-.698-1.118-.998a2.75 2.75 0 0 0-.999-.519a1.5 1.5 0 0 0-1.058.08a4.4 4.4 0 0 0-.998.849L5.77 15.58c-.489.56 0 .699.64.29l.998-.899q.364-.389.829-.649a.66.66 0 0 1 .479 0c.25.092.477.235.669.42c.37.309.699.708.998.998c0 0 .39.44.55.569a.62.62 0 0 0 .618.11a4.7 4.7 0 0 0 1.139-.75a19 19 0 0 0 1.677-1.806a6 6 0 0 1 1.428-1.288q.28.125.519.32c.45.452.95.854 1.487 1.197c.291.161.617.25.949.26a.8.8 0 0 0 .47-.19q.36-.374.628-.818c.27-.33.55-.66.849-.999l.16-.16z"></path>
                  </g>
                </svg>
              </motion.div>
              <motion.h3
                className="service-title"
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                viewport={{ once: true }}
              >
                {t.service1Title}
              </motion.h3>
              <motion.p
                className="service-desc"
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
                viewport={{ once: true }}
              >
                {t.service1Desc}
              </motion.p>
              <motion.button
                className="service-btn"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.0 }}
                viewport={{ once: true }}
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 8px 25px rgba(255, 215, 0, 0.4)"
                }}
                whileTap={{ scale: 0.95 }}
              >
                Read More
              </motion.button>
            </motion.div>

            <motion.div
              className="service-card"
              initial={{ opacity: 0, y: 80, scale: 0.8 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
              whileHover={{
                scale: 1.05,
                rotateY: 5,
                transition: { duration: 0.3 }
              }}
            >
              <motion.div
                className="service-icon"
                initial={{ scale: 0, rotate: -180 }}
                whileInView={{ scale: 1, rotate: 0 }}
                transition={{ duration: 0.8, delay: 0.6, type: "spring", stiffness: 200 }}
                viewport={{ once: true }}
                whileHover={{
                  scale: 1.1,
                  rotate: 360,
                  transition: { duration: 0.6 }
                }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width={32} height={32} viewBox="0 0 32 32">
                  <g fill="none">
                    <path fill="#ffc83d" d="M11.406 6.156c-5.275-.65-7.156 2-8.062 3.219c-2.469 3.64-.985 7.64.812 9.563c0 0 10.094 9.828 10.375 10.093s.946 1.172 2.547.914c1.398-.225 1.797-1.914 1.797-1.914s1.032.842 2.516 0c1.156-.656 1.109-1.968 1.109-1.968s1.238.62 2.563-.5c1.192-1.01.453-2.782.453-2.782s1.07.176 1.828-.656c1.025-1.125.672-2.547 0-3.187L19.625 10.5l-.594-3.125z"></path>
                    <path fill="#d67d00" d="m26.707 22.593l-2.226-2.257a.5.5 0 1 0-.712.703l1.764 1.788l-.017-.046s.582.096 1.191-.188m-2.729 3.557l-2.31-2.563a.5.5 0 0 0-.743.67l1.66 1.841c.199.076.73.232 1.393.053m-3.402 2.2l-1.806-1.913a.5.5 0 1 0-.727.687l.904.957c.199.13.795.45 1.629.269m-2.173.703c-.759.202-2.167.265-3.137-.773l-.776.71l.041.04q.044.042.1.1c.328.34 1.01 1.046 2.447.814c.622-.1 1.046-.49 1.325-.892"></path>
                    <path fill="#f59f00" d="M6.375 6.813c-1.687 2.166-4.287 7.775.313 11.625L5.24 19.993l-1.084-1.055C2.36 17.016.875 13.016 3.344 9.375l.04-.055c.525-.706 1.366-1.839 2.95-2.567z"></path>
                    <path fill="#d67d00" d="M17.25 23.688c1.203 1.39-.3 3.162-1 3.906L5.669 16.584c1.974-2.002 3.278-2.203 4.16-1.334c.88.869.468 1.484.468 1.484s1.194-.678 2.453.563c1.26 1.241.39 2.187.39 2.187s1.3-.234 2.22.797c1.03 1.157.374 2.5.374 2.5s.79.068 1.516.907"></path>
                    <path fill="#ffc83d" d="M12.438 8c3.234-1.297 8.14-1.953 10.39-1.984c1.531 0 3.481.37 5.547 2.797c3.3 3.874.828 8.296-1.125 10.093V17.5s-7.506-6.536-7.75-6.766c-.45-.425-2.302-.296-2.5-.234c-.604.188-1.65.5-3 1c-1.098.407-1.969.078-2.328-.766c-.36-.843-.842-2.09.765-2.734"></path>
                    <path fill="#d67d00" d="M28.31 17.71a8.4 8.4 0 0 1-1.06 1.196c-2.76-2.406-8.378-7.325-8.828-7.75s-.974-.406-1.172-.344A79 79 0 0 0 13.75 12c-1.098.407-2.203-.422-2.562-1.266c-.33-.771-.356-1.879.87-2.556l.632-.277l.05-.019c-1.953 1.468-.228 3.262 1.385 3.056c.567-.073 1.5-.266 2.406-.5c.36-.094.713-.259 1.046-.414c.625-.293 1.18-.552 1.58-.243c1.5 1.165 5.976 4.968 9.154 7.929"></path>
                    <path fill="#ffc83d" d="M8.82 16.879a2.203 2.203 0 0 0-3.09-.398L3.812 18.1c-.883.735-1.112 2.11-.467 3.002c.584.808 1.48 1.142 2.303.908c-.365.835-.334 1.903.367 2.49c.655.547 1.464.922 2.275.669c-.078.535.08 1.121.63 1.705c.52.551 1.276.826 2.087.643c-.107.572.074 1.208.743 1.853c.819.79 2.08.858 3.265-.23l.772-.9c.62-.78 1.478-2.136.196-3.288c-.443-.398-.952-.619-1.481-.62c.287-.7.282-1.558-.55-2.38c-.52-.513-1.157-.736-1.86-.568c.38-.808.371-1.633-.39-2.385c-.691-.683-1.543-1.007-2.643-.39c.194-.596.148-1.228-.24-1.731"></path>
                    <path fill="#d67d00" d="M9.034 17.242L4.31 21.907c.418.186.873.229 1.31.112l3.469-3.426l-.029.016c.15-.459.156-.94-.026-1.367m3.212 2.584L6.96 25.085c.425.171.878.226 1.332.085l3.807-3.786l-.005.001c.245-.52.328-1.048.153-1.559m2.326 3.071l-4.918 4.498c.404.177.865.231 1.345.125l3.513-3.213c.17-.427.23-.912.06-1.41"></path>
                  </g>
                </svg>
              </motion.div>
              <motion.h3
                className="service-title"
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
                viewport={{ once: true }}
              >
                {t.service2Title}
              </motion.h3>
              <motion.p
                className="service-desc"
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 1.0 }}
                viewport={{ once: true }}
              >
                {t.service2Desc}
              </motion.p>
              <motion.button
                className="service-btn"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.2 }}
                viewport={{ once: true }}
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 8px 25px rgba(255, 215, 0, 0.4)"
                }}
                whileTap={{ scale: 0.95 }}
              >
                Read More
              </motion.button>
            </motion.div>

            <motion.div
              className="service-card"
              initial={{ opacity: 0, y: 80, scale: 0.8 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              viewport={{ once: true }}
              whileHover={{
                scale: 1.05,
                rotateY: 5,
                transition: { duration: 0.3 }
              }}
            >
              <motion.div
                className="service-icon"
                initial={{ scale: 0, rotate: -180 }}
                whileInView={{ scale: 1, rotate: 0 }}
                transition={{ duration: 0.8, delay: 0.8, type: "spring", stiffness: 200 }}
                viewport={{ once: true }}
                whileHover={{
                  scale: 1.1,
                  rotate: 360,
                  transition: { duration: 0.6 }
                }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width={64} height={64} viewBox="0 0 64 64">
                  <g fill="#fbed21">
                    <path d="M39.11 49.04c6.447-6.442 5.87-17.448-1.276-24.599c-7.15-7.149-18.15-7.724-24.599-1.279c-6.443 6.437-16.529 28.11-9.38 35.26c7.153 7.151 28.819-2.94 35.26-9.378" opacity={0.62}></path>
                    <path d="M40.988 42.46c5.354-5.35 4.876-14.492-1.06-20.432c-5.94-5.938-15.08-6.415-20.432-1.062c-5.348 5.346-13.729 23.349-7.791 29.28c5.941 5.941 23.941-2.441 29.28-7.789" opacity={0.62}></path>
                  </g>
                  <path fill="#d1d2d3" d="M27.819 36.04c6.091 6.091 11.02 12.517 14.546 18.616c.492-3.073 2.555-7.911 8.781-18.06C63.512 16.436 64.786 2.028 63.434.682a3 3 0 0 0-.127-.126a3 3 0 0 0-.129-.127C61.834-.928 47.432.355 27.264 12.718c-10.149 6.226-14.992 8.285-18.06 8.779c6.097 3.521 12.527 8.455 18.616 14.546"></path>
                  <path fill="#86a7ac" d="M59.4.082c-5.729.485-17.372 3.584-32.14 12.637c-10.149 6.226-14.992 8.285-18.06 8.779c6.097 3.521 12.527 8.456 18.616 14.546c.256.256.492.516.75.771C26.691 19.705 45.532 8.356 59.399.082"></path>
                  <path fill="#de374b" d="M33.577 52.628c3.112 3.114 5.635 6.396 7.436 9.516c.249-1.572 1.303-4.046 4.484-9.234c6.32-10.305 6.977-17.667 6.281-18.355c-.02-.021-.046-.042-.065-.063s-.042-.046-.065-.065c-.687-.692-8.05-.037-18.354 6.281c-5.187 3.182-7.663 4.235-9.236 4.486c3.121 1.797 6.407 4.322 9.519 7.434"></path>
                  <path fill="#c5344d" d="M41.699 44.09c-2.653 3.278-4.675 7.455-5.208 11.729c1.787 2.115 3.326 4.255 4.521 6.323c.249-1.572 1.303-4.046 4.484-9.234c5.146-8.39 6.534-14.828 6.5-17.302c-3.415 2.852-7.447 4.955-10.297 8.484"></path>
                  <path fill="#de374b" d="M9.52 28.46c3.112 3.114 5.634 6.397 7.435 9.516c.249-1.572 1.302-4.046 4.487-9.234c6.318-10.305 6.971-17.667 6.279-18.356q-.031-.032-.066-.063c-.024-.022-.042-.046-.065-.065c-.686-.693-8.05-.037-18.354 6.281C4.05 19.721 1.574 20.774 0 21.025c3.121 1.799 6.408 4.324 9.52 7.435"></path>
                  <path fill="#c5344d" d="M12.844 21.432c5.595-2.679 11.441-5.706 14.918-10.973c-.016-.022-.026-.057-.026-.057c-.035-.037-.059-.057-.081-.079c-.024-.022-.042-.046-.065-.065c-.686-.693-8.05-.037-18.354 6.281C4.05 19.721 1.574 20.774 0 21.025c2.104 1.213 4.279 2.778 6.427 4.607a28.7 28.7 0 0 1 6.417-4.2"></path>
                  <path fill="#243438" d="M53.03 11.06c1.724 1.486 3.138 3.082 4.179 4.618c.071-.815.52-2.129 1.965-4.916c2.869-5.534 2.928-9.347 2.546-9.673a.1.1 0 0 0-.035-.03l-.035-.033c-.38-.33-4.14.28-9.21 3.912c-2.546 1.832-3.78 2.463-4.578 2.653c1.667.809 3.454 1.985 5.168 3.469"></path>
                </svg>
              </motion.div>
              <motion.h3
                className="service-title"
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 1.0 }}
                viewport={{ once: true }}
              >
                {t.service3Title}
              </motion.h3>
              <motion.p
                className="service-desc"
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 1.2 }}
                viewport={{ once: true }}
              >
                {t.service3Desc}
              </motion.p>
              <motion.button
                className="service-btn"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.4 }}
                viewport={{ once: true }}
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 8px 25px rgba(255, 215, 0, 0.4)"
                }}
                whileTap={{ scale: 0.95 }}
              >
                Read More
              </motion.button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Authors Section */}
      <section className="py-16 w-full bg-[var(--bg-color)] transition-colors duration-500" data-theme="dark">
        <div className="container mx-auto px-4">
          <motion.h2
            className="text-3xl md:text-4xl font-extrabold text-center mb-4 font-sans"
            style={{ color: "#fff" }}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            {t.authorsSectionTitle}
          </motion.h2>
          <motion.p
            className="text-center text-lg mb-12 max-w-2xl mx-auto font-sans"
            style={{ color: "#fff" }}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            {t.authorsSectionDesc}
          </motion.p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {t.authors.map((author, index) => {
              const authorArticles = t.articles.filter((a) => a.author === author.name);
              const extraClasses = index === 2 ? "md:flex md:justify-center" : "";
              return (
                <motion.div
                  key={author.name}
                  className={`${extraClasses} cursor-pointer`}
                  onClick={() => setSelectedAuthor(author)}
                  initial={{ opacity: 0, y: 80, scale: 0.8 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{
                    duration: 0.8,
                    delay: 0.4 + (index * 0.2),
                    type: "spring",
                    stiffness: 100
                  }}
                  viewport={{ once: true }}
                  whileHover={{
                    scale: 1.05,
                    y: -10,
                    transition: { duration: 0.3 }
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  <motion.div
                    className="rounded-xl shadow-xl p-8 flex flex-col items-center text-center"
                    style={{ backgroundColor: "#000", color: "#fff", boxShadow: "0 8px 30px rgba(0, 0, 0, 0.3)" }}
                    whileHover={{
                      boxShadow: "0 15px 40px rgba(255, 215, 0, 0.2)",
                      transition: { duration: 0.3 }
                    }}
                  >
                    <motion.img
                      src={author.image}
                      alt={`${author.name} Profile`}
                      className="w-24 h-24 rounded-full mb-4 object-cover border-4 border-transparent hover:border-[#ffd700] transition-colors duration-300"
                      loading="lazy"
                      initial={{ scale: 0, rotate: -180 }}
                      whileInView={{ scale: 1, rotate: 0 }}
                      transition={{
                        duration: 0.8,
                        delay: 0.6 + (index * 0.2),
                        type: "spring",
                        stiffness: 200
                      }}
                      viewport={{ once: true }}
                      whileHover={{
                        scale: 1.1,
                        rotate: 360,
                        borderColor: "#ffd700",
                        transition: { duration: 0.6 }
                      }}
                    />
                    <motion.h3
                      className="text-2xl font-bold mb-1 font-sans"
                      style={{ color: "#ffd700" }}
                      initial={{ opacity: 0, x: -30 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6, delay: 0.8 + (index * 0.2) }}
                      viewport={{ once: true }}
                    >
                      {author.name}
                    </motion.h3>
                    <motion.p
                      className="text-sm font-medium mb-4 font-sans"
                      style={{ color: "#fff" }}
                      initial={{ opacity: 0, x: -30 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6, delay: 1.0 + (index * 0.2) }}
                      viewport={{ once: true }}
                    >
                      {author.title}
                    </motion.p>
                    <motion.p
                      className="mb-4 font-sans"
                      style={{ color: "#fff" }}
                      initial={{ opacity: 0, x: -30 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6, delay: 1.2 + (index * 0.2) }}
                      viewport={{ once: true }}
                    >
                      {author.bio.length > 100 ? author.bio.slice(0, 100) + "..." : author.bio}
                    </motion.p>
                    <motion.div
                      className="flex items-center space-x-1 font-semibold font-sans"
                      style={{ color: "#ffd700" }}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 1.4 + (index * 0.2) }}
                      viewport={{ once: true }}
                      whileHover={{ scale: 1.05 }}
                    >
                      <motion.svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-4 h-4 inline-block"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        viewBox="0 0 24 24"
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.6 }}
                      >
                        <path d="M12 20L9 18l-6 3 3-6-3-6 6 3 3-2" />
                      </motion.svg>
                      <span>{authorArticles.length} Articles</span>
                    </motion.div>
                    <motion.span
                      className="mt-2 font-semibold font-sans underline"
                      style={{ color: "#ffd700" }}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 1.6 + (index * 0.2) }}
                      viewport={{ once: true }}
                      whileHover={{
                        scale: 1.1,
                        textShadow: "0 0 10px rgba(255, 215, 0, 0.5)"
                      }}
                    >
                      View Profile
                    </motion.span>
                  </motion.div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Author Modal */}
      <AnimatePresence>
        {selectedAuthor && (
          <motion.div key="modal" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75 p-4">
            <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }} transition={{ duration: 0.3 }} style={{ backgroundColor: "#000", color: "#fff", boxShadow: "0 8px 30px rgba(0, 0, 0, 0.3)" }} className="rounded-2xl p-6 md:p-8 max-w-3xl mx-auto relative overflow-y-auto max-h-[80vh] w-full">
              <button onClick={closeModal} className="absolute top-4 right-4 focus:outline-none" style={{ color: "#fff" }} aria-label="Close modal">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
              <div className="flex flex-col md:flex-row items-center md:items-start md:space-x-6">
                <div className="flex-shrink-0 mb-4 md:mb-0">
                  <img src={selectedAuthor.image} alt={`${selectedAuthor.name} Profile`} className="w-28 h-28 rounded-full object-cover border-4 shadow-md" style={{ borderColor: "#ffd700" }} />
                  <h3 className="text-2xl font-bold mt-4 font-sans" style={{ color: "#ffd700" }}>
                    {selectedAuthor.name}
                  </h3>
                  <p className="text-base mt-1 font-sans" style={{ color: "#fff" }}>
                    {selectedAuthor.title}
                  </p>
                </div>
                <div className="flex-grow mt-4 md:mt-0">
                  <p className="text-base mb-6 font-sans" style={{ color: "#fff" }}>
                    {selectedAuthor.bio}
                  </p>
                  <h4 className="text-xl font-bold font-sans mb-3" style={{ color: "#fff" }}>
                    Recent Articles
                  </h4>
                  <ul className="list-disc list-inside max-h-56 overflow-y-auto space-y-2 pr-2 font-sans" style={{ color: "#fff" }}>
                    {t.articles
                      .filter((a) => a.author === selectedAuthor.name)
                      .map((article, i) => (
                        <li key={i} className="flex items-center space-x-2">
                          <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" style={{ color: "#ffd700" }}>
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
        <div className="spotlight-bg-video">
          <video autoPlay muted loop playsInline>
            <source src="/images/videoss3.mp4" type="video/mp4" />
          </video>
        </div>
        <div className="spotlight-overlay"></div>
        
        <div className="spotlight-container">
          <motion.div 
            className="spotlight-header"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              {t.spotlightTitle}
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
            >
              {t.spotlightSubtitle}
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              viewport={{ once: true }}
            >
              {t.spotlightDescription}
            </motion.p>
          </motion.div>

          <motion.div 
            className="spotlight-content-wrapper"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="spotlight-main-content">
              <motion.div 
                className="spotlight-visual"
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 1.0 }}
                viewport={{ once: true }}
              >
                <motion.div 
                  className="spotlight-image-container"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                >
                  <motion.img 
                    src={`/images/bs${60 + activeIndex + 1}.jpg`} 
                    alt={activePost.title}
                    className="spotlight-image"
                    key={activeIndex}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                  />
                </motion.div>
              </motion.div>
              
              <motion.div 
                id="spotlight-content" 
                className={`spotlight-content ${fadeState}`}
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 1.2 }}
                viewport={{ once: true }}
              >
                <motion.p 
                  className="spotlight-category"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 1.4 }}
                  viewport={{ once: true }}
                >
                  {activePost.category}
                </motion.p>
                <motion.h3 
                  className="spotlight-post-title"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 1.6 }}
                  viewport={{ once: true }}
                >
                  <a href={activePost.url} className="spotlight-post-link">
                    {activePost.title}
                  </a>
                </motion.h3>
                <motion.div 
                  className="spotlight-post-meta"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 1.8 }}
                  viewport={{ once: true }}
                >
                  <span>
                    {t.postMetaAuthor} {activePost.author}
                  </span>
                  <span className="bullet">•</span>
                  <span>{activePost.readTime}</span>
                </motion.div>
                <motion.div 
                  className="spotlight-actions"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 2.0 }}
                  viewport={{ once: true }}
                >
                  <motion.button 
                    className="spotlight-read-btn"
                    whileHover={{ 
                      scale: 1.05,
                      boxShadow: "0 10px 25px rgba(255, 215, 0, 0.3)"
                    }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Read Article <FaArrowRight />
                  </motion.button>
                  <motion.div 
                    className="spotlight-stats"
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 2.2 }}
                    viewport={{ once: true }}
                  >
                    <motion.span 
                      className="stat-item"
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.2 }}
                    >
                      <FaThumbsUp /> 24
                    </motion.span>
                    <motion.span 
                      className="stat-item"
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.2 }}
                    >
                      <FaComment /> 8
                    </motion.span>
                    <motion.span 
                      className="stat-item"
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.2 }}
                    >
                      <FaShare /> 12
                    </motion.span>
                  </motion.div>
                </motion.div>
              </motion.div>
            </div>

            <motion.nav 
              id="spotlight-nav" 
              className="spotlight-nav"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 2.4 }}
              viewport={{ once: true }}
            >
              {t.posts.map((post, idx) => (
                <motion.button 
                  key={idx} 
                  type="button" 
                  className={`spotlight-tab ${idx === activeIndex ? "active" : ""}`} 
                  onClick={() => onSelectPost(idx)}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 2.6 + (idx * 0.1) }}
                  viewport={{ once: true }}
                  whileHover={{ 
                    scale: 1.02,
                    backgroundColor: "rgba(255, 215, 0, 0.1)"
                  }}
                  whileTap={{ scale: 0.98 }}
                >
                  <motion.div 
                    className="tab-thumbnail"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.2 }}
                  >
                    <img src={`/images/bs${60 + idx + 1}.jpg`} alt={post.title} />
                  </motion.div>
                  <div className="tab-content">
                    <motion.span 
                      className="tab-category"
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: 2.8 + (idx * 0.1) }}
                      viewport={{ once: true }}
                    >
                      {post.category}
                    </motion.span>
                    <motion.span 
                      className="tab-title"
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: 3.0 + (idx * 0.1) }}
                      viewport={{ once: true }}
                    >
                      {post.title}
                    </motion.span>
                  </div>
                </motion.button>
              ))}
            </motion.nav>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <motion.div 
          className="cta-container"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <motion.div 
            className="cta-image"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <motion.img 
              src="/images/CTABLOG.jpg" 
              alt="Business Consultancy"
              initial={{ scale: 1.1 }}
              whileInView={{ scale: 1 }}
              transition={{ duration: 1.2, delay: 0.4 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05 }}
            />
          </motion.div>
          <motion.div 
            className="cta-content"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <motion.div 
              className="cta-badge"
              initial={{ opacity: 0, y: 30, scale: 0.8 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              viewport={{ once: true }}
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0 8px 25px rgba(255, 215, 0, 0.3)"
              }}
            >
              CONSULTANCY
            </motion.div>
            <motion.h2 
              className="cta-title"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              viewport={{ once: true }}
            >
              {t.ctaTitle}
            </motion.h2>
            <motion.p 
              className="cta-description"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.2 }}
              viewport={{ once: true }}
            >
              {t.ctaText}
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.4 }}
              viewport={{ once: true }}
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link to="/contact" className="cta-button">
                  {t.ctaStartBtn}
                </Link>
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>
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
  color: #000;
  background-color: #ffd700;
  border-radius: 10px;
  text-decoration: none;
  border: none;
  transition: background-color 0.3s, transform 0.3s;
  opacity: 0;
  animation: fadeUp 1s ease-out forwards 1.5s;
}

.hero-button:hover {
  background-color: #fff;
  color: #000;
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
  padding: 40px 0;
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
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px 20px 20px 20px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  gap: 30px;
}


/* POSTS GRID - centered and even padding */
.posts-section {
  width: 100%;
}

.section-header {
  margin-bottom: 25px;
  text-align: center;
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

.section-subheading {
  color: var(--text-muted, #bbb);
  font-size: 1.1em;
  margin-bottom: 10px;
  font-style: italic;
}

.view-more-container {
  text-align: center;
  margin-top: 40px;
}

.view-more-btn {
  background: #ffd700;
  color: #000;
  border: none;
  padding: 12px 30px;
  border-radius: 25px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(255, 215, 0, 0.3);
}

.view-more-btn:hover {
  background: #fff;
  color: #000;
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(255, 215, 0, 0.4);
}

.posts-grid {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 24px;
  width: 100%;
}

@media (max-width: 1024px) {
  .posts-grid {
    grid-template-columns: 1fr 1fr;
    gap: 20px;
  }
}

@media (max-width: 768px) {
  .posts-grid {
    grid-template-columns: 1fr;
    gap: 20px;
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
  background: #ffd700;
  color: #000;
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
  color: #000;
  text-decoration: none;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: color 0.2s, transform 0.2s;
}

.read-more:hover {
  color: #000;
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
  border-color: #ffd700;
  color: #ffd700;
  background: rgba(255, 215, 0, 0.1);
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
  border-color: #ffd700;
}

.btn-small {
  padding: 8px 18px;
  font-size: 0.95rem;
  border-radius: 17px;
  font-weight: 700;
  background: #ffd700;
  color: #000;
  border: none;
  cursor: pointer;
  transition: background 0.15s;
}

.btn-small:hover {
  background: #fff;
  color: #000;
}

/* Responsive styles */
@media (max-width: 700px) {
  .blog-content {
    padding: 10px !important;
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

.spotlight-section {
  position: relative;
  padding: 80px 0;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: 'Inter', sans-serif;
  color: #fff;
  overflow: hidden;
}

.spotlight-bg-video {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -2;
}

.spotlight-bg-video video {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.spotlight-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: -1;
}


.spotlight-container {
  max-width: 1200px;
  width: 100%;
  padding: 0 2rem;
  z-index: 1;
}

.spotlight-header {
  text-align: center;
  margin-bottom: 4rem;
}

.spotlight-header h2 {
  font-weight: 600;
  color: #ffd700;
  text-transform: uppercase;
  font-size: 1rem;
  letter-spacing: 0.05em;
  margin-bottom: 0.5rem;
}

.spotlight-header p:first-of-type {
  font-size: 2.5rem;
  font-weight: 800;
  color: #fff;
  margin-bottom: 1rem;
}

.spotlight-header p:last-of-type {
  font-size: 1.125rem;
  color: #9ca3af;
  max-width: 600px;
  margin: 0 auto;
  line-height: 1.6;
  white-space: nowrap;
}

.spotlight-content-wrapper {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(20px);
  border-radius: 2rem;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.spotlight-main-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0;
  min-height: 400px;
}

.spotlight-visual {
  position: relative;
  overflow: hidden;
}

.spotlight-image-container {
  position: relative;
  width: 100%;
  height: 100%;
  min-height: 400px;
}

.spotlight-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.spotlight-visual:hover .spotlight-image {
  transform: scale(1.05);
}

.spotlight-content {
  padding: 3rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
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
  color: #ffd700;
  font-size: 0.875rem;
  letter-spacing: 0.05em;
  margin-bottom: 1rem;
}

.spotlight-post-title {
  font-size: 1.8rem;
  font-weight: 800;
  margin-bottom: 1.5rem;
  color: #fff;
  line-height: 1.3;
}

.spotlight-post-link {
  color: inherit;
  text-decoration: none;
  transition: color 0.3s;
}

.spotlight-post-link:hover {
  color: #ffd700;
}

.spotlight-post-meta {
  margin-bottom: 2rem;
  font-size: 0.875rem;
  color: #9ca3af;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.bullet {
  font-weight: 900;
}

.spotlight-actions {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.spotlight-read-btn {
  background: #ffd700;
  color: #000;
  border: none;
  padding: 12px 24px;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 8px;
  align-self: flex-start;
}

.spotlight-read-btn:hover {
  background: #fff;
  color: #000;
  transform: translateY(-2px);
  box-shadow: 0 10px 25px rgba(255, 215, 0, 0.3);
}

.spotlight-stats {
  display: flex;
  gap: 1.5rem;
}

.stat-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #9ca3af;
  font-size: 0.875rem;
  font-weight: 500;
}

.stat-item svg {
  color: #ffd700;
}

.spotlight-nav {
  background: rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(10px);
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 0;
  padding: 0;
}

.spotlight-tab {
  padding: 1.5rem;
  background: transparent;
  border: none;
  cursor: pointer;
  color: #9ca3af;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 1rem;
  border-right: 1px solid rgba(255, 255, 255, 0.1);
}

.spotlight-tab:last-child {
  border-right: none;
}

.spotlight-tab:hover {
  background: rgba(255, 255, 255, 0.05);
  color: #fff;
}

.spotlight-tab.active {
  background: rgba(255, 215, 0, 0.2);
  color: #fff;
  border-left: 3px solid #ffd700;
}

.tab-thumbnail {
  width: 60px;
  height: 60px;
  border-radius: 8px;
  overflow: hidden;
  flex-shrink: 0;
}

.tab-thumbnail img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.tab-content {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.tab-category {
  font-size: 0.75rem;
  color: #ffd700;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.tab-title {
  font-size: 0.875rem;
  font-weight: 600;
  line-height: 1.3;
}

/* Responsive Design */
@media (max-width: 1024px) {
  .spotlight-main-content {
    grid-template-columns: 1fr;
  }
  
  .spotlight-image-container {
    min-height: 300px;
  }
  
  .spotlight-content {
    padding: 2rem;
  }
}

@media (max-width: 768px) {
  .spotlight-section {
    padding: 60px 0;
  }
  
  .spotlight-container {
    padding: 0 1rem;
  }
  
  .spotlight-header h2 {
    font-size: 0.875rem;
  }
  
  .spotlight-header p:first-of-type {
    font-size: 2rem;
  }
  
  .spotlight-nav {
    grid-template-columns: 1fr;
  }
  
  .spotlight-tab {
    padding: 1rem;
  }
  
  .tab-thumbnail {
    width: 50px;
    height: 50px;
  }
}



{/* Consultancy Platform Section */}
.consultancy-section {
  padding: 80px 0;
  background: #f5f5f5;
  color: var(--text-color, #333);
}

[data-theme="dark"] .consultancy-section {
  background: #2a2a2a;
  color: var(--text-color, #fff);
}

.consultancy-header {
  text-align: center;
  margin-bottom: 60px;
}

.consultancy-subtitle {
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--text-muted, #bbb);
  text-transform: uppercase;
  letter-spacing: 0.1em;
  margin-bottom: 10px;
}

.consultancy-title {
  font-size: 2.5rem;
  font-weight: 800;
  color: var(--heading-color, #fff);
  margin-bottom: 20px;
}

.consultancy-desc {
  font-size: 1.1rem;
  color: var(--text-muted, #bbb);
  max-width: 600px;
  margin: 0 auto;
  line-height: 1.6;
}

.consultancy-services {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 30px;
  max-width: 1200px;
  margin: 0 auto;
}

.service-card {
  background: var(--card-bg, #232323);
  border-radius: 16px;
  padding: 40px 30px;
  text-align: center;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.2);
  border: 1px solid var(--border-color, #323232);
  transition: all 0.3s ease;
}

.service-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.3);
}

.service-icon {
  width: 80px;
  height: 80px;
  background: var(--card-bg, #232323);
  border: 2px solid var(--border-color, #323232);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 25px;
  transition: all 0.3s ease;
}

.service-card:hover .service-icon {
  border-color: #ffd700;
  background: rgba(255, 215, 0, 0.1);
}

.service-icon svg {
  width: 24px;
  height: 24px;
  color: var(--text-muted, #bbb);
  transition: color 0.3s ease;
}

.service-card:hover .service-icon svg {
  color: #ffd700;
}

.service-title {
  font-size: 1.4rem;
  font-weight: 700;
  color: var(--heading-color, #fff);
  margin-bottom: 15px;
  line-height: 1.3;
}

.service-desc {
  color: var(--text-muted, #bbb);
  line-height: 1.6;
  margin-bottom: 25px;
  font-size: 0.95rem;
}

.service-btn {
  background: #ffd700;
  color: #000;
  border: 2px solid #ffd700;
  padding: 12px 25px;
  border-radius: 8px;
  font-size: 0.95rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.service-btn:hover {
  background: transparent;
  color: #ffd700;
  border-color: #ffd700;
}

/* Responsive Design */
@media (max-width: 768px) {
  .consultancy-section {
    padding: 60px 0;
  }
  
  .consultancy-title {
    font-size: 2rem;
  }
  
  .consultancy-services {
    grid-template-columns: 1fr;
    gap: 25px;
  }
  
  .service-card {
    padding: 30px 20px;
  }
  
  .service-icon {
    width: 70px;
    height: 70px;
  }
}

{/* CTA Section */}
.cta-section {
  padding: 0;
  background: #f8f9fa;
}

.cta-container {
  max-width: 100%;
  margin: 0;
  padding: 0;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0;
  border-radius: 0;
  overflow: hidden;
  box-shadow: none;
}

.cta-image {
  position: relative;
  overflow: hidden;
}

.cta-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  min-height: 400px;
}

.cta-content {
  background: #000;
  padding: 60px 40px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
}

.cta-badge {
  background: #ffd700;
  color: #000;
  padding: 8px 16px;
  border-radius: 20px;
  font-size: 0.9rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 1px;
  display: inline-block;
  margin-bottom: 20px;
  width: fit-content;
  border: 1px solid #ffd700;
}

.cta-title {
  font-size: 2.5rem;
  font-weight: 800;
  color: white;
  margin-bottom: 20px;
  line-height: 1.2;
}

.cta-highlight {
  color: #ffd700;
  font-weight: 900;
  text-shadow: 0 0 10px rgba(255, 215, 0, 0.3);
}

.cta-description {
  font-size: 1.1rem;
  color: rgba(255, 255, 255, 0.9);
  margin-bottom: 30px;
  line-height: 1.6;
}

.cta-button {
  background: #ffd700;
  color: #000;
  padding: 15px 30px;
  border-radius: 8px;
  text-decoration: none;
  font-weight: 700;
  font-size: 1rem;
  text-transform: uppercase;
  letter-spacing: 1px;
  text-align: center;
  transition: all 0.3s ease;
  display: inline-block;
  width: fit-content;
}

.cta-button:hover {
  background: #fff;
  color: #000;
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(255, 215, 0, 0.3);
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
            
            /* CTA Responsive */
            .cta-container {
              grid-template-columns: 1fr;
              margin: 0;
            }
            
            .cta-content {
              padding: 40px 20px;
            }
            
            .cta-title {
              font-size: 2rem;
            }
            
            .cta-image img {
              min-height: 300px;
            }



      `}</style>
    </div>
  );
};

export default Blog;

