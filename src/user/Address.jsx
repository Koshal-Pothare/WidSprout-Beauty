import React from "react";
import { MapPin } from "lucide-react";

const Address = () => {
  return (
    <div className="w-full">

      <div className="mb-5">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#B85C00]">
          Delivery
        </p>

        <h1 className="mt-1 font-serif text-3xl font-semibold text-[#172C20]">
          Address
        </h1>

        <p className="mt-1 text-sm text-[#718078]">
          Manage your delivery information
        </p>
      </div>

      <div className="rounded-2xl border border-[#E9D9AE] bg-[#FFFDF8] p-5 shadow-sm">

        <div className="flex items-center gap-4">

          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#F8E9B0] text-[#B85C00]">
            <MapPin size={22} />
          </div>

          <div>
            <h2 className="font-semibold text-[#24352A]">
              Delivery Address
            </h2>

            <p className="text-sm text-[#89918B]">
              Your saved delivery information
            </p>
          </div>

        </div>

        <div className="mt-5 rounded-xl border border-[#EEE5D1] bg-[#FBF7EE] p-5">
          <p className="text-sm text-[#718078]">
            No address information available.
          </p>
        </div>

      </div>
    </div>
  );
};

export default Address;