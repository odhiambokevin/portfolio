import Link from "next/link";
import BlogCard from "@/components/BlogCard";
import { getBlogs } from "@/lib/api";
import ErrorToast from "@/components/ErrorToast";

export default async function Blog() {
  const { data: blogData, error } = await getBlogs();

  return (
    <section id="blog" className="scroll-mt-[120px] py-4 min-h-[100svh] relative">
      <ErrorToast message={error ? `Blog: ${error}` : null} />
      <h1 className="text-5xl text-accent text-center">latest blogs</h1>
      <div className="flex flex-wrap gap-4 justify-center pt-[56px] px-4">
        {blogData.slice(0, 6).map((blog, index) => (
          <BlogCard blog={blog} key={index} />
        ))}
      </div>
      <div className="mt-2 flex justify-center">
        <Link href="blog" className="mt-4 inline-flex items-center px-3 py-2 text-sm font-medium text-muted text-center bg-accent rounded-lg hover:bg-accent/90 focus:ring-4 focus:outline-none focus:ring-accent/60">
          view all
        </Link>
      </div>
    </section>
  );
}