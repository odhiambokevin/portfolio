import { blogData } from "@/data/blogs";

export default async function Page({
  params,
}: {
  params: Promise<{ blogslug: string }>
}) {
  const { blogslug } = await params;
  const { default: Post } = await import(`@/data/markdown/blog/${blogslug}.md`);
  const blog = blogData.find((blog)=> blog.slug === blogslug);
   
  return (
  <div className="h-screen p-2">
    <div className="mb-2">{blog?.title}</div>
    <Post />
  </div>

  )
}