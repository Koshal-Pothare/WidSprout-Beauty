import React from "react";
import { motion, AnimatePresence } from "framer-motion";
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
  X,
} from "lucide-react";
import SidebarItem from "../components/UserSideBarItem";

const MobileMenu = ({
  mobileMenuOpen,
  setMobileMenuOpen,
  activePage,
  handleNavigation,
  handleLogout,
}) => {
  return (
    <AnimatePresence>
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }} onClick={() => setMobileMenuOpen(false)} className="absolute inset-0 bg-black/40" />

          <motion.aside initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }} transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }} className="absolute right-0 top-0 flex h-full w-[82%] max-w-[320px] flex-col border-l border-[#E9D9AE] bg-[#FBF6EA] shadow-2xl">

            <div className="flex items-center justify-between border-b border-[#E9D9AE] px-5 py-5">
              <div>
                <h2 className="font-serif text-2xl font-semibold text-[#31583F]">
                  WildSprout
                </h2>

                <p className="text-[9px] uppercase tracking-[0.25em] text-[#B85C00]">
                  Natural Skincare
                </p>
              </div>

              <button onClick={() => setMobileMenuOpen(false)} className="flex h-10 w-10 items-center justify-center rounded-full border border-[#E9D9AE] bg-[#FFFDF8] text-[#31583F] transition hover:bg-[#E9E5C9]" aria-label="Close menu">
                <X size={21} />
              </button>
            </div>

            <div className="flex flex-1 flex-col overflow-y-auto p-5">

              <p className="mb-4 text-xs font-semibold uppercase tracking-[0.22em] text-[#B85C00]">
                User Dashboard
              </p>

              <nav className="flex flex-col gap-1">

                <SidebarItem active={activePage === "Dashboard"} icon={<LayoutDashboard size={19} />} label="Dashboard" onClick={() => { handleNavigation("Dashboard"); setMobileMenuOpen(false); }} />

                <SidebarItem active={activePage === "Orders"} icon={<ShoppingBag size={19} />} label="Orders" onClick={() => { handleNavigation("Orders"); setMobileMenuOpen(false); }} />

                <SidebarItem active={activePage === "Wishlist"} icon={<Heart size={19} />} label="Wishlist" onClick={() => { handleNavigation("Wishlist"); setMobileMenuOpen(false); }} />

                <SidebarItem active={activePage === "Profile"} icon={<User size={19} />} label="Profile" onClick={() => { handleNavigation("Profile"); setMobileMenuOpen(false); }} />

                <SidebarItem active={activePage === "Address"} icon={<MapPin size={19} />} label="Address" onClick={() => { handleNavigation("Address"); setMobileMenuOpen(false); }} />

                <SidebarItem active={false} icon={<Mail size={19} />} label="Contact Us" onClick={() => { handleNavigation("Contact Us"); setMobileMenuOpen(false); }} />

              </nav>

              <div className="mt-auto border-t border-[#E9D9AE] pt-5">

                <button onClick={() => { handleNavigation("Back to website"); setMobileMenuOpen(false); }} className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm text-[#566158] transition hover:bg-[#F4EBD7] hover:text-[#31583F]">
                  <ArrowLeft size={19} />
                  Back to website
                </button>

                <button onClick={handleLogout} className="mt-1 flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm text-[#B85C00] transition hover:bg-[#FFF0E7]">
                  <LogOut size={19} />
                  Logout
                </button>

              </div>
            </div>

            <div className="border-t border-[#E9D9AE] px-5 py-5">
              <div className="flex items-end gap-2">
                <Leaf size={40} strokeWidth={1} className="rotate-[-15deg] text-[#879B76] opacity-60" />

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
        </div>
      )}
    </AnimatePresence>
  );
};

export default MobileMenu;