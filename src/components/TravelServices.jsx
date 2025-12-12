import { motion } from "framer-motion";
import { FaBus, FaShip, FaTrain, FaPlane } from "react-icons/fa";

const services = [
  {
    icon: <FaBus className='text-4xl text-green-600' />,
    title: "Bus Ticket",
    desc: "No more waiting in lines! 100+ operators available online.",
  },
  {
    icon: <FaPlane className='text-4xl text-green-600' />,
    title: "Air Ticket",
    desc: "Book air tickets for domestic travel easily and instantly.",
  },
  {
    icon: <FaTrain className='text-4xl text-green-600' />,
    title: "Train Ticket",
    desc: "Bangladesh Railway tickets now fully online. Get yours now!",
  },
  {
    icon: <FaShip className='text-4xl text-green-600' />,
    title: "Launch Ticket",
    desc: "Find launch/ship tickets & book your journey hassle-free.",
  },
];

export default function TravelServices() {
  return (
    <div className='py-16 bg-[#F4F8F6]'>
      <div className='max-w-6xl mx-auto px-4 text-center'>
        
        {/* Top Heading */}
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className='text-[#FF8C00] tracking-[3px] font-semibold'
        >
          A ONE-STOP SOLUTION FOR YOUR TRAVEL NEEDS
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className='text-4xl font-bold text-green-800 my-4'
        >
          Introducing you to a Smart Travel Experience
        </motion.h2>

        {/* Services Grid */}
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-12'>
          {services.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: index * 0.15 }}
              whileHover={{ scale: 1.04, y: -4 }}
              className='bg-white rounded-2xl shadow-md p-6 cursor-pointer hover:shadow-xl transition'
            >
              <div className='flex justify-center'>{item.icon}</div>
              <h3 className='text-xl font-semibold mt-4 text-green-700'>
                {item.title}
              </h3>
              <p className='text-gray-600 mt-2 text-sm'>{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
