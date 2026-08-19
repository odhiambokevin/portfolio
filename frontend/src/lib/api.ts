import { backendUrl } from '@/lib/constants';
import type { BlogType, ExperienceType, PortfolioType, ProjectType, SkillType } from '@/lib/types';

type FetchResult<T> = {
  data: T;
  error: string | null;
}

async function safeGet<T>(path: string, fallback: T): Promise<FetchResult<T>> {
  try {
    const res = await fetch(`${backendUrl}${path}`, {
      next: { revalidate: 60 },
    });

    if (!res.ok) {
      const message = `Failed to load data (${res.status})`;
      console.error(`Failed to fetch ${path}: ${res.status} ${res.statusText}`);
      //fallback returns an empty array in case any url fails so one failure does not crash the entire page
      return { data: fallback, error: message };;
    }

    const data = await res.json();
    return { data, error: null };

    
  } catch (err) {
    console.error(`Failed to fetch ${path}:`, err);
    return { data: fallback, error: 'Something went wrong loading data' };
  }
}

export const getBlogs = () => safeGet<BlogType[]>('/api/blogs/', []);
export const getSingleBlog = (slug: string) => safeGet<BlogType | null>(`/api/blogs/${slug}/`, null);
export const getSkills = () => safeGet<SkillType[]>('/api/skills/', []);
export const getPortfolio = () => safeGet<PortfolioType[]>('/api/portfolio/', []);
export const getProjects = () => safeGet<ProjectType[]>('/api/projects/', []);
export const getExperience = () => safeGet<ExperienceType[]>('/api/experience/', []);