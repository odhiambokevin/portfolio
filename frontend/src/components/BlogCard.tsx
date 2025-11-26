import { BlogType } from "@/lib/types/Blog.types"
import Link from "next/link";
import Image from "next/image";

export default function BlogCard({blog}:{blog:BlogType}) {
  return (
        <div className="group basis-xl transition-all duration-100 ease-in-out hover:border-accent hover:shadow-accent hover:shadow-sm max-w-sm flex flex-col border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700"> 
            
            <Image className="rounded-t-lg h-[250px] object-cover" src={`/images/blog/${blog.image}`} alt="" width={400} height={200} priority/>
          
            <div className="p-5 flex flex-col">
                <Link href={`blog/${blog.slug}`}>
                    <h5 className="mb-2 text-[20px] font-medium tracking-tight group-hover:text-accent">{blog.title}</h5>
                </Link>
                <p className="mb-3 font-normal text-text-mild">{blog.subtitle}</p>
                <Link href={`blog/${blog.slug}`} className="w-fit text-muted inline-flex items-center px-3 py-2 text-sm font-medium text-center bg-accent/80 rounded-lg hover:bg-accent group-hover:bg-text-mild focus:ring-4 focus:outline-none focus:ring-slate-300">
                    read more
                    <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
                    </svg>
                </Link>
            </div>
        </div>
   
  )
}
