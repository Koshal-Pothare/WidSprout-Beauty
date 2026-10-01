import React from 'react'
import Landingpage from './Landingpage.jsx'
import About from './About.jsx'
import About2 from './About2.jsx'
import Products from './Products.jsx'
import Reviews from './Reviews.jsx'
import Footer from './Footer.jsx'
import toner1 from '../assets/toner1.png';

import { useLocation } from 'react-router-dom';
import { useEffect , useRef } from 'react';
import {motion} from 'framer-motion'

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';



gsap.registerPlugin(ScrollTrigger);



const Home = () => {

const isDesktop = window.innerWidth >= 768;

const toner1Ref = useRef(null);


useEffect(() => {

  if(!isDesktop) return;

   const mm = gsap.matchMedia();

     mm.add("(min-width: 768px)", () => {

      // main position
   gsap.set(toner1Ref.current, 
    {  xPercent: -40,yPercent: -40,  rotation: 20, scale: 1.8, }
  );

// intro animation
  gsap.fromTo(
      toner1Ref.current,
      { y: 80, opacity: 0 },
      { y: -10,opacity: 1, duration: 1, ease: "power2.out",delay: 1}
    );

      // Scroll animation → About
    gsap.to(toner1Ref.current, {
      x: "24vw",
      y: "20vh",
      scale: 1.7,
   rotation:-0.1,
      ease: "none",
      scrollTrigger: {
        trigger: "#About",
        start: "top bottom",
        end: "center center",
        scrub: true,
        pin: false,
      },
    });

ScrollTrigger.create({
  trigger: "#About",
  start: "center center",

  onEnter: () => {
    const anchor = document.getElementById("about-bottle-anchor");
    const rect = anchor.getBoundingClientRect();

    

    gsap.set(toner1Ref.current, {
      position: "absolute",
      top: rect.top + window.scrollY,
      left: rect.left + window.scrollX,
      xPercent: -50,
      yPercent: -60,
    });
  },

  onLeaveBack: () => {
    // 🔁 restore Landing state
    gsap.set(toner1Ref.current, {
      position: "fixed",
      top: "28%",
      left: "50%",
      xPercent: -45,
      yPercent: -8,
      scale: 1.8,
      rotation: 20,
    });
  },
});
     });

      return () => mm.revert();

  }, []);

const location = useLocation();

  useEffect(() => {
    if (!location.state?.scrollTo) return;

    const id = location.state.scrollTo;

    const timer = setTimeout(() => {
      const section = document.getElementById(id);
      section?.scrollIntoView({ behavior: "smooth" ,
      block: "start"
       });
    }, 2500); // wait for Framer Motion

    return () => clearTimeout(timer);
  }, [location]);




  return (
  

<div className="relative overflow-x-hidden">
      {/* Floating bottle */}
     {isDesktop && (
  <img
    ref={toner1Ref}
    src={toner1}
    className="fixed top-1/2 left-1/2 w-56 z-40 pointer-events-none"
    alt="Rose bottle"
  />
)}

{!isDesktop && (
  <motion.img
    src={toner1}
    className=" absolute w-40 z-40 pointer-events-none"
    alt="Rose bottle"
      style={{
      top: "38vh",                 //  overlaps WILDSPROUT text
      left: "30%",
      transform: "translateX(-60%)",
    
    }}
    initial={{ opacity: 0, y: 50, scale: 0.9 , rotate:20}}
    whileInView={{ opacity: 1, y: 0, scale: 1 , rotate:20 }}
    transition={{ duration: 0.6, ease: "easeOut",delay:1 }}
    viewport={{ once: true }}
  />
)}


    <Landingpage/>
     <About />
     <About2 />
      <Products />
      <Reviews  /> 
      <Footer />
    
</div>
  )
}

export default Home