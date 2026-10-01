// import React from 'react'
// import Landingpage from './Landingpage.jsx'
// import About from '../components/About.jsx'
// import About2 from '../components/About2.jsx'
// import Products from '../components/Products.jsx'
// import Reviews from '../components/Reviews.jsx'
// import Footer from '../components/Footer.jsx'
// import toner1 from '../assets/tonner1.png';

// import { useLocation } from 'react-router-dom';
// import { useEffect , useRef } from 'react';
// import {motion} from 'framer-motion'

// import gsap from 'gsap';
// import { ScrollTrigger } from 'gsap/ScrollTrigger';



// gsap.registerPlugin(ScrollTrigger);



// const Home = () => {

// const isDesktop = window.innerWidth >= 768;

// const toner1Ref = useRef(null);


// useEffect(() => {

//   if(!isDesktop) return;

//    const mm = gsap.matchMedia();

//      mm.add("(min-width: 768px)", () => {

//       // main position
//    gsap.set(toner1Ref.current, 
//     {  xPercent: -40,yPercent: -40,  rotation: 20, scale: 1.8, }
//   );

// // intro animation
//   gsap.fromTo(
//       toner1Ref.current,
//       { y: 80, opacity: 0 },
//       { y: -10,opacity: 1, duration: 1, ease: "power2.out",delay: 1}
//     );

//       // Scroll animation → About
//     gsap.to(toner1Ref.current, {
//       x: "22vw",
//       y: "24vh",
//       scale: 1.2,
//    rotation:-0.1,
//       ease: "none",
//       scrollTrigger: {
//         trigger: "#About",
//         start: "top bottom",
//         end: "center center",
//         scrub: true,
//         pin: false,
//       },
//     });

// ScrollTrigger.create({
//   trigger: "#About",
//   start: "center center",

//   onEnter: () => {
//     const anchor = document.getElementById("about-bottle-anchor");
//     const rect = anchor.getBoundingClientRect();



//     gsap.set(toner1Ref.current, {
//       position: "absolute",
//       top: rect.top + window.scrollY,
//       left: rect.left + window.scrollX,
//       xPercent: -50,
//       yPercent: -60,
//     });
//   },

//   onLeaveBack: () => {
//     // 🔁 restore Landing state
//     gsap.set(toner1Ref.current, {
//       position: "fixed",
//       top: "28%",
//       left: "50%",
//       xPercent: -45,
//       yPercent: -8,
//       scale: 1.8,
//       rotation: 20,
//     });
//   },
// });
//      });

//       return () => mm.revert();

//   }, []);

// const location = useLocation();

//   useEffect(() => {
//     if (!location.state?.scrollTo) return;

//     const id = location.state.scrollTo;

//     const timer = setTimeout(() => {
//       const section = document.getElementById(id);
//       section?.scrollIntoView({ behavior: "smooth" ,
//       block: "start"
//        });
//     }, 2500); // wait for Framer Motion

//     return () => clearTimeout(timer);
//   }, [location]);




//   return (


// <div className="relative overflow-x-hidden">
//       {/* Floating bottle */}
//      {isDesktop && (
//   <img
//     ref={toner1Ref}
//     src={toner1}
//     className="fixed top-1/2 left-1/2 w-64 z-40 pointer-events-none"
//     alt="Rose bottle"
//   />
// )}

// {!isDesktop && (
//   <motion.img
//     src={toner1}
//     className=" absolute w-40 z-40 pointer-events-none"
//     alt="Rose bottle"
//       style={{
//       top: "38vh",                 //  overlaps WILDSPROUT text
//       left: "30%",
//       transform: "translateX(-60%)",

//     }}
//     initial={{ opacity: 0, y: 50, scale: 0.9 , rotate:20}}
//     whileInView={{ opacity: 1, y: 0, scale: 1 , rotate:20 }}
//     transition={{ duration: 0.6, ease: "easeOut",delay:1 }}
//     viewport={{ once: true }}
//   />
// )}


//     <Landingpage/>
//      <About />
//      <About2 />
//       <Products />
//       <Reviews  /> 


// </div>
//   )
// }

// export default Home





import React, { useLayoutEffect, useEffect, useRef } from "react";
import { Sparkles, Leaf, Droplets, Flower2 } from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate, useLocation, Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import landingpageImage from "../assets/landingPage.png";
import toner1 from "../assets/tonner1.png";
import home2 from "../assets/home2.png";

import About2 from "../components/About2.jsx";
import Products from "../components/Products.jsx";
import Reviews from "../components/Reviews.jsx";

gsap.registerPlugin(ScrollTrigger);

const Home = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // =====================================================
  // REFS
  // =====================================================

  const homeRef = useRef(null);
  const bottleRef = useRef(null);
  const aboutRef = useRef(null);
  const aboutAnchorRef = useRef(null);
  const bottleScrollTriggerRef = useRef(null);

  // =====================================================
  // GSAP
  // =====================================================

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      // =================================================
      // DESKTOP
      // =================================================

      mm.add("(min-width: 768px)", () => {
        const bottle = bottleRef.current;
        const about = aboutRef.current;
        const anchor = aboutAnchorRef.current;

        if (!bottle || !about || !anchor) return;

        // Initial bottle state
        gsap.set(bottle, {
          position: "fixed",
          top: "50%",
          left: "50%",
          xPercent: -40,
          yPercent: -40,
          rotation: 20,
          scale: 1.8,
          opacity: 0,
        });

        // Bottle entrance animation
        gsap.fromTo(
          bottle,
          { y: 80, opacity: 0 },
          {
            y: -10,
            opacity: 1,
            duration: 1,
            ease: "power2.out",
            delay: 1,
          }
        );

        // =================================================
        // CREATE LANDING → ABOUT BOTTLE SCROLL
        // =================================================

        const createBottleScroll = () => {
          if (bottleScrollTriggerRef.current) {
            bottleScrollTriggerRef.current.kill();
          }

          gsap.set(bottle, {
            position: "fixed",
            top: "50%",
            left: "50%",
            xPercent: -40,
            yPercent: -40,
            x: 0,
            y: -10,
            scale: 1.8,
            rotation: 20,
          });

          const tween = gsap.to(bottle, {
            x: "22vw",
            y: "24vh",
            scale: 1.2,
            rotation: -0.1,
            ease: "none",
            scrollTrigger: {
              trigger: about,
              start: "top bottom",
              end: "center center",
              scrub: true,
              pin: false,
              invalidateOnRefresh: true,
            },
          });

          bottleScrollTriggerRef.current = tween.scrollTrigger;
        };

        createBottleScroll();

        // =================================================
        // ABOUT HANDOFF
        // =================================================

        const aboutTrigger = ScrollTrigger.create({
          trigger: about,
          start: "center center",

          onEnter: () => {
            if (bottleScrollTriggerRef.current) {
              bottleScrollTriggerRef.current.kill();
              bottleScrollTriggerRef.current = null;
            }

            const rect = anchor.getBoundingClientRect();

            gsap.set(bottle, {
              x: 0,
              y: 0,
              rotation: 0,
              scale: 1.2,
            });

            gsap.set(bottle, {
              position: "absolute",
              top: rect.top + window.scrollY,
              left: rect.left + window.scrollX,
              xPercent: -50,
              yPercent: -60,
              scale: 1.2,
              rotation: 0,
            });
          },

          onLeaveBack: () => {
            gsap.set(bottle, {
              position: "fixed",
              top: "28%",
              left: "50%",
              xPercent: -45,
              yPercent: -8,
              x: 0,
              y: 0,
              scale: 1.8,
              rotation: 20,
            });

            createBottleScroll();
          },
        });

        // =================================================
        // REFRESH
        // =================================================

        const refresh = () => {
          ScrollTrigger.refresh();
        };

        window.addEventListener("load", refresh);

        // =================================================
        // CLEANUP
        // =================================================

        return () => {
          window.removeEventListener("load", refresh);

          if (bottleScrollTriggerRef.current) {
            bottleScrollTriggerRef.current.kill();
            bottleScrollTriggerRef.current = null;
          }

          aboutTrigger.kill();
        };
      });

      // =================================================
      // MOBILE
      // =================================================

      mm.add("(max-width: 767px)", () => {
        const bottle = bottleRef.current;

        if (!bottle) return;

        gsap.set(bottle, {
          position: "absolute",
          top: "38vh",
          left: "30%",
          xPercent: -60,
          y: 50,
          scale: 0.9,
          rotation: 20,
          opacity: 0,
        });

        gsap.to(bottle, {
          opacity: 1,
          y: 0,
          scale: 1,
          rotation: 20,
          duration: 0.6,
          ease: "power2.out",
          delay: 1,
        });
      });
    }, homeRef);

    return () => ctx.revert();
  }, []);

  // =====================================================
  // NAVIGATION SCROLL
  // =====================================================

  useEffect(() => {
    if (!location.state?.scrollTo) return;

    const id = location.state.scrollTo;

    const timer = setTimeout(() => {
      const section = document.getElementById(id);

      section?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 1000);

    return () => clearTimeout(timer);
  }, [location]);

  // =====================================================
  // JSX
  // =====================================================

  return (
    <div ref={homeRef} className="relative overflow-x-hidden">

      {/* =================================================
          FLOATING BOTTLE
      ================================================= */}

      <img
        ref={bottleRef}
        src={toner1}
        alt="Rose bottle"
        className="fixed top-1/2 left-1/2 w-64 z-40 pointer-events-none"
      />

      {/* =================================================
          LANDING PAGE
      ================================================= */}

      <section id="Home" className="w-full h-screen relative overflow-hidden md:scroll-mt-24">
        <div
          className="relative flex items-center justify-center overflow-visible h-full"
          style={{
            backgroundImage: `url(${landingpageImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        >

          {/* CENTER TITLE */}

          <div className="text-center relative z-0 md:-translate-y-11">
            <motion.h1
              initial={{ y: 120, opacity: 0 }}
              whileInView={{ y: 0, opacity: 0.9 }}
              transition={{ duration: 1, ease: "easeOut" }}
              viewport={{ once: true }}
              className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl tracking-tight sm:tracking-wide md:tracking-wide lg:tracking-wide text-center"
              style={{ fontFamily: "Cinzel" }}
            >
              WILDSPROUT
            </motion.h1>

            <motion.h1
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 0.9 }}
              transition={{ duration: 1, ease: "easeOut", delay: 1.5 }}
              viewport={{ once: true }}
              className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold tracking-widest italic"
              style={{ fontFamily: "Dancing Script, cursive" }}
            >
              Beauty
            </motion.h1>
          </div>

          {/* DESCRIPTION */}

          <motion.div
            initial={{ x: -60, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 1, ease: "easeOut", delay: 1 }}
            viewport={{ once: true }}
            className="absolute bottom-24 left-6 sm:left-12 max-w-xs z-20"
          >
            <p className="text-sm sm:text-base leading-relaxed">
              Nature-powered skincare crafted with purity, care, and elegance.
            </p>
          </motion.div>

          {/* SHOP BUTTON */}

          <motion.div
            initial={{ x: 60, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 1, ease: "easeOut", delay: 1 }}
            viewport={{ once: true }}
            className="absolute bottom-10 sm:bottom-20 right-1/2 translate-x-1/2 sm:right-12 sm:translate-x-0 z-20"
          >
            <button
              onClick={() => navigate("/all-products")}
              className="px-6 py-3 text-sm tracking-widest border border-black rounded-full bg-black text-white transition-all duration-300 ease-in-out hover:scale-105"
            >
              SHOP NOW
            </button>
          </motion.div>
        </div>
      </section>

      {/* =================================================
          ABOUT
      ================================================= */}

      <section
        ref={aboutRef}
        id="About"
        className="w-full py-8 md:py-20 scroll-mt-28 relative md:h-[800px] overflow-hidden mt-10 "
      >
        <div className="max-w-[1100px] mx-auto lg:px-6  mt-15">

          {/* ABOUT CONTENT */}

          <div className="w-full flex justify-between items-center rounded-lg px-6 ">

            {/* TEXT */}

            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
              viewport={{ once: true, amount: 0.25 }}
              className="max-w-xl"
            >
              <p className="uppercase tracking-[0.28em] text-[11px] text-[#a66a2c] mb-5">
                About WildSprout
              </p>

              <h2 className="font-serif text-4xl md:text-5xl lg:text-[56px] leading-[1.08] text-[#241914] mb-4">
                Beauty,
                <br />
                <span className="italic text-[#a86b2e]">
                  Rooted in Nature.
                </span>
              </h2>

              <p className="text-[15px] md:text-base text-[#59483b] leading-8 max-w-lg mb-5">
                At WildSprout Beauty, we believe skincare should feel like a ritual, not a routine. Inspired by nature and crafted with intention, our formulations bring together thoughtfully selected botanicals and gentle care.
              </p>

              <p className="text-[15px] md:text-base text-[#59483b] leading-8 max-w-lg mb-5">
                Every product is created to respect your skin's natural balance — helping you care for your skin beautifully, consciously, and effortlessly.
              </p>

              <div className="grid grid-cols-2 gap-6">
                {[
                  { icon: Leaf, text: "100% Natural" },
                  { icon: Sparkles, text: "Cruelty Free" },
                  { icon: Droplets, text: "Deep Hydration" },
                  { icon: Flower2, text: "Ancient Wisdom" },
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    variants={{
                      hidden: { opacity: 0, y: 15 },
                      visible: { opacity: 1, y: 0 },
                    }}
                    whileHover={{ y: -6 }}
                    className="flex items-center gap-4 rounded-2xl bg-white/40 backdrop-blur-md p-4 shadow-lg"
                  >
                    <item.icon className="text-[#8b5a2b]" />
                    <span className="text-[#6b3f1d] font-medium">
                      {item.text}
                    </span>
                  </motion.div>
                ))}
              </div>

              <div className="flex justify-center">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="mt-6 w-fit rounded-full bg-[#8b5a2b] px-8 py-3 text-white shadow-xl hover:bg-[#6b3f1d] transition-colors duration-300"
                  onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                >
                  <Link to="/all-products">Shop the Ritual</Link>
                </motion.button>
              </div>
            </motion.div>

            {/* ABOUT IMAGE */}

            <div
              className="hidden md:block relative w-100 h-[520px] rounded-full overflow-hidden"
              style={{
                backgroundImage: `url(${home2})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
              }}
            >
              {/* BOTTLE TARGET */}

              <div
                ref={aboutAnchorRef}
                id="about-bottle-anchor"
                className="absolute top-1/2 left-1/2"
              />
            </div>

          </div>
        </div>
      </section>

      {/* =================================================
          OTHER SECTIONS
      ================================================= */}

      {/* <About2 /> */}
      <Products />
      <Reviews />

    </div>
  );
};

export default Home;