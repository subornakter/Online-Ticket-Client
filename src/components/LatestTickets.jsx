import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router";
import { motion } from "framer-motion";
import useAxiosSecure from "../hooks/useAxiosSecure";
import {
  FaBusAlt,
  FaTrain,
  FaPlaneDeparture,
  FaShip,
  FaMoneyBillWave,
  FaChair,
} from "react-icons/fa";

const transportIcon = (type) => {
  switch (type) {
    case "bus":
      return <FaBusAlt className="text-green-600" />;
    case "train":
      return <FaTrain className="text-red-600" />;
    case "plane":
      return <FaPlaneDeparture className="text-blue-600" />;
    case "launch":
      return <FaShip className="text-cyan-600" />;
    default:
      return null;
  }
};

export default function LatestTickets() {
  const axios = useAxiosSecure();

  const { data: tickets = [], isLoading } = useQuery({
    queryKey: ["latestTickets"],
    queryFn: async () => {
      const res = await axios.get("/tickets");
      return res.data;
    },
  });

  if (isLoading) return <p className="text-center py-10">Loading...</p>;

  return (
    <div className="my-14 max-w-7xl mx-auto px-4">
      <h2 className="text-2xl font-bold mb-8 text-center">Latest Tickets</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {tickets.map((t) => (
          <motion.div
            key={t._id}
            whileHover={{ y: -5, scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            transition={{ duration: 0.3 }}
            className="relative bg-white rounded-xl shadow-md hover:shadow-2xl overflow-hidden border flex flex-col"
          >
            {/* Transport Badge */}
            <div className="absolute top-3 left-3 flex items-center gap-1 bg-orange-100 px-3 py-1 rounded-full text-xs font-semibold shadow">
              {transportIcon(t.transport_type)}
              <span className="capitalize">{t.transport_type}</span>
            </div>

            {/* Image */}
            <img
              src={t.image}
              alt={t.title}
              className="w-full h-48 object-cover"
            />

            {/* Content */}
            <div className="p-4 flex flex-col flex-grow">
              {/* Title */}
              <h3 className="font-bold text-lg text-gray-800">{t.title}</h3>

              {/* Price */}
              <div className="flex gap-1 text-sm text-gray-700 mt-2">
                <span className="font-medium">Price:</span>
                <span className="flex items-center gap-1 text-green-600 font-semibold">
                  <FaMoneyBillWave /> {t.price} BDT
                </span>
              </div>

              {/* Quantity */}
              <div className="flex gap-1 text-sm text-gray-700">
                <span className="font-medium">Quantity:</span>
                <span className="font-semibold flex items-center">
                 <span className="text-yellow-400">{t.ticket_quantity} available</span>
                </span>
              </div>

              {/* Perks inline */}
              {t.perks && t.perks.length > 0 && (
                <div className="flex flex-wrap items-center gap-2 text-xs mt-2">
                  <span className="font-medium text-gray-600">Perks:</span>
                  {t.perks.map((perk, i) => (
                    <span
                      key={i}
                      className="bg-green-100 text-green-700 px-2 py-1 rounded-full"
                    >
                      {perk}
                    </span>
                  ))}
                </div>
              )}

              {/* See Details Button */}
              <Link
                to={`/ticket/${t._id}`}
                className="mt-auto block w-full text-center bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition font-medium"
              >
                See Details
              </Link>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

