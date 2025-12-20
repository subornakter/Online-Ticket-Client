import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router";
import { motion } from "framer-motion";

import {
  FaBusAlt,
  FaTrain,
  FaPlaneDeparture,
  FaShip,
  FaMoneyBillWave,
} from "react-icons/fa";
import useAxiosSecure from "../hooks/useAxiosSecure";
import LoadingSpinner from "./LoadingSpinner";

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
      const res = await axios.get("/tickets/latest");
      return res.data;
    },
  });

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="px-4 mx-auto my-14 max-w-7xl">
      <h2 className="mb-10 text-3xl font-bold text-center text-green-600">
        Latest Tickets
      </h2>

      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {tickets.map((t) => (
          <motion.div
            key={t._id}
            whileHover={{ y: -6, scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            transition={{ duration: 0.3 }}
            className="relative flex flex-col overflow-hidden transition-all duration-300 border border-gray-100 shadow-lg bg-base-100 rounded-2xl hover:shadow-xl"
          >
            {/* Transport Badge */}
            <div className="absolute flex items-center gap-1 px-3 py-1 text-xs font-semibold text-green-700 border border-green-300 rounded-full shadow-sm top-3 right-3 bg-green-50">
              {transportIcon(t.transport_type)}
              <span className="capitalize">{t.transport_type}</span>
            </div>

            {/* Image */}
            <img
              src={t.image}
              alt={t.title}
              className="object-cover w-full transition-transform duration-500 h-44 hover:scale-105"
            />

            {/* Content */}
            <div className="flex flex-col flex-grow gap-1 p-5">
              <h3 className="text-lg font-semibold leading-snug text-base-content">
                {t.title}
              </h3>

              <div className="flex items-center gap-2 mt-2 text-sm text-gray-700">
                <span className="font-medium">Price:</span>
                <span className="flex items-center gap-1 font-semibold text-green-600">
                  <FaMoneyBillWave />
                  {t.price} BDT
                </span>
              </div>

              <div className="flex items-center gap-2 text-sm text-gray-700">
                <span className="font-medium">Quantity:</span>
                <span className="font-medium text-amber-500">
                  {t.ticket_quantity} available
                </span>
              </div>

              {t.perks && t.perks.length > 0 && (
                <div className="flex flex-wrap items-center gap-2 mt-2 text-xs">
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
