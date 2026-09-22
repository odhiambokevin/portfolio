'use client'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight, Search } from 'lucide-react'
import { useMemo, useState } from 'react'
import type { BlogType } from '@/lib/types/Blog.types'

type BlogsClientProps = {
  blogs: BlogType[];
  error: string | null;
}

export default function BlogsClient({ blogs, error }: BlogsClientProps) {
  const [query, setQuery] = useState('')
  const [filter, setFilter] = useState('all')

  const posts = useMemo(() => {
    return blogs.filter((post) => {
      const matchesFilter = filter === 'all' || post.category === filter
      const tagsString = post.tags ? post.tags.join(' ') : ''
      const haystack = `${post.title} ${post.intro || ''} ${tagsString}`.toLowerCase()
      return matchesFilter && haystack.includes(query.toLowerCase())
    })
  }, [blogs, filter, query])

  if (error) {
    return (
      <main className="blogs-page">
        <section className="blogs-hero section-shell">
          <p className="eyebrow">blogs</p>
          <h1>some of my writings</h1>
          <p>&nbsp;&nbsp;&nbsp;on data, engineering, and geospatial systems.</p>
        </section>
        <section className="blog-browser section-shell">
          <p className="error-text">could not load articles at the moment. please try again later.</p>
        </section>
      </main>
    )
  }

  return (
    <main className="blogs-page">
      <section className="blogs-hero section-shell">
        <p className="eyebrow">blogs</p>
        <h1>some of my writings</h1>
        <p>&nbsp;&nbsp;&nbsp;on data, engineering, and geospatial systems.</p>
      </section>

      <section className="blog-browser section-shell">
        <div className="blog-controls">
          <label className="search-field">
            <Search size={16} />
            <span className="sr-only">search articles</span>
            <input 
              value={query} 
              onChange={event => setQuery(event.target.value)} 
              placeholder="search articles" 
            />
          </label>
          <div className="filter-list" aria-label="Filter articles">
            {['all', 'engineering', 'gis','database','backend'].map(option => (
              <button 
                className={filter === option ? 'active' : ''} 
                onClick={() => setFilter(option)} 
                key={option}
              >
                {option}
              </button>
            ))}
          </div>
        </div>

        <div className="archive-list">
          {posts.length ? posts.map((post) => (
            <Link className="archive-row" href={`/blogs/${post.slug}`} key={post.slug}>
              {post.image ? (
                <Image 
                  src={post.image} 
                  alt={post.title} 
                  width={320} 
                  height={220} 
                  loading="lazy" 
                  sizes="(max-width: 800px) 100vw, 320px" 
                />
              ) : (
                <div className="archive-image-placeholder" aria-hidden="true" />
              )}
              <div>
                <span className="post-category">{post.category}</span>
                <h2>{post.title}</h2>
                <p>{post.intro}</p>
              </div>
              <div className="archive-meta">
                <span>{new Date(post.posted_on).toLocaleDateString("en-GB", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}</span>
                <span>{typeof post.read === 'number' ? `${post.read} min read` : post.read}</span>
                <ArrowUpRight size={18} />
              </div>
            </Link>
          )) : (
            <p className="empty-results">no articles match your search.</p>
          )}
        </div>
      </section>
    </main>
  )
}