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

const transportIcon = (type) => {
  switch (type) {
    case "bus":
      return <FaBusAlt className="text-green-600" />;
    case "train":
      return <FaTrain className="text-red-600" />;
    case "flight":
      return <FaPlaneDeparture className="text-blue-600" />;
    case "launch":
      return <FaShip className="text-cyan-600" />;
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
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/ticket/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
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
      const now = moment();
      const depTime = moment(ticket.departure_date_time);
      const diff = depTime.diff(now);
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

  const isDeparturePassed = moment(ticket.departure_date_time).isBefore(moment());
  const isZeroQuantity = ticket.ticket_quantity === 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      className="container mx-auto p-6"
    >
      <div className="max-w-5xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden flex flex-col md:flex-row gap-6">
        
        {/* Image */}
        <div className="md:w-1/2">
          <img
            src={ticket.image}
            alt={ticket.title}
            className="w-full h-full object-cover rounded-xl"
          />
        </div>

        {/* Ticket Info */}
        <div className="md:w-1/2 p-6 flex flex-col justify-between space-y-4">
          
          {/* Title */}
          <h2 className="text-2xl font-bold text-gray-800">{ticket.title}</h2>

          {/* Route */}
          <div className="flex items-center gap-2 text-gray-700 text-sm">
            <FaMapMarkerAlt className="text-red-500" />
            <span className="font-medium">Route:</span>
            <span>{ticket.from} → {ticket.to}</span>
          </div>

          {/* Transport Type + Quantity */}
          <div className="flex items-center gap-4 text-gray-700 font-semibold">
            <span className="flex items-center gap-1">
              {transportIcon(ticket.transport_type)} {ticket.transport_type}
            </span>
            <span className="flex items-center gap-1 text-indigo-600">
              <FaChair /> {ticket.ticket_quantity} Available
            </span>
          </div>

          {/* Price */}
          <div className="flex items-center gap-2 text-gray-700 text-sm">
            <span className="font-medium flex items-center gap-1">
              <FaMoneyBillWave /> Price:
            </span>
            <span className="text-green-600 font-semibold">{ticket.price} BDT / Unit</span>
          </div>

          {/* Departure */}
          <div className="flex items-center gap-2 text-gray-700 text-sm">
            <FaClock className="text-orange-500" />
            <span className="font-medium">Departure:</span>
            <span>{moment(ticket.departure_date_time).format("MMMM Do, YYYY • h:mm A")}</span>
          </div>

          {/* Countdown */}
          <div className="text-blue-600 font-bold text-lg">{countdown}</div>

          {/* Perks */}
          {ticket.perks && ticket.perks.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {ticket.perks.map((perk, i) => (
                <span
                  key={i}
                  className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-medium hover:bg-green-200 transition cursor-default"
                >
                  {perk}
                </span>
              ))}
            </div>
          )}

          {/* Description */}
          <p className="text-gray-700 whitespace-pre-line"><span className="font-bold">Description: </span>{ticket.description}</p>

          {/* Book Button */}
          <button
            className={`w-full py-3 rounded-lg text-white font-medium transition 
              ${isDeparturePassed || isZeroQuantity ? "bg-gray-400 cursor-not-allowed" : "bg-green-600 hover:bg-green-700"}`}
            disabled={isDeparturePassed || isZeroQuantity}
            onClick={() => {
              if (!user) return navigate("/login");
              setOpenModal(true);
            }}
          >
            Book Now
          </button>
        </div>
      </div>

      {/* Modal Component */}
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


