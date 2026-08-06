import Image from "next/image";
import { projectData } from "@/data/projects";
import Link from "next/link";

function truncateWords(text: string, limit: number) {
  const words = text.trim().split(/\s+/);
  if (words.length <= limit) return text;
  return words.slice(0, limit).join(" ") + "...";
}

export default function Project() {
  return (
    <div className="pt-[calc(var(--header-h)+32px)] pb-16 px-4">
      <h1 className="text-center text-5xl text-accent mb-[40px]">projects</h1>
      <div className="flex flex-wrap justify-center gap-4 max-w-screen-xl mx-auto">
        {projectData.map((project, index) => (
          <div key={index} className="transition duration-300 ease-in-out hover:scale-105">
            <div className="flex flex-col h-[480px] w-[380px] max-w-sm bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700 overflow-hidden">
              <Link href={`map/${project.slug}`} className="shrink-0">
                <Image
                  className="rounded-t-lg h-[200px] w-full object-cover"
                  src={`/images/map/${project.image}`}
                  alt={project.title}
                  width={500}
                  height={200}
                  priority
                />
              </Link>
              <div className="p-5 flex flex-col flex-1">
                <Link href={`map/${project.slug}`}>
                  <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white line-clamp-2">
                    {project.title}
                  </h5>
                </Link>
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400 flex-1 line-clamp-3">
                  {project.description}
                </p>
                <Link
                  href={`projects/${project.slug}`}
                  className="inline-flex items-center self-start px-3 py-2 text-sm font-medium text-center text-white bg-accent rounded-lg hover:bg-accent/90 focus:ring-4 focus:outline-none focus:ring-accent/20 mt-auto"
                >
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
  );
}