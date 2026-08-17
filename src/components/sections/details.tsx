import { Icon } from "@iconify/react"
import { motion } from "motion/react"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { Experience } from "@/components/sections/experience"
import { Education } from "@/components/sections/education"
import { experience, education } from "@/lib/data"
import { fadeUp, stagger } from "@/lib/motion"
import FastLogoIcon from "@/assets/FAST.png"

const panels = [
  {
    label: "Experience",
    icon: "basil:invoice-solid",
    logos: experience.map((job) => job.icon),
    content: <Experience />,
  },
  {
    label: "Education",
    icon: "basil:university-solid",
    logos: education.map(() => FastLogoIcon),
    content: <Education />,
  },
]

export function Details() {
  return (
    <section className="mx-auto flex w-full max-w-md items-center justify-center gap-2 px-6 py-4">
      {panels.map((panel, i) => (
        <motion.div key={panel.label} {...fadeUp(i * stagger)}>
          <Dialog>
            <DialogTrigger
              render={
                <button
                  type="button"
                  aria-label={`Open ${panel.label}`}
                  className="group border-border rounded-none shadow-xs hover:shadow-none bg-card text-muted-foreground hover:border-foreground/20 hover:bg-muted hover:text-foreground focus-visible:ring-ring flex cursor-pointer items-center gap-2 rounded-full border py-1 pr-1.5 pl-3 text-xs transition-colors duration-150 focus-visible:ring-2 focus-visible:outline-none"
                />
              }
            >
              <Icon icon={panel.icon} className="h-3.5 w-3.5" />
              <span className="font-medium">{panel.label}</span>

              {/* who's inside, stacked like a deck — fans out on hover */}
              <span className="flex -space-x-2 [&>*]:transition-[margin] [&>*]:duration-150 [&>*]:ease-out group-hover:-space-x-0.5">
                {panel.logos.map((logo, i) => (
                  <span
                    key={i}
                    className="border-background bg-muted text-muted-foreground grid h-5 w-5 place-items-center overflow-hidden rounded-full border grayscale transition-[filter] duration-150 group-hover:grayscale-0"
                  >
                    {logo.includes(":") ? (
                      <Icon icon={logo} className="h-3 w-3" />
                    ) : (
                      <img
                        src={logo}
                        alt=""
                        className="h-full w-full object-cover"
                      />
                    )}
                  </span>
                ))}
              </span>
            </DialogTrigger>

            <DialogContent
              className="bg-transparent p-0 ring-0 sm:max-w-md"
              showCloseButton={false}
            >
              {panel.content}
            </DialogContent>
          </Dialog>
        </motion.div>
      ))}
    </section>
  )
}
