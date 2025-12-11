import { useEffect, useState } from "react";
import useAuth from "../../../hooks/useAuth";
import axios from "axios";
import toast from "react-hot-toast";
import Countdown from "react-countdown";
import { Link } from "react-router";

const MyBooking = () => {
  const [bookings, setBookings] = useState([]);
  const { user } = useAuth();


const handlePayment = async (booking) => {
  try {
    const token = await user.getIdToken();

    const paymentInfo = {
      _id: booking._id,
      ticketId: booking.ticketId,
      title: booking.title,
      image: booking.image,
      price: booking.price,
      quantity: booking.quantity,
      userEmail: user.email,  // Add this!
      from: booking.from,
      to: booking.to,
         departureTime: new Date(booking.departureTime).toISOString(),
    };

    const { data } = await axios.post(
      `${import.meta.env.VITE_API_URL}/create-checkout-session`,
      paymentInfo,
      {
        headers: { Authorization: `Bearer ${token}` }
      }
    );

    // Redirect to Stripe Checkout
    window.location.href = data.url;
  } catch (err) {
    console.log(err);
    toast.error("Payment failed!");
  }
};



  useEffect(() => {
    if (!user?.email) return;

    const fetchBookings = async () => {
      try {
        const token = await user.getIdToken();
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/my-bookings?email=${user.email}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setBookings(res.data);
      } catch (error) {
        console.log(error);
        toast.error("Failed to load booked tickets!");
      }
    };

    fetchBookings();
  }, [user]);

  const renderCountdown = ({ days, hours, minutes, seconds, completed }) => {
    if (completed) {
      return <span className="text-red-600 font-bold">Expired</span>;
    }
    return (
      <span className="text-green-600 font-semibold">
        {days}d:{hours}h:{minutes}m:{seconds}s
      </span>
    );
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6 text-center">My Booked Tickets</h2>

      <div className="overflow-x-auto shadow-lg rounded-lg">
        <table className="table w-full">
          <thead className="bg-gray-200 text-gray-700">
            <tr>
              <th>Image</th>
              <th>Title</th>
              <th>From → To</th>
              <th>Qty</th>
              <th>Total Price</th>
              <th>Departure</th>
              <th>Countdown</th>
              <th>Status</th>
              <th>Pay</th>
            </tr>
          </thead>

          <tbody>
            {bookings.map((booking) => {
              const isExpired =
                new Date(booking.departureTime) < new Date();

              return (
                <tr key={booking._id}>
                  <td>
                    <img
                      src={booking.image}
                      alt={booking.title}
                      className="h-12 w-20 object-cover rounded"
                    />
                  </td>

                  <td className="font-semibold">{booking.title}</td>

                  <td>
                    {booking.from} → {booking.to}
                  </td>

                  <td>{booking.quantity}</td>

                  <td className="font-bold text-blue-600">${booking.price}</td>

                  <td>{new Date(booking.departureTime).toLocaleString()}</td>

                  <td>
                    {booking.status !== "rejected" ? (
                      <Countdown
                        date={new Date(booking.departureTime)}
                        renderer={renderCountdown}
                      />
                    ) : (
                      <span className="text-red-500">---</span>
                    )}
                  </td>

                  <td
                    className={`font-bold ${
                      booking.status === "pending"
                        ? "text-yellow-600"
                        : booking.status === "accepted"
                        ? "text-blue-600"
                        : booking.status === "paid"
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    {booking.status.toUpperCase()}
                  </td>

                  {/* <td>
                    {booking.status === "accepted" && !isExpired ? (
                      <Link to={`/payment/${booking._id}`}>
                        <button className="btn btn-sm btn-primary">
                          Pay Now
                        </button>
                      </Link>
                    ) : isExpired && booking.status === "accepted" ? (
                      <span className="text-gray-400 text-sm">
                        Time passed
                      </span>
                    ) : (
                      <span className="text-gray-400 text-sm">N/A</span>
                    )}
                  </td> */}
                  <td>
  {booking.status === "accepted" && !isExpired ? (
    <button
      onClick={() => handlePayment(booking)}
      type="button"
      className="cursor-pointer inline-flex justify-center rounded-md border border-transparent bg-green-100 px-4 py-2 text-sm font-medium text-green-900 hover:bg-green-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2"
    >
      Pay Now
    </button>
  ) : isExpired && booking.status === "accepted" ? (
    <span className="text-gray-400 text-sm">Time passed</span>
  ) : (
    <span className="text-gray-400 text-sm">N/A</span>
  )}
</td>

                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyBooking;
