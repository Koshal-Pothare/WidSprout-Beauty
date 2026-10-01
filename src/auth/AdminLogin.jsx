import React, { useState } from "react";
import { Eye, EyeOff, ArrowRight } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const AdminLogin = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      setError("Please enter your email and password.");
      return;
    }

    try {
      setLoading(true);
      setError("");

      // =========================
      // API CALL
      // =========================

      /*
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/admin/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Invalid credentials");
      }

      localStorage.setItem("adminToken", data.token);

      navigate("/admin/dashboard");
      */

      // Temporary testing
      await new Promise((resolve) => setTimeout(resolve, 1000));

      console.log("Login Data:", formData);

      navigate("/admin/dashboard");
    } catch (err) {
      setError(err.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F7E8CC] text-[#111111]">

      {/* ================= HEADER ================= */}

      <header className="h-[68px] bg-[#E8CEA5] shadow-md flex items-center">
        <div className="w-full max-w-[1100px] mx-auto px-5 sm:px-8 flex items-center justify-between">

          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
            WildSprout
          </h1>

          <Link to="/" className="text-sm font-medium hover:underline">
            Back to Website
          </Link>

        </div>
      </header>


      {/* ================= MAIN ================= */}

      <main className="min-h-[calc(100vh-68px)] flex items-center justify-center px-5 py-10">

        <div className="w-full max-w-[430px]">

          {/* ================= HEADING ================= */}

          <div className="text-center mb-8">

           

            <h2 className="text-3xl sm:text-4xl font-semibold">
              Welcome Back
            </h2>

            <p className="mt-3 text-sm text-[#665b4d]">
              Login to access your WildSprout admin panel.
            </p>

          </div>


          {/* ================= LOGIN CARD ================= */}

          <div className="bg-[#F9EBD3] border border-[#C6AE86] rounded-2xl p-6 sm:p-8 shadow-[0_10px_35px_rgba(80,60,30,0.12)]">

            <form onSubmit={handleSubmit} className="space-y-5">

              {/* ================= EMAIL ================= */}

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
                  autoComplete="email"
                  className="w-full h-12 px-4 rounded-lg bg-[#F7E8CC] border border-[#BDA582] outline-none text-sm placeholder:text-[#8b7b65] focus:border-black focus:ring-1 focus:ring-black transition"
                />

              </div>


              {/* ================= PASSWORD ================= */}

              <div>

                <div className="flex items-center justify-between mb-2">

                  <label className="block text-sm font-medium">
                    Password
                  </label>

                  <Link
                    to="/admin/forgot-password"
                    className="text-xs text-[#665b4d] hover:text-black hover:underline"
                  >
                    Forgot Password?
                  </Link>

                </div>

                <div className="relative">

                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Enter your password"
                    autoComplete="current-password"
                    className="w-full h-12 px-4 pr-12 rounded-lg bg-[#F7E8CC] border border-[#BDA582] outline-none text-sm placeholder:text-[#8b7b65] focus:border-black focus:ring-1 focus:ring-black transition"
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-[#5f5548] hover:text-black transition"
                  >
                    {showPassword ? (
                      <EyeOff size={18} />
                    ) : (
                      <Eye size={18} />
                    )}
                  </button>

                </div>

              </div>


              {/* ================= ERROR ================= */}

              {error && (
                <div className="px-4 py-3 rounded-lg bg-red-50 border border-red-200 text-red-600 text-sm">
                  {error}
                </div>
              )}


              {/* ================= REMEMBER ME ================= */}

              <div className="flex items-center gap-2">

                <input
                  type="checkbox"
                  id="remember"
                  className="w-4 h-4 accent-black cursor-pointer"
                />

                <label
                  htmlFor="remember"
                  className="text-sm text-[#665b4d] cursor-pointer"
                >
                  Remember me
                </label>

              </div>


              {/* ================= LOGIN BUTTON ================= */}

              <button
                type="submit"
                disabled={loading}
                className="w-full h-12 mt-2rounded-2xl
                  bg-linear-to-r from-[#e9bf8f] via-[#C68642] to-[#8B5E34] text-white hover:scale-105  rounded-lg text-sm tracking-wide font-medium flex items-center justify-center gap-2 hover:bg-[#292929] disabled:opacity-60 disabled:cursor-not-allowed transition"
              >

                {loading ? (
                  <>
                    <span className="w-4 h-4 border-2 border-[#F7E8CC]/40 border-t-[#F7E8CC] rounded-full animate-spin" />
                    Signing In...
                  </>
                ) : (
                  <>
                    Sign In
                    <ArrowRight size={18} />
                  </>
                )}

              </button>

            </form>


            {/* ================= REGISTER ================= */}

            <div className="text-center mt-6 pt-6 border-t border-[#C6AE86]">

              <p className="text-sm text-[#665b4d]">
                Don't have an admin account?{" "}

                <Link
                  to="/admin-register"
                  className="font-semibold text-black hover:underline"
                >
                  Register
                </Link>

              </p>

            </div>

          </div>


          {/* ================= FOOTER ================= */}

          <p className="text-center text-xs text-[#796b58] mt-6">
            © 2026 WildSprout. Admin Portal.
          </p>

        </div>

      </main>

    </div>
  );
};

export default AdminLogin;