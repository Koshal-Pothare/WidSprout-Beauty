
import React, { useEffect, useState, useMemo, useRef } from "react";

import { motion, AnimatePresence } from "framer-motion";
import AddReview from "./AddReview";

import { getAllReviews } from "../services/ReviewService.js";

import { getAllReviews } from "../services/ReviewService";


const Reviews = () => {
  const sectionRef = useRef(null);

  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hasReached, setHasReached] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const[addReviewModalOpen, setAddReviewModalOpen]=useState(false);

  const[refreshKey,setRefreshKey]=useState(0)

  const chunkSize = 2;

  // 🔹 Fetch reviews from API
  const fetchReviews = async () => {
    try {
      const res = await getAllReviews();
        setReviews(res || []);
      
      
    } catch (err) {
      console.error("Error fetching reviews:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, [refreshKey]);

  useEffect(() => {
  if (addReviewModalOpen) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "auto";
  }

  return () => (document.body.style.overflow = "auto");
}, [addReviewModalOpen]);

  // 🔹 Detect section visibility
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && setHasReached(true),
      { threshold: 0.3 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () =>
      sectionRef.current && observer.unobserve(sectionRef.current);
  }, []);

  // 🔹 Split reviews into slides
  const slides = useMemo(() => {
    const result = [];
    for (let i = 0; i < reviews.length; i += chunkSize) {
      result.push(reviews.slice(i, i + chunkSize));
    }
    return result;
  }, [reviews]);

  // 🔹 Auto-slide (desktop/tablet only)
  useEffect(() => {
    if (!hasReached || slides.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [slides.length, hasReached]);

  return (
    <section
      ref={sectionRef}
      id="Reviews"
      className="w-full bg-[#f7e7cc] py-20 px-4"
    >
      <div className="max-w-6xl mx-auto ">
        {/* Heading */}
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif text-[#2F2A24]">
            Loved by Our Customers
          </h2>
          <p className="text-[#6B5E52] mt-3 max-w-2xl mx-auto text-sm sm:text-base">
            Real experiences from people who trust WildSprout Beauty for clean,
            organic skincare.
          </p>
        </div>

        {/* Loading */}
        {loading && (
          <div className="text-center text-[#6B5E52] font-semibold">
            Loading customer reviews…
          </div>
        )}

        {/* Empty State */}
        {!loading && reviews.length === 0 && (
          <div className="flex justify-center">
            <div className="bg-white border border-amber-200 rounded-2xl p-6 shadow-md text-center text-[#6B5E52]">
              No reviews available yet 🌿
            </div>
          </div>
        )}

        {/* Reviews */}
        {!loading && reviews.length > 0 && (
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={hasReached ? { opacity: 0, y: 30 } : false}
              animate={hasReached ? { opacity: 1, y: 0 } : false}
              exit={hasReached ? { opacity: 0, y: -30 } : false}
              transition={{ duration: 0.6, ease: "easeInOut" }}
              className="
                grid
                grid-cols-1
                md:grid-cols-2
                gap-6
              "
            >
              {slides[currentSlide]?.map((rev) => (
                <motion.div
                  key={rev.id}
                  whileHover={{ scale: 1.03 }}
                  className="
                    bg-white
                    rounded-2xl
                    shadow-md
                    hover:shadow-xl
                    transition
                    p-2
                    flex
                    flex-col
                    justify-between
                  "
                >
                  
                  <p className="text-sm sm:text-base text-[#4B4036] leading-relaxed mb-4">
                    “{rev.comment}”
                  </p>

                  <div className="flex justify-between items-center mt-auto">
                    <p className="text-amber-600 font-semibold">
                      {rev.rating} ★
                    </p>
                    <p className="text-sm font-medium text-[#8B5E34]">
                      — {rev.username}
                    </p>
                  </div>
                </motion.div>
              ))}
            
            </motion.div> 
          </AnimatePresence>
        )}
      </div>
      <div className="mt-10 p-6 text-center">
       <button
       onClick={()=>setAddReviewModalOpen(true)}
       className="bg-black text-white py-2 px-4 rounded-xl transition-all hover:scale-105 ">Add Review</button>
       </div>

       
{ addReviewModalOpen && <AddReview onClose={()=>setAddReviewModalOpen(false)}
                                    onReviewAdded={()=>setRefreshKey((prev)=>prev+1)} /> }
    </section>
  );
};

export default Reviews;
