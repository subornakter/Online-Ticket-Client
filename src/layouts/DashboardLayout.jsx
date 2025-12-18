import React, { useState } from "react";
import { NavLink, Outlet } from "react-router";
import useRole from "../hooks/useRole";
import LoadingSpinner from "../components/LoadingSpinner";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import {
  FaUser,
  FaTicketAlt,
  FaMoneyBillWave,
  FaPlusCircle,
  FaClipboardList,
  FaChartLine,
  FaBars,
  FaTimes,
} from "react-icons/fa";
import { MdManageAccounts, MdCampaign } from "react-icons/md";

export default function DashboardLayout() {
  const [role, isLoading] = useRole();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const menuClass = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-2 rounded-md font-medium transition ${
      isActive ? "bg-green-500 text-white" : "text-gray-700 hover:bg-gray-200"
    }`;

  if (isLoading) return <LoadingSpinner />;

  // Sidebar content to reuse for both desktop & mobile
  const SidebarContent = (
    <nav className="flex flex-col gap-2">
      {/* USER */}
      {role === "customer" && (
        <>
          <NavLink to="/dashboard/profile" className={menuClass}>
            <FaUser /> User Profile
          </NavLink>
          <NavLink to="/dashboard/bookings" className={menuClass}>
            <FaTicketAlt /> My Booked Tickets
          </NavLink>
          <NavLink to="/dashboard/transactions" className={menuClass}>
            <FaMoneyBillWave /> Transaction History
          </NavLink>
        </>
      )}

      {/* VENDOR */}
      {role === "vendor" && (
        <>
          <NavLink to="/dashboard/profile" className={menuClass}>
            <FaUser /> Vendor Profile
          </NavLink>
          <NavLink to="/dashboard/add-ticket" className={menuClass}>
            <FaPlusCircle /> Add Ticket
          </NavLink>
          <NavLink to="/dashboard/my-tickets" className={menuClass}>
            <FaClipboardList /> My Added Tickets
          </NavLink>
          <NavLink to="/dashboard/vendor-bookings" className={menuClass}>
            <FaTicketAlt /> Requested Bookings
          </NavLink>
          <NavLink to="/dashboard/vendor-revenue" className={menuClass}>
            <FaChartLine /> Revenue Overview
          </NavLink>
        </>
      )}

      {/* ADMIN */}
      {role === "admin" && (
        <>
          <NavLink to="/dashboard/profile" className={menuClass}>
            <FaUser /> Admin Profile
          </NavLink>
          <NavLink to="/dashboard/manage-tickets" className={menuClass}>
            <MdManageAccounts /> Manage Tickets
          </NavLink>
          <NavLink to="/dashboard/manage-users" className={menuClass}>
            <FaUser /> Manage Users
          </NavLink>
          <NavLink to="/dashboard/advertise-tickets" className={menuClass}>
            <MdCampaign /> Advertise Tickets
          </NavLink>
        </>
      )}
    </nav>
  );

  return (
    <div className="flex flex-col min-h-screen">
      {/* ===== Navbar ===== */}
      <Navbar />

      {/* ===== Main Content ===== */}
      <div className="flex flex-1">
        {/* ===== Desktop Sidebar ===== */}
        <aside className="hidden w-64 p-5 shadow-lg bg-green-50 md:block">
          <div className="flex items-center gap-2 mb-6">
            <NavLink to="/">
              <img
                className="w-12 h-12"
                src="https://i.ibb.co.com/bR2Kqky6/logo4-removebg-preview.png"
                alt="logo"
              />
            </NavLink>
            <h2 className="text-2xl font-bold">Dashboard</h2>
          </div>
          {SidebarContent}
        </aside>

        {/* ===== Mobile Sidebar (off-canvas) ===== */}
        <div className="md:hidden">
          {/* Hamburger Button */}
          <button
            onClick={() => setSidebarOpen(true)}
            className="p-2 m-2 text-white bg-green-600 rounded-md focus:outline-none"
          >
            <FaBars size={24} />
          </button>

          {/* Sidebar Overlay */}
          {sidebarOpen && (
            <div className="fixed inset-0 z-50 flex">
              {/* Backdrop */}
              <div
                className="fixed inset-0 bg-black opacity-50"
                onClick={() => setSidebarOpen(false)}
              ></div>

              {/* Sidebar Panel */}
              <div className="relative z-50 w-64 p-5 shadow-lg bg-green-50">
                {/* Close Button */}
                <button
                  onClick={() => setSidebarOpen(false)}
                  className="absolute text-gray-700 top-4 right-4"
                >
                  <FaTimes size={20} />
                </button>

                <div className="flex items-center gap-2 mb-6">
                  <NavLink to="/" onClick={() => setSidebarOpen(false)}>
                    <img
                      className="w-12 h-12"
                      src="https://i.ibb.co.com/bR2Kqky6/logo4-removebg-preview.png"
                      alt="logo"
                    />
                  </NavLink>
                  <h2 className="text-2xl font-bold">Dashboard</h2>
                </div>

                {/* Sidebar Links */}
                <div onClick={() => setSidebarOpen(false)}>{SidebarContent}</div>
              </div>
            </div>
          )}
        </div>

        {/* ===== Main Content ===== */}
        <main className="flex-1 p-6 bg-base-100">
          <Outlet />
        </main>
      </div>

      {/* ===== Footer ===== */}
      <Footer />
    </div>
  );
}
