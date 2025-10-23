import { blogdata } from "@/data/blogs";
import { mapdata } from "@/data/maps";
import { portfoliodata } from "@/data/portfolio";
import { skilldata } from "@/data/skill";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
   <main className="">
    <section id="home" className="h-[100svh] scroll-mt-[120px] bg-[url(https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/hero/green-gradient-bg.svg)] bg-top bg-no-repeat ">
     
    <div className="grid max-w-screen-xl px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">
        <div className="pt-8 lg:col-span-7">
            <h1 className="max-w-max mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-7xl dark:text-white">geospatial developer<span className="text-accent text-5xl">.</span></h1>
            <p className="max-w-2xl mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-400">hi, i am kevin, a fullstack geospatial developer from kenya. i specialize in <span className="text-accent">GIS</span> apps with secure and automated spatial database design</p>
            <Link href="/#portfolio" className="relative inline-flex items-center justify-center px-5 py-3 mr-3 text-base font-medium text-center text-white rounded-lg bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:focus:ring-primary-900">
                my work
                <span className="absolute top-0 bottom-0 right-0 hover:text-accent w-full flex items-center justify-end"><svg className="w-5 h-5 ml-2 -mr-1 " fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"></path></svg></span>
            </Link>
            <Link href="#contact" className="inline-flex items-center justify-center px-5 py-3 text-base font-medium text-center text-gray-900 border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 dark:text-white dark:border-gray-700 dark:hover:bg-accent/70 dark:focus:ring-accent">
                contact me
            </Link> 
        </div>
        
        <Image src="/images/me.png" alt="mockup" className="object-contain pl-[38%]" fill priority/>              
    </div>

    </section>

    <section id="portfolio" className="h-[100svh] scroll-mt-[120px]">
      <h1>portfolio</h1>
      <div className="flex flex-wrap">
      {portfoliodata.slice(0,6).map((portfolio,index)=>(
        <div key={index}>
          <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
              <Link href="#">
                  <Image className="rounded-t-lg" src={`/images/portfolio/${portfolio.image}`} alt="" width={200} height={200} priority/>
              </Link>
              <div className="p-5">
                  <Link href="#">
                      <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{portfolio.title}</h5>
                  </Link>
                  <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.</p>
                  <Link href="#" className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                      Read more
                      <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
                      </svg>
                  </Link>
              </div>
          </div>
        </div>
      ))}
      </div>
    </section>

    <section id="skill" className="h-[100svh] scroll-mt-[120px]">
      <h1>skills</h1>
       <div className="grid grid-cols-3 gap-4 mx-[40px]">
      {skilldata.slice(0,6).map((skill,index)=>(
        <div key={index} className="transition duration-300 ease-in-out  ">
          <div className="max-w-sm bg-white border border-gray-200 transform hover:-translate-y-1 hover:border-accent hover:shadow-accent hover:shadow-md transition-all duration-300 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
              
              <div className="p-5">
                  <Link href="#">
                      <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{skill.title}</h5>
                  </Link>
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
              <Link href="#">
                  <Image className="rounded-t-lg" src={`/images/map/${map.image}`} alt="" width={200} height={200} priority/>
              </Link>
              <div className="p-5">
                  <Link href="#">
                      <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{map.title}</h5>
                  </Link>
                  <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.</p>
                  <Link href="#" className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                      Read more
                      <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
                      </svg>
                  </Link>
              </div>
          </div>
        </div>
      ))}
      </div>
      <Link href="/map" className="mt-4 mx-auto inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
        view all
      </Link>
    </section>

    <section id="blog" className="h-[100svh] scroll-mt-[120px]">
      <h1>blogs</h1>
      <div className="flex flex-wrap justify-center gap-4 py-4 max-h-max">
      {blogdata.slice(0,6).map((blog,index)=>(
        <div key={index} className="transition duration-300 ease-in-out  hover:scale-105">
          <div className="max-w-sm bg-white border border-gray-200 hover:bg-accent rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
              <Link href="#">
                  <Image className="rounded-t-lg" src={`/images/blog/${blog.image}`} alt="" width={500} height={200} priority/>
              </Link>
              <div className="p-5">
                  <Link href="#">
                      <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{blog.title}</h5>
                  </Link>
                  <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.</p>
                  <Link href="#" className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                      Read more
                      <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
                      </svg>
                  </Link>
              </div>
          </div>
        </div>
      ))}
      </div>
      <Link href="blog" className="mt-4 mx-auto inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
        view all
      </Link>
    </section>
    <section id="contact" className="h-[100svh] scroll-mt-[120px]">
      contact
    </section>
   </main>
  );
}
