import React, { useState } from "react";
import { NavLink, Outlet } from "react-router";
import useRole from "../hooks/useRole";
// import LoadingSpinner from "../components/LoadingSpinner";
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
  FaHome,
} from "react-icons/fa";
import { MdManageAccounts, MdCampaign } from "react-icons/md";

export default function DashboardLayout() {
  const [role, isLoading] = useRole();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // if (isLoading) return <LoadingSpinner />;

  // ===== Role based dashboard title =====
  const dashboardTitle =
    role === "admin"
      ? "Admin Dashboard"
      : role === "vendor"
      ? "Vendor Dashboard"
      : "Customer Dashboard";

  const menuClass = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-2 rounded-md font-medium transition ${
      isActive ? "bg-green-500 text-white" : "text-gray-700 hover:bg-gray-200"
    }`;

  const SidebarContent = (
    <nav className="flex flex-col gap-2">
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
      <Navbar />

      <div className="flex flex-1">
        {/* ===== Desktop Sidebar ===== */}
        <aside className="hidden w-64 p-5 shadow-lg bg-green-50 md:block">
          <div className="flex items-center gap-2 mb-4">
            <NavLink
              to="/dashboard"
              title="Dashboard Home"
              className="text-green-600 transition hover:text-green-800"
            >
              <FaHome size={22} />
            </NavLink>

            <h2 className="text-xl font-bold text-green-600">
              {dashboardTitle}
            </h2>
          </div>

          <hr className="mb-4 text-gray-400" />
          {SidebarContent}
        </aside>

        {/* ===== Mobile Sidebar ===== */}
        <div className="md:hidden">
          <button
            onClick={() => setSidebarOpen(true)}
            className="p-2 m-2 text-white bg-green-600 rounded-md"
          >
            <FaBars size={24} />
          </button>

          {sidebarOpen && (
            <div className="fixed inset-0 z-50 flex">
              <div
                className="fixed inset-0 bg-black opacity-50"
                onClick={() => setSidebarOpen(false)}
              ></div>

              <div className="relative z-50 w-64 p-5 shadow-lg bg-green-50">
                <button
                  onClick={() => setSidebarOpen(false)}
                  className="absolute top-4 right-4"
                >
                  <FaTimes size={20} />
                </button>

                <div className="flex items-center gap-2 mb-6">
                  <NavLink
                    to="/dashboard"
                    onClick={() => setSidebarOpen(false)}
                    className="text-green-600"
                  >
                    <FaHome size={22} />
                  </NavLink>

                  <h2 className="text-lg font-bold text-green-600">
                    {dashboardTitle}
                  </h2>
                </div>

                {SidebarContent}
              </div>
            </div>
          )}
        </div>

        {/* ===== Main Content ===== */}
        <main className="flex-1 p-6 bg-base-100">
          <Outlet />
        </main>
      </div>

      <Footer />
    </div>
  );
}
