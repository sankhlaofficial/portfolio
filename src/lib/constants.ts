// ─── Site Metadata ───────────────────────────────────────────────────────────

export const SITE = {
  name: 'Aditya Sankhla',
  title: 'Aditya Sankhla — CTO & AI-Powered Builder',
  description:
    'Self-taught developer & CTO building production apps with AI. Flutter, Firebase, React, TypeScript. View my work and get in touch.',
  url: 'https://adityasankhla.vercel.app',
  tagline: 'CTO at WellM | Building production apps with AI at 5x speed',
}

// ─── Social Links ────────────────────────────────────────────────────────────

export const SOCIAL = {
  github: 'https://github.com/sankhlaofficial',
  twitter: 'https://x.com/aditya_sankhla_',
  linkedin: 'https://www.linkedin.com/in/aditya-sankhla-16336125a/',
  medium: 'https://medium.com/@adityasankhla_39073',
  email: 'adityasankhla.comms@gmail.com',
}

// ─── Projects ────────────────────────────────────────────────────────────────

export interface Project {
  title: string
  subtitle: string
  stack: string[]
  platform: string
  role: string
  description: string
  link: string
}

export const PROJECTS: Project[] = [
  {
    title: 'Lifeline',
    subtitle: 'Corporate Wellness Platform',
    stack: ['Flutter', 'Firebase', 'Node.js', 'React'],
    platform: 'iOS + Android + Web',
    role: 'CTO — Built from scratch',
    description:
      'Full-stack wellness app for corporate employee health programs. Live on both app stores.',
    link: 'https://atlifeline.org',
  },
  {
    title: 'ReviewReply',
    subtitle: 'AI Review Response Generator',
    stack: ['Chrome Extension', 'Firebase', 'Gemini AI'],
    platform: 'SaaS Chrome Extension',
    role: 'Solo Builder',
    description:
      'One-click AI-powered responses to Google Business reviews. Built and shipped solo.',
    link: 'https://reviewreply.online',
  },
]

// ─── Experience ──────────────────────────────────────────────────────────────

export interface Experience {
  title: string
  org: string
  period: string
  description: string
}

export const EXPERIENCE: Experience[] = [
  {
    title: 'CTO',
    org: 'WellM',
    period: '2024–Present',
    description:
      'Built Lifeline wellness platform from scratch. Flutter + Firebase + React + Node.js.',
  },
  {
    title: 'Self-Taught Developer',
    org: 'Independent',
    period: '2021–2024',
    description:
      'Learned full-stack development with AI assistance. Built multiple production applications.',
  },
  {
    title: 'Customer Support',
    org: 'Dyson',
    period: '2018–2021',
    description:
      'Developed communication & problem-solving skills. Gurgaon, India.',
  },
  {
    title: 'Student',
    org: 'IIT BHU, Varanasi',
    period: '2015–2016',
    description:
      "One of India's top engineering institutions. Computer Science.",
  },
]

// ─── Skills ──────────────────────────────────────────────────────────────────

export interface SkillCategory {
  [skill: string]: number
}

export const SKILLS: Record<string, SkillCategory> = {
  Frontend: { Flutter: 90, React: 70, 'HTML/CSS': 85 },
  Backend: { Firebase: 90, 'Node.js': 70, TypeScript: 70 },
  Tools: { 'Claude Code': 95, Git: 70, Figma: 50 },
  Platforms: { Vercel: 70, 'Play Store': 75, 'App Store': 70 },
}

// ─── Navigation ──────────────────────────────────────────────────────────────

export const NAV_ITEMS = [
  'about',
  'projects',
  'experience',
  'skills',
  'blog',
  'contact',
] as const

export type NavItem = (typeof NAV_ITEMS)[number]
