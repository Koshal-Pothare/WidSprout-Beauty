import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";

import { RiSubtractFill } from "react-icons/ri";
import { IoMdAdd } from "react-icons/io";
import { MdCurrencyRupee } from "react-icons/md";

import {
  addToCart,
  getCart,
  removeItem,
  clearCart,
} from "../services/CartService.js";

import {
  placeOrder,
  createPayment,
  verifyPayment,
} from "../services/OrderService.js";

import { toast } from "react-toastify";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [isPaying, setIsPaying] = useState(false);

  const userId = localStorage.getItem("userId");

  const navigate = useNavigate();

  const razorpayRef = useRef(null);

  /* =====================================================
     TOTAL AMOUNT
  ===================================================== */

  const totalAmount = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  /* =====================================================
     TOTAL ITEMS
  ===================================================== */

  const totalItems = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  /* =====================================================
     CART CLEARED EVENT
  ===================================================== */

  useEffect(() => {
    const handleCartCleared = () => {
      setCartItems([]);
    };

    window.addEventListener("cartCleared", handleCartCleared);

    return () => {
      window.removeEventListener("cartCleared", handleCartCleared);
    };
  }, []);

  /* =====================================================
     LOAD CART
  ===================================================== */

  useEffect(() => {
    if (!userId) {
      setCartItems([]);
      return;
    }

    fetchCartItem();
  }, [userId]);

  const fetchCartItem = async () => {
    try {
      const response = await getCart(userId);

      setCartItems(response || []);

      console.log("Cart Items:", response);
    } catch (error) {
      console.error("Failed to fetch cart:", error);
      toast.error("Unable to load cart.");
    }
  };

  /* =====================================================
     INCREASE QUANTITY
  ===================================================== */

  const increaseQuantity = async (item) => {
    try {
      await addToCart({
        userId,
        productId: item.productId,
        quantity: 1,
      });

      await fetchCartItem();

      window.dispatchEvent(new Event("cartUpdated"));
    } catch (error) {
      console.error("Increase quantity failed:", error);
      toast.error("Unable to update quantity.");
    }
  };

  /* =====================================================
     DECREASE QUANTITY
  ===================================================== */

  const decreseQuantity = async (item) => {
    try {
      if (item.quantity === 1) {
        await removeItem(item.cartId);
      } else {
        await addToCart({
          userId,
          productId: item.productId,
          quantity: -1,
        });
      }

      await fetchCartItem();

      window.dispatchEvent(new Event("cartUpdated"));
    } catch (error) {
      console.error("Decrease quantity failed:", error);
      toast.error("Unable to update quantity.");
    }
  };

  /* =====================================================
     LOAD RAZORPAY
  ===================================================== */

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      if (window.Razorpay) {
        resolve(true);
        return;
      }

      const script = document.createElement("script");

      script.src = "https://checkout.razorpay.com/v1/checkout.js";

      script.onload = () => resolve(true);

      script.onerror = () => resolve(false);

      document.body.appendChild(script);
    });
  };

  /* =====================================================
     PAYMENT SUCCESS
  ===================================================== */

  const handlePaymentSuccess = async (response) => {
    try {
      if (razorpayRef.current) {
        razorpayRef.current.close();
        razorpayRef.current = null;
      }

      await verifyPayment({
        razorpayOrderId: response.razorpay_order_id,
        razorpayPaymentId: response.razorpay_payment_id,
        razorpaySignature: response.razorpay_signature,
      });

      await clearCart(userId);

      setCartItems([]);

      window.dispatchEvent(new Event("cartCleared"));

      setShowModal(false);

      toast.success("Payment Successful 🎉");

      navigate("/orders");
    } catch (error) {
      console.error("Payment verification failed:", error);

      toast.error(
        "Payment verification failed. Please contact support."
      );
    } finally {
      setIsPaying(false);
    }
  };

  /* =====================================================
     CONFIRM PAYMENT
  ===================================================== */

  const handleConfirmPayment = async () => {
    if (cartItems.length === 0) {
      toast.error("Your cart is empty.");
      return;
    }

    if (isPaying) {
      return;
    }

    setIsPaying(true);

    try {
      const order = await placeOrder({
        userId,
        totalAmount,
        address: "user delivery address",
      });

      const razorpayOrder = await createPayment(order.id);

      const isLoaded = await loadRazorpayScript();

      if (!isLoaded) {
        toast.error("Razorpay SDK failed to load.");
        setIsPaying(false);
        return;
      }

      const options = {
        /*
          Razorpay PUBLIC Key ID

          Never put Razorpay Key Secret
          inside frontend code.
        */

        key: "rzp_live_SDceviNokDETbw",

        amount: razorpayOrder.amount,

        currency: "INR",

        name: "WildSprout Beauty",

        description: "WildSprout Beauty Order",

        order_id: razorpayOrder.razorpayOrderId,

        handler: async function (response) {
          await handlePaymentSuccess(response);
        },

        modal: {
          ondismiss: () => {
            if (razorpayRef.current) {
              razorpayRef.current.close();
              razorpayRef.current = null;
            }

            setIsPaying(false);

            setShowModal(false);
          },
        },

        theme: {
          color: "#b7791f",
        },
      };

      razorpayRef.current = new window.Razorpay(options);

      razorpayRef.current.on("payment.failed", () => {
        toast.error("Payment failed. Please try again.");

        setIsPaying(false);
      });

      razorpayRef.current.open();
    } catch (error) {
      console.error("Payment error:", error);

      toast.error("Unable to process payment.");

      setIsPaying(false);
    }
  };

  /* =====================================================
     JSX
  ===================================================== */

  return (
    <div className="min-h-screen w-full bg-[#fcf4e8] py-12 md:py-20">

      


      {/* =====================================================
          EMPTY CART
      ===================================================== */}

      {cartItems.length === 0 ? (

        <motion.div
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="flex min-h-[60vh] flex-col items-center justify-center px-6 text-center"
        >

          <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-white shadow-sm">

            <span className="text-4xl">
              🛍
            </span>

          </div>


          <h2 className="font-serif text-3xl font-semibold text-gray-900">
            Your cart is empty
          </h2>


          <p className="mt-3 max-w-md text-sm leading-6 text-gray-600">
            Discover our thoughtfully crafted skincare products and
            bring out your natural glow.
          </p>


          <Link
            to="/all-products"
            className="mt-7 rounded-full bg-amber-700 px-8 py-3 text-sm font-semibold text-white shadow-md transition-all duration-300 hover:bg-amber-800 hover:scale-105"
          >
            Explore Products →
          </Link>

        </motion.div>

      ) : (

        <>
          {/* =====================================================
              CART CONTENT
          ===================================================== */}

          <div className="mx-auto mt-10 grid max-w-7xl grid-cols-1 gap-8 px-6 lg:grid-cols-[minmax(0,1fr)_350px]">


            {/* =====================================================
                CART ITEMS SCROLL AREA
            ===================================================== */}

            <div
              className="
                h-[500px]
                overflow-y-auto
                pr-3
                space-y-5
                [scrollbar-width:thin]
              "
            >

              {cartItems.map((item) => (

                <motion.div
                  key={item.cartId}
                  initial={{ y: 40, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.6 }}
                  viewport={{ once: true }}
                  className="
                    group
                    overflow-hidden
                    rounded-2xl
                    border
                    border-amber-100
                    bg-[#fffaf3]
                    shadow-sm
                    transition-all
                    duration-300
                    hover:shadow-lg
                  "
                >

                  <div className="flex flex-col gap-6 p-5 sm:flex-row">

                    {/* =====================================================
                        PRODUCT IMAGE
                    ===================================================== */}

                    <div
                      className="
                        h-52
                        w-full
                        shrink-0
                        overflow-hidden
                        rounded-xl
                        sm:h-44
                        sm:w-44
                      "
                    >

                      <img
                        src={`http://localhost:8080/images/${item.image}`}
                        alt={item.name}
                        className="
                          h-full
                          w-full
                          object-cover
                          transition-transform
                          duration-700
                          group-hover:scale-105
                        "
                      />

                    </div>


                    {/* =====================================================
                        PRODUCT DETAILS
                    ===================================================== */}

                    <div className="flex min-w-0 flex-1 flex-col">

                      {/* PRODUCT NAME */}

                      <div>

                        <h2 className="font-serif text-xl font-semibold text-gray-900 md:text-2xl">
                          {item.name}
                        </h2>

                        <p className="mt-1 text-sm font-medium text-amber-700">
                          {item.category}
                        </p>

                      </div>


                      {/* DESCRIPTION */}

                      <p className="mt-3 line-clamp-2 text-sm leading-6 text-gray-600">
                        {item.description}
                      </p>


                      {/* RATING */}

                      <div className="mt-3 flex items-center gap-2 text-sm text-gray-700">

                        <span className="text-amber-600">
                          {item.rating} ⭐
                        </span>

                        <span className="text-gray-400">
                          •
                        </span>

                        <span>
                          Natural skincare
                        </span>

                      </div>


                      {/* BOTTOM ROW */}

                      <div className="mt-auto flex flex-wrap items-center justify-between gap-4 pt-5">

                        {/* QUANTITY */}

                        <div className="flex items-center overflow-hidden rounded-full border border-amber-300 bg-white">

                          <button
                            onClick={() => decreseQuantity(item)}
                            className="
                              flex
                              h-9
                              w-10
                              items-center
                              justify-center
                              text-amber-800
                              transition
                              hover:bg-amber-100
                            "
                          >
                            <RiSubtractFill />
                          </button>


                          <span
                            className="
                              flex
                              h-9
                              min-w-10
                              items-center
                              justify-center
                              border-x
                              border-amber-200
                              px-2
                              text-sm
                              font-semibold
                              text-gray-900
                            "
                          >
                            {item.quantity}
                          </span>


                          <button
                            onClick={() => increaseQuantity(item)}
                            className="
                              flex
                              h-9
                              w-10
                              items-center
                              justify-center
                              text-amber-800
                              transition
                              hover:bg-amber-100
                            "
                          >
                            <IoMdAdd />
                          </button>

                        </div>


                        {/* ITEM PRICE */}

                        <p className="flex items-center text-xl font-semibold text-gray-900">

                          <MdCurrencyRupee />

                          {item.price * item.quantity}

                        </p>

                      </div>

                    </div>

                  </div>

                </motion.div>

              ))}

            </div>


            {/* =====================================================
                ORDER SUMMARY

                IMPORTANT:
                This is OUTSIDE the scroll container.
                Therefore, scrolling products does not move it.
            ===================================================== */}

            <motion.div
              initial={{ x: 30, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.7 }}
              className="
                h-fit
                self-start
                rounded-2xl
                border
                border-amber-100
                bg-[#fffaf3]
                p-6
                shadow-sm

                lg:sticky
                lg:top-8
              "
            >

              <p className="mb-2 text-xs font-medium tracking-[0.25em] text-amber-700">
                ORDER SUMMARY
              </p>


              <h2 className="mb-6 font-serif text-2xl font-semibold text-gray-900">
                Your Order
              </h2>


              {/* SUMMARY DETAILS */}

              <div className="space-y-4 border-b border-amber-100 pb-5">

                {/* ITEMS */}

                <div className="flex justify-between text-sm text-gray-600">

                  <span>
                    Items
                  </span>

                  <span className="font-medium text-gray-900">
                    {totalItems}
                  </span>

                </div>


                {/* SUBTOTAL */}

                <div className="flex justify-between text-sm text-gray-600">

                  <span>
                    Subtotal
                  </span>

                  <span className="flex items-center font-medium text-gray-900">

                    <MdCurrencyRupee />

                    {totalAmount}

                  </span>

                </div>


                {/* SHIPPING */}

                <div className="flex justify-between text-sm text-gray-600">

                  <span>
                    Shipping
                  </span>

                  <span className="font-medium text-green-700">
                    Free
                  </span>

                </div>

              </div>


              {/* TOTAL */}

              <div className="flex items-center justify-between py-5">

                <span className="font-semibold text-gray-900">
                  Total
                </span>

                <span className="flex items-center text-2xl font-semibold text-amber-800">

                  <MdCurrencyRupee />

                  {totalAmount}

                </span>

              </div>


              {/* ORDER BUTTON */}

              <button
                onClick={() => setShowModal(true)}
                className="
                  w-full
                  rounded-xl
                  bg-amber-700
                  px-6
                  py-4
                  text-sm
                  font-semibold
                  text-white
                  shadow-md
                  transition-all
                  duration-300
                  hover:bg-amber-800
                  hover:shadow-lg
                  hover:scale-[1.01]
                "
              >
                Proceed to Order →
              </button>


              {/* CONTINUE SHOPPING */}

              <Link
                to="/all-products"
                className="
                  mt-4
                  block
                  text-center
                  text-sm
                  font-medium
                  text-amber-700
                  transition
                  hover:text-amber-900
                "
              >
                Continue Shopping
              </Link>

            </motion.div>

          </div>


          {/* =====================================================
              PAYMENT MODAL
          ===================================================== */}

          {showModal && (

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="
                fixed
                inset-0
                z-50
                flex
                items-center
                justify-center
                bg-black/50
                px-4
                backdrop-blur-sm
              "
              onClick={() => {
                if (!isPaying) {
                  setShowModal(false);
                }
              }}
            >

              <motion.div
                initial={{
                  scale: 0.9,
                  opacity: 0,
                  y: 20,
                }}
                animate={{
                  scale: 1,
                  opacity: 1,
                  y: 0,
                }}
                transition={{ duration: 0.3 }}
                onClick={(e) => e.stopPropagation()}
                className="
                  relative
                  w-full
                  max-w-md
                  rounded-3xl
                  border
                  border-amber-100
                  bg-[#fffaf3]
                  p-7
                  shadow-2xl
                  md:p-8
                "
              >

                {/* CLOSE BUTTON */}

                <button
                  onClick={() => {
                    if (!isPaying) {
                      setShowModal(false);
                    }
                  }}
                  disabled={isPaying}
                  className="
                    absolute
                    right-5
                    top-5
                    flex
                    h-9
                    w-9
                    items-center
                    justify-center
                    rounded-full
                    bg-white
                    text-xl
                    text-gray-600
                    shadow-sm
                    transition
                    hover:bg-amber-700
                    hover:text-white
                    disabled:cursor-not-allowed
                    disabled:opacity-50
                  "
                >
                  ×
                </button>


                {/* MODAL HEADING */}

                <div className="mb-7 text-center">

                  <p className="mb-2 text-xs font-medium tracking-[0.25em] text-amber-700">
                    WILDSPROUT BEAUTY
                  </p>

                  <h2 className="font-serif text-2xl font-semibold text-gray-900">
                    Confirm Your Order
                  </h2>

                  <p className="mt-2 text-sm text-gray-500">
                    Review your total before proceeding to payment.
                  </p>

                </div>


                {/* TOTAL BOX */}

                <div className="mb-7 rounded-2xl border border-amber-100 bg-white p-5">

                  <div className="flex items-center justify-between">

                    <span className="text-sm text-gray-600">
                      Total Amount
                    </span>

                    <span className="flex items-center text-xl font-semibold text-amber-800">

                      <MdCurrencyRupee />

                      {totalAmount}

                    </span>

                  </div>

                </div>


                {/* PAYMENT BUTTONS */}

                <div className="flex gap-3">

                  <button
                    onClick={() => setShowModal(false)}
                    disabled={isPaying}
                    className="
                      w-full
                      rounded-xl
                      border
                      border-amber-700
                      py-3
                      text-sm
                      font-semibold
                      text-amber-800
                      transition-all
                      duration-300
                      hover:bg-amber-50
                      disabled:cursor-not-allowed
                      disabled:opacity-50
                    "
                  >
                    Cancel
                  </button>


                  <button
                    disabled={isPaying}
                    onClick={handleConfirmPayment}
                    className="
                      w-full
                      rounded-xl
                      bg-amber-700
                      py-3
                      text-sm
                      font-semibold
                      text-white
                      transition-all
                      duration-300
                      hover:bg-amber-800
                      disabled:cursor-not-allowed
                      disabled:opacity-60
                    "
                  >
                    {isPaying
                      ? "Making Payment..."
                      : "Confirm Payment"}
                  </button>

                </div>

              </motion.div>

            </motion.div>

          )}

        </>
      )}

    </div>
  );
};

export default Cart;