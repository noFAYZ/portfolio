import { Globe } from "lucide-react"
import { Section } from "@/components/section"
import { experience, profile } from "@/lib/data"
import { useIsDark } from "@/lib/theme"

export function About() {
  const dark = useIsDark()

  return (
    <Section
      id="about"
      title="Where I've *been*"
      link={{ label: "Résumé", href: profile.resume }}
    >
      <ul className="flex flex-col gap-1">
        {experience.map((entry) => (
          <li
            key={entry.place + entry.title}
            className="flex items-center gap-3 py-1.5"
          >
            {entry.logo ? (
              <img
                src={entry.logo}
                alt=""
                className="size-9 shrink-0 rounded-full object-cover"
              />
            ) : (
              <span className="bg-card/50 text-muted-foreground grid size-9 shrink-0 place-items-center rounded-full">
                <Globe aria-hidden className="size-4" />
              </span>
            )}
            <div className="min-w-0 flex-1">
              <p className="truncate text-[14px] font-medium">{entry.place}</p>
              <p className="text-muted-foreground truncate text-[13px]">
                {entry.title}
              </p>
            </div>
            <span className="text-muted-foreground shrink-0 text-[13px] tabular-nums">
              {entry.period}
            </span>
          </li>
        ))}
      </ul>

      <div className="bg-card/50 mt-6 rounded-2xl p-4 sm:p-5">
        <p className="text-muted-foreground mb-3 text-[13px]">
          GitHub activity
        </p>
        {/* color-scheme: normal keeps the embed transparent in dark mode */}
        <iframe
          src={`https://jandi.firejune.io/nofayz?radius=3&margin=2&footer=false&weeks=false&scheme=${dark ? "dark" : "light"}`}
          title="GitHub contribution graph"
          loading="lazy"
          height={80}
          className="w-full [color-scheme:normal]"
        />
      </div>
    </Section>
  )
}
