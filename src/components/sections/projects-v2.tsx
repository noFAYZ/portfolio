import { Icon } from "@iconify/react"
import { motion } from "motion/react"
import { useEffect, useMemo, useState } from "react"
import { Link } from "react-router"
import { Button } from "@/components/ui/button"
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip"
import { projects, type Project } from "@/lib/data"
import { fadeUp, stagger } from "@/lib/motion"

// ponytail: data still has scaffold URLs on older entries — don't render dead links
const isLive = (url?: string) =>
  !!url && !url.includes("yourusername") && !url.includes("-demo.vercel.app")

// ponytail: cycled by position — full class strings so Tailwind can see them
const stages = [
  {
    bg: "from-rose-500/25 via-orange-400/15 to-amber-300/10",
    glow: "from-rose-500/40 to-orange-400/30",
  },
  {
    bg: "from-emerald-500/25 via-teal-400/15 to-cyan-300/10",
    glow: "from-emerald-500/40 to-teal-400/30",
  },
  {
    bg: "from-violet-500/25 via-indigo-400/15 to-blue-300/10",
    glow: "from-violet-500/40 to-indigo-400/30",
  },
  {
    bg: "from-sky-500/25 via-cyan-400/15 to-blue-300/10",
    glow: "from-sky-500/40 to-cyan-400/30",
  },
]

const year = (date?: string) => {
  const y = date ? new Date(date).getFullYear() : NaN
  return Number.isNaN(y) ? null : y
}

// ponytail: unauthenticated API, 60 req/hr per IP — plenty for 4 cards, no token to leak
function useStars(repoUrl?: string) {
  const [stars, setStars] = useState<number | null>(null)

  useEffect(() => {
    const repo = repoUrl?.match(/github\.com\/([^/]+\/[^/?#]+)/)?.[1]
    if (!repo) return

    let alive = true
    fetch(`https://api.github.com/repos/${repo}`)
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        if (alive && typeof data?.stargazers_count === "number")
          setStars(data.stargazers_count)
      })
      .catch(() => {})

    return () => {
      alive = false
    }
  }, [repoUrl])

  return stars
}

export function ProjectRow({
  project,
  index,
}: {
  project: Project
  index: number
}) {
  const repoUrl = isLive(project.repoUrl) ? project.repoUrl : undefined
  const liveUrl = isLive(project.liveUrl) ? project.liveUrl : undefined
  const released = year(project.date)
  const stars = useStars(repoUrl)
  const flipped = index % 2 === 1
  const stage = stages[index % stages.length]

  return (
    <motion.article
      {...fadeUp()}
      className={`group flex flex-col gap-5 md:flex-row md:items-center md:gap-10 ${
        flipped ? "md:flex-row-reverse" : ""
      }`}
    >
      <div className="relative w-full shrink-0 md:w-1/2">
        {/* aurora glow bleeding out behind the stage */}
        <div
          aria-hidden
          className={`absolute -inset-6 -z-10 rounded-[2rem] bg-gradient-to-br opacity-50 blur-2xl transition-opacity duration-150 ease-out group-hover:opacity-90 ${stage.glow}`}
        />

        <div
          className={`ring-foreground/5 relative overflow-hidden rounded-2xl bg-gradient-to-br p-3 ring-1 ring-inset sm:p-4 ${stage.bg}`}
        >
          {project.image ? (
            <img
              src={project.image}
              alt=""
              loading="lazy"
              className="relative block aspect-1405/1014 w-full rounded-xl object-cover shadow-xl transition-[transform,box-shadow] duration-150 ease-out group-hover:-translate-y-1 group-hover:scale-[1.02] group-hover:shadow-2xl"
            />
          ) : (
            <div className="bg-background/40 text-muted-foreground grid aspect-1405/1014 w-full place-items-center rounded-xl shadow-xl backdrop-blur-sm transition-transform duration-150 ease-out group-hover:-translate-y-1 group-hover:scale-[1.02]">
              <Icon
                icon={project.icon || "lucide:folder"}
                className="h-12 w-12"
              />
            </div>
          )}
        </div>
      </div>

      <div className="md:w-1/2">
        <div className="text-muted-foreground/60 flex items-center gap-2 text-[11px] tabular-nums">
          <span>{String(index + 1).padStart(2, "0")}</span>
          <span className="border-border/60 w-6 border-b" />
          {released && <span>{released}</span>}
          {project.openSource && (
            <span className="text-muted-foreground flex items-center gap-1">
              <Icon icon="lucide:git-fork" className="h-3 w-3" />
              open source
            </span>
          )}
        </div>

        <h3 className="font-heading mt-1.5 text-lg font-semibold tracking-tight">
          {project.title}
        </h3>

        {project.description && (
          <p className="text-muted-foreground mt-2 max-w-prose text-sm leading-relaxed">
            {project.description}
          </p>
        )}

        {project.tags?.length > 0 && (
          <div className="mt-3 flex flex-wrap items-center gap-2">
            {project.tags.map((tag) => (
              <Tooltip key={tag.name}>
                <TooltipTrigger
                  render={
                    <span className="cursor-default">
                      <Icon icon={tag.icon} className="h-4 w-4" />
                    </span>
                  }
                />
                <TooltipContent>{tag.name}</TooltipContent>
              </Tooltip>
            ))}
          </div>
        )}

        <div className="mt-4 flex flex-wrap items-center gap-2">
          {liveUrl && (
            <Button
              size="sm"
              variant="outline"
              render={<a href={liveUrl} target="_blank" rel="noreferrer" />}
            >
              <Icon icon="lucide:arrow-up-right" />
              Visit
            </Button>
          )}
          {repoUrl && (
            <Button
              size="sm"
              variant="ghost"
              render={<a href={repoUrl} target="_blank" rel="noreferrer" />}
            >
              <Icon icon="pixel:github" />
              Code
            </Button>
          )}
          {stars !== null && (
            <Tooltip>
              <TooltipTrigger
                render={
                  <span className="border-border/60 text-muted-foreground flex h-7 cursor-default items-center gap-1 rounded-full border px-2.5 text-xs tabular-nums">
                    <Icon
                      icon="lucide:star"
                      className="h-3.5 w-3.5 text-amber-500"
                    />
                    {stars.toLocaleString()}
                  </span>
                }
              />
              <TooltipContent>GitHub stars</TooltipContent>
            </Tooltip>
          )}
        </div>
      </div>
    </motion.article>
  )
}

function ProjectsV2() {
  const featured = useMemo(
    () =>
      projects
        .filter((p) => p.featured)
        .sort((a, b) => (b.date ?? "").localeCompare(a.date ?? "")),
    []
  )

  return (
    <section
      id="projects"
      className="mx-auto flex w-full max-w-5xl flex-col gap-14 px-4 py-12 sm:px-8"
    >
      {featured.map((project, i) => (
        <ProjectRow key={project.title} project={project} index={i} />
      ))}

      <motion.div {...fadeUp(stagger)} className="flex justify-center">
        <Button
          variant="outline"
          render={<Link to="/projects" />}
          className="group/all"
        >
          View all {projects.length} projects
          <Icon
            icon="lucide:arrow-right"
            className="transition-transform duration-150 ease-out group-hover/all:translate-x-0.5"
          />
        </Button>
      </motion.div>
    </section>
  )
}
export default ProjectsV2
