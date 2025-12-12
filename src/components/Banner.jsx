import React from "react";
import { motion } from "framer-motion";

export default function Banner() {
  return (
    <section className="max-w-7xl mx-auto px-6 py-16 rounded-xl shadow-lg ">
      <div className="flex flex-col md:flex-row items-center gap-10">
        
        {/* Left Text with motion */}
        <motion.div
          className="md:w-1/2 space-y-6"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold text-green-600">
            Book Your Tickets Easily
          </h1>
          <p className="text-gray-700 text-lg">
            Experience hassle-free booking for buses, trains, launches, and flights across Bangladesh. Fast confirmation, secure payments, and all-in-one ticketing platform.
          </p>
          <div className="flex gap-4 mt-4">
            <a
              href="/tickets"
              className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition font-medium"
            >
              Book Now
            </a>
            <a
              href="/contact"
              className="px-6 py-3 border border-green-600 text-green-600 rounded-lg hover:bg-green-100 transition font-medium"
            >
              Contact Us
            </a>
          </div>
        </motion.div>

        {/* Right GIF without motion */}
        <img
          src="https://i.ibb.co/FqnbFJVq/b12.gif"
          alt="Travel Animation"
          className="md:w-1.5/2 max-w-md "
        />
      </div>
    </section>
  );
}


