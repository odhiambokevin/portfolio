import { blogdata } from "@/data/blogs";
import { mapdata } from "@/data/maps";
import { portfoliodata } from "@/data/portfolio";
import { skilldata } from "@/data/skill";

export default function Home() {
  return (
   <main className="">
    <section id="home" className="h-[100svh] scroll-mt-[120px]">
      hero
    </section>
    <section id="portfolio" className="h-[100svh] scroll-mt-[120px]">
      <h1>portfolio</h1>
      <div className="flex flex-wrap">
      {portfoliodata.slice(0,6).map((portfolio,index)=>(
        <div key={index}>
          <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
              <a href="#">
                  <img className="rounded-t-lg" src="/docs/images/blog/image-1.jpg" alt="" />
              </a>
              <div className="p-5">
                  <a href="#">
                      <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{portfolio.title}</h5>
                  </a>
                  <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.</p>
                  <a href="#" className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                      Read more
                      <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
                      </svg>
                  </a>
              </div>
          </div>
        </div>
      ))}
      </div>
      <a href="#" className="mt-4 mx-auto inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
        view all
      </a>
    </section>

    <section id="skill" className="h-[100svh] scroll-mt-[120px]">
      <h1>skills</h1>
       <div className="grid grid-cols-3 gap-4 mx-[40px]">
      {skilldata.slice(0,6).map((skill,index)=>(
        <div key={index} className="transition duration-300 ease-in-out  ">
          <div className="max-w-sm bg-white border border-gray-200 transform hover:-translate-y-1 hover:border-accent hover:shadow-accent hover:shadow-md transition-all duration-300 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
              <a href="#">
                  <img className="rounded-t-lg" src="/docs/images/blog/image-1.jpg" alt="" />
              </a>
              <div className="p-5">
                  <a href="#">
                      <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{skill.title}</h5>
                  </a>
                  <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{skill.description}</p>
                
              </div>
          </div>
        </div>
      ))}
      </div>
    </section>

    <section id="map" className="h-[100svh] scroll-mt-[120px]">
      <h1> maps</h1>
      <div className="flex flex-wrap">
      {mapdata.slice(0,6).map((map,index)=>(
        <div key={index}>
          <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
              <a href="#">
                  <img className="rounded-t-lg" src="/docs/images/blog/image-1.jpg" alt="" />
              </a>
              <div className="p-5">
                  <a href="#">
                      <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{map.title}</h5>
                  </a>
                  <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.</p>
                  <a href="#" className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                      Read more
                      <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
                      </svg>
                  </a>
              </div>
          </div>
        </div>
      ))}
      </div>
      <a href="#" className="mt-4 mx-auto inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
        view all
      </a>
    </section>

    <section id="blog" className="h-[100svh] scroll-mt-[120px]">
      <h1>blogs</h1>
      <div className="flex flex-wrap justify-center gap-4 py-4">
      {blogdata.slice(0,6).map((blog,index)=>(
        <div key={index} className="transition duration-300 ease-in-out  hover:scale-105">
          <div className="max-w-sm bg-white border border-gray-200 hover:bg-accent rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
              <a href="#">
                  <img className="rounded-t-lg" src="/docs/images/blog/image-1.jpg" alt="" />
              </a>
              <div className="p-5">
                  <a href="#">
                      <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{blog.title}</h5>
                  </a>
                  <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.</p>
                  <a href="#" className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                      Read more
                      <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
                      </svg>
                  </a>
              </div>
          </div>
        </div>
      ))}
      </div>
      <a href="#" className="mt-4 mx-auto inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
        view all
      </a>
    </section>
    <section id="contact" className="h-[100svh] scroll-mt-[120px]">
      contact
    </section>
   </main>
  );
}
