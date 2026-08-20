import { backendUrl } from '@/lib/constants';
import type { BlogType } from '@/lib/types';
import {experienceData,projectData,skillData,portfolioData} from '@/data';

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

//api calls
export const getBlogs = async () => {
  const { data, error } = await safeGet<{ results: BlogType[] }>('/api/blogs/', { results: [] });
  return { data: data.results, error };
};

export const getSingleBlog = (slug: string) => safeGet<BlogType | null>(`/api/blogs/${slug}/`, null);

export const getRelatedBlogs = (slug: string) => safeGet<BlogType[]>(`/api/blogs/${slug}/related/`, []);

  //local data
export const getSkills = async () => {
  return { data: skillData, error: null };
};

export const getPortfolio = async () => {
  return { data: portfolioData, error: null };
};

export const getProjects = async () => {
  return { data: projectData, error: null };
};

export const getExperience = async () => {
  return { data: experienceData, error: null };
};
