import React from "react";
import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";

const StatCard = ({ icon, label, value, description, iconClass }) => {
  return (
    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }} className="relative flex min-h-[120px] items-center gap-4 overflow-hidden rounded-2xl border border-[#E9D9AE] bg-[#FFFDF8] px-5 py-4 shadow-[0_3px_12px_rgba(94,75,35,0.06)]">
      <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-[#FFF5CC] opacity-70"></div>

      <div className={`relative z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-xl ${iconClass}`}>
        {icon}
      </div>

      <div className="relative z-10 min-w-0">
        <p className="text-sm text-[#718078]">{label}</p>
        <p className="mt-1 text-2xl font-semibold text-[#24352A]">{value}</p>
        <p className="mt-1 text-xs text-[#879088]">{description}</p>
      </div>

      <ChevronRight size={19} className="relative z-10 ml-auto shrink-0 text-[#6E735F]" />
    </motion.div>
  );
};

export default StatCard;