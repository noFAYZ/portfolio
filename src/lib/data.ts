import IconicIcon from "../assets/iconic.jpg"
import IqeraIcon from "../assets/iqera.png"
import MoneyMapprImage from "../assets/projects/moneymappr.JPG"
import FlexImage from "../assets/projects/flex.jpg"
import AceMinersImage from "../assets/projects/aceminers.PNG"
import AoteImage from "../assets/projects/aote.PNG"
import MarkImage from "../assets/projects/mark.PNG"
import TrippyImage from "../assets/projects/trippy.PNG"
import AntMinerzImage from "../assets/projects/antminerz.PNG"
import PepeImage from "../assets/projects/pepe.PNG"
import PortfolioImage from "../assets/projects/portfolio.png"
import SwapImage from "../assets/projects/swap.jpg"
import OrcafiImage from "../assets/projects/orcafi.PNG"
import OceanMoneyImage from "../assets/projects/ocean.money.PNG"
import ZunoImage from "../assets/projects/zuno.png"
import ZunoHomeDarkImage from "../assets/blog/zuno-home-dark.png"
import ZunoHomeLightImage from "../assets/blog/zuno-home-light.png"
import ZunoQueueImage from "../assets/blog/zuno-queue.png"
import ZunoSettingsImage from "../assets/blog/zuno-settings.png"
export const profile = {
  name: "Faizan Asad",
  role: "Software Engineer",
  tagline:
    "I build fast, accessible, and well-crafted web apps from idea to deployment.",
  location: "Islamabad, Pakistan",
  email: "m.faizanasad97@gmail.com",
  resumeUrl: "/resume.pdf",
  social: {
    github: "https://github.com/your-username",
    linkedin: "https://linkedin.com/in/your-username",
    twitter: "https://x.com/your-username",
  },
}

export const skillGroups = [
  {
    name: "Frontend",
    skills: [
      {
        name: "JavaScript",
        icon: "vscode-icons:file-type-js-official",
        level: "Expert",
      },
      {
        name: "TypeScript",
        icon: "vscode-icons:file-type-typescript-official",
        level: "Expert",
      },
      {
        name: "React",
        icon: "vscode-icons:file-type-reactjs",
        level: "Expert",
      },
      {
        name: "Next.js",
        icon: "vscode-icons:file-type-light-next",
        level: "Advanced",
      },
      {
        name: "Tailwind CSS",
        icon: "vscode-icons:file-type-tailwind",
        level: "Expert",
      },
    ],
  },
  {
    name: "Backend",
    skills: [
      {
        name: "Node.js",
        icon: "vscode-icons:file-type-node",
        level: "Advanced",
      },
      {
        name: "PostgreSQL",
        icon: "vscode-icons:file-type-postgres",
        level: "Advanced",
      },
      {
        name: "MongoDB",
        icon: "vscode-icons:file-type-mongo",
        level: "Advanced",
      },
    ],
  },
  {
    name: "Tools",
    skills: [
      {
        name: "Docker",
        icon: "vscode-icons:file-type-docker2",
        level: "Intermediate",
      },
      {
        name: "Vercel",
        icon: "vscode-icons:file-type-light-vercel",
        level: "Advanced",
      },
      { name: "Git", icon: "vscode-icons:file-type-git", level: "Expert" },
      {
        name: "AWS",
        icon: "vscode-icons:file-type-aws",
        level: "Intermediate",
      },
    ],
  },
] as const

export type Project = {
  title: string
  date?: string
  description: string
  image?: string
  icon: string
  tags: { name: string; icon: string }[]
  liveUrl?: string
  repoUrl?: string
  featured?: boolean
  openSource?: boolean
}

const tagIcons: Record<string, string> = {
  React: "vscode-icons:file-type-reactjs",
  "Next.js": "vscode-icons:file-type-light-next",
  "Tailwind CSS": "vscode-icons:file-type-tailwind",
  PostgreSQL: "vscode-icons:file-type-postgres",
  MongoDB: "vscode-icons:file-type-mongo",
  "Node.js": "vscode-icons:file-type-node",
  Solidity: "vscode-icons:file-type-solidity",
  Vercel: "vscode-icons:file-type-light-vercel",
  "ethers.js": "simple-icons:ethers",
  "Web3.js": "simple-icons:web3dotjs",
  IPFS: "simple-icons:ipfs",
  OpenAI: "simple-icons:openai",
  Express: "simple-icons:express",
  "D3.js": "simple-icons:d3dotjs",
  "Chart.js": "simple-icons:chartdotjs",
  "Framer Motion": "simple-icons:framer",
  "Socket.io": "devicon:socketio",
  NFTs: "ri:nft-line",
  dApp: "lucide:boxes",
  TypeScript: "vscode-icons:file-type-typescript-official",
  Rust: "vscode-icons:file-type-rust",
  Tauri: "devicon:tauri",
  Vite: "vscode-icons:file-type-vite",
}

const tags = (...names: string[]) =>
  names.map((name) => ({ name, icon: tagIcons[name] ?? "lucide:tag" }))

export const projects: Project[] = [
  {
    title: "Zuno",
    date: "2025-11-01",
    description:
      "A fast, native-feeling desktop client for YouTube Music — offline downloads, synced lyrics, mini player. Windows, macOS and Linux.",
    image: ZunoImage,
    icon: "lucide:music",
    tags: tags("Tauri", "Rust", "React", "TypeScript", "Vite"),
    liveUrl: "https://zuno.fayzan.xyz",
    repoUrl: "https://github.com/noFAYZ/zuno",
    featured: true,
    openSource: true,
  },
  {
    title: "MoneyMappr | Financial portfolio",
    date: "2025-02-15",
    description:
      "A Financial Portfolio management solution for all your Banks, Crypto and Ecommerce accounts.",
    image: MoneyMapprImage,
    icon: "lucide:wallet",
    tags: tags("ethers.js", "React", "Next.js", "PostgreSQL", "NFTs"),
    liveUrl: "https://moneymapprs.vercel.app/",
    repoUrl: "https://github.com/nofayz",
    featured: true,
  },
  {
    title: "Ocean.Money",
    date: "2021-06-15",
    description:
      "Personal finance dashboard with visualization tools and insights.",
    image: OceanMoneyImage,
    icon: "lucide:waves",
    tags: tags("React", "Next.js", "Solidity", "Web3.js", "IPFS", "dApp"),
    liveUrl: "http://ocean.money/",
    repoUrl: "https://github.com/yourusername/data-viz-dashboard",
  },
  {
    title: "Orcafi Swap DEX",
    date: "2021-12-10",
    description:
      "Decentralized exchange for trading assets with AMM and yield farming.",
    image: SwapImage,
    icon: "lucide:arrow-left-right",
    tags: tags("React", "Next.js", "Solidity", "Web3.js", "IPFS", "dApp"),
    liveUrl: "https://data-viz-dashboard-demo.vercel.app",
    repoUrl: "https://github.com/yourusername/data-viz-dashboard",
  },
  {
    title: "deFlexy Platform",
    date: "2025-01-10",
    description:
      "Decentralized freelancing platform powered by secure smart contracts.",
    image: FlexImage,
    icon: "lucide:briefcase",
    tags: tags("Solidity", "React", "Next.js", "IPFS", "Web3.js", "dApp"),
    liveUrl: "https://deflexy.com",
    repoUrl: "https://github.com/nofayz/deflexy",
  },
  {
    title: "Ace Miners Rewards",
    date: "2022-08-30",
    description:
      "NFT-based mining rewards platform with unique staking mechanism.",
    image: AceMinersImage,
    icon: "lucide:pickaxe",
    tags: tags("React", "Node.js", "Socket.io", "OpenAI", "MongoDB"),
    liveUrl: "https://aceminers.com",
    repoUrl: "https://github.com/yourusername/ai-chat-app",
  },
  {
    title: "Orcafi NFT Marketplace",
    date: "2023-04-22",
    description:
      "Decentralized NFT marketplace with creator-friendly features and low fees.",
    image: MarkImage,
    icon: "lucide:store",
    tags: tags("Solidity", "React", "Next.js", "IPFS", "Web3.js", "dApp"),
    liveUrl: "http://orcafi.io/p",
    repoUrl: "https://github.com/nofayz",
  },
  {
    title: "A.O.T.E. NFT Collection",
    date: "2023-08-15",
    description:
      "Manga-inspired NFT collection with unique character abilities and storylines.",
    image: AoteImage,
    icon: "lucide:swords",
    tags: tags("ethers.js", "React", "Next.js", "PostgreSQL", "NFTs"),
    liveUrl: "https://aote.vercel.app/",
    repoUrl: "https://github.com/nofayz",
  },
  {
    title: "Trippy Lion NFTs",
    date: "2022-11-05",
    description:
      "Psychedelic artwork NFT collection with generative designs on Ethereum.",
    image: TrippyImage,
    icon: "lucide:palette",
    tags: tags("React", "Next.js", "Solidity", "Web3.js", "IPFS"),
    liveUrl: "https://data-viz-dashboard-demo.vercel.app",
    repoUrl: "https://github.com/yourusername/data-viz-dashboard",
  },
  {
    title: "Ant Minerz Platform",
    date: "2022-06-15",
    description:
      "Ecosystem for digital mining assets with recurring rewards system.",
    image: AntMinerzImage,
    icon: "lucide:gem",
    tags: tags("React", "Next.js", "Solidity", "Web3.js", "IPFS"),
    liveUrl: "https://ecommerce-platform-demo.vercel.app",
    repoUrl: "https://github.com/yourusername/ecommerce-platform",
  },
  {
    title: "Poker Pepe Collection",
    date: "2022-04-01",
    description: "Poker-themed NFT characters and accessories on Ethereum.",
    image: PepeImage,
    icon: "lucide:spade",
    tags: tags("D3.js", "React", "Express", "PostgreSQL", "Chart.js"),
    liveUrl: "https://data-viz-dashboard-demo.vercel.app",
    repoUrl: "https://github.com/yourusername/data-viz-dashboard",
  },
  {
    title: "Portfolio Template",
    date: "2022-02-15",
    description:
      "Modern, responsive portfolio website for developers and creatives.",
    image: PortfolioImage,
    icon: "lucide:layout-template",
    tags: tags("React", "Next.js", "Tailwind CSS", "Framer Motion", "Vercel"),
    liveUrl: "https://data-viz-dashboard-demo.vercel.app",
    repoUrl: "https://github.com/yourusername/data-viz-dashboard",
  },
  {
    title: "Orcafi DeFi",
    date: "2021-09-22",
    description:
      "Platform for earning interest on crypto assets with various DeFi services.",
    image: OrcafiImage,
    icon: "lucide:coins",
    tags: tags("React", "Next.js", "Solidity", "Web3.js", "IPFS"),
    liveUrl: "https://data-viz-dashboard-demo.vercel.app",
    repoUrl: "https://github.com/yourusername/data-viz-dashboard",
  },
]

/** A paragraph, a "## heading", a screenshot, or a bullet list. */
export type Block =
  | string
  | { image: string; caption?: string }
  | { list: string[] }

export type Post = {
  slug: string
  title: string
  date: string
  description: string
  image?: string
  readingTime?: string
  /** set only for posts published elsewhere — links out instead of to /blog/:slug */
  url?: string
  content?: Block[]
}

// ponytail: hand-edited list — swap for an RSS/CMS fetch only if you start posting often
export const posts: Post[] = [
  {
    slug: "zuno-case-study",
    title: "Zuno: building a desktop client for YouTube Music",
    date: "2026-08-13",
    description:
      "A case study on Zuno — why a browser tab was the wrong home for a music library, and what it took to ship a native client to Windows, macOS and Linux.",
    image: ZunoHomeDarkImage,
    readingTime: "5 min",
    content: [
      "For years my music lived in a browser tab. The one you must not close. The one that dies with the browser. The one whose media keys stop working the moment another window takes focus. YouTube Music has the catalogue and the recommendations — it just has no home on the desktop.",
      "Zuno is that home: a YouTube Music client built with Tauri, React and TypeScript, running on Windows, macOS and Linux. It started as a fork of JustAnotherMusicClient and has since grown into its own app.",

      "## Why Tauri, not Electron",
      "The frontend was going to be a web app either way. Electron would have bundled a browser with every download; Tauri borrows the one the operating system already ships. What's left is a small Rust process for the parts that genuinely need the machine — filesystem, tray, media keys, updater.",
      "The trade is real. You inherit each platform's web view instead of controlling it, so one build meets three engines. That's the thing I'd weigh hardest before recommending this stack to anyone else.",

      "## A music app is a browsing app",
      "Tabs are the feature I use most and the one people are most surprised by. Queue an album in one, read an artist page in another, dig through a playlist in a third. Playback doesn't stop because you wandered off to look at something.",
      { image: ZunoQueueImage, caption: "Queue open alongside the library." },
      "The rest of the surface follows from that: search, browse, recommendations, likes and dislikes, batch actions on a selection, queue control, playlist import and export, and local files for what streaming doesn't carry.",

      "## Living on the desktop",
      "Native integration is most of what separates Zuno from the tab it replaces.",
      {
        list: [
          "Media keys, system tray and a mini player",
          "Discord rich presence and Last.fm scrobbling",
          "Offline downloads, plus caching for a bad connection",
          "Synced lyrics with inline translation",
          "Light and dark themes",
          "Updates that install themselves",
        ],
      },
      {
        image: ZunoSettingsImage,
        caption: "Settings — themes, integrations, downloads.",
      },
      "Lyrics are what people write to me about. They follow playback and translate inline, which is how I learned how badly I'd misheard half the songs I keep on repeat.",
      { image: ZunoHomeLightImage, caption: "Light theme, same layout." },

      "## Shipping to three platforms",
      "Three platforms means three sets of packaging rules, and that's where the unglamorous work went: installers for Windows, macOS and Linux, an AUR package for Arch, and in-place updates once any of them is installed.",
      "Zuno is Apache 2.0 and the source is on GitHub. Architecture, frontend and backend notes live in the docs folder if you'd rather read how the pieces fit before cloning it.",
    ],
  },
]

export type Experience = {
  role: string
  company: string
  period: string
  description: string
  tags: { name: string; icon: string }[]
  icon: string
  current?: boolean
}

export const experience: Experience[] = [
  {
    role: "Full Stack Developer",
    company: "Freelance",
    period: "2025 — Present",
    description:
      "Delivered end-to-end web applications for clients worldwide, covering UI design, backend development, and deployment.",
    tags: [
      { name: "JavaScript", icon: "vscode-icons:file-type-js-official" },
      { name: "React", icon: "vscode-icons:file-type-reactjs" },
      { name: "MongoDB", icon: "vscode-icons:file-type-mongo" },
      { name: "Next.js", icon: "vscode-icons:file-type-light-next" },
      { name: "Figma", icon: "vscode-icons:file-type-figma" },
    ],
    icon: "cib:upwork",
    current: true,
  },
  {
    role: "Full Stack Developer",
    company: "iconicstudio.com",
    period: "2022 — 2025",
    description:
      "Developed smart contracts and community dApps across EVM-compatible chains, supporting over $3M in on-chain transactions. Built full-stack Web3 applications, integrating blockchain infrastructure, wallets, and decentralized protocols.",
    tags: [
      { name: "React", icon: "vscode-icons:file-type-reactjs" },
      {
        name: "TypeScript",
        icon: "vscode-icons:file-type-typescript-official",
      },
      { name: "Node.js", icon: "vscode-icons:file-type-node" },
      { name: "PostgreSQL", icon: "vscode-icons:file-type-postgres" },
      { name: "Tailwind CSS", icon: "vscode-icons:file-type-tailwind" },
    ],
    icon: IconicIcon,
  },
  {
    role: "System Administrator  ",
    company: "IQera Schools",
    period: "2021 — 2022",
    description:
      "Managed LMS infrastructure, handling deployments, monitoring and server administration. Developed and maintained the school's app and website.",
    tags: [
      { name: "Linux", icon: "vscode-icons:file-type-linux" },
      { name: "DevOps", icon: "carbon:ibm-cloud-devops-insights" },
      { name: "Sakai LMS", icon: "mdi:school-outline" },
      { name: "React Native", icon: "vscode-icons:file-type-reactjs" },
      { name: "JavaScript", icon: "vscode-icons:file-type-js-official" },
      { name: "System Administration", icon: "mdi:server" },
    ],
    icon: IqeraIcon,
  },
]

export type Education = {
  degree: string
  school: string
  period: string
  description: string
  tags: string[]
  icon: string
  current?: boolean
}

export const education: Education[] = [
  {
    degree: "B.S. in Computer Science",
    school: "FAST NUCES",
    period: "2017 — 2021",
    description:
      "Focused on software engineering, data structures, and web development. Graduated with honors and led the university's coding club.",
    tags: ["Algorithms", "Databases", "Software Engineering"],
    icon: "lucide:graduation-cap",
  },
]
