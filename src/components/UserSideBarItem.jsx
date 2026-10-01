import React from "react";
import { ChevronRight } from "lucide-react";

const SidebarItem = ({ active, icon, label, onClick }) => {
  return (
    <button onClick={onClick} className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all duration-200 ${active ? "bg-[#E9E5C9] text-[#31583F]" : "text-[#566158] hover:bg-[#F8F0DD] hover:text-[#31583F]"}`}>
      {icon}

      <span>{label}</span>

      {active && <ChevronRight size={16} className="ml-auto" />}
    </button>
  );
};

export default SidebarItem;