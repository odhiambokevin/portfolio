import Image from 'next/image'
import { ArrowDownRight } from 'lucide-react'
import Link from 'next/link'

export function HeroSection() { 
    return (
    
<section className="hero section-shell" id="about">
    <div className="hero-copy">
        <h1>data engineer <em>.</em></h1>
        <p className="hero-lede">hi, i'm <em>kevin</em> , a data engineer and geospatial developer from kenya. i specialize in automated <em>data pipeline</em> design, <em>secure</em> digital infrastructure solutions that <em>scale</em>, are reliable and leverage <em>automation</em>
        </p>
        <div className="hero-actions">
            <Link className="button button-dark" href="#portfolio">
                explore my work <ArrowDownRight size={16} />
            </Link>
            <Link className="text-link" href="#contact">
                contact me
                <span><ArrowDownRight/></span>
            </Link>
            </div>
    </div>
    <div className="hero-art" aria-label="kevin portfolio artwork">
        <Image className="hero-image !object-contain" src="https://res.cloudinary.com/wgsj17do/image/upload/v1789887136/me.png" alt="Abstract green data platform artwork with Kevin Siran branding" fill priority sizes="(max-width: 800px) 0px, 50vw" />
    </div>
</section>
)
}
