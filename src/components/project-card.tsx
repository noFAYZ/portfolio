import { useState, type ReactNode } from "react"
import {
  motion,
  useReducedMotion,
  useSpring,
  useTransform,
  type MotionValue,
} from "motion/react"
import { ArrowUpRight, Globe, Monitor, Smartphone, Star } from "lucide-react"
import { Link } from "react-router"
import { kinds, type Project, type Shot } from "@/lib/data"
import { SPRING_MOUSE } from "@/lib/ease"
import { useStars } from "@/lib/hooks/use-stars"
import { githubIcon, techIcons } from "@/lib/tech-icons"
import { useIsDark } from "@/lib/theme"
import { FOCUS_RING } from "@/lib/ui"
import { cn } from "@/lib/utils"

const compact = new Intl.NumberFormat("en", { notation: "compact" })
const kindIcon = { desktop: Monitor, mobile: Smartphone, web: Globe }

/** A showcase project (one with `shots`) — on the home page and /projects. */
export function ProjectCard({ project }: { project: Project }) {
  const stars = useStars(project.repoUrl, project.stars)
  // only the clicked card carries the morph name into the case study's cover
  const [morph, setMorph] = useState(false)
  const { caseStudy } = project
  const live = caseStudy ? project.liveUrl : undefined
  const cover = cn("absolute inset-0 z-10 rounded-[28px]", FOCUS_RING)
  const KindIcon = project.kind && kindIcon[project.kind]

  return (
    <article
      className={cn(
        "pastel group relative mt-7 rounded-[28px] bg-(--pastel-bg) p-2 ring-1 ring-(--pastel-edge) ring-inset",
        `tone-${project.tone ?? "peach"}`
      )}
    >
      {KindIcon && (
        /*
         * A tab grown out of the top edge: concave fillets join it to the rim,
         * the rim's edge runs up its sides, and it rises a little on hover.
         * It overlaps the rim by a pixel to hide the edge line beneath it.
         */
        <div className="absolute bottom-full left-1/2 flex -translate-x-1/2 translate-y-px items-end">
          <Fillet />
          <span className="relative flex h-7 items-center gap-1.5 rounded-t-[12px] bg-(--pastel-bg) px-3 text-[12px] font-medium text-(--pastel-ink) transition-[height] duration-300 ease-out group-hover:h-8">
            <span
              aria-hidden
              className="absolute inset-x-0 top-0 bottom-[13px] rounded-t-[12px] border border-b-0 border-(--pastel-edge)"
            />
            <KindIcon aria-hidden className="size-3.5" />
            {kinds[project.kind!]} app
          </span>
          <Fillet className="-scale-x-100" />
        </div>
      )}

      <Stage
        project={project}
        morph={morph ? `cover-${caseStudy}` : undefined}
      />

      <div className="flex items-center gap-3 px-3 pt-4 pb-2.5">
        {project.logo && (
          <img
            src={project.logo}
            alt=""
            className="size-10 shrink-0 rounded-[12px] bg-white object-contain shadow-sm ring-1 ring-(--pastel-edge) transition-transform duration-300 ease-out group-hover:-rotate-6"
          />
        )}
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <h2 className="truncate text-[17px] font-semibold tracking-[-0.02em] text-(--pastel-ink)">
              {project.title}
            </h2>
            {!!stars && (
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
            <span className="text-[13px] text-(--pastel-soft) tabular-nums">
              {project.date.slice(0, 4)}
            </span>
          </div>
          <p className="mt-0.5 truncate text-[13.5px] text-(--pastel-soft)">
            {project.description}
          </p>
        </div>

        {live && (
          <a
            href={live}
            target="_blank"
            rel="noreferrer"
            className={cn(
              "relative z-20 inline-flex h-8 shrink-0 items-center gap-1 rounded-full bg-(--panel) px-3 text-[12px] font-medium text-(--pastel-ink) opacity-0 shadow-sm transition-opacity duration-200 group-focus-within:opacity-100 group-hover:opacity-100 pointer-coarse:opacity-100",
              FOCUS_RING
            )}
          >
            Live
            <ArrowUpRight aria-hidden className="size-3" />
          </a>
        )}
        {/* the card's own way in: fills with ink on hover */}
        <span
          aria-hidden
          className="grid size-10 shrink-0 place-items-center rounded-full bg-(--panel) text-(--pastel-ink) shadow-sm transition-colors duration-300 group-hover:bg-(--pastel-ink) group-hover:text-(--panel)"
        >
          <ArrowUpRight
            className={cn(
              "size-4 transition-transform duration-300 ease-out",
              // a case study opens here (the arrow turns inward); the rest leave the site
              caseStudy
                ? "group-hover:rotate-45"
                : "group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            )}
          />
        </span>
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
          href={project.liveUrl ?? project.repoUrl}
          target="_blank"
          rel="noreferrer"
          aria-label={`${project.title}: visit the ${project.liveUrl ? "site" : "source"}`}
          className={cover}
        />
      )}
    </article>
  )
}

/**
 * The app on its panel, laid out for what it runs on: windows bleeding off
 * the right and bottom edges, or phones fanned from the bottom. Everything
 * drifts with the cursor, the nearer layer further, while a tint follows the
 * pointer across the panel.
 */
function Stage({ project, morph }: { project: Project; morph?: string }) {
  const dark = useIsDark()
  const reduce = useReducedMotion()
  const mx = useSpring(0, SPRING_MOUSE)
  const my = useSpring(0, SPRING_MOUSE)
  const [main, second, third] = project.shots!

  // the front screenshot can morph into the case study's cover
  const front = (className: string) => (
    <img
      src={dark ? main.dark : (main.light ?? main.dark)}
      alt=""
      decoding="async"
      style={
        morph
          ? ({
              viewTransitionName: morph,
              viewTransitionClass: "cover",
            } as React.CSSProperties)
          : undefined
      }
      className={cn(shot, className)}
    />
  )
  const img = (s: Shot, className: string) => (
    <img
      src={dark ? s.dark : (s.light ?? s.dark)}
      alt=""
      loading="lazy"
      decoding="async"
      className={cn(shot, className)}
    />
  )

  return (
    <div
      onPointerMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect()
        const x = e.clientX - r.left
        const y = e.clientY - r.top
        e.currentTarget.style.setProperty("--mx", `${x}px`)
        e.currentTarget.style.setProperty("--my", `${y}px`)
        if (reduce || e.pointerType !== "mouse") return
        mx.set(x / r.width - 0.5)
        my.set(y / r.height - 0.5)
      }}
      onPointerLeave={() => {
        mx.set(0)
        my.set(0)
      }}
      className="relative aspect-[5/4] overflow-hidden rounded-[20px] bg-(--panel) ring-1 ring-(--panel-edge) ring-inset"
    >
      {/* dot grid, fading out downwards */}
      <div
        aria-hidden
        className="absolute inset-0 bg-[radial-gradient(var(--panel-edge)_1.2px,transparent_1.2px)] [mask-image:linear-gradient(to_bottom,black,transparent_70%)] bg-size-[14px_14px]"
      />
      {/* the pointer's tint */}
      <div
        aria-hidden
        className="absolute inset-0 bg-[radial-gradient(360px_circle_at_var(--mx,50%)_var(--my,0%),var(--pastel-bg),transparent_70%)] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
      />

      {/* the stack, as an overlapping row of marks that fans apart on hover */}
      <div className="absolute top-4 left-4 z-20 flex">
        {project.tags.map((tag) => (
          <span
            key={tag}
            title={tag}
            className={cn(
              "-ml-1.5 grid h-7 min-w-7 place-items-center rounded-full bg-(--pastel-bg) text-(--pastel-ink) ring-2 ring-(--panel) transition-[margin] duration-300 ease-out group-hover:ml-1 first:ml-0 group-hover:first:ml-0",
              !techIcons[tag] && "px-2.5 text-[11.5px] font-medium"
            )}
          >
            {techIcons[tag] ? (
              <svg
                role="img"
                aria-label={tag}
                viewBox="0 0 24 24"
                className="size-3.5 fill-current"
              >
                <path d={techIcons[tag]} />
              </svg>
            ) : (
              tag
            )}
          </span>
        ))}
      </div>

      {project.license && project.repoUrl && (
        // above the card-wide link: it opens the source
        <a
          href={project.repoUrl}
          target="_blank"
          rel="noreferrer"
          title={`${project.license} license`}
          className={cn(
            "absolute top-4 right-4 z-20 inline-flex h-7 items-center gap-1.5 rounded-full bg-(--pastel-bg) px-2.5 text-[11.5px] font-medium text-(--pastel-ink) transition-colors duration-150 hover:bg-(--pastel-edge)",
            FOCUS_RING
          )}
        >
          <svg
            aria-hidden
            viewBox="0 0 24 24"
            className="size-3.5 fill-current"
          >
            <path d={githubIcon} />
          </svg>
          Open source
        </a>
      )}

      {project.kind === "mobile" ? (
        <>
          {/* the side phones fan out on hover; the front one rises */}
          {second && (
            <Layer
              mx={mx}
              my={my}
              depth={8}
              className="top-[31%] left-[10%] w-[27%]"
            >
              {img(
                second,
                "rounded-[16px] -rotate-6 transition-transform duration-500 ease-out group-hover:-translate-x-3 group-hover:-rotate-[10deg]"
              )}
            </Layer>
          )}
          {third && (
            <Layer
              mx={mx}
              my={my}
              depth={8}
              className="top-[31%] right-[10%] w-[27%]"
            >
              {img(
                third,
                "rounded-[16px] rotate-6 transition-transform duration-500 ease-out group-hover:translate-x-3 group-hover:rotate-[10deg]"
              )}
            </Layer>
          )}
          <Layer
            mx={mx}
            my={my}
            depth={20}
            className="top-[20%] left-[34%] w-[32%]"
          >
            {front(
              "rounded-[18px] transition-transform duration-500 ease-out group-hover:-translate-y-2.5"
            )}
          </Layer>
        </>
      ) : (
        <>
          {second && (
            <Layer
              mx={mx}
              my={my}
              depth={6}
              className="top-[15%] left-[24%] w-[100%]"
            >
              {img(
                second,
                "rounded-lg opacity-90 transition-transform duration-500 ease-out group-hover:translate-x-2 group-hover:-translate-y-2.5"
              )}
            </Layer>
          )}
          <Layer
            mx={mx}
            my={my}
            depth={12}
            className="top-[27%] left-[7%] w-[116%]"
          >
            {front(
              "rounded-xl transition-transform duration-500 ease-out group-hover:-translate-y-1.5"
            )}
          </Layer>
        </>
      )}
    </div>
  )
}

const shot = "block w-full shadow-2xl ring-1 ring-(--panel-edge)"

/**
 * The concave corner joining the kind tab to the rim (the left one; mirrored
 * for the right): filled in the card's colour, its arc stroked in the edge's,
 * running from the rim's edge line up into the tab's side.
 */
function Fillet({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 13 13"
      className={cn("size-[13px] shrink-0 overflow-visible", className)}
    >
      <path
        d="M0 13V12.5A13.5 13.5 0 0 0 13.5 -1V13Z"
        className="fill-(--pastel-bg)"
      />
      <path
        d="M0 12.5A13.5 13.5 0 0 0 13.5 -1"
        className="fill-none stroke-(--pastel-edge)"
      />
    </svg>
  )
}

/** A screenshot layer drifting `depth` px with the cursor. */
function Layer({
  mx,
  my,
  depth,
  className,
  children,
}: {
  mx: MotionValue<number>
  my: MotionValue<number>
  depth: number
  className: string
  children: ReactNode
}) {
  const x = useTransform(mx, (v) => v * depth)
  const y = useTransform(my, (v) => v * depth)
  return (
    <motion.div style={{ x, y }} className={cn("absolute", className)}>
      {children}
    </motion.div>
  )
}
