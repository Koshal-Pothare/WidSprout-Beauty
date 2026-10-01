import React, { useState, useEffect } from "react";
import { motion,AnimatePresence } from "framer-motion";
import { IoEye, IoEyeOff } from "react-icons/io5";
import { FiUser } from "react-icons/fi";
import { LuShieldCheck } from "react-icons/lu";

import { useNavigate } from "react-router-dom";
import toner1 from '../assets/toner1.png';
import lipbalm2 from '../assets/lipbalm2.png';
import mask2 from '../assets/mask2.png';
import { ToastContainer , toast , Bounce} from "react-toastify";
import Swal2 from "sweetalert2";

import {login , signup} from "../services/api";


const Login=()=> {
  const [isLogin, setIsLogin] = useState(true);
  const [hidepass, setHidepass] = useState(true);
  const [role, setRole] = useState("user");
  const [user, setUser] = useState({
    username: "",
    password: "",
    email: "",
  });
  const [imageIndex, setImageIndex] = useState(0);
  const[isloading,setIsLoading]= useState(false);
  const[isSignUploading , setIsSignUpLoading] = useState(false);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const changeForm = () => {
    setIsLogin(!isLogin);
    setUser({ username: "", password: "", email: "" });
  };

const Navigate = useNavigate();

  useEffect(() => {
  const role = localStorage.getItem("role");
   if(role==="ADMIN")Navigate("/admin");
   if(role==="USER")Navigate("/user")
  }, []);

  useEffect(() => {
  setUser(prev => ({
    ...prev,
    username: "",
    email: ""
  }));
}, [role]);



const images = [toner1,lipbalm2,mask2];

useEffect(() => {
    const interval = setInterval(() => {
      setImageIndex((prev) => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);


  const handleSignUp =async(e)=>{
        e.preventDefault();

        if(isSignUploading) return;
        setIsSignUpLoading(true);

        try{
          await signup({
            username:user.username,
            email: user.email,
            password: user.password
          })

          Swal2.fire({
      title: "Signup Successful!",
      text: "Please login to continue",
      icon: "success",
      confirmButtonColor: "#10b981",
    });

    setIsLogin(true);
    setUser({username:"",email:"",password:""});
        }catch(err){
          toast.error(err.response?.data || "SignUp failed");
        }finally{
          setIsSignUpLoading(false);
        }
  }

  const handleLogin =async(e)=>{
         e.preventDefault();

         if(isloading) return;
         setIsLoading(true);
          try{
            let payload ={password:user.password};

            if(role==="admin"){
              payload.username=user.username;
            
            }else{
              payload.email=user.email;
            }

            const res = await login(payload);
            const {id,role:roleFromBackend,username}=res.data
 Swal2.fire({
      title: "Login Successful!",
      text: `Welcome !`,
      icon: "success",
      confirmButtonColor: "#10b981",
    }).then(() => {
      localStorage.setItem("role", roleFromBackend)
      localStorage.setItem("userId" ,id);
      localStorage.setItem("username",username);
       roleFromBackend === "ADMIN"
        ? Navigate("/admin")
        : Navigate("/user");
    });
 
          }catch(err){
            toast.error(err.response?.data || "Invalid credentials")
            console.error(err)
           
          }finally{
             setIsLoading(false);
          }
  }
  
  return (
    <div className="min-h-screen flex items-center justify-center gap-30  bg-[#f6efe4]  ">

<motion.div 
initial={{opacity:0,y:90}}
animate={{opacity:1,y:0}}
transition={{ duration: 0.9, ease: "easeInOut" }}

className="  w-[300px] sm:w-[420px] h-[440px] mt-20 bg-linear-to-b from-[#e8c9a0] to-[#fdf4e3] shadow-[0_40px_80px_rgba(0,0,0,0.15)] rounded-3xl ">
<AnimatePresence mode="wait">
            <motion.img
              key={images[imageIndex]}
              src={images[imageIndex]}
              alt="Product showcase"
              className="w-full h-full object-cover"
              initial={{ opacity: 0, scale: 0.8, y: -180 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 60 }}
              transition={{ duration: 0.9, ease: "easeInOut" }}
            />
          </AnimatePresence>

</motion.div>



      {/* perspective */}
      <div className="perspective-distant">
        <motion.div
        initial={{ y: 90 , opacity: 0 }}
          animate={{ rotateY: isLogin ? 0 : 180 ,opacity:1, y:40}}
          transition={{ duration: 0.9, ease: "easeInOut" }}
          className="relative w-[300px] sm:w-[420px] h-[440px]"
          style={{ transformStyle: "preserve-3d" }}
        >
          {/* LOGIN */}
          <div className="absolute inset-0 backface-hidden">
            <div className="h-full rounded-2xl bg-[#fdf8f3] shadow-2xl border border-[#C68642]/30 p-6">
              <h2 className="text-2xl md:text-3xl font-bold text-center text-[#7a3a00]">
                Welcome Back 🌿
              </h2>
              <p className="text-center text-sm text-gray-600 mt-2">
                Login to continue your journey
              </p>

              {/* role */}
              <div className="flex justify-center gap-5 mt-6">
                <button
                  onClick={() => setRole("user")}
                  className={`w-10 h-10 md:w-14 md:h-14 rounded-full flex items-center justify-center transition-all ${
                    role === "user"
                      ? "bg-[#C68642] text-white scale-110"
                      : "bg-[#EADBC8] text-[#8B5E34]"
                  }`}
                >
                  <FiUser size={22} />
                </button>
                <button
                  onClick={() => setRole("admin")}
                  className={`w-10 h-10 md:w-14 md:h-14 rounded-full flex items-center justify-center transition-all ${
                    role === "admin"
                      ? "bg-[#8B5E34] text-white scale-110"
                      : "bg-[#EADBC8] text-[#8B5E34]"
                  }`}
                >
                  <LuShieldCheck size={22} />
                </button>
              </div>
          <form  onSubmit={handleLogin}>
              <div className="mt-8">
                {role==="admin"? (

                  <input
                  name="username"
                  type ="text"
                  placeholder="username"
                  value={user.username}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded-full border focus:border-amber-600 outline-none"
                />

                ):(
                <input
                  name="email"
                  type ="email"
                  placeholder=" email"
                  value={user.email}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded-full border focus:border-amber-600 outline-none"
                />
                )}
              </div>

              <div className="mt-4 flex items-center border rounded-full focus-within:border-amber-600">
                <input
                  name="password"
                  type={hidepass ? "password" : "text"}
                  placeholder="Password"
                  value={user.password}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded-full outline-none"
                />
                <span
                  onClick={() => setHidepass(!hidepass)}
                  className="mr-3 text-amber-900 cursor-pointer"
                >
                  {hidepass ? <IoEyeOff /> : <IoEye />}
                </span>
              </div>

              <button 
            type="submit"
            disabled={isloading}
              className={`mt-6 w-full py-3 rounded-full bg-linear-to-r from-[#e9bf8f] via-[#C68642] to-[#8B5E34] text-white hover:scale-105 transition ${isloading ? "opacity-70 cursor-not-allowed" : "hover:scale-105"}`}>
                {isloading ?  "Logging in...." : "Login" }
            
              </button>
              </form>
              <p className="text-center text-sm mt-6">
                Create account?{" "}
                <button
                  onClick={changeForm}
                  className="text-amber-600 font-semibold"
                >
                  Sign Up
                </button>
              </p>    
                
            </div>
            
          </div>
   

          {/* SIGN UP */}
          <div className="absolute inset-0 rotate-y-180 backface-hidden">
            <div className="h-full rounded-2xl bg-[#fdf8f3] shadow-2xl border border-[#C68642]/30 p-6">
              <h2 className="text-3xl font-bold text-center text-amber-800">
                Sign Up 🌿
              </h2>
              <p className="text-center text-sm text-gray-600 mt-2">
                Start your natural beauty journey
              </p>
            <form onSubmit={handleSignUp}>
              <div className="mt-8">
                <input
                  name="username"
                  placeholder="Username "
                  value={user.username}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded-full border focus:border-amber-600 outline-none"
                />
              </div>

              <div className="mt-4 flex items-center border rounded-full focus-within:border-amber-600">
                <input
                  name="email"
                  type='email'
                  placeholder="Email"
                  value={user.email}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded-full outline-none"
                />
                
               
              </div>
               <div className="mt-4 flex items-center border rounded-full focus-within:border-amber-600">
                <input
                  name="password"
                  type={hidepass ? "password" : "text"}
                  placeholder="Password"
                  value={user.password}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded-full outline-none"
                />
                <span
                  onClick={() => setHidepass(!hidepass)}
                  className="mr-3 text-amber-900 cursor-pointer"
                >
                  {hidepass ? <IoEyeOff /> : <IoEye />}
                </span>
              </div>

             

              <button
              type="submit"
              disabled={isSignUploading}
              className="mt-6 w-full py-3 rounded-full bg-linear-to-r from-[#e9bf8f] via-[#C68642] to-[#8B5E34] text-white hover:scale-105 transition">
                {isSignUploading?"Creating Account ....":"Sign in"}
              </button>
              </form>

              <p className="text-center text-sm mt-6">
                Have an account?{" "}
                <button
                  onClick={changeForm}
                  className="text-amber-600 font-semibold"
                >
                  Login
                </button>
              </p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* helpers */}
      <style>{`
        .backface-hidden { backface-visibility: hidden; }
        .rotate-y-180 { transform: rotateY(180deg); }
      `}</style>

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

  );
}


export default Login;