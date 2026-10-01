import React from "react";
import { User, Menu } from "lucide-react";
import Sidebar from  "../components/UserSidebar";
import MobileMenu from "./MobileMenu";

const UserDashboardLayout = ({
  children,
  activePage,
  username,
  userData,
  mobileMenuOpen,
  setMobileMenuOpen,
  handleNavigation,
  handleLogout,
}) => {
  return (
    <div className="h-screen w-full overflow-hidden bg-[#F7F1E5]">

      <div className="flex h-full w-full">

        <Sidebar
          activePage={activePage}
          username={username}
          userData={userData}
          handleNavigation={handleNavigation}
          handleLogout={handleLogout}
        />

        <div className="flex h-full min-w-0 flex-1 flex-col">

          {/* HEADER */}
          <header className="z-20 flex h-[64px] shrink-0 items-center justify-between border-b border-[#E9D9AE] bg-[#FFFDF8] px-5 shadow-sm md:px-7">

            <div className="flex items-center gap-3">

              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#E6EBD8] text-[#31583F]">
                <User size={18} />
              </div>

              <span className="text-sm font-medium text-[#24352A]">
                Hi, {username || "Koshal"} 🌿
              </span>

            </div>

            <button
              onClick={() => setMobileMenuOpen(true)}
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#E9D9AE] bg-[#FBF6EA] text-[#31583F] transition hover:bg-[#E9E5C9] lg:hidden"
              aria-label="Open menu"
            >
              <Menu size={22} />
            </button>

          </header>

          <MobileMenu
            mobileMenuOpen={mobileMenuOpen}
            setMobileMenuOpen={setMobileMenuOpen}
            activePage={activePage}
            handleNavigation={handleNavigation}
            handleLogout={handleLogout}
          />

          {/* SCROLLABLE CONTENT */}
          <main className="min-h-0 flex-1 overflow-y-auto bg-[#F7F1E5]">
            <div className="w-full p-4 md:p-6 lg:p-7">
              {children}
            </div>
          </main>

        </div>
      </div>
    </div>
  );
};

export default UserDashboardLayout;