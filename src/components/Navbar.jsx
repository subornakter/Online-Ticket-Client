import React, { useState } from 'react';
import { Link } from 'react-router';
import useAuth from '../hooks/useAuth';
import { AiOutlineMenu } from 'react-icons/ai';
import avatarImg from '../assets/placeholder.jpg';

const Navbar = () => {
      const { user, logOut } = useAuth()
  const [isOpen, setIsOpen] = useState(false)
    return (
        <div className="navbar bg-base-100 shadow-sm">
  <div className="navbar-start">
    <div className="dropdown">
      <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
      </div>
    <ul
  tabIndex="-1"
  className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
  <li><Link to="/">Home</Link></li>
  <li><Link to="/all-items">All Products</Link></li>
  <li><Link to="/dashboard">Dashboard</Link></li>
  <li>
    <Link
      to="/add-ticket"
      className="px-4 py-3 hover:bg-neutral-100 transition font-semibold"
    >
      Add Ticket
    </Link>
  </li>
</ul>
    </div>
    <a className="btn btn-ghost text-xl">TicketBari</a>
  </div>
  <div className="navbar-center hidden lg:flex">
    <ul className="menu menu-horizontal px-1">
      <Link
      to="/"
      className="px-4 py-3 hover:bg-neutral-100 transition font-semibold"
    >
        Home
    </Link>
        <Link
      to="/all-tickets"
      className="px-4 py-3 hover:bg-neutral-100 transition font-semibold"
    >
        All Tickets
    </Link>
      {/* <li><a>Dashboard</a></li> */}
       <Link
      to="/add-ticket"
      className="px-4 py-3 hover:bg-neutral-100 transition font-semibold"
    >
      Add Ticket
    </Link>
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
            <Link
              to="/"
              className="px-4 py-3 hover:bg-neutral-100 transition font-semibold"
            >
              Home
            </Link>
            {user ? (
              <>
                <Link
                  to="/dashboard"
                  className="px-4 py-3 hover:bg-neutral-100 transition font-semibold"
                >
                  Dashboard
                </Link>
                <div
                  onClick={logOut}
                  className="px-4 py-3 hover:bg-neutral-100 transition font-semibold"
                >
                  Logout
                </div>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="px-4 py-3 hover:bg-neutral-100 transition font-semibold"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="px-4 py-3 hover:bg-neutral-100 transition font-semibold"
                >
                  Sign Up
                </Link>
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