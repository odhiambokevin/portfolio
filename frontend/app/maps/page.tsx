import { getMaps } from '@/lib/api'; // Adjust to your actual api path
import MapsGallery from './Maps';

export default async function BlogsPage() {
  // fetche from server with ISR caching enabled
  const { data: maps, error } = await getMaps();

  return <MapsGallery maps={maps} error={error} />;
} 