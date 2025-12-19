import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router";
import useAuth from "../hooks/useAuth";
import { AiOutlineMenu, AiFillHome } from "react-icons/ai";
import { BsSun, BsMoon } from "react-icons/bs";
import {
  FaTicketAlt,
  FaInfoCircle,
  FaUserPlus,
  FaSignInAlt,
} from "react-icons/fa";
import { MdContactMail, MdDashboard } from "react-icons/md";
import avatarImg from "../assets/placeholder.jpg";

const Navbar = () => {
  const { user, logOut } = useAuth();
  const navigate = useNavigate();

  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  const centerActiveClass =
    "flex items-center gap-2 px-4 py-2 font-bold border-b-2 border-green-600 text-green-600 dark:text-emerald-400 transition-all";
  const centerNormalClass =
    "flex items-center gap-2 px-4 py-2 font-semibold text-gray-700 dark:text-gray-200 hover:bg-base-100/20 dark:hover:bg-slate-800 rounded-lg transition-all";

  return (
    /* Fixed: Changed z-max-50 to z-[100] to ensure it stays on top without overlapping bug */
    <div className="sticky top-0 w-full px-4 transition-all duration-500 border-b shadow-lg z-[100] navbar bg-gradient-to-br from-green-200 via-emerald-100 to-teal-200 dark:from-slate-900 dark:via-slate-950 dark:to-black border-white/20 dark:border-slate-800">
      {/* ===== Left: Menu & Logo ===== */}
      <div className="navbar-start">
        <div className="dropdown">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost lg:hidden dark:text-white"
          >
            <AiOutlineMenu className="text-2xl" />
          </div>
          <ul className="z-10 w-64 p-3 mt-3 space-y-2 border shadow-2xl bg-base-100 menu menu-sm dropdown-content dark:bg-slate-900 rounded-2xl dark:border-slate-800">
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? centerActiveClass : centerNormalClass
              }
            >
              <AiFillHome /> Home
            </NavLink>
            <NavLink
              to="/all-tickets"
              className={({ isActive }) =>
                isActive ? centerActiveClass : centerNormalClass
              }
            >
              <FaTicketAlt /> All Tickets
            </NavLink>
            <NavLink
              to="/contact"
              className={({ isActive }) =>
                isActive ? centerActiveClass : centerNormalClass
              }
            >
              <MdContactMail /> Contact
            </NavLink>
            <NavLink
              to="/about"
              className={({ isActive }) =>
                isActive ? centerActiveClass : centerNormalClass
              }
            >
              <FaInfoCircle /> About
            </NavLink>
            {user && (
              <NavLink
                to="/dashboard"
                className={({ isActive }) =>
                  isActive ? centerActiveClass : centerNormalClass
                }
              >
                <MdDashboard /> Dashboard
              </NavLink>
            )}
          </ul>
        </div>

        <NavLink to="/" className="flex items-center gap-2 group">
          <img
            className="w-10 h-10 transition-transform group-hover:rotate-12"
            src="https://i.ibb.co.com/bR2Kqky6/logo4-removebg-preview.png"
            alt="logo"
          />
          <h2 className="text-2xl font-black tracking-tighter dark:text-white">
            <span className="text-green-600 dark:text-emerald-500">Ticket</span>
            Bari
          </h2>
        </NavLink>
      </div>

      {/* ===== Center: Desktop Links ===== */}
      <div className="hidden navbar-center lg:flex">
        <ul className="gap-2 px-1 menu menu-horizontal">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? centerActiveClass : centerNormalClass
            }
          >
            <AiFillHome /> Home
          </NavLink>
          <NavLink
            to="/all-tickets"
            className={({ isActive }) =>
              isActive ? centerActiveClass : centerNormalClass
            }
          >
            <FaTicketAlt /> All Tickets
          </NavLink>
          <NavLink
            to="/contact"
            className={({ isActive }) =>
              isActive ? centerActiveClass : centerNormalClass
            }
          >
            <MdContactMail /> Contact
          </NavLink>
          <NavLink
            to="/about"
            className={({ isActive }) =>
              isActive ? centerActiveClass : centerNormalClass
            }
          >
            <FaInfoCircle /> About
          </NavLink>
          {user && (
            <NavLink
              to="/dashboard"
              className={({ isActive }) =>
                isActive ? centerActiveClass : centerNormalClass
              }
            >
              <MdDashboard /> Dashboard
            </NavLink>
          )}
        </ul>
      </div>

      {/* ===== Right: Theme, Auth & Profile ===== */}
      <div className="gap-2 navbar-end">
        <button
          onClick={toggleTheme}
          className="text-xl transition-all duration-500 btn btn-ghost btn-circle dark:text-yellow-400 text-slate-700 hover:rotate-180"
        >
          {theme === "light" ? <BsMoon /> : <BsSun />}
        </button>

        {!user ? (
          <div className="flex items-center gap-2">
            <NavLink
              to="/login"
              className="flex items-center gap-2 px-4 py-2 text-xs font-black text-white uppercase transition-all shadow-lg rounded-xl bg-gradient-to-r from-green-600 to-emerald-600 shadow-emerald-200 active:scale-95"
            >
              <FaSignInAlt /> Login
            </NavLink>
            <NavLink
              to="/signup"
              className="items-center hidden gap-2 px-4 py-2 text-xs font-black text-green-700 uppercase transition-all border-2 border-green-600 md:flex rounded-xl hover:bg-green-600 hover:text-white active:scale-95 dark:text-emerald-400 dark:border-emerald-500 dark:hover:bg-emerald-500 dark:hover:text-slate-900"
            >
              <FaUserPlus /> Sign Up
            </NavLink>
          </div>
        ) : (
          <div className="flex items-center gap-3 ml-2">
            {/* Profile Dropdown */}
            <div className="relative">
              <img
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="object-cover w-10 h-10 transition-all border-2 rounded-full shadow-md cursor-pointer border-emerald-500 hover:scale-110 active:scale-90"
                src={user.photoURL || avatarImg}
                alt="profile"
              />

              {isProfileOpen && (
                <div className="absolute right-0 z-50 mt-4 overflow-hidden duration-200 border shadow-2xl bg-base-100 w-52 dark:bg-slate-900 rounded-2xl dark:border-slate-800 animate-in fade-in zoom-in">
                  <div className="p-4 border-b bg-emerald-50 dark:bg-emerald-900/20 dark:border-slate-800">
                    <p className="text-[10px] font-black tracking-widest text-emerald-600 uppercase">
                      Profile Details
                    </p>
                    <p className="text-sm font-bold text-gray-700 truncate dark:text-gray-200">
                      {user.displayName || "Traveler"}
                    </p>
                    <p className="text-[10px] text-gray-400 truncate">
                      {user.email}
                    </p>
                  </div>
                  <div className="p-1">
                    <button
                      onClick={() => {
                        setIsProfileOpen(false);
                        navigate("/dashboard/profile");
                      }}
                      className="flex items-center w-full px-4 py-3 text-sm font-bold text-gray-600 transition-colors rounded-lg dark:text-gray-300 hover:bg-emerald-50 dark:hover:bg-emerald-900/20"
                    >
                      My Profile
                    </button>
                    <button
                      onClick={() => {
                        logOut();
                        setIsProfileOpen(false);
                      }}
                      className="flex items-center w-full px-4 py-3 mt-1 text-sm font-bold text-red-500 transition-colors border-t rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 dark:border-slate-800"
                    >
                      Logout
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* User Name */}
            <div className="hidden text-left md:block">
              <p className="text-sm font-bold text-gray-800 dark:text-gray-100">
                {user.displayName?.split(" ")[0] || "User"}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;