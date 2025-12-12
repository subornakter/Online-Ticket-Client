import React from "react";
import { MdLocationOn, MdPhone, MdEmail } from "react-icons/md";
import { FaFacebook, FaInstagram, FaLinkedinIn, FaCcStripe } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { Link } from "react-router";

export default function Footer() {
  return (
    <footer className="w-full text-gray-800">
      {/* Top columns with unique gradient background */}
      <div className="w-full bg-gradient-to-r from-green-300 via-green-200 to-green-300 py-12 shadow-inner">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Column 1: Logo + Description */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <img
                src="https://i.ibb.co.com/bR2Kqky6/logo4-removebg-preview.png"
                alt="TicketBari Logo"
                className="w-12 h-12"
              />
              <span className="text-2xl font-bold">
                <span className="text-green-700">Ticket</span>Bari
              </span>
            </div>
            <p className="text-gray-800 text-sm">
              Book bus, train, launch & flight tickets easily. Hassle-free ticketing with instant confirmation and 24/7 support.
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div className="space-y-2">
            <h3 className="text-lg font-semibold mb-3">Quick Links</h3>
            <ul className="space-y-1 text-gray-800">
              <li><Link href="/" className="hover:text-green-700 transition">Home</Link></li>
              <li><Link href="/tickets" className="hover:text-green-700 transition">All Tickets</Link></li>
              <li><Link href="/contact" className="hover:text-green-700 transition">Contact Us</Link></li>
              <li><Link href="/about" className="hover:text-green-700 transition">About</Link></li>
            </ul>
          </div>

          {/* Column 3: Contact Info */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold mb-3">Contact Info</h3>
            <p className="flex items-center gap-2 opacity-90 mb-3"><MdLocationOn /> House 12, Road 5, Dhanmondi, Dhaka 1209, Bangladesh</p>
            <p className="flex items-center gap-2 opacity-90 mb-2"><MdPhone /> +880 1711-223344</p>
            <p className="flex items-center gap-2 opacity-90 mb-5"><MdEmail /> support@ticketbaribd.com</p>

            {/* Social Icons */}
            <div className="flex gap-4 text-xl text-gray-800">
              <Link href="#"><FaFacebook className="hover:text-blue-600 transition" /></Link>
              <Link href="#"><FaInstagram className="hover:text-pink-500 transition" /></Link>
              <Link href="#"><FaLinkedinIn className="hover:text-blue-700 transition" /></Link>
              <Link href="#"><FaXTwitter className="hover:text-blue-400 transition" /></Link>
            </div>
          </div>

          {/* Column 4: Payment Methods */}
          <div className="space-y-2">
            <h3 className="text-lg font-semibold mb-3">Payment Methods</h3>
            <div className="flex flex-wrap gap-4 items-center">
              <FaCcStripe size={40} className="text-blue-500 hover:text-green-700 transition" />
              <img src="https://img.icons8.com/color/48/000000/mastercard.png" alt="MasterCard" className="w-10 h-10 hover:scale-110 transition" />
              <img src="https://img.icons8.com/color/48/000000/visa.png" alt="Visa" className="w-10 h-10 hover:scale-110 transition" />
              <img src="https://img.icons8.com/color/48/000000/paypal.png" alt="PayPal" className="w-10 h-10 hover:scale-110 transition" />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="w-full bg-green-400 text-gray-900 py-4 text-center text-sm font-medium">
        © 2025 TicketBari. All rights reserved.
      </div>
    </footer>
  );
}

