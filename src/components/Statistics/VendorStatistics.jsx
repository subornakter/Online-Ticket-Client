import { useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
import LoadingSpinner from "../LoadingSpinner";
import {
  FaBox,
  FaCartArrowDown,
  FaDollarSign,
  FaChartLine,
} from "react-icons/fa";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";

const VendorStatistics = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const [vStats, setVStats] = useState(null);

  useEffect(() => {
    if (user?.email) {
      axiosSecure
        .get(`/vendor/stats/${user.email}`)
        .then((res) => setVStats(res.data))
        .catch((err) => console.error("Vendor stats fetch error:", err));
    }
  }, [axiosSecure, user?.email]);

  if (!vStats) return <LoadingSpinner />;

  const COLORS = ["#10B981", "#F59E0B", "#3B82F6", "#EF4444"];

  // Ensure arrays exist
  const bookingStats = vStats.bookingStats || [];
  const transportStats = vStats.transportStats || [];
  const ticketData = [
    { name: "Approved Tickets", count: vStats.approvedTickets || 0 },
    { name: "Pending Tickets", count: vStats.pendingTickets || 0 },
  ];

  return (
    <div className="min-h-screen p-6 bg-slate-50">
      <div className="mb-10">
        <h2 className="flex items-center gap-2 text-3xl font-bold text-slate-800">
          <FaChartLine className="text-indigo-600" /> Vendor Dashboard
        </h2>
        <p className="text-slate-500">
          Monitor your ticket sales and transport performance
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 gap-6 mb-10 md:grid-cols-2 lg:grid-cols-4">
        <div className="p-6 transition bg-base-100 border shadow-lg rounded-2xl border-slate-100 hover:shadow-xl">
          <div className="flex items-center gap-4">
            <div className="p-3 text-blue-600 bg-blue-100 rounded-lg">
              <FaBox size={24} />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-500">
                Total Tickets
              </p>
              <h3 className="text-2xl font-bold">
                {vStats.totalTicketsAdded || 0}
              </h3>
            </div>
          </div>
        </div>

        <div className="p-6 transition bg-base-100 border shadow-lg rounded-2xl border-slate-100 hover:shadow-xl">
          <div className="flex items-center gap-4">
            <div className="p-3 text-green-600 bg-green-100 rounded-lg">
              <FaCartArrowDown size={24} />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-500">Tickets Sold</p>
              <h3 className="text-2xl font-bold">
                {vStats.totalSoldQuantity || 0}
              </h3>
            </div>
          </div>
        </div>

        <div className="p-6 transition bg-base-100 border shadow-lg rounded-2xl border-slate-100 hover:shadow-xl">
          <div className="flex items-center gap-4">
            <div className="p-3 text-yellow-600 bg-yellow-100 rounded-lg">
              <FaDollarSign size={24} />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-500">
                Total Revenue
              </p>
              <h3 className="text-2xl font-bold">
                ${(vStats.totalRevenue || 0).toFixed(2)}
              </h3>
            </div>
          </div>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        {/* Booking Stats Pie */}
        <div className="p-6 transition bg-base-100 border shadow-lg rounded-2xl border-slate-100 hover:shadow-xl">
          <h4 className="mb-4 text-lg font-bold text-slate-700">
            Booking Conversion
          </h4>
          <div className="h-64">
            {bookingStats.length === 0 ? (
              <p className="text-center text-gray-400">No booking data yet.</p>
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={bookingStats}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                    label={({ name, percent }) =>
                      `${name} (${(percent * 100).toFixed(0)}%)`
                    }
                  >
                    {bookingStats.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => [value, "Bookings"]} />
                  <Legend verticalAlign="bottom" height={36} />
                </PieChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>

        {/* Ticket Status Bar */}
        <div className="p-6 transition bg-base-100 border shadow-lg rounded-2xl border-slate-100 hover:shadow-xl">
          <h4 className="mb-4 text-lg font-bold text-slate-700">
            Ticket Status Analysis
          </h4>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={ticketData}
                margin={{ top: 5, right: 20, left: 0, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis
                  dataKey="name"
                  tick={{ fill: "#334155", fontSize: 14 }}
                />
                <YAxis tick={{ fill: "#334155", fontSize: 14 }} />
                <Tooltip />
                <Bar
                  dataKey="count"
                  fill="#6366f1"
                  radius={[6, 6, 0, 0]}
                  barSize={40}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Transport Type Pie Chart */}
      <div className="p-6 mt-10 transition bg-base-100 border shadow-lg rounded-2xl border-slate-100 hover:shadow-xl">
        <h4 className="mb-4 text-lg font-bold text-slate-700">
          Tickets by Transport Type
        </h4>
        <div className="h-64">
          {transportStats.length === 0 ? (
            <p className="text-center text-gray-400">No transport data yet.</p>
          ) : (
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={transportStats}
                  cx="50%"
                  cy="50%"
                  innerRadius={40}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="count"
                  nameKey="type"
                  label={({ name, percent }) =>
                    `${name} (${(percent * 100).toFixed(0)}%)`
                  }
                >
                  {transportStats.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value, name) => [`${value} tickets`, name]}
                />
                <Legend verticalAlign="bottom" height={36} />
              </PieChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>
    </div>
  );
};

export default VendorStatistics;
