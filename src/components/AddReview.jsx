import React from 'react'
import axios from 'axios'
import { useState, useEffect } from 'react'



import { addReview } from '../services/ReviewService';

import { toast } from 'react-toastify';

const AddReview = ({onClose,onReviewAdded}) => {

    const[isloading,setIsloading]=useState(false);
    const[review,setReview]= useState({
        username:"",
        rating:5,
        comment:""
    });

    const handleChange =(e)=>{
        setReview({...review,[e.target.name]:e.target.value});
    }

    const handleReview=async(e)=>{
        e.preventDefault();
       setIsloading(true);
       console.log(review);
        try{
          await addReview(review);
          toast.success("Review Added")
          setReview({
            username:"",
            comment:"",
            rating:""
          })
          onReviewAdded();
          onClose();

        }catch(err){
          console.error(err);
          toast.error("Failed to Add")
        }finally{
          setIsloading(false);
        }
    }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
         <div
        onClick={onClose}
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
      ></div>
      <div className="relative z-10 w-[420px] bg-white rounded-2xl shadow-2xl p-8 border border-amber-800">
        <h3 className="text-xl font-semibold mb-3">
          Add Review
        </h3>

        <form className="space-y-3" onSubmit={handleReview}>
          <input
          name='username'
            type="text"
            placeholder="Your Name"
            className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#8B5E34] outline-none" value={review.username} onChange={handleChange}
          />

          <input
          name='rating'
            type="number"
            placeholder="rates us on scale of 5"
            className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#8B5E34] outline-none" value={review.rating} onChange={handleChange}
          />

            <textarea
            name='comment'
            placeholder="give review"
            className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#8B5E34] outline-none" value={review.comment} onChange={handleChange}
          ></textarea>

          

          <div className="flex gap-3 pt-4">
            <button
              type="submit"
              disabled={isloading}
              className="flex-1 py-3 bg-[#8B5E34] text-white rounded-lg hover:bg-[#6f4a29]"
            >
              {isloading?"Adding...":"Add Review"}
            </button>

            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-3 border rounded-lg hover:bg-neutral-100"
            >
              Cancel
            </button>
          </div>
        </form>

        {/* Close Icon */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-neutral-400 hover:text-black"
        >
          ✕
        </button>
      </div>

    </div>
  )
}

export default AddReview