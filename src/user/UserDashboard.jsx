import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { userOrders, totalUserOrder } from "../services/OrderService.js";
import { getUserDetails } from "../services/api.js";

import UserDashboardLayout from "../user/UserDashboardLayout";

import Dashboard from "../user/Dashboard";
import Orders from "../user/Orders";
import ProfileDetails from "../user/ProfileDetails";
import Wishlist from "../user/Wishlist";
import Address from "../user/Address";

const UserDashboard = () => {
  const [activePage, setActivePage] = useState("Dashboard");
  const [userData, setUserData] = useState({});
  const [orders, setOrders] = useState([]);
  const [orderCount, setOrderCount] = useState(0);
  const [spentCount, setSpentCount] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navigate = useNavigate();

  const userId = localStorage.getItem("userId");
  const username = localStorage.getItem("username");

  useEffect(() => {
    if (userId) {
      fetchUserData();
      fetchOrders();
      fetchOrderCount();
    }
  }, [userId]);

  const fetchUserData = async () => {
    try {
      const data = await getUserDetails(userId);
      setUserData(data);
    } catch (err) {
      console.error("User details:", err);
    }
  };

  const fetchOrders = async () => {
    try {
      const data = await userOrders(userId);

      setOrders(data || []);

      if (data && data.length > 0) {
        const total = data.reduce(
          (sum, order) => sum + Number(order.totalAmount || 0),
          0
        );

        setSpentCount(total);
      } else {
        setSpentCount(0);
      }
    } catch (err) {
      console.error("Orders:", err);
    }
  };

  const fetchOrderCount = async () => {
    try {
      const data = await totalUserOrder(userId);
      setOrderCount(data || 0);
    } catch (err) {
      console.error("Order count:", err);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("role");
    localStorage.removeItem("userId");
    localStorage.removeItem("token");
    localStorage.removeItem("username");

    setMobileMenuOpen(false);

    navigate("/login");

    window.dispatchEvent(new Event("cartCleared"));
  };

  const handleNavigation = (page) => {
    if (page === "Contact Us") {
      navigate("/contact");
      return;
    }

    if (page === "Back to website") {
      navigate("/");
      return;
    }

    setActivePage(page);
  };

  return (
    <UserDashboardLayout
      activePage={activePage}
      username={username}
      userData={userData}
      mobileMenuOpen={mobileMenuOpen}
      setMobileMenuOpen={setMobileMenuOpen}
      handleNavigation={handleNavigation}
      handleLogout={handleLogout}
    >

      {activePage === "Dashboard" && (
        <Dashboard
          userData={userData}
          username={username}
          orders={orders}
          orderCount={orderCount}
          spentCount={spentCount}
          navigate={navigate}
        />
      )}

      {activePage === "Orders" && (
        <Orders orders={orders} />
      )}

      {activePage === "Wishlist" && (
        <Wishlist navigate={navigate} />
      )}

      {activePage === "Profile" && (
        <ProfileDetails
          userData={userData}
          username={username}
        />
      )}

      {activePage === "Address" && (
        <Address />
      )}

    </UserDashboardLayout>
  );
};

export default UserDashboard;