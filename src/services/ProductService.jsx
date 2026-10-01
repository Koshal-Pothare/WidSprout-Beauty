
import axios from "axios";

const Product_API = "http://localhost:8080/api/products";

 export const addProduct = async(formData)=>{
const response = await axios.post(Product_API,formData);
return response.data;
}

export const getAllProducts=async()=>{
    const response = await axios.get(Product_API);
    return response.data;
};

export const deleteProduct=async(productId)=>{
    const response = await axios.delete(`${Product_API}/${productId}`);
    return response.data;
}

export const updateProduct = async(productId , formData)=>{
    const response = await axios.post(`${Product_API}/update/${productId}`,formData);
    return response.data;
}