import React, { useState, useEffect } from "react";
import { FiX, FiMenu } from "react-icons/fi";
import { Link, useNavigate, useLocation, NavLink } from "react-router-dom";
import { IoCartOutline, IoHeartOutline } from "react-icons/io5";
import { IoMdPerson } from "react-icons/io";
import { motion, AnimatePresence } from "framer-motion";
import logo1 from "../assets/logo1.png";
import { getCart } from "../services/CartService.js";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [hoverProfile, setHoverProfile] = useState(false);
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const [count, setCount] = useState(0);
  const [scrolled, setScrolled] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const LoggedIn = JSON.parse(
      localStorage.getItem("isuserLoggedIn") || "false"
    );

    setUserLoggedIn(LoggedIn);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const menu = [
    {
      id: "Home",
      label: "Home",
      path: "/",
    },
    {
      id: "About",
      label: "About us",
      path: "/about-us",
    },
    {
      id: "Products",
      label: "Products",
      path: "/all-products",
    },
    {
      id: "Contact",
      label: "Contact",
      path: "/contact",
    },
  ];

  const userName = localStorage.getItem("username");

  /* =====================================================
     CART COUNT
  ===================================================== */

  const updateCartCount = async () => {
    const userId = localStorage.getItem("userId");

    if (!userId) {
      setCount(0);
      return;
    }

    try {
      const cart = await getCart(userId);

      const totalCount = cart.reduce(
        (sum, item) => sum + item.quantity,
        0
      );

      setCount(totalCount);
    } catch (error) {
      console.error("Failed to update cart count:", error);
      setCount(0);
    }
  };

  useEffect(() => {
    updateCartCount();

    const handleCartUpdated = () => {
      updateCartCount();
    };

    const handleCartCleared = () => {
      setCount(0);
    };

    window.addEventListener("cartUpdated", handleCartUpdated);
    window.addEventListener("cartCleared", handleCartCleared);

    return () => {
      window.removeEventListener(
        "cartUpdated",
        handleCartUpdated
      );

      window.removeEventListener(
        "cartCleared",
        handleCartCleared
      );
    };
  }, []);

  /* =====================================================
     LOGIN
  ===================================================== */

  const handleLoginClick = () => {
    setIsMenuOpen(false);
    navigate("/login");
  };

  /* =====================================================
     LOGOUT
  ===================================================== */

  const handleLogout = () => {
    localStorage.removeItem("isuserLoggedIn");
    localStorage.removeItem("username");
    localStorage.removeItem("userId");

    setUserLoggedIn(false);
    setHoverProfile(false);
    setIsMenuOpen(false);

    navigate("/");
  };

  /* =====================================================
     CLOSE MOBILE MENU
  ===================================================== */

  const closeMobileMenu = () => {
    setIsMenuOpen(false);
  };

  /* =====================================================
     ANIMATION
  ===================================================== */

  const navVariants = {
    hidden: {
      y: -20,
      opacity: 0,
    },

    visible: {
      y: 0,
      opacity: 1,
    },
  };

  const mobileMenuVariants = {
    hidden: {
      x: "100%",
    },

    visible: {
      x: 0,
      transition: {
        duration: 0.35,
        ease: [0.4, 0, 0.2, 1],
      },
    },

    exit: {
      x: "100%",
      transition: {
        duration: 0.3,
        ease: [0.4, 0, 0.2, 1],
      },
    },
  };

  const mobileItemVariants = {
    hidden: {
      opacity: 0,
      x: 30,
    },

    visible: {
      opacity: 1,
      x: 0,
    },
  };

  const dropdownVariants = {
    hidden: {
      opacity: 0,
      y: -10,
      scale: 0.95,
      transition: {
        duration: 0.2,
      },
    },

    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.25,
      },
    },

    exit: {
      opacity: 0,
      y: -10,
      scale: 0.95,
      transition: {
        duration: 0.15,
      },
    },
  };

  return (
    <nav>
      <motion.div
        initial="hidden"
        animate="visible"
        variants={navVariants}
        transition={{
          duration: 1,
          ease: "easeOut",
        }}
        className={`fixed top-0 left-0 z-50 flex w-full items-center justify-between p-3 md:justify-around lg:justify-around ${
          scrolled
            ? "bg-[#f7e7cc] shadow-md"
            : "bg-transparent backdrop-blur-xs"
        }`}
      >

        {/* =====================================================
            LOGO
        ===================================================== */}

        <Link to="/" onClick={closeMobileMenu}>
          <div className="flex items-center justify-center">

            <img
              src={logo1}
              className="h-9 w-9 sm:h-12 sm:w-12 md:h-12 md:w-12 lg:h-12 lg:w-12"
              alt="WildSprout logo"
            />

            {/* Desktop brand name only */}

            <h1 className="hidden text-md font-serif tracking-wider sm:text-xl md:block md:text-2xl lg:text-3xl">
              WildSprout
            </h1>

          </div>
        </Link>

        {/* =====================================================
            DESKTOP MENU
        ===================================================== */}

        <div>
          <ul className="hidden items-center gap-2 md:flex">

            {menu.map((item) => (
              <li
                key={item.id}
                className="relative text-md font-semibold"
              >
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    `relative block cursor-pointer px-3 py-1 transition-colors duration-300 ${
                      isActive
                        ? "text-amber-800"
                        : "text-gray-800 hover:text-amber-900"
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      <span className="relative z-10">
                        {item.label}
                      </span>

                      {isActive && (
                        <motion.span
                          layoutId="navbar-active-indicator"
                          className="absolute bottom-[-4px] left-1/2 h-[3px] w-[50%] -translate-x-1/2 rounded-full bg-amber-700"
                          transition={{
                            type: "spring",
                            stiffness: 500,
                            damping: 35,
                          }}
                        />
                      )}
                    </>
                  )}
                </NavLink>
              </li>
            ))}

          </ul>

          {/* =====================================================
              MOBILE HEADER BUTTON
          ===================================================== */}

          <div className="flex items-center md:hidden">

            <button
              onClick={() => setIsMenuOpen(true)}
              className="flex h-10 w-10 items-center justify-center text-2xl text-gray-800 transition-all hover:text-amber-700"
              aria-label="Open menu"
            >
              <FiMenu />
            </button>

          </div>

        </div>

        {/* =====================================================
            DESKTOP CART + PROFILE
        ===================================================== */}

        <div className="hidden items-center justify-around gap-4 md:flex md:w-50">

          {/* CART */}

          <div className="relative">

            <Link to="/cart">

              <IoCartOutline
                size={25}
                className="transition-all hover:scale-110"
              />

            </Link>

            {count > 0 && (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-amber-700 text-xs text-white"
              >
                {count}
              </motion.span>
            )}

          </div>

          {/* PROFILE */}

          <div
            className="relative rounded-full border border-black px-3 py-2 text-sm font-semibold transition-all"
            onMouseEnter={() =>
              userLoggedIn && setHoverProfile(true)
            }
            onMouseLeave={() => setHoverProfile(false)}
          >

            {userLoggedIn ? (
              <>
                <div className="flex cursor-pointer items-center gap-1">

                  <IoMdPerson size={18} />

                  {userName}

                </div>

                {/* PROFILE DROPDOWN */}

                <AnimatePresence>

                  {hoverProfile && (
                    <motion.div
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      variants={dropdownVariants}
                      className="absolute right-0 top-full mt-5 w-48 overflow-hidden rounded-lg border border-gray-200 bg-white shadow-xl"
                    >

                      <div className="py-2">

                        <Link
                          to="/userDashboard"
                          onClick={() => setHoverProfile(false)}
                        >
                          <motion.div
                            whileHover={{
                              backgroundColor: "#f3f4f6",
                            }}
                            className="cursor-pointer px-4 py-2 text-gray-700 transition-colors hover:text-amber-700"
                          >
                            Dashboard
                          </motion.div>
                        </Link>

                        <hr className="my-1 border-gray-200" />

                        <motion.button
                          whileHover={{
                            backgroundColor: "#f3f4f6",
                          }}
                          onClick={handleLogout}
                          className="w-full cursor-pointer px-4 py-2 text-left text-red-600 transition-colors hover:text-red-700"
                        >
                          Logout
                        </motion.button>

                      </div>

                    </motion.div>
                  )}

                </AnimatePresence>

              </>
            ) : (

              <button
                onClick={() => navigate("/login")}
                className="flex items-center gap-1"
              >
                <IoMdPerson size={18} />
                Sign Up
              </button>

            )}

          </div>

        </div>

      </motion.div>

      {/* =====================================================
          MOBILE MENU OVERLAY + SIDE DRAWER
      ===================================================== */}

      <AnimatePresence>

        {isMenuOpen && (
          <>
            {/* OVERLAY */}

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={closeMobileMenu}
              className="fixed inset-0 z-[60] bg-black/40 backdrop-blur-[2px] md:hidden"
            />

            {/* RIGHT SIDE DRAWER */}

            <motion.div
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={mobileMenuVariants}
              className="fixed right-0 top-0 z-[70] flex h-screen w-[85%] max-w-[360px] flex-col bg-white shadow-2xl md:hidden"
            >

              {/* =================================================
                  DRAWER HEADER
              ================================================= */}

              <div className="flex items-center justify-between border-b border-amber-200 bg-[#f7e7cc] px-5 py-4">

                <Link
                  to="/"
                  onClick={closeMobileMenu}
                  className="flex items-center gap-2"
                >

                  <img
                    src={logo1}
                    alt="WildSprout"
                    className="h-10 w-10"
                  />

                  <span className="font-serif text-xl tracking-wide text-gray-900">
                    WildSprout
                  </span>

                </Link>

                <button
                  onClick={closeMobileMenu}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-amber-200 bg-white text-xl text-gray-700 transition-all hover:bg-amber-700 hover:text-amber-100"
                  aria-label="Close menu"
                >
                  <FiX />
                </button>

              </div>

              {/* =================================================
                  MOBILE MENU ITEMS
              ================================================= */}

              <div className="flex-1 overflow-y-auto px-5 py-6">

                <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-amber-700">
                  Menu
                </p>

                <motion.div
                  initial="hidden"
                  animate="visible"
                  transition={{
                    staggerChildren: 0.07,
                    delayChildren: 0.08,
                  }}
                  className="space-y-2"
                >

                  {menu.map((item) => (

                    <motion.div
                      key={item.id}
                      variants={mobileItemVariants}
                    >

                      <NavLink
                        to={item.path}
                        onClick={closeMobileMenu}
                        className={({ isActive }) =>
                          `flex items-center justify-between rounded-xl border px-4 py-3.5 text-base font-semibold transition-all ${
                            isActive
                              ? "border-amber-700 bg-rose-50 text-amber-700"
                              : "border-transparent text-gray-800 hover:border-amber-200 hover:bg-rose-50 hover:text-amber-700"
                          }`
                        }
                      >

                        {({ isActive }) => (
                          <>
                            <span>{item.label}</span>

                            {isActive && (
                              <span className="h-2 w-2 rounded-full bg-amber-700" />
                            )}
                          </>
                        )}

                      </NavLink>

                    </motion.div>

                  ))}

                </motion.div>

                {/* =================================================
                    SHOPPING
                ================================================= */}

                <div className="mt-8">

                  <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-amber-700">
                    Shopping
                  </p>

                  <motion.div
                    initial="hidden"
                    animate="visible"
                    transition={{
                      staggerChildren: 0.08,
                      delayChildren: 0.35,
                    }}
                    className="space-y-2"
                  >

                    {/* CART */}

                    <motion.div variants={mobileItemVariants}>

                      <Link
                        to="/cart"
                        onClick={closeMobileMenu}
                        className="flex items-center justify-between rounded-xl border border-transparent px-4 py-3.5 text-base font-semibold text-gray-800 transition-all hover:border-amber-200 hover:bg-rose-50 hover:text-amber-700"
                      >

                        <div className="flex items-center gap-3">

                          <IoCartOutline size={22} />

                          <span>Cart</span>

                        </div>

                        {count > 0 && (
                          <span className="flex h-6 min-w-6 items-center justify-center rounded-full bg-amber-700 px-1.5 text-xs font-semibold text-white">
                            {count}
                          </span>
                        )}

                      </Link>

                    </motion.div>

                    {/* WISHLIST */}

                    <motion.div variants={mobileItemVariants}>

                      <Link
                        to="/wishlist"
                        onClick={closeMobileMenu}
                        className="flex items-center justify-between rounded-xl border border-transparent px-4 py-3.5 text-base font-semibold text-gray-800 transition-all hover:border-amber-200 hover:bg-rose-50 hover:text-amber-700"
                      >

                        <div className="flex items-center gap-3">

                          <IoHeartOutline size={22} />

                          <span>Wishlist</span>

                        </div>

                      </Link>

                    </motion.div>

                  </motion.div>

                </div>

                {/* =================================================
                    ACCOUNT
                ================================================= */}

                <div className="mt-8">

                  <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-amber-700">
                    Account
                  </p>

                  <motion.div
                    initial="hidden"
                    animate="visible"
                    transition={{
                      staggerChildren: 0.08,
                      delayChildren: 0.5,
                    }}
                    className="space-y-2"
                  >

                    {userLoggedIn ? (
                      <>

                        {/* DASHBOARD */}

                        <motion.div variants={mobileItemVariants}>

                          <Link
                            to="/userDashboard"
                            onClick={closeMobileMenu}
                            className="flex items-center gap-3 rounded-xl border border-transparent px-4 py-3.5 text-base font-semibold text-gray-800 transition-all hover:border-amber-200 hover:bg-rose-50 hover:text-amber-700"
                          >

                            <IoMdPerson size={22} />

                            <span>Dashboard</span>

                          </Link>

                        </motion.div>

                        {/* LOGOUT */}

                        <motion.div variants={mobileItemVariants}>

                          <button
                            onClick={handleLogout}
                            className="flex w-full items-center gap-3 rounded-xl border border-transparent px-4 py-3.5 text-left text-base font-semibold text-red-600 transition-all hover:border-red-200 hover:bg-red-50"
                          >

                            <FiX size={21} />

                            <span>Logout</span>

                          </button>

                        </motion.div>

                      </>
                    ) : (

                      /* LOGIN */

                      <motion.div variants={mobileItemVariants}>

                        <button
                          onClick={handleLoginClick}
                          className="flex w-full items-center gap-3 rounded-xl border border-amber-700 bg-amber-700 px-4 py-3.5 text-left text-base font-semibold text-amber-100 shadow-md transition-all hover:bg-amber-800"
                        >

                          <IoMdPerson size={22} />

                          <span>Login</span>

                        </button>

                      </motion.div>

                    )}

                  </motion.div>

                </div>

              </div>

              {/* =================================================
                  DRAWER FOOTER
              ================================================= */}

              <div className="border-t border-amber-200 bg-rose-50 px-5 py-5">

                <p className="text-center font-serif text-lg text-amber-700">
                  Good Skin. Good Vibes.
                </p>

                <p className="mt-1 text-center text-xs text-gray-600">
                  Natural skincare by WildSprout Beauty
                </p>

              </div>

            </motion.div>
          </>
        )}

      </AnimatePresence>
    </nav>
  );
};

export default Navbar;