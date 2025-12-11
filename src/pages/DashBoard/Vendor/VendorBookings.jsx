// VendorBookings.jsx
import { useEffect, useState } from "react";
import useAuth from "../../../hooks/useAuth";
import toast, { Toaster } from "react-hot-toast";

export default function VendorBookings() {
  const { user } = useAuth();
  const [bookings, setBookings] = useState([]);

  // Fetch pending bookings for this vendor
  const fetchBookings = async () => {
    if (!user?.email) return;

    try {
      const token = await user.getIdToken();
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/vendor/bookings?email=${user.email}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
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

  // Accept booking
  const handleAccept = async (id) => {
    try {
      const token = await user.getIdToken();
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/vendor/accept/${id}`,
        {
          method: "PATCH",
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (!res.ok) throw new Error("Failed to accept booking");

      toast.success("Booking Accepted!");
      fetchBookings(); // Refresh list
    } catch (err) {
      console.log(err);
      toast.error("Failed to accept booking");
    }
  };

  // Reject booking
  const handleReject = async (id) => {
    try {
      const token = await user.getIdToken();
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/vendor/reject/${id}`,
        {
          method: "PATCH",
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (!res.ok) throw new Error("Failed to reject booking");

      toast.error("Booking Rejected!");
      fetchBookings(); // Refresh list
    } catch (err) {
      console.log(err);
      toast.error("Failed to reject booking");
    }
  };

  return (
    <div className="p-5">
      <Toaster position="top-right" />
      <h2 className="text-2xl font-bold mb-4">Requested Bookings</h2>

      <div className="overflow-x-auto shadow-lg rounded-lg">
        <table className="table w-full">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th>User Email</th>
              <th>Ticket Title</th>
              <th>Quantity</th>
              <th>Total Price</th>
              <th>Actions</th>
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
                <tr key={b._id}>
                  <td>{b.userEmail}</td>
                  <td>{b.ticketTitle}</td>
                  <td>{b.quantity}</td>
                  <td>${b.ticketUnitPrice * b.quantity}</td>
                  <td className="space-x-2">
                    <button
                      onClick={() => handleAccept(b._id)}
                      className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700"
                    >
                      Accept
                    </button>
                    <button
                      onClick={() => handleReject(b._id)}
                      className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                    >
                      Reject
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
