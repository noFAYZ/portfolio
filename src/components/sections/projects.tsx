import { useState } from "react"
import { motion } from "motion/react"
import { Icon } from "@iconify/react"
import { Card, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip"
import { cn } from "@/lib/utils"
import { projects } from "@/lib/data"

const INITIAL_COUNT = 6

export function Projects() {
  const [showAll, setShowAll] = useState(false)
  const featured = showAll ? projects : projects.slice(0, INITIAL_COUNT)

  return (
    <section id="projects" className="mx-auto w-full max-w-5xl px-6 py-12">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.2 }}
        className="border-border relative rounded-xl border px-3 py-4 bg-muted shadow-inner"
      >
        <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden rounded-2xl">
          <div className="bg-foreground/5 absolute -top-10 -right-10 h-32 w-32 rounded-full blur-3xl" />
          <div className="bg-foreground/5 absolute -bottom-10 -left-10 h-32 w-32 rounded-full blur-3xl" />
        </div>

        <span className="bg-muted text-muted-foreground absolute -top-3 left-4 flex items-center gap-1.5 rounded-full px-2 text-sm font-semibold tracking-wide">
          <Icon icon="basil:folder-open-solid" className="h-4 w-4" />
          Projects
        </span>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3  ">
          {featured.map((project, i) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ delay: (i % 3) * 0.08, duration: 0.2 }}
            >
              <Card className="group/project  border-b  bg-muted   relative flex   w-full flex-col gap-0 overflow-hidden rounded-2xl border shadow-xs p-0  transition-all duration-100 hover:-translate-y-1 hover:shadow-lg hover:border">
                {/* image — visible by default */}
                <div className="  p-2  ">
                  {project.image ? (
                    <img
                      src={project.image}
                      alt={project.title}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-200 ease-out group-hover/project:scale-102 rounded-xl shadow-inner"
                    />
                  ) : (
                    <div className="bg-muted text-muted-foreground/50 flex h-full w-full items-center justify-center bg-[radial-gradient(var(--border)_1px,transparent_1px)] [background-size:14px_14px]">
                      <Icon icon={project.icon} className="h-10 w-10" />
                    </div>
                  )}
                  <div className="from-background/90 via-background/15 pointer-events-none absolute inset-0 bg-gradient-to-t to-transparent" />
                </div>

                {/* default state — title + skill icons over the image */}
                <div className="relative flex   flex-col justify-between px-4 py-2 transition-opacity duration-200 group-focus-within/project:opacity-0 group-hover/project:opacity-0">
         
                  <div className="flex flex-col gap-2">
                    <CardTitle className="text-md  ">
                      {project.title}
                    </CardTitle>
                    <div className="flex flex-wrap gap-1">
                      {project.tags.map((tag) => (
                        <Tooltip key={tag.name}>
                          <TooltipTrigger
                            render={
                              <div className="border-border/40 bg-background/70 flex h-7 w-7 cursor-default items-center justify-center rounded-md border backdrop-blur-sm">
                                <Icon icon={tag.icon} className="h-4 w-4" />
                              </div>
                            }
                          />
                          <TooltipContent>{tag.name}</TooltipContent>
                        </Tooltip>
                      ))}
                    </div>
                  </div>
                </div>

                {/* details — revealed on hover / keyboard focus */}
                <div className="bg-background/85 pointer-events-none absolute inset-0 z-10 flex flex-col gap-3 p-4 opacity-0 backdrop-blur-md transition-opacity duration-100 group-focus-within/project:pointer-events-auto group-focus-within/project:opacity-100 group-hover/project:pointer-events-auto group-hover/project:opacity-100">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-2.5">
                      <div className="bg-muted text-muted-foreground flex h-8 w-8 shrink-0 items-center justify-center rounded-lg">
                        <Icon icon={project.icon} className="h-4 w-4" />
                      </div>
                      <CardTitle className="text-lg">{project.title}</CardTitle>
                    </div>
              
                  </div>

                  <CardDescription className="text-md leading-tight">
                    {project.description}
                  </CardDescription>

                  <div className="mt-auto flex flex-wrap items-end justify-between gap-x-3 gap-y-2">
                    <div className="flex flex-wrap gap-1">
                      {project.tags.map((tag) => (
                        <Tooltip key={tag.name}>
                          <TooltipTrigger
                            render={
                              <div className="border-border/40 bg-background/50 hover:border-foreground/20 flex h-7 w-7 cursor-default items-center justify-center rounded-md border transition-colors">
                                <Icon icon={tag.icon} className="h-4 w-4" />
                              </div>
                            }
                          />
                          <TooltipContent>{tag.name}</TooltipContent>
                        </Tooltip>
                      ))}
                    </div>

                    <div className="flex shrink-0 gap-1.5">
                      {project.liveUrl && (
                        <Button
                          size="sm"
                          variant="outline"
                          render={
                            <a
                              href={project.liveUrl}
                              target="_blank"
                              rel="noreferrer"
                            />
                          }
                        >
                          <Icon icon="lucide:external-link" />
                          Live
                        </Button>
                      )}
                      {project.repoUrl && (
                        <Button
                          size="sm"
                          variant="ghost"
                          render={
                            <a
                              href={project.repoUrl}
                              target="_blank"
                              rel="noreferrer"
                            />
                          }
                        >
                          <Icon icon="lucide:github" />
                          Code
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {projects.length > INITIAL_COUNT && (
          <div className="mt-4 flex justify-center">
            <Button
              size="sm"
              variant="outline"
              onClick={() => setShowAll((prev) => !prev)}
            >
              <Icon
                icon="lucide:chevron-down"
                className={cn(
                  "transition-transform duration-300",
                  showAll && "rotate-180"
                )}
              />
              {showAll ? "Show less" : `Show all ${projects.length} projects`}
            </Button>
          </div>
        )}
      </motion.div>
    </section>
  )
}
