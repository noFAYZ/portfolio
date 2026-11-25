import { useState } from "react"
import { createPortal } from "react-dom"
import { AnimatePresence, motion, useSpring } from "motion/react"
import { ChevronDown } from "lucide-react"
import { SharedLayoutBg } from "@/components/motion/shared-layout-bg"
import { ProjectCard } from "@/components/project-card"
import { Section } from "@/components/section"
import { projects, showcase, type Project } from "@/lib/data"
import { EASE_OUT, SPRING_GLIDE, SPRING_LAYOUT } from "@/lib/ease"
import { FOCUS_RING, FOCUS_RING_INSET } from "@/lib/ui"
import { cn } from "@/lib/utils"

const byDate = (a: Project, b: Project) => b.date.localeCompare(a.date)
const archive = projects.filter((p) => !showcase.includes(p)).sort(byDate)

const year = (p: Project) => p.date.slice(0, 4)

export function Work() {
  return (
    <Section
      id="work"
      title="Selected *work*"
      link={{ label: "All projects", to: "/projects" }}
      wide
    >
      <div className="grid gap-3 sm:grid-cols-2">
        {showcase.map((project) => (
          <ProjectCard key={project.title} project={project} />
        ))}
      </div>
      <div className="mt-3">
        <Archive />
      </div>
    </Section>
  )
}

const PREVIEW_W = 288
const PREVIEW_H = 180

// a small deck of thumbnails that fans out when you hover the toggle
const fan = [
  "-rotate-6 group-hover:-translate-x-2 group-hover:-rotate-12",
  "group-hover:-translate-y-1",
  "rotate-6 group-hover:translate-x-2 group-hover:rotate-12",
]

/**
 * Older work, folded away. Opened, each row glides a highlight under the
 * cursor while a preview card trails it, its screenshots running like a film
 * reel to whichever row you're on.
 *
 * Height animates for real rather than via layout transforms: this sits
 * mid-page, and a projected height would leave every section below jumping
 * ahead of the list as it grows.
 */
function Archive() {
  const [open, setOpen] = useState(false)
  const [hovered, setHovered] = useState({ index: 0, on: false })
  // mount the reel (and fetch its images) only once a mouse actually hovers
  const [armed, setArmed] = useState(false)
  const x = useSpring(0, SPRING_GLIDE)
  const y = useSpring(0, SPRING_GLIDE)

  // beside the cursor, flipping to its left near the right edge
  const place = (e: React.PointerEvent) => {
    const flip = e.clientX + 24 + PREVIEW_W > window.innerWidth
    return {
      x: flip ? e.clientX - 24 - PREVIEW_W : e.clientX + 24,
      y: e.clientY - PREVIEW_H / 2,
    }
  }

  return (
    <div>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-controls="archive"
        className={cn(
          "group bg-card/50 hover:bg-card flex w-full items-center gap-4 rounded-2xl py-3.5 pr-5 pl-4 text-left transition-colors duration-200",
          FOCUS_RING
        )}
      >
        <span aria-hidden className="flex shrink-0">
          {archive.slice(0, 3).map((project, i) => (
            <img
              key={project.title}
              src={project.image}
              alt=""
              loading="lazy"
              className={cn(
                "h-8 w-12 rounded-md object-cover object-top shadow-md transition-transform duration-300 ease-out",
                i > 0 && "-ml-6",
                fan[i]
              )}
            />
          ))}
        </span>
        <span className="text-[14px] font-medium">
          {open ? "Show less" : `${archive.length} more projects`}
        </span>
        <span className="text-muted-foreground hidden text-[13px] sm:inline">
          {year(archive[archive.length - 1])} — {year(archive[0])}
        </span>
        <ChevronDown
          aria-hidden
          className={cn(
            "text-muted-foreground ml-auto size-4 shrink-0 transition-transform duration-300 ease-out",
            open && "rotate-180"
          )}
        />
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id="archive"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ height: SPRING_LAYOUT, opacity: { duration: 0.2 } }}
            onPointerEnter={(e) => {
              if (e.pointerType !== "mouse") return
              const p = place(e)
              x.jump(p.x)
              y.jump(p.y)
              setArmed(true)
            }}
            onPointerMove={(e) => {
              if (e.pointerType !== "mouse") return
              const p = place(e)
              x.set(p.x)
              y.set(p.y)
            }}
            className="overflow-hidden"
          >
            <SharedLayoutBg
              as="ul"
              inset={0}
              pillClassName="rounded-xl bg-card"
              onMouseLeave={() => setHovered((h) => ({ ...h, on: false }))}
              className="pt-2"
            >
              {archive.map((project, i) => {
                const href = project.liveUrl ?? project.repoUrl
                return (
                  <li
                    key={project.title}
                    onMouseEnter={() => setHovered({ index: i, on: true })}
                  >
                    <a
                      href={href}
                      target="_blank"
                      rel="noreferrer"
                      className={cn(
                        "flex items-baseline gap-4 rounded-xl px-5 py-2.5 text-[14px]",
                        href ? FOCUS_RING_INSET : "cursor-default"
                      )}
                    >
                      <span className="min-w-0 shrink-0 truncate font-medium">
                        {project.title}
                      </span>
                      <span className="text-muted-foreground hidden min-w-0 truncate sm:block">
                        {project.description}
                      </span>
                      <span className="text-muted-foreground ml-auto shrink-0 text-[13px] tabular-nums">
                        {year(project)}
                      </span>
                    </a>
                  </li>
                )
              })}
            </SharedLayoutBg>
          </motion.div>
        )}
      </AnimatePresence>

      {/*
       * Portalled: the section's scroll reveal leaves `filter: blur(0px)` on an
       * ancestor, and any filter turns that ancestor into the containing block
       * for fixed children — the card would track the section, not the viewport.
       */}
      {armed &&
        createPortal(
          <motion.div
            aria-hidden
            style={{ x, y, width: PREVIEW_W, height: PREVIEW_H }}
            initial={{ opacity: 0, scale: 0.85 }}
            animate={
              open && hovered.on
                ? { opacity: 1, scale: 1 }
                : { opacity: 0, scale: 0.85 }
            }
            transition={{ duration: 0.22, ease: EASE_OUT }}
            className="bg-popover pointer-events-none fixed top-0 left-0 z-30 overflow-hidden rounded-xl shadow-2xl"
          >
            <motion.div
              initial={false}
              animate={{ y: -hovered.index * PREVIEW_H }}
              transition={SPRING_LAYOUT}
            >
              {archive.map((project) => (
                <img
                  key={project.title}
                  src={project.image}
                  alt=""
                  decoding="async"
                  style={{ height: PREVIEW_H }}
                  className="w-full object-cover object-top"
                />
              ))}
            </motion.div>
          </motion.div>,
          document.body
        )}
    </div>
  )
}
