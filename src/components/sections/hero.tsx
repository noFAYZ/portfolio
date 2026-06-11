import { motion } from "motion/react"
import { Icon } from "@iconify/react"
import { Button } from "@/components/ui/button"
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip"
import { profile } from "@/lib/data"
import ProfileImage from "@/assets/profile/3.jpeg"
import HeroBg from "@/assets/5.jpg"

const socialLinks = [
  {
    label: "GitHub",
    href: profile.social.github,
    icon: "lucide:github",
  },
  {
    label: "LinkedIn",
    href: profile.social.linkedin,
    icon: "lucide:linkedin",
  },
  {
    label: "Email",
    href: `mailto:${profile.email}`,
    icon: "lucide:mail",
  },
]

export function Hero() {
  return (
    <section
      id="top"
      className="relative isolate flex min-h-[40vh] w-full flex-col items-center justify-center overflow-hidden px-6    text-center  "
    >
      <div className="absolute inset-0 -z-10">
        <img src={HeroBg} alt="" className="h-full w-full object-cover" />
        <div className="from-background/5 via-background/80 to-background absolute inset-0 bg-gradient-to-b" />
      </div>

      <motion.div
        className="group relative mb-4"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* soft glow behind the avatar */}
        <div className="bg-foreground/10 absolute inset-0 -z-10 scale-105 rounded-[3rem] blur-2xl" />

        {/* slow-spinning dashed orbit */}
        <div
          aria-hidden
          className="border-foreground/20 absolute -inset-2 animate-[spin_16s_linear_infinite] rounded-full border border-dashed"
        />

        <div className="border-background ring-border/60 group-hover:ring-foreground/30 relative h-20 w-20 overflow-hidden rounded-full border-2 shadow-lg ring-1 transition-all duration-200 group-hover:scale-110  ">
          <img
            src={ProfileImage}
            alt={profile.name}
            className="h-full w-full object-cover grayscale transition-all duration-300 group-hover:grayscale-0"
          />
        </div>

      </motion.div>

      <motion.h1
        className="text-3xl font-bold tracking-tight sm:text-4xl"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.5 }}
      >
        {profile.name}
      </motion.h1>

      <motion.p
        className="font-heading text-muted-foreground mt-1.5 text-sm sm:text-base"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        {profile.role}
      </motion.p>

      <motion.div
        className="mt-5 flex flex-wrap items-center justify-center gap-2"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.4 }}
      >
        <Button size="sm" render={<a href="#projects" />}>
          <Icon icon="lucide:folder-code" />
          Projects
        </Button>
        <Button size="sm" variant="outline" render={<a href="#contact" />}>
          <Icon icon="lucide:send" />
          Contact
        </Button>

        <div className="ml-1 flex items-center gap-0.5">
          {socialLinks.map((link) => (
            <Tooltip key={link.label}>
              <TooltipTrigger
                render={
                  <Button
                    variant="ghost"
                    size="icon-sm"
                    aria-label={link.label}
                    render={
                      <a href={link.href} target="_blank" rel="noreferrer" />
                    }
                  >
                    <Icon icon={link.icon} className="h-3.5 w-3.5" />
                  </Button>
                }
              />
              <TooltipContent>{link.label}</TooltipContent>
            </Tooltip>
          ))}
        </div>
      </motion.div>
    </section>
  )
}
