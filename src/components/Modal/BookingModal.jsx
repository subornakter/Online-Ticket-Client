import axios from "axios";
import { useState } from "react";
import useAuth from "../../hooks/useAuth";
import toast from "react-hot-toast";

const BookingModal = ({ ticket, closeModal, setTicket }) => {
  const [quantity, setQuantity] = useState(1);
  const { user } = useAuth();

  const handleBooking = async () => {
    if (!user) return toast.error("Please login first!");
    if (quantity > ticket.ticket_quantity)
      return toast.error("Not enough tickets available!");

    try {
      const token = await user.getIdToken();

      const bookingData = {
        ticketId: ticket._id,
        title: ticket.title,
        quantity,
        status: "pending",
        userEmail: user.email,
        price: ticket.price * quantity,
        departureTime: ticket.departure_date_time,
        image: ticket.image,
        from: ticket.from,
        to: ticket.to,
      };

      await axios.post(
        `${import.meta.env.VITE_API_URL}/bookings`,
        bookingData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      // UI Update (Reduce quantity)
      setTicket({
        ...ticket,
        ticket_quantity: ticket.ticket_quantity - quantity,
      });

      toast.success("Booking Successful!");
      closeModal();
    } catch (err) {
      console.log(err);
      toast.error("Booking failed!");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-50">
      <div className="bg-base-100 p-6 rounded-lg w-96 shadow-lg">
        <h2 className="font-bold text-xl mb-4">Book Ticket</h2>

        <label className="font-semibold">Quantity:</label>
        <input
          type="number"
          className="input input-bordered w-full mt-2"
          min="1"
          max={ticket.ticket_quantity}
          value={quantity}
          onChange={(e) =>
            setQuantity(
              Math.min(Number(e.target.value), ticket.ticket_quantity)
            )
          }
        />

        <button
          onClick={handleBooking}
          className="btn btn-success w-full mt-4"
          disabled={ticket.ticket_quantity === 0}
        >
          Confirm Booking
        </button>

        <button onClick={closeModal} className="btn btn-outline w-full mt-2">
          Cancel
        </button>
      </div>
    </div>
  );
};

export default BookingModal;
