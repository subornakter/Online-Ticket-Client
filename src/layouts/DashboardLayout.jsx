import { NavLink, Outlet } from "react-router";

const DashboardLayout = () => {
  const menuClass = ({ isActive }) =>
    `block px-4 py-2 rounded-md font-medium ${
      isActive ? "bg-blue-500 text-white" : "text-gray-700 hover:bg-gray-200"
    }`;

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-100 shadow-lg p-5">
        <h2 className="text-xl font-bold mb-6">User Dashboard</h2>

        <nav className="flex flex-col gap-3">
          <NavLink to="/dashboard/profile" className={menuClass}>
            User Profile
          </NavLink>

          <NavLink to="/dashboard/bookings" className={menuClass}>
            My Booked Tickets
          </NavLink>

          <NavLink to="/dashboard/transactions" className={menuClass}>
            Transaction History
          </NavLink>
        </nav>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-6 bg-white">
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;