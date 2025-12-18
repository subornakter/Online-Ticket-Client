import React from "react";
import useAuth from "../../../hooks/useAuth";
import coverImg from "../../../assets/coverImg.jpg";
import useRole from "../../../hooks/useRole";
import { FaUserEdit, FaKey, FaEnvelope, FaIdCard } from "react-icons/fa";

const Profile = () => {
  const { user } = useAuth();
  const [role, isRoleLoading] = useRole();

  return (
    <div className="flex items-center justify-center min-h-screen p-4 bg-base-100">
      {/* Width set to 90% or 80% but kept the container height compact */}
      <div className="overflow-hidden border border-gray-200 shadow-2xl bg-base-100 rounded-2xl w-full md:w-[90%] lg:w-[85%] xl:w-[75%] transition-all">
        
        {/* Cover Photo - Height reduced to keep it compact */}
        <div className="relative">
          <img
            alt="cover photo"
            src={coverImg}
            className="object-cover w-full h-40 md:h-48" 
          />
          <div className="absolute inset-0 bg-black/20"></div>
        </div>

        {/* Profile Content */}
        <div className="relative flex flex-col items-center justify-center p-6 -mt-16 md:-mt-20">
          
          <div className="flex flex-col items-center w-full gap-6 px-4 md:flex-row md:items-end md:px-10">
            {/* Profile Image */}
            <div className="relative group shrink-0">
              <img
                alt="profile"
                src={user?.photoURL}
                className="object-cover w-32 h-32 transition-transform duration-300 border-4 border-white rounded-full shadow-xl md:w-40 md:h-40 group-hover:scale-105"
              />
            </div>

            {/* Name and Role - Positioned next to image on desktop */}
            <div className="flex-1 mb-2 text-center md:text-left">
              <p className="inline-block p-1 px-4 text-[10px] font-bold tracking-widest text-white uppercase rounded-full shadow-md bg-gradient-to-r from-green-600 to-emerald-600 mb-2">
                {role || "User"}
              </p>
              <h2 className="text-3xl font-bold tracking-tight text-gray-800 md:text-4xl">
                {user?.displayName}
              </h2>
              <p className="flex items-center justify-center gap-2 mt-1 text-sm text-gray-500 md:justify-start">
                <FaIdCard className="text-emerald-500" /> <span className="text-xs font-semibold">UID: {user?.uid}</span>
              </p>
            </div>
          </div>

          {/* User Info Grid - Responsive columns to ensure Email is fully visible */}
          <div className="grid w-full grid-cols-1 gap-4 px-4 mt-8 md:grid-cols-2 md:px-10">
            <div className="flex flex-col p-4 border border-gray-100 shadow-sm bg-gray-50 rounded-xl">
              <span className="mb-1 text-[10px] font-bold text-gray-400 uppercase tracking-wider">Full Name</span>
              <span className="font-bold text-gray-700">{user?.displayName}</span>
            </div>
            
            <div className="flex flex-col p-4 border border-gray-100 shadow-sm bg-gray-50 rounded-xl">
              <span className="mb-1 text-[10px] font-bold text-gray-400 uppercase tracking-wider">Email Address</span>
              <div className="flex items-center gap-2 overflow-hidden">
                <FaEnvelope className="shrink-0 text-emerald-500" />
                {/* break-all added to prevent email clipping */}
                <span className="font-bold text-gray-700 break-all">{user?.email}</span>
              </div>
            </div>
          </div>

          {/* Action Buttons - Compact padding */}
          <div className="flex flex-col justify-end w-full gap-4 px-4 mt-8 mb-4 md:flex-row md:px-10">
            <button className="flex items-center justify-center gap-2 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 px-6 py-2.5 rounded-xl text-white font-bold text-xs uppercase transition-all shadow-lg active:scale-95 cursor-pointer">
              <FaUserEdit /> Update Profile
            </button>
            
            <button className="flex items-center justify-center gap-2 bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 px-6 py-2.5 rounded-xl text-white font-bold text-xs uppercase transition-all shadow-lg active:scale-95 cursor-pointer">
              <FaKey /> Change Password
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;