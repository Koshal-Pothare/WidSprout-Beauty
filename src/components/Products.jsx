import React from 'react'
import { products } from '../constant';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { Link,useNavigate } from 'react-router-dom';
import { IoCartOutline } from "react-icons/io5";
import { MdCurrencyRupee } from "react-icons/md";
import { ToastContainer,toast,Bounce } from 'react-toastify';


const Products = () => {

  const navigate = useNavigate();

const [selectedProduct, setSelectedProduct] = useState(null);

const Openproduct=(item)=>{
  setSelectedProduct(item);
}
const Closeproduct=()=>{
  setSelectedProduct(null);
}


const addToCart=(product)=>{
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const existingProduct = cart.find(item => item.id === product.id);
  if (existingProduct) {
    existingProduct.quantity += 1;
  } else {
    cart.push({ ...product, quantity: 1 });
  }
  localStorage.setItem('cart', JSON.stringify(cart));
  toast.success('Product added to cart!');

  window.dispatchEvent(new Event('cartUpdated'));
}


  return (
    <section className='py-25' id='Products' >
      <div className='text-center'>
        <h2 className='uppercase tracking-[0.28em] text-[14px] font-semibold text-[#a66a2c] mb-5'>Our Products</h2>
        <h1 className='font-serif text-4xl md:text-5xl lg:text-[52px] leading-[1.08] text-[#241914] mb-4'>Skincare, Naturally Made <span className="italic text-[#a86b2e]">for You </span></h1>
        <p className='text-lg md:text-xl lg:text-[16px] w-75 md:max-w-xl lg:w-full mx-auto text-gray-800 '>Explore our range of natural and eco-friendly beauty products designed to nourish your skin and enhance your natural glow.</p>

      </div>
     <div className="w-full flex flex-wrap justify-center gap-5 px-6 py-10">
  {products.map((item) => (
    <motion.div
      key={item.id}
      onClick={() => Openproduct(item)}
      className="group w-full sm:w-[calc(50%-10px)] lg:w-[310px] overflow-hidden rounded-2xl border border-amber-100 bg-[#fffaf3] shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer"
    >
      {/* Product Image */}
      <div className="relative h-64 w-full overflow-hidden">
        <img
          src={item.image}
          alt={item.name}
          className="h-full w-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
        />

        {/* Wishlist Button */}
        <button
          onClick={(e) => e.stopPropagation()}
          className="absolute top-4 right-4 flex h-10 w-10 items-center justify-center rounded-full bg-white text-amber-700 shadow-md hover:bg-amber-50 transition-all duration-300"
        >
          ♡
        </button>
      </div>

      {/* Product Information */}
      <div className="p-5">

        {/* Product Name */}
        <h1 className="text-lg font-serif font-semibold text-gray-900 mb-1">
          {item.name}
        </h1>

        {/* Product Tag */}
        <p className="text-sm font-medium text-amber-700 mb-3">
          {item.tags}
        </p>

        {/* Description */}
        <p className="text-sm leading-5 text-gray-600 mb-4 min-h-[40px]">
          {item.description}
        </p>

        {/* Price */}
        <p className="text-lg text-gray-900 font-semibold flex items-center mb-4">
          <MdCurrencyRupee className="text-base" />
          {item.price}
        </p>

        {/* Add To Cart */}
        <div
          className="w-full"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            className="w-full flex items-center justify-center gap-3 rounded-lg border border-amber-600 px-4 py-3 text-sm font-semibold text-amber-700 transition-all duration-300 hover:bg-amber-700 hover:text-white"
          >

            <span>Add to Cart</span>
            <span className="text-lg">🛒</span>
          </button>
        </div>


            <div className="h-48 w-full rounded-xl overflow-hidden mb-4 border border-amber-200">
              <img src={item.image} alt={item.name} className="h-full w-full object-cover object-center transition-transform duration-800 ease-out hover:scale-110  " />
            </div>
            <h1 className="text-lg font-serif font-semibold text-gray-900 mb-1">{item.name}</h1>
            <p className="text-amber-700 font-semibold mb-1">{item.tags}</p>
            <p className="text-sm text-gray-700 mb-3">{item.description}</p>
            <p className="text-gray-900 font-semibold mb-1 flex items-center" >Price : <span><MdCurrencyRupee /></span>{item.price}</p>
            <div className='  w-full p-4 rounded-lg items-center gap-6 ' onClick={(e)=>{
              e.stopPropagation();
            }}>
              {/* <p className=' bg-amber-700 text-white text-center p-1 rounded-lg shadow-lg transition-all hover:scale-105'>Buy Now</p> */}
        
            </div>
            </div>
          </motion.div>
        ))}
      </div>
      




{selectedProduct && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">

    <div className="relative w-full max-w-5xl max-h-[90vh] overflow-y-auto rounded-3xl bg-[#fffaf3] shadow-2xl">

      {/* Close Button */}
      <button
        onClick={Closeproduct}
        className="absolute right-5 top-5 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white text-2xl text-gray-700 shadow-md transition-all duration-300 hover:bg-amber-700 hover:text-white"
      >
        &times;
      </button>

      <div className="grid grid-cols-1 md:grid-cols-2">

        {/* Product Image */}
        <div className="relative h-[350px] md:h-[600px] overflow-hidden bg-[#f4e5d2]">
          <img
            src={selectedProduct.image}
            alt={selectedProduct.name}
            className="h-full w-full object-cover object-center"
          />

          {/* Image Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent"></div>
        </div>

        {/* Product Details */}
        <div className="flex flex-col justify-center p-7 md:p-10">

          {/* Small Label */}
          <p className="mb-3 text-sm font-medium tracking-[0.2em] text-amber-700">
            WILDSPROUT BEAUTY
          </p>

          {/* Product Name */}
          <h2 className="mb-2 font-serif text-3xl font-semibold text-gray-900 md:text-4xl">
            {selectedProduct.name}
          </h2>

          {/* Tag */}
          <p className="mb-5 text-base font-medium text-amber-700">
            {selectedProduct.tags}
          </p>

          {/* Description */}
          <p className="mb-6 text-sm leading-7 text-gray-600 md:text-base">
            {selectedProduct.description}
          </p>

          {/* Ingredients */}
          <div className="mb-6">
            <p className="mb-3 font-semibold text-gray-900">
              Ingredients
            </p>

            <div className="flex flex-wrap gap-2">
              {selectedProduct.ingredients.map((ingredient, index) => (
                <span
                  key={index}
                  className="rounded-full border border-amber-300 bg-amber-50 px-3 py-1.5 text-xs font-medium text-amber-800 transition-all duration-300 hover:bg-amber-700 hover:text-white"
                >
                  {ingredient}
                </span>
              ))}
            </div>
          </div>

          {/* Price + Rating */}
          <div className="mb-7 flex items-center justify-between border-y border-amber-100 py-5">

            <div>
              <p className="mb-1 text-xs uppercase tracking-wider text-gray-500">
                Price
              </p>

              <p className="flex items-center text-2xl font-semibold text-gray-900">
                <MdCurrencyRupee />
                {selectedProduct.price}
              </p>
            </div>

            <div className="text-right">
              <p className="mb-1 text-xs uppercase tracking-wider text-gray-500">
                Rating
              </p>

              <p className="text-lg font-semibold text-amber-700">
                {selectedProduct.rating} ⭐
              </p>
            </div>

          </div>

          {/* Add To Cart */}
          <button
            onClick={() => AddToCart(selectedProduct)}
            className="flex w-full items-center justify-center gap-3 rounded-xl bg-amber-700 px-6 py-4 font-semibold text-white shadow-md transition-all duration-300 hover:bg-amber-800 hover:shadow-lg hover:scale-[1.01]"
          >
            Add to Cart
            <span className="text-lg">🛒</span>
          </button>

        </div>
      </div>
    </div>
  </div>
)}


      <motion.div className='text-center mb-10 mt-10 '
       initial={{ y: 60, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, ease: 'easeOut' }}
          viewport={{ amount: 0.3 }}>
     <button
      onClick={() => navigate('/all-products')}
     className=' w-50 text-white font-semibold py-3 px-6 rounded-full border bg-black transition-all hover:scale-105 hover:bg-amber-950'  >View More</button>
      </motion.div>

<ToastContainer
position="top-right"
autoClose={5000}
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



    </section>
  )
}

export default Products