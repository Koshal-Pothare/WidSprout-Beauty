import apiClient from "./apiClient";

export const getAllProducts = () =>
    apiClient.get("/api/products");

export const addProduct = (formData) =>
    apiClient.post("/api/products", formData);

export const deleteProduct = (id) =>
    apiClient.delete(`/api/products/${id}`);

export const updateProduct = (id, formData) =>
    apiClient.post(`/api/products/update/${id}`, formData);