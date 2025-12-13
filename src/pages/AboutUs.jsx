import React from "react";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import RatingSection from "../components/RatingSection";

import { FaFacebookF, FaTwitter, FaInstagram } from "react-icons/fa";

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

const blogs = [
  {
    id: 1,
    title: "Top 5 Tips for Hassle-Free Bus Travel",
    img: "https://i.ibb.co.com/67PckKQ7/sa.webp",
    link: "/blog/1",
  },
  {
    id: 2,
    title: "Booking Flights Online: What You Need to Know",
    img: "https://i.ibb.co.com/TMpqVYnV/images-3.jpg",
    link: "/blog/2",
  },
  {
    id: 3,
    title: "Train Travel in Bangladesh: A Complete Guide",
    img: "https://i.ibb.co.com/gMCVfC6b/images-2.jpg",
    link: "/blog/3",
  },
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
  <p className="text-gray-700 text-lg leading-relaxed">
    Founded in 2020 in Dhaka, Bangladesh, TicketBari was born out of the need to simplify travel booking across the country. Our mission is to make ticket booking for buses, trains, launches, and flights seamless, convenient, and trustworthy for everyone. From daily commuters navigating the city to long-distance travelers exploring new destinations, we provide a platform that ensures smooth planning, secure payments, and instant confirmation. 
    <br /><br />
    Over the years, TicketBari has grown into Bangladesh’s most trusted online ticket platform, connecting thousands of travelers with reliable transport operators nationwide. Our team is committed to constantly improving the user experience, offering real-time updates, and providing excellent customer support to make every journey stress-free. We believe that travel should be easy, safe, and enjoyable, and TicketBari is here to make that a reality for everyone.
  </p>
</motion.div>


      {/* ---------- Team Members Slider ---------- */}
      <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="space-y-6">
        <h2 className="text-3xl font-bold text-green-600 text-center">Meet Our Team</h2>
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
              <motion.div whileHover={{ scale: 1.05 }} className="bg-white p-6 rounded-xl shadow text-center space-y-4">
                <img src={member.img} alt={member.name} className="w-24 h-24 mx-auto rounded-full object-cover border-2 border-green-200"/>
                <h3 className="font-bold text-xl">{member.name}</h3>
                <p className="text-gray-600">{member.role}</p>

                {/* Social Icons */}
                <div className="flex justify-center gap-4 mt-2 text-gray-500">
                  <a href="#" className="text-blue-600 transition"><FaFacebookF /></a>
                  <a href="#" className="text-blue-400 transition"><FaTwitter /></a>
                  <a href="#" className="text-pink-500 transition"><FaInstagram /></a>
                </div>
              </motion.div>
            </SwiperSlide>
          ))}
        </Swiper>
      </motion.div>

      {/* ---------- Customer Reviews Slider ---------- */}
      <RatingSection />

      {/* ---------- Blog Section ---------- */}
      <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="space-y-6">
        <h2 className="text-3xl font-bold text-green-600 text-center">Latest Blogs</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs.map((blog) => (
            <motion.div key={blog.id} whileHover={{ y: -5, scale: 1.02 }} className="bg-white rounded-xl shadow-lg overflow-hidden cursor-pointer transition">
              <img src={blog.img} alt={blog.title} className="w-full h-48 object-cover"/>
              <div className="p-4">
                <h3 className="font-bold text-lg text-gray-800">{blog.title}</h3>
                <a href={blog.link} className="text-green-600 font-medium mt-2 inline-block hover:underline">Read More →</a>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* ---------- Call to Action ---------- */}
      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center py-12 bg-green-100 rounded-xl shadow-lg space-y-4">
        <h2 className="text-3xl font-bold text-green-600">Ready to Book Your Ticket?</h2>
        <p className="text-gray-700">Join thousands of satisfied travelers across Bangladesh using TicketBari every day.</p>
        <a href="/all-tickets" className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition inline-block font-medium">Book Now</a>
      </motion.div>
    </div>
  );
}
