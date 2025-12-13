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
} from "react-icons/fa";
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

export default function AdvertisementSection() {
  const axiosSecure = useAxiosSecure();

  const { data: tickets = [], isLoading } = useQuery({
    queryKey: ["advertisedTickets"],
    queryFn: async () => {
      const res = await axiosSecure.get("/advertised-tickets");
      return res.data;
    },
  });

  if (isLoading) return LoadingSpinner;

  return (
    <div className="my-12 max-w-7xl mx-auto px-4">
      <h2 className="text-2xl font-bold mb-8 text-center">
        Advertisement Tickets
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {tickets.map((t) => (
          <motion.div
            key={t._id}
            whileHover={{ y: -6, scale: 1.02 }}
            transition={{ duration: 0.3 }}
            className="relative bg-white rounded-xl shadow-md hover:shadow-xl overflow-hidden border flex flex-col"
          >
            {/* Badge */}
            <div className="absolute top-3 left-3 z-10 flex items-center gap-1 bg-orange-200 text-green-700 px-3 py-1 rounded-full text-xs font-semibold shadow">
              <FaStar /> Advertisement
            </div>

            {/* Image */}
            <img
              src={t.image}
              alt={t.title}
              className="w-full h-48 object-cover"
            />

            {/* Content */}
            <div className="p-4 space-y-3 flex-1 flex flex-col">
              {/* Title */}
              <h3 className="font-bold text-lg text-gray-800">
                {t.title}
              </h3>

              {/* Transport */}
              <div className="flex items-center gap-2 text-sm">Type:
                {transportIcon(t.transport_type)}
                <span className="font-medium capitalize text-gray-700">
                  {t.transport_type}
                </span>
              </div>

              {/* Price */}
              <div className="flex items-center gap-2 text-sm">
                <FaMoneyBillWave className="text-green-600" />
                <span className="text-gray-600">Price:</span>
                <span className="font-semibold text-green-700">
                  {t.price} BDT
                </span>
              </div>

              {/* Quantity */}
              <div className="flex items-center gap-2 text-sm">
                <FaChair className="text-indigo-600" />
                <span className="text-gray-600">Available:</span>
                <span className="font-semibold">
                  {t.ticket_quantity}
                </span>
              </div>

              {/* Perks */}
              <div className="flex items-start gap-2 text-sm">
  <span className="font-medium text-gray-600 whitespace-nowrap">
    Perks:
  </span>
  <div className="flex flex-wrap gap-2 text-xs">
    {t.perks?.map((perk, i) => (
      <span
        key={i}
        className="bg-green-100 text-green-700 px-3 py-1 rounded-full"
      >
        {perk}
      </span>
    ))}
  </div>
</div>


              {/* Button */}
              <Link
                to={`/ticket/${t._id}`}
                className="mt-auto block w-full text-center bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition font-medium"
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

