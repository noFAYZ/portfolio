import { motion } from "motion/react"

export function About() {
  return (
    <section id="about" className="mx-auto w-full max-w-xl px-6 py-12">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <p className="text-sm leading-relaxed sm:text-base">
          I'm a full-stack developer who turns{" "}
          <span className="font-heading font-semibold text-foreground">
            complex problems
          </span>{" "}
          into{" "}
          <span className="font-heading font-semibold text-foreground">
            simple, elegant
          </span>{" "}
          solutions — from pixel-perfect interfaces to robust APIs and
          databases.
        </p>
 
  
      </motion.div>
    </section>
  )
}
