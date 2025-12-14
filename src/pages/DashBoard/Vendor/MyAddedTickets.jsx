import { useEffect, useState } from "react";
import axios from "axios";
import useAuth from "../../../hooks/useAuth";
import { motion } from "framer-motion";
import { FaEdit, FaTrash, FaMapMarkerAlt, FaBus } from "react-icons/fa";
import { TbTicket } from "react-icons/tb";
import toast from "react-hot-toast";
import Swal from "sweetalert2";

const MyAddedTickets = () => {
  const { user } = useAuth();
  const [tickets, setTickets] = useState([]);
  const [selectedTicket, setSelectedTicket] = useState(null);

  /* ---------------- LOAD TICKETS ---------------- */
  useEffect(() => {
    if (!user) return;

    const loadTickets = async () => {
      try {
        const token = await user.getIdToken();
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/my-tickets?email=${user.email}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setTickets(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    loadTickets();
  }, [user]);

  /* ---------------- DELETE ---------------- */
  const handleDelete = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This ticket will be deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#e74c3c",
      cancelButtonColor: "#7f8c8d",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const token = await user.getIdToken();
          await axios.delete(`${import.meta.env.VITE_API_URL}/ticket/${id}`, {
            headers: { Authorization: `Bearer ${token}` },
          });

          setTickets((prev) => prev.filter((t) => t._id !== id));
          Swal.fire("Deleted!", "Ticket deleted successfully.", "success");
        } catch (err) {
          console.error(err);
          toast.error("Delete failed!");
        }
      }
    });
  };

  /* ---------------- UPDATE ---------------- */
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
      departure_date_time: new Date(
        form.departure_date_time.value
      ).toISOString(),
    };

    try {
      const token = await user.getIdToken();
      await axios.patch(
        `${import.meta.env.VITE_API_URL}/ticket/${selectedTicket._id}`,
        updatedData,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setTickets((prev) =>
        prev.map((t) =>
          t._id === selectedTicket._id ? { ...t, ...updatedData } : t
        )
      );

      Swal.fire("Updated!", "Ticket updated successfully.", "success");
      setSelectedTicket(null);
    } catch (err) {
      console.error(err);
      toast.error("Update failed!");
    }
  };

  return (
    <div className="p-5">
      <h2 className="text-3xl font-bold text-center text-green-700 mb-8">
        My Added Tickets
      </h2>

      {/* GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {tickets.map((ticket) => (
          <motion.div
            key={ticket._id}
            whileHover={{ scale: 1.04 }}
            transition={{ type: "spring", stiffness: 200, damping: 15 }}
            className="bg-base-100 rounded-2xl shadow-md border border-green-100 overflow-hidden flex flex-col"
          >
            {/* IMAGE */}
            <div className="relative">
              <img
                src={ticket.image}
                alt={ticket.title}
                className="w-full h-40 object-cover"
              />

              {/* STATUS */}
              <span
                className={`absolute top-3 right-3 px-3 py-1 text-xs font-semibold rounded-full
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
            </div>

            {/* CONTENT */}
            <div className="p-4 flex flex-col flex-grow">
              <h3 className="text-lg font-bold text-gray-800 line-clamp-1">
                {ticket.title}
              </h3>

              <div className="flex items-center gap-2 text-sm text-gray-600 mt-1">
                <FaMapMarkerAlt className="text-green-600" />
                <span>{ticket.from}</span>
                <span className="font-bold">→</span>
                <span>{ticket.to}</span>
              </div>

              <div className="flex items-center justify-between mt-3">
                <p className="text-xl font-bold text-green-600">
                  <span className="text-gray-500">Price: </span>
                  {ticket.price}BDT
                </p>
                <span className="flex items-center gap-1 text-sm text-gray-500">
                  <FaBus /> {ticket.transport_type}
                </span>
              </div>

              <div className="mt-2 text-sm text-gray-500 space-y-1">
                <p>🎟 Quantity: {ticket.ticket_quantity}</p>
                {/* PERKS – chip style */}
                {ticket.perks && ticket.perks.length > 0 && (
                  <div className="flex flex-wrap items-center gap-2 text-xs mt-2">
                    <span className="font-medium text-gray-600">Perks:</span>
                    {ticket.perks.map((perk, i) => (
                      <span
                        key={i}
                        className="bg-emerald-50 text-emerald-700 px-2.5 py-1 rounded-full border border-emerald-200"
                      >
                        {perk}
                      </span>
                    ))}
                  </div>
                )}

                <p className="text-xs mt-1">
                  📅{" "}
                  {new Date(ticket.departure_date_time).toLocaleString(
                    "en-US",
                    {
                      timeZone: "Asia/Dhaka",
                      dateStyle: "medium",
                      timeStyle: "short",
                    }
                  )}
                </p>
              </div>

              {/* BUTTONS */}
              <div className="mt-auto pt-4 grid grid-cols-2 gap-3">
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  disabled={ticket.status === "rejected"}
                  onClick={() => setSelectedTicket(ticket)}
                  className="flex items-center justify-center gap-2 py-2 rounded-xl
                    bg-gradient-to-r from-green-500 to-emerald-500
                    text-white font-semibold shadow disabled:opacity-50"
                >
                  <FaEdit /> Update
                </motion.button>

                <motion.button
                  whileTap={{ scale: 0.95 }}
                  disabled={ticket.status === "rejected"}
                  onClick={() => handleDelete(ticket._id)}
                  className="flex items-center justify-center gap-2 py-2 rounded-xl
                    bg-gradient-to-r from-red-500 to-rose-500
                    text-white font-semibold shadow disabled:opacity-50"
                >
                  <FaTrash /> Delete
                </motion.button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* UPDATE MODAL */}
      {selectedTicket && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-base-100 w-[450px] rounded-xl p-5 shadow-xl max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-bold mb-3 text-green-700 flex items-center gap-2">
              <TbTicket /> Update Ticket
            </h2>

            <form onSubmit={handleUpdateSubmit} className="space-y-3">
              {[
                ["Title", "title"],
                ["Image URL", "image"],
                ["From", "from"],
                ["To", "to"],
                ["Transport Type", "transport_type"],
                ["Price", "price", "number"],
                ["Ticket Quantity", "ticket_quantity", "number"],
              ].map(([label, name, type = "text"]) => (
                <div key={name}>
                  <label className="font-semibold">{label}</label>
                  <input
                    type={type}
                    name={name}
                    defaultValue={selectedTicket[name]}
                    className="w-full border border-green-200 p-2 rounded-lg focus:ring-2 focus:ring-green-300 outline-none"
                  />
                </div>
              ))}

              <label className="font-semibold">Perks</label>
              <textarea
                name="perks"
                defaultValue={selectedTicket.perks?.join(", ")}
                className="bg-emerald-50 text-emerald-700 px-2.5 py-1 rounded-full border border-emerald-200"
              />

              <label className="font-semibold">Description</label>
              <textarea
                name="description"
                defaultValue={selectedTicket.description}
                className="w-full border border-green-200 p-2 rounded-lg"
              />

              <label className="font-semibold">Departure Date & Time</label>
              <input
                type="datetime-local"
                name="departure_date_time"
                defaultValue={selectedTicket.departure_date_time?.slice(0, 16)}
                className="w-full border border-green-200 p-2 rounded-lg"
              />

              <div className="flex justify-end gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => setSelectedTicket(null)}
                  className="px-4 py-2 bg-gray-400 text-white rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-lg"
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
