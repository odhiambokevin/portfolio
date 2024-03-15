import { LinearProgress, Snackbar } from '@mui/material';
import AOS from 'aos';
import 'aos/dist/aos.css';
import axios from 'axios';
import { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import { blogs } from '../data/blogData';

function Home() {
   
    useEffect(() => {
        AOS.init();
    }, []);

    const [ formData , setFormData ] = useState({
        'name':'',
        'email':'',
        'subject':'',
        'message':'',
        'status':'',
        'error':''
    })

   

    const handleChange = (e)=>{
        setFormData({...formData, [e.target.name]:e.target.value})
    }
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const handleClose = (event, reason)=>{
        if(reason === 'clickaway') {
            return
        }
        setOpen(false)
    }
    
    const sendEmail = async (e) => {
        e.preventDefault();
        setLoading(true);
        const feedbackFormData = new FormData();
        feedbackFormData.append('name', formData.name)
        feedbackFormData.append('email', formData.email)
        feedbackFormData.append('subject', formData.subject)
        feedbackFormData.append('message', formData.message)
        try {
            await axios.post("https://portfolio-be-three.vercel.app/api/v1/feedback/", feedbackFormData)
            .then((res)=>{
                const timeout1 = ()=>setTimeout(() => {
                console.log(res);
                setFormData({'status':'success'});
                setLoading(false);
                setOpen(true);
            }, 5000);
            return function ()  {
                clearTimeout(timeout1)}
        })
            .then(setFormData({
                'name':'',
                'email':'',
                'subject':'',
                'message':'',
                'status':'',
            }))        
        } catch (error) {
            
             const timeouterr = setTimeout(() => {
                setFormData({'status':'error', 'error': `something went wrong: ${error.message}`});
                setLoading(false);
                setOpen(true); 
             }, 5000);
            
             return function ()  {
                clearTimeout(timeouterr)}  

            // setFormData({
            //     formData
            // })
        }
            
                          
        
    };

    return (
        <>
        <div className="cover-v1 jarallax" style={{backgroundImage: "url(assets/images/min.jpg)"}} id="home-section">
            <div className="container">
            <div className="row align-items-center">
                
                <div className="col-md-7 mx-auto text-center">
                <h1 className="heading gsap-reveal-hero">kevin<span className="accent">.</span></h1>
                <h2 className="subheading gsap-reveal-hero">i’m a web developer from Kenya</h2>
                </div>

            </div>
            </div>


            <Link to="#portfolio-section" className="mouse-wrap smoothscroll">
            <span className="mouse">
                <span className="scroll"></span>
            </span>
            <span className="mouse-label">Scroll</span>
            </Link>

        </div>
        

        <div className="unslate_co--section" id="portfolio-section">
            <div className="container">
            <div className="relative"><div className="loader-portfolio-wrap"><div className="loader-portfolio"></div></div> </div>
            <div id="portfolio-single-holder"></div>

            <div className="portfolio-wrapper">

                <div className="d-flex align-items-center mb-4 gsap-reveal gsap-reveal-filter">
                <h2 className="mr-auto heading-h2"><span className="gsap-reveal">portfolio</span></h2>
                </div>
      
                <div id="posts" className="row gutter-isotope-item">
                <div className="item web branding col-sm-6 col-md-6 col-lg-4 isotope-mb-2">
                <Link to="portfolio/wildlife" className="portfolio-item isotope-item gsap-reveal-img" data-id="1">
                        <div className="overlay">
                        <span className="wrap-icon icon-link2"></span>
                        <div className="portfolio-item-content">
                            <h3>widlife management system</h3>
                            <p>airport, widlife, dashboard</p>
                        </div>
                        </div>
                        <img src="assets/images/awm.png" className="lazyload  img-fluid" alt="dashboard" />
                    </Link>
                </div> 
                <div className="item web branding col-sm-6 col-md-6 col-lg-4 isotope-mb-2">
                    <Link to="portfolio/crabstack" className="portfolio-item isotope-item gsap-reveal-img" data-id="1">
                        <div className="overlay">
                        <span className="wrap-icon icon-link2"></span>
                        <div className="portfolio-item-content">
                            <h3>crabstack media</h3>
                            <p>media, branding, photography</p>
                        </div>
                        </div>
                        <img src="assets/images/crab.png" className="lazyload  img-fluid" alt="crab" />
                    </Link>
                </div>
                <div className="item branding packaging illustration col-sm-6 col-md-6 col-lg-4 isotope-mb-2 ">
                    <Link to="portfolio/yaspi" className="portfolio-item item-portrait isotope-item gsap-reveal-img" data-id="3">
                        <div className="overlay">
                        <span className="wrap-icon icon-link2"></span>
                        <div className="portfolio-item-content">
                            <h3>yaspi</h3>
                            <p>gis, remote sensing, mapping</p>
                        </div>
                        </div>
                        <img src="assets/images/yaspi.png" className="lazyload  img-fluid" alt="yaspi" />
                    </Link>
                </div>

                </div>
                
            </div>


            </div>
        </div>


        <div className="unslate_co--section" id="about-section">
            <div className="container">
            
            <div className="section-heading-wrap text-center mb-5">
                <h2 className="heading-h2 text-center divider"><span className="gsap-reveal">about me</span></h2>
                <span className="gsap-reveal">
                <img src="assets/images/divider.png" alt="divider" width="76" />
                </span>
            </div>
            

            <div className="row mt-5 justify-content-between">
                <div className="col-lg-7 mb-5 mb-lg-0">
                <figure className="dotted-bg gsap-reveal-img ">
                    <img src="assets/images/ko.jpg" alt="profile" className="img-fluid" style={{float: "right"}} />
                </figure>
                </div>
                <div className="col-lg-4 pr-lg-5">
                <h3 className="mb-4 heading-h3"><span className="gsap-reveal">who am i</span></h3>
                <p className="lead gsap-reveal">i'm a <Link to="http://github.com/odhiambokevin">full stack web devloper</Link> with practical experience in both frontend development and backend design </p>
                <p className="mb-4 gsap-reveal">my core competencies in SQL database design and api development with both graphql and restful apis ensure seamless integration for optimal product functionality </p>
                <p className="mb-4 gsap-reveal">i specialize in geospatial development with a focus on mapping and GIS apps with fully fledged geospatial database design</p>
                </div>
            </div>
            </div>
        </div>

        <div className="unslate_co--section" id="services-section">
            <div className="container">

                <div className="section-heading-wrap text-center mb-5">
                    <h2 className="heading-h2 text-center divider"><span className="gsap-reveal">skills</span></h2>
                    <span className="gsap-reveal"><img src="assets/images/divider.png" alt="divider" width="76" /></span>
                </div>

                <div className="row gutter-v3">
                    <div className="col-md-6 col-lg-4 mb-4">
                        <div className="feature-v1" data-aos="fade-up" data-aos-delay="0">
                            <div className="wrap-icon mb-3">
                                <img src="assets/images/svg/001-options.svg" alt="frontend" width="45" />
                            </div>
                            <h3>frontend<br/> development</h3>
                            <p>feature rich responsive websites with interactive interfaces</p>
                        </div> 
                    </div>

                    <div className="col-md-6 col-lg-4 mb-4">
                        <div className="feature-v1" data-aos="fade-up" data-aos-delay="0">
                            <div className="wrap-icon mb-3">
                                <img src="assets/images/svg/002-chat.svg" alt="database" width="45" />
                            </div>
                            <h3>database <br/> design</h3>
                            <p>database design with sql focussed automation for maximum efficiency and security</p>
                        </div> 
                    </div>

                    <div className="col-md-6 col-lg-4 mb-4">
                        <div className="feature-v1" data-aos="fade-up" data-aos-delay="0">
                            <div className="wrap-icon mb-3">
                                <img src="assets/images/svg/004-percentage.svg" alt="cicd" width="45" />
                            </div>
                            <h3>cicd</h3>
                            <p>continous integration and continous development leading to zero downtimes</p>
                        </div> 
                    </div>

                    <div className="col-md-6 col-lg-4 mb-4">
                        <div className="feature-v1" data-aos="fade-up" data-aos-delay="0">
                            <div className="wrap-icon mb-3">
                                <img src="assets/images/svg/005-line-chart.svg" alt="version" width="45" />
                            </div>
                            <h3>git</h3>
                            <p>version control allowing tracking of code history</p>
                        </div> 
                    </div>

                    <div className="col-md-6 col-lg-4 mb-4">
                        <div className="feature-v1" data-aos="fade-up" data-aos-delay="0">
                            <div className="wrap-icon mb-3">
                                <img src="assets/images/svg/006-goal.svg" alt="backend" width="45" />
                            </div>
                            <h3>backend development</h3>
                            <p>secure api development using both restful apis and graphql for automation and optimal user experience</p>
                        </div> 
                    </div>         
                </div>
            </div>
        </div>


        <div className="unslate_co--section" id="journal-section">
            <div className="container">
                <div className="section-heading-wrap text-center mb-5">
                    <h2 className="heading-h2 text-center divider"><span className="gsap-reveal">blog</span></h2>
                    <span className="gsap-reveal"><img src="assets/images/divider.png" alt="divider" width="76" /></span>
                </div>
                
                
                <div className="row gutter-v4 align-items-stretch">
                {blogs.map((blog)=>(
                    <div className={blog.size === 'big' ? "col-sm-6 col-md-6 col-lg-8 blog-post-entry" : "col-sm-6 col-md-6 col-lg-4 blog-post-entry" } data-aos="fade-up" data-aos-delay="0" key={blog.id}>
                        <Link to={`blog/${blog.slug}`} className="grid-item blog-item w-100 h-100">
                            <div className="overlay"> 
                                <div className="portfolio-item-content">
                                    <h3>{blog.title}</h3>
                                    <p className="post-meta">by {blog.author} <span className="small">&bull;</span> {blog.time} mins read</p>
                                    <p className="post-meta">image credit: <span className="small"></span> {blog.credit}</p>
                                </div>
                            </div>
                            <img src={`assets/images/blog/${blog.image}`} className="lazyload" alt="blog" />
                        </Link>
                    </div>
                     ))}
                </div>
               
            </div>
        </div>
    
        <div className="unslate_co--section" id="contact-section">
            <div className="container">
            <div className="section-heading-wrap text-center mb-5">
                <h2 className="heading-h2 text-center divider"><span className="gsap-reveal">contact me</span></h2>
                <span className="gsap-reveal"><img src="assets/images/divider.png" alt="divider" width="76" /></span>
            </div>


            <div className="row justify-content-between">
                
                <div className="col-md-6">
                <form method="post" className="form-outline-style-v1" id="contactForm">
                    {loading && <LinearProgress color='inherit' />}
                {formData.status === 'success' && 
                            <Snackbar
                            message="Sent Successfully"
                            autoHideDuration={3000}
                            open={open}
                            onClose={handleClose}
                            anchorOrigin={{
                                horizontal:'center',
                                vertical:'bottom'
                            }}
                            sx={{
                                marginBottom: '250px',
                            }}                         
                             />}
                            {formData.status === 'error' && <Snackbar message={formData.error}
                            autoHideDuration={2500}
                            open={open}
                            onClose={handleClose}
                            anchorOrigin={{
                                horizontal:'center',
                                vertical:'bottom'
                            }}
                            sx={{
                                marginBottom: '250px',
                            }}
                             />}
                    <div className="form-group row mb-0">

                    <div className="col-lg-6 form-group gsap-reveal">
                        
                        <input name="name" type="text" className="form-control" id="name" required value={formData.name} autoComplete='given-name' onChange={handleChange}  placeholder="name"/>
                    </div>
                    <div className="col-lg-6 form-group gsap-reveal">
                        
                        <input name='email' required value={formData.email} autoComplete='off' onChange={handleChange} className="form-control" id="email" placeholder="email" type="email" />
                    </div>
                    <div className="col-lg-6 form-group gsap-reveal">
                        
                        <input name='subject' required value={formData.subject} onChange={handleChange} className="form-control" id="subject" placeholder="subject" type="text" />
                    </div>
                    <div className="col-lg-12 form-group gsap-reveal">
                        
                        <textarea name="message" id="message" cols="5" rows="5" className="form-control" required value={formData.message} onChange={handleChange}   placeholder="type message here"></textarea>
                       
                    </div>
                    </div>
                    <div className="form-group row gsap-reveal">
                    <div className="col-md-12 d-flex align-items-center">
                        <button type="submit" className="btn btn-outline-pill btn-custom-light mr-3" onClick={sendEmail}>SEND MESSAGE</button>
                    </div>
                    </div>
                </form>
               
                </div>

                <div className="col-md-4">
                <div className="contact-info-v1">
                    <div className="gsap-reveal d-block">
                    <span className="d-block contact-info-label">address</span>
                    <address className="contact-info-val">nairobi, <br/>kenya</address>
                    </div>
                </div>
                </div>

            </div>
            </div>
        </div>
        </>
     );
}

export default Home;