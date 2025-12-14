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
      <h2 className="text-2xl font-bold mb-10 text-center text-gray-800">
        Latest Tickets
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {tickets.map((t) => (
          <motion.div
            key={t._id}
            whileHover={{ y: -6, scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            transition={{ duration: 0.3 }}
            className="relative bg-base-100 rounded-2xl shadow-lg hover:shadow-xl overflow-hidden border border-gray-100 flex flex-col transition-all duration-300"
          >
            {/* Transport Badge – Right Side Green */}
            <div className="absolute top-3 right-3 flex items-center gap-1 bg-green-50 text-green-700 px-3 py-1 rounded-full text-xs font-semibold border border-green-300 shadow-sm">
              {transportIcon(t.transport_type)}
              <span className="capitalize">{t.transport_type}</span>
            </div>

            {/* Image */}
            <img
              src={t.image}
              alt={t.title}
              className="w-full h-44 object-cover transition-transform duration-500 hover:scale-105"
            />

            {/* Content */}
            <div className="p-5 flex flex-col flex-grow gap-1">
              {/* Title */}
              <h3 className="font-semibold text-lg text-base-content leading-snug">
                {t.title}
              </h3>

              {/* Price */}
              <div className="flex items-center gap-2 text-sm text-gray-700 mt-2">
                <span className="font-medium">Price:</span>
                <span className="flex items-center gap-1 text-green-600 font-semibold">
                  <FaMoneyBillWave />
                  {t.price} BDT
                </span>
              </div>

              {/* Quantity */}
              <div className="flex items-center gap-2 text-sm text-gray-700">
                <span className="font-medium">Quantity:</span>
                <span className="text-amber-500 font-medium">
                  {t.ticket_quantity} available
                </span>
              </div>

              {/* Perks – one row */}
              {t.perks && t.perks.length > 0 && (
                <div className="flex flex-wrap items-center gap-2 text-xs mt-2">
                  <span className="font-medium text-gray-600">Perks:</span>
                  {t.perks.map((perk, i) => (
                    <span
                      key={i}
                      className="bg-emerald-50 text-emerald-700 px-2.5 py-1 rounded-full border border-emerald-200"
                    >
                      {perk}
                    </span>
                  ))}
                </div>
              )}

              {/* Button */}
              <Link
                to={`/ticket/${t._id}`}
                className="mt-auto block w-full text-center bg-gradient-to-r from-green-600 to-emerald-600 text-white py-2.5 rounded-xl hover:from-green-700 hover:to-emerald-700 transition-all duration-300 font-semibold shadow-md"
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
