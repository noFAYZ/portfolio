import { motion } from "motion/react"
import { Icon } from "@iconify/react"
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip"
import { experience } from "@/lib/data"
import { rise, stagger } from "@/lib/motion"

export function Experience() {
  return (
    <section id="experience" className="mx-auto w-full max-w-md px-6 py-6">
      <motion.div
        {...rise()}
        className="border-border bg-background dark:bg-muted relative rounded-xl border px-3 pt-6 pb-4"
      >
        <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden rounded-2xl">
          <div className="bg-foreground/5 absolute -top-10 -right-10 h-32 w-32 rounded-full blur-3xl" />
        </div>

        <span className="bg-muted text-muted-foreground absolute -top-3 left-4 flex items-center gap-1.5 rounded-full px-2 text-sm font-semibold tracking-wide">
          <Icon icon="basil:invoice-solid" className="h-4 w-4" />
          Experience
        </span>

        <div className="space-y-5">
          {experience.map((job, i) => (
            <motion.div
              key={job.role + job.company}
              {...rise(0.08 + i * stagger)}
              className="group relative flex gap-3"
            >
              <div className="flex flex-col items-center">
                <div className="border-border/60 bg-card text-muted-foreground group-hover:border-foreground/20 group-hover:text-foreground flex h-8 w-8 shrink-0 items-center justify-center overflow-hidden rounded-lg border transition-colors">
                  {job.icon.includes(":") ? (
                    <Icon icon={job.icon} className="h-3.5 w-3.5" />
                  ) : (
                    <img
                      src={job.icon}
                      alt=""
                      className="h-full w-full object-cover"
                    />
                  )}
                </div>
                {i < experience.length - 1 && (
                  <span className="bg-border mt-2 w-px flex-1" />
                )}
              </div>

              <div className="flex-1 pb-1">
                <div className="flex flex-col gap-0.5 sm:flex-row sm:items-center sm:justify-between">
                  <h3 className="text-sm font-medium">
                    {job.role}{" "}
                    <span className="text-muted-foreground font-normal">
                      @ {job.company}
                    </span>
                  </h3>
                  {/*    <div className="flex items-center gap-2">
                    {job.current && (
                      <Badge className="gap-1.5 text-[10px]">
                        <span className="relative flex h-1.5 w-1.5">
                          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-current opacity-60" />
                          <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-current" />
                        </span>
                        Current
                      </Badge>
                    )}
                    <span className="text-muted-foreground text-xs">
                      {job.period}
                    </span>
                  </div> */}
                </div>

                {/*  <p className="text-muted-foreground mt-1.5 text-xs leading-relaxed">
                  {job.description}
                </p> */}

                <div className="mt-2 flex flex-wrap gap-1">
                  {job.tags.map((tag) => (
                    <Tooltip key={tag.name}>
                      <TooltipTrigger
                        render={
                          <div className="border-border/40 flex h-7 w-7 cursor-default items-center justify-center rounded-md border">
                            <Icon icon={tag.icon} className="h-4 w-4" />
                          </div>
                        }
                      />
                      <TooltipContent>{tag.name}</TooltipContent>
                    </Tooltip>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}
