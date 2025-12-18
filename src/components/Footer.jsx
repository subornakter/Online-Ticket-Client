import React from "react";
import { MdLocationOn, MdPhone, MdEmail } from "react-icons/md";
import { FaFacebook, FaInstagram, FaLinkedinIn, FaCcStripe } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { Link } from "react-router";

export default function Footer() {
  return (
    <footer className="w-full text-gray-700 bg-gray-50">
      {/* Top section with beautiful greenery gradient background */}
      <div className="w-full py-16 shadow-lg bg-gradient-to-br from-green-200 via-emerald-100 to-teal-200">
        <div className="grid grid-cols-1 gap-10 px-6 mx-auto max-w-7xl md:grid-cols-4">
        
          {/* Column 1: Logo + Description */}
          <div className="space-y-5">
            <div className="flex items-center gap-3">
              <img
                src="https://i.ibb.co.com/bR2Kqky6/logo4-removebg-preview.png"
                alt="TicketBari Logo"
                className="rounded-full shadow-md w-14 h-14"
              />
              <span className="text-3xl font-bold">
                <span className="text-green-800">Ticket</span>
                <span className="">Bari</span>
              </span>
            </div>
            <p className="max-w-xs text-base leading-relaxed text-gray-600">
              Book bus, train, launch & flight tickets easily. Hassle-free ticketing with instant confirmation and 24/7 support.
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-green-800">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-600 transition duration-300 hover:text-emerald-700">Home</Link></li>
              <li><Link to="/all-tickets" className="text-gray-600 transition duration-300 hover:text-emerald-700">All Tickets</Link></li>
              <li><Link to="/contact" className="text-gray-600 transition duration-300 hover:text-emerald-700">Contact Us</Link></li>
              <li><Link to="/about" className="text-gray-600 transition duration-300 hover:text-emerald-700">About</Link></li>
            </ul>
          </div>

          {/* Column 3: Contact Info */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-green-800">Contact Info</h3>
            <div className="space-y-3">
              {/* <p className="flex items-center gap-3 text-gray-600">
                <MdLocationOn className="text-xl text-emerald-600" />
                House 12, Road 5, Dhanmondi, Dhaka 1209, Bangladesh
              </p> */}
              <p className="flex items-center gap-3 text-gray-600">
                <MdPhone className="text-xl text-emerald-600" />
                +880 1711-223344
              </p>
              <p className="flex items-center gap-3 text-gray-600">
                <MdEmail className="text-xl text-emerald-600" />
                support@ticketbaribd.com
              </p>
            </div>
           
            {/* Social Icons */}
            <div className="flex gap-5 mt-6 text-2xl">
              <a href="#" className="text-blue-600 transition duration-300"><FaFacebook /></a>
              <a href="#" className="text-pink-500 transition duration-300"><FaInstagram /></a>
              <a href="#" className="text-blue-700 transition duration-300"><FaLinkedinIn /></a>
              <a href="#" className="text-blue-400 transition duration-300"><FaXTwitter /></a>
            </div>
          </div>

          {/* Column 4: Payment Methods */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-green-800">Payment Methods</h3>
            <div className="flex flex-wrap items-center gap-6">
              <FaCcStripe size={48} className="text-gray-600 transition duration-300 hover:text-emerald-600" />
              <img src="https://img.icons8.com/color/48/000000/mastercard.png" alt="MasterCard" className="w-12 h-12 transition duration-300 hover:scale-110" />
              <img src="https://img.icons8.com/color/48/000000/visa.png" alt="Visa" className="w-12 h-12 transition duration-300 hover:scale-110" />
              <img src="https://img.icons8.com/color/48/000000/paypal.png" alt="PayPal" className="w-12 h-12 transition duration-300 hover:scale-110" />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="w-full py-5 text-sm font-semibold text-center text-white bg-emerald-700">
        © 2025 TicketBari. All rights reserved.
      </div>
    </footer>
  );
}

