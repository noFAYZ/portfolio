import IconicIcon from "../assets/iconic.jpg"
import IqeraIcon from "../assets/iqera.png"
import MoneyMapprImage from "../assets/projects/moneymappr.jpg"
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
        name: "Figma",
        icon: "vscode-icons:file-type-figma",
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
}

const tags = (...names: string[]) =>
  names.map((name) => ({ name, icon: tagIcons[name] ?? "lucide:tag" }))

export const projects: Project[] = [
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
