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
      className="bg-white rounded-xl shadow-md hover:shadow-xl transition overflow-hidden"
    >
      {/* Image */}
      <div className="relative">
        <img src={image} alt={title} className="h-48 w-full object-cover" />

        {/* Transport Badge */}
        <div className="absolute top-3 right-3 flex items-center gap-2 bg-orange-100 px-3 py-1 rounded-full text-sm font-medium shadow">
         <span className="text-green-600"> {getTransportIcon(transport_type)} </span>
          <span className="capitalize">{transport_type}</span>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 space-y-3">
        {/* Title */}
        <h2 className="text-lg font-bold text-gray-800">{title}</h2>

        {/* Route */}
        <div className="flex items-center gap-2 text-sm text-gray-700">
          <FaMapMarkerAlt className="text-red-500" />
          <span className="font-medium">{from}</span>
          <span>→</span>
          <span className="font-medium">{to}</span>
        </div>

        {/* Info */}
        <div className="text-sm text-gray-700 space-y-1">
          {/* Price */}
          <p className="flex items-center gap-2">
            <FaMoneyBillWave className="text-green-600" />
            <span className="font-medium text-gray-600">Price:</span>
            <span className="font-semibold text-green-600">
              {price} BDT
            </span>
          </p>

          {/* Available Seats */}
          <p className="flex items-center gap-2">
            <FaChair className="text-indigo-600" />
            <span className="font-medium text-gray-600">Available Seats:</span>
            <span className="font-semibold">{ticket_quantity}</span>
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
              className="px-3 py-1 text-xs bg-green-100 text-green-700 rounded-full"
            >
              {perk}
            </span>
          ))}
        </div>

        {/* Button */}
        <Link to={`/ticket/${_id}`}>
          <button className="w-full mt-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition font-medium">
            See Details
          </button>
        </Link>
      </div>
    </motion.div>
  );
};

export default TicketCard;
