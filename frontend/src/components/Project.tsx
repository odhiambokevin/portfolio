import Link from "next/link";
import { getProjects } from "@/lib/api";
import ErrorToast from "@/components/ErrorToast";

export default async function Project() {
  const { data: projectData, error } = await getProjects();

  return (
    <section className="max-w-screen-xl mx-auto scroll-mt-[120px] p-4 min-h-[100svh] relative" id='projects'>
      <ErrorToast message={error ? `Portfolio: ${error}` : null} />
      <h1 className="text-center text-5xl text-accent mb-[40px]">projects</h1>
      <div className="max-h-[600px] overflow-y-auto px-6 md:px-16">
        {projectData.map((project, index) => (
          <div key={index} className="border-t border-gray-800 first:border-t-0">
            <Link href={project.url} target="_blank" className="group block py-8 text-center">
              <div className="min-w-0">
                <div className="flex items-baseline justify-center gap-3">
                  <span className="text-sm text-gray-500 shrink-0">{String(index + 1).padStart(2, '0')}.</span>
                  <h3 className="text-2xl md:text-3xl xl:text-4xl font-extrabold uppercase tracking-tight text-gray-500 group-hover:text-accent group-hover:scale-[1.02] transition-all duration-200 break-words">
                    {project.title}
                  </h3>
                </div>
                <div className="flex items-center justify-center gap-3 mt-3 text-sm text-gray-400">
                  {project.stack?.map((tech: string, i: number) => (
                    <span key={i} className="flex items-center gap-3">
                      {i > 0 && <span className="w-1 h-1 rounded-full bg-gray-600 shrink-0" />}
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}