import React, { useState } from 'react';
import { NavLink } from 'react-router';
import useAuth from '../hooks/useAuth';
import { AiOutlineMenu } from 'react-icons/ai';
import avatarImg from '../assets/placeholder.jpg';

const Navbar = () => {
  const { user, logOut } = useAuth()
  const [isOpen, setIsOpen] = useState(false)

  const activeClass = "px-4 py-3 font-semibold border border-green-600 text-green-600 rounded transition";
  const normalClass = "px-4 py-3 font-semibold hover:bg-neutral-100 transition rounded";

  return (
    <div className="navbar bg-base-100 shadow-sm">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> 
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> 
            </svg>
          </div>
          <ul
            tabIndex="-1"
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
            <li>
              <NavLink to="/" className={({ isActive }) => isActive ? activeClass : normalClass}>Home</NavLink>
            </li>
            <li>
              <NavLink to="/all-items" className={({ isActive }) => isActive ? activeClass : normalClass}>All Products</NavLink>
            </li>
            <li>
              <NavLink to="/dashboard" className={({ isActive }) => isActive ? activeClass : normalClass}>Dashboard</NavLink>
            </li>
            <li>
              <NavLink to="/add-ticket" className={({ isActive }) => isActive ? activeClass : normalClass}>Add Ticket</NavLink>
            </li>
          </ul>
        </div>
        <div className='flex justify-center items-center '>
          <img className='w-15 h-15' src="https://i.ibb.co.com/fdP2R8HF/logo4.jpg" alt="" />
          <a className="font-bold text-2xl"><span className='text-green-600'>Ticket</span>Bari</a>
        </div>
      </div>

      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <NavLink to="/" className={({ isActive }) => isActive ? activeClass : normalClass}>Home</NavLink>
          <NavLink to="/all-tickets" className={({ isActive }) => isActive ? activeClass : normalClass}>All Tickets</NavLink>
          <NavLink to="/contact" className={({ isActive }) => isActive ? activeClass : normalClass}>ContactUs</NavLink>
          <NavLink to="/about" className={({ isActive }) => isActive ? activeClass : normalClass}>AboutUs</NavLink>
          <NavLink to="/dashboard" className={({ isActive }) => isActive ? activeClass : normalClass}>Dashboard</NavLink>
        </ul>
      </div>

      <div className="navbar-end">
        <div className="relative">
          <div
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 border border-neutral-300 flex items-center gap-2 rounded-full cursor-pointer hover:shadow-md transition"
          >
            <AiOutlineMenu/>
            <img
              className='rounded-full'
              referrerPolicy='no-referrer'
              src={user && user.photoURL ? user.photoURL : avatarImg}
              alt='profile'
              height='30'
              width='30'
            />
          </div>

          {isOpen && (
            <div className="absolute rounded-xl shadow-md w-[150px] bg-white overflow-hidden right-0 mt-3 text-sm">
              <div className="flex flex-col cursor-pointer">
                {/* <NavLink to="/" className={({ isActive }) => isActive ? activeClass : normalClass}>Home</NavLink> */}
                {user ? (
                  <>
                    {/* <NavLink to="/dashboard" className={({ isActive }) => isActive ? activeClass : normalClass}>Dashboard</NavLink> */}
                    <div
                      onClick={logOut}
                      className={normalClass}
                    >
                      Logout
                    </div>
                  </>
                ) : (
                  <>
                    <NavLink to="/login" className={({ isActive }) => isActive ? activeClass : normalClass}>Login</NavLink>
                    <NavLink to="/signup" className={({ isActive }) => isActive ? activeClass : normalClass}>Sign Up</NavLink>
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
