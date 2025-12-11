import React, { useEffect, useState } from "react";
import axios from "axios";
import useAuth from "../../../hooks/useAuth";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { motion } from "framer-motion";

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
          const res = await axios.get(`${import.meta.env.VITE_API_URL}/vendor/revenue-overview`, {
            headers: { Authorization: `Bearer ${token}` },
          });
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
      className="p-6 bg-white rounded-xl shadow-lg"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-2xl font-semibold mb-6 text-center">Revenue Overview</h2>
      
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
            label
          >
            {pieData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip formatter={(value) => (typeof value === "number" ? value : value)} />
          <Legend verticalAlign="bottom" height={36} />
        </PieChart>
      </ResponsiveContainer>

      <div className="flex justify-around mt-8 text-center">
        <motion.div whileHover={{ scale: 1.05 }} className="bg-green-50 p-4 rounded-lg w-1/3 mx-2">
          <h3 className="text-lg font-medium">Total Revenue</h3>
          <p className="text-green-600 font-bold text-xl">${data.totalRevenue}</p>
        </motion.div>
        <motion.div whileHover={{ scale: 1.05 }} className="bg-blue-50 p-4 rounded-lg w-1/3 mx-2">
          <h3 className="text-lg font-medium">Tickets Sold</h3>
          <p className="text-blue-600 font-bold text-xl">{data.totalTicketsSold}</p>
        </motion.div>
        <motion.div whileHover={{ scale: 1.05 }} className="bg-pink-50 p-4 rounded-lg w-1/3 mx-2">
          <h3 className="text-lg font-medium">Tickets Added</h3>
          <p className="text-pink-600 font-bold text-xl">{data.totalTicketsAdded}</p>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default RevenueOverview;
