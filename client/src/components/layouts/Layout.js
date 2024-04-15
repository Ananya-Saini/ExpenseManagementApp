// import React from 'react';
// import Header from './header';
// import Footer from './footer';

// const Layout = ({ children }) => {
//   return (
//     <>
//       <Header />
//       <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', zIndex: '-1'}}>
//         {/* <img src='Home-cpy.png' alt=' ' className='' style={{height: '50vh'}}></img> */}
//         <video playsInline autoPlay loop>
//           <source src="Revenue.mp4" type="video/mp4" />
//         </video>

//         <div style={{ display: 'flex', flexDirection: 'column' }}>
//           <p className='h1'>Financial freedom starts here.</p>
//           <p className='h5'>Manage your money with confidence.</p>
//         </div>
//         <img src='liquid.webp' alt=''></img>
//       </div>
//       <div style={{ display: 'flex', flexDirection: 'column', flex: '1' }}>
//         {children}
//       </div>
//       <Footer className='fixed-bottom' style={{ position: 'fixed', bottom: '0px' }} />
//     </>
//   )
// }
// export default Layout;

import React from 'react';
import Header from './header';
import Footer from './footer';

const Layout = ({ children }) => {
  return (
    <>
      <Header />
      <div style={{ position: 'relative', overflow: 'hidden', height: '100vh', display: 'flex', flexDirection: 'row-reverse' }}>
        <video playsInline autoPlay loop style={{ width: '50%', height: '100%', marginTop: '2rem' }}>
          <source src="Revenue.mp4" type="video/mp4" />
        </video>
        
        <div style={{ position: 'absolute', top: '50%', left: '25%', transform: 'translate(-50%, -50%)', zIndex:'1', color:'#018bfa', padding: '20px'}}>
          <h1 style={{ fontSize:'3em'}}>Financial Freedom Starts Here.</h1>
          <p style={{ fontSize:'1.5em'}}>Manage Your Money with Confidence.</p>
        </div>

        {/* <img src='liquid.webp' alt=''></img> */}
      </div>

      <div style={{ position:'relative',display: 'flex', flexDirection: 'column', flexShrink:'0' }}>
        {children}
      </div>

      <Footer className='fixed-bottom' />
    </>
  )
}

export default Layout;
