import { ArrowUpRight } from 'lucide-react'
import { getProjects } from '@/lib/api'
import Link from 'next/link';


export async function ProjectSection() { 
    const { data: projectData, error } = await getProjects();
    
    return (
    <section className="section-shell projects" id="projects">
        <div className="section-heading">
            <div>
                <p className="eyebrow">projects</p>
                <h2>in the works<em>.</em></h2>
            </div>
            <span className="section-count">github links</span>
        </div>
        <div className="project-scroll">
            {projectData.map((project, index) => 
            <Link className="project-row" href={project.repo} target="_blank" rel="noreferrer" key={index}>
                <span className="project-number">0{index + 1}</span>
                <div>
                    <h3>{project.name}</h3>
                    <p>{project.description}</p>
                </div>
                <span className="project-status">{project.status}</span>
                <ArrowUpRight size={18} />
            </Link>
            )}
        </div>
    </section>
    )
}
