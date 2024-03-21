import { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

function Footer() {
  const location = useLocation();
  const { pathname } = location;
  const splitLocation = pathname.split('/');

  useEffect(() => {
    if (location.hash) {
        let elem = document.getElementById(location.hash.slice(1))
        if (elem) {
            elem.scrollIntoView({behavior: 'smooth'})
        }
    } else {
        window.scrollTo({top: 0, left: 0, behavior: 'smooth'})
    }
    
}, [location]);
    return (
        <footer className="unslate_co--footer unslate_co--section">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-7">
              
              <div className="footer-site-logo">
                <Link to="/#home-section">kevin<span>.</span></Link>
                </div>
              <ul className="footer-site-social"> 
                <li><a href="http://github.com/odhiambokevin" target="_blank" rel="noopener noreferrer"><span className="icon-github" style={{fontSize: "20px"}}><i ></i></span></a></li>
              </ul>

              <p className="site-copyright">
                Copyright &copy; {(new Date().getFullYear())} All rights reserved. <a href="http://colorlib.com" target="_blank" rel="noopener noreferrer">Colorlib</a>
              </p>
            </div>
          </div>
        </div>
      </footer>
     );
}

export default Footer;