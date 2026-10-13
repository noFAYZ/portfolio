import { Hero } from "@/components/sections/hero"
import { Work } from "@/components/sections/work"
import { Writing } from "@/components/sections/writing"
import { About } from "@/components/sections/about"
import { Contact } from "@/components/sections/contact"

export default function Home() {
  return (
    <main>
      <Hero />
      <Work />
      <Writing />
      <About />
      <Contact />
    </main>
  )
}
