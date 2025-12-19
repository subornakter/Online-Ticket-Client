import { motion } from "framer-motion";
import {
  FaShieldAlt,
  FaThumbsUp,
  FaClock,
  FaMoneyBillWave,
} from "react-icons/fa";

export default function WhyChooseUs() {
  const features = [
    {
      title: "Secure & Reliable",
      icon: <FaShieldAlt className="text-4xl text-green-500" />,
      desc: "Your payments and personal information are encrypted and fully protected.",
    },
    {
      title: "Best Price Guarantee",
      icon: <FaMoneyBillWave className="text-4xl text-green-500" />,
      desc: "We offer competitive prices and exclusive travel deals for all platforms.",
    },
    {
      title: "Fast & Easy Booking",
      icon: <FaClock className="text-4xl text-green-500" />,
      desc: "Book your ticket in just a few clicks with our smooth user experience.",
    },
    {
      title: "Trusted by Millions",
      icon: <FaThumbsUp className="text-4xl text-green-500" />,
      desc: "Millions of users trust our platform for safe and convenient travel.",
    },
  ];

  return (
    <div className="py-20 bg-base-100">
      <div className="px-4 mx-auto text-center max-w-7xl">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-6 text-4xl font-bold"
        >
          Why <span className="text-green-600">Choose Us?</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          viewport={{ once: true }}
          className="max-w-2xl mx-auto mb-16 text-gray-600"
        >
          We provide a seamless, safe and fast booking experience to make your
          journey stress-free.
        </motion.p>

        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4">
          {features.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05 }}
              className="p-6 transition shadow-lg cursor-pointer bg-base-100 rounded-2xl hover:shadow-2xl"
            >
              <div className="flex justify-center mb-4">{item.icon}</div>
              <h3 className="mb-2 text-xl font-semibold">{item.title}</h3>
              <p className="text-sm text-gray-600">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
