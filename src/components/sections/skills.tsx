import { motion } from "motion/react"
import { Icon } from "@iconify/react"
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip"
import { skillGroups } from "@/lib/data"

export function Skills() {
  return (
    <section id="skills" className="w-full px-6 pb-10">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.5 }}
        className="mx-auto flex w-fit max-w-full flex-wrap items-start justify-center gap-6"
      >
        {skillGroups.map((group, gi) => (
          <motion.div
            key={group.name}
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: gi * 0.08, duration: 0.3 }}
            className="border-border relative rounded border  "
          >
            <span className="bg-background text-muted-foreground absolute -top-2.5 left-3 px-1.5 text-xs font-medium">
              {group.name}
            </span>
            <div className="flex flex-wrap items-center gap-1.5">
              {group.skills.map((skill) => (
                <Tooltip key={skill.name}>
                  <TooltipTrigger
                    render={
                      <div className="flex cursor-default items-center justify-center rounded p-1.5 transition-colors hover:bg-muted">
                        <Icon icon={skill.icon} className="h-10 w-10" />
                      </div>
                    }
                  />
                  <TooltipContent>{skill.name}</TooltipContent>
                </Tooltip>
              ))}
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  )
}
