import { useEffect, useState } from "react"
import { motion } from "motion/react"
import { Moon, Sun } from "lucide-react"
import { Link, useLocation } from "react-router"
import { ActionSwapIcon } from "@/components/motion/action-swap"
import { profile, sections } from "@/lib/data"
import { SPRING_LAYOUT, SPRING_PANEL } from "@/lib/ease"
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

export function Dock({ onCommand }: { onCommand: () => void }) {
  const { pathname } = useLocation()
  const home = pathname === "/"
  // the projects page wears the dock up top; its name glides it there between pages
  const top = pathname === "/projects"
  const section = useActiveSection(home)
  const active = top ? "projects" : section
  const dark = useIsDark()

  // on the home page glide there; from anywhere else the link routes home
  const jump = (id: string) => (e: React.MouseEvent) => {
    if (!home) return
    e.preventDefault()
    scrollToId(id)
  }

  return (
    <motion.nav
      aria-label="Primary"
      initial={{ y: top ? -80 : 80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ ...SPRING_PANEL, delay: 0.6 }}
      className={cn(
        "dock bg-popover/80 fixed inset-x-0 z-40",
        top
          ? "top-[max(1rem,env(safe-area-inset-top))]"
          : "bottom-[max(1rem,env(safe-area-inset-bottom))]",
        "mx-auto flex w-fit items-center gap-0.5 rounded-full p-1 text-[13px] shadow-2xl backdrop-blur-xl backdrop-saturate-150"
      )}
    >
      {/* hidden on phones, where six items would overflow — Work and the rest still lead home */}
      <Link
        to="/"
        viewTransition
        onClick={jump("top")}
        aria-label="Home"
        className={cn("mr-0.5 hidden rounded-full sm:block", item, FOCUS_RING)}
      >
        <img
          src={profile.portrait}
          alt=""
          className="size-8 rounded-full object-cover"
        />
      </Link>

      {links.map(({ id, label, to }) => (
        <Link
          key={id}
          to={to}
          viewTransition
          onClick={id === "projects" ? undefined : jump(id)}
          aria-current={
            active === id
              ? id === "projects"
                ? "page"
                : "location"
              : undefined
          }
          className={cn(
            "relative rounded-full px-2 py-1.5 sm:px-3",
            item,
            active === id
              ? "text-foreground"
              : "text-muted-foreground hover:text-foreground",
            FOCUS_RING
          )}
        >
          {active === id && (
            <motion.span
              layoutId="dock-active"
              transition={SPRING_LAYOUT}
              className="bg-muted absolute inset-0 rounded-full"
            />
          )}
          <span className="relative">{label}</span>
        </Link>
      ))}

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
          "text-muted-foreground hover:bg-muted hover:text-foreground hidden h-9 items-center rounded-full px-3 text-[12px] sm:inline-flex",
          item,
          FOCUS_RING
        )}
      >
        <kbd className="font-sans">{mod}K</kbd>
      </button>
    </motion.nav>
  )
}
