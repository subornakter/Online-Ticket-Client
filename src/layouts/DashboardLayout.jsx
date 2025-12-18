import React from "react";
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
} from "react-icons/fa";
import { MdManageAccounts, MdCampaign } from "react-icons/md";

export default function DashboardLayout() {
  const [role, isLoading] = useRole();

  const menuClass = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-2 rounded-md font-medium transition ${
      isActive ? "bg-green-500 text-white" : "text-gray-700 hover:bg-gray-200"
    }`;

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="flex flex-col min-h-screen">
      {/* ===== Navbar ===== */}
      <Navbar />

      {/* ===== Main Content ===== */}
      <div className="flex flex-1">
        {/* Sidebar */}
        <aside className="w-64 p-5 bg-gray-100 shadow-lg">
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
                <NavLink
                  to="/dashboard/advertise-tickets"
                  className={menuClass}
                >
                  <MdCampaign /> Advertise Tickets
                </NavLink>
              </>
            )}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6 bg-base-100">
          <Outlet />
        </main>
      </div>

      {/* ===== Footer ===== */}
      <Footer />
    </div>
  );
}
