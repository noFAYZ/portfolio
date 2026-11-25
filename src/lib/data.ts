import ZunoImage from "@/assets/work/zuno.jpg"
import MoneyMapprImage from "@/assets/work/moneymappr.jpg"
import DeflexyImage from "@/assets/work/deflexy.jpg"
import OceanMoneyImage from "@/assets/work/ocean-money.jpg"
import OrcafiSwapImage from "@/assets/work/orcafi-swap.jpg"
import AceMinersImage from "@/assets/work/ace-miners.jpg"
import OrcafiNftImage from "@/assets/work/orcafi-nft.jpg"
import AoteImage from "@/assets/work/aote.jpg"
import TrippyImage from "@/assets/work/trippy-lion.jpg"
import AntMinerzImage from "@/assets/work/ant-minerz.jpg"
import PepeImage from "@/assets/work/poker-pepe.jpg"
import PortfolioImage from "@/assets/work/portfolio-template.jpg"
import OrcafiDefiImage from "@/assets/work/orcafi-defi.jpg"
import ZunoHomeDarkImage from "@/assets/blog/zuno-home-dark.jpg"
import ZunoHomeLightImage from "@/assets/blog/zuno-home-light.jpg"
import ZunoQueueImage from "@/assets/blog/zuno-queue.jpg"
import ZunoSettingsImage from "@/assets/blog/zuno-settings.jpg"
import GarajHomeDark from "@/assets/work/garaj-hero-phone-dark.webp"
import GarajHomeLight from "@/assets/work/garaj-hero-phone-light.webp"
import GarajScheduleDark from "@/assets/work/garaj-phone-schedule-dark.webp"
import GarajScheduleLight from "@/assets/work/garaj-phone-schedule-light.webp"
import GarajStatsDark from "@/assets/work/garaj-phone-stats-dark.webp"
import GarajStatsLight from "@/assets/work/garaj-phone-stats-light.webp"
import ZunoLogo from "@/assets/logos/apps/zuno.png"
import GarajLogo from "@/assets/logos/apps/garaj.png"
import IconicLogo from "@/assets/logos/iconic.jpg"
import IqeraLogo from "@/assets/logos/iqera.png"
import FastLogo from "@/assets/logos/fast.png"
import Portrait from "@/assets/profile/portrait.jpg"
import Resume from "@/assets/profile/resume.pdf"

export const profile = {
  name: "Faizan Asad",
  /** shown with a live dot in the hero — set to "" to hide */
  status: "Available for work",
  /** *word* renders as the serif italic accent; the hero's cycling platform pill ends it */
  headline: "I build fast, *well-crafted* apps for",
  timeZone: "Asia/Karachi",
  /** the live site — canonical links and social cards are built on it */
  url: "https://fayzan.xyz",
  email: "hello@fayzan.xyz",
  github: "https://github.com/noFAYZ",
  resume: Resume,
  portrait: Portrait,
}

/** Home page sections, in order — drives the dock and the command palette. */
export const sections = [
  { id: "work", label: "Work" },
  { id: "writing", label: "Writing" },
  { id: "contact", label: "Contact" },
]

export type Project = {
  title: string
  date: string
  /** one line — it sits on the card */
  description: string
  image: string
  tags: string[]
  liveUrl?: string
  repoUrl?: string
  /** its open-source license (SPDX id); set, the card wears an "Open source" label */
  license?: string
  /** GitHub stars to show when the live count can't be fetched (a dated snapshot) */
  stars?: number
  /** slug of a post that tells the story; the card opens it */
  caseStudy?: string
  /** a showcase card's colour — see the tone-* classes in index.css */
  tone?: "peach" | "mint" | "blush"
  /** the app's own icon, shown beside its name on the card */
  logo?: string
  /** what it runs on — sets the card's badge, its /projects filter, and how its shots are laid out */
  kind?: Kind
  /**
   * Puts it on the cards. Desktop and web: the app window, then a window
   * behind it. Mobile: the front phone, then the left and right ones.
   */
  shots?: Shot[]
}

/** Project kinds and their labels; the /projects filter shows the ones in use. */
export const kinds = { desktop: "Desktop", mobile: "Mobile", web: "Web" }
export type Kind = keyof typeof kinds

/** A screenshot in each theme; light falls back to dark. */
export type Shot = { dark: string; light?: string }

export const projects: Project[] = [
  {
    title: "Zuno",
    date: "2025-11-01",
    description: "Desktop client for YouTube Music",
    image: ZunoImage,
    tags: ["Tauri", "Rust", "React", "TypeScript", "Vite"],
    liveUrl: "https://zuno.fayzan.xyz",
    repoUrl: "https://github.com/noFAYZ/zuno",
    license: "Apache-2.0",
    stars: 652, // 2026-10-14; the live count replaces it
    caseStudy: "zuno-case-study",
    tone: "peach",
    kind: "desktop",
    logo: ZunoLogo,
    shots: [
      { dark: ZunoHomeDarkImage, light: ZunoHomeLightImage },
      { dark: ZunoQueueImage },
    ],
  },
  {
    title: "Garaj",
    date: "2026-10-09",
    description: "A digital garage for every vehicle you own",
    image: GarajHomeDark,
    tags: ["Expo", "Fastify", "PostgreSQL", "Next.js", "Drizzle"],
    repoUrl: "https://github.com/noFAYZ/garaj",
    tone: "blush",
    kind: "mobile",
    logo: GarajLogo,
    shots: [
      { dark: GarajHomeDark, light: GarajHomeLight },
      { dark: GarajScheduleDark, light: GarajScheduleLight },
      { dark: GarajStatsDark, light: GarajStatsLight },
    ],
  },
  {
    title: "MoneyMappr",
    date: "2025-02-15",
    description: "Banks, crypto and commerce in one portfolio",
    image: MoneyMapprImage,
    tags: ["ethers.js", "React", "Next.js", "PostgreSQL", "NFTs"],
    liveUrl: "https://moneymapprs.vercel.app/",
    tone: "mint",
  },
  {
    title: "deFlexy",
    date: "2025-01-10",
    description: "Freelancing on smart contracts",
    image: DeflexyImage,
    tags: ["Solidity", "React", "Next.js", "IPFS", "Web3.js", "dApp"],
    liveUrl: "https://deflexy.com",
    repoUrl: "https://github.com/nofayz/deflexy",
    tone: "blush",
  },
  {
    title: "A.O.T.E. NFT Collection",
    date: "2023-08-15",
    description: "Manga-inspired NFT collection with character lore",
    image: AoteImage,
    tags: ["ethers.js", "React", "Next.js", "PostgreSQL", "NFTs"],
    liveUrl: "https://aote.vercel.app/",
  },
  {
    title: "Orcafi NFT Marketplace",
    date: "2023-04-22",
    description: "Creator-friendly NFT marketplace with low fees",
    image: OrcafiNftImage,
    tags: ["Solidity", "React", "Next.js", "IPFS", "Web3.js", "dApp"],
    liveUrl: "http://orcafi.io/p",
  },
  {
    title: "Trippy Lion NFTs",
    date: "2022-11-05",
    description: "Generative psychedelic art on Ethereum",
    image: TrippyImage,
    tags: ["React", "Next.js", "Solidity", "Web3.js", "IPFS"],
  },
  {
    title: "Ace Miners Rewards",
    date: "2022-08-30",
    description: "NFT mining rewards with staking",
    image: AceMinersImage,
    tags: ["React", "Node.js", "Socket.io", "OpenAI", "MongoDB"],
    liveUrl: "https://aceminers.com",
  },
  {
    title: "Ant Minerz Platform",
    date: "2022-06-15",
    description: "Digital mining assets with recurring rewards",
    image: AntMinerzImage,
    tags: ["React", "Next.js", "Solidity", "Web3.js", "IPFS"],
  },
  {
    title: "Poker Pepe Collection",
    date: "2022-04-01",
    description: "Poker-themed NFT characters on Ethereum",
    image: PepeImage,
    tags: ["D3.js", "React", "Express", "PostgreSQL", "Chart.js"],
  },
  {
    title: "Portfolio Template",
    date: "2022-02-15",
    description: "Responsive portfolio for developers and creatives",
    image: PortfolioImage,
    tags: ["React", "Next.js", "Tailwind CSS", "Framer Motion", "Vercel"],
  },
  {
    title: "Orcafi Swap DEX",
    date: "2021-12-10",
    description: "AMM exchange with yield farming",
    image: OrcafiSwapImage,
    tags: ["React", "Next.js", "Solidity", "Web3.js", "IPFS", "dApp"],
  },
  {
    title: "Orcafi DeFi",
    date: "2021-09-22",
    description: "Earn interest on crypto assets",
    image: OrcafiDefiImage,
    tags: ["React", "Next.js", "Solidity", "Web3.js", "IPFS"],
  },
  {
    title: "Ocean.Money",
    date: "2021-06-15",
    description: "Personal finance dashboard and insights",
    image: OceanMoneyImage,
    tags: ["React", "Next.js", "Solidity", "Web3.js", "IPFS", "dApp"],
    liveUrl: "http://ocean.money/",
  },
]

/** The projects shown as cards, on the home page and /projects; the rest are the archive. */
export const showcase = projects.filter((p) => p.shots?.length)

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

export type Entry = {
  period: string
  title: string
  place: string
  /** a logo image; without one the row shows a globe */
  logo?: string
}

/** Work history, newest first, with education at the end. */
export const experience: Entry[] = [
  { period: "2025 — Now", title: "Full Stack Developer", place: "Freelance" },
  {
    period: "2022 — 25",
    title: "Full Stack Developer",
    place: "iconicstudio.com",
    logo: IconicLogo,
  },
  {
    period: "2021 — 22",
    title: "System Administrator",
    place: "IQera Schools",
    logo: IqeraLogo,
  },
  {
    period: "2017 — 21",
    title: "B.S. Computer Science",
    place: "FAST NUCES",
    logo: FastLogo,
  },
]
