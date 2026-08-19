import { getBlogs } from "@/lib/api";
import BlogCard from "@/components/BlogCard";
import ErrorToast from "@/components/ErrorToast";

export default async function Blog() {
  const { data: blogData, error } = await getBlogs();
  return (
    <div>
        <h1 className="text-center text-7xl mb-5">blog</h1>
          <ErrorToast message={error ? `Blog: ${error}` : null} />
         <div className="flex flex-wrap justify-center gap-4 py-4">
              {blogData.map((blog,index)=>(
                <BlogCard blog={blog} key={index}/>
              ))}
              </div>
    </div>
  )
}
