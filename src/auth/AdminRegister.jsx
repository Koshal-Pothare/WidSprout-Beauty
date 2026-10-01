import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const AdminRegister = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    setError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !formData.name ||
      !formData.email ||
      !formData.password ||
      !formData.confirmPassword
    ) {
      setError("Please fill in all fields.");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    // Connect your API here
    console.log(formData);

    navigate("/admin/login");
  };

  return (
    <div className="min-h-screen bg-[#F7E8CC] text-[#111111]">

      {/* ================= HEADER ================= */}
      <header className="h-[68px] bg-[#E8CEA5] shadow-md flex items-center">
        <div className="w-full max-w-[1100px] mx-auto px-5 sm:px-8 flex items-center justify-between">

          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
            WildSprout
          </h1>

          <Link
            to="/"
            className="text-sm font-medium hover:underline"
          >
            Back to Website
          </Link>

        </div>
      </header>


      {/* ================= REGISTER SECTION ================= */}
      <main className="min-h-[calc(100vh-68px)] flex items-center justify-center px-5 py-10">

        <div className="w-full max-w-[460px]">

          {/* Heading */}
          <div className="text-center mb-8">

          

            <h2 className="text-3xl sm:text-4xl font-semibold">
              Create Admin Account
            </h2>

            <p className="mt-3 text-sm text-[#665b4d]">
              Register to access the WildSprout admin panel.
            </p>

          </div>


          {/* ================= FORM CARD ================= */}
          <div className="bg-[#F9EBD3] border border-[#C6AE86] rounded-2xl p-6 sm:p-8 shadow-[0_10px_35px_rgba(80,60,30,0.12)]">

            <form onSubmit={handleSubmit} className="space-y-5">

              {/* Name */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Full Name
                </label>

                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  className="
                    w-full h-12
                    px-4
                    rounded-lg
                    bg-[#F7E8CC]
                    border border-[#BDA582]
                    outline-none
                    text-sm
                    placeholder:text-[#8b7b65]
                    focus:border-black
                    transition
                  "
                />
              </div>


              {/* Email */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Email Address
                </label>

                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="admin@wildsprout.com"
                  className="
                    w-full h-12
                    px-4
                    rounded-lg
                    bg-[#F7E8CC]
                    border border-[#BDA582]
                    outline-none
                    text-sm
                    placeholder:text-[#8b7b65]
                    focus:border-black
                    transition
                  "
                />
              </div>


              {/* Password */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Password
                </label>

                <div className="relative">

                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Create a password"
                    className="
                      w-full h-12
                      px-4 pr-12
                      rounded-lg
                      bg-[#F7E8CC]
                      border border-[#BDA582]
                      outline-none
                      text-sm
                      placeholder:text-[#8b7b65]
                      focus:border-black
                      transition
                    "
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="
                      absolute
                      right-4
                      top-1/2
                      -translate-y-1/2
                      text-[#5f5548]
                      hover:text-black
                    "
                  >
                    {showPassword ? (
                      <EyeOff size={18} />
                    ) : (
                      <Eye size={18} />
                    )}
                  </button>

                </div>
              </div>


              {/* Confirm Password */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Confirm Password
                </label>

                <div className="relative">

                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="Confirm your password"
                    className="
                      w-full h-12
                      px-4 pr-12
                      rounded-lg
                      bg-[#F7E8CC]
                      border border-[#BDA582]
                      outline-none
                      text-sm
                      placeholder:text-[#8b7b65]
                      focus:border-black
                      transition
                    "
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowConfirmPassword(!showConfirmPassword)
                    }
                    className="
                      absolute
                      right-4
                      top-1/2
                      -translate-y-1/2
                      text-[#5f5548]
                      hover:text-black
                    "
                  >
                    {showConfirmPassword ? (
                      <EyeOff size={18} />
                    ) : (
                      <Eye size={18} />
                    )}
                  </button>

                </div>
              </div>


              {/* Error */}
              {error && (
                <p className="text-sm text-red-600">
                  {error}
                </p>
              )}


              {/* Register Button */}
              <button
                type="submit"
                className="
                  w-full
                  h-12
                  mt-2 rounded-2xl
                  bg-linear-to-r from-[#e9bf8f] via-[#C68642] to-[#8B5E34] text-white hover:scale-105 transition
                "
              >
                Create Account
              </button>

            </form>


            {/* Login */}
            <div className="text-center mt-6 pt-6 border-t border-[#C6AE86]">

              <p className="text-sm text-[#665b4d]">
                Already have an account?{" "}
                <Link
                  to="/admin-login"
                  className="font-semibold text-black hover:underline"
                >
                  Login
                </Link>
              </p>

            </div>

          </div>


          {/* Footer */}
          <p className="text-center text-xs text-[#796b58] mt-6">
            © 2026 WildSprout. Admin Portal.
          </p>

        </div>

      </main>

    </div>
  );
};

export default AdminRegister;