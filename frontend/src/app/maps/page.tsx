import Image from "next/image";
import { mapData } from "@/data/maps";
import Link from "next/link";

export default function Map() {
  return (
    <div>
        <h1>maps</h1>
         <div className="flex flex-wrap justify-center gap-4 py-4">
              {mapData.map((map,index)=>(
                <div key={index} className="transition duration-300 ease-in-out  hover:scale-105">
                  <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
                      <Link href="#">
                          <Image className="rounded-t-lg" src={`/images/map/${map.image}`} alt="" width={500} height={200} priority/>
                      </Link>
                      <div className="p-5">
                          <Link href={`map/${map.slug}`}>
                              <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{map.title}</h5>
                          </Link>
                          <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.</p>
                          <Link href={`map/${map.slug}`} className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-accent rounded-lg hover:bg-accent/90 focus:ring-4 focus:outline-none focus:ring-accent/20">
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
      
    </div>
  )
}
