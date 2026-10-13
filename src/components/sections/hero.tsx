import { motion } from "motion/react"
import { ArrowUpRight, AudioLines } from "lucide-react"
import { Link } from "react-router"
import { TextReveal } from "@/components/motion/text-reveal"
import { profile } from "@/lib/data"
import { EASE_OUT, SPRING_PRESS } from "@/lib/ease"
import { FOCUS_RING, scrollToId } from "@/lib/ui"
import { cn } from "@/lib/utils"

const enter = (delay: number) => ({
  initial: { opacity: 0, y: 8, filter: "blur(6px)" },
  animate: { opacity: 1, y: 0, filter: "blur(0px)" },
  transition: { duration: 0.6, ease: EASE_OUT, delay },
})

const pill =
  "inline-flex h-9 items-center gap-1.5 rounded-full px-4 text-[13px] font-medium transition-[background-color,scale] duration-150 active:scale-[0.97]"

export function Hero() {
  return (
    <header id="top" className="pt-20 sm:pt-28">
      {/* a sticker: drag it anywhere, it springs home */}
      <motion.img
        src={profile.portrait}
        alt=""
        draggable={false}
        drag
        dragSnapToOrigin
        dragElastic={0.6}
        dragTransition={{ bounceStiffness: 500, bounceDamping: 22 }}
        initial={{ opacity: 0, scale: 0.6, rotate: -18 }}
        animate={{ opacity: 1, scale: 1, rotate: -5 }}
        whileHover={{ rotate: 0, scale: 1.06 }}
        whileDrag={{ scale: 1.12, rotate: 6 }}
        transition={SPRING_PRESS}
        className="size-16 cursor-grab touch-none rounded-2xl object-cover shadow-xl active:cursor-grabbing"
      />

      <TextReveal
        as="h1"
        text={profile.headline}
        emphasisClassName="font-serif font-normal italic tracking-[-0.01em]"
        stagger={0.045}
        delay={0.15}
        blur={8}
        yOffset="30%"
        className="mt-8 max-w-[18em] text-[clamp(1.75rem,4.6vw,2.5rem)] leading-[1.12] font-medium tracking-[-0.035em] text-balance"
      />

      <motion.p
        {...enter(0.6)}
        className="text-muted-foreground mt-4 max-w-[30rem] text-[15px] leading-relaxed text-pretty"
      >
        Full-stack engineer in {profile.location}. I've shipped Web3 systems
        that moved $3M+ on-chain, and now I'm building{" "}
        <Link
          to="/blog/zuno-case-study"
          viewTransition
          className={cn(
            "bg-card/50 text-foreground hover:bg-card inline-flex items-center gap-1 rounded-full px-2 align-baseline transition-colors duration-150",
            FOCUS_RING
          )}
        >
          <AudioLines aria-hidden className="text-glow-red size-3.5" />
          Zuno
        </Link>
        .
      </motion.p>

      <motion.div
        {...enter(0.7)}
        className="mt-7 flex flex-wrap items-center gap-2"
      >
        <a
          href="#contact"
          onClick={(e) => {
            e.preventDefault()
            scrollToId("contact")
          }}
          className={cn(
            pill,
            "bg-foreground text-background hover:bg-foreground/85",
            FOCUS_RING
          )}
        >
          Get in touch
        </a>
        {[
          ["GitHub", profile.github],
          ["Résumé", profile.resume],
        ].map(([label, href]) => (
          <a
            key={label}
            href={href}
            target="_blank"
            rel="noreferrer"
            className={cn(pill, "group bg-card/50 hover:bg-card", FOCUS_RING)}
          >
            {label}
            <ArrowUpRight
              aria-hidden
              className="text-muted-foreground group-hover:text-foreground size-3.5 transition-[translate,color] duration-200 ease-out group-hover:translate-x-px group-hover:-translate-y-px"
            />
          </a>
        ))}
        {profile.status && (
          <span className="text-muted-foreground ml-2 inline-flex items-center gap-2 text-[13px]">
            <span aria-hidden className="relative flex size-2">
              <span className="bg-success absolute inset-0 rounded-full opacity-70 motion-safe:animate-ping" />
              <span className="bg-success relative size-2 rounded-full" />
            </span>
            {profile.status}
          </span>
        )}
      </motion.div>
    </header>
  )
}
