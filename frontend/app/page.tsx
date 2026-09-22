import { Suspense } from "react";
import { ScrollToTop } from '@/components/scroll-to-top'
import {HeroSection} from '@/components/hero'
import {WorkSection} from '@/components/work'
import {SkillSection} from '@/components/skill'
import {ExperienceSection} from '@/components/experience'
import {ProjectSection} from '@/components/project'
import {BlogSection} from '@/components/blog'
import {ContactSection} from '@/components/contact'
import SectionSkeleton from "@/components/skeleton";
import { getBlogs } from '@/lib/api';



export default function Page() {

  const blogsPromise = getBlogs();
    return (
      <div className="site-shell">
        <main id="top">
          <HeroSection />
          <WorkSection />

          <SkillSection />

          <ExperienceSection />

          <ProjectSection />

          <Suspense fallback={<SectionSkeleton label="blogs" />}>
            <BlogSection blogsPromise={blogsPromise} />
          </Suspense>

          <ContactSection />
        </main>
        <ScrollToTop />
      </div>
    )
}
