import React from 'react'
import { AllProducts as allProducts } from '../constant';
import { Link } from 'react-router-dom';
import { MdKeyboardArrowLeft } from "react-icons/md";
import { motion } from 'framer-motion';
import { useState,useEffect } from 'react';
import { IoCartOutline } from "react-icons/io5";
import { MdCurrencyRupee } from "react-icons/md";
import { ToastContainer , toast,Bounce } from 'react-toastify';
import { getAllProducts } from '../services/ProductService';
import { addToCart as AddToCartAPI } from '../services/CartService'

const AllProducts = () => {

const[selectedProduct , setSelectedProduct]= useState(null);
const[product,setProduct] = useState([])

useEffect(()=>{
    fetchProduct();
},[]);

const Openproduct=(item)=>{
  setSelectedProduct(item);
}
const Closeproduct=()=>{
  setSelectedProduct(null);
}


const fetchProduct =async()=>{

  try{
  const response = await getAllProducts();
  setProduct(response)

  }catch(err){
    console.error(err);

  }
}



const addToCart=async(product)=>{
 
    const userId= localStorage.getItem("userId");
    const role = localStorage.getItem("role");

    if(!userId){
      toast.error("Please Login")
      return;
    }
      if(role==="ADMIN"){
        toast.error("Admin cannot Add");
       return;
      }
    
     try{

      await AddToCartAPI({
        userId: Number(userId),
        productId : product.id,
        quantity:1
      });

      toast.success("Added to Cart");
      window.dispatchEvent(new Event("cartUpdated"));

  }catch(err){
 toast.error("Failed to Add Product to Cart")
    console.error(err)
  }
}



  return (
    <div className='w-full min-h-screen flex items-center py-24 bg-cover bg-center'>

      <div className='max-w-7xl w-full mx-auto px-6 '>
        <section className='' id='AllProducts' >
      <div className='text-center mb-10'>
        <h1 className='text-3xl md:text-4xl lg:text-4xl font-serif font-semibold mb-10 text-amber-700'>All Products</h1>
      </div>
      <div  className='flex justify-around'>

      
      
      
      </div>
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 justify-items-center gap-4">
        {product.map((product, id) => (
          <motion.div
            key={id}
            className="w-full border border-amber-700 rounded-2xl p-4 shadow-lg hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 cursor-pointer bg-rose-50 mt-5"
         onClick={()=>Openproduct(product)} >
            <div className="h-48 w-full rounded-xl overflow-hidden mb-4 border border-amber-200 ">
              <img src={`http://localhost:8080/images/${product.image}`} alt={product.name} className="h-full w-full object-cover object-center  transition-transform duration-700 ease-out hover:scale-115" />
            </div>
            <h1 className="text-lg font-serif font-semibold text-gray-900 mb-1">{product.name}</h1>
            <p className="text-amber-700 font-semibold mb-1">{product.category}</p>
            <p className="text-sm text-gray-700 mb-3">{product.description}</p>
            <p className="text-gray-700 font-semibold mb-1 flex items-center" >Price : <span><MdCurrencyRupee /></span>{product.price}</p>
                       <div className=' flex w-full p-4 rounded-lg items-center gap-6 '>
                         {/* <button className=' bg-amber-700 text-white text-center p-1 rounded-lg shadow-lg transition-all hover:scale-105'>Buy Now</button> */}
                         <button
                         onClick={(e)=>{
                          e.preventDefault();
                          addToCart(product)}}
                         
                         className=' w-full text-center text-amber-100 bg-amber-700 border border-amber-700 p-1 rounded-lg shadow-lg transition-all hover:scale-105 flex justify-center gap-2'>Add to Cart<IoCartOutline size={23} /></button>
                       </div>
          </motion.div>
        ))}
      </div>
    </section>
      </div>

     {selectedProduct &&(
  <div className="fixed inset-0 backdrop-blur-sm bg-opacity-50 flex items-center justify-center z-50">
    <div className="bg-white rounded-lg p-6 w-11/12 md:w-3/4 lg:w-1/2 shadow-lg relative">
      <button onClick={Closeproduct} className="absolute top-4 right-4 text-gray-600 hover:text-gray-900 text-2xl font-bold">&times;</button>
      <div className='flex gap-6 justify-center flex-col md:flex-row lg:flex-row'>
      <div className="h-50 w-full md:h-100 md:w-full lg:h-100 lg:w-full rounded-xl overflow-hidden mb-4 border border-amber-700 ">
        <img src={`http://localhost:8080/images/${selectedProduct.image}`} alt={selectedProduct.name} className="h-full w-full object-cover object-center" />   
      </div>
      <div>
      <h2 className="text-xl lg:text-2xl font-serif font-semibold text-gray-900 mb-2">{selectedProduct.name}</h2>
      <p className="text-amber-700 font-semibold mb-2">{selectedProduct.tags}</p>
      <p className="text-gray-700 mb-4">{selectedProduct.description}</p>
      <p className='text-amber-700 font-semibold'>Ingredients :</p>
      <div className='flex flex-wrap gap-2 py-6'>
      {selectedProduct.ingredients?.split(" ").map((ingredient, index) => (
        <span key={index} className='bg-amber-800 text-xs font-semibold text-white rounded-full px-2 py-1 transition-all hover:scale-105 '>{ingredient}</span>
      ))}
      </div>
      <p className='mb-5 font-semibold'>{selectedProduct.rating}⭐ rating</p>
      <p className="text-gray-700 font-semibold mb-1 flex items-center" >Price : <span><MdCurrencyRupee /></span>{selectedProduct.price}</p>
                 <div className='  w-full p-4 rounded-lg items-center gap-6 '>
                   {/* <button className=' bg-amber-700 text-white text-center p-1 rounded-lg shadow-lg transition-all hover:scale-105'>Buy Now</button> */}
                   <button
                   onClick={()=>addToCart(selectedProduct)}
                   
                   className='w-full text-center text-amber-100 bg-amber-700 border border-amber-700 p-1 rounded-lg shadow-lg transition-all hover:scale-105 flex justify-center gap-2'>Add to Cart<IoCartOutline size={23} className=''/></button>
                 </div>
      </div>
      </div>
    </div>
  </div>

)}


<ToastContainer
position="top-right"
autoClose={3000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick={false}
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="colored"
transition={Bounce}
/>



    </div>
  )
}

export default AllProducts