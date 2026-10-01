import React from 'react'
import './App.css'
import { useState,useEffect } from 'react'
import {  Routes, Route,useLocation } from 'react-router-dom';


import Navbar from './components/Navbar'
import Home from './Pages/Home'

import Footer from './components/Footer'







import { ToastContainer,toast,Bounce } from 'react-toastify';


import AllProducts from './Pages/AllProducts'
import AboutUs from './Pages/AboutUs'
import Login from './auth/Login'
import Cart from './Pages/Cart'
import Contact from './Pages/Contact'
import AdminPanel from './components/AdminPanel'
import UserDashboard from './user/UserDashboard'

import OAuthSuccess from './components/OAuthSuccess';

import AdminRegister from './auth/AdminRegister';
import AdminLogin from './auth/AdminLogin';






function App() {

  const [refresh , setRefresh] = useState(0);
   const location = useLocation();

   useEffect(()=>{
    window.scrollTo(0,0)
   },[location.pathname]);

const hideLayout = [
  "/admin-register",
  "/admin-login",
  "/login",
  "/admin-panel",
  "/userDashboard",
  "/oauth-success"
]

  const hideNavbarFooter = hideLayout.some((route)=>location.pathname.startsWith(route))
 
  return (
    <>


   

     {!hideNavbarFooter && <Navbar />} 

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




      <Routes>
        <Route
          path="/"
          element={<Home refresh={refresh} setRefresh={setRefresh} />}
        />
        <Route path="/contact" element={<Contact />} />
        <Route path="/all-products" element={<AllProducts />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/admin-panel" element={<AdminPanel />} />
        <Route path="/userDashboard" element={<UserDashboard />} />
        <Route path="/oauth-success" element={<OAuthSuccess/>} />
        <Route path ='/admin-register' element={<AdminRegister/>} />
          <Route path ='/admin-login' element={<AdminLogin/>} />
          <Route path ="/about-us" element={<AboutUs/>} />
      </Routes>
    
       {!hideNavbarFooter && <Footer />}
 


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



    </>
  )
}

export default App
