import apiClient from "./apiClient";

const Review_API="http://localhost:8080/api/reviews";

export const addReview = async (reviewData) => {
    const response = await apiClient.post(
        "/api/reviews/add",
        reviewData
    );
    return response.data;
};

export const getAllReviews = async () => {
    const response = await apiClient.get("/api/reviews");
    return response.data;
};

export const deleteReview = async (id) => {
    const response = await apiClient.delete(`/api/reviews/${id}`);
    return response.data;
};