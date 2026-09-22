import Link from 'next/link'
import { use } from 'react'
import { ArrowUpRight } from 'lucide-react'
import { BlogType } from '@/lib/types/Blog.types';

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
                {posts.slice(0, 4).map(post =>
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
