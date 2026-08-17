import { motion } from "motion/react"
import { fadeUp } from "@/lib/motion"

export function About() {
  return (
    <section id="about" className="mx-auto w-full max-w-2xl px-6 py-12">
      <motion.div {...fadeUp()} className="text-center">
        <p className="text-sm  sm:text-lg">
          I'm a full-stack developer who turns{" "}
          <span className="font-heading text-foreground font-semibold">
            complex problems
          </span>{" "}
          into{" "}
          <span className="font-heading text-foreground font-semibold">
            simple, robust
          </span>{" "}
          solutions — pixel-perfect interfaces, APIs that hold up, and Web3
          systems that have moved{" "}
          <span className="font-heading text-foreground font-semibold">
            $3M+ on-chain
          </span>
          .
        </p>
      </motion.div>
    </section>
  )
}
