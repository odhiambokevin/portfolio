import AOS from 'aos';
import 'aos/dist/aos.css';
import MarkDown from 'markdown-to-jsx';
import { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { a11yDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { blogs } from '../data/blogData';

const Code = ({children, language}) => {
  return ( 
      <SyntaxHighlighter style={a11yDark} language={language}>
        {children}
      </SyntaxHighlighter>
    
   );
}
 

function Blog() {
    const {slug} = useParams();
    const blog = blogs.find((blog)=> blog.slug === slug);
    const {title, subtitle,author, time, image, date} = blog;
    const [content, setContent] = useState("")
        
    useEffect(() => {
        AOS.init();
        import(`../data/markdown/${slug}.md`)
        .then(
          res => {
            fetch(res.default)
            .then(res=> res.text())
            .then(res=> setContent(res))
          }
        )
        .catch(err => console.log(err));
    }, [slug]);
    return (
        <>
        <div className="cover-v1 jarallax overlay" style={{backgroundImage: `url(/assets/images/blog/${image})`}} >
        <div className="container">
          <div className="row align-items-center">
              
            <div className="col-md-8 mx-auto text-center">
              <h1 className="blog-heading" data-aos="fade-up" data-aos-delay="0">{title}</h1>
              <div className="post-meta" data-aos="fade-up" data-aos-delay="100">by {author} on {date} &bull; {time} mins read</div>
            </div>

          </div>
        </div>


        
        <a href="#blog-single-section" className="mouse-wrap smoothscroll">
          <span className="mouse">
            <span className="scroll"></span>
          </span>
          <span className="mouse-label">Scroll</span>
        </a>

      </div>
      

      <div className="unslate_co--section" id="blog-single-section">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-7">
              <h3 className="mb-4">{subtitle}</h3>

              
              
                <MarkDown 
                options={{
                  overrides: {
                    Code: {
                      component: Code
                    }
                  }
                }}>
                
                {content}
                
                </MarkDown>
               
                
             
            </div>
            </div>
          </div>
        </div>
        </>
     );
}

export default Blog;