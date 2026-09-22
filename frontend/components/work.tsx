import Image from 'next/image'
import { ArrowUpRight } from 'lucide-react'
import { getPortfolio } from "@/lib/api";
import Link from 'next/link';

export async function WorkSection() { 
    const { data: portfolioData, error } = await getPortfolio();
 
    return (
        <section className="section-shell contrast-panel" id="portfolio">
            <div className="section-heading"><div><p className="eyebrow">portfolio</p><h2>some of my work<em>.</em></h2></div><span className="section-count">01 — {String(portfolioData.length).padStart(2, '0')}</span>
            </div>
            <div className="work-grid">
                {portfolioData.map((item, index) =>
                    <article className={`work-card work-card-${index + 1}`} key={item.title}>
                        <div className="work-image">
                            <Image src={item.image} alt={item.title} width={1400} height={900} loading={index === 0 ? 'eager' : 'lazy'} sizes="(max-width: 800px) 100vw, 33vw" />
                        </div>
                        <div className="work-meta">
                            <div><h3>{item.title}</h3><p>{item.description}</p>
                            </div>
                            <span className="arrow-circle">
                                <Link href={item.url} target="_blank" rel="noreferrer">
                                    <ArrowUpRight size={17} />
                                </Link>
                            </span>
                        </div>
                        <div className="tag-row">
                            {item.tags.map(tag => 
                                <span key={tag}>
                                    {tag}
                                </span>
                                )}
                        </div>
                    </article>
                )}
            </div>
        </section>
        )
    }
