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
    <section id="skills" className="w-full px-6  ">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.5 }}
        className="mx-auto flex w-fit flex-wrap items-center justify-center gap-1.5"
      >
        {skillGroups.map((group, gi) =>
          group.skills.map((skill, i) => (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: gi * 0.05 + i * 0.04, duration: 0.3 }}
            >
              <Tooltip>
                <TooltipTrigger
                  render={
                    <div className="flex cursor-default items-center justify-center rounded-md p-1.5 transition-colors hover:bg-muted">
                      <Icon icon={skill.icon} className="h-7 w-7" />
                    </div>
                  }
                />
                <TooltipContent>{skill.name}</TooltipContent>
              </Tooltip>
            </motion.div>
          ))
        )}
      </motion.div>
    </section>
  )
}
