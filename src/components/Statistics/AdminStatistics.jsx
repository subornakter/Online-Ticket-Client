import { useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { FaUser, FaTicketAlt, FaMoneyBillWave } from "react-icons/fa";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend, BarChart, Bar, XAxis, YAxis, CartesianGrid } from "recharts";

const AdminStatistics = () => {
  const axiosSecure = useAxiosSecure();
  const [stats, setStats] = useState(null);

  useEffect(() => {
    axiosSecure
      .get("/admin/stats")
      .then((res) => setStats(res.data))
      .catch((err) => console.log(err));
  }, [axiosSecure]);

  if (!stats) return <div className="mt-20 text-2xl font-bold text-center">Loading Stats...</div>;

  // ইউজার রোলের জন্য ডাটা (Pie Chart)
  const roleData = [
    { name: "Customers", value: stats.customerCount || 0 },
    { name: "Vendors", value: stats.vendorCount || 0 },
    { name: "Admins", value: stats.adminCount || 0 },
    { name: "Fraud", value: stats.fraudCount || 0 },
  ];

  // টিকিট স্ট্যাটাসের জন্য ডাটা (Bar Chart)
  const ticketStatusData = [
    { name: "Approved", count: stats.approvedTickets || 0 },
    { name: "Pending", count: stats.pendingTickets || 0 },
    { name: "Rejected", count: stats.rejectedTickets || 0 },
  ];

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

  return (
    <div className="min-h-screen p-6 bg-gray-50 md:p-12">
      <div className="mb-12 text-center">
        <h1 className="text-4xl font-extrabold text-gray-800">Admin Insights</h1>
        <p className="text-gray-500">Comprehensive overview of users and ticket activities</p>
      </div>

      {/* কার্ড সেকশন */}
      <div className="grid grid-cols-1 gap-6 mb-12 md:grid-cols-3">
        <div className="p-6 bg-white border-l-4 border-yellow-500 shadow-md rounded-xl">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500 uppercase">Total Users</p>
              <h2 className="text-3xl font-bold">{stats.totalUsers}</h2>
            </div>
            <FaUser className="text-4xl text-yellow-500 opacity-30" />
          </div>
        </div>

        <div className="p-6 bg-white border-l-4 border-blue-500 shadow-md rounded-xl">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500 uppercase">Active Tickets</p>
              <h2 className="text-3xl font-bold">{stats.approvedTickets}</h2>
            </div>
            <FaTicketAlt className="text-4xl text-blue-500 opacity-30" />
          </div>
        </div>

        <div className="p-6 bg-white border-l-4 border-green-500 shadow-md rounded-xl">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500 uppercase">Total Revenue</p>
              <h2 className="text-3xl font-bold">${stats.totalRevenue}</h2>
            </div>
            <FaMoneyBillWave className="text-4xl text-green-500 opacity-30" />
          </div>
        </div>
      </div>

      {/* গ্রাফ সেকশন */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        
        {/* User Role Distribution Pie Chart */}
        <div className="p-8 bg-white shadow-lg rounded-2xl">
          <h3 className="mb-6 text-lg font-semibold text-gray-700">User Roles Distribution</h3>
          
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={roleData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {roleData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Ticket Status Bar Chart */}
        <div className="p-8 bg-white shadow-lg rounded-2xl">
          <h3 className="mb-6 text-lg font-semibold text-gray-700">Ticket Inventory Status</h3>
          
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={ticketStatusData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" fill="#4F46E5" radius={[5, 5, 0, 0]} barSize={50} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>
    </div>
  );
};

export default AdminStatistics;