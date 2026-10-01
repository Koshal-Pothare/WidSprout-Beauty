import React from "react";
import { Heart } from "lucide-react";
import EmptyState from "../user/EmptyState";

const Wishlist = ({ navigate }) => {
  return (
    <div className="w-full">

      <div className="mb-5">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#B85C00]">
          Saved
        </p>

        <h1 className="mt-1 font-serif text-3xl font-semibold text-[#172C20]">
          Wishlist
        </h1>

        <p className="mt-1 text-sm text-[#718078]">
          Products you love and want to save
        </p>
      </div>

      <EmptyState
        icon={<Heart size={30} />}
        title="Your Wishlist is Empty"
        description="Save your favorite WildSprout products here."
        buttonText="Explore Products"
        onClick={() => navigate("/all_products")}
      />

    </div>
  );
};

export default Wishlist;