import { useEffect, useState } from "react";
import useAuth from "../../../hooks/useAuth";
import axios from "axios";
import toast from "react-hot-toast";
import Countdown from "react-countdown";
import { motion } from "framer-motion";
import {
  FaMapMarkerAlt,
  FaChair,
  FaMoneyBillWave,
  FaClock,
} from "react-icons/fa";
import LoadingSpinner from "../../../components/LoadingSpinner";

const MyBooking = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state
  const { user } = useAuth();

  // Payment handler
  // const handlePayment = async (booking) => {
  //   try {
  //     const token = await user.getIdToken();

  //     const paymentInfo = {
  //       _id: booking._id,
  //       ticketId: booking.ticketId,
  //       title: booking.title,
  //       image: booking.image,
  //       Price: booking.price,
  //       quantity: booking.quantity,
  //        totalPrice: booking.price * booking.quantity,
  //       userEmail: user.email,
  //       from: booking.from,
  //       to: booking.to,
  //       departureTime: new Date(booking.departureTime).toISOString(),
  //     };

  //     const { data } = await axios.post(
  //       `https://online-ticket-system-server.vercel.app/create-checkout-session`,
  //       paymentInfo,
  //       { headers: { Authorization: `Bearer ${token}` } }
  //     );

  //     window.location.href = data.url;
  //   } catch (err) {
  //     console.log(err);
  //     toast.error("Payment failed!");
  //   }
  // };
  const handlePayment = async (booking) => {
  try {
    const token = await user.getIdToken();

    const { data } = await axios.post(
      "https://online-ticket-system-server.vercel.app/create-checkout-session",
      {
        _id: booking._id, // ✅ ONLY THIS
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    window.location.href = data.url;
  } catch (err) {
    console.error(err);
    toast.error(err?.response?.data?.message || "Payment failed");
  }
};


  // Fetch bookings
  useEffect(() => {
    if (!user?.email) return;

    const fetchBookings = async () => {
      setLoading(true);
      try {
        const token = await user.getIdToken();
        const res = await axios.get(
          `https://online-ticket-system-server.vercel.app/my-bookings?email=${user.email}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setBookings(res.data);
      } catch (error) {
        console.log(error);
        toast.error("Failed to load booked tickets!");
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [user]);

  // Countdown renderer
  const renderCountdown = ({ days, hours, minutes, seconds, completed }) => {
    if (completed)
      return <span className="font-bold text-red-600">Expired</span>;
    return (
      <span className="font-semibold text-green-600">
        {days}d:{hours}h:{minutes}m:{seconds}s
      </span>
    );
  };

  return (
    <div className="p-4 mx-auto space-y-6 md:p-6 lg:p-8 max-w-7xl">
      <h2 className="text-2xl font-bold text-center text-gray-800 md:text-3xl">
        My Booked Tickets
      </h2>

      {loading ? (
        <div className="flex items-center justify-center py-10">
          <LoadingSpinner />
        </div>
      ) : bookings.length === 0 ? (
        <p className="py-6 text-center text-gray-500">No bookings found.</p>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {bookings.map((booking) => {
            const isExpired = new Date(booking.departureTime) < new Date();
            return (
              <motion.div
                key={booking._id}
                whileHover={{
                  scale: 1.03,
                  boxShadow: "0 8px 20px rgba(0,0,0,0.1)",
                }}
                className="p-4 transition border border-gray-200 rounded-lg shadow-md bg-base-100"
              >
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-lg font-semibold">{booking.title}</h3>
                  <span
                    className={`px-3 py-1 text-xs font-bold rounded-full ${
                      booking.status === "pending"
                        ? "bg-yellow-100 text-yellow-800"
                        : booking.status === "accepted"
                        ? "bg-blue-100 text-blue-800"
                        : booking.status === "paid"
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {booking.status.toUpperCase()}
                  </span>
                </div>

                <img
                  src={booking.image}
                  alt={booking.title}
                  className="object-cover w-full h-40 mb-3 rounded-md"
                />

                <div className="space-y-2 text-sm text-gray-700">
                  <p className="flex items-center gap-2">
                    <FaMapMarkerAlt className="text-red-500" /> {booking.from} →{" "}
                    {booking.to}
                  </p>

                  <hr className="my-4 border-t-2 border-gray-300" />

                  <p className="flex items-center gap-2">
                    <FaChair className="text-indigo-600" /> Quantity:{" "}
                    {booking.quantity}
                  </p>
                  <p className="flex items-center gap-2">
                    <FaMoneyBillWave className="text-green-600" /> Total Price:{" "}
                    <span className="font-bold text-blue-600">
                      ${booking.price}
                    </span>
                  </p>
                  <p className="flex items-center gap-2">
                    <FaClock className="text-orange-500" /> Departure:{" "}
                    {new Date(booking.departureTime).toLocaleString()}
                  </p>
                  <p className="flex items-center gap-2">
                    <FaClock className="text-green-600" /> Countdown:{" "}
                    {booking.status !== "rejected" ? (
                      <Countdown
                        date={new Date(booking.departureTime)}
                        renderer={renderCountdown}
                      />
                    ) : (
                      <span className="text-red-500">---</span>
                    )}
                  </p>
                </div>

                {booking.status === "accepted" && !isExpired ? (
                  <button
                    onClick={() => handlePayment(booking)}
                    className="w-full px-4 py-2 mt-3 text-white transition bg-green-600 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
                  >
                    Pay Now
                  </button>
                ) : isExpired && booking.status === "accepted" ? (
                  <span className="block mt-3 text-sm text-gray-400">
                    Time passed
                  </span>
                ) : null}
              </motion.div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default MyBooking;
