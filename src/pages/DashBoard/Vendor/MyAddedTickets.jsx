import { useEffect, useState } from "react";
import axios from "axios";
import useAuth from "../../../hooks/useAuth";
import { motion } from "framer-motion";
import { FaEdit, FaTrash, FaMapMarkerAlt, FaBus } from "react-icons/fa";
import { TbTicket } from "react-icons/tb";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import LoadingSpinner from "../../../components/LoadingSpinner";

const MyAddedTickets = () => {
  const { user } = useAuth();
  const [tickets, setTickets] = useState([]);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [loading, setLoading] = useState(false); // Loading for fetching tickets
  const [actionLoading, setActionLoading] = useState(""); // Loading for delete/update actions

  /* ---------------- LOAD TICKETS ---------------- */
  useEffect(() => {
    if (!user) return;

    const loadTickets = async () => {
      setLoading(true);
      try {
        const token = await user.getIdToken();
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/my-tickets?email=${user.email}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setTickets(res.data);
      } catch (err) {
        console.error(err);
        toast.error("Failed to load tickets!");
      } finally {
        setLoading(false);
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
        setActionLoading(id);
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
        } finally {
          setActionLoading("");
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
      departure_date_time: new Date(form.departure_date_time.value).toISOString(),
    };

    setActionLoading(selectedTicket._id);
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
    } finally {
      setActionLoading("");
    }
  };

  return (
    <div className="p-5">
      <h2 className="mb-8 text-3xl font-bold text-center text-green-700">
        My Added Tickets
      </h2>

      {loading ? (
      <LoadingSpinner />
      ) : tickets.length === 0 ? (
        <div className="py-10 text-center text-gray-500">No tickets found.</div>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {tickets.map((ticket) => (
            <motion.div
              key={ticket._id}
              whileHover={{ scale: 1.04 }}
              transition={{ type: "spring", stiffness: 200, damping: 15 }}
              className="flex flex-col overflow-hidden border border-green-100 shadow-md bg-base-100 rounded-2xl"
            >
              <div className="relative">
                <img
                  src={ticket.image}
                  alt={ticket.title}
                  className="object-cover w-full h-40"
                />
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

              <div className="flex flex-col flex-grow p-4">
                <h3 className="text-lg font-bold text-gray-800 line-clamp-1">
                  {ticket.title}
                </h3>
                <div className="flex items-center gap-2 mt-1 text-sm text-gray-600">
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

                <div className="mt-2 space-y-1 text-sm text-gray-500">
                  <p>🎟 Quantity: {ticket.ticket_quantity}</p>
                  {ticket.perks && ticket.perks.length > 0 && (
                    <div className="flex flex-wrap items-center gap-2 mt-2 text-xs">
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
                  <p className="mt-1 text-xs">
                    📅{" "}
                    {new Date(ticket.departure_date_time).toLocaleString("en-US", {
                      timeZone: "Asia/Dhaka",
                      dateStyle: "medium",
                      timeStyle: "short",
                    })}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-3 pt-4 mt-auto">
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    disabled={ticket.status === "rejected" || actionLoading === ticket._id}
                    onClick={() => setSelectedTicket(ticket)}
                    className="flex items-center justify-center gap-2 py-2 font-semibold text-white shadow rounded-xl bg-gradient-to-r from-green-500 to-emerald-500 disabled:opacity-50"
                  >
                    {actionLoading === ticket._id ? "Processing..." : <><FaEdit /> Update</>}
                  </motion.button>

                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    disabled={ticket.status === "rejected" || actionLoading === ticket._id}
                    onClick={() => handleDelete(ticket._id)}
                    className="flex items-center justify-center gap-2 py-2 font-semibold text-white shadow rounded-xl bg-gradient-to-r from-red-500 to-rose-500 disabled:opacity-50"
                  >
                    {actionLoading === ticket._id ? "Processing..." : <><FaTrash /> Delete</>}
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* UPDATE MODAL */}
      {selectedTicket && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-base-100 w-[450px] rounded-xl p-5 shadow-xl max-h-[90vh] overflow-y-auto">
            <h2 className="flex items-center gap-2 mb-3 text-xl font-bold text-green-700">
              <TbTicket /> Update Ticket
            </h2>

            <form onSubmit={handleUpdateSubmit} className="space-y-3">
              {[["Title", "title"], ["Image URL", "image"], ["From", "from"], ["To", "to"], ["Transport Type", "transport_type"], ["Price", "price", "number"], ["Ticket Quantity", "ticket_quantity", "number"]].map(([label, name, type = "text"]) => (
                <div key={name}>
                  <label className="font-semibold">{label}</label>
                  <input
                    type={type}
                    name={name}
                    defaultValue={selectedTicket[name]}
                    className="w-full p-2 border border-green-200 rounded-lg outline-none focus:ring-2 focus:ring-green-300"
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
                className="w-full p-2 border border-green-200 rounded-lg"
              />

              <label className="font-semibold">Departure Date & Time</label>
              <input
                type="datetime-local"
                name="departure_date_time"
                defaultValue={selectedTicket.departure_date_time?.slice(0, 16)}
                className="w-full p-2 border border-green-200 rounded-lg"
              />

              <div className="flex justify-end gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => setSelectedTicket(null)}
                  className="px-4 py-2 text-white bg-gray-400 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-white rounded-lg bg-gradient-to-r from-green-500 to-emerald-500"
                  disabled={actionLoading === selectedTicket._id}
                >
                  {actionLoading === selectedTicket._id ? "Processing..." : "Save"}
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
