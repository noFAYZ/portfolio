// One curve and one timing for every entrance on the site: quick off the mark,
// long liquid settle. Import these instead of hand-writing transitions.
export const ease: [number, number, number, number] = [0.22, 1, 0.36, 1]

export const duration = 0.45
export const stagger = 0.06

/** Sections and anything that should animate when it scrolls into view. */
export const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 14 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-12% 0px" },
  transition: { duration, delay, ease },
})

/** Above-the-fold content and anything inside a dialog — no scroll trigger. */
export const rise = (delay = 0) => ({
  initial: { opacity: 0, y: 14 },
  animate: { opacity: 1, y: 0 },
  transition: { duration, delay, ease },
})
