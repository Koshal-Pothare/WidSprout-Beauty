import apiClient from "./apiClient";

const Cart_API = "http://localhost:8080/api/cart"

export const addToCart = async(cartData) =>{
    const response = await apiClient.post(`${Cart_API}/add`,cartData);
    return response.data;


}

export const getCart =  async(userId)=>{
    const response = await apiClient.get(`${Cart_API}/${userId}`);
    return response.data;
}

export const removeItem = async(cartId)=>{
    const response= await apiClient.delete(`${Cart_API}/${cartId}`);
    return response.data;
}

export const clearCart = async(userId)=>{
    const response = await apiClient.delete(`${Cart_API}/clear/${userId}`);
}