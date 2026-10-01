
import React from "react";
import { motion } from "framer-motion";
import { FaFacebookF, FaInstagram, FaPhoneAlt, FaEnvelope } from "react-icons/fa";
import { Link } from "react-router-dom";
import { MdKeyboardArrowLeft } from "react-icons/md";
import { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import { ToastContainer, toast, Slide } from "react-toastify";
import poster from "../assets/Contact/poster.png"
import { Phone } from 'lucide-react';


export default function Contact() {
  const form = useRef();
  const [isSent, SetisSent] = useState(false);
  const [userData, setUserData] = useState([])

  // const fetchUserData = ()=>{

  // }

  const sendEmail = (e) => {
    e.preventDefault();
    emailjs.sendForm(
      "service_xext9md",  //service id
      "template_srwopfk",    //template id
      form.current,
      "UPcvhW3YTyJSYgAR0"        //public key
    ).then(() => {
      SetisSent(true);
      form.current.reset();
      toast.success("Message sent succesfully! ✅")
    }, (error) => {
      toast.error("Failed to send Message", error)
    })
  }

  const contactData = [
    { id: 1, icon: FaPhoneAlt, label: "Call Us", detail: "+91 98765 43210" },
    { id: 2, icon: FaEnvelope, label: "Email", detail: "wildsproutbeauty@gmail.com" },
    { id: 3, icon: FaInstagram, label: "Follow Us", detail: "wildsprout_beauty" }
  ]

  const scrollToContactForm =()=>{
       const section  = document.getElementById("contactForm")
       section?.scrollIntoView({ behavior: "smooth", block: "start" })
  }

  return (
    <>

      <div
        id="Contact"
        className="w-full  bg-[#f6efe4] bg-cover bg-center "
      >

        {/* hero section */}
       

<section
  className="relative w-full min-h-screen flex items-center overflow-hidden bg-cover bg-center"
  style={{
    backgroundImage: `url(${poster})`,
    backgroundPosition: "70% center",
  }}
>
  {/* Hero Content */}
  <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12">
    <motion.div
      initial="hidden"
      animate="visible"
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: 0.15,
            delayChildren: 0.3,
          },
        },
      }}
      className="w-full max-w-xl mt-10"
    >


      <motion.h1
        variants={{
          hidden: {
            opacity: 0,
            y: 50,
          },
          visible: {
            opacity: 1,
            y: 0,
            transition: {
              duration: 0.8,
              ease: [0.22, 1, 0.36, 1],
            },
          },
        }}
        className="text-5xl md:text-6xl lg:text-6xl font-serif leading-tight text-orange-950"
      >
        We're Here
      </motion.h1>


      

      <motion.h2
        variants={{
          hidden: {
            opacity: 0,
            y: 50,
          },
          visible: {
            opacity: 1,
            y: 0,
            transition: {
              duration: 0.8,
              ease: [0.22, 1, 0.36, 1],
            },
          },
        }}
        className="text-4xl md:text-5xl lg:text-5xl font-serif leading-tight text-orange-950"
      >
        to{" "}
        <span className="text-amber-700">
          Help You
        </span>{" "}
        🌿
      </motion.h2>


     

      <motion.p
        variants={{
          hidden: {
            opacity: 0,
            y: 30,
          },
          visible: {
            opacity: 1,
            y: 0,
            transition: {
              duration: 0.7,
              ease: "easeOut",
            },
          },
        }}
        className="mt-4 text-base md:text-lg leading-6 text-gray-700"
      >
        Whether you have feedback, product questions, or
        collaboration inquiries, we'd love to hear from you.
      </motion.p>



      <motion.div
        variants={{
          hidden: {},
          visible: {
            transition: {
              staggerChildren: 0.12,
            },
          },
        }}
        className="mt-4 space-y-4"
      >
        {contactData.map((item) => {
          const Icon = item.icon;

          return (
            <motion.div
              key={item.id}
              variants={{
                hidden: {
                  opacity: 0,
                  x: -40,
                },
                visible: {
                  opacity: 1,
                  x: 0,
                  transition: {
                    duration: 0.6,
                    ease: [0.22, 1, 0.36, 1],
                  },
                },
              }}
              whileHover={{
                y: -4,
                scale: 1.02,
              }}
              transition={{
                duration: 0.3,
              }}
              className="group flex items-center gap-4 rounded-3xl p-2 bg-white/20 backdrop-blur-2xl border border-white/30 shadow-lg hover:bg-white/30 hover:shadow-xl transition-all duration-300"
            >
              {/* Icon */}

              <motion.div
                whileHover={{
                  scale: 1.1,
                  rotate: 5,
                }}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-amber-500 to-amber-700 shadow-md"
              >
                <Icon className="text-2xl text-white" />
              </motion.div>

              {/* Text */}

              <div>
                <h3 className="text-lg font-semibold text-orange-950">
                  {item.label}
                </h3>

                <p className="text-sm text-gray-700">
                  {item.detail}
                </p>
              </div>
            </motion.div>
          );
        })}
      </motion.div>



      <motion.button
        variants={{
          hidden: {
            opacity: 0,
            y: 30,
            scale: 0.9,
          },
          visible: {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: {
              duration: 0.6,
              ease: [0.22, 1, 0.36, 1],
            },
          },
        }}
        whileHover={{
          scale: 1.05,
          y: -2,
        }}
        whileTap={{
          scale: 0.96,
        }}
        onClick={scrollToContactForm}
        className="mt-8 rounded-full bg-black hover:bg-amber-950 px-8 py-3 text-white font-medium shadow-lg hover:shadow-xl transition-all duration-300"
      >
        Send Us Message
      </motion.button>

    </motion.div>
  </div>
</section>


      <div className="max-w-[1100px] w-full mx-auto px-6 mt-10 min-h-screen"  id="contactForm" >
        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center text-4xl font-serif font-bold text-amber-900 mb-12"
        >
          Get in Touch
        </motion.h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-5">
          {/* Left Info Section */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="flex flex-col justify-center p-8 bg-white/60 backdrop-blur-lg rounded-2xl shadow-xl"
          >
            <h2 className="text-2xl font-serif font-semibold text-amber-900 mb-6">
              WildSprout Beauty — We’re here to help 🌱
            </h2>

            <p className="text-gray-700 mb-4 leading-relaxed">
              Whether you have feedback, product questions, or collaboration
              inquiries — we’d love to hear from you.
            </p>

            <div className="space-y-4 text-gray-800">
              <p className="flex items-center gap-3">
                <FaPhoneAlt className="text-amber-700" /> +91 98765 43210
              </p>
              <p className="flex items-center gap-3">
                <FaEnvelope className="text-amber-700" />wildsproutbeauty@gmail.com
              </p>
            </div>

            <div className="flex gap-4 mt-6">
              <a className="p-3 rounded-full border border-amber-700 hover:bg-amber-700 hover:text-white transition" href="#">
                <FaFacebookF size={18} />
              </a>
              <a className="p-3 rounded-full border border-amber-700 hover:bg-amber-700 hover:text-white transition" href="https://www.instagram.com/wildsprout_beauty?igsh=MXhienU0Z3lnd2h5cQ==" target="_blank">
                <FaInstagram size={18} />
              </a>
            </div>
            <div className="flex mt-6 items-center gap-2 text-amber-900 transition-all hover:scale-105 cursor-pointer">
              <MdKeyboardArrowLeft />
              <Link to="/" className="text-amber-900 underline inline-block">Back to Home</Link>
            </div>
          </motion.div>

          {/* Right Form Section */}
          <motion.form
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="p-8 bg-white/60 backdrop-blur-lg rounded-2xl shadow-xl space-y-5"
            ref={form}
            onSubmit={sendEmail}
          >
            <div>
              <label className="block text-sm font-medium text-gray-800 mb-1">
                Full Name
              </label>
              <input
                type="text"
                placeholder="Enter your name"
                className="w-full border border-amber-200 rounded-xl px-4 py-3 outline-none focus:border-amber-600 transition"
                name="user_name" />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-800 mb-1">
                Email
              </label>
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full border border-amber-200 rounded-xl px-4 py-3 outline-none focus:border-amber-600 transition"
                name="user_email" />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-800 mb-1">
                Message
              </label>
              <textarea
                rows="4"
                placeholder="Type your message..."
                className="w-full border border-amber-200 rounded-xl px-4 py-3 outline-none focus:border-amber-600 transition resize-none"
                name="message"></textarea>
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-amber-700 text-white font-semibold hover:bg-amber-900 transition"
            >
              Send Message
            </button>
          </motion.form>
        </div>
        <ToastContainer position="top-center" autoClose={3000} hideProgressBar={false} newestOnTop={false} closeOnClick pauseOnHover transition={Slide}
        />
      </div>
    </div >
    </>
  );
}
