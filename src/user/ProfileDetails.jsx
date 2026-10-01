import React from "react";
import { User, Mail, Phone, MapPin } from "lucide-react";

const DetailCard = ({ icon, label, value }) => {
  return (
    <div className="flex items-center gap-4 rounded-xl border border-[#E9D9AE] bg-[#FFFDF8] p-5 shadow-sm">

      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#F8E9B0] text-[#B85C00]">
        {icon}
      </div>

      <div className="min-w-0">
        <p className="text-xs uppercase tracking-wide text-[#89918B]">
          {label}
        </p>

        <p className="mt-1 truncate text-sm font-semibold text-[#24352A]">
          {value}
        </p>
      </div>

    </div>
  );
};

const ProfileDetails = ({ userData, username }) => {
  return (
    <div className="w-full">

      <div className="mb-5">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#B85C00]">
          Account
        </p>

        <h1 className="mt-1 font-serif text-3xl font-semibold text-[#172C20]">
          Personal Details
        </h1>

        <p className="mt-1 text-sm text-[#718078]">
          Manage your account information
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">

        <DetailCard
          icon={<User size={21} />}
          label="Username"
          value={userData?.username || username || "Not available"}
        />

        <DetailCard
          icon={<Mail size={21} />}
          label="Email"
          value={userData?.email || "Not available"}
        />

        {userData?.phone && (
          <DetailCard
            icon={<Phone size={21} />}
            label="Phone"
            value={userData.phone}
          />
        )}

        {userData?.address && (
          <DetailCard
            icon={<MapPin size={21} />}
            label="Address"
            value={userData.address}
          />
        )}

      </div>
    </div>
  );
};

export default ProfileDetails;