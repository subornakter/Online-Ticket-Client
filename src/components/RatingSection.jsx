

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { FaStar } from "react-icons/fa";

const testimonials = [
  {
    id: 1,
    name: "Sadia Akter",
    img: "https://i.pravatar.cc/100?img=47",
    text: "Booking tickets online was so easy! I got my seats instantly and the payment process was smooth.",
  },
  {
    id: 2,
    name: "Rasel Ahmed",
    img: "https://i.pravatar.cc/100?img=56",
    text: "The travel experience was seamless. My train tickets were delivered digitally and hassle-free.",
  },
  {
    id: 3,
    name: "Mim Chowdhury",
    img: "https://i.pravatar.cc/100?img=32",
    text: "Loved the fast booking process! Online ticketing made my journey planning stress-free.",
  },
  {
    id: 4,
    name: "Hasibul Hasan",
    img: "https://i.pravatar.cc/100?img=36",
    text: "I could easily compare prices and seat availability. Online ticket platform is super convenient.",
  },
  {
    id: 5,
    name: "Anika Rahman",
    img: "https://i.pravatar.cc/100?img=38",
    text: "The mobile ticketing option saved me so much time. Highly recommend this platform for bus and train tickets.",
  },
  {
    id: 6,
    name: "Mahin Islam",
    img: "https://i.pravatar.cc/100?img=60",
    text: "Booking flights online was smooth and simple. Instant confirmation and e-tickets were sent immediately.",
  },
  {
    id: 7,
    name: "Taslima Noor",
    img: "https://i.pravatar.cc/100?img=34",
    text: "Great user interface and quick support. I love how easy it is to check schedules and book tickets online.",
  },
  {
    id: 8,
    name: "Rakib Chowdhury",
    img: "https://i.pravatar.cc/100?img=65",
    text: "No waiting in queues anymore! Online ticket platform made my bus travel super convenient and safe.",
  },
];


const RatingSection = () => {
  return (
    <div className="max-w-7xl mx-auto py-12 md:py-16 px-4 md:px-6 text-center">
      <h2 className=" bg-gradient-to-r from-[#0a8c17] via-[#0ea50e] to-[#0b861e] bg-clip-text text-transparent text-2xl sm:text-3xl md:text-4xl font-bold mb-2">
        What Our Customers Say
      </h2>
      <p className="text-gray-500 mb-8 md:mb-10 text-sm sm:text-base">
        Real Customer Reviews
      </p>

      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={20}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 2600, disableOnInteraction: false }}
        breakpoints={{
          640: { slidesPerView: 1, spaceBetween: 20 },
          768: { slidesPerView: 2, spaceBetween: 25 },
          1024: { slidesPerView: 3, spaceBetween: 30 },
        }}
        className="pb-10"
      >
        {testimonials.map((t) => (
          <SwiperSlide key={t.id}>
            <div className="bg-green-50 border border-green-100 rounded-2xl shadow-md p-6 sm:p-8 flex flex-col justify-between h-full text-left hover:shadow-lg transition-all duration-300">
              <div>
                <div className="flex gap-1 mb-2 sm:mb-3 text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <FaStar key={i} className="w-4 h-4 sm:w-5 sm:h-5" />
                  ))}
                </div>

                <p className="text-gray-700 italic leading-relaxed text-sm sm:text-base">
                  {`“${t.text}”`}
                </p>
              </div>

              <div className="flex items-center gap-3 mt-5">
                <img
                  src={t.img}
                  alt={t.name}
                  className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 border-green-300"
                />
                <p className="font-semibold text-gray-800 text-sm sm:text-base">
                  {t.name}
                </p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default RatingSection;

