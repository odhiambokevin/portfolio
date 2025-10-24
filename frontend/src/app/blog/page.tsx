import Image from "next/image";
import { blogData } from "@/data/blogs";
import Link from "next/link";
import BlogCard from "@/components/BlogCard";

export default function Blog() {
  return (
    <div>
        <h1 className="text-center text-7xl mb-5">blog</h1>
         <div className="flex flex-wrap justify-center gap-4 py-4">
              {blogData.map((blog,index)=>(
                <BlogCard blog={blog} key={index}/>
              ))}
              </div>
      
    </div>
  )
}
