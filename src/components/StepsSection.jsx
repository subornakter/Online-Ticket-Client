import { motion } from "framer-motion";
import pay from "../assets/pay.svg";
import search from "../assets/search.svg";
import select from "../assets/select.svg";

export default function StepsSection() {
  const steps = [
    {
      title: "Search",
      desc: "Choose your origin, destination, journey dates and search for trains",
      img: search,
    },
    {
      title: "Select",
      desc: "Select your desired trip and choose your seats",
      img: select,
    },
    {
      title: "Pay",
      desc: "Pay for the tickets via Debit / Credit Cards or MFS",
      img: pay,
    },
  ];

  return (
    <div className="max-w-7xl mx-auto py-16 px-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 text-center">
        
        {steps.map((step, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: i * 0.2 }}
            viewport={{ once: true }}
            className="flex flex-col items-center"
          >
            <motion.img
              src={step.img}
              alt={step.title}
              className="w-56 h-56 object-contain"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 200 }}
            />

            <h3 className="text-2xl font-bold mt-4">{step.title}</h3>
            <p className="text-gray-600 max-w-xs mt-2">{step.desc}</p>
          </motion.div>
        ))}

      </div>
    </div>
  );
}
