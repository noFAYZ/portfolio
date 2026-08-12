import { Outlet, ScrollRestoration } from "react-router"
import { ThemeToggle } from "@/components/theme-toggle"

export default function RootLayout() {
  return (
    <>
      <div className="fixed top-4 right-4 z-40">
        <ThemeToggle />
      </div>
      <ScrollRestoration />
      <Outlet />
    </>
  )
}
