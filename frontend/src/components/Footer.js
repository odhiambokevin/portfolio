
function Home() {
    return (
        <footer className="unslate_co--footer unslate_co--section">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-7">
              
              <div className="footer-site-logo"><a href="#">kevin<span>.</span></a></div>
              <ul className="footer-site-social"> 
                <li><a href="http://github.com/odhiambokevin" target="_blank" rel="noopener"><span className="icon-github" style={{fontSize: "20px"}}><i ></i></span></a></li>
              </ul>

              <p className="site-copyright">
                Copyright &copy; {(new Date().getFullYear())} All rights reserved. <a href="http://colorlib.com" target="_blank" rel="noopener">Colorlib</a>
              </p>
            </div>
          </div>
        </div>
      </footer>
     );
}

export default Home;