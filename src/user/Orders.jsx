import React from "react";
import { motion } from "framer-motion";
import { Package, ShoppingBag } from "lucide-react";
import EmptyState from "../user/EmptyState";

const Orders = ({ orders }) => {
  return (
    <div className="w-full">

      <div className="mb-5">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#B85C00]">
          Shopping
        </p>

        <h1 className="mt-1 font-serif text-3xl font-semibold text-[#172C20]">
          Order History
        </h1>

        <p className="mt-1 text-sm text-[#718078]">
          View your WildSprout purchases
        </p>
      </div>

      {orders.length > 0 ? (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">

          {orders.map((order, index) => (
            <motion.div key={order.id || index} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: index * 0.04 }} className="overflow-hidden rounded-2xl border border-[#E9D9AE] bg-[#FFFDF8] shadow-sm">

              <div className="relative h-52 overflow-hidden bg-[#F4E9D0]">

                {order.imageUrl ? (
                  <img src={order.imageUrl} alt={order.productName} className="h-full w-full object-cover transition duration-500 hover:scale-105" />
                ) : (
                  <div className="flex h-full items-center justify-center text-[#B85C00]">
                    <Package size={40} />
                  </div>
                )}

                <span className={`absolute right-3 top-3 rounded-full px-3 py-1 text-xs font-medium ${order.status === "PAID" ? "bg-[#E5F0E1] text-[#327044]" : "bg-[#FFF0D5] text-[#B86A12]"}`}>
                  {order.status || "ORDERED"}
                </span>

              </div>

              <div className="p-4">

                <h3 className="truncate font-medium text-[#24352A]">
                  {order.productName}
                </h3>

                <div className="mt-3 flex justify-between text-sm">
                  <span className="text-[#89918B]">Price</span>
                  <span className="font-medium text-[#24352A]">
                    ₹ {order.productPrice}
                  </span>
                </div>

                <div className="mt-2 flex justify-between text-sm">
                  <span className="text-[#89918B]">Quantity</span>
                  <span className="font-medium text-[#24352A]">
                    {order.quantity}
                  </span>
                </div>

                <div className="mt-3 flex justify-between border-t border-[#EEE5D1] pt-3">
                  <span className="text-sm text-[#89918B]">Total</span>
                  <span className="font-semibold text-[#31583F]">
                    ₹ {order.totalAmount}
                  </span>
                </div>

              </div>

            </motion.div>
          ))}

        </div>
      ) : (
        <EmptyState
          icon={<ShoppingBag size={30} />}
          title="No orders yet"
          description="Your WildSprout purchases will appear here."
        />
      )}

    </div>
  );
};

export default Orders;