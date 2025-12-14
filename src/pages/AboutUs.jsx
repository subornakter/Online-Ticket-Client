import React from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import RatingSection from "../components/RatingSection";

import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaUsers,
  FaRoute,
  FaTicketAlt,
  FaClock,
} from "react-icons/fa";

const teamMembers = [
  {
    name: "Rahim Ahmed",
    role: "CEO",
    img: "https://randomuser.me/api/portraits/men/1.jpg",
  },
  {
    name: "Karim Hossain",
    role: "CTO",
    img: "https://randomuser.me/api/portraits/men/2.jpg",
  },
  {
    name: "Salma Begum",
    role: "Marketing Lead",
    img: "https://randomuser.me/api/portraits/women/3.jpg",
  },
  {
    name: "Jamil Khan",
    role: "Finance Head",
    img: "https://randomuser.me/api/portraits/men/4.jpg",
  },
  {
    name: "Fahmida Rahman",
    role: "Operations",
    img: "https://randomuser.me/api/portraits/women/5.jpg",
  },
  {
    name: "Tanvir Alam",
    role: "Developer",
    img: "https://randomuser.me/api/portraits/men/6.jpg",
  },
  {
    name: "Rumana Akter",
    role: "Designer",
    img: "https://randomuser.me/api/portraits/women/7.jpg",
  },
  {
    name: "Imran Sarker",
    role: "Support Lead",
    img: "https://randomuser.me/api/portraits/men/8.jpg",
  },
];

const blogs = [
  {
    id: 1,
    title: "Top 5 Tips for Hassle-Free Bus Travel in Bangladesh",
    img: "https://www.shutterstock.com/image-photo/dhaka-bangladesh1-may-2025-close-260nw-2652807041.jpg",
    link: "/blog/1",
  },
  {
    id: 2,
    title: "How to Book Flights Online Easily",
    img: "https://worldairlinenews.com/wp-content/uploads/2020/11/biman-dash-8-400-feature-image.jpg",
    link: "/blog/2",
  },
  {
    id: 3,
    title: "Complete Guide to Train Travel in Bangladesh",
    img: "https://images.pexels.com/photos/30973504/pexels-photo-30973504.jpeg",
    link: "/blog/3",
  },
];

const galleryImages = [
  "https://bdscenictours.b-cdn.net/wp-content/uploads/2024/04/1.jpg",
  "https://nomadicsamuel.com/wp-content/uploads/buriganga-sunset-views-dhaka-bangladesh.jpg",
  "https://images.csmonitor.com/csm/2024/02/0311%20SUNDARBANSPIX%20LEDE%20boats.jpg?alias=standard_1200x800",
  "https://www.shutterstock.com/image-photo/modern-white-coach-bus-speeding-600nw-2581078483.jpg",
  "https://english.news.cn/20241224/2b8fa4f8068d46ceb0f6e66c515b14c1/2ca0d0b6af27480e8a141e8d7f9f136f.jpg",
  "https://s3-ap-south-1.amazonaws.com/shohoz-bus/prod/app-illustration-v2.webp?v=1.0.3",
];

const stats = [
  { icon: <FaUsers />, label: "Happy Customers", value: 150000 },
  { icon: <FaRoute />, label: "Routes Covered", value: 800 },
  { icon: <FaTicketAlt />, label: "Tickets Sold", value: 500000 },
  { icon: <FaClock />, label: "24/7 Support", value: 1 },
];

export default function AboutUs() {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, -150]);

  return (
    <div className="max-w-7xl mx-auto px-6 py-2 space-y-24 overflow-hidden">
      {/* ---------- Hero Section ---------- */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center space-y-3"
      >
        <h1 className="text-5xl font-bold text-green-600">About Us</h1>
        <p className="text-gray-700 max-w-2xl mx-auto">
          TicketBari is Bangladesh’s leading ticket booking platform. We
          simplify travel booking for buses, trains, launches, and flights.
        </p>
      </motion.div>

      {/* ---------- Our Story (English) ---------- */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="space-y-10"
      >
        <h2 className="text-4xl md:text-5xl font-bold text-green-600 text-center">
          Our Story
        </h2>
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="text-xl text-gray-700 leading-relaxed space-y-6">
            <p>
              TicketBari was founded in 2020 in Dhaka, Bangladesh. We noticed
              that people in the country have to stand in long queues for hours
              to buy tickets for buses, trains, launches, and flights, often
              facing disappointment from unavailability or fake tickets.
            </p>
            <p>
              To solve these problems, we created TicketBari – an easy, secure,
              and fast online ticket booking platform. Now, from anywhere, users
              can view real-time seats on mobile or computer, make secure
              payments, and get instant confirmations.
            </p>
            <p>
              Today, we partner with hundreds of operators across the country
              and serve thousands of passengers daily. Our goal is to make
              travel simple, safe, and enjoyable for every person in Bangladesh.
            </p>
            <p>
              We believe that travel is not just about going from one place to
              another – it's about creating new experiences and memories.
              TicketBari makes the first step of that journey effortless.
            </p>
          </div>
          <motion.img
            whileHover={{ scale: 1.05 }}
            src="https://s3-ap-south-1.amazonaws.com/shohoz-bus/prod/app-illustration-v2.webp?v=1.0.3"
            alt="Happy Travelers on TicketBari"
            className="rounded-2xl shadow-2xl object-cover h-96 w-full"
          />
        </div>
      </motion.section>

      {/* ---------- Meet Our Team (Fixed Swiper) ---------- */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="space-y-8"
      >
        <h2 className="text-4xl font-bold text-green-600 text-center">
          Meet Our Team
        </h2>
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={20}
          slidesPerView={1}
          navigation={true}
          pagination={{ clickable: true }}
          autoplay={{ delay: 4000, disableOnInteraction: false }}
          breakpoints={{
            640: { slidesPerView: 2, spaceBetween: 20 },
            1024: { slidesPerView: 4, spaceBetween: 30 },
          }}
          className="py-4"
        >
          {teamMembers.map((member, i) => (
            <SwiperSlide key={i}>
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="bg-base-100 p-6 rounded-xl shadow-lg text-center space-y-4"
              >
                <img
                  src={member.img}
                  alt={member.name}
                  className="w-28 h-28 mx-auto rounded-full object-cover border-4 border-green-300"
                />
                <h3 className="font-bold text-xl">{member.name}</h3>
                <p className="text-gray-600">{member.role}</p>
                <div className="flex justify-center gap-4 text-2xl text-gray-500">
                  <FaFacebookF className="hover:text-blue-600 cursor-pointer transition" />
                  <FaTwitter className="hover:text-blue-400 cursor-pointer transition" />
                  <FaInstagram className="hover:text-pink-500 cursor-pointer transition" />
                </div>
              </motion.div>
            </SwiperSlide>
          ))}
        </Swiper>
      </motion.section>

      {/* Mission, Vision */}
      <section className="space-y-12">
        <h2 className="text-4xl font-bold text-green-600 text-center">
          Our Mission, Vision & Values
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              title: "Mission",
              desc: "To make travel planning effortless and reliable for every Bangladeshi.",
              icon: "🎯",
            },
            {
              title: "Vision",
              desc: "To become the most trusted digital travel companion across South Asia.",
              icon: "🌟",
            },
            {
              title: "Values",
              desc: "Trust, Innovation, Customer-First, Accessibility & Sustainability.",
              icon: "❤️",
            },
          ].map((item, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -10, scale: 1.05 }}
              className="bg-base-100 p-8 rounded-2xl shadow-xl text-center space-y-4 border border-green-100"
            >
              <div className="text-6xl">{item.icon}</div>
              <h3 className="text-2xl font-bold text-green-600">
                {item.title}
              </h3>
              <p className="text-gray-600">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Stats */}
      <section className="bg-green-50 py-16 rounded-3xl">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.2 }}
              className="space-y-3"
            >
              <div className="text-5xl text-green-600">{stat.icon}</div>
              <h3 className="text-3xl font-bold text-gray-800">
                {stat.value > 1000 ? `${stat.value / 1000}K+` : stat.value}
              </h3>
              <p className="text-gray-600">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Gallery */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        className="space-y-8"
      >
        <h2 className="text-4xl font-bold text-green-600 text-center">
          Explore Bangladesh with Us
        </h2>
        <Swiper
          modules={[Autoplay, Pagination]}
          spaceBetween={30}
          slidesPerView={1}
          autoplay={{ delay: 3000 }}
          pagination={{ clickable: true }}
          breakpoints={{
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          className="rounded-2xl"
        >
          {galleryImages.map((img, i) => (
            <SwiperSlide key={i}>
              <motion.img
                whileHover={{ scale: 1.1 }}
                src={img}
                alt={`Travel ${i + 1}`}
                className="h-80 w-full object-cover rounded-xl shadow-lg"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </motion.section>

      {/* Customer Reviews */}
      <RatingSection />

      {/* Latest Blogs */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        className="space-y-8"
      >
        <h2 className="text-4xl font-bold text-green-600 text-center">
          Latest Blogs
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs.map((blog) => (
            <motion.div
              key={blog.id}
              whileHover={{ y: -5, scale: 1.02 }}
              className="bg-base-100 rounded-xl shadow-lg overflow-hidden cursor-pointer transition"
            >
              <img
                src={blog.img}
                alt={blog.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="font-bold text-lg text-gray-800">
                  {blog.title}
                </h3>
                <a
                  href={blog.link}
                  className="text-green-600 font-medium mt-2 inline-block hover:underline"
                >
                  Read More →
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Call to Action */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center py-12 bg-green-100 rounded-xl shadow-lg space-y-4"
      >
        <h2 className="text-3xl font-bold text-green-600">
          Ready to Book Your Ticket?
        </h2>
        <p className="text-gray-700">
          Join thousands of satisfied travelers across Bangladesh using
          TicketBari every day.
        </p>
        <a
          href="/all-tickets"
          className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition inline-block font-medium"
        >
          Book Now
        </a>
      </motion.div>
    </div>
  );
}
