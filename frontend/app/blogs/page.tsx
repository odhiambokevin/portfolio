import { getBlogs } from '@/lib/api'; // Adjust to your actual api path
import BlogsClient from './BlogsClient';

export default async function BlogsPage() {
  // Fetches data on the server with ISR caching enabled
  const { data: blogs, error } = await getBlogs();

  return <BlogsClient blogs={blogs} error={error} />;
}