import type { ReactNode } from "react"
import { ScrollReveal } from "@/components/motion/scroll-reveal"

/** A home section: a quiet label, then content that rises in as it scrolls into view. */
export function Section({
  id,
  title,
  children,
}: {
  id: string
  title: string
  children: ReactNode
}) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-title`}
      className="mt-24 scroll-mt-12 sm:mt-28"
    >
      <ScrollReveal y={12} blur={6} amount={0.15}>
        <h2
          id={`${id}-title`}
          className="text-muted-foreground mb-5 text-[13px] font-medium"
        >
          {title}
        </h2>
        {children}
      </ScrollReveal>
    </section>
  )
}
