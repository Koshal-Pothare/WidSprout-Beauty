import React from 'react'
import { motion } from 'framer-motion';
import lipbalm2 from '../assets/lipbalm2.png';
import { Sparkles, Leaf, Droplets, Flower2 } from "lucide-react";
import { Link } from 'react-router-dom';

const About2 = () => {
      return (
            <section id='About' className=" block md:hidden w-full pt-10 md:pt-35 scroll-mt-28  relative h-[900px]  md:h-[800px] overflow-hidden flex justify-center " >
                  <div className='w-[1000px] h-100  md:mt-10  flex justify-around items-center gap-3 flex-wrap'>
                        <div className='w-50 h-75 md:w-75 md:h-100 rounded-full  bg-linear-to-b from-[#e8c9a0] to-[#fdf4e3] shadow-[0_40px_80px_rgba(0,0,0,0.15)] flex justify-center items-center'>
                              <motion.img
                                    initial={{ opacity: 0, y: 280 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 1, ease: "easeOut" }}
                                    viewport={{ amount: 0.3, once: true }}

                                    src={lipbalm2} alt="lipbslm" className='w-48 h-56 md:w-72 md:h-72 lg:w-[400px] lg:h-[300px]  ' />
                        </div>



                        <motion.div
                              initial="hidden"
                              whileInView="visible"
                              viewport={{ once: true }}
                              variants={{
                                    visible: { transition: { staggerChildren: 0.2 } }
                              }}
                              className="space-y-8"
                        >
                              <motion.h1
                                    variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
                                    className="font-serif text-2xl md:text-5xl text-[#6b3f1d] leading-tight"
                              >
                                    Pure Care<br />Inspired by Ancient Rituals
                              </motion.h1>


                              <motion.p
                                    variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
                                    className="text-[#7a5230] max-w-lg "
                              >
                                    A luxurious lip ritual crafted with time-honored botanicals to nourish,
                                    hydrate, and restore your natural glow.
                              </motion.p>


                              <div className="grid grid-cols-2 gap-6 ">
                                    {[{ icon: Leaf, text: "100% Natural" }, { icon: Sparkles, text: "Cruelty Free" }, { icon: Droplets, text: "Deep Hydration" }, { icon: Flower2, text: "Ancient Wisdom" }].map((item, i) => (
                                          <motion.div
                                                key={i}
                                                variants={{ hidden: { opacity: 0, y: 15 }, visible: { opacity: 1, y: 0 } }}
                                                whileHover={{ y: -6 }}
                                                
                                                className="flex items-center gap-4 rounded-2xl bg-white/40 backdrop-blur-md p-4 shadow-lg"
                                          >
                                                <item.icon className="text-[#8b5a2b]" />
                                                <span className="text-[#6b3f1d] font-medium">{item.text}</span>
                                          </motion.div>
                                    ))}
                              </div>

                             <div className=' flex justify-center'>
                              <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="mt-6 w-fit rounded-full bg-[#8b5a2b] px-8 py-3 text-white shadow-xl"
                           
                            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                           >

                                    <Link to="/all_products">Shop the Ritual</Link>
                              </motion.button></div>
                        </motion.div>

                  </div>
            </section>







      )
}

export default About2