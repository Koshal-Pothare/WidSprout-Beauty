import axios from "axios";

const Review_API="http://localhost:8080/api/reviews";

export const addReview =async(reviewData)=>{
     const response = await axios.post(`${Review_API}/add`,reviewData);
     return response.data;
    }

    export const getAllReviews = async(reviewData)=>{
        const response=await axios.get(Review_API);
        return response.data;
    }

    export const deleteReview = async(reviewId) =>{
        const response = await axios.delete(`${Review_API}/${reviewId}`);
        return response.data;
    }