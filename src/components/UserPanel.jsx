import React from 'react'
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { userOrders , totalUserOrder } from '../services/OrderService';

import { ShoppingBag, Package, Users, BarChart3, } from "lucide-react";


const UserPanel = () => {
  const [activePage, setActivePage] = useState('Profile');
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("isUserLoggedIn") === "true"
  );

const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-neutral-50 w-full flex flex-col md:grid md:grid-cols-12 py-20">
      <motion.aside
        initial={{ x: 0, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
        viewport={{ once: true }}
        className="bg-white shadow-lg p-6 
             md:col-span-2 flex md:flex-col flex-row 
             justify-around md:justify-start md:gap-4 
             mb-4 md:mb-0 border border-amber-200 rounded-r-2xl
             overflow-x-auto"
      >
        <h1 className="hidden md:block text-xl font-bold mb-8 text-[#8B5E34]">
          WildSprout Beauty
        </h1>

        <nav className="flex md:flex-col flex-row justify-around md:justify-start w-full gap-4 mt-5">
          {["Profile", "Orders",  "Contact us","Settings"].map(
            (page) => (
              <p
                key={page}
                onClick={() => {
                  if(page==="Contact us"){
                    navigate("/contact")
                  }else{
                    setActivePage(page);
                  }
                  
                  
                  }
                }
                className={`cursor-pointer ${activePage === page
                    ? "font-semibold text-neutral-900"
                    : "text-neutral-500 hover:text-neutral-900"
                  }`}
              >
                {page.charAt(0).toUpperCase() + page.slice(1)}
              </p>
            )
          )}
        </nav>
      </motion.aside>

      <main className="col-span-10 p-8">
        {activePage === "Profile" && <Profile />}

        {activePage === "Orders" && <Orders />}

       

        {activePage === "Settings" && <Settings />}

      
       
      </main>

    </div>

  );
}

const Profile = () => {

  const[orderCount,setOrderCount] = useState();
  const[spentCount,setSpentCount] = useState();

  const navigate = useNavigate();

  const userId = localStorage.getItem("userId");



  useEffect(()=>{
    if(userId){
      fetchOrderCount();
      fetchSpentCount();
    }
  },[userId])

  const fetchOrderCount = async()=>{
        try{
          const ord = await totalUserOrder(userId);
    
          setOrderCount(ord);
        }catch(err){
          console.error(err);
        }
  }

  const fetchSpentCount = async()=>{
    try{
      const spent = await totalUserOrder(userId); 
      setSpentCount(spent);
    }catch(err){
      console.error(err);
    }
  }


  const Username = localStorage.getItem("username");
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-6">Welcome {Username} </h2>
     

       <div className=" mt-5  grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6  mb-6 sm:mb-10">
        <Stat icon={<ShoppingBag />} label="Total Orders" value={orderCount} />
        
        
        <Stat icon={<BarChart3 />} label="Total Spent" value={`₹ ${spentCount}`} />
      </div>


      <div className='mt-5'> 
        <h1 className='font-semibold'>Account Details</h1>
      </div>


      <div className='mt-15'>
        <button
          onClick={() => navigate("/all_products")}
          className='px-6  py-3 text-sm tracking-widest border border-black rounded-full hover:bg-black hover:text-white transition-all duration-300'>Shop now</button>
      </div>
    </div>
  )
};

const Orders = () => {

  const [orders, setOrders] = useState([]);



  const userId = localStorage.getItem("userId");

  useEffect(() => {

    if (!userId) {
      console.log("no user Id found");
      return;
    }
    fetchOrders(userId);

  }, [userId]);



  const fetchOrders = async (id) => {


    try {
      const orders = await userOrders(id);
      setOrders(orders);
      console.log(orders);

    }
    catch (err) {
      console.error(err);
    }


  }

  return (
    <>
      <div className="min-h-screen bg-gray-100 p-4">
        <h1 className="text-2xl font-bold mb-6 text-start">
          Orders
        </h1>
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {orders?.map((order,id) => (
  <div
    key={id}
    className="bg-white rounded-xl shadow-md p-5 border hover:shadow-lg transition"
  >
    {/* Status Badge */}
    <div className="flex justify-between items-center mb-3">
      <span
        className={`text-xs px-2 py-1 rounded-full font-semibold ${
          order.status === "PAID"
            ? "bg-green-100 text-green-700"
            : "bg-yellow-100 text-yellow-700"
        }`}
      >
        {order.status}
      </span>
    </div>

    <img
  src={order.imageUrl}
  alt={order.productName}
  className="w-full h-50 object-cover rounded-lg mb-3"
/>

    {/* Product Name */}
    <p className="text-sm mb-1">
      <span className="font-semibold">Product:</span>{" "}
      {order.productName}
    </p>

    {/* Price & Quantity */}
    <div className="flex justify-between text-sm mt-2">
      <p>
        <span className="font-semibold">Price:</span> ₹{order.productPrice}
      </p>
      <p>
        <span className="font-semibold">Qty:</span> {order.quantity}
      </p>
    </div>

    {/* Total */}
    <div className="mt-4 border-t pt-3 text-right">
      <p className="text-lg font-bold text-indigo-600">
        Total: ₹{order.totalAmount}
      </p>
    </div>
  </div>
))}
        </div>
      </div>
    </>
  )
}





const Settings = () => {

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("role");
    localStorage.removeItem("userId")
    navigate('/login');
    window.dispatchEvent(new Event("cartCleared"));
  }

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-6">Account Settings</h2>
      <p>Update your account settings here.</p>
      <button
        onClick={handleLogout}
        className="mt-4 px-4 py-2 bg-red-600 text-white rounded-full hover:bg-red-700 transition">Logout</button>
    </div>
  )
}

const Stat = ({ icon, label, value }) => {
  return (
    <div className="bg-amber-100 rounded-xl shadow p-6 flex items-center gap-4 hover:shadow-md transition">
      <div className="text-[#8B5E34]">{icon}</div>
      <div>
        <p className="text-sm text-neutral-500">{label}</p>
        <p className="text-xl font-semibold">{value}</p>
      </div>
    </div>
  );
}

export default UserPanel