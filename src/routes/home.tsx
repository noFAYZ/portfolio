import { Hero } from "@/components/sections/hero"
import { About } from "@/components/sections/about"
import { Details } from "@/components/sections/details"
import { Blog } from "@/components/sections/blog"
import ProjectsV2 from "@/components/sections/projects-v2"
import { Skills } from "@/components/sections/skills"

export default function Home() {
  return (
    <div className="bg-background text-foreground">
      <main className="flex w-full flex-col">
        <Hero />
        <Details />
      
        <About />
            <Skills />
        <Blog />
      
        <ProjectsV2 />
      </main>
    </div>
  )
}
