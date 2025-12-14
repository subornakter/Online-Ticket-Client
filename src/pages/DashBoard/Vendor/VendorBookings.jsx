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
      <h2 className="text-3xl font-bold text-center text-green-700 mb-6">
        Requested Bookings
      </h2>

      <div className="overflow-x-auto shadow-lg rounded-lg">
        <table className="table w-full">
          <thead>
            <tr className="bg-gray-100 text-left uppercase text-gray-600">
              <th className="py-3 px-4">User Email</th>
              <th className="py-3 px-4">Ticket Title</th>
              <th className="py-3 px-4">Quantity</th>
              <th className="py-3 px-4">Total Price</th>
              <th className="py-3 px-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {bookings.length === 0 ? (
              <tr>
                <td colSpan={5} className="text-center py-6 text-gray-500">
                  No pending booking requests
                </td>
              </tr>
            ) : (
              bookings.map((b) => (
                <tr
                  key={b._id}
                  className="hover:bg-green-50 transition-colors duration-200"
                >
                  <td className="py-3 px-4">{b.userEmail}</td>
                  <td className="py-3 px-4 font-medium">{b.ticketTitle}</td>
                  <td className="py-3 px-4">{b.quantity}</td>
                  <td className="py-3 px-4 font-semibold text-green-600">
                    ${b.ticketUnitPrice * b.quantity}
                  </td>
                  <td className="py-3 px-4 flex gap-2">
                    <button
                      onClick={() => handleAccept(b._id)}
                      className="flex items-center gap-1 px-3 py-1 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-lg hover:from-green-600 hover:to-emerald-600 transition-all duration-200"
                    >
                      <FaCheck /> Accept
                    </button>
                    <button
                      onClick={() => handleReject(b._id)}
                      className="flex items-center gap-1 px-3 py-1 bg-gradient-to-r from-red-500 to-rose-500 text-white rounded-lg hover:from-red-600 hover:to-rose-600 transition-all duration-200"
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
