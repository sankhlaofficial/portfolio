// ─── Terminal Command System ─────────────────────────────────────────────────

export type CommandResult =
  | { type: 'output'; lines: string[] }
  | { type: 'scroll'; target: string }
  | { type: 'clear' }

interface CommandEntry {
  description: string
  execute: () => CommandResult
}

const SECTIONS = [
  'about',
  'projects',
  'experience',
  'skills',
  'blog',
  'contact',
]

const commands: Record<string, CommandEntry> = {
  help: {
    description: 'List all available commands',
    execute: () => ({
      type: 'output',
      lines: [
        'Available commands:',
        '',
        '  help           — Show this help message',
        '  whoami         — Who am I?',
        '  about          — About me',
        '  projects       — View my projects',
        '  experience     — Work history',
        '  skills         — Technical skills',
        '  blog           — Read my articles',
        '  contact        — Get in touch',
        '  social         — Social media links',
        '  ls             — List all sections',
        '  cat resume.txt — Quick resume summary',
        '  clear          — Clear terminal',
        '',
        '  sudo hire me   — ???',
      ],
    }),
  },

  whoami: {
    description: 'Display identity',
    execute: () => ({
      type: 'output',
      lines: ['Aditya Sankhla — CTO & AI-Powered Builder'],
    }),
  },

  about: {
    description: 'Scroll to about section',
    execute: () => ({ type: 'scroll', target: '#about' }),
  },

  projects: {
    description: 'Scroll to projects section',
    execute: () => ({ type: 'scroll', target: '#projects' }),
  },

  experience: {
    description: 'Scroll to experience section',
    execute: () => ({ type: 'scroll', target: '#experience' }),
  },

  skills: {
    description: 'Scroll to skills section',
    execute: () => ({ type: 'scroll', target: '#skills' }),
  },

  blog: {
    description: 'Scroll to blog section',
    execute: () => ({ type: 'scroll', target: '#blog' }),
  },

  contact: {
    description: 'Scroll to contact section',
    execute: () => ({ type: 'scroll', target: '#contact' }),
  },

  social: {
    description: 'Show social links',
    execute: () => ({
      type: 'output',
      lines: [
        'Social links:',
        '',
        '  GitHub    → github.com/sankhlaofficial',
        '  X         → x.com/aditya_sankhla_',
        '  LinkedIn  → linkedin.com/in/aditya-sankhla-16336125a',
        '  Medium    → medium.com/@adityasankhla_39073',
      ],
    }),
  },

  clear: {
    description: 'Clear the terminal',
    execute: () => ({ type: 'clear' }),
  },

  'sudo hire me': {
    description: 'Easter egg',
    execute: () => ({
      type: 'output',
      lines: [
        '[sudo] password for visitor: ********',
        '',
        '✓ Permission granted.',
        '  Sending resume...',
        '  Launching negotiation protocol...',
        '',
        "  Just kidding. But seriously, let's talk.",
        '  → Scroll down to contact or email adityasankhla.comms@gmail.com',
      ],
    }),
  },

  ls: {
    description: 'List all sections',
    execute: () => ({
      type: 'output',
      lines: [
        'drwxr-xr-x  sections/',
        '',
        ...SECTIONS.map((s) => `  ${s}/`),
      ],
    }),
  },

  'ls skills/': {
    description: 'List skills',
    execute: () => ({
      type: 'output',
      lines: [
        'flutter/  firebase/  react/  typescript/  nodejs/  ai-tools/',
      ],
    }),
  },

  'cat role.txt': {
    description: 'Show role',
    execute: () => ({
      type: 'output',
      lines: [
        'CTO at WellM | Building production apps with AI at 5x speed',
      ],
    }),
  },

  'cat mission.txt': {
    description: 'Show mission',
    execute: () => ({
      type: 'output',
      lines: [
        'Self-taught. AI-powered. Shipping products that matter.',
      ],
    }),
  },

  'cat resume.txt': {
    description: 'Quick resume summary',
    execute: () => ({
      type: 'output',
      lines: [
        '┌─────────────────────────────────────────┐',
        '│  Aditya Sankhla                         │',
        '│  CTO @ WellM  •  Delhi, India           │',
        '│                                         │',
        '│  Flutter · Firebase · React · Node.js   │',
        '│  TypeScript · AI-Assisted Development   │',
        '│                                         │',
        '│  Built Lifeline (wellness platform)     │',
        '│  Shipped ReviewReply (AI Chrome ext)    │',
        '│  IIT BHU · Self-taught · 3yr Dyson      │',
        '│                                         │',
        '│  adityasankhla.comms@gmail.com          │',
        '└─────────────────────────────────────────┘',
      ],
    }),
  },
}

// ─── Command Executor ────────────────────────────────────────────────────────

export function executeCommand(input: string): CommandResult {
  const trimmed = input.trim().toLowerCase()

  if (trimmed === '') {
    return { type: 'output', lines: [] }
  }

  const cmd = commands[trimmed]
  if (cmd) {
    return cmd.execute()
  }

  return {
    type: 'output',
    lines: [
      `Command not found: ${input.trim()}`,
      "Type 'help' for available commands.",
    ],
  }
}

export { commands }
