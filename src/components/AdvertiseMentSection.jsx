import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { Link } from "react-router";
import { motion } from "framer-motion";
import {
  FaBusAlt,
  FaTrain,
  FaPlaneDeparture,
  FaShip,
  FaMoneyBillWave,
  FaChair,
  FaStar,
  FaLeaf,
} from "react-icons/fa";
import LoadingSpinner from "./LoadingSpinner";

const transportIcon = (type) => {
  switch (type) {
    case "bus":
      return <FaBusAlt className="text-lg text-emerald-600" />;
    case "train":
      return <FaTrain className="text-lg text-teal-600" />;
    case "plane":
      return <FaPlaneDeparture className="text-lg text-sky-600" />;
    case "launch":
      return <FaShip className="text-lg text-cyan-600" />;
    default:
      return null;
  }
};

export default function AdvertisementSection() {
  const axiosSecure = useAxiosSecure();

  const { data: tickets = [], isLoading } = useQuery({
    queryKey: ["advertisedTickets"],
    queryFn: async () => {
      const res = await axiosSecure.get("/advertised-tickets");
      return res.data;
    },
  });

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="px-4 my-12">
      <div className="mx-auto max-w-7xl">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-10 text-3xl font-bold text-center text-base-content"
        >
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-600">
            Advertisement Tickets
          </span>
          <div className="flex justify-center mt-2">
            <FaLeaf className="text-2xl text-green-500" />
          </div>
        </motion.h2>

        <div className="grid grid-cols-1 gap-6 bg-base-100 md:grid-cols-2 lg:grid-cols-3">
          {tickets.map((t, index) => (
            <motion.div
              key={t._id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="relative flex flex-col h-full overflow-hidden transition-all duration-500 border border-green-200 shadow-md group bg-base-100 rounded-xl hover:shadow-xl"
            >
              {/* Badge */}
              <div className="absolute z-10 flex items-center gap-1 px-3 py-1 text-xs font-bold text-white rounded-full shadow top-3 left-3 bg-gradient-to-r from-amber-400 to-orange-500">
                <FaStar className="text-xs animate-pulse" />
                Advertisement
              </div>

              {/* Image */}
              <div className="relative overflow-hidden">
                <img
                  src={t.image}
                  alt={t.title}
                  className="object-cover w-full h-40 transition-transform duration-500 group-hover:scale-110"
                />
              </div>

              {/* Content */}
              <div className="flex flex-col justify-between flex-grow p-4 space-y-3 bg-gradient-to-b from-white to-green-50">
                <div className="space-y-3">
                  <h3 className="text-lg font-bold text-gray-800 line-clamp-2">
                    {t.title}
                  </h3>

                  {/* Transport */}
                  <div className="flex items-center gap-2 text-sm">
                    <span className="text-gray-600">Journey:</span>
                    {transportIcon(t.transport_type)}
                    <span className="font-semibold capitalize text-emerald-700">
                      {t.transport_type}
                    </span>
                  </div>

                  {/* Price */}
                  <div className="flex items-center gap-2 text-sm">
                    <FaMoneyBillWave className="text-green-600" />
                    <span className="text-gray-600">Price:</span>
                    <span className="font-bold text-green-700">
                      {t.price} BDT
                    </span>
                  </div>

                  {/* Seats */}
                  <div className="flex items-center gap-2 text-sm">
                    <FaChair className="text-emerald-600" />
                    <span className="text-gray-600">Seats:</span>
                    <span className="font-bold text-gray-800">
                      {t.ticket_quantity} Available
                    </span>
                  </div>

                  {/* Perks */}
                  {t.perks && t.perks.length > 0 && (
                    <div className="space-y-1">
                      <div className="flex items-center gap-1 text-sm font-medium text-gray-700">
                        <FaLeaf className="text-sm text-green-600" />
                        Perks:
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {t.perks.map((perk, i) => (
                          <span
                            key={i}
                            className="px-3 py-1 text-xs font-medium bg-green-100 border border-green-300 rounded-full text-emerald-800"
                          >
                            {perk}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Button */}
                <Link
                  to={`/ticket/${t._id}`}
                  className="mt-4 block w-full text-center bg-gradient-to-r from-green-600 to-emerald-600 text-white font-semibold py-2.5 rounded-lg hover:from-green-700 hover:to-emerald-700 transition shadow"
                >
                  See Details
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
