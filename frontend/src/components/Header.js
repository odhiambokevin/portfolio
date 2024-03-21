import { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

function Header() {
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
        <nav className="unslate_co--site-nav site-nav-target">

        <div className="container">
        
          <div className="row align-items-center justify-content-between text-left">
            <div className="col-md-5 text-right">
              <ul className="site-nav-ul js-clone-nav text-left d-none d-lg-inline-block">
                <li><Link to="/" className="nav-link">home</Link></li>
                <li><Link to="/#portfolio-section" className="nav-link">portfolio</Link></li>
                <li><Link to="/#about-section" className="nav-link">about</Link></li>
              </ul>
            </div>
            <div className="site-logo pos-absolute">
              <Link to="/" className="unslate_co--site-logo">kevin<span>.</span></Link>
            </div>
            <div className="col-md-5 text-right text-lg-left">
              <ul className="site-nav-ul js-clone-nav text-left d-none d-lg-inline-block">
                <li><Link to="/#services-section" className="nav-link">skills</Link></li>
                <li><Link to="/#journal-section" className="nav-link">blog</Link></li>
                <li><Link to="/#contact-section" className="nav-link">contact</Link></li>
              </ul>

              <ul className="site-nav-ul-none-onepage text-right d-inline-block d-lg-none">
                <li><Link to="#" className="js-menu-toggle">menu</Link></li>
              </ul>

            </div>
          </div>
        </div>

      </nav>
     );
}

export default Header;