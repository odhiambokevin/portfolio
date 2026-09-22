import Link from 'next/link'
import { use } from 'react'
import { ArrowUpRight } from 'lucide-react'
import { BlogType } from '@/lib/types/Blog.types';


// const posts = [
//     { slug: 'designing-data-systems-that-last',
//         title: 'designing data systems that last',
//         date: 'september 12, 2026',
//         read: '6 min read',
//         category: 'engineering' },
//     { slug: 'why-geospatial-data-needs-better-tools',
//         title: 'why geospatial data needs better tools',
//         date: 'august 28, 2026',
//         read: '4 min read',
//         category: 'ideas' },
//     { slug: 'a-practical-guide-to-pipeline-observability',
//         title: 'a practical guide to pipeline observability',
//         date: 'july 19, 2026',
//         read: '8 min read',
//         category: 'engineering' },
//     {
//         slug: 'building-for-quiet-failure',
//         title: 'building for quiet failure',
//         date: 'june 04, 2026',
//         read: '5 min read',
//         category: 'ideas' 
//     }]
type BlogSectionProps = {
  blogsPromise: Promise<{ data: BlogType[]; error: string | null }>;
}

export function BlogSection({ blogsPromise }: BlogSectionProps) {
    const { data: posts, error } = use(blogsPromise);

    
    return (
        <section className="section-shell writing" id="blogs">
            <div className="section-heading">
                <div><p className="eyebrow">recent blogs</p><h2>i write sometimes<em>.</em></h2>
                </div>
                <Link className="text-link" href="/blogs">
                    view all <span>↗</span>
                </Link>
            </div>
            <div className="post-list">
                {posts.map(post =>
                    <Link className="post-row" href={`/blogs/${post.slug}`} key={post.slug}>
                        <span className="post-category">
                            {post.category}
                        </span>
                        <h3>{post.title}</h3>
                        <span className="post-date">
                            {new Date(post.posted_on).toLocaleDateString("en-GB", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })} · {`${post.read} min read`}
                        </span>
                        <ArrowUpRight size={18} />
                    </Link>
                    )}
            </div>
        </section>
)
}
// export { posts }