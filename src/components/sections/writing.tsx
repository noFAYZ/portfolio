import { Link } from "react-router"
import { SharedLayoutBg } from "@/components/motion/shared-layout-bg"
import { Section } from "@/components/section"
import { posts } from "@/lib/data"
import { FOCUS_RING, formatMonth } from "@/lib/ui"
import { cn } from "@/lib/utils"

const sorted = [...posts].sort((a, b) => b.date.localeCompare(a.date))

export function Writing() {
  return (
    <Section
      id="writing"
      title="Latest *writing*"
      meta={`${posts.length} post${posts.length === 1 ? "" : "s"}`}
    >
      {/* the text stays on the column edge; the hover pill bleeds past it */}
      <SharedLayoutBg as="ul" inset={12} pillClassName="rounded-xl bg-card">
        {sorted.map((post) => (
          <li key={post.slug}>
            <Link
              to={post.url ?? `/blog/${post.slug}`}
              target={post.url ? "_blank" : undefined}
              rel={post.url ? "noreferrer" : undefined}
              viewTransition
              className={cn(
                "-mx-3 flex items-baseline gap-4 rounded-xl px-3 py-2.5",
                FOCUS_RING
              )}
            >
              <span className="min-w-0 truncate text-[15px] font-medium">
                {post.title}
              </span>
              <span className="text-muted-foreground ml-auto shrink-0 text-[13px] tabular-nums">
                {formatMonth(post.date)}
              </span>
            </Link>
          </li>
        ))}
      </SharedLayoutBg>
    </Section>
  )
}
