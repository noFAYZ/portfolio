import { useNavigate, useParams } from "react-router"
import { PostDetail } from "@/components/post-detail"

export default function PostPage() {
  const { slug } = useParams()
  const navigate = useNavigate()

  return (
    <div className="bg-background text-foreground min-h-screen">
      <PostDetail
        slug={slug ?? ""}
        onBack={() => navigate("/")}
        onNavigate={(s) => navigate(`/blog/${s}`)}
      />
    </div>
  )
}
