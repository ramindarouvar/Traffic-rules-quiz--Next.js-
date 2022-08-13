import Image from 'next/image';
import Link from 'next/link';
import { Fragment, memo } from 'react';

const Header = () => {
    return ( 
        <Fragment>
            <header>
                <Link href='/' passHref>
                    <a className='web-header'>
                        <div className="d-flex flex-row justify-content-between web-header mb-3">
                            <Image src="/images/lights.png" width='90' height='122' className="img-fluid d-none d-lg-inline" alt="traffic-lights"/>
                            <div className="p-2 p-lg-0 align-self-center web-title">
                                <p className="header-title text-center m-0 pt-1 pb-2">
                                    آزمون آیین نامه راهنمایی و رانندگی
                                </p>
                            </div>
                            <Image src="/images/Warning.png" width='120' height='90' className="img-fluid d-none d-lg-inline" alt="warning-sign"/>
                        </div>
                    </a>
                </Link>
            </header>
        </Fragment>
     );
}
 
export default memo(Header);