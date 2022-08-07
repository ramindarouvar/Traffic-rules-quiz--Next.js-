import { Fragment, useEffect } from 'react';
import Head from 'next/head';

const PageNotFound = () => {
    useEffect(() => {
        // go to top of the page
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
    },[])
    return ( 
        <Fragment>
            <Head>
                <title>خطای ۴۰۴</title>
            </Head>
            <div className="border rounded w-100 p-5" style={{backgroundColor: "#F7FAFD"}}>
                <div className="text-center">
                    <img src="./images/404.png" className="w-50" alt="404"/>
                </div>
                <div className="px-3 py-2 mt-3 display-4 text-justify text-center font-weight-bold">
                    صفحه مورد نظر یافت نشد ...
                </div>
            </div>
        </Fragment>
     );
}
 
export default PageNotFound;