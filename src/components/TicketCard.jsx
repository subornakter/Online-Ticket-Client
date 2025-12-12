import React from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router'
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
  } = ticket

  const perksList = perks.join(', ')

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-xl shadow-md overflow-hidden w-full max-w-sm mx-auto hover:shadow-xl transition-shadow cursor-pointer"
    >
      {/* Image */}
      <img src={image} alt={title} className="h-48 w-full object-cover" />

      {/* Ticket Info */}
      <div className="p-4 space-y-2">
        <h2 className="text-lg font-bold">{title}</h2>
        <p className="text-sm text-gray-600">
          {from} → {to}
        </p>
        <p className="text-sm text-gray-600 capitalize">Transport: {transport_type}</p>
        <p className="text-sm text-gray-600">Price: {price} BDT / ticket</p>
        <p className="text-sm text-gray-600">Available: {ticket_quantity}</p>
        <p className="text-sm text-gray-600">Perks: {perksList}</p>
        <p className="text-sm text-gray-600">
          Departure: {new Date(departure_date_time).toLocaleString('bn-BD', { timeZone: 'Asia/Dhaka' })}
        </p>

        {/* <button className="w-full py-2 mt-2 bg-lime-500 text-white rounded-md hover:bg-lime-600 transition">
          See Details
        </button> */}
          <Link to={`/ticket/${ticket._id}`}>
        <button className="w-full py-2 mt-2 bg-green-600 text-white rounded-md hover:bg-lime-600 transition">
          See Details
        </button>
      </Link>
      </div>
    </motion.div>
  )
}

export default TicketCard
