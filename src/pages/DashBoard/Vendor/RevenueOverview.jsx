import React, { useEffect, useState } from "react";
import axios from "axios";
import useAuth from "../../../hooks/useAuth";
import { Doughnut } from "react-chartjs-2";
import Chart from "chart.js/auto";
import { FaDollarSign, FaTicketAlt, FaPlusCircle } from "react-icons/fa";
import { motion } from "framer-motion";
import LoadingSpinner from "../../../components/LoadingSpinner";

const RevenueOverview = () => {
  const { user } = useAuth();
  const [data, setData] = useState({
    totalRevenue: 0,
    totalTicketsSold: 0,
    totalTicketsAdded: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if (user) {
        const token = await user.getIdToken();
        try {
          const res = await axios.get(
            `https://online-ticket-system-server.vercel.app/vendor/revenue-overview`,
            { headers: { Authorization: `Bearer ${token}` } }
          );

          setData({
            totalRevenue: Number(res.data.totalRevenue),
            totalTicketsSold: Number(res.data.totalTicketsSold),
            totalTicketsAdded: Number(res.data.totalTicketsAdded),
          });
        } catch (err) {
          console.error("Failed to fetch revenue overview:", err);
        } finally {
          setLoading(false);
        }
      }
    };
    fetchData();
  }, [user]);

  if (loading)
    return (
      <div className="flex items-center justify-center h-64">
        <LoadingSpinner />
      </div>
    );

  const chartData = {
    labels: ["Revenue ($)", "Tickets Added", "Tickets Sold"],
    datasets: [
      {
        data: [data.totalRevenue, data.totalTicketsAdded, data.totalTicketsSold],
        backgroundColor: ["#f472b6", "#4ade80", "#60a5fa"],
        borderWidth: 0,
        cutout: "70%",
      },
    ],
  };

  const chartOptions = {
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          usePointStyle: true,
          pointStyle: "circle",
          padding: 20,
          font: { size: 14 },
        },
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            const label = context.label || "";
            const value = context.raw || 0;
            return `${label}: ${value}`;
          },
        },
      },
    },
    animation: {
      animateRotate: true,
      animateScale: true,
    },
    maintainAspectRatio: false,
  };

  return (
    <motion.div
      className="p-6 shadow-lg bg-base-100 rounded-xl"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="mb-6 text-2xl font-bold text-center text-gray-800">
        Revenue Overview
      </h2>

      {/* Chart Container */}
      <div className="w-full h-64 sm:h-72 md:h-96">
        <Doughnut data={chartData} options={chartOptions} />
      </div>

      {/* Metric Cards */}
      <div className="flex flex-col flex-wrap justify-center gap-4 mt-8 md:flex-row">
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="flex items-center gap-3 p-5 text-white shadow-md bg-green-500 rounded-xl min-w-[200px] flex-1"
        >
          <FaDollarSign className="text-3xl" />
          <div>
            <h3 className="text-lg font-semibold">Total Revenue</h3>
            <p className="text-xl font-bold">
              ${data.totalRevenue.toLocaleString()}
            </p>
          </div>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.05 }}
          className="flex items-center gap-3 p-5 text-white shadow-md bg-blue-500 rounded-xl min-w-[200px] flex-1"
        >
          <FaTicketAlt className="text-3xl" />
          <div>
            <h3 className="text-lg font-semibold">Tickets Sold</h3>
            <p className="text-xl font-bold">{data.totalTicketsSold}</p>
          </div>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.05 }}
          className="flex items-center gap-3 p-5 text-white shadow-md bg-pink-500 rounded-xl min-w-[200px] flex-1"
        >
          <FaPlusCircle className="text-3xl" />
          <div>
            <h3 className="text-lg font-semibold">Tickets Added</h3>
            <p className="text-xl font-bold">{data.totalTicketsAdded}</p>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default RevenueOverview;
