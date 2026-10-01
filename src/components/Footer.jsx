import React from "react";
import { motion } from "framer-motion";
import {
  FaInstagram,
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaFacebook,
} from "react-icons/fa";
import {Link} from 'react-router-dom'

const Footer = () => {


  const menu = [
    { id: '1', label: 'Home' ,path :"/" },
    { id: '2', label: 'About us' ,path :"/about-us"},
    { id: '3', label: 'Products',path :"/all-products" },
    {id:'4',label: 'Contact', path : "/contact"}
   
  ];

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: {
      opacity: 0,
      y: 35,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        ease: "easeOut",
      },
    },
  };

  return (
    <motion.footer
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.8 }}
      className="bg-black text-white py-10 px-5 md:px-20 overflow-hidden"
    >
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-8"
      >
        {/* WildSprout Beauty */}
        <motion.div variants={itemVariants}>
          <motion.h2
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-xl font-bold mb-3"
          >
            WildSprout Beauty
          </motion.h2>

          <motion.p
            variants={itemVariants}
            className="text-gray-300 mb-3 leading-6"
          >
            Bringing beauty to your life with natural products. Experience the
            essence of wellness and self-care with WildSprout Beauty.
          </motion.p>

          <motion.div
            variants={itemVariants}
            className="flex items-center gap-8 mt-5"
          >
            <motion.a
              href=""
              whileHover={{
                scale: 1.18,
                y: -4,
              }}
              whileTap={{
                scale: 0.95,
              }}
              transition={{
                type: "spring",
                stiffness: 300,
              }}
            >
              <FaFacebook
                size={24}
                className="text-white hover:text-blue-500 transition-colors duration-300"
              />
            </motion.a>

            <motion.a
              href="https://www.instagram.com/wildsprout_beauty?igsh=MXhienU0Z3lnd2h5cQ=="
              target="_blank"
              rel="noreferrer"
              whileHover={{
                scale: 1.18,
                y: -4,
                rotate: 5,
              }}
              whileTap={{
                scale: 0.95,
              }}
              transition={{
                type: "spring",
                stiffness: 300,
              }}
            >
              <FaInstagram
                size={24}
                className="text-white hover:text-rose-400 transition-colors duration-300"
              />
            </motion.a>
          </motion.div>
        </motion.div>

        {/* Quick Links */}
        <motion.div
          variants={itemVariants}
          className="text-left md:text-center"
        >
          <motion.h2
            variants={itemVariants}
            className="text-xl font-bold mb-3"
          >
            Quick Links
          </motion.h2>

          <motion.ul
            variants={containerVariants}
            className="text-gray-300 space-y-2"
          >
            {menu.map((item) => (
              <motion.li
                key={item.id}
                variants={itemVariants}
                whileHover={{
                  x: 5,
                }}
                transition={{
                  duration: 0.2,
                }}
              >
                <Link
                to={item.path}
                  className="relative inline-block hover:text-white transition-colors duration-300 group"
                >
                  {item.label}

                  <span className="absolute left-0 -bottom-1 w-0 h-[1px] bg-white group-hover:w-full transition-all duration-300" />
                </Link>
              </motion.li>
            ))}
          </motion.ul>
        </motion.div>

        {/* Contact */}
        <motion.div
          variants={itemVariants}
          className="md:col-span-1"
        >
          <motion.h2
            variants={itemVariants}
            className="text-xl font-bold mb-3"
          >
            Contact Us
          </motion.h2>

          <motion.ul
            variants={containerVariants}
            className="text-gray-300 space-y-3"
          >
            <motion.li
              variants={itemVariants}
              whileHover={{
                x: 5,
              }}
              className="flex items-start gap-3"
            >
              <FaMapMarkerAlt className="mt-1 shrink-0" />

              <span>
                123 Greenway Rd, Wardha, Maharashtra 442001
              </span>
            </motion.li>

            <motion.li
              variants={itemVariants}
              whileHover={{
                x: 5,
              }}
              className="flex items-center gap-3"
            >
              <FaPhone className="shrink-0" />

              <span>
                +91 9322649906
              </span>
            </motion.li>

            <motion.li
              variants={itemVariants}
              whileHover={{
                x: 5,
              }}
              className="flex items-center gap-3"
            >
              <FaEnvelope className="shrink-0" />

              <span>
                info@wildsproutbeauty.com
              </span>
            </motion.li>
          </motion.ul>
        </motion.div>
      </motion.div>

      {/* Divider */}
      <motion.hr
        initial={{
          scaleX: 0,
          opacity: 0,
        }}
        whileInView={{
          scaleX: 1,
          opacity: 1,
        }}
        viewport={{ once: true }}
        transition={{
          duration: 0.9,
          delay: 0.2,
        }}
        className="border-gray-800 my-6 origin-left"
      />

      {/* Bottom */}
      <motion.div
        initial={{
          opacity: 0,
          y: 20,
        }}
        whileInView={{
          opacity: 1,
          y: 0,
        }}
        viewport={{ once: true }}
        transition={{
          duration: 0.7,
          delay: 0.25,
        }}
        className="flex flex-col md:flex-row justify-between gap-2 text-gray-400 text-sm"
      >
        <span>
          © 2026 WildSprout Beauty. All rights reserved.
        </span>

        <span>
          Designed by{" "}
          <motion.a
            href="https://koshal-portfolio.vercel.app/"
            target="_blank"
            rel="noreferrer"
            whileHover={{
              color: "#ffffff",
            }}
            className="font-bold text-gray-300"
          >
            Koshal
          </motion.a>
        </span>
      </motion.div>
    </motion.footer>
  );
};

export default Footer;