import React from 'react'

import {motion} from 'framer-motion';

import { useNavigate } from 'react-router-dom';
import landingpageImage from '../assets/landingPage.png';



const Landingpage = () => {

    const navigate = useNavigate();

  return (
    <section className='  w-full h-screen relative overflow-hidden    md:scroll-mt-24 ' id='Home'>
      <div className=' relative flex items-center justify-center overflow-visible h-full ' 
      style={{backgroundImage: `url(${landingpageImage})`,
         backgroundSize: 'cover',
          backgroundPosition: 'center', 
          backgroundRepeat: 'no-repeat'}}

      >
      <div className="text-center relative z-0 md:-translate-y-11">
        
        <motion.h1  initial={{ y: 120, opacity: 0 }}
          whileInView={{ y: 0, opacity: 0.9 }}
          transition={{ duration: 1, ease: 'easeOut' }}
          viewport={{ once:true  }} className='text-5xl sm:text-7xl md:text-8xl lg:text-9xl   tracking-tight  sm:tracking-wide   md:tracking-wide  lg:tracking-wide text-center  ' style={{fontFamily:'Cinzel'}}>WILDSPROUT</motion.h1>
          

           
        
        <motion.h1 initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 0.9 }}
          transition={{ duration: 1, ease: 'easeOut' ,delay:1.5}}
          viewport={{once:true}}  className='text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold  tracking-widest  italic ' style={{ fontFamily: 'Dancing Script, cursive' }}>Beauty</motion.h1>

      
</div>

 
         
       <motion.div
        initial={{ x: -60, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 1, ease: 'easeOut', delay:1 }}
          viewport={{ once: true }} 
      
       className="absolute bottom-24 left-6 sm:left-12 max-w-xs z-20">
          <p className="text-sm sm:text-base opacity-100 leading-relaxed">
            Nature-powered skincare crafted with purity, care, and elegance.
          </p>
        </motion.div>

    <motion.div 
     initial={{ x: 60, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 1, ease: 'easeOut', delay:1 }}
          viewport={{ once: true }} 

    className="absolute bottom-10 sm:bottom-20 right-1/2 translate-x-1/2 sm:right-12 sm:translate-x-0 z-20   ">
      <button className="px-6  py-3 text-sm tracking-widest border border-black rounded-full hover:bg-black hover:text-white transition-all duration-300"
      onClick={() => {
        navigate('/all-products');
  }}
      >
        SHOP NOW
      </button>
    </motion.div> 
</div>
      
    </section>
  )
}

export default Landingpage