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
        `https://online-ticket-system-server.vercel.app/bookings`,
        bookingData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      // UI Update (Reduce quantity)
      setTicket({
        ...ticket,
        // ticket_quantity: ticket.ticket_quantity - quantity,
      });

      toast.success("Booking Successful!");
      closeModal();
    } catch (err) {
      console.log(err);
      toast.error("Booking failed!");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
      <div className="p-6 rounded-lg shadow-lg bg-base-100 w-96">
        <h2 className="mb-4 text-xl font-bold">Book Ticket</h2>

        <label className="font-semibold">Quantity:</label>
        <input
          type="number"
          className="w-full mt-2 input input-bordered"
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
          className="w-full mt-4 btn btn-success"
          disabled={ticket.ticket_quantity === 0}
        >
          Confirm Booking
        </button>

        <button onClick={closeModal} className="w-full mt-2 btn btn-outline">
          Cancel
        </button>
      </div>
    </div>
  );
};

export default BookingModal;
