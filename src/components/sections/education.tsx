import { motion } from "motion/react"
import { Icon } from "@iconify/react"
import { education } from "@/lib/data"
import FastLogoIcon from "@/assets/FAST.png"

export function Education() {
  return (
    <section id="education" className="mx-auto w-fit max-w-md px-6 py-6">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.5 }}
        className="border-border relative rounded-xl border px-3 py-2 dark:bg-muted"
      >
        <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden rounded-2xl">
          <div className="bg-foreground/5 absolute -top-10 -right-10 h-32 w-32 rounded-full blur-3xl" />
        </div>

        <span className="bg-muted text-muted-foreground absolute -top-3 left-4 flex items-center gap-1.5 rounded-full px-2 text-sm font-semibold tracking-wide">
          <Icon icon="basil:university-solid" className="h-4 w-4" />
          Education
        </span>

        <div className="space-y-4">
          {education.map((item, i) => (
            <motion.div
              key={item.degree + item.school}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ delay: i * 0.06, duration: 0.4 }}
              className="group relative flex items-center gap-3"
            >
              <div className="flex flex-col items-center self-stretch">
                <div className="border-border/40 bg-card text-muted-foreground group-hover:border-foreground/20 group-hover:text-foreground flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-lg border transition-colors">
                  <img
                    src={FastLogoIcon}
                    alt=""
                    className="h-6 w-6 object-contain"
                  />
                </div>
                {i < education.length - 1 && (
                  <span className="bg-border/40 mt-2 w-px flex-1" />
                )}
              </div>

              <div className="flex-1">
                <div className="flex flex-col gap-0.5 sm:flex-row sm:items-center sm:justify-between">
                  <h3 className="text-sm font-medium">
                    {item.degree}{" "}
                    <span className="text-muted-foreground font-normal">
                      @ {item.school}
                    </span>
                  </h3>
                  {/* <span className="text-muted-foreground text-xs">
                    {item.period}
                  </span> */}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}
