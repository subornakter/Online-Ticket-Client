import { NavLink, Outlet } from "react-router";
import useRole from "../hooks/useRole";
import LoadingSpinner from "../components/LoadingSpinner";

export default function DashboardLayout() {
  const [role, isLoading] = useRole();

  const menuClass = ({ isActive }) =>
    `block px-4 py-2 rounded-md font-medium ${
      isActive ? "bg-blue-500 text-white" : "text-gray-700 hover:bg-gray-200"
    }`;

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="flex min-h-screen">
      
      {/* Sidebar */}
      <aside className="w-64 bg-gray-100 shadow-lg p-5">
        <h2 className="text-xl font-bold mb-6">Dashboard</h2>

        <nav className="flex flex-col gap-3">

          {/* -------------------- USER MENU -------------------- */}
          {role === "customer" && (
            <>
              <NavLink to="/dashboard/profile" className={menuClass}>
                User Profile
              </NavLink>
              <NavLink to="/dashboard/bookings" className={menuClass}>
                My Booked Tickets
              </NavLink>
              <NavLink to="/dashboard/transactions" className={menuClass}>
                Transaction History
              </NavLink>
            </>
          )}

          {/* -------------------- VENDOR MENU -------------------- */}
          {role === "vendor" && (
            <>
              <NavLink to="/dashboard/profile" className={menuClass}>
                Vendor Profile
              </NavLink>
              <NavLink to="/dashboard/add-ticket" className={menuClass}>
                Add Ticket
              </NavLink>
              <NavLink to="/dashboard/my-tickets" className={menuClass}>
                My Added Tickets
              </NavLink>
              <NavLink to="/dashboard/vendor-bookings" className={menuClass}>
                Requested Bookings
              </NavLink>
              <NavLink to="/dashboard/vendor-revenue" className={menuClass}>
                Revenue Overview
              </NavLink>
            </>
          )}

          {/* -------------------- ADMIN MENU -------------------- */}
          {role === "admin" && (
            <>
              <NavLink to="/dashboard/profile" className={menuClass}>
                Admin Profile
              </NavLink>
              <NavLink to="/dashboard/manage-tickets" className={menuClass}>
                Manage Tickets
              </NavLink>
              <NavLink to="/dashboard/manage-users" className={menuClass}>
                Manage Users
              </NavLink>
              <NavLink to="/dashboard/advertise-tickets" className={menuClass}>
                Advertise Tickets
              </NavLink>
            </>
          )}

        </nav>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-6 bg-white">
        <Outlet />
      </main>
    </div>
  );
}
