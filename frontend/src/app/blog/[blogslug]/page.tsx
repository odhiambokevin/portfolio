export default async function Page({
  params,
}: {
  params: Promise<{ blogslug: string }>
}) {
  const { blogslug } = await params
  const { default: Post } = await import(`@/data/markdown/blog/${blogslug}.md`)
 
  return (
  <div>
    <Post />
  </div>

  )
}