import { useState } from "react"
import { ArrowRight, ArrowUpRight, FileText } from "lucide-react"
import { Link } from "react-router"
import { Section } from "@/components/section"
import { posts, type Post } from "@/lib/data"
import { FOCUS_RING, formatMonth } from "@/lib/ui"
import { cn } from "@/lib/utils"

const sorted = [...posts].sort((a, b) => b.date.localeCompare(a.date))

export function Writing() {
  return (
    <Section id="writing">
      <ul className="flex flex-col gap-2">
        {sorted.map((post) => (
          <li key={post.slug}>
            <PostCard post={post} />
          </li>
        ))}
      </ul>
    </Section>
  )
}

/**
 * A post as a card: its cover on the left, which tips and lifts on hover,
 * then when, the title, and a line of what it's about; the arrow fills with
 * ink, as on the project cards. A post written here opens with its cover
 * morphing into the page's header image.
 */
function PostCard({ post }: { post: Post }) {
  // only the clicked card carries the morph name into the transition
  const [morph, setMorph] = useState(false)
  const external = !!post.url
  const Arrow = external ? ArrowUpRight : ArrowRight

  return (
    <Link
      to={post.url ?? `/blog/${post.slug}`}
      target={external ? "_blank" : undefined}
      rel={external ? "noreferrer" : undefined}
      viewTransition={!external}
      onClick={() => setMorph(!external)}
      className={cn(
        "group bg-card/50 hover:bg-card flex items-center gap-4 rounded-2xl p-2 transition-colors duration-200 sm:pr-4",
        FOCUS_RING
      )}
    >
      <span className="bg-muted relative grid aspect-[16/10] w-28 shrink-0 place-items-center overflow-hidden rounded-xl shadow-sm transition-transform duration-500 ease-out group-hover:scale-[1.03] group-hover:-rotate-2 sm:w-40">
        {post.image ? (
          <img
            src={post.image}
            alt=""
            loading="lazy"
            decoding="async"
            style={
              morph
                ? ({
                    viewTransitionName: `cover-${post.slug}`,
                    viewTransitionClass: "cover",
                  } as React.CSSProperties)
                : undefined
            }
            className="size-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-110"
          />
        ) : (
          <FileText aria-hidden className="text-muted-foreground size-5" />
        )}
      </span>

      <span className="min-w-0 flex-1 py-1">
        <span className="text-muted-foreground block text-[12px] tabular-nums">
          {formatMonth(post.date)}
          {post.readingTime && ` · ${post.readingTime} read`}
        </span>
        <span className="mt-1 line-clamp-2 block text-[15px] leading-snug font-medium text-pretty">
          {post.title}
        </span>
        <span className="text-muted-foreground mt-1 hidden truncate text-[13px] sm:block">
          {post.description}
        </span>
      </span>

      <span
        aria-hidden
        className="bg-muted group-hover:bg-foreground group-hover:text-background hidden size-9 shrink-0 place-items-center rounded-full transition-colors duration-300 sm:grid"
      >
        <Arrow
          className={cn(
            "size-4 transition-transform duration-300 ease-out",
            external
              ? "group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              : "-rotate-45 group-hover:rotate-0"
          )}
        />
      </span>
    </Link>
  )
}
