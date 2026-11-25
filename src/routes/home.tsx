import { Hero } from "@/components/sections/hero"
import { Work } from "@/components/sections/work"
import { Writing } from "@/components/sections/writing"
import { Contact } from "@/components/sections/contact"

export default function Home() {
  return (
    <main>
      <Hero />
      <Work />
      <Writing />
      <Contact />
    </main>
  )
}
