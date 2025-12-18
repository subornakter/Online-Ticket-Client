import React, { useEffect, useState } from "react";
import axios from "axios";
import useAuth from "../../../hooks/useAuth";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { motion } from "framer-motion";
import { FaDollarSign, FaTicketAlt, FaPlusCircle } from "react-icons/fa";

const COLORS = ["#4ade80", "#60a5fa", "#f472b6"]; // green, blue, pink

const RevenueOverview = () => {
  const { user } = useAuth();
  const [data, setData] = useState({
    totalRevenue: 0,
    totalTicketsSold: 0,
    totalTicketsAdded: 0,
  });

  useEffect(() => {
    const fetchData = async () => {
      if (user) {
        const token = await user.getIdToken();
        try {
          const res = await axios.get(
            `${import.meta.env.VITE_API_URL}/vendor/revenue-overview`,
            { headers: { Authorization: `Bearer ${token}` } }
          );
          setData(res.data);
        } catch (err) {
          console.error("Failed to fetch revenue overview:", err);
        }
      }
    };
    fetchData();
  }, [user]);

  const pieData = [
    { name: "Tickets Added", value: data.totalTicketsAdded },
    { name: "Tickets Sold", value: data.totalTicketsSold },
    { name: "Revenue ($)", value: data.totalRevenue },
  ];

  return (
    <motion.div
      className="p-6 bg-white shadow-lg dark:bg-gray-800 rounded-xl"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="mb-6 text-2xl font-bold text-center text-gray-800 dark:text-gray-100">
        Revenue Overview
      </h2>

      {/* Chart */}
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={pieData}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={100}
            fill="#8884d8"
            label={({ name, percent }) =>
              `${name}: ${(percent * 100).toFixed(0)}%`
            }
            labelLine={true}
            isAnimationActive={true}
          >
            {pieData.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip
            formatter={(value) =>
              typeof value === "number" ? value.toLocaleString() : value
            }
            contentStyle={{ backgroundColor: "#f9fafb", borderRadius: "8px" }}
          />
          <Legend verticalAlign="bottom" height={36} />
        </PieChart>
      </ResponsiveContainer>

      {/* Metric Cards */}
      <div className="flex flex-col flex-wrap justify-center gap-4 mt-8 md:flex-row">
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="flex items-center gap-3 p-5 text-white shadow-md bg-gradient-to-r from-green-400 to-green-600 rounded-xl min-w-[250px] flex-1"
        >
          <FaDollarSign className="text-3xl" />
          <div>
            <h3 className="text-lg font-semibold">Total Revenue</h3>
            <p className="text-xl font-bold">${data.totalRevenue.toLocaleString()}</p>
          </div>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.05 }}
          className="flex items-center gap-3 p-5 text-white shadow-md bg-gradient-to-r from-blue-400 to-blue-600 rounded-xl min-w-[250px] flex-1"
        >
          <FaTicketAlt className="text-3xl" />
          <div>
            <h3 className="text-lg font-semibold">Tickets Sold</h3>
            <p className="text-xl font-bold">{data.totalTicketsSold}</p>
          </div>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.05 }}
          className="flex items-center gap-3 p-5 text-white shadow-md bg-gradient-to-r from-pink-400 to-pink-600 rounded-xl min-w-[250px] flex-1"
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

