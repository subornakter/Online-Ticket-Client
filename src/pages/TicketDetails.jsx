import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import axios from "axios";
import useAuth from "../hooks/useAuth";
import { motion } from "framer-motion";
import moment from "moment";
import BookingModal from "../components/Modal/BookingModal";

const TicketDetails = () => {
  const { id } = useParams();
  const [ticket, setTicket] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [countdown, setCountdown] = useState("");
  const { user } = useAuth();
  const navigate = useNavigate();

  // Fetch ticket details
  useEffect(() => {
    const fetchTicket = async () => {
      try {
        const token = await user?.getIdToken();
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/ticket/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setTicket(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchTicket();
  }, [id, user]);

  // Countdown Timer
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

  if (!ticket) return <p className="text-center p-10">Loading...</p>;

  const isDeparturePassed = moment(ticket.departure_date_time).isBefore(moment());
  const isZeroQuantity = ticket.ticket_quantity === 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      className="container mx-auto p-6"
    >
      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-lg p-6">
        
        <img src={ticket.image} className="rounded-xl w-full" alt="" />

        <h2 className="text-2xl font-bold mt-4">{ticket.title}</h2>

        <p className="text-gray-600 my-2">
          {ticket.from} → {ticket.to}
        </p>

        <p className="text-xl text-green-600 font-semibold">
          {ticket.transport_type} — ৳{ticket.price}/Unit
        </p>

        <p className="text-gray-700 my-2">
          Available: {ticket.ticket_quantity}
        </p>

        <p className="text-gray-800 mt-4 whitespace-pre-line">
          {ticket.description}
        </p>

        <div className="mt-4 font-semibold">
          Departure: {moment(ticket.departure_date_time).format("MMMM Do, YYYY • h:mm A")}
        </div>

        <div className="mt-2 text-blue-600 font-bold text-lg">
          {countdown}
        </div>

        <button
          className="btn btn-primary mt-4 w-full"
          disabled={isDeparturePassed || isZeroQuantity}
          onClick={() => {
            if (!user) return navigate("/login");
            setOpenModal(true);
          }}
        >
          Book Now
        </button>
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
