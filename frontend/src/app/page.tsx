"use client"
import axios from 'axios';
import BlogCard from "@/components/BlogCard";
import { blogData } from "@/data/blogs";
import { mapData } from "@/data/maps";
import { portfolioData } from "@/data/portfolio";
import { skillData } from "@/data/skill";
import Image from "next/image";
import Link from "next/link";
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { experienceData } from "@/data/experience";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as yup from "yup";
import { useState } from "react";
import { backendUrl } from '@/lib/constants';


export default function Home() {
  const formData = {'name':'','email':'','subject':'','message':''};
  const sleep = (ms:number) => new Promise(r => setTimeout(r, ms));
  const [errormsg, setErrorMsg] = useState('');
  const submitSchema = yup.object().shape({
    name: yup.string().required("your name goes here 😊"),
    email: yup.string().email("invalid email").required("you know the drill.."),
   
  });

  const handleSubmit = async (values: typeof formData)=>{
    const { email, subject, name, message } = values;

    fetch(`${backendUrl}/api/feedback/`, {
        method: "POST",
        headers: {
          Accept: "application/json, text/plain, */*",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, subject, name, message }),
      }).then((res) => {
        console.log("Response received");
        if (res.status === 200) {
          console.log("Response succeeded!");
        }
      });
  }

  
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

    {/* <section id="portfolio" className="h-[100svh] scroll-mt-[120px] py-4">
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
    </section> */}
  <section id="portfolio" className="h-[100svh] scroll-mt-[120px] py-4">
   <h1 className="text-center text-5xl text-accent">portfolio</h1>
    <div className="columns-2 md:columns-3 lg:columns-4 space-y-4 mt-[40px] px-4">
      {portfolioData.slice(0,6).map((portfolio,index)=>(
        <div key={index}>
        <div className="bg-gray-100 rounded-lg overflow-hidden">
        <img src={`/images/portfolio/${portfolio.image}`} alt="img-1"
          className="h-auto max-w-full object-cover object-top" />
      </div>
      </div>
      ))}

    </div>
    </section>


    <section id="skill" className="h-[100svh] scroll-mt-[90px] py-4">
      <div className="py-4">
      <div className="max-w-screen-xl mx-auto">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-center text-5xl text-accent">skills</h1>
        </div>

        <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-8 max-md:max-w-lg mx-auto mt-16">
          {skillData.slice(0,6).map((skill,index)=>(
            <div key={index} className="bg-purple-50 text-left border border-gray-300 rounded-3xl p-6 transform hover:-translate-y-1 hover:border-accent hover:shadow-accent hover:shadow-md transition-all duration-300 rounded-lg shadow-sm">
            
              <img src={`/images/skill/${skill.image}`} alt="img-1"
          className="w-[25px]" />
            <h3 className="text-slate-900 text-lg font-medium mb-2">{skill.title}</h3>
            
            <p className="text-[15px] leading-relaxed text-slate-600">{skill.description}</p>
          </div>

          ))}

      
          
        </div>
      </div>
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

    {/* <section  className="h-[100svh] scroll-mt-[120px] py-4">
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
    </section> */}

    <div className="max-w-screen-xl mx-auto scroll-mt-[120px] h-[100svh]" id='map'>
      <h1 className="text-center text-5xl text-accent mb-[40px]"> maps</h1>
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
        {mapData.slice(0,6).map((map,index)=>(
          <Link href={`map/${map.slug}`} key={index} className=" bg-gray-100 overflow-hidden relative before:absolute before:inset-0 before:bg-black before:opacity-30 hover:before:bg-orange-600">
            <img src={`/images/map/${map.image}`} alt="img-1"
              className="h-full max-w-full object-cover object-top" />
          </Link>
        ))}
      </div>
      <Link href="/map" className="mt-4 mx-auto inline-flex items-center px-3 py-2 text-sm font-medium text-center bg-accent rounded-lg hover:bg-accent/90 focus:ring-4 focus:outline-none focus:ring-accent/60">
        view all
      </Link>
    </div>

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
          <p className="text-[15px] text-slate-600 mt-4 leading-relaxed">Do you have a project requiring a digital solution? I&apos;d love to hear more about it as we enage and move it from idea an into a digital product.</p>
          <div className="mt-12">
            <h2 className="text-text-mild text-base font-semibold">email</h2>
            <div className="mt-4 flex items-center">
              <div className="bg-[#e6e6e6cf] h-10 w-10 rounded-full flex items-center justify-center shrink-0">
                <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" fill='#000'
                  viewBox="0 0 479.058 479.058">
                  <path
                    d="M434.146 59.882H44.912C20.146 59.882 0 80.028 0 104.794v269.47c0 24.766 20.146 44.912 44.912 44.912h389.234c24.766 0 44.912-20.146 44.912-44.912v-269.47c0-24.766-20.146-44.912-44.912-44.912zm0 29.941c2.034 0 3.969.422 5.738 1.159L239.529 264.631 39.173 90.982a14.902 14.902 0 0 1 5.738-1.159zm0 299.411H44.912c-8.26 0-14.971-6.71-14.971-14.971V122.615l199.778 173.141c2.822 2.441 6.316 3.655 9.81 3.655s6.988-1.213 9.81-3.655l199.778-173.141v251.649c-.001 8.26-6.711 14.97-14.971 14.97z"
                    data-original="#000000" />
                </svg>
              </div>
              <Link href="javascript:void(0)" className="text-sm ml-4">
                <span className="font-light text-accent">odhiambosiaya@proton.me</span>
              </Link>
            </div> 
          </div>

          <div className="mt-12">
            <h2 className="text-text-mild text-base font-semibold">Socials</h2>
              <div className="bg-[#e6e6e6cf] h-10 w-10 rounded-full flex items-center justify-center shrink-0">
                <Link href="https://github.com/odhiambokevin" target="_blank">
                  <svg xmlns="http://www.w3.org/2000/svg" width="30px" height="30px" fill='#000'
                    viewBox="0 0 24 24">
                    <path
                      d="M12 0a12 12 0 1 0 0 24 12 12 0 0 0 0-24zm3.163 21.783h-.093a.513.513 0 0 1-.382-.14.513.513 0 0 1-.14-.372v-1.406c.006-.467.01-.94.01-1.416a3.693 3.693 0 0 0-.151-1.028 1.832 1.832 0 0 0-.542-.875 8.014 8.014 0 0 0 2.038-.471 4.051 4.051 0 0 0 1.466-.964c.407-.427.71-.943.885-1.506a6.77 6.77 0 0 0 .3-2.13 4.138 4.138 0 0 0-.26-1.476 3.892 3.892 0 0 0-.795-1.284 2.81 2.81 0 0 0 .162-.582c.033-.2.05-.402.05-.604 0-.26-.03-.52-.09-.773a5.309 5.309 0 0 0-.221-.763.293.293 0 0 0-.111-.02h-.11c-.23.002-.456.04-.674.111a5.34 5.34 0 0 0-.703.26 6.503 6.503 0 0 0-.661.343c-.215.127-.405.249-.573.362a9.578 9.578 0 0 0-5.143 0 13.507 13.507 0 0 0-.572-.362 6.022 6.022 0 0 0-.672-.342 4.516 4.516 0 0 0-.705-.261 2.203 2.203 0 0 0-.662-.111h-.11a.29.29 0 0 0-.11.02 5.844 5.844 0 0 0-.23.763c-.054.254-.08.513-.081.773 0 .202.017.404.051.604.033.199.086.394.16.582A3.888 3.888 0 0 0 5.702 10a4.142 4.142 0 0 0-.263 1.476 6.871 6.871 0 0 0 .292 2.12c.181.563.483 1.08.884 1.516.415.422.915.75 1.466.964.653.25 1.337.41 2.033.476a1.828 1.828 0 0 0-.452.633 2.99 2.99 0 0 0-.2.744 2.754 2.754 0 0 1-1.175.27 1.788 1.788 0 0 1-1.065-.3 2.904 2.904 0 0 1-.752-.824 3.1 3.1 0 0 0-.292-.382 2.693 2.693 0 0 0-.372-.343 1.841 1.841 0 0 0-.432-.24 1.2 1.2 0 0 0-.481-.101c-.04.001-.08.005-.12.01a.649.649 0 0 0-.162.02.408.408 0 0 0-.13.06.116.116 0 0 0-.06.1.33.33 0 0 0 .14.242c.093.074.17.131.232.171l.03.021c.133.103.261.214.382.333.112.098.213.209.3.33.09.119.168.246.231.381.073.134.15.288.231.463.188.474.522.875.954 1.145.453.243.961.364 1.476.351.174 0 .349-.01.522-.03.172-.028.343-.057.515-.091v1.743a.5.5 0 0 1-.533.521h-.062a10.286 10.286 0 1 1 6.324 0v.005z"
                      data-original="#000000" />
                  </svg>
                </Link>
              </div>
          </div>
        </div>
        <Formik onSubmit={handleSubmit} initialValues={formData} validationSchema={submitSchema}>  
                        {({ isSubmitting }) => (
              <Form className="lg:ml-auto space-y-4">
                <Field type='text' placeholder='Name' name="name" id="name"
                  className="w-full rounded-md py-3 px-4 bg-slate-100 text-slate-900 text-sm border border-gray-200 focus:border-slate-900 outline-none" />
                <ErrorMessage name="name" />
                
                <Field type='email' placeholder='Email' name="email" id="email"
                  className="w-full rounded-md py-3 px-4 bg-slate-100 text-slate-900 text-sm border border-gray-200 focus:border-slate-900 outline-none" />
                <ErrorMessage name="email" />
                
                <Field type='text' placeholder='Subject' name="subject" id="subject"
                  className="w-full rounded-md py-3 px-4 bg-slate-100 text-slate-900 text-sm border border-gray-200 focus:border-slate-900 outline-none" />
              
                <Field placeholder='Message' rows={6} as="textarea" name="message" id="message"
                  className="w-full rounded-md px-4 bg-slate-100 text-slate-900 text-sm pt-3 border border-gray-200 focus:border-slate-900 outline-none"
                  />
                  <ErrorMessage name="message" className="" />
                <button type='submit' disabled={isSubmitting}
                  className="text-white bg-accent/90 hover:bg-accent tracking-wide rounded-md text-sm font-medium px-4 py-3 w-full cursor-pointer !mt-2 border-0">Send message</button>
              </Form>
              )}
        </Formik>
      </div>
    </section>

   </main>
  );
}
