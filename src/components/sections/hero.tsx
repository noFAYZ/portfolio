import { motion } from "motion/react"
import { Icon } from "@iconify/react"
import { Button } from "@/components/ui/button"
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip"
import { profile } from "@/lib/data"
import { rise, stagger } from "@/lib/motion"
import HeroBg from "@/assets/extra.gif"
import { Skills } from "./skills"
import { About } from "./about"
import { Details } from "./details"
import { useTheme } from "../theme-provider"

const socialLinks = [
  {
    label: "GitHub",
    href: profile.social.github,
    icon: "pixel:github",
  },
  {
    label: "Email",
    href: `mailto:${profile.email}`,
    icon: "pixel:at",
  },
]

export function Hero() {
 const theme = useTheme().theme
  return (
    <section
      id="top"
      className="relative isolate flex min-h-[26vh] w-full flex-col items-center justify-end px-6 text-center lg:min-h-full"
    >
      <div className="absolute inset-0 -z-10">
        <img src={HeroBg} alt="" className="h-full w-full object-cover " />
        <div className="from-background/5 via-background/80 to-background absolute inset-0 bg-gradient-to-b" />
      </div>

      {/*       <motion.div
        className="group relative mb-4"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
     
        <div className="bg-foreground/10 absolute inset-0 -z-10 scale-105 rounded-[3rem] blur-2xl" />

    
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

      </motion.div> */}

      <motion.h1
        className="text-4xl font-bold tracking-tight sm:text-5xl"
        {...rise()}
      >
        {profile.name}
      </motion.h1>

      <motion.p
        className="font-heading text-muted-foreground mt-1.5 text-md sm:text-xl"
        {...rise(stagger)}
      >
        {profile.role}
      </motion.p>

      <motion.div
        className="mt-5 flex flex-wrap items-center justify-center gap-2"
        {...rise(stagger * 2)}
      >
        {/*     <Button size="sm" render={<a href="#projects" />}>
          <Icon icon="lucide:folder-code" />
          Projects
        </Button>
        <Button size="sm" variant="outline" render={<a href="#contact" />}>
          <Icon icon="lucide:send" />
          Contact
        </Button>
 */}
        <div className="ml-1 flex items-center gap-0.5">
          {socialLinks.map((link) => (
            <Tooltip key={link.label}>
              <TooltipTrigger
                render={
                  <Button
                    variant="link"
                    size="sm"
                    aria-label={link.label}
                    render={
                      <a href={link.href} target="_blank" rel="noreferrer" />
                    }
                  >
                    <Icon icon={link.icon} className="h-3.5 w-3.5" />
                    {link.label}
                  </Button>
                }
              />
              <TooltipContent>{link.label}</TooltipContent>
            </Tooltip>
          ))}
        </div>
      </motion.div>



      <Details />
      <About />
      <Skills />

      <motion.div {...rise(stagger * 3)} className="mt-4 w-full pb-12   px-6 bg-background">
        <iframe
           src={`https://jandi.firejune.io/nofayz?radius=3&margin=2&footer=false&weeks=false&scheme=${theme=='light'? 'light' : 'dark'} `}
          title="GitHub contribution graph"
          loading="lazy"
          height={80}
          className="w-full border-0 bg-background"
        />
      </motion.div>
    </section>
  )
}
