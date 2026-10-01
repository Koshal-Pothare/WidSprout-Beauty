import React from "react";

const AccountRow = ({ icon, label, value, status }) => {
  return (
    <div className="flex items-center gap-4 py-4">
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#F7EEDC] text-[#31583F]">
        {icon}
      </div>

      <div className="min-w-0">
        <p className="text-xs uppercase tracking-wide text-[#89918B]">
          {label}
        </p>

        {status ? (
          <p className="mt-1 flex items-center gap-2 text-sm font-medium text-[#327044]">
            <span className="h-2 w-2 rounded-full bg-[#3F8B50]"></span>
            {value}
          </p>
        ) : (
          <p className="mt-1 truncate text-sm font-medium text-[#24352A]">
            {value}
          </p>
        )}
      </div>
    </div>
  );
};

export default AccountRow;