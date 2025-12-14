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
    <div className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-4xl font-bold mb-6"
        >
          Why <span className="text-green-600">Choose Us?</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          viewport={{ once: true }}
          className="text-gray-600 max-w-2xl mx-auto mb-16"
        >
          We provide a seamless, safe and fast booking experience to make your
          journey stress-free.
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {features.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05 }}
              className="bg-base-100 shadow-lg rounded-2xl p-6 hover:shadow-2xl transition cursor-pointer"
            >
              <div className="flex justify-center mb-4">{item.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
              <p className="text-gray-600 text-sm">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
