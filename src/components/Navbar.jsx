import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router";
import useAuth from "../hooks/useAuth";
import { AiOutlineMenu } from "react-icons/ai";
import { BsSun, BsMoon } from "react-icons/bs";
import avatarImg from "../assets/placeholder.jpg";

const Navbar = () => {
  const { user, logOut } = useAuth();
  const navigate = useNavigate();

  // 🌗 Theme State
  const [theme, setTheme] = useState(
    localStorage.getItem("theme") || "light"
  );

  // 👤 Profile Dropdown State
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  // 🔹 Center (Old Style)
  const centerActiveClass =
    "px-4 py-2 font-semibold border border-green-600 text-green-600 rounded transition";
  const centerNormalClass =
    "px-4 py-2 font-semibold hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded transition";

  return (
    <div className="px-4 shadow-sm navbar bg-base-100">
      {/* ===== Left ===== */}
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <AiOutlineMenu className="text-xl" />
          </div>
          <ul className="z-10 p-2 mt-3 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
            <NavLink to="/" className={({ isActive }) => isActive ? centerActiveClass : centerNormalClass}>Home</NavLink>
            <NavLink to="/all-tickets" className={({ isActive }) => isActive ? centerActiveClass : centerNormalClass}>All Tickets</NavLink>
            <NavLink to="/contact" className={({ isActive }) => isActive ? centerActiveClass : centerNormalClass}>Contact</NavLink>
            <NavLink to="/about" className={({ isActive }) => isActive ? centerActiveClass : centerNormalClass}>About</NavLink>
            <NavLink to="/dashboard" className={({ isActive }) => isActive ? centerActiveClass : centerNormalClass}>Dashboard</NavLink>
          </ul>
        </div>

        {/* Logo */}
        <div className="flex items-center gap-2">
          <img
            className="w-10 h-10 rounded"
            src="https://i.ibb.co.com/fdP2R8HF/logo4.jpg"
            alt="logo"
          />
          <h2 className="text-2xl font-bold">
            <span className="text-green-600">Ticket</span>Bari
          </h2>
        </div>
      </div>

      {/* ===== Center ===== */}
      <div className="hidden navbar-center lg:flex">
        <ul className="gap-1 px-1 menu menu-horizontal">
          <NavLink to="/" className={({ isActive }) => isActive ? centerActiveClass : centerNormalClass}>Home</NavLink>
          <NavLink to="/all-tickets" className={({ isActive }) => isActive ? centerActiveClass : centerNormalClass}>All Tickets</NavLink>
          <NavLink to="/contact" className={({ isActive }) => isActive ? centerActiveClass : centerNormalClass}>Contact</NavLink>
          <NavLink to="/about" className={({ isActive }) => isActive ? centerActiveClass : centerNormalClass}>About</NavLink>
          <NavLink to="/dashboard" className={({ isActive }) => isActive ? centerActiveClass : centerNormalClass}>Dashboard</NavLink>
        </ul>
      </div>

      {/* ===== Right ===== */}
      <div className="gap-3 navbar-end">

        <button
          onClick={toggleTheme}
          className="text-xl btn btn-ghost btn-circle"
        >
          {theme === "light" ? <BsMoon /> : <BsSun />}
        </button>

        {!user ? (
      
          <div className="flex gap-2">
            <NavLink to="/login" className="px-4 py-2 font-semibold text-white rounded bg-gradient-to-r from-green-600 to-emerald-600">
              Login
            </NavLink>
            <NavLink to="/signup" className="px-4 py-2 font-semibold text-white rounded bg-gradient-to-r from-green-600 to-emerald-600">
              Sign Up
            </NavLink>
          </div>
        ) : (
        
          <div className="relative flex items-center gap-3">
            {/* Profile Area */}
            <div className="relative">
              <div
                className="relative group"
                onClick={() => setIsProfileOpen(!isProfileOpen)}
              >
                <img
                  className="border-2 border-green-600 rounded-full cursor-pointer w-9 h-9"
                  src={user.photoURL || avatarImg}
                  alt="profile"
                />

                {/* Hover Name */}
                <div className="absolute right-0 z-20 invisible px-3 py-1 text-xs text-white transition rounded opacity-0 -bottom-8 bg-slate-800 group-hover:visible group-hover:opacity-100 whitespace-nowrap">
                  {user.displayName || user.email}
                </div>
              </div>

              {/* Dropdown */}
              {isProfileOpen && (
                <div className="absolute right-0 z-30 mt-2 border rounded shadow w-36 bg-base-100">
                  <button
                    onClick={() => {
                      setIsProfileOpen(false);
                      navigate("dashboard/profile");
                    }}
                    className="w-full px-4 py-2 text-left hover:bg-neutral-100 dark:hover:bg-neutral-800"
                  >
                    Profile
                  </button>
                </div>
              )}
            </div>

            {/* Logout */}
            <button
              onClick={logOut}
              className="px-4 py-2 font-semibold text-white rounded bg-gradient-to-r from-green-600 to-emerald-600"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;

