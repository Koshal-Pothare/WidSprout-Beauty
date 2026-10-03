import React, { useLayoutEffect, useEffect, useRef } from "react";
import { Sparkles, Leaf, Droplets, Flower2 } from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate, useLocation, Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import landingpageImage from "../assets/landingPage.png";
import toner1 from "../assets/tonner1.png";
import home2 from "../assets/home2.png";

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
  const aboutTriggerRef = useRef(null);

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

        let entranceTween = null;

        // =================================================
        // HERO POSITION
        // =================================================

        const setHeroPosition = () => {
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
            opacity: 1,
          });
        };

        // =================================================
        // CALCULATE ABOUT TARGET
        // =================================================

        const getAboutTarget = () => {
          const anchorRect = anchor.getBoundingClientRect();
          const aboutRect = about.getBoundingClientRect();

          const bottleWidth = bottle.offsetWidth;
          const bottleHeight = bottle.offsetHeight;

          const targetScale = 1.2;

          // Document position of About section
          const aboutDocumentTop =
            aboutRect.top + window.scrollY;

          // Scroll position when:
          // About center === viewport center
          const aboutEndScroll =
            aboutDocumentTop +
            about.offsetHeight / 2 -
            window.innerHeight / 2;

          // Document position of anchor center
          const anchorDocumentX =
            anchorRect.left +
            window.scrollX +
            anchorRect.width / 2;

          const anchorDocumentY =
            anchorRect.top +
            window.scrollY +
            anchorRect.height / 2;

          // Where the anchor will appear in viewport
          // when ScrollTrigger reaches "center center"
          const targetViewportX =
            anchorDocumentX - window.scrollX;

          const targetViewportY =
            anchorDocumentY - aboutEndScroll ;

        

          const targetX =
            targetViewportX -
            window.innerWidth / 2 -
            bottleWidth * (targetScale / 2 - 0.4);

          const targetY =
            targetViewportY -
            window.innerHeight / 2 -
            bottleHeight * (targetScale / 2 - 0.4);

          return {
            x: targetX,
            y: targetY,
          };
        };

        // =================================================
        // CREATE BOTTLE SCROLL
        // =================================================

        const createBottleScroll = (resetToHero = true) => {
          if (bottleScrollTriggerRef.current) {
            bottleScrollTriggerRef.current.kill();
            bottleScrollTriggerRef.current = null;
          }

          if (resetToHero) {
            setHeroPosition();
          }

          

          const tween = gsap.fromTo(
            bottle,
            {
              position: "fixed",
              top: "50%",
              left: "50%",
              xPercent: -40,
              yPercent: -40,
              x: 0,
              y: -10,
              scale: 1.8,
              rotation: 20,
              opacity: 1,
            },
            {
              x: () => getAboutTarget().x,
              y: () => getAboutTarget().y,
              scale: 1.2,
              rotation: 0,
              ease: "none",

              scrollTrigger: {
                trigger: about,

                // Start moving when About enters viewport
                start: "top bottom",

                // Finish when About reaches viewport center
                end: "center center",

                scrub: true,

                invalidateOnRefresh: true,

                pin: false,
              },
            }
          );

          bottleScrollTriggerRef.current =
            tween.scrollTrigger;
        };

        // =================================================
        // INITIAL BOTTLE STATE
        // =================================================

        gsap.set(bottle, {
          position: "fixed",
          top: "50%",
          left: "50%",
          xPercent: -40,
          yPercent: -40,
          x: 0,
          y: 80,
          scale: 1.8,
          rotation: 20,
          opacity: 0,
        });

        // =================================================
        // 1. BOTTLE ENTRANCE
        // =================================================

        entranceTween = gsap.to(bottle, {
          y: -10,
          opacity: 1,
          duration: 1,
          delay: 1,
          ease: "power2.out",

          onComplete: () => {
            createBottleScroll(true);
          },
        });

        // =================================================
        // 2. ABOUT HANDOFF
        // =================================================

        const aboutTrigger = ScrollTrigger.create({
          trigger: about,

          start: "center center",

          // =================================================
          // HERO → ABOUT
          // =================================================

          onEnter: () => {
           

            const anchorRect =
              anchor.getBoundingClientRect();

            const anchorDocumentX =
              anchorRect.left +
              window.scrollX +
              anchorRect.width / 2;

            const anchorDocumentY =
              anchorRect.top +
              window.scrollY +
              anchorRect.height / 2 - 10;

            // Stop the scrub animation
            if (bottleScrollTriggerRef.current) {
              bottleScrollTriggerRef.current.kill();
              bottleScrollTriggerRef.current = null;
            }

            // Place bottle exactly at anchor
            gsap.set(bottle, {
              position: "absolute",

              top: anchorDocumentY,
              left: anchorDocumentX,

              xPercent: -50,
              yPercent: -50,

              x: 0,
              y: 0,

              scale: 1.2,
              rotation: 0,

              opacity: 1,
            });
          },

          // =================================================
          // ABOUT → HERO
          // =================================================

          onLeaveBack: () => {
         

            const anchorRect =
              anchor.getBoundingClientRect();

            const bottleWidth =
              bottle.offsetWidth;

            const bottleHeight =
              bottle.offsetHeight;

            const targetScale = 1.2;

            const targetViewportX =
              anchorRect.left +
              anchorRect.width / 2;

            const targetViewportY =
              anchorRect.top +
              anchorRect.height / 2;

            const fixedX =
              targetViewportX -
              window.innerWidth / 2 -
              bottleWidth *
                (targetScale / 2 - 0.4);

            const fixedY =
              targetViewportY -
              window.innerHeight / 2 -
              bottleHeight *
                (targetScale / 2 - 0.4);

            /*
              Switch to fixed WITHOUT moving visually.
            */

            gsap.set(bottle, {
              position: "fixed",
              top: "50%",
              left: "50%",

              xPercent: -40,
              yPercent: -40,

              x: fixedX,
              y: fixedY,

              scale: 1.2,
              rotation: 0,

              opacity: 1,
            });

            
            createBottleScroll(false);
          },
        });

        aboutTriggerRef.current = aboutTrigger;

        // =================================================
        // REFRESH
        // =================================================

        const refresh = () => {
          ScrollTrigger.refresh();
        };

        window.addEventListener("load", refresh);

        // Give layout/images time to settle
        requestAnimationFrame(() => {
          ScrollTrigger.refresh();
        });

        // =================================================
        // CLEANUP
        // =================================================

        return () => {
          window.removeEventListener("load", refresh);

          if (entranceTween) {
            entranceTween.kill();
          }

          if (bottleScrollTriggerRef.current) {
            bottleScrollTriggerRef.current.kill();
            bottleScrollTriggerRef.current = null;
          }

          if (aboutTriggerRef.current) {
            aboutTriggerRef.current.kill();
            aboutTriggerRef.current = null;
          }
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
    <div
      ref={homeRef}
      className="relative overflow-x-hidden"
    >

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
          HERO
      ================================================= */}

      <section
        id="Home"
        className="w-full h-screen relative overflow-hidden md:scroll-mt-24"
      >
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
              whileInView={{
                y: 0,
                opacity: 0.9,
              }}
              transition={{
                duration: 1,
                ease: "easeOut",
              }}
              viewport={{ once: true }}
              className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl tracking-tight sm:tracking-wide md:tracking-wide lg:tracking-wide text-center"
              style={{ fontFamily: "Cinzel" }}
            >
              WILDSPROUT
            </motion.h1>

            <motion.h1
              initial={{
                y: 50,
                opacity: 0,
              }}
              whileInView={{
                y: 0,
                opacity: 0.9,
              }}
              transition={{
                duration: 1,
                ease: "easeOut",
                delay: 1.5,
              }}
              viewport={{ once: true }}
              className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold tracking-widest italic"
              style={{
                fontFamily:
                  "Dancing Script, cursive",
              }}
            >
              Beauty
            </motion.h1>
          </div>

          {/* DESCRIPTION */}

          <motion.div
            initial={{
              x: -60,
              opacity: 0,
            }}
            whileInView={{
              x: 0,
              opacity: 1,
            }}
            transition={{
              duration: 1,
              ease: "easeOut",
              delay: 1,
            }}
            viewport={{ once: true }}
            className="absolute bottom-24 left-6 sm:left-12 max-w-xs z-20"
          >
            <p className="text-sm sm:text-base leading-relaxed">
              Nature-powered skincare crafted with
              purity, care, and elegance.
            </p>
          </motion.div>

          {/* SHOP BUTTON */}

          <motion.div
            initial={{
              x: 60,
              opacity: 0,
            }}
            whileInView={{
              x: 0,
              opacity: 1,
            }}
            transition={{
              duration: 1,
              ease: "easeOut",
              delay: 1,
            }}
            viewport={{ once: true }}
            className="absolute bottom-10 sm:bottom-20 right-1/2 translate-x-1/2 sm:right-12 sm:translate-x-0 z-20"
          >
            <button
              onClick={() =>
                navigate("/all-products")
              }
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
        className="w-full py-8 md:py-20 scroll-mt-28 relative md:h-[800px] overflow-hidden mt-10"
      >
        <div className="max-w-[1100px] mx-auto lg:px-6 mt-15">

          <div className="w-full flex justify-between items-center rounded-lg px-6">

            {/* =================================================
                ABOUT TEXT
            ================================================= */}

            <motion.div
              initial={{
                opacity: 0,
                x: -50,
              }}
              whileInView={{
                opacity: 1,
                x: 0,
              }}
              transition={{
                duration: 1,
                ease: "easeOut",
              }}
              viewport={{
                once: true,
                amount: 0.25,
              }}
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
                At WildSprout Beauty, we believe
                skincare should feel like a ritual,
                not a routine. Inspired by nature and
                crafted with intention, our formulations
                bring together thoughtfully selected
                botanicals and gentle care.
              </p>

              <p className="text-[15px] md:text-base text-[#59483b] leading-8 max-w-lg mb-5">
                Every product is created to respect
                your skin's natural balance — helping
                you care for your skin beautifully,
                consciously, and effortlessly.
              </p>

              {/* FEATURES */}

              <div className="grid grid-cols-2 gap-6">

                {[
                  {
                    icon: Leaf,
                    text: "100% Natural",
                  },
                  {
                    icon: Sparkles,
                    text: "Cruelty Free",
                  },
                  {
                    icon: Droplets,
                    text: "Deep Hydration",
                  },
                  {
                    icon: Flower2,
                    text: "Ancient Wisdom",
                  },
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    variants={{
                      hidden: {
                        opacity: 0,
                        y: 15,
                      },
                      visible: {
                        opacity: 1,
                        y: 0,
                      },
                    }}
                    whileHover={{
                      y: -6,
                    }}
                    className="flex items-center gap-4 rounded-2xl bg-white/40 backdrop-blur-md p-4 shadow-lg"
                  >
                    <item.icon className="text-[#8b5a2b]" />

                    <span className="text-[#6b3f1d] font-medium">
                      {item.text}
                    </span>
                  </motion.div>
                ))}

              </div>

              {/* SHOP BUTTON */}

              <div className="flex justify-center">

                <motion.button
                  whileHover={{
                    scale: 1.05,
                  }}
                  whileTap={{
                    scale: 0.95,
                  }}
                  className="mt-6 w-fit rounded-full bg-[#8b5a2b] px-8 py-3 text-white shadow-xl hover:bg-[#6b3f1d] transition-colors duration-300"
                  onClick={() =>
                    window.scrollTo({
                      top: 0,
                      behavior: "smooth",
                    })
                  }
                >
                  <Link to="/all-products">
                    Shop the Ritual
                  </Link>
                </motion.button>

              </div>

            </motion.div>

            {/* =================================================
                ABOUT IMAGE
            ================================================= */}

            <div
              className="hidden md:block relative w-100 h-[520px] mt-10 rounded-full overflow-hidden"
              style={{
                backgroundImage: `url(${home2})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
              }}
            >

              {/* =================================================
                  BOTTLE TARGET
              ================================================= */}

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

      <Products />

      <Reviews />

    </div>
  );
};

export default Home;