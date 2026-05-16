// ─── Site Metadata ───────────────────────────────────────────────────────────

export const SITE = {
  name: 'Aditya Sankhla',
  title: 'Aditya Sankhla — CTO & AI-Powered Builder',
  description:
    'Self-taught developer & CTO building production apps with AI. Flutter, Firebase, React, TypeScript, Anthropic SDK. View my work and get in touch.',
  url: 'https://adityasankhla.vercel.app',
  tagline: 'CTO at WellM | Shipping production apps with AI as a force multiplier',
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
    title: 'CI Agent',
    subtitle: 'Competitive Intelligence SaaS',
    stack: ['Next.js', 'TypeScript', 'Anthropic SDK', 'Firebase'],
    platform: 'Web SaaS',
    role: 'Solo Builder',
    description:
      'AI-powered competitor tracking with a premium UI. Built end-to-end in days using Claude Code as a force multiplier.',
    link: 'https://github.com/sankhlaofficial/ci-agent',
  },
  {
    title: 'Storybook Agent',
    subtitle: 'Children’s Book Generator',
    stack: ['Managed Agents', 'Cloudflare Workers', 'Node.js', 'PDF/EPUB'],
    platform: 'CLI → Amazon KDP',
    role: 'Solo Builder',
    description:
      'CLI tool that generates illustrated children’s books and exports them as KDP-compliant PDF + EPUB. Published on Amazon KDP.',
    link: 'https://github.com/sankhlaofficial',
  },
  {
    title: 'ReviewReply',
    subtitle: 'AI Review Response Generator',
    stack: ['Chrome Extension', 'Firebase REST', 'LLM API'],
    platform: 'SaaS Chrome Extension',
    role: 'Solo Builder',
    description:
      'One-click AI-powered responses to Google Business reviews. Built and shipped solo in 4 days.',
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
    period: '2022–Present',
    description:
      'Sole engineering owner of a wellness platform across iOS, Android, web, and backend. Flutter + Firebase + React + Node.js + TypeScript. Designated HIPAA Security Officer.',
  },
  {
    title: 'Self-Taught Developer',
    org: 'Independent',
    period: '2021–2022',
    description:
      'Learned full-stack development with AI assistance. Shipped early production apps and joined WellM as intern, then promoted to CTO.',
  },
  {
    title: 'Customer Support',
    org: 'Dyson',
    period: '2019–2021',
    description:
      'Developed communication & problem-solving skills working with global customers. Delhi NCR.',
  },
  {
    title: 'B.Tech, Chemical Engineering',
    org: 'IIT BHU, Varanasi',
    period: '2016–2019',
    description:
      "Three years at one of India's top engineering institutions. Left to pursue independent technology work.",
  },
]

// ─── Skills ──────────────────────────────────────────────────────────────────

export interface SkillCategory {
  [skill: string]: number
}

export const SKILLS: Record<string, SkillCategory> = {
  Frontend: { Flutter: 90, React: 75, 'Next.js': 70, 'HTML/CSS': 85 },
  Backend: { Firebase: 90, 'Node.js': 75, TypeScript: 80, Python: 60 },
  'AI / ML': {
    'Claude Code': 95,
    'Anthropic SDK': 85,
    'Managed Agents': 80,
    TensorFlow: 55,
  },
  Tools: { Git: 75, Cursor: 75, Figma: 50 },
  Platforms: { Vercel: 80, Cloudflare: 65, 'Play Store': 75, 'App Store': 70 },
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
