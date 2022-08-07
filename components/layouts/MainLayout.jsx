import React, { useEffect, useState, Fragment } from 'react';
import Header from './../common/Header';
import Footer from './../common/Footer';

const MainLayout = props => {
    // state for handle backToTop btn showing 
    const [btnDisplay, setBtnDisplay] = useState(false)

    useEffect(() => {
       document.body.addEventListener("scroll", () => {
        if (document.body.scrollTop > 50|| document.documentElement.scrollTop > 50) {
            // display "back to top" button during scroll down
            setBtnDisplay(true);
          } else {
            // hide "back to top" button during going to top of the page
            setBtnDisplay(false);
          }
       }) 
    },[])
    // function for going to top of the page
    const backToTop = () => {
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
    }
    return ( 
        <Fragment>
            <Header />
            <main>
                <div className="row mx-lg-2 mx-xl-5 justify-content-around" style={{marginBottom: '100px'}}>
                    <div className="col-11 col-md-10 col-xl-8 order-md-0 mx-auto mb-3 px-0">{props.children}</div>
                </div>
            </main>
            <button id="backToTop" className={btnDisplay ? "d-block btn btn-info" : "d-none" } onClick={() => backToTop()} title="رفتن به بالای صفحه">
                <i className="fa fa-hand-pointer-o" aria-hidden="true"></i>
            </button>
            <Footer />
        </Fragment>
     );
}
 
export default MainLayout;