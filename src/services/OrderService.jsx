import axios from "axios";

const ORDER_API = "http://localhost:8080/api/orders"

/**
 * Place order
 * @param {Object} orderData
 * {
 *   userId: number,
 *   address: string,
 *   totalAmount: number
 * }
 */
export const placeOrder=async(orderData)=>{
    const response = await axios.post(`${ORDER_API}/place`,orderData);
    return response.data;
}

 /**
 * Create Razorpay order
 * @param {number} orderId
 */
 export const createPayment=async(orderId)=>{
    const response = await axios.post(
    `${ORDER_API}/create-payment/${orderId}`
  );
  return response.data;
};

/**
 * Verify Razorpay payment
 * @param {Object} paymentData
 */
export const verifyPayment = async (paymentData) => {
  const response = await axios.post(
    `${ORDER_API}/verify-payment`,
    paymentData
  );
  return response.data;
};

export const totalOrders = async()=>{
  const response = await axios.get(`${ORDER_API}/getAllOrders`);
  return response.data;
}

export const userOrders = async(userId)=>{
  const response= await axios.get(`${ORDER_API}/getAllUserOrder/${userId}`);
  return response.data;
}

export const totalUserOrder = async(userId) =>{
  const response= await axios.get(`${ORDER_API}/total/${userId}`);
  return response.data;
}