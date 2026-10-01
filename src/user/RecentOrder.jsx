import React from "react";
import { motion } from "framer-motion";
import { ChevronRight, Package } from "lucide-react";

const RecentOrder = ({ order }) => {
  const status = order?.status || "PAID";
  const isPaid = status === "PAID";

  return (
    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-4 rounded-xl border border-[#EEE5D1] bg-[#FFFDF9] p-3 transition hover:border-[#DCCB9E] hover:shadow-sm">
      <div className="h-[82px] w-[82px] shrink-0 overflow-hidden rounded-xl bg-[#F4E9D0]">
        {order?.imageUrl ? (
          <img src={order.imageUrl} alt={order.productName || "Product"} className="h-full w-full object-cover" />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-[#C58A24]">
            <Package size={28} />
          </div>
        )}
      </div>

      <div className="min-w-0 flex-1">
        <h3 className="truncate text-sm font-medium text-[#24352A]">
          {order?.productName || "WildSprout Product"}
        </h3>

        <p className="mt-1 text-base font-medium text-[#31583F]">
          ₹ {order?.productPrice || order?.totalAmount || 0}
        </p>

        <div className="mt-1 flex flex-wrap items-center gap-2 text-xs text-[#8A918C]">
          <span>{order?.quantity || 1} item</span>
          <span>•</span>
          <span>
            {order?.createdAt
              ? new Date(order.createdAt).toLocaleDateString()
              : "Recent order"}
          </span>
        </div>
      </div>

      <div className="hidden shrink-0 items-center gap-3 sm:flex">
        <span className={`rounded-full px-3 py-1 text-xs font-medium ${isPaid ? "bg-[#E5F0E1] text-[#327044]" : "bg-[#FFF0D5] text-[#B86A12]"}`}>
          {isPaid ? "Delivered" : status}
        </span>

        <ChevronRight size={18} className="text-[#6E735F]" />
      </div>
    </motion.div>
  );
};

export default RecentOrder;