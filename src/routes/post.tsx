import { useEffect, useState } from "react"
import { motion } from "motion/react"
import { ArrowLeft, ArrowRight, Check, Link2 } from "lucide-react"
import { Link, Navigate, useParams } from "react-router"
import { ActionSwapIcon } from "@/components/motion/action-swap"
import { posts, profile, type Post } from "@/lib/data"
import { SPRING_LAYOUT } from "@/lib/ease"
import { FOCUS_RING, formatMonth, scrollToId } from "@/lib/ui"
import { cn } from "@/lib/utils"

const sorted = [...posts].sort((a, b) => b.date.localeCompare(a.date))

const slugify = (text: string) =>
  text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")

const pill = cn(
  "group bg-card/50 text-muted-foreground hover:bg-card hover:text-foreground inline-flex h-8 items-center gap-1.5 rounded-full px-3 text-[13px] transition-[color,background-color,scale] duration-150 active:scale-[0.97]",
  FOCUS_RING
)

/** The heading being read: the last one whose top has passed 30% down the viewport. */
function useActiveHeading(ids: string[]) {
  const [active, setActive] = useState<string | null>(null)
  const key = ids.join(" ")

  useEffect(() => {
    let frame = 0
    const update = () => {
      frame = 0
      let current: string | null = null
      for (const id of key.split(" ")) {
        const top = document.getElementById(id)?.getBoundingClientRect().top
        if (top !== undefined && top <= innerHeight * 0.3) current = id
      }
      setActive(current)
    }
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }
    schedule()
    addEventListener("scroll", schedule, { passive: true })
    return () => {
      cancelAnimationFrame(frame)
      removeEventListener("scroll", schedule)
    }
  }, [key])

  return active
}

/**
 * What search engines and link previews read: title, description, canonical
 * URL, Open Graph and Twitter cards, and BlogPosting structured data. React 19
 * hoists <title>, <meta> and <link> into <head>. The description already
 * exists in index.html, so it's rewritten in place (and put back on leaving)
 * rather than added a second time.
 */
function PostMeta({ post }: { post: Post }) {
  const url = `${profile.url}/blog/${post.slug}`
  const image = post.image && new URL(post.image, profile.url).href
  const title = `${post.title} — ${profile.name}`

  useEffect(() => {
    const tag = document.querySelector<HTMLMetaElement>(
      'meta[name="description"]'
    )
    if (!tag) return
    const before = tag.content
    tag.content = post.description
    return () => {
      tag.content = before
    }
  }, [post.description])

  const ld = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    url,
    mainEntityOfPage: url,
    image: image || undefined,
    author: { "@type": "Person", name: profile.name, url: profile.url },
  }

  return (
    <>
      <title>{title}</title>
      <link rel="canonical" href={url} />
      <meta property="og:type" content="article" />
      <meta property="og:title" content={post.title} />
      <meta property="og:description" content={post.description} />
      <meta property="og:url" content={url} />
      {image && <meta property="og:image" content={image} />}
      <meta property="article:published_time" content={post.date} />
      <meta property="article:author" content={profile.name} />
      <meta
        name="twitter:card"
        content={image ? "summary_large_image" : "summary"}
      />
      <meta name="twitter:title" content={post.title} />
      <meta name="twitter:description" content={post.description} />
      {image && <meta name="twitter:image" content={image} />}
      <script
        type="application/ld+json"
        // "<" escaped, so no string in a post can close the script tag early
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(ld).replace(/</g, "\\u003c"),
        }}
      />
    </>
  )
}

export default function PostPage() {
  const { slug } = useParams()
  const index = sorted.findIndex((p) => p.slug === slug)
  const post = sorted[index]
  const [copied, setCopied] = useState(false)

  const headings = (post?.content ?? [])
    .filter((b): b is string => typeof b === "string" && b.startsWith("## "))
    .map((b) => ({ text: b.slice(3), id: slugify(b.slice(3)) }))
  const active = useActiveHeading(headings.map((h) => h.id))

  if (!post) return <Navigate to="/" replace />

  const neighbours = [
    { post: sorted[index - 1], label: "Newer" },
    { post: sorted[index + 1], label: "Older" },
  ].filter((n) => n.post)

  const copy = () =>
    navigator.clipboard
      ?.writeText(location.href)
      .then(() => {
        setCopied(true)
        setTimeout(() => setCopied(false), 1600)
      })
      .catch(() => {})

  // the lead is the first paragraph; figures are numbered in order
  const lead = post.content?.findIndex(
    (b) => typeof b === "string" && !b.startsWith("## ")
  )
  let figure = 0

  return (
    <main className="pt-24 sm:pt-28">
      <PostMeta post={post} />

      <div className="flex items-center justify-between gap-3">
        <Link to="/#writing" viewTransition className={pill}>
          <ArrowLeft
            aria-hidden
            className="size-3.5 transition-transform duration-200 ease-out group-hover:-translate-x-0.5"
          />
          Writing
        </Link>
        <button type="button" onClick={copy} className={pill}>
          <ActionSwapIcon
            value={copied ? "copied" : "copy"}
            className="size-3.5"
          >
            {copied ? (
              <Check className="size-3.5" />
            ) : (
              <Link2 className="size-3.5" />
            )}
          </ActionSwapIcon>
          {copied ? "Copied" : "Copy link"}
        </button>
        <span className="sr-only" aria-live="polite">
          {copied ? "Link copied" : ""}
        </span>
      </div>

      <article className="mt-7">
        <header>
          <h1 className="text-[clamp(1.625rem,3.8vw,2.125rem)] leading-[1.15] font-semibold tracking-[-0.03em] text-balance">
            {post.title}
          </h1>
          <p className="text-muted-foreground mt-2.5 text-[15px] leading-relaxed text-pretty">
            {post.description}
          </p>
          <div className="text-muted-foreground mt-5 flex flex-wrap items-center gap-x-2 gap-y-1 text-[13px]">
            <img
              src={profile.portrait}
              alt=""
              className="size-6 rounded-full object-cover"
            />
            <span className="text-foreground font-medium">{profile.name}</span>
            <span aria-hidden>·</span>
            <time dateTime={post.date} className="tabular-nums">
              {formatMonth(post.date)}
            </time>
            {post.readingTime && (
              <>
                <span aria-hidden>·</span>
                <span>{post.readingTime} read</span>
              </>
            )}
          </div>
        </header>

        {post.image && (
          <div className="mt-7 md:-mx-10 lg:-mx-20">
            <img
              src={post.image}
              alt={post.title}
              style={
                {
                  viewTransitionName: `cover-${post.slug}`,
                  viewTransitionClass: "cover",
                } as React.CSSProperties
              }
              className="bg-card/50 aspect-video w-full rounded-2xl object-cover object-top"
            />
          </div>
        )}

        <div className="relative mt-10">
          {headings.length > 1 && (
            /*
             * Contents, in the left margin on wide screens, holding beside the
             * text as it scrolls; a marker glides to the section being read.
             */
            <aside className="absolute top-0 right-full mr-28 hidden h-full w-40 xl:block">
              <nav aria-label="Contents" className="sticky top-28">
                <ul className="relative flex flex-col gap-0.5 pl-4 text-[13px]">
                  <span
                    aria-hidden
                    className="bg-border absolute inset-y-1 left-0 w-px"
                  />
                  {headings.map((h) => (
                    <li key={h.id} className="relative">
                      {active === h.id && (
                        <motion.span
                          aria-hidden
                          layoutId="toc-marker"
                          transition={SPRING_LAYOUT}
                          className="bg-foreground absolute inset-y-1 -left-4 w-px"
                        />
                      )}
                      <a
                        href={`#${h.id}`}
                        onClick={(e) => {
                          e.preventDefault()
                          scrollToId(h.id)
                          history.replaceState(null, "", `#${h.id}`)
                        }}
                        aria-current={active === h.id ? "location" : undefined}
                        className={cn(
                          "block rounded py-1 leading-snug transition-colors duration-150",
                          active === h.id
                            ? "text-foreground"
                            : "text-muted-foreground hover:text-foreground",
                          FOCUS_RING
                        )}
                      >
                        {h.text}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            </aside>
          )}

          <div className="text-foreground/80 text-[15.5px] leading-[1.65]">
            {post.content?.length ? (
              post.content.map((block, i) => {
                if (typeof block === "string") {
                  if (block.startsWith("## ")) {
                    const text = block.slice(3)
                    const id = slugify(text)
                    return (
                      <h2
                        key={i}
                        id={id}
                        className="group text-foreground relative mt-9 scroll-mt-24 text-[17.5px] leading-snug font-semibold tracking-[-0.02em]"
                      >
                        <a
                          href={`#${id}`}
                          aria-label={`Link to ${text}`}
                          onClick={(e) => {
                            e.preventDefault()
                            scrollToId(id)
                            history.replaceState(null, "", `#${id}`)
                          }}
                          className={cn(
                            "text-muted-foreground absolute top-0 -left-5 hidden rounded opacity-0 transition-opacity duration-150 group-hover:opacity-100 focus-visible:opacity-100 sm:block",
                            FOCUS_RING
                          )}
                        >
                          #
                        </a>
                        {text}
                      </h2>
                    )
                  }
                  return (
                    <p
                      key={i}
                      className={cn(
                        "mt-4 text-pretty",
                        i === lead && "text-foreground text-[16.5px]",
                        i === 0 && "mt-0"
                      )}
                    >
                      {block}
                    </p>
                  )
                }

                if ("list" in block)
                  return (
                    <ul key={i} className="mt-4 space-y-1.5">
                      {block.list.map((item) => (
                        <li
                          key={item}
                          className="before:bg-muted-foreground relative pl-6 text-pretty before:absolute before:top-[0.82em] before:left-1 before:h-px before:w-2.5"
                        >
                          {item}
                        </li>
                      ))}
                    </ul>
                  )

                // screenshots break out of the text column on wide screens;
                // their captions stay on it
                figure += 1
                return (
                  <figure key={i} className="my-8 md:-mx-10 lg:-mx-20">
                    <img
                      src={block.image}
                      alt={block.caption ?? ""}
                      loading="lazy"
                      decoding="async"
                      className="bg-card/50 w-full rounded-2xl"
                    />
                    {block.caption && (
                      <figcaption className="text-muted-foreground mt-3 flex gap-2 text-[13px] md:px-10 lg:px-20">
                        <span className="text-foreground shrink-0 font-medium tabular-nums">
                          Fig. {figure}
                        </span>
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
        </div>
      </article>

      {/* the sign-off: who wrote it, and the way to reach them */}
      <div className="bg-card/50 mt-12 flex items-center gap-3 rounded-2xl p-3 pr-4">
        <img
          src={profile.portrait}
          alt=""
          className="size-10 rounded-xl object-cover"
        />
        <div className="min-w-0 flex-1">
          <p className="text-[14px] font-medium">{profile.name}</p>
          <p className="text-muted-foreground truncate text-[13px]">
            Thanks for reading.
          </p>
        </div>
        <Link
          to="/#contact"
          viewTransition
          className={cn(
            "group bg-foreground text-background hover:bg-foreground/85 inline-flex h-9 shrink-0 items-center gap-1.5 rounded-full pr-3.5 pl-4 text-[13px] font-medium transition-[background-color,scale] duration-150 active:scale-[0.97]",
            FOCUS_RING
          )}
        >
          Get in touch
          <ArrowRight
            aria-hidden
            className="size-3.5 transition-transform duration-200 ease-out group-hover:translate-x-0.5"
          />
        </Link>
      </div>

      {neighbours.length > 0 && (
        <nav className="mt-3 grid gap-3 sm:grid-cols-2">
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
