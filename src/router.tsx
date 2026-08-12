import { createBrowserRouter } from "react-router"
import RootLayout from "@/routes/root"
import Home from "@/routes/home"
import ProjectsPage from "@/routes/projects"
import PostPage from "@/routes/post"

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: "projects", element: <ProjectsPage /> },
      { path: "blog/:slug", element: <PostPage /> },
    ],
  },
])
