import React from "react";
import { motion } from "framer-motion";
import { Typewriter } from "react-simple-typewriter";

export default function Banner() {
  return (
    <section className="px-6 py-16 mx-auto shadow-lg max-w-7xl rounded-xl">
      <div className="flex flex-col items-center gap-10 md:flex-row">
        
        {/* Left Text */}
        <motion.div
          className="space-y-6 md:w-1/2"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-xl font-bold text-green-600 md:text-3xl">
            <Typewriter
              words={[
                "Book Your Tickets Easily",
                "Bus, Train, Launch & Launch",
                "Fast & Secure Booking",
              ]}
              loop={true}
              cursor
              cursorStyle="|"
              typeSpeed={70}
              deleteSpeed={50}
              delaySpeed={1500}
            />
          </h1>

          <p className="text-lg text-gray-700">
            Experience hassle-free booking for buses, trains, launches, and flights across Bangladesh.
            Fast confirmation, secure payments, and all-in-one ticketing platform.
          </p>

          <div className="flex gap-4 mt-4">
            <a
              href="/all-tickets"
              className="px-6 py-3 font-medium text-white transition bg-green-600 rounded-lg hover:bg-green-700"
            >
              Book Now
            </a>
            <a
              href="/contact"
              className="px-6 py-3 font-medium text-green-600 transition border border-green-600 rounded-lg hover:bg-green-100"
            >
              Contact Us
            </a>
          </div>
        </motion.div>

        {/* Right GIF */}
        <img
          src="https://i.ibb.co.com/MktCxJ9t/ezgif-25f2aa05c35e816c.gif"
          alt="Travel Animation"
          className="md:w-1/2"
        />
      </div>
    </section>
  );
}


