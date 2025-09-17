  import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { useInView } from "react-intersection-observer";
import {
  FaEye, FaBullseye, FaCogs, FaCloud, FaRobot, FaShieldAlt,
  FaHeadset, FaProjectDiagram, FaSearch, FaLinkedin, FaTwitter, FaGithub, FaArrowRight
} from "react-icons/fa";
import { useLanguage } from "../context.jsx/LanguageContext";

const translations = {
  en: {
    hero: {
      title: "About Us",
      paragraph: "At the heart of our business solutions is a commitment to innovation, reliability, and customer success.",
      cta: "Reach Out Today",
    },
    cardsData: [
      {
        id: "vision",
        titlePrimary: "Our Vision",
        descriptionPrimary: "To be the global leader in providing innovative solutions that empower businesses to achieve their full potential.",
        titleSecondary: "Shaping the Future",
        descriptionSecondary: "We envision a future where our technology is at the forefront of industry transformation.",
        gradient: "var(--gradient-primary)",
      },
      {
        id: "mission",
        titlePrimary: "Our Mission",
        descriptionPrimary: "To deliver exceptional value to our clients through a relentless commitment to quality, integrity, and client success.",
        titleSecondary: "Empowering Clients",
        descriptionSecondary: "We build long-term partnerships and empower our clients with the tools they need to succeed.",
        gradient: "var(--gradient-secondary)",
      },
      {
        id: "values",
        titlePrimary: "Our Core Values",
        descriptionPrimary: "Integrity, innovation, and client success are the pillars of our business. We operate with transparency and a passion for excellence.",
        titleSecondary: "Driven by Purpose",
        descriptionSecondary: "Every action we take is guided by a strong sense of purpose, ensuring we make a positive impact on the community.",
        gradient: "var(--gradient-accent)",
      }
    ],
    mainHeading: "OUR VISION & MISSION",
    subHeading: "Empowering businesses to realize their full potential.",
    subDescription: "We passionately pursue innovation, integrity, and excellence to transform business goals into impactful realities.",
    businessContent: {
      innovative: {
        image: "images/bs20.jpg",
        heading: "Innovative Solutions",
        text: "Leverage cutting-edge technology and creative strategies to drive business growth and operational efficiency.",
        cardImg: "https://placehold.co/200x200/6f7eea/ffffff?text=Innovation",
        cardTitle: "Innovative Solutions",
        cardDesc: "Empowering your business with the latest innovations.",
      },
      strategic: {
        image: "images/bs21.jpg",
        heading: "Strategic Planning",
        text: "Develop customized roadmaps tailored to your unique business needs for sustainable success.",
        cardImg: "https://placehold.co/200x200/34d39a/ffffff?text=Strategy",
        cardTitle: "Strategic Planning",
        cardDesc: "Crafting strategies that deliver results.",
      },
      digital: {
        image: "images/bs22.jpg",
        heading: "Digital Transformation",
        text: "Transform your operations and customer experiences through digital innovation and automation.",
        cardImg: "https://placehold.co/200x200/f76060/ffffff?text=Digital",
        cardTitle: "Digital Transformation",
        cardDesc: "Accelerate your digital journey.",
      },
    },
    whatWeDoTitle: "What We Do",
    whatWeDoItems: [
      { id: 1, title: "Business Consulting", description: "Helping businesses streamline operations and unlock growth opportunities with tailored strategies.", img: "images/bs24.jpg" },
      { id: 2, title: "Digital Transformation", description: "Guiding companies through adopting innovative technologies for better efficiency and customer engagement.", img: "images/bs25.jpg" },
      { id: 3, title: "Market Expansion", description: "Providing insights and roadmaps to successfully enter new markets and scale globally.", img: "images/bs26.jpg" },
      { id: 4, title: "Process Optimization", description: "Streamlining workflows to eliminate inefficiencies and improve productivity.", img: "images/bs27.jpg" },
      { id: 5, title: "Customer Experience", description: "Designing customer journeys that boost loyalty, retention, and overall satisfaction.", img: "images/bs28.jpg" },
      { id: 6, title: "Risk & Compliance", description: "Empowering businesses with frameworks to manage risks, governance, and compliance requirements.", img: "images/bs29.jpg" },
    ],
    statsData: [
      { value: 98, suffix: "%", text: "Client retention rate built on trust and reliability." },
      { value: 50, suffix: "+", text: "Industries served across healthcare, finance, and more." },
      { value: 15, suffix: "+ Years", text: "Proven expertise in delivering scalable IT solutions." },
      { value: 24, suffix: "/7", text: "Global support ensuring business continuity anytime." }
    ],
    values: [
      { icon: FaCloud, title: "Cloud Transformation", description: "Enabling seamless migration to the cloud with secure, scalable, and cost-efficient infrastructure." },
      { icon: FaShieldAlt, title: "Cybersecurity & Compliance", description: "Protecting digital assets through proactive threat management, risk assessment, and regulatory compliance." },
      { icon: FaRobot, title: "AI-Driven Innovation", description: "Harnessing artificial intelligence and automation to optimize workflows and accelerate decision-making." },
      { icon: FaCogs, title: "Tailored IT Solutions", description: "Delivering customized technology strategies and solutions that align with evolving business objectives." }
    ],
    teamSectionTitle: "Leadership",
    teamSectionSubtitle: "Innovation driven by dedicated leaders",
    team: [
      { name: "Rohan Kapoor", role: "Chief Technology Strategist", bio: "Leads digital transformation initiatives, aligning advanced technologies with long-term business goals.", image: "images/bs29.jpg",
        social: { linkedin: "https://www.linkedin.com/in/rohankapoor/", twitter: "https://twitter.com/rohan_kapoor", github: "https://github.com/rohankapoor" }
      },
      { name: "Simran Kaur", role: "Enterprise Solutions Consultant", bio: "Advises global clients on optimizing operations through tailored IT and business process solutions.", image: "images/bs31.jpg",
        social: { linkedin: "https://www.linkedin.com/in/simran-kaur/", twitter: "https://twitter.com/simrankaur", github: "https://github.com/simrankaur" }
      },
      { name: "Arjun Nair", role: "Data & Analytics Lead", bio: "Transforms data into actionable insights, driving performance improvements and new growth opportunities.", image: "images/bs30.jpg",
        social: { linkedin: "https://www.linkedin.com/in/arjun-nair/", twitter: "https://twitter.com/arjun_nair", github: "https://github.com/arjunnair" }
      },
      { name: "Neha Malhotra", role: "Client Success Director", bio: "Builds long-term partnerships by ensuring delivery excellence and measurable business outcomes.", image: "images/bs32.jpg",
        social: { linkedin: "https://www.linkedin.com/in/nehmalhotra/", twitter: "https://twitter.com/nehamalhotra", github: "https://github.com/nehamalhotra" }
      }
    ],
    cta: {
      title: "Ready to Transform Your Business?",
      paragraph: "Get started today with a free consultation and discover how we can help you achieve your goals.",
      startJourneyText: "Start Your Journey",
      learnMoreText: "Learn More About Us"
    },
    milestones: [
      {
        year: "2018",
        event: "Company Founding",
        description: "Founded with a vision to provide innovative IT consulting and cloud solutions to businesses.",
      },
      {
        year: "2020",
        event: "First Large-Scale Cloud Deployment",
        description: "Successfully delivered a multi-region cloud infrastructure project for a leading enterprise client.",
      },
      {
        year: "2022",
        event: "Advanced Cybersecurity Services Launched",
        description: "Introduced comprehensive cybersecurity offerings, including threat intelligence and risk management.",
      },
      {
        year: "2024",
        event: "AI & Automation Services Expansion",
        description: "Integrated AI-powered automation tools enhancing client efficiency and reducing operational costs.",
      },
      {
        year: "2025",
        event: "Global Growth and Strategic Partnerships",
        description: "Expanded global footprint with key partnerships driving digital transformation across industries.",
      },
    ]
  },

  ar: {
    hero: {
      title: "معلومات عنا",
      paragraph: "في جوهر حلول أعمالنا التزام بالابتكار والموثوقية ونجاح العملاء.",
      cta: "تواصل اليوم"
    },
    cardsData: [
      {
        id: "vision",
        titlePrimary: "رؤيتنا",
        descriptionPrimary: "أن نكون الرائد العالمي في تقديم حلول مبتكرة تمكن الشركات من تحقيق كامل إمكاناتها.",
        titleSecondary: "تشكيل المستقبل",
        descriptionSecondary: "نتخيل مستقبلًا حيث تكون تقنيتنا في طليعة تحول الصناعة.",
        gradient: "var(--gradient-primary)",
      },
      {
        id: "mission",
        titlePrimary: "مهمتنا",
        descriptionPrimary: "تقديم قيمة استثنائية لعملائنا من خلال الالتزام القوي بالجودة والنزاهة ونجاح العميل.",
        titleSecondary: "تمكين العملاء",
        descriptionSecondary: "نبني شراكات طويلة الأمد ونزود عملائنا بالأدوات اللازمة للنجاح.",
        gradient: "var(--gradient-secondary)",
      },
      {
        id: "values",
        titlePrimary: "قيمنا الأساسية",
        descriptionPrimary: "النزاهة، الابتكار، ونجاح العميل هي ركائز أعمالنا. نعمل بشفافية وشغف للتميز.",
        titleSecondary: "مدفوعون بالهدف",
        descriptionSecondary: "كل إجراء نقوم به يُوجه بحس قوي بالهدف لضمان تأثير إيجابي على المجتمع.",
        gradient: "var(--gradient-accent)",
      }
    ],
    mainHeading: "رؤيتنا ومهمتنا",
    subHeading: "تمكين الشركات لتحقيق كامل إمكاناتها.",
    subDescription: "نؤمن بالابتكار والنزاهة والتميز لتحويل أهداف الأعمال إلى واقع.",
    businessContent: {
      innovative: {
        image: "images/bs20.jpg",
        heading: "حلول مبتكرة",
        text: "استخدم التكنولوجيا المتقدمة والاستراتيجيات الإبداعية لتعزيز نمو الأعمال وكفاءة العمليات.",
        cardImg: "https://placehold.co/200x200/6f7eea/ffffff?text=Innovation",
        cardTitle: "حلول مبتكرة",
        cardDesc: "تمكين عملك بأحدث الابتكارات.",
      },
      strategic: {
        image: "images/bs21.jpg",
        heading: "التخطيط الاستراتيجي",
        text: "وضع خرائط طريق مخصصة تناسب احتياجات عملك الفريدة لتحقيق النجاح المستدام.",
        cardImg: "https://placehold.co/200x200/34d39a/ffffff?text=Strategy",
        cardTitle: "التخطيط الاستراتيجي",
        cardDesc: "صياغة استراتيجيات تحقق نتائج.",
      },
      digital: {
        image: "images/bs22.jpg",
        heading: "التحول الرقمي",
        text: "حوّل عملياتك وتجارب العملاء باستخدام الابتكار الرقمي والأتمتة.",
        cardImg: "https://placehold.co/200x200/f76060/ffffff?text=Digital",
        cardTitle: "التحول الرقمي",
        cardDesc: "سرّع رحلتك الرقمية.",
      },
    },
    whatWeDoTitle: "ماذا نفعل",
    whatWeDoItems: [
      { id: 1, title: "الاستشارات التجارية", description: "مساعدة الشركات على تبسيط العمليات واغتنام فرص النمو باستراتيجيات مخصصة.", img: "images/bs24.jpg" },
      { id: 2, title: "التحول الرقمي", description: "إرشاد الشركات لاعتماد التكنولوجيا الحديثة وتحسين الكفاءة وتجربة العملاء.", img: "images/bs25.jpg" },
      { id: 3, title: "توسيع السوق", description: "توفير الرؤى وخطط العمل لدخول أسواق جديدة وتوسيع النطاق العالمي.", img: "images/bs26.jpg" },
      { id: 4, title: "تحسين العمليات", description: "تبسيط سير العمل للقضاء على الهدر وزيادة الإنتاجية.", img: "images/bs27.jpg" },
      { id: 5, title: "تجربة العملاء", description: "تصميم رحلات عملاء تعزز الولاء والاحتفاظ والرضا.", img: "images/bs28.jpg" },
      { id: 6, title: "المخاطر والامتثال", description: "تمكين الشركات بإطارات لإدارة المخاطر والحوكمة والامتثال.", img: "images/bs29.jpg" },
    ],
    statsData: [
      { value: 98, suffix: "%", text: "معدل الاحتفاظ بالعملاء بناءً على الثقة والاعتمادية." },
      { value: 50, suffix: "+", text: "خدمنا قطاعات متنوعة منها الصحة والمالية وأكثر." },
      { value: 15, suffix: "+ سنوات", text: "خبرة مثبتة في تقديم حلول تقنية قابلة للتوسع." },
      { value: 24, suffix: "/7", text: "دعم عالمي لضمان استمرارية الأعمال في كل وقت." }
    ],
    values: [
      { icon: FaCloud, title: "تحول سحابي", description: "تمكين الانتقال السلس إلى السحابة ببيئة آمنة وقابلة للتوسع وفعالة من حيث التكلفة." },
      { icon: FaShieldAlt, title: "الأمن السيبراني والامتثال", description: "حماية الأصول الرقمية عبر إدارة استباقية للمخاطر والامتثال." },
      { icon: FaRobot, title: "الابتكار بالذكاء الاصطناعي", description: "استغلال الذكاء الاصطناعي والأتمتة لتحسين سير العمل وتسريع اتخاذ القرار." },
      { icon: FaCogs, title: "حلول تقنية مُخصصة", description: "تسليم استراتيجيات تقنية وحلول مصمّمة خصيصًا للأهداف المتغيرة للأعمال." }
    ],
    teamSectionTitle: "القيادة",
    teamSectionSubtitle: "الابتكار بقيادة قادة مخلصين",
    team: [
      { name: "روهان كابور", role: "كبير استراتيجيي التكنولوجيا", bio: "يقود مبادرات التحول الرقمي، ويوافق التقنيات المتقدمة مع الأهداف طويلة المدى.", image: "images/bs29.jpg",
        social: { linkedin: "https://www.linkedin.com/in/rohankapoor/", twitter: "https://twitter.com/rohan_kapoor", github: "https://github.com/rohankapoor" }
      },
      { name: "سمران كور", role: "استشارية الحلول المؤسسية", bio: "تنصح العملاء حول تحسين العمليات من خلال حلول تقنية مخصصة.", image: "images/bs31.jpg",
        social: { linkedin: "https://www.linkedin.com/in/simran-kaur/", twitter: "https://twitter.com/simrankaur", github: "https://github.com/simrankaur" }
      },
      { name: "أرجون ناير", role: "قائد البيانات والتحليلات", bio: "يحوّل البيانات إلى رؤى قابلة للتنفيذ لتعزيز الأداء وخلق فرص جديدة.", image: "images/bs30.jpg",
        social: { linkedin: "https://www.linkedin.com/in/arjun-nair/", twitter: "https://twitter.com/arjun_nair", github: "https://github.com/arjunnair" }
      },
      { name: "نيها مالهوترا", role: "مديرة نجاح العملاء", bio: "تبني شراكات طويلة تعتمد على ضمان التميز في التنفيذ ونتائج قابلة للقياس.", image: "images/bs32.jpg",
        social: { linkedin: "https://www.linkedin.com/in/nehmalhotra/", twitter: "https://twitter.com/nehamalhotra", github: "https://github.com/nehamalhotra" }
      }
    ],
    cta: {
      title: "هل أنت مستعد لتحويل عملك؟",
      paragraph: "ابدأ اليوم مع استشارة مجانية واكتشف كيف يمكننا مساعدتك في تحقيق أهدافك.",
      startJourneyText: "ابدأ رحلتك",
      learnMoreText: "تعرف علينا أكثر"
    },
    milestones: [
      { year: "2018", event: "تأسيس الشركة", description: "تأسست برؤية توفير استشارات تقنية مبتكرة وحلول سحابية." },
      { year: "2020", event: "أول تنفيذ سحابي واسع النطاق", description: "تسليم أول بنية تحتية سحابية متعددة المناطق لعميل رائد." },
      { year: "2022", event: "إطلاق خدمات الأمن السيبراني المتقدمة", description: "طرح خدمات أمنية شاملة تشمل استخبارات التهديدات وإدارة المخاطر." },
      { year: "2024", event: "توسيع خدمات الذكاء الاصطناعي والأتمتة", description: "إضافة أدوات أتمتة مدعومة بالذكاء الاصطناعي لتعزيز الكفاءة وخفض التكاليف." },
      { year: "2025", event: "النمو العالمي والشراكات الاستراتيجية", description: "توسيع الحضور العالمي من خلال شراكات استراتيجية لدفع التحول الرقمي." }
    ]
  },
  
  he: {
    hero: {
      title: "אודותינו",
      paragraph: "בלב פתרונות העסק שלנו מחויבות לחדשנות, אמינות והצלחה של הלקוח.",
      cta: "צרו קשר היום"
    },
    cardsData: [
      {
        id: "vision",
        titlePrimary: "החזון שלנו",
        descriptionPrimary: "להיות המובילה בפתרונות חדשניים המעצימים עסקים למימוש מלא של הפוטנציאל.",
        titleSecondary: "מעצבים את העתיד",
        descriptionSecondary: "אנחנו מדמיינים עתיד שבו הטכנולוגיה שלנו מובילה את מהפכת הענף.",
        gradient: "var(--gradient-primary)",
      },
      {
        id: "mission",
        titlePrimary: "המשימה שלנו",
        descriptionPrimary: "להעניק ערך יוצא דופן ללקוחותינו מתוך מחויבות לאיכות, יושרה והצלחה.",
        titleSecondary: "מעצימים לקוחות",
        descriptionSecondary: "אנחנו בונים שותפויות לטווח ארוך ומעצימים לקוחות בכלים להצלחה.",
        gradient: "var(--gradient-secondary)",
      },
      {
        id: "values",
        titlePrimary: "הערכים המרכזיים שלנו",
        descriptionPrimary: "יושרה, חדשנות והצלחת הלקוח הם אבני יסוד. אנו פועלים בשקיפות ובתשוקה למצוינות.",
        titleSecondary: "מונעים למען מטרה",
        descriptionSecondary: "כל פעולה שלנו נובעת מתוך מטרה ברורה להשפיע חיובית על הקהילה.",
        gradient: "var(--gradient-accent)",
      }
    ],
    mainHeading: "החזון והמשימה",
    subHeading: "מעצימים עסקים למצות את הפוטנציאל.",
    subDescription: "אנחנו מחויבים לחדשנות, יושרה ומצוינות והופכים מטרות לעשייה משמעותית.",
    businessContent: {
      innovative: {
        image: "images/bs20.jpg",
        heading: "פתרונות חדשניים",
        text: "נצלו טכנולוגיה מתקדמת ואסטרטגיות יצירתיות להאצת צמיחה ושיפור היעילות.",
        cardImg: "https://placehold.co/200x200/6f7eea/ffffff?text=Innovation",
        cardTitle: "פתרונות חדשניים",
        cardDesc: "מעצימים את העסק שלכם בחדשנות המתקדמת ביותר.",
      },
      strategic: {
        image: "images/bs21.jpg",
        heading: "תכנון אסטרטגי",
        text: "פיתחו מפת דרכים מותאמת אישית להצלחה עסקית בת קיימא.",
        cardImg: "https://placehold.co/200x200/34d39a/ffffff?text=Strategy",
        cardTitle: "תכנון אסטרטגי",
        cardDesc: "יוצרים אסטרטגיות שמביאות תוצאות.",
      },
      digital: {
        image: "images/bs22.jpg",
        heading: "הטרנספורמציה הדיגיטלית",
        text: "שפרו תהליכים וחווית לקוח בעזרת חדשנות דיגיטלית ואוטומציה.",
        cardImg: "https://placehold.co/200x200/f76060/ffffff?text=Digital",
        cardTitle: "הטרנספורמציה הדיגיטלית",
        cardDesc: "האץ את המסע הדיגיטלי שלך.",
      },
    },
    whatWeDoTitle: "מה אנחנו עושים",
    whatWeDoItems: [
      { id: 1, title: "ייעוץ עסקי", description: "סיוע לעסקים לייעל תהליכים ולפתח הזדמנויות צמיחה בהתאמה אישית.", img: "images/bs24.jpg" },
      { id: 2, title: "טרנספורמציה דיגיטלית", description: "הובלת חברות לאימוץ טכנולוגיות חדשניות לשיפור יעילות וחווית לקוח.", img: "images/bs25.jpg" },
      { id: 3, title: "הרחבת שווקים", description: "הספקת תובנות ותוכניות חדירה יעילות להתפתחות עולמית.", img: "images/bs26.jpg" },
      { id: 4, title: "אופטימיזציה של תהליכים", description: "ייעול תהליכי עבודה וביטול בזבוז לשיפור התפוקה.", img: "images/bs27.jpg" },
      { id: 5, title: "חווית לקוח", description: "יצירת מסעות לקוח שמגבירים נאמנות, שימור וסיפוק.", img: "images/bs28.jpg" },
      { id: 6, title: "סיכונים וציות", description: "העצמת עסקים במסגרת ניהול סיכונים, רגולציה וציות.", img: "images/bs29.jpg" },
    ],
    statsData: [
      { value: 98, suffix: "%", text: "שיעור שימור לקוחות גבוה מבוסס אמון ואמינות." },
      { value: 50, suffix: "+", text: "תעשיות מגוונות כולל בריאות, פיננסים ועוד." },
      { value: 15, suffix: "+ שנים", text: "מומחיות מוכחת בפתרונות IT מדרגיים." },
      { value: 24, suffix: "/7", text: "תמיכה גלובלית לשמירה על רציפות עסקית בכל עת." }
    ],
    values: [
      { icon: FaCloud, title: "טרנספורמציה בענן", description: "מאפשרים מעבר חלק לענן בסביבה מאובטחת, מדרגית וכלכלית." },
      { icon: FaShieldAlt, title: "סייבר וציות", description: "הגנה על נכסים דיגיטליים באמצעות ניהול סיכונים וציות מתקדם." },
      { icon: FaRobot, title: "חדשנות מונעת בינה", description: "מנצלים בינה מלאכותית ואוטומציה לשיפור תהליכים והאצת החלטות." },
      { icon: FaCogs, title: "פתרונות IT מותאמים", description: "שירותים אסטרטגיים וטכנולוגיים המותאמים לצורכי העסק המשתנים." }
    ],
    teamSectionTitle: "מנהיגות",
    teamSectionSubtitle: "חדשנות מונעת על ידי מנהיגים מסורים",
    team: [
      { name: "רוהאן קפור", role: "אסטרטג ראשי לטכנולוגיה", bio: "מוביל יוזמות דיגיטליות, מיישר טכנולוגיות מתקדמות עם חזון ארוך טווח.", image: "images/bs29.jpg",
        social: { linkedin: "https://www.linkedin.com/in/rohankapoor/", twitter: "https://twitter.com/rohan_kapoor", github: "https://github.com/rohankapoor" }
      },
      { name: "סימרן קואר", role: "יועצת פתרונות ארגוניים", bio: "מייעצת ללקוחות גלובליים בניהול תהליכים באמצעות פתרונות IT מותאמים.", image: "images/bs31.jpg",
        social: { linkedin: "https://www.linkedin.com/in/simran-kaur/", twitter: "https://twitter.com/simrankaur", github: "https://github.com/simrankaur" }
      },
      { name: "ארג'ון נאיר", role: "ראש נתונים וניתוחים", bio: "הופך נתונים לתובנות יישומיות לקידום ביצועים וצמיחה.", image: "images/bs30.jpg",
        social: { linkedin: "https://www.linkedin.com/in/arjun-nair/", twitter: "https://twitter.com/arjun_nair", github: "https://github.com/arjunnair" }
      },
      { name: "ניהה מהלוטרה", role: "מנהלת הצלחת לקוחות", bio: "בונה שותפויות ארוכות ליצירת מצוינות ותוצאות מדידות.", image: "images/bs32.jpg",
        social: { linkedin: "https://www.linkedin.com/in/nehmalhotra/", twitter: "https://twitter.com/nehamalhotra", github: "https://github.com/nehamalhotra" }
      }
    ],
    cta: {
      title: "מוכן לשדרג את העסק שלך?",
      paragraph: "התחל היום עם ייעוץ חינם וגלה כיצד נוכל לעזור לך להשיג את יעדיך.",
      startJourneyText: "התחל את המסע שלך",
      learnMoreText: "למידע נוסף"
    },
    milestones: [
      { year: "2018", event: "הקמת החברה", description: "הוקמה עם חזון להוביל ייעוץ IT חדשני ופתרונות ענן." },
      { year: "2020", event: "פרויקט ענן גדול ראשון", description: "בוצע פרויקט תשתית ענן רב אזורי ללקוח מוביל." },
      { year: "2022", event: "שירותי סייבר מתקדמים", description: "הושקו שירותי סייבר כולל מודיעין איומים וניהול סיכונים." },
      { year: "2024", event: "הרחבת שירותי AI ואוטומציה", description: "שילוב כלי בינה מלאכותית לאוטומציה, לשיפור יעילות והפחתת עלויות." },
      { year: "2025", event: "צמיחה גלובלית ושותפויות אסטרטגיות", description: "התרחבות גלובלית ושותפויות מפתח להובלת טרנספורמציה דיגיטלית." }
    ]
  }
};

const AboutUs = () => {
  const { language } = useLanguage();
  const t = translations[language] || translations.en;
  const [activeCard, setActiveCard] = useState(null);
  const [active, setActive] = useState("innovative");
  const [fade, setFade] = useState(false);
  const [visibleCount, setVisibleCount] = useState(3);
  const [selected, setSelected] = useState(null);
  const [openIndex, setOpenIndex] = useState(-1);
  const { ref, inView } = useInView({ threshold: 0.3, triggerOnce: false });
  const marqueeRef = useRef(null);
  const cardOrder = ["innovative", "strategic", "digital"];
  const items = [...t.values, ...t.values];

  useEffect(() => {
    document.title =
      language === "ar"
        ? "حولنا - دريم نيست للعقارات"
        : language === "he"
        ? 'עלינו - DreamNest נדל"ן'
        : "About Us - DreamNest Real Estate";
  }, [language]);

  useEffect(() => {
    const marquee = marqueeRef.current;
    if (!marquee) return;
    const handleMouseEnter = () => (marquee.style.animationPlayState = "paused");
    const handleMouseLeave = () => (marquee.style.animationPlayState = "running");
    marquee.addEventListener("mouseenter", handleMouseEnter);
    marquee.addEventListener("mouseleave", handleMouseLeave);
    const observer = new IntersectionObserver(
      ([entry]) => {
        marquee.style.animationPlayState = entry.isIntersecting ? "running" : "paused";
      },
      { threshold: 0.1 }
    );
    observer.observe(marquee);
    return () => {
      marquee.removeEventListener("mouseenter", handleMouseEnter);
      marquee.removeEventListener("mouseleave", handleMouseLeave);
      observer.disconnect();
    };
  }, []);

  const toggleCard = (id) => setActiveCard((prev) => (prev === id ? null : id));
  const changeContent = (type) => {
    if (type === active) return;
    setFade(true);
    setTimeout(() => {
      setActive(type);
      setFade(false);
    }, 350);
  };
  const loadMore = () => setVisibleCount((count) => Math.min(count + 3, t.whatWeDoItems.length));
  const visibleItems = t.whatWeDoItems.slice(0, visibleCount);
  const activeContent = t.businessContent[active];

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero-section">
        <video autoPlay muted loop playsInline className="hero-bg-video">
          <source src="images/about (2).mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="hero-overlay">
          <div className="hero-content">
            <h1 className="hero-title animate-slide-in">{t.hero.title}</h1>
            <p className="hero-paragraph animate-fade-up">{t.hero.paragraph}</p>
            <Link to="/contact" className="hero-button animate-fade-up-delayed">{t.hero.cta}</Link>
          </div>
        </div>
      </section>
      {/* Vision & Mission Section */}
      <section className="min-h-screen flex items-center py-8 px-2" style={{ background: "var(--bg-color)" }}>
        <div className="flex flex-col md:flex-row w-full max-w-7xl mx-auto">
          <div className="flex-1 flex flex-col justify-center items-start px-4 xl:px-10 md:max-w-xl mb-10 md:mb-0">
            <h2 className="text-[2rem] sm:text-4xl font-extrabold uppercase tracking-[0.15em] mb-6" style={{ color: "var(--primary-color)" }}>
              {t.mainHeading}
            </h2>
            <h1 className="text-2xl sm:text-4xl font-extrabold mb-5 leading-tight" style={{ color: "var(--heading-color)" }}>
              {t.subHeading}
            </h1>
            <p className="text-base md:text-lg" style={{ color: "var(--text-muted)" }}>
              {t.subDescription}
            </p>
          </div>
          <div className="flex-1 flex flex-col space-y-8 w-full">
            {t.cardsData.map((card) => {
              const isActive = activeCard === card.id;
              return (
                <div
                  key={card.id}
                  role="button"
                  tabIndex={0}
                  aria-expanded={isActive}
                  onClick={() => toggleCard(card.id)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") toggleCard(card.id);
                  }}
                  className="w-full md:w-[580px] rounded-2xl shadow-md cursor-pointer relative transition-transform duration-300 mx-auto focus:outline-none"
                  style={{
                    background: card.gradient,
                    boxShadow: isActive ? "var(--shadow-hover)" : "var(--shadow)",
                    minHeight: "120px",
                    transform: isActive ? "scale(1.03)" : "scale(1)",
                    border: "none",
                  }}>
                  <div className="px-8 py-7 sm:pr-10 flex-1 transition-all duration-500">
                    <h3 className="text-lg sm:text-xl font-bold mb-1" style={{ color: "var(--heading-color)", transition: "color 0.3s" }}>
                      {isActive ? card.titleSecondary : card.titlePrimary}
                    </h3>
                    <p className="mt-1 text-sm sm:text-base" style={{ color: "var(--text-color)", opacity: "0.92", transition: "color 0.3s" }}>
                      {isActive ? card.descriptionSecondary : card.descriptionPrimary}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
      {/* Business Content Switcher */}
      <div className="min-h-screen flex flex-col items-center justify-center p-6 sm:p-10 bg-[var(--bg-color)] transition-colors duration-500">
        <div className="container mx-auto w-full max-w-7xl">
          <div className="relative rounded-3xl overflow-hidden mb-12 shadow-xl aspect-[2/1] md:aspect-[3/1] w-full" style={{ minHeight: "280px" }}>
            <img src={activeContent.image} alt={activeContent.heading} className="absolute inset-0 w-full h-full object-cover transition-opacity duration-500" style={{ opacity: fade ? 0 : 1 }} />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-75" />
            <div className="relative z-10 flex items-end h-full p-8 md:p-16">
              <div className={`max-w-xl transition-opacity duration-500 ${fade ? "opacity-0" : "opacity-100"}`}>
                <h1 className="text-white text-4xl md:text-5xl font-extrabold leading-tight drop-shadow-lg">
                  {activeContent.heading}
                </h1>
                <p className="mt-3 text-white text-lg md:text-xl max-w-lg drop-shadow-md">
                  {activeContent.text}
                </p>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {cardOrder.map((key) => {
              const item = t.businessContent[key];
              const isActive = key === active;
              return (
                <button
                  key={key}
                  className={`flex flex-col items-center text-center rounded-3xl transition-transform duration-300 cursor-pointer focus:outline-none ${
                    isActive ? "scale-105 shadow-2xl ring-4 ring-[var(--primary-color)]" : "shadow-lg"
                  }`}
                  onClick={() => changeContent(key)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") changeContent(key);
                  }}
                  aria-pressed={isActive}
                >
                  <img
                    src={item.cardImg}
                    alt={item.cardTitle}
                    className="w-24 h-24 md:w-28 md:h-28 rounded-full shadow-md object-cover mb-4 transition-transform duration-300"
                    style={{ objectFit: "cover" }}
                  />
                  <h3 className={`font-bold text-lg md:text-xl mb-2 transition-colors duration-300 ${isActive ? "text-[var(--primary-color)]" : "text-[var(--text-color)]"}`}>
                    {item.cardTitle}
                  </h3>
                  <p className={`text-sm md:text-base transition-colors duration-300 ${isActive ? "text-[var(--primary-color)]" : "text-[var(--text-muted)]"}`}>
                    {item.cardDesc}
                  </p>
                </button>
              );
            })}
          </div>
        </div>
      </div>
      {/* What We Do */}
      <div className="min-h-screen bg-[var(--bg-color)] px-4 py-16">
        <h1 className="text-center text-[var(--heading-color)] text-4xl font-extrabold mb-12">{t.whatWeDoTitle}</h1>
        <motion.div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto">
          {visibleItems.map((item) => (
            <motion.div key={item.id} className="cursor-pointer rounded-xl shadow-lg overflow-hidden bg-[var(--card-bg)]" whileHover={{ scale: 1.05 }} onClick={() => setSelected(item)}>
              <img src={item.img} alt={item.title} className="w-full h-48 object-cover" />
              <div className="p-6">
                <h2 className="text-xl font-semibold text-[var(--heading-color)] mb-2">{item.title}</h2>
                <p className="text-[var(--text-muted)] line-clamp-3">{item.description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
        {visibleCount < t.whatWeDoItems.length && (
          <div className="flex justify-center mt-12">
            <button
              onClick={loadMore}
              className="px-6 py-3 rounded-full bg-[var(--primary-color)] text-white text-lg font-semibold hover:brightness-110 transition"
            >
              {language === "ar" ? "عرض المزيد" : language === "he" ? "הצג עוד" : "Load More"}
            </button>
          </div>
        )}
        <AnimatePresence>
          {selected && (
            <motion.div
              className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelected(null)}
            >
              <motion.div
                className="bg-[var(--card-bg)] rounded-xl max-w-lg w-full p-6 relative mx-4"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                transition={{ duration: 0.3 }}
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  onClick={() => setSelected(null)}
                  className="absolute top-4 right-4 p-2 rounded-full bg-[var(--primary-color)] text-white hover:brightness-110 transition"
                  aria-label="Close modal"
                >
                  &times;
                </button>
                <img src={selected.img} alt={selected.title} className="w-full h-48 object-cover rounded-md mb-4" />
                <h2 className="text-2xl font-bold text-[var(--heading-color)] mb-2">{selected.title}</h2>
                <p className="text-[var(--text-muted)]">{selected.description}</p>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      {/* Values Scroller */}
      <section className="values-section full-width">
        <div className="sectionss-header text-center">
          <h2>{language === 'ar' ? "قيمنا الجوهرية" : language === 'he' ? "הערכים המרכזיים שלנו" : "My Core Values"}</h2>
          <p>{language === 'ar' ? "المبادئ التي ترشد رحلتي المهنية" : language === 'he' ? "העקרונות המנחים את דרכי המקצועית" : "The principles guiding my freelance journey"}</p>
        </div>
        <div className="values-marquee-outer">
          <div className="values-marquee-inner" ref={marqueeRef}>
            {items.map((value, idx) => {
              const Icon = value.icon;
              return (
                <div className="value-card" key={idx}>
                  <Icon className="value-icon" />
                  <h4>{value.title}</h4>
                  <p>{value.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>
      {/* Team */}
      <section className="section team-section full-width">
        <div className="sections-header text-center">
          <h2>{t.teamSectionTitle}</h2>
          <p>{t.teamSectionSubtitle}</p>
        </div>
        <div className="team-grid">
          {t.team.map((member, index) => (
            <div
              className="team-card leader-card"
              key={index}
              onClick={() => setOpenIndex(openIndex === index ? -1 : index)}
            >
              <div className="team-image leader-image">
                <img src={member.image} alt={member.name} />
                <div className={'leader-overlay' + (openIndex === index ? ' open' : '')}>
                  <div className="leader-overlay-content">
                    <h4>{member.name}</h4>
                    <span className="team-role">{member.role}</span>
                    <p className="team-bio">{member.bio}</p>
                    <div className="team-social">
                      <a href={member.social.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><FaLinkedin /></a>
                      <a href={member.social.twitter} target="_blank" rel="noopener noreferrer" aria-label="Twitter"><FaTwitter /></a>
                      <a href={member.social.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub"><FaGithub /></a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
      {/* Timeline */}
    
      {/* CTA */}
      <section className="cta-section">
        <div className="cta-overlay">
          <div className="container">
            <motion.div
              className="cta-content text-center"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2>{t.cta.title}</h2>
              <p>{t.cta.paragraph}</p>
              <div className="cta-buttons">
                <Link to="/contact" className="btn btn-primary btn-large">{t.cta.startJourneyText} <FaArrowRight /></Link>
                <Link to="/about" className="btn btn-outline btn-large">{t.cta.learnMoreText}</Link>
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

        {/*about freelancer*/}




          /* ===== Values Section (Theme-Based) ===== */
.values-section {
  background: var(--card-bg);
  padding: 80px 24px;
  overflow: hidden;
}

.section-header h2 {
  margin: 0 0 6px;
  font-size: 2rem;
  color: var(--heading-color);
}

.section-header p {
  color: var(--text-color);
  margin: 0 0 24px;
}

/* Marquee container */
.values-marquee-outer {
  width: 100vw;
  overflow: hidden;
  margin: 0 -32px;
  padding: 10px 0;
  position: relative;
}
.values-marquee-inner {
  display: flex;
  gap: 32px;
  animation: marquee-scroll 32s linear infinite;
  will-change: transform;
}
@keyframes marquee-scroll {
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }
}
.values-marquee-inner:hover {
  animation-play-state: paused;
}

/* Value card styling */
.value-card {
  flex: 0 0 340px;
  background: var(--card-bg);
  padding: 32px 22px;
  border-radius: 18px;
  text-align: center;
  box-shadow: var(--shadow);
  border: 2.5px solid transparent;
  background-clip: padding-box;
  margin-bottom: 10px;
  min-height: 240px;
  transition: 
    transform 0.28s cubic-bezier(.45,.03,.44,1.01), 
    box-shadow .28s, 
    border .38s;
  position: relative;
}
.value-card:hover {
  box-shadow: var(--shadow-hover);
  transform: translateY(-10px) scale(1.038);
  border: 2.5px solid var(--primary-color);
  z-index: 2;
}
.value-icon {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 2.8rem;
  color: var(--primary-color);
  margin-bottom: 16px;
  width: 100%;
  height: 48px;
}
.value-card h4 {
  font-size: 1.22rem;
  color: var(--heading-color);
  margin-bottom: 8px;
  margin-top: 0;
  font-weight: bold;
}
.value-card p {
  color: var(--text-color);
  margin: 0;
  font-size: 1.1rem;
}

/* SCROLLBAR for Marquee */
.values-marquee-outer::-webkit-scrollbar,
.values-marquee-inner::-webkit-scrollbar {
  height: 8px;
  background: var(--card-bg);
}
.values-marquee-inner::-webkit-scrollbar-thumb {
  background: var(--primary-color);
  border-radius: 6px;
}
.values-marquee-inner::-webkit-scrollbar-thumb:hover {
  background: var(--secondary-color);
}

/* Responsive: shrink card width and icon size */
@media (max-width: 700px) {
  .aboutit-section { padding: 0; width: 100vw; margin: 0; }
  .aboutit-grid { padding: 0; gap: 12px; width: 100vw; margin: 0; }
  .hero-section, .hero-overlay, .hero-content { width: 100vw !important; margin: 0 !important; padding-right: 0 !important; box-sizing: border-box; }
  .hero-title, .hero-paragraph, .hero-button { margin-right: 0 !important; }
  .section-header h2 { font-size: 1.18rem;}
}


          /* ===== Team ===== */
/* ===================== TEAM SECTION ===================== */
.team-section {
  background: var(--sidebar-bg, #f7f8f9);
  padding: 40px 0;
  margin-top: -70px;
}

.team-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 30px;
}

.leader-card {
  background: none;
  box-shadow: none;
  border: none;
  padding: 0;
  position: relative;
  cursor: pointer;
}

.leader-image {
  position: relative;
  width: 100%;
  height: 330px;
  overflow: hidden;
  border-radius: 18px;
  box-shadow: var(--shadow);
  transition: box-shadow 0.25s;
}

.leader-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: top center;
  display: block;
  border-radius: 18px;
  filter: brightness(0.97);
  transition: filter 0.28s;
}

.leader-card:hover .leader-image,
.leader-card:active .leader-image {
  box-shadow: var(--shadow-hover);
}

.leader-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(rgba(15,24,32,0.92), rgba(31,41,51,0.95), rgba(0,120,240,0.65));
  color: #fff;
  border-radius: 18px;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.38s cubic-bezier(.81,-0.02,.18,1.04);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 3;
}

.leader-overlay.open {
  opacity: 1;
  pointer-events: auto;
  transition: opacity 0.25s cubic-bezier(.85,.03,.45,.96);
}

.leader-overlay-content {
  text-align: center;
  padding: 0 15px;
}

.leader-overlay h4 {
  color: #fff;
  font-size: 1.25rem;
  margin: 0 0 7px 0;
  font-weight: 700;
}

.leader-overlay .team-role {
  color: #fff;
  font-size: 1.05rem;
  font-weight: 500;
  margin-bottom: 6px;
  display: block;
}

.leader-overlay .team-bio {
  color: #fff;
  font-size: 0.98rem;
  margin: 7px 0 21px 0;
  line-height: 1.6;
}

.team-social {
  display: flex;
  justify-content: center;
  gap: 13px;
  margin-top: 10px;
}

.team-social a {
  color: #fff;
  background: rgba(0, 0, 0, 0.18);
  border-radius: 50%;
  width: 38px;
  height: 38px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.26rem;
  transition: background 0.18s, color 0.18s;
}

.team-social a:hover {
  background: var(--primary-color, #0b5e2b);
  color: #fff;
}

/* ========== TABLET (≤1024px) ========== */
@media (max-width: 1024px) {
  .team-section {
    padding: 30px 0;
  }

  .team-grid {
    gap: 20px;
  }

  .leader-image {
    height: 280px;
  }

  .leader-overlay h4 {
    font-size: 1.15rem;
  }

  .leader-overlay .team-role {
    font-size: 1rem;
  }

  .leader-overlay .team-bio {
    font-size: 0.95rem;
  }
}

/* ========== MOBILE (≤768px) ========== */
@media (max-width: 768px) {
  .team-section {
    padding: 20px 0;
  }

  .team-grid {
    grid-template-columns: 1fr;
    gap: 20px;
  }

  .leader-image {
    height: 250px;
    border-radius: 14px;
  }

  .leader-overlay-content {
    padding: 0 10px;
  }

  .leader-overlay h4 {
    font-size: 1.1rem;
  }

  .leader-overlay .team-role {
    font-size: 0.95rem;
  }

  .leader-overlay .team-bio {
    font-size: 0.9rem;
    line-height: 1.5;
  }

  .team-social a {
    width: 34px;
    height: 34px;
    font-size: 1.1rem;
  }
}

/* ========== SMALL MOBILE (≤480px) ========== */
@media (max-width: 480px) {
  .leader-image {
    height: 220px;
  }

  .leader-overlay h4 {
    font-size: 1rem;
  }

  .leader-overlay .team-role {
    font-size: 0.88rem;
  }

  .leader-overlay .team-bio {
    font-size: 0.85rem;
  }

  .team-social a {
    width: 30px;
    height: 30px;
    font-size: 1rem;
  }
}


        /* ===== Timeline ===== */

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

  export default AboutUs;
