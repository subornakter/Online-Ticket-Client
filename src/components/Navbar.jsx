import React, { useEffect, useState } from "react";
import { NavLink } from "react-router";
import useAuth from "../hooks/useAuth";
import { AiOutlineMenu } from "react-icons/ai";
import { BsSun, BsMoon } from "react-icons/bs";
import avatarImg from "../assets/placeholder.jpg";

const Navbar = () => {
  const { user, logOut } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  // 🌗 Theme State
  const [theme, setTheme] = useState(
    localStorage.getItem("theme") || "light"
  );

  // Apply theme
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  const activeClass =
    "px-4 py-3 font-semibold border border-green-600 text-green-600 rounded transition";
  const normalClass =
    "px-4 py-3 font-semibold hover:bg-neutral-100 dark:hover:bg-neutral-800 transition rounded";

  return (
    <div className="navbar bg-base-100 shadow-sm px-4">
      {/* ===== Left ===== */}
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <AiOutlineMenu className="text-xl" />
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-10 mt-3 w-52 p-2 shadow"
          >
            <li>
              <NavLink to="/" className={({ isActive }) => isActive ? activeClass : normalClass}>
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/all-tickets" className={({ isActive }) => isActive ? activeClass : normalClass}>
                All Tickets
              </NavLink>
            </li>
            <li>
              <NavLink to="/dashboard" className={({ isActive }) => isActive ? activeClass : normalClass}>
                Dashboard
              </NavLink>
            </li>
          </ul>
        </div>

        {/* Logo */}
        <div className="flex items-center gap-2">
          <img
            className="w-10 h-10 rounded"
            src="https://i.ibb.co.com/fdP2R8HF/logo4.jpg"
            alt="logo"
          />
          <h2 className="font-bold text-2xl">
            <span className="text-green-600">Ticket</span>Bari
          </h2>
        </div>
      </div>

      {/* ===== Center ===== */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 gap-1">
          <NavLink to="/" className={({ isActive }) => isActive ? activeClass : normalClass}>
            Home
          </NavLink>
          <NavLink to="/all-tickets" className={({ isActive }) => isActive ? activeClass : normalClass}>
            All Tickets
          </NavLink>
          <NavLink to="/contact" className={({ isActive }) => isActive ? activeClass : normalClass}>
            Contact
          </NavLink>
          <NavLink to="/about" className={({ isActive }) => isActive ? activeClass : normalClass}>
            About
          </NavLink>
          <NavLink to="/dashboard" className={({ isActive }) => isActive ? activeClass : normalClass}>
            Dashboard
          </NavLink>
        </ul>
      </div>

      {/* ===== Right ===== */}
      <div className="navbar-end gap-3">
        {/* 🌞🌙 Mood Toggle */}
        <button
          onClick={toggleTheme}
          className="btn btn-ghost btn-circle text-xl"
          title="Toggle Theme"
        >
          {theme === "light" ? <BsMoon /> : <BsSun />}
        </button>

        {/* Profile Dropdown */}
        <div className="relative">
          <div
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 border border-neutral-300 flex items-center gap-2 rounded-full cursor-pointer hover:shadow-md transition"
          >
            <AiOutlineMenu />
            <img
              className="rounded-full"
              referrerPolicy="no-referrer"
              src={user?.photoURL || avatarImg}
              alt="profile"
              height="30"
              width="30"
            />
          </div>

          {isOpen && (
            <div className="absolute right-0 mt-3 w-[150px] bg-base-100 rounded-xl shadow-md overflow-hidden text-sm z-20">
              <div className="flex flex-col">
                {user ? (
                  <button onClick={logOut} className={normalClass}>
                    Logout
                  </button>
                ) : (
                  <>
                    <NavLink to="/login" className={({ isActive }) => isActive ? activeClass : normalClass}>
                      Login
                    </NavLink>
                    <NavLink to="/signup" className={({ isActive }) => isActive ? activeClass : normalClass}>
                      Sign Up
                    </NavLink>
                  </>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
