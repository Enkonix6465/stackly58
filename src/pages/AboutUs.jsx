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
      paragraph: "At the heart of our business solutions is a commitment to innovation and customer success.",
      cta: "Enquire",
    },
    whoWeAre: {
      subtitle: "Who We Are",
      title: "Providing strategic business solutions and digital transformation",
      description: "We are committed to delivering innovative solutions that help businesses grow and succeed in the competitive market.",
      featureText: "We're No.1 Business Consulting Platform",
      checklistItems: [
        "Strategic business transformation",
        "Digital innovation solutions",
        "Improving operational efficiency"
      ]
    },
    trustedBy: {
      title: "Trusted by 30,000 world-class brands and organizations of all sizes",
      companies: {
        mckinsey: "McKinsey Explainers",
        deloitte: "Deloitte",
        pwc: "PwC"
      }
    },
    globalPresence: {
      title: "We Spread Around The World",
      description: "Laoreet lorem consectetuer hendrerit dictumst curae volutpat cubilia elit velit natoque. Eleifend diam volutpat lectus aliquam aenean. Dolor sed orci scelerisque taciti sodales tortor.",
      stats: {
        years: "Years of Experience",
        offices: "Office Worldwide",
        workers: "Workers Employed"
      }
    },
    preserveConserve: {
      subtitle: "Preserve And Conserve",
      title: "A Vital Energy Resource For A Better Tomorrow",
      description: "Cubilia scelerisque ultricies at cras tempus phasellus primis habitant. Penatibus pulvinar at vel cursus dignissim sem condimentum molestie. Lobortis hac aenean posuere justo letius laoreet augue.",
      button: "DISCOVER MORE",
      items: {
        aspiration: {
          title: "Aspiration",
          description: "Metus montes cras massa venenatis id dignissim suspendisse purus nibh. Mollis sapien facilisis luctus."
        },
        vision: {
          title: "Vision",
          description: "Metus montes cras massa venenatis id dignissim suspendisse purus nibh. Mollis sapien facilisis luctus."
        },
        mission: {
          title: "Mission",
          description: "Metus montes cras massa venenatis id dignissim suspendisse purus nibh. Mollis sapien facilisis luctus."
        }
      }
    },
    expertConsultants: {
      title: "Our Expert Consultants",
      subtitle: "Meet the strategic advisors who drive your business success",
      consultants: {
        sarah: {
          name: "Sarah Johnson",
          role: "Strategic Business Advisor",
          description: "Leading strategic initiatives for Fortune 500 companies, Sarah specializes in organizational transformation and market expansion strategies that deliver measurable results.",
          skills: ["Strategic Planning", "Business Transformation", "Market Expansion"]
        },
        michael: {
          name: "Michael Chen",
          role: "Digital Transformation Consultant",
          description: "Expert in guiding enterprises through digital transformation journeys, Michael helps organizations leverage emerging technologies to gain competitive advantage and operational excellence.",
          skills: ["Digital Strategy", "Technology Integration", "Process Optimization"]
        },
        emily: {
          name: "Emily Rodriguez",
          role: "Operations Excellence Consultant",
          description: "Specializing in operational strategy and performance optimization, Emily delivers comprehensive consulting solutions that enhance productivity and drive sustainable business growth.",
          skills: ["Operations Strategy", "Performance Optimization", "Business Growth"]
        }
      }
    },
    consultationCta: {
      title: "NEED A CONSULTATION?",
      description: "Trucks are also used in the construction industry on dump trucks and portable concrete mixers move the large amounts of rocks, dirt, concrete, and other building materials used in construction.",
      button: "Request a call"
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
    whoWeAre: {
      subtitle: "من نحن",
      title: "نقدم حلول أعمال استراتيجية والتحول الرقمي",
      description: "نحن ملتزمون بتقديم حلول مبتكرة تساعد الشركات على النمو والنجاح في السوق التنافسي.",
      featureText: "نحن منصة الاستشارات التجارية رقم 1",
      checklistItems: [
        "التحول التجاري الاستراتيجي",
        "حلول الابتكار الرقمي",
        "تحسين الكفاءة التشغيلية"
      ]
    },
    trustedBy: {
      title: "موثوق من قبل 30,000 علامة تجارية عالمية ومنظمات من جميع الأحجام",
      companies: {
        mckinsey: "ماكينزي إكسبلينرز",
        deloitte: "ديلويت",
        pwc: "بي دبليو سي"
      }
    },
    globalPresence: {
      title: "ننتشر حول العالم",
      description: "نحن ملتزمون بتقديم خدمات عالية الجودة لعملائنا في جميع أنحاء العالم. خبرتنا الواسعة ووجودنا العالمي يضمن تقديم حلول متميزة تلبي احتياجات السوق المحلية والعالمية.",
      stats: {
        years: "سنوات من الخبرة",
        offices: "مكتب حول العالم",
        workers: "عامل موظف"
      }
    },
    preserveConserve: {
      subtitle: "الحفاظ والحماية",
      title: "مورد طاقة حيوي لمستقبل أفضل",
      description: "نحن ملتزمون بحماية البيئة وتطوير حلول الطاقة المستدامة. رؤيتنا تركز على خلق مستقبل أكثر استدامة للأجيال القادمة من خلال الابتكار والتكنولوجيا المتقدمة.",
      button: "اكتشف المزيد",
      items: {
        aspiration: {
          title: "الطموح",
          description: "نسعى لتحقيق أهدافنا الطموحة في مجال الطاقة المستدامة والابتكار التكنولوجي لخدمة المجتمع."
        },
        vision: {
          title: "الرؤية",
          description: "رؤيتنا تتمثل في خلق عالم أكثر استدامة من خلال تطوير حلول الطاقة النظيفة والمتجددة."
        },
        mission: {
          title: "المهمة",
          description: "مهمتنا هي تقديم حلول مبتكرة في مجال الطاقة المستدامة والمساهمة في حماية البيئة."
        }
      }
    },
    expertConsultants: {
      title: "خبراء الاستشارات لدينا",
      subtitle: "تعرف على المستشارين الاستراتيجيين الذين يقودون نجاح عملك",
      consultants: {
        sarah: {
          name: "سارة جونسون",
          role: "مستشارة الأعمال الاستراتيجية",
          description: "تقود المبادرات الاستراتيجية لشركات فورتشن 500، وتتخصص سارة في التحول التنظيمي واستراتيجيات التوسع في السوق التي تحقق نتائج قابلة للقياس.",
          skills: ["التخطيط الاستراتيجي", "التحول التجاري", "التوسع في السوق"]
        },
        michael: {
          name: "مايكل تشين",
          role: "مستشار التحول الرقمي",
          description: "خبير في إرشاد المؤسسات خلال رحلات التحول الرقمي، يساعد مايكل المنظمات على الاستفادة من التقنيات الناشئة لتحقيق ميزة تنافسية والتميز التشغيلي.",
          skills: ["الاستراتيجية الرقمية", "تكامل التكنولوجيا", "تحسين العمليات"]
        },
        emily: {
          name: "إيميلي رودريغيز",
          role: "مستشارة التميز التشغيلي",
          description: "متخصصة في الاستراتيجية التشغيلية وتحسين الأداء، تقدم إيميلي حلول استشارية شاملة تعزز الإنتاجية وتدفع النمو التجاري المستدام.",
          skills: ["استراتيجية العمليات", "تحسين الأداء", "النمو التجاري"]
        }
      }
    },
    consultationCta: {
      title: "تحتاج إلى استشارة؟",
      description: "نحن نقدم استشارات متخصصة لمساعدتك في اتخاذ القرارات الصحيحة لعملك. خبرتنا الواسعة في مختلف المجالات تضمن حصولك على أفضل الحلول المخصصة لاحتياجاتك.",
      button: "اطلب مكالمة"
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
    whoWeAre: {
      subtitle: "מי אנחנו",
      title: "מספקים פתרונות עסקיים אסטרטגיים וטרנספורמציה דיגיטלית",
      description: "אנחנו מחויבים לספק פתרונות חדשניים המסייעים לחברות לצמוח ולהצליח בשוק התחרותי.",
      featureText: "אנחנו פלטפורמת הייעוץ העסקי מספר 1",
      checklistItems: [
        "טרנספורמציה עסקית אסטרטגית",
        "פתרונות חדשנות דיגיטלית",
        "שיפור יעילות תפעולית"
      ]
    },
    trustedBy: {
      title: "מהימן על ידי 30,000 מותגים עולמיים וארגונים מכל הגדלים",
      companies: {
        mckinsey: "מקינזי אקספליינרס",
        deloitte: "דלויט",
        pwc: "פי דבליו סי"
      }
    },
    globalPresence: {
      title: "אנחנו מתפשטים ברחבי העולם",
      description: "אנחנו מחויבים לספק שירותים איכותיים ללקוחותינו ברחבי העולם. הניסיון הרחב שלנו והנוכחות הגלובלית מבטיחים אספקת פתרונות מעולים העונים על צרכי השוק המקומי והעולמי.",
      stats: {
        years: "שנות ניסיון",
        offices: "משרדים ברחבי העולם",
        workers: "עובדים מועסקים"
      }
    },
    preserveConserve: {
      subtitle: "שימור ושמירה",
      title: "משאב אנרגיה חיוני למחר טוב יותר",
      description: "אנחנו מחויבים להגנה על הסביבה ופיתוח פתרונות אנרגיה בת קיימא. החזון שלנו מתמקד ביצירת עתיד בר קיימא יותר לדורות הבאים באמצעות חדשנות וטכנולוגיה מתקדמת.",
      button: "גלה עוד",
      items: {
        aspiration: {
          title: "שאיפה",
          description: "אנחנו שואפים להשיג את המטרות השאפתניות שלנו בתחום האנרגיה בת קיימא והחדשנות הטכנולוגית לשירות הקהילה."
        },
        vision: {
          title: "חזון",
          description: "החזון שלנו הוא ליצור עולם בר קיימא יותר באמצעות פיתוח פתרונות אנרגיה נקייה ומתחדשת."
        },
        mission: {
          title: "משימה",
          description: "המשימה שלנו היא לספק פתרונות חדשניים בתחום האנרגיה בת קיימא ולתרום להגנה על הסביבה."
        }
      }
    },
    expertConsultants: {
      title: "יועצים מומחים שלנו",
      subtitle: "פגשו את היועצים האסטרטגיים שמניעים את הצלחת העסק שלכם",
      consultants: {
        sarah: {
          name: "שרה ג'ונסון",
          role: "יועצת עסקית אסטרטגית",
          description: "מובילה יוזמות אסטרטגיות לחברות פורצ'ן 500, שרה מתמחה בטרנספורמציה ארגונית ואסטרטגיות הרחבת שווקים שמביאות תוצאות מדידות.",
          skills: ["תכנון אסטרטגי", "טרנספורמציה עסקית", "הרחבת שווקים"]
        },
        michael: {
          name: "מייקל צ'ן",
          role: "יועץ טרנספורמציה דיגיטלית",
          description: "מומחה בהנחיית ארגונים במסעות טרנספורמציה דיגיטלית, מייקל עוזר לארגונים לנצל טכנולוגיות מתפתחות להשגת יתרון תחרותי ומצוינות תפעולית.",
          skills: ["אסטרטגיה דיגיטלית", "אינטגרציה טכנולוגית", "אופטימיזציה של תהליכים"]
        },
        emily: {
          name: "אמילי רודריגז",
          role: "יועצת מצוינות תפעולית",
          description: "מתמחה באסטרטגיה תפעולית ואופטימיזציה של ביצועים, אמילי מספקת פתרונות ייעוץ מקיפים שמשפרים פרודוקטיביות ומניעים צמיחה עסקית בת קיימא.",
          skills: ["אסטרטגיה תפעולית", "אופטימיזציה של ביצועים", "צמיחה עסקית"]
        }
      }
    },
    consultationCta: {
      title: "צריכים ייעוץ?",
      description: "אנחנו מספקים ייעוץ מקצועי כדי לעזור לכם לקבל החלטות נכונות לעסק שלכם. הניסיון הרחב שלנו בתחומים שונים מבטיח שתקבלו את הפתרונות הטובים ביותר המותאמים לצרכים שלכם.",
      button: "בקש שיחה"
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
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const { ref, inView } = useInView({ threshold: 0.3, triggerOnce: false });
  const marqueeRef = useRef(null);
  const videoRef = useRef(null);
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

  const toggleVideo = () => {
    if (videoRef.current) {
      if (isVideoPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
    }
  };

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      const handlePlay = () => setIsVideoPlaying(true);
      const handlePause = () => setIsVideoPlaying(false);
      const handleEnded = () => setIsVideoPlaying(false);

      video.addEventListener('play', handlePlay);
      video.addEventListener('pause', handlePause);
      video.addEventListener('ended', handleEnded);

      return () => {
        video.removeEventListener('play', handlePlay);
        video.removeEventListener('pause', handlePause);
        video.removeEventListener('ended', handleEnded);
      };
    }
  }, []);

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
            <p className="hero-paragraph animate-fade-up whitespace-nowrap">{t.hero.paragraph}</p>
            <Link to="/contact" className="hero-button animate-fade-up-delayed">{t.hero.cta}</Link>
          </div>
        </div>
      </section>
      
       {/* Trusted By Section */}
       <section className="trusted-by-section">
         <div className="trusted-by-container">
           <motion.div 
             className="trusted-by-content"
             initial={{ opacity: 0, y: 50 }}
             whileInView={{ opacity: 1, y: 0 }}
             transition={{ duration: 0.8, ease: "easeOut" }}
             viewport={{ once: true, threshold: 0.3 }}
           >
             <motion.div 
               className="trusted-by-text"
               initial={{ opacity: 0, x: -30 }}
               whileInView={{ opacity: 1, x: 0 }}
               transition={{ duration: 0.6, delay: 0.2 }}
               viewport={{ once: true, threshold: 0.3 }}
             >
               <motion.h2 
                 className="trusted-by-title"
                 initial={{ opacity: 0, y: 20 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 transition={{ duration: 0.6, delay: 0.4 }}
                 viewport={{ once: true, threshold: 0.3 }}
               >
                 {t.trustedBy.title}
               </motion.h2>
               <motion.div 
                 className="trusted-by-underline"
                 initial={{ width: 0 }}
                 whileInView={{ width: "60px" }}
                 transition={{ duration: 0.8, delay: 0.6 }}
                 viewport={{ once: true, threshold: 0.3 }}
               ></motion.div>
             </motion.div>
             <motion.div 
               className="trusted-by-logos"
               initial={{ opacity: 0, x: 30 }}
               whileInView={{ opacity: 1, x: 0 }}
               transition={{ duration: 0.6, delay: 0.3 }}
               viewport={{ once: true, threshold: 0.3 }}
             >
               <motion.div 
                 className="logo-item"
                 initial={{ opacity: 0, y: 30, scale: 0.8 }}
                 whileInView={{ opacity: 1, y: 0, scale: 1 }}
                 transition={{ duration: 0.5, delay: 0.5 }}
                 viewport={{ once: true, threshold: 0.3 }}
                 whileHover={{ scale: 1.05, y: -5 }}
               >
                 <motion.img 
                   src="images/McKinsey Explainers.jpg" 
                   alt={t.trustedBy.companies.mckinsey} 
                   className="brand-logo"
                   initial={{ opacity: 0, rotate: -10 }}
                   whileInView={{ opacity: 1, rotate: 0 }}
                   transition={{ duration: 0.6, delay: 0.7 }}
                   viewport={{ once: true, threshold: 0.3 }}
                 />
                 <motion.span 
                   className="logo-text"
                   initial={{ opacity: 0 }}
                   whileInView={{ opacity: 1 }}
                   transition={{ duration: 0.4, delay: 0.9 }}
                   viewport={{ once: true, threshold: 0.3 }}
                 >
                   {t.trustedBy.companies.mckinsey}
                 </motion.span>
               </motion.div>
               <motion.div 
                 className="logo-item"
                 initial={{ opacity: 0, y: 30, scale: 0.8 }}
                 whileInView={{ opacity: 1, y: 0, scale: 1 }}
                 transition={{ duration: 0.5, delay: 0.6 }}
                 viewport={{ once: true, threshold: 0.3 }}
                 whileHover={{ scale: 1.05, y: -5 }}
               >
                 <motion.img 
                   src="images/Deloittelogo.jpg" 
                   alt={t.trustedBy.companies.deloitte} 
                   className="brand-logo"
                   initial={{ opacity: 0, rotate: -10 }}
                   whileInView={{ opacity: 1, rotate: 0 }}
                   transition={{ duration: 0.6, delay: 0.8 }}
                   viewport={{ once: true, threshold: 0.3 }}
                 />
                 <motion.span 
                   className="logo-text"
                   initial={{ opacity: 0 }}
                   whileInView={{ opacity: 1 }}
                   transition={{ duration: 0.4, delay: 1.0 }}
                   viewport={{ once: true, threshold: 0.3 }}
                 >
                   {t.trustedBy.companies.deloitte}
                 </motion.span>
               </motion.div>
               <motion.div 
                 className="logo-item"
                 initial={{ opacity: 0, y: 30, scale: 0.8 }}
                 whileInView={{ opacity: 1, y: 0, scale: 1 }}
                 transition={{ duration: 0.5, delay: 0.7 }}
                 viewport={{ once: true, threshold: 0.3 }}
                 whileHover={{ scale: 1.05, y: -5 }}
               >
                 <motion.img 
                   src="images/PwC.jpg" 
                   alt={t.trustedBy.companies.pwc} 
                   className="brand-logo"
                   initial={{ opacity: 0, rotate: -10 }}
                   whileInView={{ opacity: 1, rotate: 0 }}
                   transition={{ duration: 0.6, delay: 0.9 }}
                   viewport={{ once: true, threshold: 0.3 }}
                 />
                 <motion.span 
                   className="logo-text"
                   initial={{ opacity: 0 }}
                   whileInView={{ opacity: 1 }}
                   transition={{ duration: 0.4, delay: 1.1 }}
                   viewport={{ once: true, threshold: 0.3 }}
                 >
                   {t.trustedBy.companies.pwc}
                 </motion.span>
               </motion.div>
             </motion.div>
           </motion.div>
         </div>
       </section>
       
       {/* Who We Are Section */}
       <section className="who-we-are-section">
         <div className="who-we-are-container">
           <motion.div 
             className="who-we-are-content"
             initial={{ opacity: 0, y: 50 }}
             whileInView={{ opacity: 1, y: 0 }}
             transition={{ duration: 0.8, ease: "easeOut" }}
             viewport={{ once: true, threshold: 0.2 }}
           >
             <motion.div 
               className="who-we-are-text"
               initial={{ opacity: 0, x: -50 }}
               whileInView={{ opacity: 1, x: 0 }}
               transition={{ duration: 0.7, delay: 0.2 }}
               viewport={{ once: true, threshold: 0.2 }}
             >
               <motion.div 
                 className="section-subtitle"
                 initial={{ opacity: 0, y: 20 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 transition={{ duration: 0.5, delay: 0.3 }}
                 viewport={{ once: true, threshold: 0.2 }}
               >
                 {t.whoWeAre.subtitle}
               </motion.div>
               <motion.h2 
                 className="who-we-are-title"
                 initial={{ opacity: 0, y: 30 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 transition={{ duration: 0.6, delay: 0.4 }}
                 viewport={{ once: true, threshold: 0.2 }}
               >
                 {t.whoWeAre.title}
               </motion.h2>
               <motion.p 
                 className="who-we-are-description"
                 initial={{ opacity: 0, y: 20 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 transition={{ duration: 0.6, delay: 0.5 }}
                 viewport={{ once: true, threshold: 0.2 }}
               >
                 {t.whoWeAre.description}
               </motion.p>
               
               <motion.div 
                 className="who-we-are-features"
                 initial={{ opacity: 0, y: 40 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 transition={{ duration: 0.7, delay: 0.6 }}
                 viewport={{ once: true, threshold: 0.2 }}
               >
                 <motion.div 
                   className="feature-box"
                   initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
                   whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                   transition={{ duration: 0.6, delay: 0.7 }}
                   viewport={{ once: true, threshold: 0.2 }}
                   whileHover={{ scale: 1.05, y: -5 }}
                 >
                   <motion.div 
                     className="feature-badge"
                     initial={{ opacity: 0, scale: 0 }}
                     whileInView={{ opacity: 1, scale: 1 }}
                     transition={{ duration: 0.5, delay: 0.8, type: "spring", stiffness: 200 }}
                     viewport={{ once: true, threshold: 0.2 }}
                   >
                     <img src="images/tropy.jpg" alt="Trophy" className="trophy-image" />
                   </motion.div>
                   <motion.p 
                     className="feature-text"
                     initial={{ opacity: 0 }}
                     whileInView={{ opacity: 1 }}
                     transition={{ duration: 0.4, delay: 0.9 }}
                     viewport={{ once: true, threshold: 0.2 }}
                   >
                     {t.whoWeAre.featureText}
                   </motion.p>
                 </motion.div>
                 
                 <motion.div 
                   className="feature-checklist"
                   initial={{ opacity: 0, x: 20 }}
                   whileInView={{ opacity: 1, x: 0 }}
                   transition={{ duration: 0.6, delay: 0.8 }}
                   viewport={{ once: true, threshold: 0.2 }}
                 >
                   {t.whoWeAre.checklistItems.map((item, index) => (
                     <motion.div 
                       key={index} 
                       className="checklist-item"
                       initial={{ opacity: 0, x: 30 }}
                       whileInView={{ opacity: 1, x: 0 }}
                       transition={{ duration: 0.5, delay: 0.9 + (index * 0.1) }}
                       viewport={{ once: true, threshold: 0.2 }}
                       whileHover={{ x: 5, scale: 1.02 }}
                     >
                       <motion.span 
                         className="checkmark"
                         initial={{ opacity: 0, scale: 0 }}
                         whileInView={{ opacity: 1, scale: 1 }}
                         transition={{ duration: 0.3, delay: 1.0 + (index * 0.1), type: "spring" }}
                         viewport={{ once: true, threshold: 0.2 }}
                       >
                         ✓
                       </motion.span>
                       <span>{item}</span>
                     </motion.div>
                   ))}
                 </motion.div>
               </motion.div>
             </motion.div>
             
             <motion.div 
               className="who-we-are-video"
               initial={{ opacity: 0, x: 50, scale: 0.9 }}
               whileInView={{ opacity: 1, x: 0, scale: 1 }}
               transition={{ duration: 0.8, delay: 0.3 }}
               viewport={{ once: true, threshold: 0.2 }}
               whileHover={{ scale: 1.02 }}
             >
               <motion.video 
                 ref={videoRef}
                 className="consulting-video" 
                 poster="images/bs5.jpg"
                 onClick={toggleVideo}
                 initial={{ opacity: 0, scale: 0.95 }}
                 whileInView={{ opacity: 1, scale: 1 }}
                 transition={{ duration: 0.6, delay: 0.5 }}
                 viewport={{ once: true, threshold: 0.2 }}
               >
                 <source src="images/about (2).mp4" type="video/mp4" />
                 Your browser does not support the video tag.
               </motion.video>
               <motion.div 
                 className="play-button-overlay" 
                 onClick={toggleVideo}
                 initial={{ opacity: 0, scale: 0 }}
                 whileInView={{ opacity: 1, scale: 1 }}
                 transition={{ duration: 0.4, delay: 0.7, type: "spring", stiffness: 300 }}
                 viewport={{ once: true, threshold: 0.2 }}
                 whileHover={{ scale: 1.1 }}
                 whileTap={{ scale: 0.95 }}
               >
                 <motion.div 
                   className="play-icon"
                   animate={{ 
                     scale: isVideoPlaying ? [1, 1.1, 1] : [1, 1.05, 1],
                     rotate: isVideoPlaying ? [0, 5, 0] : [0, -5, 0]
                   }}
                   transition={{ 
                     duration: 2, 
                     repeat: Infinity, 
                     ease: "easeInOut" 
                   }}
                 >
                   {isVideoPlaying ? '⏸' : '▶'}
                 </motion.div>
               </motion.div>
             </motion.div>
           </motion.div>
         </div>
       </section>
       
       {/* We Spread Around The World Section */}
       <section className="global-presence-section">
         <div className="global-presence-container">
           <motion.div 
             className="global-presence-content"
             initial={{ opacity: 0, y: 50 }}
             whileInView={{ opacity: 1, y: 0 }}
             transition={{ duration: 0.8, ease: "easeOut" }}
             viewport={{ once: true, threshold: 0.2 }}
           >
             <motion.div 
               className="global-presence-map"
               initial={{ opacity: 0, x: -50, scale: 0.9 }}
               whileInView={{ opacity: 1, x: 0, scale: 1 }}
               transition={{ duration: 0.8, delay: 0.2 }}
               viewport={{ once: true, threshold: 0.2 }}
               whileHover={{ scale: 1.02 }}
             >
               <motion.div 
                 className="world-map"
                 initial={{ opacity: 0, scale: 0.8 }}
                 whileInView={{ opacity: 1, scale: 1 }}
                 transition={{ duration: 1, delay: 0.4 }}
                 viewport={{ once: true, threshold: 0.2 }}
               >
               </motion.div>
             </motion.div>
             
             <motion.div 
               className="global-presence-text"
               initial={{ opacity: 0, x: 50 }}
               whileInView={{ opacity: 1, x: 0 }}
               transition={{ duration: 0.7, delay: 0.3 }}
               viewport={{ once: true, threshold: 0.2 }}
             >
               <motion.h2 
                 className="global-presence-title"
                 initial={{ opacity: 0, y: 30 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 transition={{ duration: 0.6, delay: 0.4 }}
                 viewport={{ once: true, threshold: 0.2 }}
               >
                 {t.globalPresence.title}
               </motion.h2>
               <motion.p 
                 className="global-presence-description"
                 initial={{ opacity: 0, y: 20 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 transition={{ duration: 0.6, delay: 0.5 }}
                 viewport={{ once: true, threshold: 0.2 }}
               >
                 {t.globalPresence.description}
               </motion.p>
               
               <motion.div 
                 className="global-stats"
                 initial={{ opacity: 0, y: 40 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 transition={{ duration: 0.7, delay: 0.6 }}
                 viewport={{ once: true, threshold: 0.2 }}
               >
                 <motion.div 
                   className="stat-card"
                   initial={{ opacity: 0, y: 30, scale: 0.8 }}
                   whileInView={{ opacity: 1, y: 0, scale: 1 }}
                   transition={{ duration: 0.5, delay: 0.7 }}
                   viewport={{ once: true, threshold: 0.2 }}
                   whileHover={{ scale: 1.05, y: -5 }}
                 >
                   <motion.div 
                     className="stat-number"
                     initial={{ opacity: 0, scale: 0 }}
                     whileInView={{ opacity: 1, scale: 1 }}
                     transition={{ duration: 0.6, delay: 0.8, type: "spring", stiffness: 200 }}
                     viewport={{ once: true, threshold: 0.2 }}
                   >
                     25+
                   </motion.div>
                   <motion.div 
                     className="stat-label"
                     initial={{ opacity: 0 }}
                     whileInView={{ opacity: 1 }}
                     transition={{ duration: 0.4, delay: 0.9 }}
                     viewport={{ once: true, threshold: 0.2 }}
                   >
                     {t.globalPresence.stats.years}
                   </motion.div>
                 </motion.div>
                 <motion.div 
                   className="stat-card"
                   initial={{ opacity: 0, y: 30, scale: 0.8 }}
                   whileInView={{ opacity: 1, y: 0, scale: 1 }}
                   transition={{ duration: 0.5, delay: 0.8 }}
                   viewport={{ once: true, threshold: 0.2 }}
                   whileHover={{ scale: 1.05, y: -5 }}
                 >
                   <motion.div 
                     className="stat-number"
                     initial={{ opacity: 0, scale: 0 }}
                     whileInView={{ opacity: 1, scale: 1 }}
                     transition={{ duration: 0.6, delay: 0.9, type: "spring", stiffness: 200 }}
                     viewport={{ once: true, threshold: 0.2 }}
                   >
                     77
                   </motion.div>
                   <motion.div 
                     className="stat-label"
                     initial={{ opacity: 0 }}
                     whileInView={{ opacity: 1 }}
                     transition={{ duration: 0.4, delay: 1.0 }}
                     viewport={{ once: true, threshold: 0.2 }}
                   >
                     {t.globalPresence.stats.offices}
                   </motion.div>
                 </motion.div>
                 <motion.div 
                   className="stat-card"
                   initial={{ opacity: 0, y: 30, scale: 0.8 }}
                   whileInView={{ opacity: 1, y: 0, scale: 1 }}
                   transition={{ duration: 0.5, delay: 0.9 }}
                   viewport={{ once: true, threshold: 0.2 }}
                   whileHover={{ scale: 1.05, y: -5 }}
                 >
                   <motion.div 
                     className="stat-number"
                     initial={{ opacity: 0, scale: 0 }}
                     whileInView={{ opacity: 1, scale: 1 }}
                     transition={{ duration: 0.6, delay: 1.0, type: "spring", stiffness: 200 }}
                     viewport={{ once: true, threshold: 0.2 }}
                   >
                     38K
                   </motion.div>
                   <motion.div 
                     className="stat-label"
                     initial={{ opacity: 0 }}
                     whileInView={{ opacity: 1 }}
                     transition={{ duration: 0.4, delay: 1.1 }}
                     viewport={{ once: true, threshold: 0.2 }}
                   >
                     {t.globalPresence.stats.workers}
                   </motion.div>
                 </motion.div>
               </motion.div>
             </motion.div>
           </motion.div>
         </div>
       </section>
       
       {/* Vision & Mission Section */}
       <section className="vision-mission-section">
         <motion.div 
           className="vision-mission-overlay"
           initial={{ opacity: 0 }}
           whileInView={{ opacity: 1 }}
           transition={{ duration: 1, delay: 0.2 }}
           viewport={{ once: true, threshold: 0.1 }}
         >
           <div className="vision-mission-container">
             <motion.div 
               className="vision-mission-content"
               initial={{ opacity: 0, y: 50 }}
               whileInView={{ opacity: 1, y: 0 }}
               transition={{ duration: 0.8, delay: 0.3 }}
               viewport={{ once: true, threshold: 0.2 }}
             >
               <motion.div 
                 className="vision-mission-left"
                 initial={{ opacity: 0, x: -50 }}
                 whileInView={{ opacity: 1, x: 0 }}
                 transition={{ duration: 0.7, delay: 0.4 }}
                 viewport={{ once: true, threshold: 0.2 }}
               >
                 <motion.div 
                   className="vision-mission-subtitle"
                   initial={{ opacity: 0, y: 20 }}
                   whileInView={{ opacity: 1, y: 0 }}
                   transition={{ duration: 0.5, delay: 0.5 }}
                   viewport={{ once: true, threshold: 0.2 }}
                 >
                   {t.preserveConserve.subtitle}
                 </motion.div>
                 <motion.h2 
                   className="vision-mission-title"
                   initial={{ opacity: 0, y: 30 }}
                   whileInView={{ opacity: 1, y: 0 }}
                   transition={{ duration: 0.6, delay: 0.6 }}
                   viewport={{ once: true, threshold: 0.2 }}
                 >
                   {t.preserveConserve.title}
                 </motion.h2>
                 <motion.p 
                   className="vision-mission-description"
                   initial={{ opacity: 0, y: 20 }}
                   whileInView={{ opacity: 1, y: 0 }}
                   transition={{ duration: 0.6, delay: 0.7 }}
                   viewport={{ once: true, threshold: 0.2 }}
                 >
                   {t.preserveConserve.description}
                 </motion.p>
                 <Link to="/services">
                   <motion.button 
                     className="vision-mission-button"
                     initial={{ opacity: 0, y: 20 }}
                     whileInView={{ opacity: 1, y: 0 }}
                     transition={{ duration: 0.5, delay: 0.8 }}
                     viewport={{ once: true, threshold: 0.2 }}
                     whileHover={{ scale: 1.05, y: -2 }}
                     whileTap={{ scale: 0.95 }}
                   >
                     {t.preserveConserve.button}
                   </motion.button>
                 </Link>
               </motion.div>
               
               <motion.div 
                 className="vision-mission-right"
                 initial={{ opacity: 0, x: 50 }}
                 whileInView={{ opacity: 1, x: 0 }}
                 transition={{ duration: 0.7, delay: 0.5 }}
                 viewport={{ once: true, threshold: 0.2 }}
               >
                 <motion.div 
                   className="vision-mission-item"
                   initial={{ opacity: 0, x: 30 }}
                   whileInView={{ opacity: 1, x: 0 }}
                   transition={{ duration: 0.5, delay: 0.6 }}
                   viewport={{ once: true, threshold: 0.2 }}
                   whileHover={{ x: 10, scale: 1.02 }}
                 >
                   <motion.div 
                     className="vision-mission-icon"
                     initial={{ opacity: 0, scale: 0, rotate: -180 }}
                     whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                     transition={{ duration: 0.6, delay: 0.7, type: "spring", stiffness: 200 }}
                     viewport={{ once: true, threshold: 0.2 }}
                     whileHover={{ scale: 1.2, rotate: 5 }}
                   >
                     &gt;
                   </motion.div>
                   <div className="vision-mission-item-content">
                     <motion.h3 
                       className="vision-mission-item-title"
                       initial={{ opacity: 0, y: 20 }}
                       whileInView={{ opacity: 1, y: 0 }}
                       transition={{ duration: 0.4, delay: 0.8 }}
                       viewport={{ once: true, threshold: 0.2 }}
                     >
                       {t.preserveConserve.items.aspiration.title}
                     </motion.h3>
                     <motion.p 
                       className="vision-mission-item-description"
                       initial={{ opacity: 0, y: 15 }}
                       whileInView={{ opacity: 1, y: 0 }}
                       transition={{ duration: 0.4, delay: 0.9 }}
                       viewport={{ once: true, threshold: 0.2 }}
                     >
                       {t.preserveConserve.items.aspiration.description}
                     </motion.p>
                   </div>
                 </motion.div>
                 
                 <motion.div 
                   className="vision-mission-item"
                   initial={{ opacity: 0, x: 30 }}
                   whileInView={{ opacity: 1, x: 0 }}
                   transition={{ duration: 0.5, delay: 0.7 }}
                   viewport={{ once: true, threshold: 0.2 }}
                   whileHover={{ x: 10, scale: 1.02 }}
                 >
                   <motion.div 
                     className="vision-mission-icon"
                     initial={{ opacity: 0, scale: 0, rotate: -180 }}
                     whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                     transition={{ duration: 0.6, delay: 0.8, type: "spring", stiffness: 200 }}
                     viewport={{ once: true, threshold: 0.2 }}
                     whileHover={{ scale: 1.2, rotate: 5 }}
                   >
                     &gt;
                   </motion.div>
                   <div className="vision-mission-item-content">
                     <motion.h3 
                       className="vision-mission-item-title"
                       initial={{ opacity: 0, y: 20 }}
                       whileInView={{ opacity: 1, y: 0 }}
                       transition={{ duration: 0.4, delay: 0.9 }}
                       viewport={{ once: true, threshold: 0.2 }}
                     >
                       {t.preserveConserve.items.vision.title}
                     </motion.h3>
                     <motion.p 
                       className="vision-mission-item-description"
                       initial={{ opacity: 0, y: 15 }}
                       whileInView={{ opacity: 1, y: 0 }}
                       transition={{ duration: 0.4, delay: 1.0 }}
                       viewport={{ once: true, threshold: 0.2 }}
                     >
                       {t.preserveConserve.items.vision.description}
                     </motion.p>
                   </div>
                 </motion.div>
                 
                 <motion.div 
                   className="vision-mission-item"
                   initial={{ opacity: 0, x: 30 }}
                   whileInView={{ opacity: 1, x: 0 }}
                   transition={{ duration: 0.5, delay: 0.8 }}
                   viewport={{ once: true, threshold: 0.2 }}
                   whileHover={{ x: 10, scale: 1.02 }}
                 >
                   <motion.div 
                     className="vision-mission-icon"
                     initial={{ opacity: 0, scale: 0, rotate: -180 }}
                     whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                     transition={{ duration: 0.6, delay: 0.9, type: "spring", stiffness: 200 }}
                     viewport={{ once: true, threshold: 0.2 }}
                     whileHover={{ scale: 1.2, rotate: 5 }}
                   >
                     &gt;
                   </motion.div>
                   <div className="vision-mission-item-content">
                     <motion.h3 
                       className="vision-mission-item-title"
                       initial={{ opacity: 0, y: 20 }}
                       whileInView={{ opacity: 1, y: 0 }}
                       transition={{ duration: 0.4, delay: 1.0 }}
                       viewport={{ once: true, threshold: 0.2 }}
                     >
                       {t.preserveConserve.items.mission.title}
                     </motion.h3>
                     <motion.p 
                       className="vision-mission-item-description"
                       initial={{ opacity: 0, y: 15 }}
                       whileInView={{ opacity: 1, y: 0 }}
                       transition={{ duration: 0.4, delay: 1.1 }}
                       viewport={{ once: true, threshold: 0.2 }}
                     >
                       {t.preserveConserve.items.mission.description}
                     </motion.p>
                   </div>
                 </motion.div>
               </motion.div>
             </motion.div>
           </div>
         </motion.div>
       </section>
      
       {/* Business Content Switcher */}
       <div className="min-h-screen flex flex-col items-center justify-center p-6 sm:p-10" style={{backgroundColor: 'var(--bg-color)', transition: 'background-color 0.5s ease'}}>
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
      
      {/* Our Expert Consultants Section */}
      <section className="agents-section">
        <div className="agents-container">
           <motion.div 
             className="agents-header"
             initial={{ opacity: 0, y: 30 }}
             whileInView={{ opacity: 1, y: 0 }}
             transition={{ duration: 0.6 }}
             viewport={{ once: true, threshold: 0.3 }}
           >
             <motion.h2 
               className="agents-title"
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               transition={{ duration: 0.5, delay: 0.2 }}
               viewport={{ once: true, threshold: 0.3 }}
             >
               {t.expertConsultants.title}
             </motion.h2>
             <motion.p 
               className="agents-subtitle"
               initial={{ opacity: 0, y: 15 }}
               whileInView={{ opacity: 1, y: 0 }}
               transition={{ duration: 0.5, delay: 0.3 }}
               viewport={{ once: true, threshold: 0.3 }}
             >
               {t.expertConsultants.subtitle}
             </motion.p>
           </motion.div>
          
          <div className="agents-grid">
            <div className="agent-card">
              <div className="agent-card-inner">
                <div className="agent-card-front">
                  <img src="images/Aboutt1.jpg" alt={t.expertConsultants.consultants.sarah.name} className="agent-image" />
                  <div className="agent-info">
                    <h3 className="agent-name">{t.expertConsultants.consultants.sarah.name}</h3>
                    <p className="agent-role">{t.expertConsultants.consultants.sarah.role}</p>
                  </div>
                </div>
                <div className="agent-card-back">
                  <h3 className="agent-name">{t.expertConsultants.consultants.sarah.name}</h3>
                  <p className="agent-role">{t.expertConsultants.consultants.sarah.role}</p>
                  <p className="agent-description">
                    {t.expertConsultants.consultants.sarah.description}
                  </p>
                  <div className="agent-skills">
                    {t.expertConsultants.consultants.sarah.skills.map((skill, index) => (
                      <span key={index} className="skill-tag">{skill}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            
            <div className="agent-card">
              <div className="agent-card-inner">
                <div className="agent-card-front">
                  <img src="images/bs30.jpg" alt={t.expertConsultants.consultants.michael.name} className="agent-image" />
                  <div className="agent-info">
                    <h3 className="agent-name">{t.expertConsultants.consultants.michael.name}</h3>
                    <p className="agent-role">{t.expertConsultants.consultants.michael.role}</p>
                  </div>
                </div>
                <div className="agent-card-back">
                  <h3 className="agent-name">{t.expertConsultants.consultants.michael.name}</h3>
                  <p className="agent-role">{t.expertConsultants.consultants.michael.role}</p>
                  <p className="agent-description">
                    {t.expertConsultants.consultants.michael.description}
                  </p>
                  <div className="agent-skills">
                    {t.expertConsultants.consultants.michael.skills.map((skill, index) => (
                      <span key={index} className="skill-tag">{skill}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            
            <div className="agent-card">
              <div className="agent-card-inner">
                <div className="agent-card-front">
                  <img src="images/bs31.jpg" alt={t.expertConsultants.consultants.emily.name} className="agent-image" />
                  <div className="agent-info">
                    <h3 className="agent-name">{t.expertConsultants.consultants.emily.name}</h3>
                    <p className="agent-role">{t.expertConsultants.consultants.emily.role}</p>
                  </div>
                </div>
                <div className="agent-card-back">
                  <h3 className="agent-name">{t.expertConsultants.consultants.emily.name}</h3>
                  <p className="agent-role">{t.expertConsultants.consultants.emily.role}</p>
                  <p className="agent-description">
                    {t.expertConsultants.consultants.emily.description}
                  </p>
                  <div className="agent-skills">
                    {t.expertConsultants.consultants.emily.skills.map((skill, index) => (
                      <span key={index} className="skill-tag">{skill}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            
          </div>
        </div>
      </section>
      
      {/* Timeline */}
    
      {/* CTA */}
      <section className="cta-section">
        <div className="cta-overlay">
          <div className="cta-container">
            <motion.div
              className="cta-content"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="cta-left">
                <div className="cta-heading">
                  <div className="cta-accent-line"></div>
                  <h2>{t.consultationCta.title}</h2>
                </div>
                <p className="cta-description">
                  {t.consultationCta.description}
                </p>
                <Link to="/contact" className="cta-button">{t.consultationCta.button}</Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
  
 
        

      
        <style jsx>{`
         .home-page {
          padding-top: 80px;
        }

        /* Who We Are Section */
        .who-we-are-section {
          padding: 80px 20px;
          background-color: var(--sidebar-bg);
          position: relative;
          overflow: hidden;
        }

        [data-theme="dark"] .who-we-are-section {
          background-color: #2d2d2d;
        }

        .who-we-are-container {
          max-width: 1200px;
          margin: 0 auto;
        }

        .who-we-are-content {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 60px;
          align-items: center;
        }

        .who-we-are-text {
          padding: 20px;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }

        .section-subtitle {
          font-size: 0.9rem;
          font-weight: bold;
          color: var(--text-muted);
          text-transform: uppercase;
          letter-spacing: 1px;
          margin-bottom: 15px;
        }

        .who-we-are-title {
          font-size: 2.5rem;
          font-weight: bold;
          color: var(--heading-color);
          line-height: 1.2;
          margin-bottom: 20px;
        }

        .who-we-are-description {
          font-size: 1rem;
          color: var(--text-muted);
          line-height: 1.6;
          margin-bottom: 40px;
        }

        .who-we-are-features {
          display: flex;
          gap: 30px;
          margin-bottom: 40px;
          align-items: stretch;
          justify-content: flex-start;
        }

        .feature-box {
          background-color: var(--card-bg);
          padding: 20px;
          border-radius: 8px;
          box-shadow: var(--shadow-light);
          text-align: center;
          min-width: 180px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          flex: 0 0 auto;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          cursor: pointer;
        }

        .feature-box:hover {
          box-shadow: 0 8px 25px rgba(0,0,0,0.15);
        }

        .feature-badge {
          width: 60px;
          height: 60px;
          background-color: #ffd700;
          border: none;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 15px;
          transition: transform 0.3s ease;
        }

        .feature-box:hover .feature-badge {
          transform: rotate(5deg) scale(1.05);
        }

        .badge-number {
          font-size: 1.4rem;
          font-weight: bold;
          color: #333;
        }

        .trophy-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          border-radius: 8px;
        }

        .feature-text {
          font-size: 0.9rem;
          color: var(--heading-color);
          font-weight: 600;
          margin: 0;
          line-height: 1.3;
          transition: color 0.3s ease;
        }

        .feature-box:hover .feature-text {
          color: var(--primary-color);
        }

        .feature-checklist {
          display: flex;
          flex-direction: column;
          gap: 12px;
          flex: 1;
          justify-content: center;
        }

        .checklist-item {
          display: flex;
          align-items: center;
          gap: 10px;
          transition: transform 0.3s ease;
          cursor: pointer;
          padding: 5px;
          border-radius: 5px;
        }

        .checklist-item:hover {
          background-color: rgba(255, 215, 0, 0.1);
        }

        .checkmark {
          color: #ffd700;
          font-weight: bold;
          font-size: 1.1rem;
          transition: transform 0.3s ease;
        }

        .checklist-item:hover .checkmark {
          transform: scale(1.2);
        }

        .checklist-item span:last-child {
          font-size: 0.9rem;
          color: var(--text-muted);
          transition: color 0.3s ease;
        }

        .checklist-item:hover span:last-child {
          color: var(--heading-color);
        }

        .who-we-are-video {
          position: relative;
          border-radius: 8px;
          overflow: hidden;
          transition: transform 0.3s ease;
        }

        .consulting-video {
          width: 100%;
          height: 400px;
          object-fit: cover;
          cursor: pointer;
          transition: transform 0.3s ease;
        }

        .who-we-are-video:hover .consulting-video {
          transform: scale(1.02);
        }

        .play-button-overlay {
          position: absolute;
          top: 20px;
          right: 20px;
          width: 50px;
          height: 50px;
          background-color: #ffd700;
          border-radius: 4px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 4px 12px rgba(0,0,0,0.2);
        }

        .play-button-overlay:hover {
          background-color: #e6c200;
          transform: scale(1.1);
          box-shadow: 0 6px 20px rgba(0,0,0,0.3);
        }

        .play-icon {
          color: #333;
          font-size: 1.2rem;
          margin-left: 3px;
          transition: transform 0.3s ease;
        }

        /* Global Presence Section */
        .global-presence-section {
          padding: 80px 20px;
          background-color: var(--bg-color);
          position: relative;
          overflow: hidden;
        }

        .global-presence-container {
          max-width: 1200px;
          margin: 0 auto;
        }

        .global-presence-content {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 60px;
          align-items: center;
        }

        .global-presence-map {
          position: relative;
          height: 400px;
          background: var(--sidebar-bg);
          border-radius: 12px;
          overflow: hidden;
          box-shadow: var(--shadow-light);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        .global-presence-map:hover {
          box-shadow: 0 8px 25px rgba(0,0,0,0.15);
        }

        .world-map {
          width: 100%;
          height: 100%;
          position: relative;
          background-image: url('images/Map.jpg');
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
          transition: transform 0.3s ease;
        }

        .global-presence-map:hover .world-map {
          transform: scale(1.05);
        }

        .map-dots {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
        }

        .map-dot {
          position: absolute;
          width: 0;
          height: 0;
          border-left: 8px solid transparent;
          border-right: 8px solid transparent;
          border-top: 12px solid #fff;
          filter: drop-shadow(0 2px 4px rgba(0,0,0,0.3));
          animation: pulse 2s infinite;
        }

        @keyframes pulse {
          0% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.2); opacity: 0.7; }
          100% { transform: scale(1); opacity: 1; }
        }

        .global-presence-text {
          padding: 20px;
        }

        .global-presence-title {
          font-size: 1.8rem;
          font-weight: bold;
          color: var(--heading-color);
          line-height: 1.2;
          margin-bottom: 20px;
          white-space: nowrap;
        }

        .global-presence-description {
          font-size: 1rem;
          color: var(--text-muted);
          line-height: 1.6;
          margin-bottom: 40px;
        }

        .global-stats {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
        }

        .stat-card {
          background: var(--card-bg);
          padding: 30px 20px;
          border-radius: 12px;
          text-align: center;
          box-shadow: var(--shadow-light);
          border: 1px solid var(--border-color);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          cursor: pointer;
        }

        .stat-card:hover {
          box-shadow: 0 8px 25px rgba(0,0,0,0.15);
        }

        .stat-number {
          font-size: 2.5rem;
          font-weight: bold;
          color: var(--heading-color);
          margin-bottom: 8px;
          transition: color 0.3s ease;
        }

        .stat-card:hover .stat-number {
          color: var(--primary-color);
        }

        .stat-label {
          font-size: 0.9rem;
          color: var(--text-muted);
          font-weight: 500;
          transition: color 0.3s ease;
        }

        .stat-card:hover .stat-label {
          color: var(--heading-color);
        }

        /* Vision & Mission Section */
        .vision-mission-section {
          position: relative;
          min-height: 100vh;
          background-image: url('images/aboutbg.jpg');
          background-size: cover;
          background-position: center;
          background-attachment: fixed;
          overflow: hidden;
        }

        .vision-mission-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.8);
          display: flex;
          align-items: center;
          justify-content: center;
          transition: background 0.3s ease;
        }

        .vision-mission-container {
          max-width: 1200px;
          width: 100%;
          padding: 80px 20px;
        }

        .vision-mission-content {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 80px;
          align-items: center;
        }

        .vision-mission-left {
          color: white;
        }

        .vision-mission-subtitle {
          font-size: 0.9rem;
          font-weight: 600;
          color: #ffd700;
          text-transform: uppercase;
          letter-spacing: 1px;
          margin-bottom: 20px;
        }

        .vision-mission-title {
          font-size: 2.5rem;
          font-weight: bold;
          line-height: 1.2;
          margin-bottom: 30px;
          color: white;
        }

        .vision-mission-description {
          font-size: 1rem;
          line-height: 1.6;
          margin-bottom: 40px;
          color: white;
          opacity: 0.9;
        }

        .vision-mission-button {
          background-color: #ffd700;
          color: #333;
          padding: 15px 30px;
          border: none;
          border-radius: 5px;
          font-size: 1rem;
          font-weight: bold;
          text-transform: uppercase;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 4px 12px rgba(255, 215, 0, 0.3);
        }

        .vision-mission-button:hover {
          background-color: #e6c200;
          box-shadow: 0 6px 20px rgba(255, 215, 0, 0.4);
        }

        .vision-mission-right {
          display: flex;
          flex-direction: column;
          gap: 40px;
        }

        .vision-mission-item {
          display: flex;
          align-items: flex-start;
          gap: 20px;
          transition: transform 0.3s ease;
          cursor: pointer;
          padding: 10px;
          border-radius: 8px;
        }

        .vision-mission-item:hover {
          background-color: rgba(255, 215, 0, 0.1);
        }

        .vision-mission-icon {
          width: 40px;
          height: 40px;
          background-color: #ffd700;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.2rem;
          font-weight: bold;
          color: #333;
          flex-shrink: 0;
          transition: all 0.3s ease;
          box-shadow: 0 2px 8px rgba(255, 215, 0, 0.3);
        }

        .vision-mission-item:hover .vision-mission-icon {
          box-shadow: 0 4px 15px rgba(255, 215, 0, 0.5);
        }

        .vision-mission-item-content {
          flex: 1;
        }

        .vision-mission-item-title {
          font-size: 1.5rem;
          font-weight: bold;
          color: white;
          margin-bottom: 15px;
          transition: color 0.3s ease;
        }

        .vision-mission-item:hover .vision-mission-item-title {
          color: #ffd700;
        }

        .vision-mission-item-description {
          font-size: 1rem;
          line-height: 1.6;
          color: white;
          opacity: 0.9;
          transition: opacity 0.3s ease;
        }

        .vision-mission-item:hover .vision-mission-item-description {
          opacity: 1;
        }

        /* Agents Section */
        .agents-section {
          padding: 80px 20px;
          background-color: var(--sidebar-bg);
        }

        .agents-container {
          max-width: 1200px;
          margin: 0 auto;
        }

        .agents-header {
          text-align: center;
          margin-bottom: 60px;
        }

        .agents-title {
          font-size: 2.5rem;
          font-weight: bold;
          color: var(--heading-color);
          margin-bottom: 15px;
        }

        .agents-subtitle {
          font-size: 1.1rem;
          color: var(--text-muted);
        }

        .agents-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 30px;
        }

        .agent-card {
          perspective: 1000px;
          height: 400px;
        }

        .agent-card-inner {
          position: relative;
          width: 100%;
          height: 100%;
          text-align: center;
          transition: transform 0.6s;
          transform-style: preserve-3d;
        }

        .agent-card:hover .agent-card-inner {
          transform: rotateY(180deg);
        }

        .agent-card-front, .agent-card-back {
          position: absolute;
          width: 100%;
          height: 100%;
          backface-visibility: hidden;
          border-radius: 15px;
          box-shadow: 0 4px 15px rgba(0,0,0,0.1);
        }

        .agent-card-front {
          background-color: var(--card-bg);
          display: flex;
          flex-direction: column;
        }

        .agent-card-back {
          background-color: var(--heading-color);
          color: var(--bg-color);
          transform: rotateY(180deg);
          padding: 30px;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }

        .agent-image {
          width: 100%;
          height: 250px;
          object-fit: cover;
          object-position: center top;
          border-radius: 15px 15px 0 0;
        }

        .agent-info {
          padding: 20px;
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }

        .agent-name {
          font-size: 1.3rem;
          font-weight: bold;
          color: var(--heading-color);
          margin-bottom: 8px;
        }

        .agent-role {
          font-size: 1rem;
          color: var(--text-muted);
        }

        .agent-card-back .agent-name {
          color: var(--bg-color);
          font-size: 1.5rem;
          margin-bottom: 10px;
        }

        .agent-card-back .agent-role {
          color: #ffd700;
          font-size: 1.1rem;
          margin-bottom: 20px;
        }

        .agent-description {
          font-size: 0.95rem;
          line-height: 1.6;
          margin-bottom: 25px;
          color: var(--text-muted);
        }

        .agent-skills {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          justify-content: center;
        }

        .skill-tag {
          background-color: #ffd700;
          color: #333;
          padding: 5px 12px;
          border-radius: 15px;
          font-size: 0.8rem;
          font-weight: 600;
        }

        /* Trusted By Section */
        .trusted-by-section {
          padding: 80px 20px;
          background-color: var(--bg-color);
          position: relative;
          overflow: hidden;
        }

        .trusted-by-container {
          max-width: 1200px;
          margin: 0 auto;
        }

        .trusted-by-content {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 60px;
        }

        .trusted-by-text {
          flex: 1;
        }

        .trusted-by-title {
          font-size: 1.8rem;
          font-weight: bold;
          color: var(--heading-color);
          line-height: 1.3;
          margin-bottom: 15px;
        }

        .trusted-by-underline {
          height: 3px;
          background-color: #ffd700;
          border-radius: 2px;
          transition: width 0.8s ease;
        }

        .trusted-by-logos {
          display: flex;
          gap: 40px;
          align-items: center;
        }

        .logo-item {
          display: flex;
          align-items: center;
          gap: 12px;
          transition: transform 0.3s ease;
          cursor: pointer;
        }

        .logo-item:hover {
          transform: translateY(-2px);
        }

        .brand-logo {
          width: 40px;
          height: 40px;
          object-fit: cover;
          border-radius: 8px;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        .brand-logo:hover {
          box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        }

        .logo-text {
          font-size: 1rem;
          color: var(--text-muted);
          font-weight: 500;
          transition: color 0.3s ease;
        }

        .logo-item:hover .logo-text {
          color: var(--heading-color);
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
  color: #fff; /* ✅ force white text so it's visible on dark video background in both themes */
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
  background-color: #ffd700;
  border-radius: 10px;
  text-decoration: none;
  border: none;
  transition: background-color 0.3s, transform 0.3s;
  opacity: 0;
  animation: fadeUp 1s ease-out forwards 1.5s;
}

.hero-button:hover {
  background-color: #e6c200;
  transform: scale(1.1);
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
   
   .trusted-by-content {
     flex-direction: column;
     text-align: center;
     gap: 40px;
   }
   
   .trusted-by-title {
     font-size: 1.5rem;
   }
   
   .trusted-by-logos {
     flex-direction: column;
     gap: 20px;
   }
   
   .who-we-are-content {
     grid-template-columns: 1fr;
     gap: 40px;
   }
   
   .who-we-are-title {
     font-size: 2rem;
   }
   
   .who-we-are-features {
     flex-direction: column;
     gap: 20px;
   }
   
    .consulting-video {
      height: 300px;
    }
    
    .global-presence-content {
      grid-template-columns: 1fr;
      gap: 40px;
    }
    
    .global-presence-map {
      height: 300px;
    }
    
    .global-presence-title {
      font-size: 2rem;
    }
    
    .global-stats {
      grid-template-columns: 1fr;
      gap: 15px;
    }
    
    .stat-card {
      padding: 20px 15px;
    }
    
    .stat-number {
      font-size: 2rem;
    }
    
    .vision-mission-content {
      grid-template-columns: 1fr;
      gap: 40px;
    }
    
    .vision-mission-title {
      font-size: 2rem;
    }
    
    .vision-mission-right {
      gap: 30px;
    }
    
    .vision-mission-item {
      gap: 15px;
    }
    
    .vision-mission-icon {
      width: 35px;
      height: 35px;
      font-size: 1rem;
    }
    
    .vision-mission-item-title {
      font-size: 1.3rem;
    }
    
    .agents-title {
      font-size: 2rem;
    }
    
    .agents-grid {
      grid-template-columns: 1fr;
      gap: 20px;
    }
    
    .agent-card {
      height: 350px;
    }
    
    .agent-image {
      height: 200px;
    }
    
    .agent-card-back {
      padding: 20px;
    }
    
    .agent-description {
      font-size: 0.9rem;
      margin-bottom: 20px;
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
  background: url('/images/bs69.jpg') center/cover no-repeat fixed;
  padding: 0;
  color: white;
}

.cta-overlay {
  background-color: rgba(0, 0, 0, 0.7);
  padding: 100px 0;
}

.cta-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.cta-content {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  color: #fff;
}

.cta-left {
  padding: 20px;
  max-width: 600px;
  text-align: left;
}

.cta-heading {
  display: flex;
  align-items: center;
  margin-bottom: 30px;
}

.cta-accent-line {
  width: 4px;
  height: 60px;
  background-color: #ffd700;
  margin-right: 20px;
  border-radius: 2px;
}

.cta-heading h2 {
  font-size: 2.5rem;
  font-weight: bold;
  color: #fff;
  margin: 0;
  line-height: 1.2;
}

.cta-description {
  font-size: 1rem;
  color: #fff;
  line-height: 1.6;
  margin-bottom: 40px;
  opacity: 0.9;
}

.cta-button {
  display: inline-block;
  background-color: #ffd700;
  color: #333;
  padding: 15px 30px;
  border-radius: 5px;
  text-decoration: none;
  font-weight: bold;
  font-size: 1rem;
  transition: background-color 0.3s, transform 0.3s;
}

.cta-button:hover {
  background-color: #e6c200;
  transform: translateY(-2px);
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
            .cta-content {
              justify-content: center;
            }
            
            .cta-left {
              text-align: center;
              max-width: 100%;
            }
            
            .cta-heading h2 {
              font-size: 2rem;
            }
            
            .cta-accent-line {
              height: 40px;
              margin-right: 15px;
            }
        `}</style>
      </div>
    );
  };

  export default AboutUs;
