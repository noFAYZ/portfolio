import { Navigate, createBrowserRouter } from "react-router"
import RootLayout from "@/routes/root"
import Home from "@/routes/home"
import PostPage from "@/routes/post"

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: "blog/:slug", element: <PostPage /> },
      // the old projects page now lives in the home page's work section
      { path: "projects", element: <Navigate to="/#work" replace /> },
      { path: "*", element: <Navigate to="/" replace /> },
    ],
  },
])
