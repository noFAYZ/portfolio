import { useEffect, useState } from "react"
import { createPortal } from "react-dom"
import { AnimatePresence, motion, useSpring } from "motion/react"
import { ArrowRight, ArrowUpRight, ChevronDown, Star } from "lucide-react"
import { Link } from "react-router"
import { SharedLayoutBg } from "@/components/motion/shared-layout-bg"
import { Section } from "@/components/section"
import { projects, type Project } from "@/lib/data"
import { EASE_OUT, SPRING_GLIDE, SPRING_LAYOUT } from "@/lib/ease"
import { FOCUS_RING, FOCUS_RING_INSET } from "@/lib/ui"
import { cn } from "@/lib/utils"

const byDate = (a: Project, b: Project) => b.date.localeCompare(a.date)
const featured = projects.filter((p) => p.featured).sort(byDate)
const archive = projects.filter((p) => !p.featured).sort(byDate)

const year = (p: Project) => p.date.slice(0, 4)
const compact = new Intl.NumberFormat("en", { notation: "compact" })

const chip =
  "inline-flex h-7 items-center gap-1 rounded-full bg-(--panel) px-3 text-[12px] font-medium text-(--pastel-ink) shadow-sm transition-colors duration-150 hover:bg-(--pastel-bg)"

const STARS_KEY = "gh-stars:"
const STARS_TTL = 6 * 60 * 60 * 1000

/** The last count we saw for a repo, and when; null if none or storage is blocked. */
function cachedStars(repo: string): { n: number; at: number } | null {
  try {
    const hit = JSON.parse(localStorage.getItem(STARS_KEY + repo) ?? "null")
    return typeof hit?.n === "number" ? hit : null
  } catch {
    return null
  }
}

/*
 * GitHub's unauthenticated API allows 60 calls an hour per IP, and every
 * reload spent one per repo — so a busy afternoon (or a dev server's hot
 * reloads) hit the limit, got a 403 and the badge silently vanished. Now a
 * count is cached for six hours and shown at once, and when there is nothing
 * cached and GitHub says no, the snapshot in data.ts stands in.
 */
function useStars(repoUrl?: string, fallback?: number) {
  const repo = repoUrl?.match(/github\.com\/([^/]+\/[^/?#]+)/)?.[1]
  const [stars, setStars] = useState<number | null>(
    () => (repo ? cachedStars(repo)?.n : undefined) ?? fallback ?? null
  )

  useEffect(() => {
    if (!repo) return
    const hit = cachedStars(repo)
    if (hit && Date.now() - hit.at < STARS_TTL) return
    let active = true
    fetch(`https://api.github.com/repos/${repo}`)
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        if (typeof data?.stargazers_count !== "number") return
        try {
          localStorage.setItem(
            STARS_KEY + repo,
            JSON.stringify({ n: data.stargazers_count, at: Date.now() })
          )
        } catch {
          // private mode — this visit still shows the live count
        }
        if (active) setStars(data.stargazers_count)
      })
      .catch(() => {})
    return () => {
      active = false
    }
  }, [repo])

  return stars
}

export function Work() {
  return (
    <Section id="work" title="Work">
      {/*
       * The flagship as a wide card, the other two side by side beneath it.
       * Each panel takes the shape that crops its screenshot well: a 3:1 band
       * across the top of Zuno's app, 16:9 (near the screenshots' own shape)
       * for the pair. One column of natural-height cards on phones.
       */}
      <div className="grid gap-3 sm:grid-cols-2 md:-mx-10 lg:-mx-20">
        {featured.map((project, i) => (
          <ProjectCard key={project.title} project={project} wide={i === 0} />
        ))}
      </div>
      <div className="mt-3 md:-mx-10 lg:-mx-20">
        <Archive />
      </div>
    </Section>
  )
}

function ProjectCard({ project, wide }: { project: Project; wide: boolean }) {
  const stars = useStars(project.repoUrl, project.stars)
  // only the card that was clicked carries the morph name into the transition
  const [morph, setMorph] = useState(false)
  const caseStudy = project.caseStudy
  const href = project.liveUrl ?? project.repoUrl
  const Arrow = caseStudy ? ArrowRight : ArrowUpRight
  // the card itself opens the primary link; these are the other ways in —
  // and once the star badge links to the repo, it is the way in to the source
  const live = caseStudy ? project.liveUrl : undefined
  const source =
    project.repoUrl !== href && stars === null ? project.repoUrl : undefined

  const cover = cn("absolute inset-0 z-10 rounded-2xl", FOCUS_RING)

  return (
    <article
      className={cn(
        "pastel group relative flex flex-col rounded-2xl bg-(--pastel-bg) p-2 ring-1 ring-(--pastel-edge) ring-inset",
        `tone-${project.tone ?? "peach"}`,
        wide && "sm:col-span-2"
      )}
    >
      {/* the app on a thin white mat */}
      <div
        className={cn(
          "relative aspect-[16/11] overflow-hidden rounded-xl bg-(--panel) p-1.5 ring-1 ring-(--panel-edge) ring-inset",
          wide ? "sm:aspect-[3/1]" : "sm:aspect-[16/9]"
        )}
      >
        <img
          src={project.image}
          alt=""
          loading={wide ? "eager" : "lazy"}
          decoding="async"
          style={
            morph
              ? ({
                  viewTransitionName: `cover-${caseStudy}`,
                  viewTransitionClass: "cover",
                } as React.CSSProperties)
              : undefined
          }
          className="block size-full rounded-lg object-cover object-top ring-1 ring-(--panel-edge) transition-transform duration-500 ease-out group-hover:scale-[1.015]"
        />
        {(live || source) && (
          // above the card-wide link; shown on hover or focus, always on touch
          <span className="absolute right-3 bottom-3 z-20 flex gap-1.5 opacity-0 transition-opacity duration-200 group-focus-within:opacity-100 group-hover:opacity-100 pointer-coarse:opacity-100">
            {live && (
              <a
                href={live}
                target="_blank"
                rel="noreferrer"
                className={cn(chip, FOCUS_RING)}
              >
                Live
                <ArrowUpRight aria-hidden className="size-3" />
              </a>
            )}
            {source && (
              <a
                href={source}
                target="_blank"
                rel="noreferrer"
                className={cn(chip, FOCUS_RING)}
              >
                Source
                <ArrowUpRight aria-hidden className="size-3" />
              </a>
            )}
          </span>
        )}
      </div>

      <div className="px-3 pt-3.5 pb-2.5">
        <div className="flex items-center gap-2">
          <h3 className="truncate text-[15px] font-semibold text-(--pastel-ink)">
            {project.title}
          </h3>
          {stars !== null && project.repoUrl && (
            // above the card-wide link, so it opens the repo rather than the card
            <a
              href={project.repoUrl}
              target="_blank"
              rel="noreferrer"
              aria-label={`${compact.format(stars)} stars on GitHub`}
              className={cn(
                "hover:bg-star/20 relative z-20 inline-flex h-6 shrink-0 items-center gap-1 rounded-full bg-(--panel) px-2 text-[12px] font-medium text-(--pastel-ink) tabular-nums shadow-sm transition-colors duration-150",
                FOCUS_RING
              )}
            >
              <Star aria-hidden className="fill-star text-star size-3.5" />
              {compact.format(stars)}
            </a>
          )}
          <span className="ml-auto flex shrink-0 items-center gap-1 text-[13px] text-(--pastel-soft) tabular-nums">
            {year(project)}
            <Arrow
              aria-hidden
              className="size-3.5 -translate-x-1 opacity-0 transition duration-300 ease-out group-hover:translate-x-0 group-hover:opacity-100"
            />
          </span>
        </div>
        <p className="mt-1 truncate text-[13.5px] leading-snug text-(--pastel-soft)">
          {project.description}
        </p>
      </div>

      {caseStudy ? (
        <Link
          to={`/blog/${caseStudy}`}
          viewTransition
          onClick={() => setMorph(true)}
          aria-label={`${project.title}: read the case study`}
          className={cover}
        />
      ) : (
        <a
          href={href}
          target="_blank"
          rel="noreferrer"
          aria-label={`${project.title}: visit the site`}
          className={cover}
        />
      )}
    </article>
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
