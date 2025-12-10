import axios from "axios";
import { useState } from "react";
import useAuth from "../../hooks/useAuth";

const BookingModal = ({ ticket, closeModal, setTicket }) => {
  const [quantity, setQuantity] = useState(1);
  const { user } = useAuth();

  const handleBooking = async () => {
    if (quantity > ticket.ticketQuantity) return alert("Not enough tickets!");

    const token = await user?.getIdToken();

    const bookingData = {
      ticketId: ticket._id,
      title: ticket.title,
      quantity,
      status: "Pending",
      userEmail: user.email,
      price: ticket.price * quantity,
    };

    await axios.post(
      `${import.meta.env.VITE_API_URL}/bookings`,
      bookingData,
      {
        headers: { Authorization: `Bearer ${token}` }
      }
    );

    // Update UI after booking
    setTicket({
      ...ticket,
      ticketQuantity: ticket.ticketQuantity - quantity
    });

    closeModal();
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg w-96 shadow-lg">
        <h2 className="font-bold text-xl mb-4">Book Ticket</h2>

        <label className="font-semibold">Quantity:</label>
        <input
          type="number"
          className="input input-bordered w-full mt-2"
          min="1"
          max={ticket.ticketQuantity}
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
        />

        <button
          onClick={handleBooking}
          className="btn btn-success w-full mt-4"
        >
          Confirm Booking
        </button>

        <button
          onClick={closeModal}
          className="btn btn-outline w-full mt-2"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default BookingModal;
