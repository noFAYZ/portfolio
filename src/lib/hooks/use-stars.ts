import { useEffect, useState } from "react"

const STARS_KEY = "gh-stars:"
const STARS_TTL = 6 * 60 * 60 * 1000

/** The last count we saw for a repo, and when; null if none or storage is blocked. */
function cachedStars(repo: string): { n: number; at: number } | null {
  try {
    const hit = JSON.parse(localStorage.getItem(STARS_KEY + repo) ?? "null")
    return typeof hit?.n === "number" ? hit : null
  } catch {
    return null
  }
}

/*
 * GitHub's unauthenticated API allows 60 calls an hour per IP, and every
 * reload spent one per repo — so a busy afternoon (or a dev server's hot
 * reloads) hit the limit, got a 403 and the badge silently vanished. Now a
 * count is cached for six hours and shown at once, and when there is nothing
 * cached and GitHub says no, the snapshot in data.ts stands in.
 */
export function useStars(repoUrl?: string, fallback?: number) {
  const repo = repoUrl?.match(/github\.com\/([^/]+\/[^/?#]+)/)?.[1]
  const [stars, setStars] = useState<number | null>(
    () => (repo ? cachedStars(repo)?.n : undefined) ?? fallback ?? null
  )

  useEffect(() => {
    if (!repo) return
    const hit = cachedStars(repo)
    if (hit && Date.now() - hit.at < STARS_TTL) return
    let active = true
    fetch(`https://api.github.com/repos/${repo}`)
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        if (typeof data?.stargazers_count !== "number") return
        try {
          localStorage.setItem(
            STARS_KEY + repo,
            JSON.stringify({ n: data.stargazers_count, at: Date.now() })
          )
        } catch {
          // private mode — this visit still shows the live count
        }
        if (active) setStars(data.stargazers_count)
      })
      .catch(() => {})
    return () => {
      active = false
    }
  }, [repo])

  return stars
}
