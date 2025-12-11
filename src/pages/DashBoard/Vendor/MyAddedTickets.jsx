import { useEffect, useState } from "react";
import axios from "axios";
import useAuth from "../../../hooks/useAuth";
import { FaEdit, FaTrash } from "react-icons/fa";
import toast from "react-hot-toast";
import Swal from "sweetalert2";

const MyAddedTickets = () => {
  const { user } = useAuth();
  const [tickets, setTickets] = useState([]);
  const [selectedTicket, setSelectedTicket] = useState(null);

  // LOAD USER TICKETS
  useEffect(() => {
    const loadTickets = async () => {
      const token = await user.getIdToken();

      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/my-tickets?email=${user.email}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setTickets(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    loadTickets();
  }, [user]);

  /* --------------------------
        DELETE TICKET
  --------------------------- */
  const handleDelete = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to delete this ticket?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#e74c3c",
      cancelButtonColor: "#7f8c8d",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const token = await user.getIdToken();

          await axios.delete(
            `${import.meta.env.VITE_API_URL}/ticket/${id}`,
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );

          setTickets((prev) => prev.filter((t) => t._id !== id));

          Swal.fire("Deleted!", "Ticket has been deleted.", "success");
        } catch (error) {
          console.log(error);
          toast.error("Failed to delete!");
        }
      }
    });
  };

  /* --------------------------
        UPDATE TICKET
  --------------------------- */
  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;

    const updatedData = {
      title: form.title.value,
      image: form.image.value,
      from: form.from.value,
      to: form.to.value,
      transport_type: form.transport_type.value,
      price: Number(form.price.value),
      ticket_quantity: Number(form.ticket_quantity.value),
      perks: form.perks.value.split(",").map((p) => p.trim()),
      description: form.description.value,
      departure_date_time: new Date(form.departure_date_time.value).toISOString(),
    };

    try {
      const token = await user.getIdToken();

      await axios.patch(
        `${import.meta.env.VITE_API_URL}/ticket/${selectedTicket._id}`,
        updatedData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      Swal.fire("Updated!", "Ticket updated successfully", "success");

      setTickets((prev) =>
        prev.map((t) =>
          t._id === selectedTicket._id ? { ...t, ...updatedData } : t
        )
      );

      setSelectedTicket(null);
    } catch (error) {
      console.log(error);
      toast.error("Update failed!");
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">My Added Tickets</h2>

      {/* GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {tickets.map((ticket) => (
          <div
            key={ticket._id}
            className="bg-white shadow-md rounded-xl p-4 border hover:shadow-lg transition"
          >
            <img
              src={ticket.image}
              alt={ticket.title}
              className="rounded-md w-full h-40 object-cover"
            />

            <h3 className="text-lg font-bold mt-3">{ticket.title}</h3>

            <p className="text-sm text-gray-600">
              {ticket.from} → {ticket.to}
            </p>

            <p className="text-gray-800 font-semibold mt-1">${ticket.price}</p>

            <p className="text-sm text-gray-500">
              Quantity: {ticket.ticket_quantity}
            </p>

            <p className="text-sm text-gray-500">
              Perks: {ticket.perks?.join(", ")}
            </p>

            <p className="text-sm text-gray-500">
              Transport: {ticket.transport_type}
            </p>

            <p className="text-xs text-gray-400 mt-1">
              Date: {ticket.departure_date_time?.slice(0, 16)}
            </p>

            {/* STATUS */}
            <span
              className={`inline-block px-3 py-1 text-sm rounded-full mt-2 
                ${
                  ticket.status === "approved"
                    ? "bg-green-100 text-green-700"
                    : ticket.status === "rejected"
                    ? "bg-red-100 text-red-700"
                    : "bg-yellow-100 text-yellow-700"
                }`}
            >
              {ticket.status || "pending"}
            </span>

            {/* ACTION BUTTONS */}
            <div className="flex justify-between mt-4">
              <button
                disabled={ticket.status === "rejected"}
                onClick={() => setSelectedTicket(ticket)}
                className="flex items-center gap-2 px-3 py-1 rounded bg-blue-500 text-white 
                  disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                <FaEdit /> Update
              </button>

              <button
                disabled={ticket.status === "rejected"}
                onClick={() => handleDelete(ticket._id)}
                className="flex items-center gap-2 px-3 py-1 rounded bg-red-500 text-white
                  disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                <FaTrash /> Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* UPDATE MODAL */}
      {selectedTicket && (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
          <div className="bg-white w-[450px] rounded-lg p-5 shadow-xl max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-bold mb-3">Update Ticket</h2>

            <form onSubmit={handleUpdateSubmit} className="space-y-3">
              <label className="font-semibold">Title</label>
              <input
                type="text"
                name="title"
                defaultValue={selectedTicket.title}
                className="w-full border p-2 rounded"
              />

              <label className="font-semibold">Image URL</label>
              <input
                type="text"
                name="image"
                defaultValue={selectedTicket.image}
                className="w-full border p-2 rounded"
              />

              <label className="font-semibold">From</label>
              <input
                type="text"
                name="from"
                defaultValue={selectedTicket.from}
                className="w-full border p-2 rounded"
              />

              <label className="font-semibold">To</label>
              <input
                type="text"
                name="to"
                defaultValue={selectedTicket.to}
                className="w-full border p-2 rounded"
              />

              <label className="font-semibold">Transport Type</label>
              <input
                type="text"
                name="transport_type"
                defaultValue={selectedTicket.transport_type}
                className="w-full border p-2 rounded"
              />

              <label className="font-semibold">Price</label>
              <input
                type="number"
                name="price"
                defaultValue={selectedTicket.price}
                className="w-full border p-2 rounded"
              />

              <label className="font-semibold">Ticket Quantity</label>
              <input
                type="number"
                name="ticket_quantity"
                defaultValue={selectedTicket.ticket_quantity}
                className="w-full border p-2 rounded"
              />

              <label className="font-semibold">Perks</label>
              <textarea
                name="perks"
                defaultValue={selectedTicket.perks?.join(", ")}
                className="w-full border p-2 rounded"
              ></textarea>

              <label className="font-semibold">Description</label>
              <textarea
                name="description"
                defaultValue={selectedTicket.description}
                className="w-full border p-2 rounded"
              ></textarea>

              <label className="font-semibold">Departure Date & Time</label>
              <input
                type="datetime-local"
                name="departure_date_time"
                defaultValue={selectedTicket.departure_date_time?.slice(0, 16)}
                className="w-full border p-2 rounded"
              />

              <div className="flex justify-end gap-3 mt-3">
                <button
                  type="button"
                  onClick={() => setSelectedTicket(null)}
                  className="px-4 py-2 bg-gray-400 text-white rounded"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyAddedTickets;

