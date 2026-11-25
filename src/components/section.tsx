import type { ReactNode } from "react"
import { ArrowRight } from "lucide-react"
import { Link } from "react-router"
import { ScrollReveal } from "@/components/motion/scroll-reveal"
import { sections } from "@/lib/data"
import { FOCUS_RING } from "@/lib/ui"
import { cn } from "@/lib/utils"

/**
 * A home section in a frame: a hairline on all four sides, its one-word name
 * in a tab rising out of the middle of the top edge, and — when there's
 * somewhere further to go — a link dropping out of the bottom edge the same
 * way. `wide` lets the frame break out of the column like the work grid.
 */
export function Section({
  id,
  link,
  wide,
  children,
}: {
  id: string
  /** a page on this site, e.g. { label: "All projects", to: "/projects" } */
  link?: { label: string; to: string }
  wide?: boolean
  children: ReactNode
}) {
  // the name is the dock's label for it: one word
  const label = sections.find((s) => s.id === id)?.label ?? id

  return (
    <section
      id={id}
      aria-labelledby={`${id}-title`}
      className="mt-20 scroll-mt-24 sm:mt-24"
    >
      <ScrollReveal
        y={12}
        blur={6}
        amount={0.15}
        className={cn(wide && "md:-mx-10 lg:-mx-20")}
      >
        <div className="border-border relative rounded-[28px] border px-3 pt-6 pb-3 sm:px-4 sm:pb-4">
          <Tab side="top">
            <h2 id={`${id}-title`} className="text-[13px] font-medium">
              {label}
            </h2>
          </Tab>

          {children}

          {link && (
            <Tab side="bottom">
              <Link
                to={link.to}
                viewTransition
                className={cn(
                  "group text-muted-foreground hover:text-foreground inline-flex items-center gap-1 rounded-full text-[13px] transition-colors duration-150",
                  FOCUS_RING
                )}
              >
                {link.label}
                <ArrowRight
                  aria-hidden
                  className="size-3.5 transition-transform duration-200 ease-out group-hover:translate-x-0.5"
                />
              </Link>
            </Tab>
          )}
        </div>
      </ScrollReveal>
    </section>
  )
}

/**
 * A tab grown out of the frame's edge: concave fillets join it to the line,
 * which runs on up its sides and over its rounded end. Filled with the page's
 * background so the frame's own line doesn't show through beneath it. Placed
 * against the padding edge, which is where the 1px border's inner side is.
 */
function Tab({
  side,
  children,
}: {
  side: "top" | "bottom"
  children: ReactNode
}) {
  const top = side === "top"
  return (
    <div
      className={cn(
        "absolute left-1/2 z-10 flex -translate-x-1/2",
        top ? "bottom-full items-end" : "top-full items-start"
      )}
    >
      <Fillet className={top ? undefined : "-scale-y-100"} />
      <div className="bg-background relative flex h-8 items-center px-3.5">
        <span
          aria-hidden
          className={cn(
            "border-border pointer-events-none absolute inset-x-0 border",
            top
              ? "top-0 bottom-[13px] rounded-t-[14px] border-b-0"
              : "top-[13px] bottom-0 rounded-b-[14px] border-t-0"
          )}
        />
        <div className="relative">{children}</div>
      </div>
      <Fillet className={top ? "-scale-x-100" : "-scale-x-100 -scale-y-100"} />
    </div>
  )
}

/** The left fillet of a top tab; mirrored for the others. */
function Fillet({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 13 13"
      className={cn("size-[13px] shrink-0 overflow-visible", className)}
    >
      <path
        d="M0 13V12.5A13.5 13.5 0 0 0 13.5 -1V13Z"
        className="fill-background"
      />
      <path
        d="M0 12.5A13.5 13.5 0 0 0 13.5 -1"
        className="stroke-border fill-none"
      />
    </svg>
  )
}
