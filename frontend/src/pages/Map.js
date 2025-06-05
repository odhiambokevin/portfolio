import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from "react";
import { Link } from 'react-router-dom';

import { maps } from '../data/mapData';

function Map() {
   
    useEffect(() => {
        AOS.init();
    }, []);


    return (
        <>
        
      
      
        <div style={{position:"relative", marginTop:"70px"}} className="unslate_co--section" id="map-section">
            <div className="container">
                <div className="section-heading-wrap text-center">
                    <h2 className="heading-h2 text-center divider"><span className="gsap-reveal">maps</span></h2>
                    <span className="gsap-reveal"><img src="assets/images/divider.png" alt="divider" width="76" /></span>
                </div>
                
                
                <div className="row gutter-v4 align-items-stretch">
                {maps.map((map,index)=>(
                    <div className={map.size === 'big' ? "col-sm-6 col-md-6 col-lg-8 blog-post-entry" : "col-sm-6 col-md-6 col-lg-4 blog-post-entry" } data-aos="fade-up" data-aos-delay="0" key={index}>
                        <Link to={`map/${map.slug}`} className="grid-item blog-item w-100 h-100">
                            <div className="overlay"> 
                                <div className="portfolio-item-content">
                                    <h3>{map.title}</h3>
                                    <p className="post-meta">by {map.author} <span className="small">&bull;</span> {map.time} mins read</p>
                                    <p className="post-meta">image credit: <span className="small"></span> {map.credit}</p>
                                </div>
                            </div>
                            <img src={`assets/images/map/${map.image}`} className="lazyload" alt="blog" />
                        </Link>
                    </div>
                     ))}
                </div>
                
               
            </div>
           
        </div>        
        </>
     );
}

export default Map;