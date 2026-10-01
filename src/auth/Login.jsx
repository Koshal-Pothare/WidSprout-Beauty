import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { IoEye, IoEyeOff } from "react-icons/io5";
import { FiUser, FiMail } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast, Bounce } from "react-toastify";
import Swal2 from "sweetalert2";

import loginImage from "../assets/loginImage.png";
import { login, signup } from "../services/api.js";
 

const Login = () => {
  const Navigate = useNavigate();

  const [isLogin, setIsLogin] = useState(true);
  const [hidepass, setHidepass] = useState(true);
  const [hideConfirmPass, setHideConfirmPass] = useState(true);

  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [isloading, setIsLoading] = useState(false);
  const [isSignUploading, setIsSignUpLoading] = useState(false);

  /* =========================
     HANDLE INPUT
  ========================= */

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  /* =========================
     SWITCH LOGIN / SIGNUP
  ========================= */

  const changeForm = () => {
    setIsLogin((prev) => !prev);

    setUser({
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    });

    setHidepass(true);
    setHideConfirmPass(true);
  };

  /* =========================
     CHECK EXISTING USER LOGIN
  ========================= */

  useEffect(() => {
    const savedRole = localStorage.getItem("role");

    if (savedRole === "USER") {
      Navigate("/userDashboard");
    }
  }, [Navigate]);

  /* =========================
     SIGN UP
  ========================= */

  const handleSignUp = async (e) => {
    e.preventDefault();

    if (isSignUploading) return;

    if (
      !user.username ||
      !user.email ||
      !user.password ||
      !user.confirmPassword
    ) {
      toast.error("Please fill all fields");
      return;
    }

    if (user.password !== user.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    if (user.password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }

    setIsSignUpLoading(true);

    try {
      await signup({
        username: user.username,
        email: user.email,
        password: user.password,
      });

      await Swal2.fire({
        title: "Signup Successful!",
        text: "Please login to continue",
        icon: "success",
        confirmButtonColor: "#111111",
      });

      setIsLogin(true);

      setUser({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
    } catch (err) {
      toast.error(err.response?.data || "Signup failed");
    } finally {
      setIsSignUpLoading(false);
    }
  };

  /* =========================
     USER LOGIN
  ========================= */

  const handleLogin = async (e) => {
    e.preventDefault();

    if (isloading) return;

    if (!user.email || !user.password) {
      toast.error("Please enter your email and password");
      return;
    }

    setIsLoading(true);

    try {
      const payload = {
        email: user.email,
        password: user.password,
      };

      const res = await login(payload);

      const {
        id,
        role,
        username,
        token,
      } = res.data;

      await Swal2.fire({
        title: "Login Successful!",
        text: "Welcome to WildSprout Beauty",
        icon: "success",
        confirmButtonColor: "#111111",
      });

      localStorage.setItem("role", role);
      localStorage.setItem("userId", id);
      localStorage.setItem("username", username);
      localStorage.setItem("token", token);

      Navigate("/user");
    } catch (err) {
      toast.error(err.response?.data || "Invalid credentials");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  /* =========================
     GOOGLE LOGIN
  ========================= */

  const handleGoogleLogin = () => {
    window.location.href =
      "http://localhost:8080/oauth2/authorization/google";
  };

  return (
    <div className="min-h-screen bg-[#f8f1e4] flex items-center justify-center px-3 py-4 sm:px-5 sm:py-6 md:px-6 lg:px-8">

      {/* ================= MAIN CARD ================= */}

      <div className="relative w-full max-w-[1080px] rounded-[22px] sm:rounded-[26px] lg:rounded-[28px] overflow-hidden border border-[#D5B98D] shadow-[0_25px_70px_rgba(82,55,25,0.18)] bg-[#F7E8CC] flex flex-col md:flex-row">

        {/* ================= LEFT IMAGE ================= */}

        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="relative w-full h-[310px] sm:h-[380px] md:h-auto md:min-h-[650px] md:w-[45%] lg:w-[50%] shrink-0 overflow-hidden"
        >

          <img
            src={loginImage}
            alt="WildSprout Beauty"
            className="absolute inset-0 w-full h-full object-cover object-center"
          />

          {/* Warm overlay */}

          <div className="absolute inset-0 bg-gradient-to-t from-[#3D2414]/70 via-[#6D4528]/10 to-transparent" />

          {/* DESKTOP / TABLET RIGHT BLEND */}

          <div className="absolute top-0 right-0 w-[40%] h-full bg-gradient-to-r from-transparent via-[#F7E8CC]/25 to-[#F7E8CC] hidden md:block pointer-events-none" />

          {/* MOBILE BOTTOM BLEND */}

          <div className="absolute bottom-0 left-0 right-0 h-[40%] bg-gradient-to-t from-[#F7E8CC] via-[#F7E8CC]/25 to-transparent md:hidden pointer-events-none" />

          {/* LOGO */}

          <div className="absolute top-5 left-5 sm:top-7 sm:left-7 lg:top-9 lg:left-9 z-20">
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold tracking-tight text-white drop-shadow-md">
              WildSprout
            </h1>

            <p className="text-[9px] sm:text-[10px] lg:text-xs tracking-[4px] text-[#F7E5C7] mt-1">
              BEAUTY
            </p>
          </div>

          {/* IMAGE CONTENT */}

          <div className="absolute bottom-7 left-5 right-5 sm:bottom-9 sm:left-7 sm:right-7 lg:bottom-10 lg:left-9 lg:right-9 z-20">

            <p className="text-[9px] sm:text-[10px] lg:text-xs uppercase tracking-[3px] text-[#F1CFA0] mb-2 sm:mb-3">
              Natural Beauty
            </p>

            <h2 className="text-3xl sm:text-4xl lg:text-[43px] font-serif text-white leading-[1.05]">
              Beauty inspired
              <br />
              by nature.
            </h2>

            <p className="mt-3 sm:mt-4 max-w-[380px] text-[11px] sm:text-xs lg:text-sm text-[#FFF5E7] leading-5 sm:leading-6">
              Pure, gentle and thoughtfully crafted skincare for naturally beautiful skin.
            </p>

          </div>

        </motion.div>

        {/* ================= RIGHT FORM AREA ================= */}

        <div className="relative w-full md:w-[55%] lg:w-[50%] bg-[#F7E8CC] flex items-center justify-center px-5 py-8 sm:px-8 sm:py-10 md:px-8 lg:px-12 xl:px-16">

          {/* EXTRA DESKTOP BLEND */}

          <div className="absolute left-0 top-0 bottom-0 w-[60px] lg:w-[80px] bg-gradient-to-r from-transparent to-[#F7E8CC] -translate-x-full hidden md:block pointer-events-none" />

          {/* ================= FLIP CONTAINER ================= */}

          <div className="relative w-full max-w-[430px] min-h-[560px] sm:min-h-[590px] md:min-h-[610px]" style={{ perspective: "1300px" }}>

            <motion.div
              animate={{ rotateY: isLogin ? 0 : 180 }}
              transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
              className="relative w-full min-h-[560px] sm:min-h-[590px] md:min-h-[610px]"
              style={{ transformStyle: "preserve-3d" }}
            >

              {/* =====================================================
                  LOGIN SIDE
              ===================================================== */}

              <div
                className="absolute inset-0 w-full h-full"
                style={{
                  backfaceVisibility: "hidden",
                  WebkitBackfaceVisibility: "hidden",
                }}
              >

                <div className="w-full h-full flex flex-col justify-center">

                  {/* HEADING */}

                  <div className="mb-6 sm:mb-7">

                    <p className="text-[10px] sm:text-xs tracking-[3px] uppercase text-[#8B5E34] font-medium mb-2 sm:mb-3">
                      Welcome Back
                    </p>

                    <h2 className="text-[28px] sm:text-3xl lg:text-4xl font-serif font-semibold text-[#24170D] leading-tight">
                      Sign in to WildSprout
                    </h2>

                    <p className="text-xs sm:text-sm text-[#766655] mt-2 sm:mt-3 leading-5 sm:leading-6">
                      Enter your details to continue your beauty journey.
                    </p>

                  </div>

                  {/* LOGIN FORM */}

                  <form onSubmit={handleLogin}>

                    {/* EMAIL */}

                    <div className="mb-4 sm:mb-5">

                      <label className="block text-xs sm:text-sm font-medium text-[#302116] mb-2">
                        Email Address
                      </label>

                      <div className="relative">

                        <FiMail size={17} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#967A5D]" />

                        <input
                          name="email"
                          type="email"
                          placeholder="Enter your email"
                          value={user.email}
                          onChange={handleChange}
                          autoComplete="email"
                          className="w-full h-11 sm:h-12 pl-11 pr-4 rounded-xl border border-[#C8AD89] bg-[#FDF5E8] text-sm text-[#24170D] placeholder:text-[#9B8974] outline-none focus:border-[#8B5E34] focus:ring-1 focus:ring-[#8B5E34] transition"
                        />

                      </div>

                    </div>

                    {/* PASSWORD */}

                    <div className="mb-4">

                      <div className="flex items-center justify-between mb-2">

                        <label className="text-xs sm:text-sm font-medium text-[#302116]">
                          Password
                        </label>

                        <button
                          type="button"
                          className="text-[10px] sm:text-xs text-[#8B5E34] hover:underline"
                        >
                          Forgot Password?
                        </button>

                      </div>

                      <div className="relative">

                        <input
                          name="password"
                          type={hidepass ? "password" : "text"}
                          placeholder="Enter your password"
                          value={user.password}
                          onChange={handleChange}
                          autoComplete="current-password"
                          className="w-full h-11 sm:h-12 px-4 pr-12 rounded-xl border border-[#C8AD89] bg-[#FDF5E8] text-sm text-[#24170D] placeholder:text-[#9B8974] outline-none focus:border-[#8B5E34] focus:ring-1 focus:ring-[#8B5E34] transition"
                        />

                        <button
                          type="button"
                          onClick={() => setHidepass(!hidepass)}
                          className="absolute right-4 top-1/2 -translate-y-1/2 text-[#806A52] hover:text-[#24170D]"
                        >
                          {hidepass ? <IoEyeOff size={18} /> : <IoEye size={18} />}
                        </button>

                      </div>

                    </div>

                    {/* REMEMBER */}

                    <div className="flex items-center gap-2 mb-5">

                      <input
                        type="checkbox"
                        id="remember"
                        className="w-4 h-4 accent-[#8B5E34]"
                      />

                      <label htmlFor="remember" className="text-xs sm:text-sm text-[#6F604F]">
                        Remember me
                      </label>

                    </div>

                    {/* LOGIN */}

                    <button
                      type="submit"
                      disabled={isloading}
                      className="w-full h-11 sm:h-12 rounded-xl bg-[#111111] text-[#F7E8CC] text-sm font-medium tracking-wide hover:bg-amber-950  disabled:opacity-60 disabled:cursor-not-allowed transition"
                    >
                      {isloading ? "Logging in..." : "Login"}
                    </button>

                  </form>

                  {/* GOOGLE DIVIDER */}

                  <div className="flex items-center gap-3 my-5">

                    <div className="flex-1 h-px bg-[#D5BC96]" />

                    <span className="text-[9px] text-[#897661] whitespace-nowrap">
                      OR CONTINUE WITH
                    </span>

                    <div className="flex-1 h-px bg-[#D5BC96]" />

                  </div>

                  {/* GOOGLE */}

                  <button
                    type="button"
                    onClick={handleGoogleLogin}
                    className="w-full min-h-11 rounded-xl border border-[#C8AD89] bg-[#FDF5E8] text-[#302116] text-xs sm:text-sm font-medium hover:bg-[#F4E3C7] transition flex items-center justify-center gap-3 px-4 py-3"
                  >
                    <span className="font-bold text-base">G</span>
                    Continue with Google
                  </button>

                  {/* SIGNUP SWITCH */}

                  <p className="text-center text-xs sm:text-sm text-[#6F604F] mt-5 sm:mt-6">
                    Don't have an account?{" "}
                    <button type="button" onClick={changeForm} className="text-[#8B5E34] font-semibold hover:underline">
                      Sign Up
                    </button>
                  </p>

                </div>

              </div>

              {/* =====================================================
                  SIGN UP SIDE
              ===================================================== */}

              <div
                className="absolute inset-0 w-full h-full"
                style={{
                  backfaceVisibility: "hidden",
                  WebkitBackfaceVisibility: "hidden",
                  transform: "rotateY(180deg)",
                }}
              >

                <div className="w-full h-full flex flex-col justify-center">

                  {/* HEADING */}

                  <div className="mb-5 sm:mb-6">

                    <p className="text-[10px] sm:text-xs tracking-[3px] uppercase text-[#8B5E34] font-medium mb-2 sm:mb-3">
                      Create Account
                    </p>

                    <h2 className="text-[28px] sm:text-3xl lg:text-4xl font-serif font-semibold text-[#24170D] leading-tight">
                      Join WildSprout
                    </h2>

                    <p className="text-xs sm:text-sm text-[#766655] mt-2 sm:mt-3 leading-5">
                      Create your account and begin your beauty journey.
                    </p>

                  </div>

                  {/* SIGNUP FORM */}

                  <form onSubmit={handleSignUp}>

                    {/* USERNAME */}

                    <div className="mb-3 sm:mb-4">

                      <label className="block text-xs sm:text-sm font-medium text-[#302116] mb-2">
                        Username
                      </label>

                      <div className="relative">

                        <FiUser size={17} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#967A5D]" />

                        <input
                          name="username"
                          type="text"
                          placeholder="Enter your username"
                          value={user.username}
                          onChange={handleChange}
                          autoComplete="username"
                          className="w-full h-11 sm:h-12 pl-11 pr-4 rounded-xl border border-[#C8AD89] bg-[#FDF5E8] text-sm text-[#24170D] placeholder:text-[#9B8974] outline-none focus:border-[#8B5E34] focus:ring-1 focus:ring-[#8B5E34] transition"
                        />

                      </div>

                    </div>

                    {/* EMAIL */}

                    <div className="mb-3 sm:mb-4">

                      <label className="block text-xs sm:text-sm font-medium text-[#302116] mb-2">
                        Email Address
                      </label>

                      <div className="relative">

                        <FiMail size={17} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#967A5D]" />

                        <input
                          name="email"
                          type="email"
                          placeholder="Enter your email"
                          value={user.email}
                          onChange={handleChange}
                          autoComplete="email"
                          className="w-full h-11 sm:h-12 pl-11 pr-4 rounded-xl border border-[#C8AD89] bg-[#FDF5E8] text-sm text-[#24170D] placeholder:text-[#9B8974] outline-none focus:border-[#8B5E34] focus:ring-1 focus:ring-[#8B5E34] transition"
                        />

                      </div>

                    </div>

                    {/* PASSWORD */}

                    <div className="mb-3 sm:mb-4">

                      <label className="block text-xs sm:text-sm font-medium text-[#302116] mb-2">
                        Password
                      </label>

                      <div className="relative">

                        <input
                          name="password"
                          type={hidepass ? "password" : "text"}
                          placeholder="Create a password"
                          value={user.password}
                          onChange={handleChange}
                          autoComplete="new-password"
                          className="w-full h-11 sm:h-12 px-4 pr-12 rounded-xl border border-[#C8AD89] bg-[#FDF5E8] text-sm text-[#24170D] placeholder:text-[#9B8974] outline-none focus:border-[#8B5E34] focus:ring-1 focus:ring-[#8B5E34] transition"
                        />

                        <button
                          type="button"
                          onClick={() => setHidepass(!hidepass)}
                          className="absolute right-4 top-1/2 -translate-y-1/2 text-[#806A52] hover:text-[#24170D]"
                        >
                          {hidepass ? <IoEyeOff size={18} /> : <IoEye size={18} />}
                        </button>

                      </div>

                    </div>

                    {/* CONFIRM PASSWORD */}

                    <div className="mb-5">

                      <label className="block text-xs sm:text-sm font-medium text-[#302116] mb-2">
                        Confirm Password
                      </label>

                      <div className="relative">

                        <input
                          name="confirmPassword"
                          type={hideConfirmPass ? "password" : "text"}
                          placeholder="Confirm your password"
                          value={user.confirmPassword}
                          onChange={handleChange}
                          autoComplete="new-password"
                          className="w-full h-11 sm:h-12 px-4 pr-12 rounded-xl border border-[#C8AD89] bg-[#FDF5E8] text-sm text-[#24170D] placeholder:text-[#9B8974] outline-none focus:border-[#8B5E34] focus:ring-1 focus:ring-[#8B5E34] transition"
                        />

                        <button
                          type="button"
                          onClick={() => setHideConfirmPass(!hideConfirmPass)}
                          className="absolute right-4 top-1/2 -translate-y-1/2 text-[#806A52] hover:text-[#24170D]"
                        >
                          {hideConfirmPass ? <IoEyeOff size={18} /> : <IoEye size={18} />}
                        </button>

                      </div>

                    </div>

                    {/* SIGNUP BUTTON */}

                    <button
                      type="submit"
                      disabled={isSignUploading}
                      className="w-full h-11 sm:h-12 rounded-xl bg-[#111111] text-[#F7E8CC] text-sm font-medium tracking-wide hover:bg-amber-950 disabled:opacity-60 disabled:cursor-not-allowed transition"
                    >
                      {isSignUploading ? "Creating Account..." : "Create Account"}
                    </button>

                  </form>

                  {/* LOGIN SWITCH */}

                  <p className="text-center text-xs sm:text-sm text-[#6F604F] mt-5 sm:mt-6">
                    Already have an account?{" "}
                    <button type="button" onClick={changeForm} className="text-[#8B5E34] font-semibold hover:underline">
                      Login
                    </button>
                  </p>

                </div>

              </div>

            </motion.div>

          </div>

        </div>

      </div>

      {/* ================= TOAST ================= */}

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
};

export default Login;