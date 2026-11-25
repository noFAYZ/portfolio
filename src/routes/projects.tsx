import { AnimatePresence, motion } from "motion/react"
import { useSearchParams } from "react-router"
import { ScrollReveal } from "@/components/motion/scroll-reveal"
import { ProjectCard } from "@/components/project-card"
import { kinds, profile, showcase, type Kind } from "@/lib/data"
import { EASE_OUT, SPRING_LAYOUT } from "@/lib/ease"
import { FOCUS_RING } from "@/lib/ui"
import { cn } from "@/lib/utils"

const pad = (n: number) => String(n).padStart(2, "0")
// only the kinds something is filed under, in the order `kinds` lists them
const used = (Object.keys(kinds) as Kind[]).filter((k) =>
  showcase.some((p) => p.kind === k)
)

export default function Projects() {
  const [params, setParams] = useSearchParams()
  const param = params.get("kind") as Kind | null
  const kind = param && used.includes(param) ? param : null
  const list = kind ? showcase.filter((p) => p.kind === kind) : showcase

  const tabs = [
    { id: null, label: "All", count: showcase.length },
    ...used.map((k) => ({
      id: k,
      label: kinds[k],
      count: showcase.filter((p) => p.kind === k).length,
    })),
  ]

  return (
    <main className="pt-28 sm:pt-36">
      <title>{`Projects — ${profile.name}`}</title>
      <ScrollReveal y={10} blur={6}>
        <h1 className="text-[clamp(1.75rem,4.4vw,2.5rem)] leading-none font-medium tracking-[-0.035em]">
          Projects
          <sup className="text-muted-foreground ml-1.5 align-super text-[13px] font-normal tracking-normal tabular-nums">
            {pad(list.length)}
          </sup>
        </h1>
        <p className="text-muted-foreground mt-3 text-[15px]">
          Apps I design, build and{" "}
          <em className="text-foreground font-serif text-[1.08em]">ship</em>.
        </p>

        {used.length > 1 && (
          <nav
            aria-label="Filter projects"
            className="bg-card/50 mt-7 inline-flex gap-0.5 rounded-full p-1 text-[13px]"
          >
            {tabs.map((tab) => (
              <button
                key={tab.label}
                type="button"
                aria-pressed={kind === tab.id}
                onClick={() =>
                  setParams(tab.id ? { kind: tab.id } : {}, {
                    replace: true,
                    preventScrollReset: true,
                  })
                }
                className={cn(
                  "relative rounded-full px-3 py-1.5 transition-[color,scale] duration-150 active:scale-95",
                  kind === tab.id
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground",
                  FOCUS_RING
                )}
              >
                {kind === tab.id && (
                  <motion.span
                    layoutId="projects-filter"
                    transition={SPRING_LAYOUT}
                    className="bg-card absolute inset-0 rounded-full shadow-sm"
                  />
                )}
                <span className="relative">
                  {tab.label}
                  <sup className="text-muted-foreground ml-1 text-[10px] tabular-nums">
                    {tab.count}
                  </sup>
                </span>
              </button>
            ))}
          </nav>
        )}
      </ScrollReveal>

      <div className="mt-6 grid gap-3 sm:grid-cols-2 md:-mx-10 lg:-mx-32">
        {/* cards leave and arrive blurred while the rest glide into the gaps */}
        <AnimatePresence mode="popLayout">
          {list.map((project, i) => (
            <motion.div
              key={project.title}
              layout
              initial={{ opacity: 0, scale: 0.96, filter: "blur(6px)" }}
              animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              exit={{ opacity: 0, scale: 0.96, filter: "blur(6px)" }}
              transition={{
                layout: SPRING_LAYOUT,
                duration: 0.35,
                ease: EASE_OUT,
                delay: 0.08 + i * 0.06,
              }}
            >
              <ProjectCard project={project} />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </main>
  )
}
