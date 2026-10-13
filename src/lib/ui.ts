// lib/utils.ts is owned by beUI (`shadcn add` rewrites it), so site helpers live here.

/** The one focus ring. Never inline a variation of it. */
export const FOCUS_RING =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
/** For elements flush inside a container, where an outset ring would be clipped. */
export const FOCUS_RING_INSET =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring"

export function scrollToId(id: string) {
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches
  document
    .getElementById(id)
    ?.scrollIntoView({ behavior: reduce ? "auto" : "smooth" })
}

/** "2026-08-13" → "Aug 2026" — read as UTC so it never slips a day. */
export const formatMonth = (date: string) =>
  new Date(date).toLocaleDateString("en-US", {
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  })
