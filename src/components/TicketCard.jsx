import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router";
import {
  FaBusAlt,
  FaTrain,
  FaPlaneDeparture,
  FaShip,
  FaMapMarkerAlt,
  FaMoneyBillWave,
  FaClock,
  FaChair,
} from "react-icons/fa";

const getTransportIcon = (type) => {
  switch (type) {
    case "bus":
      return <FaBusAlt />;
    case "train":
      return <FaTrain />;
    case "plane":
      return <FaPlaneDeparture className="text-blue-600" />;
    case "launch":
      return <FaShip />;
    default:
      return null;
  }
};

const TicketCard = ({ ticket }) => {
  const {
    image,
    title,
    from,
    to,
    transport_type,
    price,
    ticket_quantity,
    perks,
    departure_date_time,
    _id,
  } = ticket;

  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="flex flex-col h-full overflow-hidden transition shadow-md bg-base-100 rounded-xl hover:shadow-xl"
    >
      {/* Image */}
      <div className="relative">
        <img src={image} alt={title} className="object-cover w-full h-48" />

        {/* Transport Badge */}
        <div className="absolute flex items-center gap-2 px-3 py-1 text-sm font-medium bg-orange-100 rounded-full shadow top-3 right-3">
          <span className="text-green-600">{getTransportIcon(transport_type)}</span>
          <span className="capitalize">{transport_type}</span>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-4 space-y-3">
        {/* Title */}
        <h2 className="text-lg font-bold text-base-content">{title}</h2>

        {/* Route */}
        <div className="flex items-center gap-2 text-sm text-gray-700">
          <FaMapMarkerAlt className="text-red-500" />
          <span className="font-medium">{from}</span> → <span className="font-medium">{to}</span>
        </div>

        <hr className="my-4 border-t-2 border-gray-300" />

        {/* Info */}
        <div className="space-y-1 text-sm text-gray-700">
          {/* Price */}
          <p className="flex items-center gap-2">
            <FaMoneyBillWave className="text-green-600" />
            <span className="font-medium text-gray-600">Price:</span>
            <span className="font-semibold text-green-600">{price} BDT</span>
          </p>

          {/* Available Seats */}
          <p className="flex items-center gap-2">
            <FaChair className="text-indigo-600" />
            <span className="font-medium text-gray-600">Available Seats:</span>
            <span className="font-semibold text-yellow-500">{ticket_quantity}</span>
          </p>

          {/* Departure */}
          <p className="flex items-center gap-2">
            <FaClock className="text-orange-500" />
            <span className="font-medium text-gray-600">Departure:</span>
            <span>
              {new Date(departure_date_time).toLocaleString("en-US", {
                dateStyle: "medium",
                timeStyle: "short",
              })}
            </span>
          </p>
        </div>

        {/* Perks */}
        <div className="flex flex-wrap gap-2 pt-1">
          {perks.map((perk, index) => (
            <span
              key={index}
              className="px-3 py-1 text-xs text-green-700 bg-green-100 rounded-full"
            >
              {perk}
            </span>
          ))}
        </div>

        {/* Button pushed to bottom */}
        <div className="mt-auto">
          <Link to={`/ticket/${_id}`}>
            <button className="w-full py-2 mt-3 font-medium text-white transition rounded-lg bg-gradient-to-r from-green-600 to-emerald-600 hover:bg-green-700">
              See Details
            </button>
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default TicketCard;

