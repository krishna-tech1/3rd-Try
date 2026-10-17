// Single source of truth generated strictly from content1.md

export interface Project {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  tags: string[];
  role: string;
  impact: string;
  githubUrl?: string;
  liveUrl?: string;
  featured: boolean;
}

export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  period: string;
  bullets: string[];
}

export interface SkillCategory {
  area: string;
  skills: string[];
}

export interface AchievementItem {
  title: string;
  category: string;
  description: string;
}

export const PORTFOLIO_CONTENT = {
  brand: {
    name: "Muthu Krishnan A",
    monogram: "MK",
    tagline: "Full-stack & mobile engineer building websites, apps, and AI-powered tools.",
    location: "Chennai, India",
    availability: "Available for freelance & remote work",
    subHeadline: "Full-stack & mobile engineer building websites, apps, and AI-powered tools.",
    headline: "Hi, I'm Muthu Krishnan.",
  },

  marquee: [
    "Next.js",
    "React",
    "TypeScript",
    "Tailwind CSS",
    "Flutter",
    "Node.js",
    "PostgreSQL",
    "Prisma",
    "Python AI",
    "REST APIs",
    "Three.js",
    "Git",
    "Vercel",
  ],

  about: {
    headline: "Engineering robust web & mobile products from idea to production.",
    bio: "I'm a full-stack engineer from Chennai, currently working as a Software Engineer and finishing my BCA. Over the past year I've built websites and apps for 4+ direct clients across different industries, from first idea to deployed product. I work across the stack, web and mobile, frontend to database, and I care about clean UI, solid architecture, and delivering on time.",
    stats: [
      { value: "4+", label: "Direct client projects delivered" },
      { value: "₹1.15L", label: "Biggest project value" },
      { value: "4", label: "College hackathon wins" },
      { value: "5+", label: "Direct freelance clients" },
    ],
  },

  projects: [
    {
      id: "relivo",
      title: "Relivo",
      subtitle: "Refugee-Support Initiative Web & Mobile App",
      description:
        "Sole developer: built both the website and the mobile app for a refugee-support initiative. Owned the full product cycle from initial UX design and frontend to scalable backend architecture and production deployment.",
      tags: ["Flutter", "React", "Node.js", "REST APIs"],
      role: "Sole Full-Stack Developer",
      impact: "Cross-platform Web & Mobile Solution",
      featured: true,
      githubUrl: "https://github.com/krishna-tech1",
      liveUrl: "https://github.com/krishna-tech1",
    },
    {
      id: "german-bharatham",
      title: "German-Bharatham",
      subtitle: "Full-Scale Client Web Platform",
      description:
        "End-to-end full-stack client web product built from initial idea to live production deployment with custom workflows, responsive architecture, and bulletproof database persistence.",
      tags: ["Next.js", "TypeScript", "Tailwind CSS", "PostgreSQL", "Prisma"],
      role: "Lead Full-Stack Developer",
      impact: "₹1.15 Lakh Project Value",
      featured: true,
      githubUrl: "https://github.com/krishna-tech1",
      liveUrl: "https://github.com/krishna-tech1",
    },
    {
      id: "hackathon-winner",
      title: "Hackathon Winning Solution",
      subtitle: "College Tech Challenge Winner",
      description:
        "Rapidly prototyped and shipped a high-impact solution solving real-world challenges under strict competition deadlines, securing 1st place among college engineering teams.",
      tags: ["React", "TypeScript", "Node.js", "Python AI"],
      role: "Full-Stack & Systems Lead",
      impact: "4-Time College Hackathon Winner",
      featured: true,
      githubUrl: "https://github.com/krishna-tech1",
      liveUrl: "https://github.com/krishna-tech1",
    },
    {
      id: "ai-tooling",
      title: "AI Automation Suite",
      subtitle: "Workflow Intelligence & Automation Tools",
      description:
        "Custom Python-based AI automation tools engineered to eliminate repetitive bottlenecks and streamline production data workflows for multi-client operations.",
      tags: ["Python", "AI Tooling", "Automation", "REST APIs"],
      role: "Full-Stack Developer",
      impact: "5+ Freelance Clients Served",
      featured: true,
      githubUrl: "https://github.com/krishna-tech1",
      liveUrl: "https://github.com/krishna-tech1",
    },
  ] as Project[],

  experience: [
    {
      id: "exp-1",
      role: "Software Engineer",
      company: "MaestroMinds",
      period: "May 2026 – Present",
      bullets: [
        "Building and shipping client products as a full-time engineer.",
        "Delivering robust frontend interfaces and scalable backend services.",
      ],
    },
    {
      id: "exp-2",
      role: "Freelance Developer",
      company: "MaestroMinds",
      period: "Feb 2026 – May 2026",
      bullets: [
        "Worked with the company as a freelancer before joining full-time.",
        "Engineered client-requested web and mobile capabilities with tight delivery cycles.",
      ],
    },
    {
      id: "exp-3",
      role: "Full-Stack Developer Intern (Online)",
      company: "MaestroMinds",
      period: "Jan 3 – Feb 2, 2026",
      bullets: [
        "Sole developer: built both the website and the mobile app for a refugee-support initiative.",
        "Owned the full cycle: design, frontend, backend, deployment.",
      ],
    },
    {
      id: "exp-4",
      role: "Freelance Full-Stack Developer",
      company: "Self-Employed",
      period: "Oct 2025 – Dec 2025",
      bullets: [
        "Worked directly with 5+ clients on web and app development.",
        "Handled requirements, design, development, and delivery end to end.",
      ],
    },
  ] as ExperienceItem[],

  education: {
    degree: "BCA (Bachelor of Computer Applications)",
    institution: "Avichi College of Arts and Science",
    period: "2024 – 2027 (final year)",
  },

  skills: [
    {
      area: "Frontend",
      skills: ["Next.js", "React", "TypeScript", "Tailwind CSS"],
    },
    {
      area: "Backend",
      skills: ["Node.js", "REST APIs"],
    },
    {
      area: "Database",
      skills: ["PostgreSQL", "Prisma"],
    },
    {
      area: "Mobile",
      skills: ["Flutter"],
    },
    {
      area: "AI & Automation",
      skills: ["Python-based AI tools", "Automation"],
    },
    {
      area: "Other & Tools",
      skills: ["Blockchain basics", "Salesforce basics", "Git", "Vercel"],
    },
  ] as SkillCategory[],

  achievements: [
    {
      title: "4-Time College Hackathon Winner",
      category: "Hackathon",
      description: "Won 4 hackathons at college building innovative web, mobile, and AI solutions.",
    },
    {
      title: "Blockchain Course Certification",
      category: "Certification",
      description: "Comprehensive coursework covering blockchain architecture, smart contracts, and decentralized systems.",
    },
    {
      title: "Salesforce Course Certification",
      category: "Certification",
      description: "Specialized training in Salesforce fundamentals, cloud administration, and enterprise workflows.",
    },
  ] as AchievementItem[],

  contact: {
    headline: "Let's work together.",
    subHeadline:
      "Available for remote engineering roles, high-impact freelance projects, and full-stack consulting.",
    email: "muthukrishnan8733@gmail.com",
    phone: "+91 82485 92553",
    whatsappUrl: "https://wa.me/918248592553",
    linkedinUrl: "https://linkedin.com/in/muthukrishnan-dev",
    githubUrl: "https://github.com/krishna-tech1",
    instagramUrl: "https://instagram.com/ig_krish_na",
    resumeUrl: "/resume.pdf",
  },
} as const;
