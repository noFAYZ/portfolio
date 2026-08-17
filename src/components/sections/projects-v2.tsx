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
import { SectionStamp } from "@/components/section-stamp"
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
  const stars = useStars(repoUrl)
  const flipped = index % 2 === 1
  const stage = stages[index % stages.length]

  return (
    <motion.article
      {...fadeUp()}
      style={{ skewX: -12 }}
      className={`group relative flex flex-col gap-2 md:flex-row md:items-center md:gap-6 ${
        flipped ? "md:flex-row-reverse" : ""
      }`}
    >
      <div className="relative w-full shrink-0 md:w-1/3">

        <div
          className={`  relative bg-gradient-to-br  ring-inset  ${stage.bg}`}
        >
          {project.image ? (
            <img
              src={project.image}
              alt=""
              loading="lazy"
              className="relative block aspect-1405/1014 w-80 skew-x-12 rounded object-cover shadow-xl transition-[transform,box-shadow] duration-150 ease-out group-hover:-translate-y-1 group-hover:scale-[1.02] group-hover:shadow-2xl"
            />
          ) : (
            <div className="bg-background/40 text-muted-foreground grid aspect-1405/1014 w-full skew-x-12 place-items-center rounded shadow-xl backdrop-blur-sm transition-transform duration-150 ease-out group-hover:-translate-y-1 group-hover:scale-[1.02]">
              <Icon
                icon={project.icon || "lucide:folder"}
                className="h-12 w-12"
              />
            </div>
          )}
        </div>
      </div>

      <div className="skew-x-12 md:w-1/2 p-4 sm:p-5">

        <h3 className="font-heading text-lg font-bold tracking-tight">
          {project.title}
        </h3>

        {project.description && (
          <p className="text-muted-foreground mt-1 line-clamp-2 max-w-prose text-sm leading-relaxed">
            {project.description}
          </p>
        )}

        {project.tags?.length > 0 && (
          <div className="mt-2 flex flex-wrap items-center gap-1.5">
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

        <div className="mt-3 flex flex-wrap items-center gap-2">
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
          
        </div>
      </div>
      {stars !== null && (
            <Tooltip>
              <TooltipTrigger
                render={
                  <span className="  absolute top-2 right-3 skew-x-12 border-border text-muted-foreground flex py-0.5 cursor-default items-center gap-1 shadow-xs border px-1.5 text-xs tabular-nums">
                    <Icon
                      icon="fluent-color:star-48"
                      className="h-4 w-4 text-orange-500"
                      fill="orange"
                    />
                    {stars.toLocaleString()}
                  </span>
                }
              />
              <TooltipContent>GitHub stars</TooltipContent>
            </Tooltip>
          )}

               {project.openSource && (
            <span className=" absolute top-2 right-20 skew-x-12 text-xs text-muted-foreground border px-1.5 shadow-xs py-0.5 flex items-center gap-1">
              <Icon icon="lucide:git-fork" className="h-3 w-3" />
              open source
            </span>
          )}
    </motion.article>
  )
}

const PREVIEW_COUNT = 3

function ProjectsV2() {
  const featured = useMemo(() => {
    const byDateDesc = (a: Project, b: Project) =>
      (b.date ?? "").localeCompare(a.date ?? "")
    // featured projects first, padded with the next most recent so the
    // preview always shows PREVIEW_COUNT even if fewer are flagged featured
    const picked = projects.filter((p) => p.featured).sort(byDateDesc)
    const rest = projects.filter((p) => !p.featured).sort(byDateDesc)
    return [...picked, ...rest].slice(0, PREVIEW_COUNT)
  }, [])

  return (
    <section
      id="projects"
      className="mx-auto flex w-full max-w-5xl flex-col gap-8 px-4 py-12 sm:px-8"
    >
      <SectionStamp index={2}>Projects</SectionStamp>
      {featured.map((project, i) => (
        <ProjectRow key={project.title} project={project} index={i} />
      ))}

      <motion.div {...fadeUp(stagger)} className="flex justify-center">
        <Button
          variant="outline"
          render={<Link to="/projects" />}
          className="group/all rounded-none -skew-x-12"
        >
          <span className="flex skew-x-12 items-center gap-1.5">
            View all {projects.length} projects
            <Icon
              icon="lucide:arrow-right"
              className="transition-transform duration-150 ease-out group-hover/all:translate-x-0.5"
            />
          </span>
        </Button>
      </motion.div>
    </section>
  )
}
export default ProjectsV2
