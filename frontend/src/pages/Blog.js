import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from "react";
import { useParams } from 'react-router-dom';
import { blogs } from '../data/blogData';

function Blog() {
    const {slug} = useParams();
    const blog = blogs.find((blog)=> blog.slug === slug);
    const {title, subtitle,author, time, image, date} = blog;
        
    useEffect(() => {
        AOS.init();
    }, []);
    return (
        <>
        <div className="cover-v1 jarallax overlay" style={{backgroundImage: `url(/assets/images/${image})`}} >
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
              <p>Some of us may have had the occasional urge to test out some code using an already existing virtual environment dependencies. The rule of the thumb is that we should always keep python projects concerns/dependencies separate from each other for well known reasons.</p>
              <p>However, I have come across a situation where I just needed to try out some code without necessarily creating an entirely new virtual environment using Pipenv. Well it's easy as creating a .venv file in your new project and including in it the location of the virtual environment. This is the folder that holds the pipenv files and folders. It normally includes some hashed code at the end of the folder name.</p>
              <p>So your .venv file would have in it a line as shown below:</p>
              <p>C:\Users\User Name\.virtualenvs\Pipenvfolder-TVgiFkue</p>
              <p>Note: There are no quotes in the path.</p>
            </div>
            </div>
          </div>
        </div>
        </>
     );
}

export default Blog;