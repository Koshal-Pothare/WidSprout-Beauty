import React from "react";
import { motion } from "framer-motion";
import {
  LayoutDashboard,
  ShoppingBag,
  Heart,
  User,
  MapPin,
  LogOut,
  ArrowLeft,
  Mail,
  Leaf,
} from "lucide-react";
import SidebarItem from "./UserSideBarItem";

const Sidebar = ({
  activePage,
  username,
  userData,
  handleNavigation,
  handleLogout,
}) => {
  return (
    <motion.aside initial={{ x: -15, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ duration: 0.4 }} className="hidden h-full w-[270px] shrink-0 border-r border-[#E9D9AE] bg-[#FBF6EA] lg:block">
      <div className="flex h-full flex-col overflow-hidden p-5">

        <div className="mb-6 border-b border-[#E9D9AE] pb-5">
          <div className="flex items-center gap-2">
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#E8E6D1] text-[#31583F]">
              <Leaf size={25} />
            </div>

            <div>
              <h1 className="font-serif text-2xl font-semibold tracking-tight text-[#31583F]">
                WildSprout
              </h1>

              <p className="text-[9px] uppercase tracking-[0.25em] text-[#B85C00]">
                Natural Skincare
              </p>
            </div>
          </div>

          <p className="mt-5 text-xs font-semibold uppercase tracking-[0.22em] text-[#B85C00]">
            User Dashboard
          </p>

          <p className="mt-1 font-serif text-xl font-semibold text-[#24352A]">
            {username || userData?.username || "Koshal"}
          </p>
        </div>

        <nav className="flex flex-col gap-1">
          <SidebarItem active={activePage === "Dashboard"} icon={<LayoutDashboard size={19} />} label="Dashboard" onClick={() => handleNavigation("Dashboard")} />

          <SidebarItem active={activePage === "Orders"} icon={<ShoppingBag size={19} />} label="Orders" onClick={() => handleNavigation("Orders")} />

          <SidebarItem active={activePage === "Wishlist"} icon={<Heart size={19} />} label="Wishlist" onClick={() => handleNavigation("Wishlist")} />

          <SidebarItem active={activePage === "Profile"} icon={<User size={19} />} label="Profile" onClick={() => handleNavigation("Profile")} />

          <SidebarItem active={activePage === "Address"} icon={<MapPin size={19} />} label="Address" onClick={() => handleNavigation("Address")} />

          <SidebarItem active={false} icon={<Mail size={19} />} label="Contact Us" onClick={() => handleNavigation("Contact Us")} />
        </nav>

        <div className="mt-auto border-t border-[#E9D9AE] pt-5">
          <button onClick={() => handleNavigation("Back to website")} className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm text-[#566158] transition hover:bg-[#F4EBD7] hover:text-[#31583F]">
            <ArrowLeft size={19} />
            Back to website
          </button>

          <button onClick={handleLogout} className="mt-1 flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm text-[#B85C00] transition hover:bg-[#FFF0E7]">
            <LogOut size={19} />
            Logout
          </button>
        </div>

        <div className="mt-5 flex items-end gap-2">
          <Leaf size={45} strokeWidth={1} className="rotate-[-15deg] text-[#879B76] opacity-60" />

          <div>
            <p className="font-serif text-sm italic text-[#7B856E]">
              Good Skin
            </p>

            <p className="font-serif text-sm italic text-[#7B856E]">
              Good Vibes
            </p>
          </div>
        </div>
      </div>
    </motion.aside>
  );
};

export default Sidebar;