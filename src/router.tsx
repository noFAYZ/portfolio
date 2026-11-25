import { Navigate, createBrowserRouter } from "react-router"
import RootLayout from "@/routes/root"
import Home from "@/routes/home"
import PostPage from "@/routes/post"
import Projects from "@/routes/projects"

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: "blog/:slug", element: <PostPage /> },
      { path: "projects", element: <Projects /> },
      { path: "*", element: <Navigate to="/" replace /> },
    ],
  },
])
