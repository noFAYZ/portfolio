import { useEffect, useState } from "react"
import { motion, useScroll, useTransform } from "motion/react"
import {
  AtSign,
  BriefcaseBusiness,
  LayoutGrid,
  Moon,
  PenLine,
  Sun,
  type LucideIcon,
} from "lucide-react"
import { Link, useLocation } from "react-router"
import { ActionSwapIcon } from "@/components/motion/action-swap"
import { sections } from "@/lib/data"
import { SPRING_PANEL } from "@/lib/ease"
import { toggleTheme, useIsDark } from "@/lib/theme"
import { FOCUS_RING, scrollToId } from "@/lib/ui"
import { cn } from "@/lib/utils"

const mod = /Mac|iPhone|iPad/.test(navigator.userAgent) ? "⌘" : "Ctrl "

/**
 * The section being read: the last one whose top has crossed 40% down the
 * viewport. Measured on scroll rather than by intersection, so the pill stays
 * put while you're in the gap between two sections instead of blinking out.
 */
function useActiveSection(enabled: boolean) {
  const [active, setActive] = useState<string | null>(null)

  useEffect(() => {
    if (!enabled) return
    let frame = 0
    const update = () => {
      frame = 0
      const line = innerHeight * 0.4
      let current: string | null = null
      for (const { id } of sections) {
        const top = document.getElementById(id)?.getBoundingClientRect().top
        if (top !== undefined && top <= line) current = id
      }
      // the last section is too short to ever reach the line; the page bottom counts as it
      const bottom =
        innerHeight + scrollY >= document.documentElement.scrollHeight - 4
      setActive(bottom ? sections[sections.length - 1].id : current)
    }
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }
    schedule()
    addEventListener("scroll", schedule, { passive: true })
    addEventListener("resize", schedule)
    return () => {
      cancelAnimationFrame(frame)
      removeEventListener("scroll", schedule)
      removeEventListener("resize", schedule)
    }
  }, [enabled])

  return enabled ? active : null
}

const item =
  "transition-[color,background-color,scale] duration-150 active:scale-95"

// the home sections, with the projects page slotted in after Work
const links = sections.map(({ id, label }) => ({ id, label, to: `/#${id}` }))
links.splice(1, 0, { id: "projects", label: "Projects", to: "/projects" })

const icons: Record<string, LucideIcon> = {
  work: BriefcaseBusiness,
  projects: LayoutGrid,
  writing: PenLine,
  contact: AtSign,
}

/**
 * An island at the top of every page: icons only, and the one you're on
 * unfolds to spell its name while the last folds away. The home link is a
 * monogram ringed by how far down the page you've read.
 */
export function Dock({ onCommand }: { onCommand: () => void }) {
  const { pathname } = useLocation()
  const home = pathname === "/"
  const section = useActiveSection(home)
  const active = pathname === "/projects" ? "projects" : section
  const dark = useIsDark()
  const { scrollYProgress } = useScroll()
  // hidden at the very top, so an empty ring doesn't leave a dot
  const ringOpacity = useTransform(scrollYProgress, [0, 0.02], [0, 1])

  // on the home page glide there; from anywhere else the link routes home
  const jump = (id: string) => (e: React.MouseEvent) => {
    if (!home) return
    e.preventDefault()
    scrollToId(id)
  }

  return (
    <motion.nav
      aria-label="Primary"
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ ...SPRING_PANEL, delay: 0.4 }}
      className="dock bg-popover/80 fixed inset-x-0 top-[max(0.75rem,env(safe-area-inset-top))] z-40 mx-auto flex w-fit items-center gap-0.5 rounded-full p-1 text-[13px] shadow-2xl backdrop-blur-xl backdrop-saturate-150"
    >
      <Link
        to="/"
        viewTransition
        onClick={jump("top")}
        aria-label="Home"
        className={cn(
          "relative mr-1 grid size-9 place-items-center rounded-full",
          item,
          FOCUS_RING
        )}
      >
        <svg
          aria-hidden
          viewBox="0 0 36 36"
          className="absolute inset-0 -rotate-90"
        >
          <circle
            cx="18"
            cy="18"
            r="16.5"
            strokeWidth="2"
            className="stroke-muted fill-none"
          />
          <motion.circle
            cx="18"
            cy="18"
            r="16.5"
            strokeWidth="2"
            strokeLinecap="round"
            style={{ pathLength: scrollYProgress, opacity: ringOpacity }}
            className="stroke-primary fill-none"
          />
        </svg>
        <span className="font-serif text-[15px] leading-none italic">fa</span>
      </Link>

      {links.map(({ id, label, to }) => {
        const on = active === id
        const Icon = icons[id]
        return (
          <Link
            key={id}
            to={to}
            viewTransition
            onClick={id === "projects" ? undefined : jump(id)}
            aria-current={
              on ? (id === "projects" ? "page" : "location") : undefined
            }
            className={cn(
              "group relative flex h-9 items-center rounded-full px-2.5",
              item,
              on
                ? "bg-muted text-foreground"
                : "text-muted-foreground hover:bg-muted/60 hover:text-foreground",
              FOCUS_RING
            )}
          >
            <Icon aria-hidden className="size-4 shrink-0" />
            {/* the name unfolds on the active item: a 0fr → 1fr grid column */}
            <span
              className={cn(
                "grid transition-[grid-template-columns,opacity] duration-300 ease-out",
                on ? "grid-cols-[1fr] opacity-100" : "grid-cols-[0fr] opacity-0"
              )}
            >
              <span className="overflow-hidden whitespace-nowrap">
                <span className="pl-1.5">{label}</span>
              </span>
            </span>
            {!on && (
              <span
                aria-hidden
                className="bg-popover text-foreground pointer-events-none absolute top-full left-1/2 mt-2.5 -translate-x-1/2 scale-90 rounded-lg px-2 py-1 text-[11.5px] whitespace-nowrap opacity-0 shadow-lg transition duration-150 ease-out group-hover:scale-100 group-hover:opacity-100 pointer-coarse:hidden"
              >
                {label}
              </span>
            )}
          </Link>
        )
      })}

      <span aria-hidden className="bg-muted mx-1 h-4 w-px" />

      {/* ponytail: native title tooltip — beUI's tooltip ships @floating-ui for this one hint */}
      <button
        type="button"
        title={dark ? "Light mode" : "Dark mode"}
        aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
        onClick={(e) => toggleTheme(e.clientX, e.clientY)}
        className={cn(
          "text-muted-foreground hover:bg-muted hover:text-foreground grid size-9 place-items-center rounded-full",
          item,
          FOCUS_RING
        )}
      >
        <ActionSwapIcon value={dark ? "dark" : "light"} className="size-4">
          {dark ? <Sun className="size-4" /> : <Moon className="size-4" />}
        </ActionSwapIcon>
      </button>

      <button
        type="button"
        onClick={onCommand}
        aria-label="Open command palette"
        className={cn(
          "text-muted-foreground hover:bg-muted hover:text-foreground hidden h-9 items-center rounded-full px-2.5 text-[12px] sm:inline-flex",
          item,
          FOCUS_RING
        )}
      >
        <kbd className="font-sans">{mod}K</kbd>
      </button>
    </motion.nav>
  )
}
