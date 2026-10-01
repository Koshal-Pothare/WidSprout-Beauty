import { useState, useEffect, use } from "react";
import { ShoppingBag, Package, Users, BarChart3, } from "lucide-react";
import { motion } from "framer-motion";

import { RiDeleteBin6Fill } from "react-icons/ri";
import { FaEdit } from "react-icons/fa";
import { useNavigate } from "react-router";
import AddProduct from './AddProduct';


import { login } from "../services/api";
import { deleteProduct, getAllProducts , updateProduct } from "../services/ProductService";
import { getAllReviews, deleteReview } from "../services/ReviewService";
import { toast } from "react-toastify";
import { totalOrders } from "../services/OrderService";




const AdminPanel = () => {
  const [activePage, setActivePage] = useState("dashboard");
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("isAdminLoggedIn") === "true"
  );

  return (
    <div className="min-h-screen w-full bg-neutral-50  flex flex-col md:grid md:grid-cols-12 py-20">
      {/* Sidebar */}
      <motion.aside
        initial={{ x: 0, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 2, ease: "easeOut" }}
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

        <nav className="flex md:flex-col flex-row justify-around md:justify-start w-full gap-4">
          {["dashboard", "products", "orders", "customers", "settings"].map(
            (page) => (
              <p
                key={page}
                onClick={() => setActivePage(page)}
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


      {/* Main */}
      <main className=" w-full  md:col-span-10  p-4  md:p-8">
        {activePage === "dashboard" && <Dashboard />}
        {activePage === "products" && <Products />}
        {activePage === "orders" && <Orders />}
        {activePage === "customers" && <Customers />}
        {activePage === "settings" && <Settings />}
      </main>
    </div>
  );
}


const Dashboard = () => {

  const [addproductModalOpen, setAddproductModalOpen] = useState(false);
  const [userCount, setUserCount] = useState(0);
  const [productCount, setProductCount] = useState(0);
  const [orderCount, setOrderCount] = useState(0);
  const [revenueCount, setRevenueCount] = useState(0);




  useEffect(() => {
    if (addproductModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => (document.body.style.overflow = "auto");
  }, [addproductModalOpen]);

  useEffect(() => {
    fetch("http://localhost:8080/api/auth/usercount")
      .then(res => res.json())
      .then(data => setUserCount(data));
  }, []);

  useEffect(() => {
    fetch("http://localhost:8080/api/products/totalproducts")
      .then(res => res.json())
      .then(data => setProductCount(data));
  })

  useEffect(() => {
    fetch("http://localhost:8080/api/orders/totalOrder")
      .then(res => res.json())
      .then(data => setOrderCount(data));

  })

  useEffect(() => {
    fetch("http://localhost:8080/api/orders/totalRevenue")
      .then(res => res.json())
      .then(data => setRevenueCount(data));

  })


  return (
    <>
      <h2 className="text-2xl font-semibold mb-6">
        Admin Dashboard
      </h2>

      <div className="   grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6  mb-6 sm:mb-10">
        <Stat icon={<ShoppingBag />} label="Total Orders" value={orderCount} />
        <Stat icon={<Package />} label="Products" value={productCount} />
        <Stat icon={<Users />} label="Customers" value={userCount} />
        <Stat icon={<BarChart3 />} label="Revenue" value={`₹ ${revenueCount}`} />
      </div>

      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
        <button
          onClick={() => setAddproductModalOpen(true)}
          className="px-6 py-2 rounded-full bg-[#8B5E34] text-white hover:bg-[#6f4a29] transition">
          Add New Product
        </button>

        <button className="px-6 py-2 rounded-full border border-neutral-300 hover:bg-neutral-100 transition">
          View Orders
        </button>
      </div>

      {addproductModalOpen && <AddProduct onClose={() => setAddproductModalOpen(false)} />}

    </>
  );
}

const Products = () => {

  const [product, setProduct] = useState([]);
  const [loading, setloading] = useState(true);
  const [showModal , setShowModal] = useState(false);
  const[selectedProduct , setSelectedProduct]= useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await getAllProducts();
      console.log("api response = ", response)
      console.log("response data =", response)
      setProduct(response);
    } catch (err) {
      console.error(err);
      toast.error("Failed to Load images")
    } finally {
      setloading(false);
    }
  }
  if (loading) return <p>loading...</p>;


  const handleDeleteProduct = async (productId) => {
    try {
      await deleteProduct(productId);
      fetchProducts();
      toast.success("Product Deleted")
    } catch (err) {
      console.error(err)
    }
  }

  const handleUpdateProduct=(product)=>{
setShowModal(true);
setSelectedProduct(product)
// toast.success("Product Updated Sucessfully")
  }

  return (
    <>
      <h2 className="text-2xl font-semibold mb-6">Products</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {product.map((product, index) => (
          <div
            key={index}
            className="bg-amber-50 flex flex-col items-center p-6 rounded-xl shadow-lg hover:shadow-xl transition border border-amber-700"
          >

            <div className="h-48 w-full rounded-xl overflow-hidden mb-4 border border-amber-200">
              <img src={`http://localhost:8080/images/${product.image}`} alt={product.name} className="h-full w-full object-cover object-center transition-transform duration-800 ease-out hover:scale-110  " />
            </div>

            <h3 className="font-semibold text-gray-900 mb-1">{product.name}</h3>
            <p className="text-sm text-gray-600 mb-2">{product.category}</p>
            <div className="text-gray-700 font-semibold mb-4">₹{product.price}</div>
            <div className="flex gap-2">

              <button
                onClick={() => handleDeleteProduct(product.id)}
                className="px-4 py-2 bg-red-600 text-white rounded-full hover:bg-red-700 transition">
                <RiDeleteBin6Fill size={20} />
            
              </button>
<button
                onClick={() => handleUpdateProduct(product)}
                className="px-4 py-2 bg-green-600 text-white rounded-full hover:bg-green-700 transition">
                <FaEdit size={20}/>
           
              </button>

            </div>
          </div>
        ))}
      </div>
      <div>


      </div>
{showModal && (
  <AddProduct
    onClose={() => setShowModal(false)}
    existingProduct={selectedProduct}
    isEdit={true}
    onSuccess={fetchProducts}
  />
)}
    </>
  );
}

const Orders = () => {
const[orders,setOrders]=useState([]);

useEffect(()=>{
  fetchOrders();
},[])

const fetchOrders = async()=>{
  try{
  const res = await totalOrders();
  console.log(res);
  setOrders(res);
  }catch(err){
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
          {orders.map((order, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-md p-5 border hover:shadow-lg transition"
            >

              <div className="flex justify-between items-center mb-3">
                <span className="text-sm text-gray-500">
                  Order #{order.orderId}
                </span>
                <span
                  className={`text-xs px-2 py-1 rounded-full font-semibold ${order.orderStatus === "PAID"
                      ? "bg-green-100 text-green-700"
                      : "bg-yellow-100 text-yellow-700"
                    }`}
                >
                  {order.orderStatus}
                </span>
              </div>
              <img
  src={`http://localhost:8080/images/${order.image}`}
  alt={order.productName}
  className="w-full h-50 object-cover rounded-lg mb-3"
/>


              <p className="text-sm mb-1">
                <span className="font-semibold">User:</span> {order.username}
              </p>


              <p className="text-sm mb-1">
                <span className="font-semibold">Product:</span> {order.productName}
              </p>


              <div className="flex justify-between text-sm mt-2">
                <p>
                  <span className="font-semibold">Price:</span> ₹{order.productPrice}
                </p>
                <p>
                  <span className="font-semibold">Qty:</span> {order.quantity}
                </p>
              </div>


              <div className="mt-4 border-t pt-3 text-right">
                <p className="text-lg font-bold text-indigo-600">
                  Total: ₹{order.orderTotal}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

const Customers = () => {

  const [review, setReview] = useState([]);


  useEffect(() => {
    fetchReview();
  }, [])

  const fetchReview = async () => {
    try {
      const res = await getAllReviews();
      setReview(res);
    } catch (err) {
      console.log(err);
    }
  }

  const handledeleteReview = async (reviewId) => {

    try {
      await deleteReview(reviewId);
      fetchReview();
      toast.success("Review Deleted")
      setReview((prevReviews) =>
        prevReviews.filter((review) => review.id !== reviewId)
      );

    } catch (err) {
      console.log(err)
    }

  }


  return (
    <>
      <div>
        <h1 className="text-xl font-semibold mb-4">Customer Reviews</h1>

        {review.length === 0 ? (
          <p className="text-gray-500">No reviews found</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {review.map((review) => (
              <div
                key={review.id}
                className="bg-white border rounded-xl p-4 shadow-md hover:shadow-lg transition-shadow"
              >
                {/* Top Row */}
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-semibold text-lg truncate">
                    {review.username}
                  </h3>

                  <span className="text-yellow-600 font-medium text-sm">
                    ⭐ {review.rating}
                  </span>
                </div>

                {/* Review Text */}
                <p className="text-gray-700 text-sm leading-relaxed">
                  {review.comment}
                </p>
                <div className=" text-end mt-2">
                  <button
                    onClick={() => handledeleteReview(review.id)}
                    className="text-white bg-red-600 px-3 py-1 rounded-2xl hover:bg-red-700">Delete</button>
                </div>
              </div>

            ))}
          </div>

        )}
      </div>


    </>
  );
}

const Settings = () => {
  const navigate = useNavigate();
  const Logout = () => {
    //logout logic here
    localStorage.removeItem("role");



    navigate("/login");

  }


  return (
    <>
      <h2 className="text-2xl font-semibold mb-6">Settings</h2>
      <p className="text-neutral-500">Admin settings go here</p>
      <button
        onClick={Logout}
        className="px-6 py-2 bg-red-600 text-white rounded-full hover:bg-red-700 transition mt-4">Logout</button>
    </>
  );
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

export default AdminPanel;