import React from 'react';
import Header from './header';
import Footer from './footer';

const Layout = ({children}) => {
  return (
    <>
        <Header />
        {/* <img src='business-growth-animate.svg'></img> */}
        {/* style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}} */}
        <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
        <img src='Home-cpy.png' alt=' ' className='' style={{height: '50vh'}}></img>
        <p className='h1'>Financial freedom starts here. Manage your money with confidence.</p>
        </div>
        <div className='content' style={{ display: 'flex', flexDirection: 'column', flex: '1'}}>
            {children}
        </div>
        <Footer className='fixed-bottom' style={{position: 'fixed', bottom: '0px'}} />
    </>
  )
}
export default Layout;