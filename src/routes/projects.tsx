import { Icon } from "@iconify/react"
import { motion } from "motion/react"
import { Link } from "react-router"
import { Button } from "@/components/ui/button"
import { ProjectRow } from "@/components/sections/projects-v2"
import { projects } from "@/lib/data"
import { rise } from "@/lib/motion"

export default function ProjectsPage() {
  const all = [...projects].sort((a, b) =>
    (b.date ?? "").localeCompare(a.date ?? "")
  )

  return (
    <div className="bg-background text-foreground min-h-screen">
      <main className="mx-auto flex w-full max-w-5xl flex-col gap-14 px-4 py-12 sm:px-8">
        <motion.div {...rise()}>
          <Button
            size="sm"
            variant="ghost"
            render={<Link to="/" />}
            className="group/back -ml-2"
          >
            <Icon
              icon="lucide:arrow-left"
              className="transition-transform duration-150 ease-out group-hover/back:-translate-x-0.5"
            />
            Back
          </Button>

          <h1 className="font-heading mt-4 text-2xl font-semibold tracking-tight">
            All projects
          </h1>
          <p className="text-muted-foreground mt-1 text-sm">
            {all.length} things I've designed, built and shipped.
          </p>
        </motion.div>

        {all.map((project, i) => (
          <ProjectRow key={project.title} project={project} index={i} />
        ))}
      </main>
    </div>
  )
}
