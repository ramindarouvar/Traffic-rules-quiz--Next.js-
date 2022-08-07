import React from 'react';
import { Fragment } from 'react';

const Header = () => {
    return ( 
        <Fragment>
            <header>
                <div className="row web-header mb-3">
                    <div className="col-sm-2 text-right">
                        <img src="images/lights.png" className="img-fluid d-none d-lg-inline" alt="traffic-lights" style={{width: "34%"}}/>
                    </div>
                    <div className="col-sm p-2 p-lg-0 align-self-center">
                        <p className="header-title text-center m-0 pt-1 pb-2">
                            آزمون آیین نامه راهنمایی و رانندگی
                        </p>
                    </div>
                    <div className="col-sm-2 text-left">
                        <img src="images/Warning.png" className="img-fluid d-none d-lg-inline" alt="warning-sign" style={{width: "45%"}}/>
                    </div>
                </div>
            </header>
        </Fragment>
     );
}
 
export default Header;