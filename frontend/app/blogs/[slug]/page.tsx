import { MDXRemote } from 'next-mdx-remote/rsc';
import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight, Clock } from 'lucide-react'
import { notFound } from 'next/navigation'
import { getSingleBlog, getRelatedBlogs } from '@/lib/api'

export default async function BlogDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params

  //get single article and related blogs in parallel for better performance
  const [articleResult, relatedResult] = await Promise.all([
    getSingleBlog(slug),
    getRelatedBlogs(slug),
  ])

  const article = articleResult.data
  const relatedBlogs = relatedResult.data
 //load 404 - the custom 404 will be loaded- if article not found
  if (!article) {
    notFound()
  }

return (
    <main className="article-page">
      <div className="article-layout">
        <article className="article-content">
          <div className="article-kicker">
            <span>{article.category}</span>
            <span>{new Date(article.posted_on).toLocaleDateString("en-GB", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}</span>
          </div>
          <h1>{article.title}</h1>
          {article.image && (
            <Image  
              className="article-image" 
              src={article.image} 
              alt={article.title} 
              width={1400} 
              height={900} 
              priority 
              sizes="(max-width: 800px) 100vw, 760px" 
            />
          )}
          <p className="article-intro !text-[14px]">image credit: {article.credit}</p>
          <div className="article-meta">
            <span>
              <Clock size={15} /> {typeof article.read === 'number' ? `${article.read} min read` : article.read}
            </span>
            <span>by {article.author}</span>
          </div>
          <div className="article-tags">
            {article.tags?.map(tag => <span key={tag}>#{tag}</span>)}
          </div>
          <div className="article-rule" />
          
          
            <section className="article-section">
             <MDXRemote source={article.body} />
            </section>
         

          <div className="article-end">
            <span>thanks for reading</span>
            <Link className="text-link" href="/blogs">
              back to blogs <ArrowUpRight size={16} />
            </Link>
          </div>
        </article>

        <aside className="related-posts">
          <p className="eyebrow">related posts</p>
          {relatedBlogs.length ? (
            relatedBlogs.map((related) => (
              <Link className="related-post" href={`/blogs/${related.slug}`} key={related.slug}>
                <span>{related.category}</span>
                <strong>{related.title}</strong>
                <small>{new Date(related.posted_on).toLocaleDateString("en-GB", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })} · {`${related.read} min read`}</small>
              </Link>
            ))
          ) : (
            <p className="related-empty">related posts will appear here</p>
          )}
        </aside>
      </div>
    </main>
  )
}
