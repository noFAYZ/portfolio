import {
  ArrowUpRight,
  FileText,
  FolderGit2,
  Hash,
  Mail,
  SunMoon,
} from "lucide-react"
import { useLocation, useNavigate } from "react-router"
import {
  CommandPalette,
  type CommandItem,
} from "@/components/motion/command-palette"
import { posts, profile, projects, sections } from "@/lib/data"
import { toggleTheme } from "@/lib/theme"
import { scrollToId } from "@/lib/ui"

const visit = (url: string) => () => window.open(url, "_blank", "noopener")

/** ⌘K: everything on the site, one search away. */
export function CommandMenu({
  open,
  onOpenChange,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
}) {
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const goTo = (id: string) => () =>
    pathname === "/" ? scrollToId(id) : navigate(`/#${id}`)

  const items: CommandItem[] = [
    ...sections.map((s) => ({
      id: `go-${s.id}`,
      label: s.label,
      group: "Go to",
      icon: Hash,
      onSelect: goTo(s.id),
    })),
    ...projects.flatMap((p) => {
      const url = p.liveUrl ?? p.repoUrl
      if (!url) return []
      return [
        {
          id: `project-${p.title}`,
          label: p.title,
          group: "Projects",
          // the stack is searchable — "solidity" finds the dApps
          keywords: p.tags,
          icon: ArrowUpRight,
          badge: (
            <span className="text-muted-foreground text-[12px] tabular-nums">
              {p.date.slice(0, 4)}
            </span>
          ),
          onSelect: visit(url),
        },
      ]
    }),
    ...posts.map((p) => ({
      id: `post-${p.slug}`,
      label: p.title,
      group: "Writing",
      icon: FileText,
      onSelect: p.url
        ? visit(p.url)
        : () => navigate(`/blog/${p.slug}`, { viewTransition: true }),
    })),
    {
      id: "github",
      label: "GitHub",
      group: "Links",
      keywords: ["code", "source"],
      icon: FolderGit2,
      onSelect: visit(profile.github),
    },
    {
      id: "email",
      label: "Email",
      group: "Links",
      keywords: ["contact", "mail", "hire"],
      icon: Mail,
      onSelect: () => location.assign(`mailto:${profile.email}`),
    },
    {
      id: "resume",
      label: "Résumé",
      group: "Links",
      keywords: ["cv", "resume", "pdf"],
      icon: FileText,
      onSelect: visit(profile.resume),
    },
    {
      id: "theme",
      label: "Toggle theme",
      group: "Preferences",
      keywords: ["dark", "light", "mode"],
      icon: SunMoon,
      // let the palette finish leaving, or the reveal paints over its exit
      onSelect: () => setTimeout(() => toggleTheme(), 160),
    },
  ]

  return (
    <CommandPalette
      items={items}
      open={open}
      onOpenChange={onOpenChange}
      placeholder="Search projects, posts, links…"
      emptyMessage="Nothing matches."
    />
  )
}
