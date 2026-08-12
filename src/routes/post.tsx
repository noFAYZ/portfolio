import { Icon } from "@iconify/react"
import { motion } from "motion/react"
import { Link, useParams } from "react-router"
import { Button } from "@/components/ui/button"
import { posts } from "@/lib/data"
import { rise } from "@/lib/motion"

const formatDate = (date: string) =>
  new Date(date).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  })

export default function PostPage() {
  const { slug } = useParams()

  const sorted = [...posts].sort((a, b) => b.date.localeCompare(a.date))
  const index = sorted.findIndex((p) => p.slug === slug)
  const post = sorted[index]

  if (!post) {
    return (
      <div className="bg-background text-foreground grid min-h-screen place-items-center px-6 text-center">
        <div>
          <p className="text-muted-foreground text-sm">
            That post doesn't exist.
          </p>
          <Button size="sm" variant="ghost" render={<Link to="/" />}>
            <Icon icon="lucide:arrow-left" className="size-4" />
            Back home
          </Button>
        </div>
      </div>
    )
  }

  const newer = sorted[index - 1]
  const older = sorted[index + 1]

  return (
    <div className="bg-background text-foreground min-h-screen">
      <motion.article
        {...rise()}
        className="mx-auto w-full max-w-2xl px-6 py-12"
      >
        <Button
          size="sm"
          variant="ghost"
          render={<Link to="/" />}
          className="group/back -ml-2"
        >
          <Icon
            icon="lucide:arrow-left"
            className="size-4 transition-transform duration-150 ease-out group-hover/back:-translate-x-0.5"
          />
          Back
        </Button>

        <div className="text-muted-foreground mt-6 flex items-center gap-2 text-xs tabular-nums">
          <Icon icon="lucide:pen-line" className="h-3 w-3 text-amber-500" />
          <span>{formatDate(post.date)}</span>
          {post.readingTime && (
            <>
              <span className="bg-border h-1 w-1 rounded-full" />
              <span>{post.readingTime} read</span>
            </>
          )}
        </div>

        <h1 className="font-reading mt-2 text-3xl leading-tight font-semibold tracking-tight text-balance sm:text-4xl">
          {post.title}
        </h1>

        <p className="font-reading text-muted-foreground mt-3 text-lg leading-relaxed text-pretty">
          {post.description}
        </p>

        {post.image && (
          <img
            src={post.image}
            alt=""
            className="bg-muted ring-foreground/5 mt-8 w-full rounded-2xl object-cover ring-1 ring-inset"
          />
        )}

        <div className="font-reading mt-10 flex flex-col gap-5 text-[17px] leading-8">
          {post.content?.length ? (
            post.content.map((block, i) => {
              if (typeof block === "string")
                return block.startsWith("## ") ? (
                  <h2
                    key={i}
                    className="font-heading mt-8 text-sm font-semibold tracking-wide uppercase"
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
                  <ul key={i} className="flex flex-col gap-1.5">
                    {block.list.map((item) => (
                      <li key={item} className="flex gap-2.5">
                        <span
                          aria-hidden
                          className="bg-muted-foreground/40 mt-3 h-1 w-1 shrink-0 rounded-full"
                        />
                        <span className="text-pretty">{item}</span>
                      </li>
                    ))}
                  </ul>
                )

              return (
                <figure key={i} className="my-3">
                  <img
                    src={block.image}
                    alt={block.caption ?? ""}
                    loading="lazy"
                    className="bg-muted ring-foreground/5 w-full rounded-xl ring-1 ring-inset"
                  />
                  {block.caption && (
                    <figcaption className="text-muted-foreground font-sans mt-2.5 text-xs">
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

        {(newer || older) && (
          <nav className="border-border/60 mt-12 flex items-stretch gap-3 border-t pt-6">
            {newer && (
              <Link
                to={`/blog/${newer.slug}`}
                className="group hover:bg-muted/50 focus-visible:ring-ring flex-1 rounded-xl px-3 py-2 transition-colors duration-150 focus-visible:ring-2 focus-visible:outline-none"
              >
                <span className="text-muted-foreground flex items-center gap-1 text-[11px]">
                  <Icon
                    icon="lucide:arrow-left"
                    className="h-3 w-3 transition-transform duration-150 ease-out group-hover:-translate-x-0.5"
                  />
                  newer
                </span>
                <span className="mt-0.5 line-clamp-2 block text-xs font-medium">
                  {newer.title}
                </span>
              </Link>
            )}
            {older && (
              <Link
                to={`/blog/${older.slug}`}
                className="group hover:bg-muted/50 focus-visible:ring-ring flex-1 rounded-xl px-3 py-2 text-right transition-colors duration-150 focus-visible:ring-2 focus-visible:outline-none"
              >
                <span className="text-muted-foreground flex items-center justify-end gap-1 text-[11px]">
                  older
                  <Icon
                    icon="lucide:arrow-right"
                    className="h-3 w-3 transition-transform duration-150 ease-out group-hover:translate-x-0.5"
                  />
                </span>
                <span className="mt-0.5 line-clamp-2 block text-xs font-medium">
                  {older.title}
                </span>
              </Link>
            )}
          </nav>
        )}
      </motion.article>
    </div>
  )
}
