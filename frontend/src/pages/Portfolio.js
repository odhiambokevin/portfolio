import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from "react";
import { useParams } from 'react-router-dom';
import { projects } from '../data/projectData';

function Portfolio() {
    const {work} = useParams();
    const project = projects.find((project)=> project.slug === work);
    const {title,sector,url,skills,stack,date,image} = project;

    useEffect(() => {
        AOS.init();
    }, []);
    return (
        <>
        <div className="cover-v1 gradient-bottom-black jarallax">
          <div className="container">
            <div className="row align-items-center">

              <div className="col-md-10 mx-auto text-center">
                <h1 className="heading" data-aos="fade-up">{title}</h1>
                <h2 className="subheading" data-aos="fade-up" data-aos-delay="100">{sector}</h2>
              </div>

            </div>
          </div>        
          <a href="#portfolio-single-section" className="mouse-wrap smoothscroll">
            <span className="mouse">
              <span className="scroll"></span>
            </span>
            <span className="mouse-label">Scroll</span>
          </a>
        </div>
     
        <div className="container">
          <div className="portfolio-single-wrap unslate_co--section" id="portfolio-single-section">
            <div className="portfolio-single-inner">

              <h2 className="heading-portfolio-single-h2">{title }</h2>

              <div className="row justify-content-between align-items-stretch">

                <div className="col-lg-8">
                  <p><img src={`/assets/images/${image}`} alt="work" className="img-fluid" /></p>
                  
                </div>
                <div className="col-lg-4 pl-lg-5">
                  <div className="unslate_co--sticky">
                    <div className="row">
                      <div className="col-md-12 mb-4">
                        <div className="detail-v1">
                          <span className="detail-label">{title}</span>
                          <p>{sector}</p>
                        </div>
                      </div>

                      <div className="col-md-12 mb-4">
                        <div className="detail-v1">
                          <span className="detail-label">tech stack</span>
                          <p>{stack}</p>
                        </div>
                      </div>

                      <div className="col-md-12 mb-4">
                        <div className="detail-v1">
                          <span className="detail-label">project date</span>
                          <span className="detail-val">{date}</span>
                        </div>
                      </div>
                      <div className="col-md-12 mb-4">
                        <div className="detail-v1">
                          <span className="detail-label">role</span>
                          <span className="detail-val">{skills}</span>
                        </div>
                      </div>
                      <div className="col-md-12 mb-4">
                        <div className="detail-v1">
                          <span className="detail-label">visit</span>
                          <span className="detail-val"><a href={url}>{title}.com</a></span>
                        </div>
                      </div>
                    </div>
                  </div> 
                </div>

              </div>

            </div>
          </div>
        </div>
        </>
     );
}

export default Portfolio;