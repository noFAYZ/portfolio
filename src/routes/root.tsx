import { useState } from "react"
import { MotionConfig } from "motion/react"
import { Outlet, ScrollRestoration } from "react-router"
import { CommandMenu } from "@/components/command-menu"
import { Dock } from "@/components/dock"
import { LocalTime } from "@/components/local-time"
import { profile } from "@/lib/data"

const year = new Date().getFullYear()

export default function RootLayout() {
  const [commandOpen, setCommandOpen] = useState(false)

  return (
    <MotionConfig reducedMotion="user">
      {/* one narrow column; the bottom padding keeps the footer clear of the dock */}
      <div className="mx-auto max-w-[640px] px-5 pb-32">
        <Outlet />

        <footer className="text-muted-foreground mt-20 flex flex-wrap items-center justify-between gap-2 text-[13px]">
          <span>
            © {year} {profile.name}
          </span>
          <span className="inline-flex items-baseline gap-1.5">
            {profile.location} <LocalTime />
          </span>
        </footer>
      </div>

      <Dock onCommand={() => setCommandOpen(true)} />
      <CommandMenu open={commandOpen} onOpenChange={setCommandOpen} />
      <ScrollRestoration />
    </MotionConfig>
  )
}
