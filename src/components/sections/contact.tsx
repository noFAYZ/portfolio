import { useState } from "react"
import { ArrowUpRight, Check, Copy } from "lucide-react"
import { ActionSwapBlurButton } from "@/components/motion/action-swap-blur"
import { ScrollReveal } from "@/components/motion/scroll-reveal"
import { profile } from "@/lib/data"
import { FOCUS_RING } from "@/lib/ui"
import { cn } from "@/lib/utils"

const copyStates = [
  {
    id: "copy",
    label: "Copy",
    icon: <Copy className="size-3.5" />,
    ariaLabel: "Copy email address",
  },
  {
    id: "copied",
    label: "Copied",
    icon: <Check className="size-3.5" />,
    ariaLabel: "Email address copied",
  },
]

const pill =
  "inline-flex h-9 items-center gap-1.5 rounded-full bg-(--pastel-bg) px-4 text-[13px] font-medium text-(--pastel-ink) transition-[background-color,scale] duration-150 hover:bg-(--pastel-edge) active:scale-[0.97]"

/** The closing card, in the same shell as the work cards: actions in the panel, words below. */
export function Contact() {
  const [copied, setCopied] = useState(false)

  const copy = () =>
    navigator.clipboard
      ?.writeText(profile.email)
      .then(() => {
        setCopied(true)
        setTimeout(() => setCopied(false), 1600)
      })
      .catch(() => {})

  return (
    <section
      id="contact"
      aria-label="Contact"
      className="mt-20 scroll-mt-24 sm:mt-24"
    >
      <ScrollReveal y={12} blur={6}>
        <div className="pastel tone-lilac rounded-2xl bg-(--pastel-bg) p-2 ring-1 ring-(--pastel-edge) ring-inset">
          <div className="flex flex-col items-center gap-5 rounded-xl bg-(--panel) px-5 py-10 text-center ring-1 ring-(--panel-edge) ring-inset">
            <a
              href={`mailto:${profile.email}`}
              className={cn(
                "rounded-md text-[clamp(1.375rem,4vw,1.875rem)] font-semibold tracking-tight text-(--pastel-ink) underline decoration-(--pastel-edge) decoration-2 underline-offset-[6px] transition-colors duration-150 hover:decoration-(--pastel-ink)",
                FOCUS_RING
              )}
            >
              {profile.email}
            </a>
            <div className="flex flex-wrap items-center justify-center gap-2">
              <ActionSwapBlurButton
                items={copyStates}
                value={copied ? "copied" : "copy"}
                cycle={false}
                onClick={copy}
                // stays as wide as "Copied", so the swap never resizes it
                className={cn(
                  pill,
                  "min-w-[6.5rem] justify-center border-0",
                  FOCUS_RING
                )}
              />
              {[
                ["GitHub", profile.github],
                ["Résumé", profile.resume],
              ].map(([label, href]) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  className={cn(pill, "group", FOCUS_RING)}
                >
                  {label}
                  <ArrowUpRight
                    aria-hidden
                    className="size-3.5 transition-transform duration-200 ease-out group-hover:translate-x-px group-hover:-translate-y-px"
                  />
                </a>
              ))}
            </div>
            <span className="sr-only" aria-live="polite">
              {copied ? "Email address copied" : ""}
            </span>
          </div>

          <div className="px-3 pt-4 pb-3">
            <p className="text-[clamp(1.25rem,3vw,1.5rem)] leading-tight font-semibold tracking-[-0.02em] text-(--pastel-ink)">
              Have an idea?{" "}
              <span className="font-serif font-normal italic">
                Let's build it.
              </span>
            </p>
            <p className="mt-1 text-[13.5px] leading-snug text-pretty text-(--pastel-soft)">
              Open to new projects, tricky features, and Web3 systems that need
              to actually hold up.
            </p>
          </div>
        </div>
      </ScrollReveal>
    </section>
  )
}
