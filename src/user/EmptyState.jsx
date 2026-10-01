import React from "react";

const EmptyState = ({ icon, title, description, buttonText, onClick }) => {
  return (
    <div className="flex min-h-[380px] items-center justify-center rounded-2xl border border-[#E9D9AE] bg-[#FFFDF8] shadow-sm">
      <div className="text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#E6EBD8] text-[#31583F]">
          {icon}
        </div>

        <h2 className="mt-4 font-serif text-xl font-semibold text-[#24352A]">
          {title}
        </h2>

        <p className="mt-1 text-sm text-[#89918B]">
          {description}
        </p>

        {buttonText && (
          <button onClick={onClick} className="mt-4 rounded-lg bg-[#31583F] px-5 py-2.5 text-sm font-medium text-white transition hover:bg-[#254630]">
            {buttonText}
          </button>
        )}
      </div>
    </div>
  );
};

export default EmptyState;