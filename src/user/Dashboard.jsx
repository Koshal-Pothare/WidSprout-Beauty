import React from "react";
import {
  User,
  ShoppingBag,
  Heart,
  IndianRupee,
  Mail,
  Phone,
  MapPin,
  Leaf,
  ChevronRight,
} from "lucide-react";

import StatCard from "../components/StatCard";
import AccountRow from "../user/AccountRow";
import RecentOrder from "../user/RecentOrder";

const Dashboard = ({
  userData,
  username,
  orders,
  orderCount,
  spentCount,
  navigate,
}) => {
  return (
    <div className="w-full">

      <div className="relative mb-5 overflow-hidden rounded-2xl border border-[#E9D9AE] bg-[#FBF6EA] px-6 py-6 shadow-[0_3px_12px_rgba(94,75,35,0.05)] md:px-8">

        <div className="absolute -right-8 -top-12 h-36 w-36 rounded-full bg-[#F8E9B0] opacity-50"></div>

        <div className="absolute -bottom-20 right-20 h-36 w-36 rounded-full bg-[#F4E8D7] opacity-70"></div>

        <div className="relative z-10 flex items-center gap-4">

          <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full border border-[#E6C96B] bg-[#F8E9B0] text-[#B85C00]">
            <User size={30} strokeWidth={1.7} />
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#B85C00]">
              Welcome Back
            </p>

            <h1 className="mt-1 font-serif text-3xl font-semibold text-[#172C20]">
              {username || userData?.username || "Koshal"}{" "}
              <span className="text-[#7E9671]">🌿</span>
            </h1>

            <p className="mt-1 text-sm text-[#718078]">
              Manage your WildSprout account
            </p>
          </div>
        </div>

        <Leaf size={90} strokeWidth={1} className="absolute -bottom-3 right-8 rotate-[-15deg] text-[#A5B496] opacity-30" />
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">

        <StatCard
          icon={<ShoppingBag size={27} strokeWidth={1.7} />}
          label="Total Orders"
          value={orderCount}
          description="All orders"
          iconClass="bg-[#E6EBD8] text-[#31583F]"
        />

        <StatCard
          icon={<IndianRupee size={27} strokeWidth={1.7} />}
          label="Total Spent"
          value={`₹ ${spentCount}`}
          description="Order spending"
          iconClass="bg-[#F7E8CC] text-[#B85C00]"
        />

        <StatCard
          icon={<Heart size={27} strokeWidth={1.7} />}
          label="Wishlist"
          value="0"
          description="Saved products"
          iconClass="bg-[#F8E3E1] text-[#A44B4B]"
        />

        <StatCard
          icon={<User size={27} strokeWidth={1.7} />}
          label="Account"
          value="Active"
          description="Your account"
          iconClass="bg-[#E5EBD8] text-[#31583F]"
        />

      </div>

      <div className="mt-5 grid grid-cols-1 gap-5 xl:grid-cols-[1.35fr_1fr]">

        <section className="overflow-hidden rounded-2xl border border-[#E9D9AE] bg-[#FFFDF8] shadow-[0_3px_12px_rgba(94,75,35,0.05)]">

          <div className="flex items-center justify-between border-b border-[#EEE5D1] px-5 py-4">

            <h2 className="font-serif text-2xl font-semibold text-[#172C20]">
              Recent Orders
            </h2>

            <button onClick={() => navigate("Orders")} className="flex items-center gap-1 text-sm font-medium text-[#31583F] transition hover:text-[#B85C00]">
              View all <ChevronRight size={16} />
            </button>

          </div>

          <div className="space-y-3 p-4">

            {orders.length > 0 ? (
              orders.slice(0, 3).map((order, index) => (
                <RecentOrder key={order.id || index} order={order} />
              ))
            ) : (
              <div className="flex min-h-[250px] flex-col items-center justify-center text-center">

                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#E6EBD8] text-[#31583F]">
                  <ShoppingBag size={27} />
                </div>

                <h3 className="mt-3 text-base font-semibold text-[#24352A]">
                  No orders yet
                </h3>

                <p className="mt-1 text-sm text-[#879088]">
                  Your recent purchases will appear here.
                </p>

                <button onClick={() => navigate("/all_products")} className="mt-4 rounded-lg bg-[#31583F] px-5 py-2.5 text-sm font-medium text-white transition hover:bg-[#254630]">
                  Shop Now
                </button>

              </div>
            )}

          </div>
        </section>

        <section className="relative overflow-hidden rounded-2xl border border-[#E9D9AE] bg-[#FFFDF8] shadow-[0_3px_12px_rgba(94,75,35,0.05)]">

          <div className="flex items-center justify-between border-b border-[#EEE5D1] px-5 py-4">

            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#B85C00]">
                Account
              </p>

              <h2 className="mt-1 font-serif text-2xl font-semibold text-[#172C20]">
                Account Details
              </h2>
            </div>

            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#F8E9B0] text-[#B85C00]">
              <User size={20} />
            </div>

          </div>

          <div className="divide-y divide-[#EEE5D1] px-5">

            <AccountRow
              icon={<User size={20} />}
              label="Name"
              value={userData?.username || username || "Not available"}
            />

            <AccountRow
              icon={<Mail size={20} />}
              label="Email"
              value={userData?.email || "Not available"}
            />

            {userData?.phone && (
              <AccountRow
                icon={<Phone size={20} />}
                label="Phone"
                value={userData.phone}
              />
            )}

            {userData?.address && (
              <AccountRow
                icon={<MapPin size={20} />}
                label="Address"
                value={userData.address}
              />
            )}

            <AccountRow
              icon={<Leaf size={20} />}
              label="Account Status"
              value="Active"
              status
            />

          </div>

          <Leaf size={85} strokeWidth={1} className="float-right mr-3 mt-[-25px] rotate-[15deg] text-[#A5B496] opacity-25" />

        </section>

      </div>
    </div>
  );
};

export default Dashboard;