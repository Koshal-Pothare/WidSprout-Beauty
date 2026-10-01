

import React, { useState, useEffect , useRef} from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { RiSubtractFill } from "react-icons/ri";
import { IoMdAdd } from "react-icons/io";
import { addToCart, getCart, removeItem,clearCart } from "../services/CartService";
import { placeOrder,createPayment,verifyPayment } from "../services/OrderService";
import { toast } from "react-toastify";





const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const[isPaying,setIsPaying] = useState(false);

  const userId = localStorage.getItem("userId");

  const navigate = useNavigate();

  const razorpayRef = useRef();

  /* LOAD CART */


  useEffect(() => {
    const handleCartCleared = () => {
      setCartItems([]); // instantly clear cart UI
    };

    window.addEventListener("cartCleared", handleCartCleared);

    return () => {
      window.removeEventListener("cartCleared", handleCartCleared);
    };
  }, []);

  const totalAmount = cartItems.reduce(
  (total, item) => total + item.price * item.quantity,
  0
);

  useEffect(() => {
    if (!userId) {
      setCartItems([]);
      return;
    }
    fetchCartItem();
  }, [userId]);


  const fetchCartItem = async () => {
    const response = await getCart(userId);
    setCartItems(response);
    console.log(response)
  }

  /* - QUANTITY HANDLERS -*/
  const increaseQuantity = async (item) => {
    await addToCart({
      userId,
      productId: item.productId,
      quantity: 1
    });
    fetchCartItem();
    window.dispatchEvent(new Event("cartUpdated"));

  };

  const decreseQuantity = async (item) => {
    if (item.quantity === 1) {
      await removeItem(item.cartId);
    } else {
      await addToCart({
        userId,
        productId: item.productId,
        quantity: -1
      });

    }
    fetchCartItem();
    window.dispatchEvent(new Event("cartUpdated"));

  };


   const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      if(window.Razorpay) return resolve(true);
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };


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

    toast.success("Payment Successful 🎉");

    setShowModal(false);
    navigate("/orders");
  }
  catch (err) {
    console.error("Payment verification failed:", err);
    toast.error("Payment verification failed. Please contact support.");
  } finally {
    setIsPaying(false);
  }
};




 const handleConfirmPayment =async()=>{

if (cartItems.length === 0) {
  alert("Cart is empty");
  return;
}

if (isPaying) return;
setIsPaying(true);

 try{
    const order = await placeOrder({
      userId,
      totalAmount,
      address: "user delivery address",
    });

   const razorpayOrder = await createPayment(order.id);

   const isLoaded = await loadRazorpayScript();
    if (!isLoaded) {
      toast.error("Razorpay SDK failed to load");
      setIsPaying(false);
      return;
    }
    const options = {
      key: "rzp_live_SDceviNokDETbw", 
      amount: razorpayOrder.amount,
      currency: "INR",
      name: "WildSprout",
      description: "Order Payment",
      order_id: razorpayOrder.razorpayOrderId,

      handler:  function (response) {

        
        //  Verify payment
        handlePaymentSuccess(response);
    ;
      },
         
      modal :{
        ondismiss: () => {

           if (razorpayRef.current) {
      razorpayRef.current.close();
      razorpayRef.current = null;
    }
  
          setIsPaying(false)
          setShowModal(false);
        } // reset paying state if user closes the modal
      },

      theme: {
        color: "#000000",
      },
    };
        
    
      razorpayRef.current = new window.Razorpay(options);


razorpayRef.current.on("payment.failed",  () => {
  toast.error("Payment failed. Please try again.");
  setIsPaying(false);
});



    razorpayRef.current.open();
   

  }catch(err){
    console.error(err)
    toast.error("failed");
    setIsPaying(false);
  }
 
 }


  return (
    <div className="w-full min-h-screen py-24">
      {/* ---------------- HEADER ---------------- */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 px-6">
        <motion.h1
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="text-3xl font-semibold"
        >
          Your Cart
        </motion.h1>

        <button className="border px-4 py-2 rounded-full text-sm tracking-widest border-black hover:bg-black hover:text-white transition-all duration-300">
          <Link to="/all_products">Back to Shop</Link>
        </button>
      </div>

      {/* -- EMPTY CART -- */}
      {cartItems.length === 0 ? (
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1 }}
          className="text-center mt-32"
        >
          <p className="text-gray-600 text-3xl">
            Your cart is empty.
          </p>
        </motion.div>
      ) : (
        <>
          {/* - CART ITEMS -- */}
          <div className="w-full max-w-5xl mx-auto mt-10 px-4">
            {cartItems.map((item) => (
              <motion.div
                key={item.cartId}
                initial={{ y: 60, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8 }}
                viewport={{ amount: 0.3 }}
                className="
                  flex items-center justify-between gap-6
                  border border-amber-700 bg-rose-50
                  py-6 px-6 mb-6 rounded-3xl shadow-lg

                  max-[700px]:
                  flex-col
                  items-start
                  bg-white
                "
              >
                {/* IMAGE + INFO */}
                <div className="flex items-center gap-6 w-full max-[700px]:flex-col max-[700px]:items-start">
                  <img
                    src={`http://localhost:8080/images/${item.image}`}
                    alt={item.name}
                    className="
                      w-48 h-48 object-cover rounded-xl
                      max-[700px]:w-full
                      max-[700px]:h-56
                    "
                  />

                  <div className="flex flex-col gap-2 w-full">
                    <h2 className="font-semibold text-xl">
                      {item.name}
                    </h2>
                    <p className="text-md text-amber-700">{item.category}</p>
                    <p className="text-md text-gray-600">
                      {item.description}
                    </p>
                    <p className="text-md text-gray-700">{item.rating}⭐ rating</p>

                    {/* QUANTITY CONTROLS */}
                    <div className="flex items-center justify-between border border-amber-700 rounded-2xl w-32 px-3 py-1 mt-3">
                      <button onClick={() => decreseQuantity(item)}>
                        <RiSubtractFill />
                      </button>

                      <p className="text-gray-900 text-lg">
                        {item.quantity}
                      </p>

                      <button onClick={() => increaseQuantity(item)}>
                        <IoMdAdd />
                      </button>
                    </div>
                  </div>
                </div>

                {/* PRICE */}
                <p className="font-semibold text-xl max-[700px]:self-end mt-4">
                  ₹{item.price * item.quantity}
                </p>
              </motion.div>
            ))}
          </div>

          {/* -- CHECKOUT BAR -- */}
          <div
            className="
              w-full max-w-5xl mx-auto mt-8
              flex justify-between items-center
              p-4 text-white
              rounded-2xl
              max-[700px]:flex-col
              max-[700px]:gap-4
            "
          >
            <button 
            onClick={()=>setShowModal(true)}
            className="border px-5 py-2 rounded-full text-sm text-black tracking-widest border-black hover:bg-black hover:text-white transition-all duration-300">
              Order Now
            </button>

            <h2 className="text-2xl font-semibold text-black">
              ₹
              {totalAmount}
            </h2>
          </div>
        </>
      )}

      {showModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
          onClick={() => setShowModal(false)}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-3xl p-8 w-full max-w-md shadow-2xl"
          >
            <h2 className="text-2xl font-semibold text-center mb-6">
              Confirm Payment
            </h2>


            <div className="flex justify-between items-center text-lg mb-6">
              <span>Total Amount</span>
              <span className="font-semibold">₹{totalAmount}</span>
            </div>


            <div className="flex gap-4">
              <button
                onClick={() => setShowModal(false)}
                className="w-full border py-2 rounded-full transition-all hover:scale-105"
              >
                Cancel
              </button>


              <button
              disabled={isPaying}
                onClick={handleConfirmPayment}
                className="w-full bg-black text-white py-2 rounded-full transition-all hover:scale-105"
              >
              {isPaying?"Making Payment":"Confirm Payment"}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}

    </div>
  );
};

export default Cart;
