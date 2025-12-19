import { useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { FaTicketAlt, FaMoneyBillWave, FaWallet } from "react-icons/fa";
import LoadingSpinner from "../LoadingSpinner";

const CustomerStatistics = () => {
  const axiosSecure = useAxiosSecure();
  const [stats, setStats] = useState(null);

  useEffect(() => {
    axiosSecure
      .get("/dashboard/customer-stats")
      .then((res) => setStats(res.data))
      .catch((err) => console.log(err));
  }, [axiosSecure]);

  if (!stats) {
    return <LoadingSpinner />;
  }

  return (
    <div className="min-h-screen p-6 bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 md:p-12">
      <div className="mb-16 text-center">
        <h1 className="mb-4 text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-green-600 md:text-6xl">
          Customer Dashboard
        </h1>
        <p className="text-xl text-gray-600">
          Track your bookings, payments, and spending in style
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-3 lg:gap-12">
        <div className="relative p-8 overflow-hidden transition-all duration-500 transform border shadow-lg bg-base-100/80 backdrop-blur-xl rounded-3xl hover:scale-105 hover:shadow-2xl border-white/30">
          <div className="absolute inset-0 bg-gradient-to-br from-yellow-200/30 to-yellow-400/10 rounded-3xl"></div>
          <div className="relative z-10 text-center">
            <FaTicketAlt className="mx-auto mb-4 text-6xl text-yellow-600 drop-shadow-lg" />
            <h3 className="mb-2 text-2xl font-bold text-gray-800">
              Total Bookings
            </h3>
            <p className="mb-2 text-4xl font-extrabold text-yellow-700">
              {stats.totalBookings.toLocaleString()}
            </p>
            <span className="text-gray-500">
              All your reservations at a glance
            </span>
          </div>
        </div>

        {/* Total Payments */}
        <div className="relative p-8 overflow-hidden transition-all duration-500 transform border shadow-lg bg-base-100/80 backdrop-blur-xl rounded-3xl hover:scale-105 hover:shadow-2xl border-white/30">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-200/30 to-blue-400/10 rounded-3xl"></div>
          <div className="relative z-10 text-center">
            <FaMoneyBillWave className="mx-auto mb-4 text-6xl text-blue-600 drop-shadow-lg" />
            <h3 className="mb-2 text-2xl font-bold text-gray-800">
              Total Payments
            </h3>
            <p className="mb-2 text-4xl font-extrabold text-blue-700">
              {stats.totalPayments.toLocaleString()}
            </p>
            <span className="text-gray-500">Completed transactions</span>
          </div>
        </div>

        {/* Total Spent */}
        <div className="relative p-8 overflow-hidden transition-all duration-500 transform border shadow-lg bg-base-100/80 backdrop-blur-xl rounded-3xl hover:scale-105 hover:shadow-2xl border-white/30">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-200/30 to-purple-400/10 rounded-3xl"></div>
          <div className="relative z-10 text-center">
            <FaWallet className="mx-auto mb-4 text-6xl text-purple-600 drop-shadow-lg" />
            <h3 className="mb-2 text-2xl font-bold text-gray-800">
              Total Spent
            </h3>
            <p className="mb-2 text-4xl font-extrabold text-purple-700">
              ${stats.totalSpent.toLocaleString()}
            </p>
            <span className="text-gray-500">Lifetime spending summary</span>
          </div>
        </div>
      </div>

      {/* Optional Footer */}
      <div className="mt-20 text-center">
        <p className="italic text-gray-500">
          🎫 Keep booking and enjoy your adventures!
        </p>
      </div>
    </div>
  );
};

export default CustomerStatistics;
