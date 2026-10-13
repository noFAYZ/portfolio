import { useSyncExternalStore } from "react"

// <html data-theme> is the source of truth — index.html sets it before first
// paint, so there is no provider and no flash.
const KEY = "portfolio-theme"
const root = document.documentElement
const isDark = () => root.dataset.theme !== "light"

function apply(dark: boolean) {
  root.dataset.theme = dark ? "dark" : "light"
}

// Another tab switched: follow it, or the two tabs disagree until a reload.
window.addEventListener("storage", (e) => {
  if (e.key === KEY && e.newValue) apply(e.newValue === "dark")
})

const subscribe = (onChange: () => void) => {
  const observer = new MutationObserver(onChange)
  observer.observe(root, { attributeFilter: ["data-theme"] })
  return () => observer.disconnect()
}

export const useIsDark = () => useSyncExternalStore(subscribe, isDark)

function persist(dark: boolean) {
  apply(dark)
  try {
    localStorage.setItem(KEY, dark ? "dark" : "light")
  } catch {
    // private mode — the switch still works for this visit
  }
}

/** Flips the theme, revealing the new one as a circle growing from (x, y). */
export function toggleTheme(x = innerWidth / 2, y = innerHeight) {
  const dark = !isDark()
  if (
    !("startViewTransition" in document) ||
    matchMedia("(prefers-reduced-motion: reduce)").matches
  )
    return persist(dark)

  root.classList.add("theme-vt")
  const transition = document.startViewTransition(() => persist(dark))
  transition.ready
    .then(() => {
      const r = Math.hypot(
        Math.max(x, innerWidth - x),
        Math.max(y, innerHeight - y)
      )
      root.animate(
        {
          clipPath: [
            `circle(0px at ${x}px ${y}px)`,
            `circle(${r}px at ${x}px ${y}px)`,
          ],
        },
        {
          duration: 550,
          easing: "cubic-bezier(0.16, 1, 0.3, 1)",
          pseudoElement: "::view-transition-new(root)",
        }
      )
    })
    .catch(() => {})
  transition.finished.finally(() => root.classList.remove("theme-vt"))
}
