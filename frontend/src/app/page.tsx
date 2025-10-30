import BlogCard from "@/components/BlogCard";
import { blogData } from "@/data/blogs";
import { mapData } from "@/data/maps";
import { portfolioData } from "@/data/portfolio";
import { skillData } from "@/data/skill";
import Image from "next/image";
import Link from "next/link";
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { experienceData } from "@/data/experience";

export default function Home() {
  
  return (
   <main className="">
    <section id="home" className="flex h-[100svh] scroll-mt-[120px] bg-[url(https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/hero/green-gradient-bg.svg)] bg-top bg-no-repeat text-center">
      <div className="grid max-w-screen-xl px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16">
          <div className="relative z-2 pt-8">
              <h1 className="max-w-max mb-4 text-4xl font-extrabold tracking-none leading-none md:text-5xl xl:text-6xl">geospatial developer<span className="text-accent text-5xl text-accent">.</span></h1>
              <p className="max-w-2xl mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl">hi, i&apos;m kevin, a fullstack geospatial developer from kenya. i specialize in <span className="text-accent">GIS</span> apps with secure and automated spatial database design</p>
              <Link href="/#portfolio" className="relative inline-flex items-center justify-center px-5 py-3 mr-3 text-base font-medium text-center rounded-lg bg-primary-700 hover:bg-primary-800 focus:ring-1 focus:ring-accent/60">
                  my work
                  <span className="absolute top-0 bottom-0 right-0 hover:text-accent w-full flex items-center justify-end"><svg className="w-5 h-3.5 ml-2 -mr- " fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"></path></svg></span>
              </Link>
              <Link href="#contact" className="inline-flex items-center justify-center px-5 py-3 text-base font-medium text-center border border-gray-400 rounded-lg hover:bg-accent focus:ring-4 focus:ring-accent/60">
                  contact me
              </Link> 
          </div>
          
          
      </div>
      <Image src="/images/me.png" alt="mockup" className="relative z-[1] h-[700px] object-contain mt-[-40px]" width={700} height={200} priority/>              
    </section>

    <section id="portfolio" className="h-[100svh] scroll-mt-[120px] py-4">
      <h1 className="text-center text-5xl text-accent">portfolio</h1>
      <div className="flex flex-wrap pt-[56px]">
      {portfolioData.slice(0,6).map((portfolio,index)=>(
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
                  <Link href="#" className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-accent/60">
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

    <section id="skill" className="h-[100svh] scroll-mt-[120px] py-4">
      <h1 className="text-center text-5xl text-accent">skills</h1>
      <div className="flex flex-wrap gap-8 mx-[40px] pt-[56px]">
      {skillData.slice(0,6).map((skill,index)=>(
        <div key={index} className="basis-sm transition duration-300 ease-in-out  ">
          <div className="max-w-sm bg-white border border-gray-200 transform hover:-translate-y-1 hover:border-accent hover:shadow-accent hover:shadow-md transition-all duration-300 rounded-lg shadow-sm">
              <div className="p-5">
                  
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{skill.title}</h5>
                
                  <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{skill.description}</p>
                
              </div>
          </div>
        </div>
      ))}
      </div>
    </section>

    <section id="experience" className="h-[100svh] scroll-mt-[120px] py-4">
      <h1 className=" text-center text-5xl text-accent">experience</h1>
       <div className="grid grid-cols-3 gap-4 pt-[56px] mx-[40px]">
     
        <div className='w-full max-w-md'>
      <Tabs defaultValue='yaspi' className='flex-row'>
        <TabsList className='bg-background h-full flex-col rounded-none p-0'>
          {experienceData.map(experience => (
            <TabsTrigger
              key={experience.id}
              value={experience.company}
              className='bg-background data-[state=active]:border-primary dark:data-[state=active]:border-primary h-full w-full justify-start rounded-none border-0 border-l-2 border-transparent data-[state=active]:shadow-none'
            >
              {experience.company}
            </TabsTrigger>
          ))}
        </TabsList>

        {experienceData.map(experience => (
          <TabsContent key={experience.id} value={experience.company}>
            <div>
              <h1>{experience.role}</h1>
              <div className="flex gap-4 items-center">
               <p className='text-muted-foreground text-sm'>{experience.startPeriod}</p> - <p className='text-muted-foreground text-sm'>{experience.endPeriod}</p>

              </div>

            </div>
            
          </TabsContent>
        ))}
      </Tabs>
    </div>

      
      </div>
    </section>

    <section id="map" className="h-[100svh] scroll-mt-[120px] py-4">
      <h1 className="text-center text-5xl text-accent"> maps</h1>
      <div className="flex flex-wrap pt-[56px]">
      {mapData.slice(0,6).map((map,index)=>(
       
          <div key={index} className="max-w-sm bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
              <Link href="#">
                  <Image className="rounded-t-lg" src={`/images/map/${map.image}`} alt="" width={200} height={200} priority/>
              </Link>
              <div className="p-5">
                  <Link href="#">
                      <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{map.title}</h5>
                  </Link>
                  <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.</p>
                  <Link href="#" className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-accent/60">
                      Read more
                      <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
                      </svg>
                  </Link>
              </div>
          </div>
      
      ))}
      </div>
      <Link href="/map" className="mt-4 mx-auto inline-flex items-center px-3 py-2 text-sm font-medium text-center bg-accent rounded-lg hover:bg-accent/90 focus:ring-4 focus:outline-none focus:ring-accent/60">
        view all
      </Link>
    </section>

    <section id="blog" className="scroll-mt-[120px] py-4">
      <h1 className="text-5xl text-accent text-center">latest blogs</h1>
      <div className="flex flex-wrap gap-4 justify-center pt-[56px]">
      {blogData.slice(0,6).map((blog,index)=>(
        <BlogCard blog={blog} key={index}/>
      ))}
      </div>
      <div className="mx-auto">
      <Link href="blog" className="mt-4 inline-flex items-center px-3 py-2 text-sm font-medium text-center bg-accent rounded-lg hover:bg-accent/90 focus:ring-4 focus:outline-none focus:ring-accent/60">
        view all
      </Link>
      </div>
    </section>

    <section id="contact" className="h-[100svh] scroll-mt-[100px] py-4">
      <div className="text-center text-5xl text-accent">contact</div>
      <div className="grid lg:grid-cols-2 items-start gap-16 pt-[56px] mx-auto max-w-5xl max-lg:max-w-2xl">
      <div>
        <h2 className="text-text-mild text-3xl font-bold">Let&apos;s Talk</h2>
        <p className="text-[15px] text-slate-600 mt-4 leading-relaxed">Have some big idea or brand to develop and need help? Then reach out we&apos;d love to hear about your project  and provide help.</p>
        <div className="mt-12">
          <h2 className="text-text-mild text-base font-semibold">email</h2>
          <ul className="mt-4">
            <li className="flex items-center">
              <div className="bg-[#e6e6e6cf] h-10 w-10 rounded-full flex items-center justify-center shrink-0">
                <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" fill='#000'
                  viewBox="0 0 479.058 479.058">
                  <path
                    d="M434.146 59.882H44.912C20.146 59.882 0 80.028 0 104.794v269.47c0 24.766 20.146 44.912 44.912 44.912h389.234c24.766 0 44.912-20.146 44.912-44.912v-269.47c0-24.766-20.146-44.912-44.912-44.912zm0 29.941c2.034 0 3.969.422 5.738 1.159L239.529 264.631 39.173 90.982a14.902 14.902 0 0 1 5.738-1.159zm0 299.411H44.912c-8.26 0-14.971-6.71-14.971-14.971V122.615l199.778 173.141c2.822 2.441 6.316 3.655 9.81 3.655s6.988-1.213 9.81-3.655l199.778-173.141v251.649c-.001 8.26-6.711 14.97-14.971 14.97z"
                    data-original="#000000" />
                </svg>
              </div>
              <a href="javascript:void(0)" className="text-sm ml-4">
                <small className="block text-slate-900">Mail</small>
                <span className="font-light text-accent">odhiambosiaya@proton.me</span>
              </a>
            </li>
          </ul>
        </div>

        <div className="mt-12">
          <h2 className="text-slate-900 text-base font-semibold">Socials</h2>
          <ul className="flex mt-4 space-x-4">
            <li className="bg-[#e6e6e6cf] h-10 w-10 rounded-full flex items-center justify-center shrink-0">
              <a href="javascript:void(0)">
                <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" fill='#000'
                  viewBox="0 0 24 24">
                  <path
                    d="M6.812 13.937H9.33v9.312c0 .414.335.75.75.75l4.007.001a.75.75 0 0 0 .75-.75v-9.312h2.387a.75.75 0 0 0 .744-.657l.498-4a.75.75 0 0 0-.744-.843h-2.885c.113-2.471-.435-3.202 1.172-3.202 1.088-.13 2.804.421 2.804-.75V.909a.75.75 0 0 0-.648-.743A26.926 26.926 0 0 0 15.071 0c-7.01 0-5.567 7.772-5.74 8.437H6.812a.75.75 0 0 0-.75.75v4c0 .414.336.75.75.75zm.75-3.999h2.518a.75.75 0 0 0 .75-.75V6.037c0-2.883 1.545-4.536 4.24-4.536.878 0 1.686.043 2.242.087v2.149c-.402.205-3.976-.884-3.976 2.697v2.755c0 .414.336.75.75.75h2.786l-.312 2.5h-2.474a.75.75 0 0 0-.75.75V22.5h-2.505v-9.312a.75.75 0 0 0-.75-.75H7.562z"
                    data-original="#000000" />
                </svg>
              </a>
            </li>
            <li className="bg-[#e6e6e6cf] h-10 w-10 rounded-full flex items-center justify-center shrink-0">
              <a href="javascript:void(0)">
                <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" fill='#000'
                  viewBox="0 0 511 512">
                  <path
                    d="M111.898 160.664H15.5c-8.285 0-15 6.719-15 15V497c0 8.285 6.715 15 15 15h96.398c8.286 0 15-6.715 15-15V175.664c0-8.281-6.714-15-15-15zM96.898 482H30.5V190.664h66.398zM63.703 0C28.852 0 .5 28.352.5 63.195c0 34.852 28.352 63.2 63.203 63.2 34.848 0 63.195-28.352 63.195-63.2C126.898 28.352 98.551 0 63.703 0zm0 96.395c-18.308 0-33.203-14.891-33.203-33.2C30.5 44.891 45.395 30 63.703 30c18.305 0 33.195 14.89 33.195 33.195 0 18.309-14.89 33.2-33.195 33.2zm289.207 62.148c-22.8 0-45.273 5.496-65.398 15.777-.684-7.652-7.11-13.656-14.942-13.656h-96.406c-8.281 0-15 6.719-15 15V497c0 8.285 6.719 15 15 15h96.406c8.285 0 15-6.715 15-15V320.266c0-22.735 18.5-41.23 41.235-41.23 22.734 0 41.226 18.495 41.226 41.23V497c0 8.285 6.719 15 15 15h96.403c8.285 0 15-6.715 15-15V302.066c0-79.14-64.383-143.523-143.524-143.523zM466.434 482h-66.399V320.266c0-39.278-31.953-71.23-71.226-71.23-39.282 0-71.239 31.952-71.239 71.23V482h-66.402V190.664h66.402v11.082c0 5.77 3.309 11.027 8.512 13.524a15.01 15.01 0 0 0 15.875-1.82c20.313-16.294 44.852-24.907 70.953-24.907 62.598 0 113.524 50.926 113.524 113.523zm0 0"
                    data-original="#000000" />
                </svg>
              </a>
            </li>
            <li className="bg-[#e6e6e6cf] h-10 w-10 rounded-full flex items-center justify-center shrink-0">
              <a href="javascript:void(0)">
                <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" fill='#000'
                  viewBox="0 0 24 24">
                  <path
                    d="M12 9.3a2.7 2.7 0 1 0 0 5.4 2.7 2.7 0 0 0 0-5.4Zm0-1.8a4.5 4.5 0 1 1 0 9 4.5 4.5 0 0 1 0-9Zm5.85-.225a1.125 1.125 0 1 1-2.25 0 1.125 1.125 0 0 1 2.25 0ZM12 4.8c-2.227 0-2.59.006-3.626.052-.706.034-1.18.128-1.618.299a2.59 2.59 0 0 0-.972.633 2.601 2.601 0 0 0-.634.972c-.17.44-.265.913-.298 1.618C4.805 9.367 4.8 9.714 4.8 12c0 2.227.006 2.59.052 3.626.034.705.128 1.18.298 1.617.153.392.333.674.632.972.303.303.585.484.972.633.445.172.918.267 1.62.3.993.047 1.34.052 3.626.052 2.227 0 2.59-.006 3.626-.052.704-.034 1.178-.128 1.617-.298.39-.152.674-.333.972-.632.304-.303.485-.585.634-.972.171-.444.266-.918.299-1.62.047-.993.052-1.34.052-3.626 0-2.227-.006-2.59-.052-3.626-.034-.704-.128-1.18-.299-1.618a2.619 2.619 0 0 0-.633-.972 2.595 2.595 0 0 0-.972-.634c-.44-.17-.914-.265-1.618-.298-.993-.047-1.34-.052-3.626-.052ZM12 3c2.445 0 2.75.009 3.71.054.958.045 1.61.195 2.185.419A4.388 4.388 0 0 1 19.49 4.51c.457.45.812.994 1.038 1.595.222.573.373 1.227.418 2.185.042.96.054 1.265.054 3.71 0 2.445-.009 2.75-.054 3.71-.045.958-.196 1.61-.419 2.185a4.395 4.395 0 0 1-1.037 1.595 4.44 4.44 0 0 1-1.595 1.038c-.573.222-1.227.373-2.185.418-.96.042-1.265.054-3.71.054-2.445 0-2.75-.009-3.71-.054-.958-.045-1.61-.196-2.185-.419A4.402 4.402 0 0 1 4.51 19.49a4.414 4.414 0 0 1-1.037-1.595c-.224-.573-.374-1.227-.419-2.185C3.012 14.75 3 14.445 3 12c0-2.445.009-2.75.054-3.71s.195-1.61.419-2.185A4.392 4.392 0 0 1 4.51 4.51c.45-.458.994-.812 1.595-1.037.574-.224 1.226-.374 2.185-.419C9.25 3.012 9.555 3 12 3Z">
                  </path>
                </svg>
              </a>
            </li>
          </ul>
        </div>
      </div>

      <form className="lg:ml-auto space-y-4">
        <input type='text' placeholder='Name'
          className="w-full rounded-md py-3 px-4 bg-slate-100 text-slate-900 text-sm border border-gray-200 focus:border-slate-900 outline-none focus:bg-transparent" />
        <input type='email' placeholder='Email'
          className="w-full rounded-md py-3 px-4 bg-slate-100 text-slate-900 text-sm border border-gray-200 focus:border-slate-900 outline-none focus:bg-transparent" />
        <input type='text' placeholder='Subject'
          className="w-full rounded-md py-3 px-4 bg-slate-100 text-slate-900 text-sm border border-gray-200 focus:border-slate-900 outline-none focus:bg-transparent" />
        <textarea placeholder='Message' rows={6}
          className="w-full rounded-md px-4 bg-slate-100 text-slate-900 text-sm pt-3 border border-gray-200 focus:border-slate-900 outline-none focus:bg-transparent"></textarea>
        <button type='button'
          className="text-white bg-accent/90 hover:bg-accent tracking-wide rounded-md text-sm font-medium px-4 py-3 w-full cursor-pointer !mt-2 border-0">Send message</button>
      </form>
    </div>
    </section>

   </main>
  );
}
