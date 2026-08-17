import { Icon } from "@iconify/react"
import { motion } from "motion/react"
import { useMemo, useState } from "react"
import { Link } from "react-router"
import { Button } from "@/components/ui/button"
import { posts } from "@/lib/data"
import { ease, fadeUp } from "@/lib/motion"

const formatDate = (date: string) =>
  new Date(date).toLocaleDateString("en-US", { month: "short", day: "numeric" })

export function Blog() {
  const sorted = useMemo(
    () => [...posts].sort((a, b) => b.date.localeCompare(a.date)),
    []
  )
  const [index, setIndex] = useState(0)

  if (sorted.length === 0) return null

  const post = sorted[index]
  const external = !!post.url

  return (
    <section id="writing" className="mx-auto w-full max-w-2xl px-2 py-6">
      <motion.div {...fadeUp()} className="flex items-center gap-1">
        {sorted.length > 1 && (
          <Button
            size="icon-sm"
            variant="ghost"
            aria-label="Previous post"
            disabled={index === 0}
            onClick={() => setIndex((i) => i - 1)}
          >
            <Icon icon="lucide:chevron-left" className="size-4" />
          </Button>
        )}

        <Link
          to={post.url ?? `/blog/${post.slug}`}
          {...(external ? { target: "_blank", rel: "noreferrer" } : undefined)}
          className="group border-border bg-card hover:border-border focus-visible:ring-ring relative block min-w-0 flex-1 -rotate-1 shadow-sm border p-2 transition-[transform,border-color] duration-100 ease-out hover:rotate-0 focus-visible:ring-2 focus-visible:outline-none"
        >
          {/* a little piece of tape */}
          <span
            aria-hidden
            className="absolute -top-2 left-1/2 h-4 w-14 -translate-x-1/2 rotate-2 rounded-[2px] bg-amber-300/40 ring-1 ring-amber-500/10 dark:bg-amber-200/20"
          />

          <motion.div
            key={index}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25, ease }}
            className="flex gap-3"
          >
            <div className="bg-muted text-muted-foreground/50 grid h-16 w-16 shrink-0 place-items-center overflow-hidden rounded">
              {post.image ? (
                <img
                  src={post.image}
                  alt=""
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-150 ease-out group-hover:scale-105"
                />
              ) : (
                <Icon icon="lucide:file-text" className="h-5 w-5" />
              )}
            </div>

            <div className="min-w-0 flex-1">
              <div className="text-muted-foreground flex items-center gap-1.5 text-[11px]">
                <Icon
                  icon="lucide:pen-line"
                  className="h-3 w-3 text-amber-500"
                />
                {index === 0
                  ? "latest post"
                  : `post ${index + 1}/${sorted.length}`}
                <span className="ml-auto tabular-nums">
                  {formatDate(post.date)}
                  {post.readingTime && ` · ${post.readingTime}`}
                </span>
              </div>

              <p className="mt-1 line-clamp-2 text-sm leading-snug font-medium">
                {post.title}
              </p>

              <span className="text-muted-foreground group-hover:text-foreground mt-1.5 flex items-center gap-1 text-xs transition-colors duration-150">
                read it
                <Icon
                  icon={
                    external ? "lucide:arrow-up-right" : "lucide:arrow-right"
                  }
                  className="h-3 w-3 transition-transform duration-150 ease-out group-hover:translate-x-0.5"
                />
              </span>
            </div>
          </motion.div>
        </Link>

        {sorted.length > 1 && (
          <Button
            size="icon-sm"
            variant="ghost"
            aria-label="Next post"
            disabled={index === sorted.length - 1}
            onClick={() => setIndex((i) => i + 1)}
          >
            <Icon icon="lucide:chevron-right" className="size-4" />
          </Button>
        )}
      </motion.div>
    </section>
  )
}
