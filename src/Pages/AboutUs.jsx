import React from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Leaf,
  Heart,
  Droplets,
  Globe2,
  ShieldCheck,
} from "lucide-react";
import { useNavigate } from "react-router";

import aboutHero from "../assets/About/about-hero1.png";
import aboutStory from "../assets/About/about-hero.png";
 import aboutPromise from "../assets/About/about-hero.png";


// ANIMATION VARIANTS


const fadeUp = {
  hidden: {
    opacity: 0,
    y: 40,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: "easeOut",
    },
  },
};

const fadeLeft = {
  hidden: {
    opacity: 0,
    x: -50,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.8,
      ease: "easeOut",
    },
  },
};

const fadeRight = {
  hidden: {
    opacity: 0,
    x: 50,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.8,
      ease: "easeOut",
    },
  },
};

const stagger = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};


// VALUES DATA


const values = [
  {
    icon: Leaf,
    title: "Natural & Clean",
    description:
      "We use nature's finest ingredients, free from harsh chemicals.",
  },
  {
    icon: Heart,
    title: "Cruelty Free",
    description:
      "Beauty should never come at the cost of another life.",
  },
  {
    icon: ShieldCheck,
    title: "Safe & Effective",
    description:
      "Thoughtfully formulated to deliver visible results, gently and safely.",
  },
  {
    icon: Globe2,
    title: "Sustainable Choice",
    description:
      "We care for your skin and our planet with eco-conscious practices.",
  },
];



const AboutUs = () => {

    const navigate = useNavigate();

  return (
    <div className="w-full overflow-hidden bg-[#F9F1E5] text-[#181411] ">

{/* hero section */}
   <section
  className="relative min-h-[700px] w-full overflow-hidden bg-cover bg-center bg-no-repeat py-10" 
        style={{ backgroundImage: `url(${aboutHero})` }}>

  {/* LEFT BLEND */}
  <div className="absolute inset-0 bg-gradient-to-r from-[#F8EBDD]/35 via-tranparent to-transparent" />

  {/* BOTTOM BLEND */}
  <div className="absolute inset-x-0 bottom-0 h-24 sm:h-32 bg-gradient-to-t from-[#F9F1E5]/30 to-transparent" />

  {/* CONTENT */}
  <div className="relative z-10 max-w-[1350px] mx-auto px-6 sm:px-10 lg:px-12 min-h-[525px] sm:min-h-[560px] lg:min-h-[525px] flex items-center">

    <motion.div
      initial="hidden"
      animate="visible"
      variants={stagger}
      className="w-full max-w-[520px]"
    >

      {/* LABEL */}
      <motion.p
        variants={fadeUp}
        className="text-[#B2762B] font-medium tracking-[2px] text-[10px] sm:text-xs uppercase mb-4 sm:mb-5"
      >
        About Us
      </motion.p>

      {/* HEADING */}
      <motion.h1
        variants={fadeUp}
        className="font-serif text-[36px] sm:text-[48px] md:text-[56px] lg:text-[60px] xl:text-[64px] leading-[0.98] tracking-[-1.5px]"
      >
        Rooted in Nature,

        <br />

        <span className="text-[#B4772B] italic font-normal">
          Made for You
        </span>
      </motion.h1>

      {/* DESCRIPTION */}
      <motion.p
        variants={fadeUp}
        className="mt-5 sm:mt-7 max-w-[360px] text-[11px] sm:text-[13px] md:text-[14px] leading-5 sm:leading-6 text-[#322A24]"
      >
        At WildSprout Beauty, we believe true beauty begins with
        pure ingredients, conscious choices, and a little love for
        yourself.
      </motion.p>

      {/* BUTTON */}
      <motion.a
        variants={fadeUp}
        href="#story"
        className="group rounded-full mt-5 sm:mt-7 inline-flex items-center justify-between gap-8 min-w-[130px] sm:min-w-[145px] bg-[#191919] text-white px-4 sm:px-5 py-3 sm:py-3.5  text-[11px] sm:text-[13px] font-medium hover:bg-amber-950 transition-colors"
      >
        Our Story

        <ArrowRight
          size={15}
          className="group-hover:translate-x-1 transition-transform"
        />
      </motion.a>

    </motion.div>

  </div>
</section>


      {/* =================================================
          STORY SECTION
      ================================================= */}

      <section
        id="story"
        className="relative py-16 sm:py-20 lg:py-24 px-5 sm:px-8 lg:px-12 bg-[#FBF5EC]"
      >

        <div className="max-w-[1180px] mx-auto grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* IMAGE */}

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={fadeLeft}
            className="relative"
          >

            <div className="relative w-full h-[390px] sm:h-[480px] lg:h-[510px] overflow-hidden rounded-t-[130px] rounded-b-none">

              <img
                src={aboutStory}
                alt="WildSprout skincare"
                className="w-full h-full object-cover transition-transform duration-1000 hover:scale-105"
              />

            </div>


            {/* DECORATIVE LEAF */}

            <div className="absolute -left-10 bottom-0 hidden xl:block">

              <Leaf
                size={90}
                strokeWidth={0.7}
                className="text-[#8EA267]/70 rotate-[-25deg]"
              />

            </div>

          </motion.div>


          {/* CONTENT */}

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={fadeRight}
            className="lg:pl-4"
          >

            <p className="text-[#B2762B] uppercase tracking-[2px] text-[11px] font-semibold">
              Our Story
            </p>


            <h2 className="font-serif text-[34px] sm:text-[42px] lg:text-[44px] leading-[1.1] mt-4">
              Where Purity Meets Purpose
            </h2>


            {/* GOLD LINE */}

            <div className="w-11 h-[1px] bg-[#B98543] mt-5 mb-5" />


            <div className="space-y-4 text-[13px] sm:text-[14px] leading-6 text-[#4C453E] max-w-[500px]">

              <p>
                WildSprout Beauty was born from a simple belief – that
                skincare should be effective, clean, and honest.
              </p>

              <p>
                We started with a passion for natural ingredients and a
                mission to create high-quality skincare that nurtures,
                heals, and brings out your natural glow.
              </p>

              <p>
                Every product is crafted with care, backed by nature,
                and made for real people with real skin.
              </p>

            </div>


            <a
              href="/about"
              className="group inline-flex items-center gap-8 mt-7 border border-[#655D55] px-5 py-3 rounded-md text-[12px] sm:text-[13px] font-medium hover:bg-[#211B16] hover:text-white transition-all"
            >
              Learn More About Us

              <ArrowRight
                size={15}
                className="group-hover:translate-x-1 transition-transform"
              />

            </a>

          </motion.div>

        </div>

      </section>


      {/* =================================================
          VALUES SECTION
      ================================================= */}

      <section className="relative py-16 sm:py-20 lg:py-24 px-5 sm:px-8 lg:px-12 bg-[#F6EBDD]">

        <div className="max-w-[1180px] mx-auto">

          {/* HEADING */}

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="text-center"
          >

            <p className="text-[#B2762B] uppercase tracking-[2px] text-[11px] font-semibold">
              Our Values
            </p>

            <h2 className="font-serif text-[35px] sm:text-[42px] lg:text-[44px] mt-3">
              The WildSprout Way
            </h2>


            {/* DECORATIVE */}

            <div className="flex items-center justify-center gap-3 mt-4">

              <span className="w-10 h-[1px] bg-[#C69C61]" />

              <Leaf
                size={16}
                strokeWidth={1}
                className="text-[#B2762B]"
              />

              <span className="w-10 h-[1px] bg-[#C69C61]" />

            </div>

          </motion.div>


          {/* VALUE CARDS */}

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            variants={stagger}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 mt-10"
          >

            {values.map((value, index) => {

              const Icon = value.icon;

              return (
                <motion.div
                  key={value.title}
                  variants={fadeUp}
                  className={`
                    group text-center px-7 py-8
                    ${
                      index !== 0
                        ? "border-t sm:border-t-0 sm:border-l border-[#DCC9AD]"
                        : ""
                    }
                    ${
                      index === 2
                        ? "lg:border-l"
                        : ""
                    }
                  `}
                >

                  {/* ICON */}

                  <div className="mx-auto w-16 h-16 rounded-full bg-[#F0E2CE] flex items-center justify-center group-hover:bg-[#E8D1AF] group-hover:scale-105 transition-all duration-300">

                    <Icon
                      size={29}
                      strokeWidth={1.2}
                      className="text-[#B77D31]"
                    />

                  </div>


                  {/* TITLE */}

                  <h3 className="font-serif text-[19px] sm:text-[20px] mt-5">
                    {value.title}
                  </h3>


                  {/* DESCRIPTION */}

                  <p className="max-w-[190px] mx-auto text-[12px] sm:text-[13px] leading-5 text-[#5D554D] mt-3">
                    {value.description}
                  </p>

                </motion.div>
              );
            })}

          </motion.div>

        </div>

      </section>


      {/* =================================================
          PROMISE SECTION
      ================================================= */}

      <section className="relative min-h-[570px] sm:min-h-[600px] lg:min-h-[620px] overflow-hidden bg-[#FAF3E9]">

        <div className="max-w-[1350px] mx-auto min-h-[570px] sm:min-h-[600px] lg:min-h-[620px] grid lg:grid-cols-[38%_62%]">

          {/* TEXT */}

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={fadeLeft}
            className="relative z-10 flex items-center px-6 sm:px-10 lg:pl-12 lg:pr-5 py-16 lg:py-0"
          >

            <div className="max-w-[390px]">

              <p className="text-[#B2762B] uppercase tracking-[2px] text-[11px] font-semibold">
                Our Promise
              </p>


              <h2 className="font-serif text-[38px] sm:text-[46px] lg:text-[47px] leading-[1.05] mt-4">
                Honest Skincare.
                <br />
                Real Results.
              </h2>


              <div className="w-11 h-[1px] bg-[#B98543] mt-5 mb-5" />


              <p className="text-[13px] sm:text-[14px] leading-6 text-[#5C544B] max-w-[350px]">
                We promise to deliver skincare that is honest, effective,
                and made with love.
              </p>


              <p className="font-serif italic text-[15px] mt-4 text-[#3B322A]">
                Your glow, our promise.
              </p>


              <button
               onClick={()=>navigate("/all-products")}
                className="group inline-flex items-center justify-between gap-8 bg-[#1B1B1B] text-white mt-7 px-5 py-3.5 rounded-md text-[12px] sm:text-[13px] font-medium hover:bg-[#392D23] transition-colors"
              >
                Explore Our Products

                <ArrowRight
                  size={16}
                  className="group-hover:translate-x-1 transition-transform"
                />

              </button>

            </div>

          </motion.div>


          {/* IMAGE */}

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={fadeRight}
            className="relative min-h-[380px] lg:min-h-full"
          >

            <img
              src={aboutPromise}
              alt="WildSprout Beauty products"
              className="absolute inset-0 w-full h-full object-cover object-center"
            />


            {/* IMAGE BLEND */}

            <div className="absolute inset-y-0 left-0 w-28 sm:w-40 bg-gradient-to-r from-[#FAF3E9] to-transparent" />

          </motion.div>

        </div>

      </section>


      {/* =================================================
          SMALL BOTTOM SPACE
      ================================================= */}

      <div className="h-5 bg-[#F4DFC0]" />

    </div>
  );
};

export default AboutUs;