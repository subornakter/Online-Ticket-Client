import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import axios from "axios";
import useAuth from "../hooks/useAuth";
import { motion } from "framer-motion";
import moment from "moment";
import BookingModal from "../components/Modal/BookingModal";
import LoadingSpinner from "../components/LoadingSpinner";
import {
  FaBusAlt,
  FaTrain,
  FaPlaneDeparture,
  FaShip,
  FaMoneyBillWave,
  FaChair,
  FaClock,
  FaMapMarkerAlt,
} from "react-icons/fa";
import { FaHourglassHalf } from "react-icons/fa";

const transportIcon = (type) => {
  switch (type) {
    case "bus":
      return <FaBusAlt className="text-green-600" />;
    case "train":
      return <FaTrain className="text-green-600" />;
    case "flight":
      return <FaPlaneDeparture className="text-green-600" />;
    case "launch":
      return <FaShip className="text-green-600" />;
    default:
      return null;
  }
};

const TicketDetails = () => {
  const { id } = useParams();
  const [ticket, setTicket] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [countdown, setCountdown] = useState("");
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTicket = async () => {
      try {
        const token = await user?.getIdToken();
        const res = await axios.get(
          `https://online-ticket-system-server.vercel.app/ticket/${id}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setTicket(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchTicket();
  }, [id, user]);

  useEffect(() => {
    if (!ticket) return;
    const interval = setInterval(() => {
      const diff = moment(ticket.departure_date_time).diff(moment());
      if (diff <= 0) {
        setCountdown("Departure Passed");
        clearInterval(interval);
      } else {
        setCountdown(moment.utc(diff).format("DD[d] HH[h] mm[m] ss[s]"));
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [ticket]);

  if (!ticket) return <LoadingSpinner />;

  const isDeparturePassed = moment(ticket.departure_date_time).isBefore(
    moment()
  );
  const isZeroQuantity = ticket.ticket_quantity === 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-6xl px-4 py-12 mx-auto"
    >
      <div className="grid gap-6 overflow-hidden shadow-xl bg-base-100 rounded-2xl md:grid-cols-2">
        {/* Image */}
        <div className="relative group">
          <img
            src={ticket.image}
            alt={ticket.title}
            className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-105"
          />

          <div className="absolute flex items-center gap-2 px-4 py-1 text-xs font-bold text-green-700 border border-green-300 rounded-full shadow top-4 left-4 bg-green-50">
            {transportIcon(ticket.transport_type)}
            <span className="capitalize">{ticket.transport_type}</span>
          </div>
        </div>

        {/* Info */}
        <div className="flex flex-col gap-4 p-6">
          {/* Title */}
          <div>
            <h2 className="text-xl font-bold text-gray-800 md:text-2xl">
              {ticket.title}
            </h2>
            <p className="mt-1 text-xs text-gray-500">
              Ticket Details & Journey Information
            </p>
          </div>

          {/* Route */}
          <div className="p-4 bg-gray-50 rounded-xl">
            <p className="mb-1 text-xs font-bold text-gray-600">ROUTE</p>
            <div className="flex items-center gap-2 text-sm text-gray-800">
              <FaMapMarkerAlt className="text-red-500" />
              <span>{ticket.from}</span> → <span>{ticket.to}</span>
            </div>
          </div>

          {/* Info Grid */}
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="p-4 bg-green-50 rounded-xl">
              <p className="mb-1 text-xs font-bold text-gray-600">
                AVAILABLE SEATS
              </p>
              <div className="flex items-center gap-2 font-semibold">
                <FaChair className="text-green-600" />
                {ticket.ticket_quantity}
              </div>
            </div>

            <div className="p-4 bg-green-50 rounded-xl">
              <p className="mb-1 text-xs font-bold text-gray-600">PRICE</p>
              <div className="flex items-center gap-2 font-semibold text-green-700">
                <FaMoneyBillWave />
                {ticket.price} BDT
              </div>
            </div>

            <div className="col-span-2 p-4 bg-orange-50 rounded-xl">
              <p className="mb-1 text-xs font-bold text-gray-600">
                DEPARTURE TIME
              </p>
              <div className="flex items-center gap-2 text-sm">
                <FaClock className="text-orange-500" />
                {moment(ticket.departure_date_time).format(
                  "MMMM Do, YYYY • h:mm A"
                )}
              </div>
            </div>
          </div>
          {/* Countdown */}
          <div className="flex items-center justify-center gap-2 py-2 text-sm font-semibold text-blue-700 border border-blue-200 bg-blue-50 rounded-xl">
            <FaHourglassHalf className="text-blue-600" />
            <span>{countdown}</span>
          </div>

          {/* Description */}
          <div className="p-4 bg-gray-50 rounded-xl">
            <p className="mb-1 text-xs font-bold text-gray-600">DESCRIPTION</p>
            <p className="text-sm leading-relaxed text-gray-700">
              {ticket.description}
            </p>
          </div>

          {/* Button */}
          <button
            disabled={isDeparturePassed || isZeroQuantity}
            onClick={() => {
              if (!user) return navigate("/login");
              setOpenModal(true);
            }}
            className={`mt-2 py-3 rounded-xl text-base font-bold text-white transition-all duration-300 shadow
              ${
                isDeparturePassed || isZeroQuantity
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-gradient-to-r from-green-600 to-emerald-600 hover:scale-[1.03]"
              }`}
          >
            Book Now
          </button>
        </div>
      </div>

      {openModal && (
        <BookingModal
          ticket={ticket}
          closeModal={() => setOpenModal(false)}
          setTicket={setTicket}
        />
      )}
    </motion.div>
  );
};

export default TicketDetails;
