import type { ReactNode } from "react"
import { ArrowRight, ArrowUpRight } from "lucide-react"
import { Link } from "react-router"
import { ScrollReveal } from "@/components/motion/scroll-reveal"
import { sections } from "@/lib/data"
import { FOCUS_RING } from "@/lib/ui"
import { cn } from "@/lib/utils"

/** `to` routes inside the site; `href` opens in a new tab. */
type SectionLink = { label: string; to?: string; href?: string }

const linkClass = cn(
  "group bg-card/50 text-muted-foreground hover:bg-card hover:text-foreground inline-flex h-7 items-center gap-1 rounded-full pr-2.5 pl-3 transition-[color,background-color,scale] duration-150 active:scale-[0.97]",
  FOCUS_RING
)

/**
 * A home section: its number, a title, and on the right a way onward (or a
 * count), then content that rises in as it scrolls into view. `*word*` in the
 * title renders as the serif italic accent, as in the hero. `wide` lets the
 * whole section, header included, break out of the column like the work grid.
 */
export function Section({
  id,
  title,
  link,
  meta,
  wide,
  children,
}: {
  id: string
  title: string
  link?: SectionLink
  meta?: string
  wide?: boolean
  children: ReactNode
}) {
  // numbered by the order in `sections`, which the dock follows too
  const index = sections.findIndex((s) => s.id === id) + 1
  const Arrow = link?.to ? ArrowRight : ArrowUpRight
  const arrow = (
    <Arrow
      aria-hidden
      className="size-3.5 transition-transform duration-200 ease-out group-hover:translate-x-0.5"
    />
  )

  return (
    <section
      id={id}
      aria-labelledby={`${id}-title`}
      className="mt-24 scroll-mt-12 sm:mt-28"
    >
      <ScrollReveal
        y={12}
        blur={6}
        amount={0.15}
        className={cn(wide && "md:-mx-10 lg:-mx-20")}
      >
        <header className="mb-6 flex items-center gap-3 text-[13px]">
          <span
            aria-hidden
            className="bg-card/50 text-muted-foreground grid h-6 min-w-8 place-items-center rounded-full px-2 text-[11px] font-medium tabular-nums"
          >
            {String(index).padStart(2, "0")}
          </span>
          <h2
            id={`${id}-title`}
            className="text-[19px] leading-none font-medium tracking-[-0.025em]"
          >
            {title.split("*").map((part, i) =>
              i % 2 ? (
                <em
                  key={i}
                  className="font-serif font-normal tracking-[-0.01em] italic"
                >
                  {part}
                </em>
              ) : (
                part
              )
            )}
          </h2>

          <span className="ml-auto flex shrink-0 items-center gap-2">
            {meta && (
              <span className="text-muted-foreground tabular-nums">{meta}</span>
            )}
            {link?.to && (
              <Link to={link.to} viewTransition className={linkClass}>
                {link.label}
                {arrow}
              </Link>
            )}
            {link?.href && (
              <a
                href={link.href}
                target="_blank"
                rel="noreferrer"
                className={linkClass}
              >
                {link.label}
                {arrow}
              </a>
            )}
          </span>
        </header>
        {children}
      </ScrollReveal>
    </section>
  )
}
