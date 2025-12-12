import { motion } from "framer-motion";
import { FaTicketAlt, FaRoute, FaSmileBeam } from "react-icons/fa";

export default function TravelOptionsSection() {
  return (
    <div className="max-w-7xl mx-auto py-16 grid grid-cols-1 md:grid-cols-2 gap-10">
      
      {/* LEFT SIDE TEXT */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="flex flex-col justify-center"
      >
        <h1 className="text-4xl md:text-5xl font-bold leading-snug">
          All your <span className="text-green-600">travel options</span> in one place
        </h1>

        <p className="mt-5 text-gray-600 text-lg">
          More than 1,000 trusted travel partners across trains, buses,
          flights, and launch — so that you can focus on the journey.
        </p>

        {/* STATS */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-10">

          {/* 1 */}
          <motion.div
            whileHover={{ scale: 1.1 }}
            className="text-center"
          >
            <FaTicketAlt className="text-green-600 text-4xl mx-auto mb-2" />
            <h2 className="text-2xl font-bold text-green-600">250 Million+</h2>
            <p className="text-gray-500">Tickets Sold</p>
          </motion.div>

          {/* 2 */}
          <motion.div
            whileHover={{ scale: 1.1 }}
            className="text-center"
          >
            <FaRoute className="text-blue-600 text-4xl mx-auto mb-2" />
            <h2 className="text-2xl font-bold text-blue-600">3000+</h2>
            <p className="text-gray-500">Routes</p>
          </motion.div>

          {/* 3 */}
          <motion.div
            whileHover={{ scale: 1.1 }}
            className="text-center"
          >
            <FaSmileBeam className="text-yellow-500 text-4xl mx-auto mb-2" />
            <h2 className="text-2xl font-bold text-yellow-500">10 Million+</h2>
            <p className="text-gray-500">Happy Users</p>
          </motion.div>

        </div>
      </motion.div>

      {/* RIGHT SIDE IMAGE */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true }}
        className="flex justify-center"
      >
        <img
          src="https://i.ibb.co.com/GQ3nBn6L/bb.png"
          alt="travel"
          className="w-full max-w-md drop-shadow-xl"
        />
      </motion.div>
    </div>
  );
}
