// VendorBookings.jsx
import { useEffect, useState } from "react";
import useAuth from "../../../hooks/useAuth";
import toast, { Toaster } from "react-hot-toast";
import { FaCheck, FaTimes } from "react-icons/fa";

export default function VendorBookings() {
  const { user } = useAuth();
  const [bookings, setBookings] = useState([]);

  const fetchBookings = async () => {
    if (!user?.email) return;
    try {
      const token = await user.getIdToken();
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/vendor/bookings?email=${user.email}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (!res.ok) throw new Error("Failed to fetch bookings");
      const data = await res.json();
      setBookings(data);
    } catch (err) {
      console.log(err);
      toast.error("Failed to load requested bookings!");
    }
  };

  useEffect(() => {
    fetchBookings();
  }, [user]);

  const handleAccept = async (id) => {
    try {
      const token = await user.getIdToken();
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/vendor/accept/${id}`,
        { method: "PATCH", headers: { Authorization: `Bearer ${token}` } }
      );
      if (!res.ok) throw new Error("Failed to accept booking");
      toast.success("Booking Accepted!");
      fetchBookings();
    } catch (err) {
      console.log(err);
      toast.error("Failed to accept booking");
    }
  };

  const handleReject = async (id) => {
    try {
      const token = await user.getIdToken();
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/vendor/reject/${id}`,
        { method: "PATCH", headers: { Authorization: `Bearer ${token}` } }
      );
      if (!res.ok) throw new Error("Failed to reject booking");
      toast.error("Booking Rejected!");
      fetchBookings();
    } catch (err) {
      console.log(err);
      toast.error("Failed to reject booking");
    }
  };

  return (
    <div className="p-5">
      <Toaster position="top-right" />
      <h2 className="mb-6 text-3xl font-bold text-center text-green-700">
        Requested Bookings
      </h2>

      <div className="overflow-x-auto rounded-lg shadow-lg">
        <table className="table w-full">
          <thead>
            <tr className="text-left text-gray-600 uppercase bg-green-100/80">
              <th className="px-4 py-3">User Email</th>
              <th className="px-4 py-3">Ticket Title</th>
              <th className="px-4 py-3">Quantity</th>
              <th className="px-4 py-3">Total Price</th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {bookings.length === 0 ? (
              <tr>
                <td colSpan={5} className="py-6 text-center text-gray-500">
                  No pending booking requests
                </td>
              </tr>
            ) : (
              bookings.map((b) => (
                <tr
                  key={b._id}
                  className="transition-colors duration-200 hover:bg-green-50"
                >
                  <td className="px-4 py-3">{b.userEmail}</td>
                  <td className="px-4 py-3 font-medium">{b.ticketTitle}</td>
                  <td className="px-4 py-3">{b.quantity}</td>
                  <td className="px-4 py-3 font-semibold text-green-600">
                    ${b.ticketUnitPrice * b.quantity}
                  </td>
                  <td className="flex gap-2 px-4 py-3">
                    <button
                      onClick={() => handleAccept(b._id)}
                      className="flex items-center gap-1 px-3 py-1 text-white transition-all duration-200 rounded-lg bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600"
                    >
                      <FaCheck /> Accept
                    </button>
                    <button
                      onClick={() => handleReject(b._id)}
                      className="flex items-center gap-1 px-3 py-1 text-white transition-all duration-200 rounded-lg bg-gradient-to-r from-red-500 to-rose-500 hover:from-red-600 hover:to-rose-600"
                    >
                      <FaTimes /> Reject
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
