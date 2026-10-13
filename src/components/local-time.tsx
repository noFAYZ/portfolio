import { useEffect, useState } from "react"
import { DigitSwap } from "@/components/motion/digit-swap"
import { profile } from "@/lib/data"

const clock = new Intl.DateTimeFormat("en-GB", {
  timeZone: profile.timeZone,
  hour: "2-digit",
  minute: "2-digit",
  timeZoneName: "shortOffset",
})

/** My wall clock — "14:32 GMT+5", the digits rolling as the minute turns. */
export function LocalTime() {
  const [now, setNow] = useState(() => new Date())

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 10_000)
    return () => clearInterval(id)
  }, [])

  const parts = clock.formatToParts(now)
  const part = (type: Intl.DateTimeFormatPartTypes) =>
    parts.find((p) => p.type === type)?.value ?? ""

  return (
    <time
      dateTime={now.toISOString()}
      className="inline-flex items-baseline gap-1.5 tabular-nums"
    >
      <DigitSwap value={`${part("hour")}:${part("minute")}`} />
      <span className="text-muted-foreground">{part("timeZoneName")}</span>
    </time>
  )
}
