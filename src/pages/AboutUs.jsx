import React from "react";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

// Sample data: 8 team members
const teamMembers = [
  { name: "Rahim Ahmed", role: "CEO", img: "https://randomuser.me/api/portraits/men/1.jpg" },
  { name: "Karim Hossain", role: "CTO", img: "https://randomuser.me/api/portraits/men/2.jpg" },
  { name: "Salma Begum", role: "Marketing Lead", img: "https://randomuser.me/api/portraits/women/3.jpg" },
  { name: "Jamil Khan", role: "Finance Head", img: "https://randomuser.me/api/portraits/men/4.jpg" },
  { name: "Fahmida Rahman", role: "Operations", img: "https://randomuser.me/api/portraits/women/5.jpg" },
  { name: "Tanvir Alam", role: "Developer", img: "https://randomuser.me/api/portraits/men/6.jpg" },
  { name: "Rumana Akter", role: "Designer", img: "https://randomuser.me/api/portraits/women/7.jpg" },
  { name: "Imran Sarker", role: "Support Lead", img: "https://randomuser.me/api/portraits/men/8.jpg" },
];

// Sample customer reviews
const reviews = [
  { name: "Ayesha", feedback: "TicketBari makes booking super easy!" },
  { name: "Rahman", feedback: "Fast confirmation and great service." },
  { name: "Sadia", feedback: "The best platform for travel tickets in Bangladesh." },
  { name: "Fahim", feedback: "Smooth booking experience every time." },
  { name: "Nabila", feedback: "Highly recommended for intercity travel." },
];

export default function AboutUs() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-12 space-y-24">

      {/* ---------- Hero Section ---------- */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center space-y-3"
      >
        <h1 className="text-4xl font-bold text-green-600">About Us</h1>
        <p className="text-gray-700 max-w-2xl mx-auto">
          TicketBari is Bangladesh’s leading ticket booking platform. We simplify travel booking for buses, trains, launches, and flights.
        </p>
      </motion.div>

      {/* ---------- Our Story ---------- */}
      <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="space-y-6">
        <h2 className="text-3xl font-bold text-green-600">Our Story</h2>
        <p className="text-gray-700 text-lg">
          Founded in 2020 in Dhaka, Bangladesh, TicketBari aims to make ticket booking seamless for everyone. From urban commuters to intercity travelers, we ensure hassle-free service across the country.
        </p>
      </motion.div>

      {/* ---------- Team Members Slider ---------- */}
      <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="space-y-6">
        <h2 className="text-3xl font-bold text-green-600">Meet Our Team</h2>
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={20}
          slidesPerView={1}
          navigation
          pagination={{ clickable: true }}
          autoplay={{ delay: 4000 }}
          breakpoints={{
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 4 },
          }}
        >
          {teamMembers.map((member, i) => (
            <SwiperSlide key={i}>
              <motion.div whileHover={{ scale: 1.05 }} className="bg-white p-6 rounded-xl shadow text-center space-y-3">
                <img src={member.img} alt={member.name} className="w-24 h-24 mx-auto rounded-full object-cover"/>
                <h3 className="font-bold text-xl">{member.name}</h3>
                <p className="text-gray-600">{member.role}</p>
              </motion.div>
            </SwiperSlide>
          ))}
        </Swiper>
      </motion.div>

      {/* ---------- Customer Reviews Slider ---------- */}
      <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="space-y-6">
        <h2 className="text-3xl font-bold text-green-600">Customer Reviews</h2>
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={20}
          slidesPerView={1}
          navigation
          pagination={{ clickable: true }}
          autoplay={{ delay: 5000 }}
          breakpoints={{
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
        >
          {reviews.map((rev, i) => (
            <SwiperSlide key={i}>
              <motion.div whileHover={{ scale: 1.03 }} className="bg-green-50 p-6 rounded-xl shadow space-y-3">
                <p className="text-gray-700">"{rev.feedback}"</p>
                <h4 className="font-bold text-gray-800">{rev.name}</h4>
              </motion.div>
            </SwiperSlide>
          ))}
        </Swiper>
      </motion.div>

      {/* ---------- Call to Action ---------- */}
      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center py-12 bg-green-100 rounded-xl shadow-lg space-y-4">
        <h2 className="text-3xl font-bold text-green-600">Ready to Book Your Ticket?</h2>
        <p className="text-gray-700">Join thousands of satisfied travelers across Bangladesh using TicketBari every day.</p>
        <a href="/tickets" className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition inline-block font-medium">Book Now</a>
      </motion.div>
    </div>
  );
}
