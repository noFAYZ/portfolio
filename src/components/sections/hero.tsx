import { Fragment, useEffect, useRef, useState, type ReactNode } from "react"
import { AnimatePresence, motion, useReducedMotion } from "motion/react"
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  ChevronDown,
  Copy,
  FileText,
  Globe,
  Monitor,
  Smartphone,
} from "lucide-react"
import { Link } from "react-router"
import { ActionSwapIcon } from "@/components/motion/action-swap"
import { SharedLayoutBg } from "@/components/motion/shared-layout-bg"
import {
  experience,
  profile,
  projects,
  showcase,
  type Entry,
  type Project,
} from "@/lib/data"
import { EASE_OUT, SPRING_LAYOUT, SPRING_PANEL, SPRING_PRESS } from "@/lib/ease"
import { useStars } from "@/lib/hooks/use-stars"
import { githubIcon } from "@/lib/tech-icons"
import { useIsDark } from "@/lib/theme"
import { FOCUS_RING, scrollToId } from "@/lib/ui"
import { cn } from "@/lib/utils"

const enter = (delay: number) => ({
  initial: { opacity: 0, y: 8, filter: "blur(6px)" },
  animate: { opacity: 1, y: 0, filter: "blur(0px)" },
  transition: { duration: 0.5, ease: EASE_OUT, delay },
})

// the headline ends on what the apps run on, cycling, each in its cards' colour
const platforms = [
  { word: "desktop", icon: Monitor, tone: "peach" },
  { word: "mobile", icon: Smartphone, tone: "blush" },
  { word: "the web", icon: Globe, tone: "mint" },
] as const

const words = profile.headline.split(" ")
const WORD_STAGGER = 0.045
const flagship = showcase[0]

export function Hero() {
  const stars = useStars(flagship.repoUrl, flagship.stars)

  return (
    // as wide as the work grid below it, so the two read as one block
    <header id="top" className="pt-24 sm:pt-28 md:-mx-10 lg:-mx-20">
      {/* who and what on the left; the numbers beside them (beneath on phones) */}
      <div className="grid gap-6 sm:grid-cols-[1fr_12rem] sm:gap-10">
        <div className="min-w-0">
          <div className="flex items-center gap-3">
            {/* a sticker: drag it anywhere, it springs home */}
            <motion.span
              drag
              dragSnapToOrigin
              dragElastic={0.6}
              dragTransition={{ bounceStiffness: 500, bounceDamping: 22 }}
              initial={{ opacity: 0, scale: 0.6, rotate: -18 }}
              animate={{ opacity: 1, scale: 1, rotate: -5 }}
              whileHover={{ rotate: 0, scale: 1.06 }}
              whileDrag={{ scale: 1.12, rotate: 6, zIndex: 50 }}
              transition={SPRING_PRESS}
              className="relative shrink-0 cursor-grab touch-none active:cursor-grabbing"
            >
              <img
                src={profile.portrait}
                alt=""
                draggable={false}
                className="size-11 rounded-[13px] object-cover shadow-xl"
              />
              {profile.status && (
                <span
                  title={profile.status}
                  className="bg-success ring-background absolute -right-1 -bottom-1 size-3.5 rounded-full ring-[3px]"
                />
              )}
            </motion.span>

            <motion.div {...enter(0.05)} className="min-w-0">
              <p className="text-[15px] leading-tight font-medium">
                {profile.name}
              </p>
              <p className="text-muted-foreground truncate text-[13px]">
                Full-stack engineer
              </p>
            </motion.div>

            <Experience />
          </div>

          <h1 className="mt-6 max-w-[22em] text-[clamp(1.5rem,3.6vw,2rem)] leading-[1.15] font-medium tracking-[-0.035em] text-balance">
            {words.map((word, i) => (
              <Fragment key={i}>
                <motion.span
                  initial={{ opacity: 0, y: "0.4em", filter: "blur(8px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  transition={{
                    duration: 0.5,
                    ease: EASE_OUT,
                    delay: 0.1 + i * WORD_STAGGER,
                  }}
                  className={cn(
                    "inline-block",
                    word.includes("*") &&
                      "font-serif font-normal tracking-[-0.01em] italic"
                  )}
                >
                  {word.replaceAll("*", "")}
                </motion.span>{" "}
              </Fragment>
            ))}
            <span className="sr-only">desktop, mobile and the web</span>
            <Platform delay={0.15 + words.length * WORD_STAGGER} />.
          </h1>

          <motion.p
            {...enter(0.55)}
            className="text-muted-foreground mt-3 text-[15px] leading-relaxed"
          >
            Currently building{" "}
            {showcase.map((project, i) => (
              <Fragment key={project.title}>
                {i > 0 && (i === showcase.length - 1 ? " and " : ", ")}
                <AppChip project={project} />
              </Fragment>
            ))}
            .
          </motion.p>

          <motion.div {...enter(0.65)} className="mt-5">
            <Actions />
          </motion.div>
        </div>

        <motion.div {...enter(0.75)} className="relative z-30 sm:self-end">
          <Stats
            preview={<Activity />}
            items={[
              {
                value: stars ?? 0,
                label: "stars on GitHub",
                github: true,
                live: true,
                feature: true,
                href: flagship.repoUrl,
              },
              { prefix: "$", value: 3, suffix: "M+", label: "on-chain" },
              { value: projects.length, label: "projects", href: "#work" },
            ]}
          />
        </motion.div>
      </div>
    </header>
  )
}

/** The GitHub contribution graph, in the site's theme. */
function Activity() {
  const dark = useIsDark()
  const user = profile.github.split("/").pop() ?? ""

  return (
    <>
      <div className="text-muted-foreground mb-3 flex items-center gap-1.5 text-[12px]">
        <svg aria-hidden viewBox="0 0 24 24" className="size-3">
          <path d={githubIcon} fill="currentColor" />
        </svg>
        <span className="text-foreground font-medium">Activity</span>
        <span className="ml-auto">@{user}</span>
      </div>
      {/* color-scheme: normal keeps the embed transparent in dark mode */}
      <iframe
        src={`https://jandi.firejune.io/${user.toLowerCase()}?radius=3&margin=2&footer=false&weeks=false&scheme=${dark ? "dark" : "light"}`}
        title="GitHub contribution graph"
        height={80}
        className="w-full [color-scheme:normal]"
      />
    </>
  )
}

function Logo({ entry, className }: { entry: Entry; className?: string }) {
  return entry.logo ? (
    <img
      src={entry.logo}
      alt=""
      className={cn("shrink-0 rounded-full object-cover", className)}
    />
  ) : (
    <span
      className={cn(
        "bg-card text-muted-foreground grid shrink-0 place-items-center rounded-full",
        className
      )}
    >
      <Globe aria-hidden className="size-[45%]" />
    </span>
  )
}

/**
 * Where I've been, folded into a chip of overlapping logos that fan apart on
 * hover. It opens a small card of the places over the hero rather than
 * pushing it down, and closes on Escape or a click anywhere else. Raised
 * above the headline, which paints later and would otherwise cover the card.
 */
function Experience() {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return
    const close = (e: PointerEvent | KeyboardEvent) => {
      const outside =
        e instanceof KeyboardEvent
          ? e.key === "Escape"
          : !ref.current?.contains(e.target as Node)
      if (outside) setOpen(false)
    }
    addEventListener("pointerdown", close)
    addEventListener("keydown", close)
    return () => {
      removeEventListener("pointerdown", close)
      removeEventListener("keydown", close)
    }
  }, [open])

  return (
    <motion.div
      ref={ref}
      {...enter(0.1)}
      className="relative z-30 ml-auto shrink-0"
    >
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-controls="experience"
        aria-label="Experience"
        className={cn(
          "group bg-card/50 hover:bg-card inline-flex h-8 items-center gap-2 rounded-full pr-2.5 pl-1 text-[12.5px] transition-colors duration-150",
          FOCUS_RING
        )}
      >
        <span aria-hidden className="flex">
          {experience.map((entry, i) => (
            <Logo
              key={entry.place + entry.title}
              entry={entry}
              className={cn(
                "ring-background size-6 ring-2 transition-[margin] duration-300 ease-out",
                i > 0 && "-ml-2 group-hover:-ml-0.5"
              )}
            />
          ))}
        </span>
        <span
          aria-hidden
          className="text-muted-foreground group-hover:text-foreground hidden transition-colors duration-150 sm:inline"
        >
          Experience
        </span>
        <ChevronDown
          aria-hidden
          className={cn(
            "text-muted-foreground size-3.5 transition-transform duration-300 ease-out",
            open && "rotate-180"
          )}
        />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            id="experience"
            initial={{ opacity: 0, y: -6, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{
              opacity: 0,
              y: -4,
              scale: 0.98,
              transition: { duration: 0.12 },
            }}
            transition={SPRING_PANEL}
            className="bg-popover absolute top-full right-0 mt-2 w-72 origin-top-right rounded-2xl p-1.5 shadow-2xl"
          >
            <ul>
              {experience.map((entry) => (
                <li
                  key={entry.place + entry.title}
                  className="flex items-center gap-3 rounded-xl px-2.5 py-2"
                >
                  <Logo entry={entry} className="size-8" />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-[13.5px] font-medium">
                      {entry.place}
                    </p>
                    <p className="text-muted-foreground truncate text-[12.5px]">
                      {entry.title}
                    </p>
                  </div>
                  <span className="text-muted-foreground shrink-0 text-[12px] tabular-nums">
                    {entry.period}
                  </span>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

/**
 * Every way to reach me as one capsule: the ask in solid ink, then the
 * shortcuts as icons — a highlight glides between them, each names itself
 * on hover, and copying the email ticks in place.
 */
function Actions() {
  const [hovered, setHovered] = useState<string | null>(null)
  const [copied, setCopied] = useState(false)

  const copy = () =>
    navigator.clipboard
      ?.writeText(profile.email)
      .then(() => {
        setCopied(true)
        setTimeout(() => setCopied(false), 1600)
      })
      .catch(() => {})

  const tools = [
    {
      id: "copy",
      label: copied ? "Copied" : "Copy email",
      icon: (
        <ActionSwapIcon value={copied ? "copied" : "copy"} className="size-4">
          {copied ? <Check className="size-4" /> : <Copy className="size-4" />}
        </ActionSwapIcon>
      ),
    },
    {
      id: "github",
      label: "GitHub",
      href: profile.github,
      icon: (
        <svg viewBox="0 0 24 24" className="size-4">
          <path d={githubIcon} fill="currentColor" />
        </svg>
      ),
    },
    {
      id: "resume",
      label: "Résumé",
      href: profile.resume,
      icon: <FileText className="size-4" />,
    },
  ]

  return (
    <div
      onMouseLeave={() => setHovered(null)}
      className="bg-card/50 inline-flex items-center gap-0.5 rounded-full p-1"
    >
      <a
        href="#contact"
        onClick={(e) => {
          e.preventDefault()
          scrollToId("contact")
        }}
        className={cn(
          "group bg-foreground text-background hover:bg-foreground/85 mr-0.5 inline-flex h-9 items-center gap-1.5 rounded-full pr-3.5 pl-4 text-[13px] font-medium transition-[background-color,scale] duration-150 active:scale-[0.97]",
          FOCUS_RING
        )}
      >
        Get in touch
        <ArrowRight
          aria-hidden
          className="size-3.5 transition-transform duration-200 ease-out group-hover:translate-x-0.5"
        />
      </a>

      {tools.map(({ id, label, href, icon }) => {
        const props = {
          "aria-label": label,
          onMouseEnter: () => setHovered(id),
          onFocus: () => setHovered(id),
          onBlur: () => setHovered(null),
          className: cn(
            "group text-muted-foreground hover:text-foreground relative grid size-9 place-items-center rounded-full transition-[color,scale] duration-150 active:scale-90",
            FOCUS_RING
          ),
        }
        const inner = (
          <>
            {hovered === id && (
              <motion.span
                layoutId="hero-action"
                transition={SPRING_LAYOUT}
                className="bg-card absolute inset-0 rounded-full"
              />
            )}
            <span className="relative">{icon}</span>
            <span
              aria-hidden
              className="bg-popover text-foreground pointer-events-none absolute bottom-full left-1/2 mb-2 -translate-x-1/2 translate-y-1 rounded-lg px-2 py-1 text-[11.5px] whitespace-nowrap opacity-0 shadow-lg transition duration-150 ease-out group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100 pointer-coarse:hidden"
            >
              {label}
            </span>
          </>
        )
        return href ? (
          <a key={id} href={href} target="_blank" rel="noreferrer" {...props}>
            {inner}
          </a>
        ) : (
          <button key={id} type="button" onClick={copy} {...props}>
            {inner}
          </button>
        )
      })}
      <span className="sr-only" aria-live="polite">
        {copied ? "Email address copied" : ""}
      </span>
    </div>
  )
}

/**
 * The cycling end of the headline: a pastel pill whose word slides out the
 * top as the next slides in from below, its width springing to fit and its
 * colour easing to the next tone. Holds still under reduced motion.
 */
function Platform({ delay }: { delay: number }) {
  const reduce = useReducedMotion()
  const [index, setIndex] = useState(0)

  useEffect(() => {
    if (reduce) return
    const id = setInterval(
      () => setIndex((i) => (i + 1) % platforms.length),
      2400
    )
    return () => clearInterval(id)
  }, [reduce])

  const { word, icon: Icon, tone } = platforms[index]

  return (
    <motion.span
      aria-hidden
      layout
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        layout: SPRING_LAYOUT,
        default: { ...SPRING_PRESS, delay },
      }}
      style={{ borderRadius: 999 }}
      className={cn(
        "pastel relative inline-block overflow-hidden bg-(--pastel-bg) px-[0.3em] whitespace-nowrap text-(--pastel-ink) ring-1 ring-(--pastel-edge) transition-colors duration-500 ring-inset",
        `tone-${tone}`
      )}
    >
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={word}
          layout="position"
          initial={{ opacity: 0, y: "80%", filter: "blur(6px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          exit={{ opacity: 0, y: "-80%", filter: "blur(6px)" }}
          transition={{ duration: 0.35, ease: EASE_OUT }}
          className="inline-block"
        >
          <Icon
            strokeWidth={2.25}
            className="mr-[0.15em] inline size-[0.62em] align-[0.02em]"
          />
          {word}
        </motion.span>
      </AnimatePresence>
    </motion.span>
  )
}

/** An app in the sentence: its icon and name, and on hover or focus a glance at it. */
function AppChip({ project }: { project: Project }) {
  const [open, setOpen] = useState(false)
  const dark = useIsDark()
  const shot = project.shots?.[0]
  const external = !project.caseStudy
  const handlers = {
    onMouseEnter: () => setOpen(true),
    onMouseLeave: () => setOpen(false),
    onFocus: () => setOpen(true),
    onBlur: () => setOpen(false),
  }
  const className = cn(
    "bg-card/50 text-foreground hover:bg-card relative inline-flex items-center gap-1.5 rounded-full py-0.5 pr-2.5 pl-0.5 align-middle text-[15px] font-medium transition-colors duration-150",
    FOCUS_RING
  )

  const body = (
    <>
      {project.logo && (
        <img
          src={project.logo}
          alt=""
          className="size-6 rounded-full bg-white object-contain"
        />
      )}
      {project.title}
      <AnimatePresence>
        {open && shot && (
          // the app's own screenshot, tipped out of the chip on its card's colour
          <motion.span
            aria-hidden
            initial={{ opacity: 0, y: 10, scale: 0.85, rotate: -7 }}
            animate={{ opacity: 1, y: 0, scale: 1, rotate: -3 }}
            exit={{
              opacity: 0,
              y: 6,
              scale: 0.92,
              transition: { duration: 0.12 },
            }}
            transition={SPRING_PANEL}
            className={cn(
              "pastel pointer-events-none absolute bottom-full left-1/2 z-30 mb-3 block origin-bottom -translate-x-1/2 rounded-2xl bg-(--pastel-bg) p-1.5 shadow-2xl ring-1 ring-(--pastel-edge) ring-inset pointer-coarse:hidden",
              `tone-${project.tone ?? "peach"}`,
              project.kind === "mobile" ? "w-28" : "w-64"
            )}
          >
            <img
              src={dark ? shot.dark : (shot.light ?? shot.dark)}
              alt=""
              className="block w-full rounded-xl"
            />
          </motion.span>
        )}
      </AnimatePresence>
    </>
  )

  return external ? (
    <a
      href={project.liveUrl ?? project.repoUrl}
      target="_blank"
      rel="noreferrer"
      className={className}
      {...handlers}
    >
      {body}
    </a>
  ) : (
    <Link
      to={`/blog/${project.caseStudy}`}
      viewTransition
      className={className}
      {...handlers}
    >
      {body}
    </Link>
  )
}

const DIGITS = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
// heavy enough to read as a mechanical counter, with a small settle at the end
const SPRING_ROLL = {
  type: "spring",
  stiffness: 90,
  damping: 16,
  mass: 1,
} as const

type StatItem = {
  value: number
  label: string
  prefix?: string
  suffix?: string
  /** the lead number: full width, set large */
  feature?: boolean
  /** marks the label with GitHub's logo */
  github?: boolean
  /** the number is fetched, not written down — gets a pulsing dot */
  live?: boolean
  /** a "#section" on this page, or a site elsewhere */
  href?: string
}

/**
 * The numbers as one readout, in one ink: the live star count leads, full
 * width and large, with the other two side by side beneath it. Labels sit
 * above their numbers, which roll up like odometers as the hero settles; a
 * highlight glides to whichever one you point at.
 */
function Stats({
  items,
  preview,
}: {
  items: StatItem[]
  /** shown in a card beneath the panel while the lead number is hovered or focused */
  preview?: ReactNode
}) {
  const [open, setOpen] = useState(false)
  // the preview mounts once the pointer comes near, then stays — so an embed
  // in it loads once, ahead of the hover, instead of on every page view
  const [armed, setArmed] = useState(false)
  const show = {
    onMouseEnter: () => setOpen(true),
    onMouseLeave: () => setOpen(false),
    onFocus: () => {
      setArmed(true)
      setOpen(true)
    },
    onBlur: () => setOpen(false),
  }

  return (
    <div className="relative" onPointerEnter={() => setArmed(true)}>
      <SharedLayoutBg
        as="ul"
        inset={0}
        pillClassName="rounded-xl bg-card"
        className="bg-card/50 grid grid-cols-2 rounded-2xl p-1"
      >
        {items.map((item, i) => (
          <li
            key={item.label}
            className={cn(item.feature && "col-span-2")}
            {...(item.feature && preview ? show : {})}
          >
            <StatCell item={item} delay={0.9 + i * 0.15} />
          </li>
        ))}
      </SharedLayoutBg>

      {preview && armed && (
        <motion.div
          aria-hidden
          initial={{ opacity: 0, y: -6, scale: 0.97 }}
          animate={
            open
              ? { opacity: 1, y: 0, scale: 1 }
              : { opacity: 0, y: -6, scale: 0.97 }
          }
          transition={SPRING_PANEL}
          className="bg-popover pointer-events-none absolute top-full right-0 mt-2 w-[min(32rem,calc(100vw-2.5rem))] origin-top-right rounded-2xl p-4 shadow-2xl pointer-coarse:hidden"
        >
          {preview}
        </motion.div>
      )}
    </div>
  )
}

function StatCell({ item, delay }: { item: StatItem; delay: number }) {
  const { value, label, prefix, suffix, feature, github, live, href } = item

  const body = (
    <>
      <span
        aria-hidden
        className="text-muted-foreground flex items-center gap-1.5 text-[12px] leading-none"
      >
        {github && (
          <svg viewBox="0 0 24 24" className="size-3 shrink-0">
            <path d={githubIcon} fill="currentColor" />
          </svg>
        )}
        <span className="truncate">{label}</span>
        {live && (
          <span
            title="Live from GitHub"
            className="relative ml-auto flex size-1.5 shrink-0"
          >
            <span className="bg-foreground/60 absolute inset-0 rounded-full motion-safe:animate-ping" />
            <span className="bg-foreground/60 relative size-1.5 rounded-full" />
          </span>
        )}
      </span>
      <span
        aria-hidden
        className={cn(
          "flex items-center leading-none font-semibold tabular-nums",
          feature
            ? "mt-3.5 text-[2.75rem] tracking-[-0.055em]"
            : "mt-2.5 text-[1.5rem] tracking-[-0.045em]"
        )}
      >
        {prefix && (
          <span className="text-muted-foreground mr-px text-[0.65em]">
            {prefix}
          </span>
        )}
        <Odometer value={value.toLocaleString("en")} delay={delay} />
        {suffix && (
          <span className="text-muted-foreground ml-px text-[0.65em]">
            {suffix}
          </span>
        )}
      </span>
      <span className="sr-only">
        {prefix}
        {value.toLocaleString("en")}
        {suffix} {label}
      </span>
      {href && (
        <ArrowUpRight
          aria-hidden
          className="text-muted-foreground absolute right-3 bottom-3 size-3.5 translate-y-1 opacity-0 transition duration-300 ease-out group-hover:translate-y-0 group-hover:opacity-100"
        />
      )}
    </>
  )

  const className = cn(
    "group relative block rounded-xl",
    feature ? "px-3.5 pt-3.5 pb-3" : "px-3.5 py-3",
    href &&
      cn("transition-[scale] duration-150 active:scale-[0.98]", FOCUS_RING)
  )

  if (!href) return <div className={className}>{body}</div>
  const local = href.startsWith("#")
  return (
    <a
      href={href}
      target={local ? undefined : "_blank"}
      rel={local ? undefined : "noreferrer"}
      onClick={
        local
          ? (e) => {
              e.preventDefault()
              scrollToId(href.slice(1))
            }
          : undefined
      }
      className={className}
    >
      {body}
    </a>
  )
}

/**
 * Digits that roll to `value` like an odometer: each is a 0–9 reel in a
 * one-digit window, the ones place first. Reels are keyed by place, so a new
 * value rolls the reels already there; commas sit still. Reduced motion
 * (MotionConfig) lands them without the roll.
 */
function Odometer({ value, delay }: { value: string; delay: number }) {
  const chars = value.split("")
  return (
    <span className="inline-flex">
      {chars.map((char, i) => {
        const place = chars.length - 1 - i
        if (!/\d/.test(char)) return <span key={`sep-${place}`}>{char}</span>
        return (
          // clipped top and bottom only: the tight tracking makes each window
          // narrower than its glyph, so clipping the sides would shave them.
          // A little taller than the type, so ascenders aren't cut either
          <span
            key={place}
            className="inline-block h-[1.2em] overflow-x-visible overflow-y-clip"
          >
            <motion.span
              initial={{ y: "0%" }}
              animate={{ y: `${-Number(char) * 10}%` }}
              transition={{ ...SPRING_ROLL, delay: delay + place * 0.1 }}
              className="flex flex-col"
            >
              {DIGITS.map((d) => (
                <span key={d} className="h-[1.2em] leading-[1.2em]">
                  {d}
                </span>
              ))}
            </motion.span>
          </span>
        )
      })}
    </span>
  )
}
