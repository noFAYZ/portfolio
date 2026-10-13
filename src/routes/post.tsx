import { motion, useScroll } from "motion/react"
import { ArrowLeft } from "lucide-react"
import { Link, Navigate, useParams } from "react-router"
import { posts, profile } from "@/lib/data"
import { FOCUS_RING, formatMonth } from "@/lib/ui"
import { cn } from "@/lib/utils"

const sorted = [...posts].sort((a, b) => b.date.localeCompare(a.date))

export default function PostPage() {
  const { slug } = useParams()
  const { scrollYProgress } = useScroll()
  const index = sorted.findIndex((p) => p.slug === slug)
  const post = sorted[index]

  if (!post) return <Navigate to="/" replace />

  const neighbours = [
    { post: sorted[index - 1], label: "Newer" },
    { post: sorted[index + 1], label: "Older" },
  ].filter((n) => n.post)

  return (
    <main className="pt-16 sm:pt-24">
      <title>{`${post.title} — ${profile.name}`}</title>
      {/* ponytail: reading progress in three lines — beUI's needs Lenis */}
      <motion.div
        aria-hidden
        style={{ scaleX: scrollYProgress }}
        className="bg-primary fixed inset-x-0 top-0 z-50 h-0.5 origin-left"
      />

      <Link
        to="/#writing"
        viewTransition
        className={cn(
          "group bg-card/50 text-muted-foreground hover:bg-card hover:text-foreground inline-flex items-center gap-1.5 rounded-full py-1.5 pr-3.5 pl-2.5 text-[13px] transition-colors duration-150",
          FOCUS_RING
        )}
      >
        <ArrowLeft
          aria-hidden
          className="size-3.5 transition-transform duration-200 ease-out group-hover:-translate-x-0.5"
        />
        Writing
      </Link>

      <article>
        <p className="text-muted-foreground mt-10 text-[13px] tabular-nums">
          {formatMonth(post.date)}
          {post.readingTime && ` · ${post.readingTime} read`}
        </p>
        <h1 className="mt-2 text-[clamp(1.75rem,4.4vw,2.5rem)] leading-[1.1] font-medium tracking-[-0.035em] text-balance">
          {post.title}
        </h1>
        <p className="text-muted-foreground mt-4 text-[16px] leading-relaxed text-pretty">
          {post.description}
        </p>

        {post.image && (
          <div className="mt-10 md:-mx-10 lg:-mx-20">
            <img
              src={post.image}
              alt=""
              style={
                {
                  viewTransitionName: `cover-${post.slug}`,
                  viewTransitionClass: "cover",
                } as React.CSSProperties
              }
              className="bg-card/50 aspect-[16/10] w-full rounded-2xl object-cover object-top"
            />
          </div>
        )}

        <div className="text-foreground/85 mt-12 space-y-6 font-serif text-[18px] leading-[1.75]">
          {post.content?.length ? (
            post.content.map((block, i) => {
              if (typeof block === "string")
                return block.startsWith("## ") ? (
                  <h2
                    key={i}
                    className="text-foreground pt-6 font-sans text-[17px] font-medium tracking-tight"
                  >
                    {block.slice(3)}
                  </h2>
                ) : (
                  <p key={i} className="text-pretty">
                    {block}
                  </p>
                )

              if ("list" in block)
                return (
                  <ul
                    key={i}
                    className="marker:text-muted-foreground list-disc space-y-2 pl-5"
                  >
                    {block.list.map((item) => (
                      <li key={item} className="pl-1 text-pretty">
                        {item}
                      </li>
                    ))}
                  </ul>
                )

              // screenshots break out of the text column on wide screens
              return (
                <figure key={i} className="my-12! md:-mx-10 lg:-mx-20">
                  <img
                    src={block.image}
                    alt={block.caption ?? ""}
                    loading="lazy"
                    decoding="async"
                    className="bg-card/50 w-full rounded-2xl"
                  />
                  {block.caption && (
                    <figcaption className="text-muted-foreground mt-3 text-center font-sans text-[13px]">
                      {block.caption}
                    </figcaption>
                  )}
                </figure>
              )
            })
          ) : (
            <p className="text-muted-foreground">
              This one isn't written up yet.
            </p>
          )}
        </div>
      </article>

      {neighbours.length > 0 && (
        <nav className="mt-16 grid gap-3 sm:grid-cols-2">
          {neighbours.map(({ post: n, label }) => (
            <Link
              key={n.slug}
              to={`/blog/${n.slug}`}
              viewTransition
              className={cn(
                "bg-card/50 hover:bg-card rounded-2xl px-5 py-4 transition-colors duration-150",
                FOCUS_RING
              )}
            >
              <span className="text-muted-foreground text-[13px]">{label}</span>
              <span className="mt-1 block text-[14px] font-medium">
                {n.title}
              </span>
            </Link>
          ))}
        </nav>
      )}
    </main>
  )
}
