import { ThemeToggle } from "@/components/theme-toggle"
import { Hero } from "@/components/sections/hero"
import { About } from "@/components/sections/about"
import { Education } from "@/components/sections/education"
import { Skills } from "@/components/sections/skills"
import { Projects } from "@/components/sections/projects"
import { Experience } from "@/components/sections/experience"
import { Contact } from "@/components/sections/contact"

export default function Home() {
  return (
    <div className="bg-background text-foreground">
      <div className="fixed top-4 right-4 z-40">
        <ThemeToggle />
      </div>
      <main className="flex w-full flex-col">
        <Hero />
        <Skills />
        <About />
        <Education />
        <Experience />
        <Projects />
        <Contact />
      </main>
    </div>
  )
}
