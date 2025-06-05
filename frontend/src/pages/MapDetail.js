import AOS from 'aos';
import 'aos/dist/aos.css';
import MarkDown from 'markdown-to-jsx';
import { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { a11yDark, atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { maps } from '../data/mapData';

const Code = ({children, language}) => {
  return ( 
      <SyntaxHighlighter style={atomDark} language={language}>
        {children}
      </SyntaxHighlighter>
    
   );
}
 

function MapDetail() {
    const {slug} = useParams();
    const map = maps.find((map)=> map.slug === slug);
    const {title, subtitle,author, time, image, date} = map;
    const [content, setContent] = useState("")
        
    useEffect(() => {
        AOS.init();
        import(`../data/markdown/map/${slug}.md`)
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
        <div className="cover-v1 jarallax overlay" style={{backgroundImage: `url(/assets/images/map/${image})`}} >
        <div className="container">
          <div className="row align-items-center">
              
           

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

export default MapDetail;