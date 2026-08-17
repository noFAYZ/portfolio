import { useState } from "react"
import { Hero } from "@/components/sections/hero"
import { Blog } from "@/components/sections/blog"
import ProjectsV2 from "@/components/sections/projects-v2"
import { Contact } from "@/components/sections/contact"
import { PostDetail } from "@/components/post-detail"

export default function Home() {
  const [openSlug, setOpenSlug] = useState<string | null>(null)

  return (
    <div className="bg-background text-foreground">
      <main className="flex w-full flex-col lg:h-screen lg:flex-row">
        <div className="w-full lg:h-screen lg:w-1/3 lg:overflow-y-auto">
          <Hero />
        </div>

        <div className="flex w-full flex-col lg:h-screen lg:flex-1 lg:overflow-y-auto">
          {openSlug ? (
            <PostDetail
              slug={openSlug}
              onBack={() => setOpenSlug(null)}
              onNavigate={setOpenSlug}
            />
          ) : (
            <>
              <Blog onOpenPost={setOpenSlug} />
              <ProjectsV2 />
              <Contact />
            </>
          )}
        </div>
      </main>
    </div>
  )
}
