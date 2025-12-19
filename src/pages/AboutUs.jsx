import React from "react";
import { motion } from "framer-motion";
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

/* ---------------- DATA ---------------- */

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

const stats = [
  { icon: <FaUsers />, label: "Happy Customers", value: "150K+" },
  { icon: <FaRoute />, label: "Routes Covered", value: "800+" },
  { icon: <FaTicketAlt />, label: "Tickets Sold", value: "500K+" },
  { icon: <FaClock />, label: "24/7 Support", value: "Always" },
];

/* ---------------- COMPONENT ---------------- */

export default function AboutUs() {
  return (
    <div className="px-6 py-4 mx-auto space-y-24 overflow-hidden max-w-7xl">
      {/* ---------- HERO SECTION ---------- */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="space-y-3 text-center"
      >
        {" "}
        <h1 className="text-5xl font-bold text-green-600">About Us</h1>{" "}
        <p className="max-w-2xl mx-auto text-gray-700">
          {" "}
          TicketBari is Bangladesh’s leading ticket booking platform. We
          simplify travel booking for buses, trains, launches, and flights.{" "}
        </p>{" "}
      </motion.div>

      <motion.section
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <Swiper
          modules={[Autoplay, Pagination]}
          slidesPerView={1}
          loop
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          className="overflow-hidden shadow-xl rounded-2xl"
        >
          {[
            "https://i.ibb.co.com/sJHPprBc/hero.webp",
            "https://i.ibb.co.com/XZdty4NH/hero5.avif",
            "https://i.ibb.co.com/v6JXXPs8/hero4.jpg",
            "https://i.ibb.co.com/dshySjrs/hero2.jpg",
            "https://i.ibb.co.com/FLpCDBJh/new2.jpg",
          ].map((img, i) => (
            <SwiperSlide key={i}>
              <img
                src={img}
                alt={`hero-slide-${i}`}
                className="w-full h-[220px] sm:h-[320px] md:h-[450px] object-cover"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </motion.section>

      {/* ---------- OUR STORY ---------- */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="space-y-10"
      >
        {" "}
        <h2 className="text-4xl font-bold text-center text-green-600 md:text-5xl">
          {" "}
          Our Story{" "}
        </h2>{" "}
        <div className="grid items-center gap-12 md:grid-cols-2">
          {" "}
          <div className="space-y-6 text-xl leading-relaxed text-gray-700">
            {" "}
            <p>
              {" "}
              TicketBari was founded in 2020 in Dhaka, Bangladesh. We noticed
              that people in the country have to stand in long queues for hours
              to buy tickets for buses, trains, launches, and flights, often
              facing disappointment from unavailability or fake tickets.{" "}
            </p>{" "}
            <p>
              {" "}
              To solve these problems, we created TicketBari – an easy, secure,
              and fast online ticket booking platform. Now, from anywhere, users
              can view real-time seats on mobile or computer, make secure
              payments, and get instant confirmations.{" "}
            </p>{" "}
            <p>
              {" "}
              Today, we partner with hundreds of operators across the country
              and serve thousands of passengers daily. Our goal is to make
              travel simple, safe, and enjoyable for every person in Bangladesh.{" "}
            </p>{" "}
            <p>
              {" "}
              We believe that travel is not just about going from one place to
              another – it's about creating new experiences and memories.
              TicketBari makes the first step of that journey effortless.{" "}
            </p>{" "}
          </div>{" "}
          <motion.img
            whileHover={{ scale: 1.05 }}
            src="https://s3-ap-south-1.amazonaws.com/shohoz-bus/prod/app-illustration-v2.webp?v=1.0.3"
            alt="Happy Travelers on TicketBari"
            className="object-cover w-full h-100"
          />{" "}
        </div>{" "}
      </motion.section>

      {/* ---------- TEAM ---------- */}
      <section className="space-y-8">
        <h2 className="text-4xl font-bold text-center text-green-600">
          Meet Our Team
        </h2>

        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={20}
          autoplay={{ delay: 4000 }}
          pagination={{ clickable: true }}
          navigation
          breakpoints={{
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 4 },
          }}
        >
          {teamMembers.map((member, i) => (
            <SwiperSlide key={i}>
              <div className="p-6 space-y-4 text-center shadow-lg bg-base-100 rounded-xl">
                <img
                  src={member.img}
                  alt={member.name}
                  className="object-cover mx-auto border-4 border-green-300 rounded-full w-28 h-28"
                />
                <h3 className="text-xl font-bold">{member.name}</h3>
                <p className="text-gray-600">{member.role}</p>
                <div className="flex justify-center gap-4 text-xl text-gray-500">
                  <FaFacebookF />
                  <FaTwitter />
                  <FaInstagram />
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>

      {/* ---------- STATS ---------- */}
      <section className="grid grid-cols-2 gap-8 py-12 text-center md:grid-cols-4 bg-green-50 rounded-2xl">
        {stats.map((s, i) => (
          <div key={i} className="space-y-3">
            <div className="text-4xl text-green-600">{s.icon}</div>
            <h3 className="text-2xl font-bold">{s.value}</h3>
            <p className="text-gray-600">{s.label}</p>
          </div>
        ))}
      </section>

      {/* ---------- REVIEWS ---------- */}
      <RatingSection />

      {/* ---------- BLOGS ---------- */}
      <section className="space-y-8">
        <h2 className="text-4xl font-bold text-center text-green-600">
          Latest Blogs
        </h2>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {blogs.map((blog) => (
            <div
              key={blog.id}
              className="overflow-hidden shadow-lg bg-base-100 rounded-xl"
            >
              <img
                src={blog.img}
                alt={blog.title}
                className="object-cover w-full h-48"
              />
              <div className="p-4">
                <h3 className="font-bold">{blog.title}</h3>
                <a href={blog.link} className="font-medium text-green-600">
                  Read More →
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
