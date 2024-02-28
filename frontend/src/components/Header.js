
function Home() {
    return (
        <nav className="unslate_co--site-nav site-nav-target">

        <div className="container">
        
          <div className="row align-items-center justify-content-between text-left">
            <div className="col-md-5 text-right">
              <ul className="site-nav-ul js-clone-nav text-left d-none d-lg-inline-block">
                <li><a href="/" className="nav-link">home</a></li>
                <li><a href="/#portfolio-section" className="nav-link">portfolio</a></li>
                <li><a href="/#about-section" className="nav-link">about</a></li>
              </ul>
            </div>
            <div className="site-logo pos-absolute">
              <a href="/" className="unslate_co--site-logo">kevin<span>.</span></a>
            </div>
            <div className="col-md-5 text-right text-lg-left">
              <ul className="site-nav-ul js-clone-nav text-left d-none d-lg-inline-block">
                <li><a href="/#services-section" className="nav-link">services</a></li>
                <li><a href="/#journal-section" className="nav-link">blog</a></li>
                <li><a href="/#contact-section" className="nav-link">contact</a></li>
              </ul>

              <ul className="site-nav-ul-none-onepage text-right d-inline-block d-lg-none">
                <li><a href="#" className="js-menu-toggle">menu</a></li>
              </ul>

            </div>
          </div>
        </div>

      </nav>
     );
}

export default Home;