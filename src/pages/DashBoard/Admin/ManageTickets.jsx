import { useQuery, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import toast from "react-hot-toast";

export default function ManageTickets() {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  // 🔹 Fetch only pending tickets (first time)
  const { data: tickets = [], isLoading } = useQuery({
    queryKey: ["allTickets"],
    queryFn: async () => {
      const res = await axiosSecure.get("/admin/tickets");
      return res.data;
    },
  });

  if (isLoading) return <p className="text-center">Loading...</p>;

  // ✅ Approve ticket (update status locally)
  const handleApprove = async (id) => {
    try {
      await axiosSecure.patch(`/admin/ticket/approve/${id}`);
      toast.success("Ticket approved!");

      // 🔥 keep row, just update status
      queryClient.setQueryData(["allTickets"], (oldTickets) =>
        oldTickets.map((ticket) =>
          ticket._id === id
            ? { ...ticket, status: "approved" }
            : ticket
        )
      );
    } catch (err) {
      console.error(err);
      toast.error("Approval failed!");
    }
  };

  // ❌ Reject ticket (update status locally)
  const handleReject = async (id) => {
    try {
      await axiosSecure.patch(`/admin/ticket/reject/${id}`);
      toast.success("Ticket rejected!");

      queryClient.setQueryData(["allTickets"], (oldTickets) =>
        oldTickets.map((ticket) =>
          ticket._id === id
            ? { ...ticket, status: "rejected" }
            : ticket
        )
      );
    } catch (err) {
      console.error(err);
      toast.error("Rejection failed!");
    }
  };

  return (
    <div className="p-6 shadow bg-base-100 rounded-xl">
      <h2 className="mb-6 text-2xl font-bold">Manage Tickets</h2>

      <div className="overflow-x-auto">
        <table className="w-full border border-gray-300 rounded-lg">
          <thead className="bg-green-100">
            <tr>
              <th className="p-3 text-left">Title</th>
              <th className="p-3 text-left">Vendor</th>
              <th className="p-3 text-center">Price</th>
              <th className="p-3 text-center">Status</th>
              <th className="p-3 text-center">Action</th>
            </tr>
          </thead>

          <tbody>
            {tickets.map((ticket) => (
              <tr key={ticket._id} className="border-t">
                <td className="p-3">{ticket.title}</td>
                <td className="p-3">{ticket?.seller?.email}</td>
                <td className="p-3 text-center">${ticket.price}</td>

                {/* 🔹 Status Badge */}
                <td className="p-3 text-center">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-semibold text-white ${
                      ticket.status === "approved"
                        ? "bg-green-500"
                        : ticket.status === "rejected"
                        ? "bg-red-500"
                        : "bg-yellow-500"
                    }`}
                  >
                    {ticket.status}
                  </span>
                </td>

                {/* 🔹 Action Buttons */}
                <td className="flex justify-center gap-2 p-3 text-center">
                  <button
                    onClick={() => handleApprove(ticket._id)}
                    disabled={ticket.status !== "pending"}
                    className="px-4 py-1 text-white bg-green-500 rounded hover:bg-green-600 disabled:bg-gray-300 disabled:cursor-not-allowed"
                  >
                    Approve
                  </button>

                  <button
                    onClick={() => handleReject(ticket._id)}
                    disabled={ticket.status !== "pending"}
                    className="px-4 py-1 text-white bg-red-500 rounded hover:bg-red-600 disabled:bg-gray-300 disabled:cursor-not-allowed"
                  >
                    Reject
                  </button>
                </td>
              </tr>
            ))}

            {tickets.length === 0 && (
              <tr>
                <td colSpan="5" className="p-6 text-center text-gray-500">
                  No pending tickets found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

