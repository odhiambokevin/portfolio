import {
  Outlet,
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements
} from 'react-router-dom';

import ScrollToTop from './ScrollToTop';
import Footer from "./components/Footer";
import Header from "./components/Header";
import Blog from "./pages/Blog";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import Portfolio from "./pages/Portfolio";

export const AppLayout = ()=>{
  return(
    <>
    <ScrollToTop />
    <nav className="unslate_co--site-mobile-menu">
      <div className="close-wrap d-flex">
        <a href="/" className="d-flex ml-auto js-menu-toggle">
          <span className="close-label">Close</span>
          <div className="close-times">
            <span className="bar1"></span>
            <span className="bar2"></span>
          </div>
        </a>
      </div>
      <div className="site-mobile-inner"></div>
    </nav>

    <div className="unslate_co--site-wrap">
      <div className="unslate_co--site-inner">
        <div className="lines-wrap">
          <div className="lines-inner">
            <div className="lines"></div>
          </div>
        </div>
        <Header />
        <Outlet />
      </div>
      <Footer />
    </div>
    
    <div id="unslate_co--overlayer"></div>
    <div className="site-loader-wrap">
      <div className="site-loader"></div>
    </div>
    </>
  )
};

const router = createBrowserRouter(createRoutesFromElements(
  <Route path='/' element={<AppLayout />} errorElement={<NotFound />}>
    <Route index element={<Home />} />
    <Route path='blog/:slug' element={<Blog />} />
    <Route path='portfolio/:work' element={<Portfolio />} />
  </Route>
 
  ));

function App() {
  
  return (
  <RouterProvider router={router} />   
  );
}

export default App;


