import { useState } from "react"
import { motion } from "motion/react"
import { Icon } from "@iconify/react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip"
import { profile } from "@/lib/data"

const links = [
  {
    label: "GitHub",
    sub: "@your-username",
    href: profile.social.github,
    icon: "lucide:github",
  },
  {
    label: "LinkedIn",
    sub: "/in/your-username",
    href: profile.social.linkedin,
    icon: "lucide:linkedin",
  },
  {
    label: "Twitter / X",
    sub: "@your-username",
    href: profile.social.twitter,
    icon: "lucide:twitter",
  },
]

export function Contact() {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    await navigator.clipboard.writeText(profile.email)
    setCopied(true)
    setTimeout(() => setCopied(false), 1800)
  }

  return (
    <section id="contact" className="mx-auto w-full max-w-2xl px-6 py-6">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.3 }}
        className="border-border/60 relative overflow-hidden rounded-3xl border px-6 py-10 text-center sm:px-12 sm:py-14"
      >
        <div className="bg-foreground/5 pointer-events-none absolute -top-16 -left-16 h-48 w-48 rounded-full blur-3xl" />
        <div className="bg-foreground/5 pointer-events-none absolute -right-16 -bottom-16 h-48 w-48 rounded-full blur-3xl" />

        <div className="border-border/40 text-muted-foreground mx-auto inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-[11px]">
          <span className="relative flex h-1.5 w-1.5">
            <span className="bg-foreground absolute inline-flex h-full w-full animate-ping rounded-full opacity-60" />
            <span className="bg-foreground relative inline-flex h-1.5 w-1.5 rounded-full" />
          </span>
          Available for new projects
        </div>

        <h2 className="mt-4 text-2xl font-bold tracking-tight sm:text-4xl">
          Got an idea?
          <br />
          <span className="text-muted-foreground">Let's make it real.</span>
        </h2>

        <p className="text-muted-foreground mx-auto mt-3 max-w-sm text-xs leading-relaxed sm:text-sm">
          Whether it's a full product, a tricky feature, or just an idea you
          want to talk through — my inbox is always open.
        </p>

        <div className="mt-7 flex flex-col items-center gap-4">
          <Dialog>
            <DialogTrigger
              render={
                <Button
                  size="sm"
                  className="rounded-full px-5 py-2.5 text-sm font-medium shadow-sm transition-transform hover:scale-105 active:scale-95"
                >
                  <Icon icon="lucide:mail" className="h-4 w-4" />
                  Contact
                </Button>
              }
            />
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Get in touch</DialogTitle>
                <DialogDescription>
                  Reach out by email or find me on social — I usually reply
                  within a day.
                </DialogDescription>
              </DialogHeader>

              <Tooltip>
                <TooltipTrigger
                  render={
                    <button
                      onClick={handleCopy}
                      className="border-border/60 bg-card hover:border-foreground/30 hover:bg-muted flex w-full items-center justify-center gap-2 rounded-lg border px-4 py-2.5 text-sm font-medium transition-colors"
                    >
                      <Icon
                        icon={copied ? "lucide:check" : "lucide:mail"}
                        className="h-4 w-4"
                      />
                      {profile.email}
                    </button>
                  }
                />
                <TooltipContent>
                  {copied ? "Copied!" : "Click to copy"}
                </TooltipContent>
              </Tooltip>

              <div className="flex items-center justify-center gap-2">
                {links.map((link) => (
                  <Tooltip key={link.label}>
                    <TooltipTrigger
                      render={
                        <a
                          href={link.href}
                          target="_blank"
                          rel="noreferrer"
                          aria-label={link.label}
                          className="border-border/50 bg-card text-muted-foreground hover:border-foreground/30 hover:text-foreground flex h-9 w-9 items-center justify-center rounded-full border transition-colors"
                        >
                          <Icon icon={link.icon} className="h-4 w-4" />
                        </a>
                      }
                    />
                    <TooltipContent>{link.sub}</TooltipContent>
                  </Tooltip>
                ))}
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </motion.div>
    </section>
  )
}
