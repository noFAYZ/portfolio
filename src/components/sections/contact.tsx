import { Icon } from "@iconify/react"
import { motion } from "motion/react"
import { Button } from "@/components/ui/button"
import { SectionStamp } from "@/components/section-stamp"
import { profile } from "@/lib/data"
import { fadeUp } from "@/lib/motion"

export function Contact() {
  return (
    <section
      id="contact"
      className="mx-auto w-full max-w-2xl px-4 py-6 sm:px-6"
    >
      <SectionStamp index={3}>Contact</SectionStamp>
      <motion.div {...fadeUp()} className="border-border bg-card border p-6 sm:p-8">
        <h2 className="font-heading text-xl font-bold tracking-tight sm:text-2xl">
          Have something worth building?
        </h2>
        <p className="text-muted-foreground mt-2 max-w-prose text-sm leading-relaxed">
          I'm open to new projects, tricky features, or Web3 systems that need
          to actually hold up. Reach out — email or GitHub, whichever's
          faster.
        </p>

        <div className="mt-5 flex flex-wrap items-center gap-2">
          <Button
            size="sm"
            variant="outline"
            render={<a href={`mailto:${profile.email}`} />}
            className="rounded-none -skew-x-12"
          >
            <span className="flex skew-x-12 items-center gap-1.5">
              <Icon icon="pixel:at" className="h-4 w-4" />
              {profile.email}
            </span>
          </Button>
          <Button
            size="sm"
            variant="ghost"
            render={
              <a href={profile.social.github} target="_blank" rel="noreferrer" />
            }
            className="rounded-none -skew-x-12"
          >
            <span className="flex skew-x-12 items-center gap-1.5">
              <Icon icon="pixel:github" className="h-4 w-4" />
              GitHub
            </span>
          </Button>
        </div>
      </motion.div>
    </section>
  )
}
