
function Home() {
    return (
        <footer className="unslate_co--footer unslate_co--section">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-7">
              
              <div className="footer-site-logo"><a href="#">kevin<span>.</span></a></div>
              <ul className="footer-site-social">
                <li><a href="http://github.com/odhiambokevin" target="_blank">Github</a></li>
              </ul>

              <p className="site-copyright">
                Copyright &copy;
                <script>
                  document.write(new Date().getFullYear());
                </script> All rights reserved. <a href="http://colorlib.com" target="_blank" style={{cursor: "pointer"}}>Colorlib</a>
 
              </p>
            </div>
          </div>
        </div>
      </footer>
     );
}

export default Home;