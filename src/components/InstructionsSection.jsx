import { motion } from "framer-motion";
import { FiCheckCircle } from "react-icons/fi";

export default function InstructionsSection() {
  const instructions = [
    "Tickets can be purchased from TicketBari up to 10 days before your journey.",
    "Pay securely using bKash, Nagad, Rocket, Upay, or any debit/credit card.",
    "If payment fails, the deducted amount will be refunded automatically within 7–8 business days.",
    "If money was deducted but no ticket arrived, your bank/MFS provider will refund the amount within 7–8 business days.",
    "If you can’t find your ticket email, check Spam/Junk or download it from your TicketBari account history.",
    "Use only the official TicketBari website/app to avoid fake platforms.",
  ];

  return (
    <div className="grid items-center grid-cols-1 gap-12 px-6 py-16 mx-auto max-w-7xl md:grid-cols-2">

      {/* Left Image */}
      <motion.div
        initial={{ opacity: 0, x: -40 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true }}
        className="flex justify-center"
      >
        <img
          src="https://i.ibb.co.com/LzFksKbj/instruction-secion-image.png"
          alt="Ticket instructions"
          className="w-full max-w-md rounded-xl drop-shadow-xl"
        />
      </motion.div>

      {/* Right Side Instructions */}
      <motion.div
        initial={{ opacity: 0, x: 40 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true }}
      >
        <h2 className="mb-6 text-3xl font-bold text-green-600">
          Instructions to Purchase Tickets
        </h2>

        <ul className="space-y-5">
          {instructions.map((item, i) => (
            <motion.li
              key={i}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              viewport={{ once: true }}
              className="flex items-start gap-3"
            >
              <FiCheckCircle className="text-green-600 text-2xl mt-0.5" />
              <p className="leading-relaxed text-gray-700">{item}</p>
            </motion.li>
          ))}
        </ul>
      </motion.div>
    </div>
  );
}
