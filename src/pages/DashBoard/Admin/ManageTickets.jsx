import { useQuery, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import toast from "react-hot-toast";

export default function ManageTickets() {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  // Fetch all pending tickets
  const { data: tickets = [], isLoading } = useQuery({
    queryKey: ["allTickets"],
    queryFn: async () => {
      const res = await axiosSecure.get("/admin/tickets");
      return res.data;
    },
  });

  if (isLoading) return <p>Loading...</p>;

  // Approve a ticket
  const handleApprove = async (id) => {
    try {
      await axiosSecure.patch(`/admin/ticket/approve/${id}`);
      toast.success("Ticket approved!");
      queryClient.invalidateQueries(["allTickets"]); // refresh the list
    } catch (err) {
      console.error(err);
      toast.error("Approval failed!");
    }
  };

  // Reject a ticket
  const handleReject = async (id) => {
    try {
      await axiosSecure.patch(`/admin/ticket/reject/${id}`);
      toast.success("Ticket rejected!");
      queryClient.invalidateQueries(["allTickets"]); // refresh the list
    } catch (err) {
      console.error(err);
      toast.error("Rejection failed!");
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Manage Tickets</h2>

      <table className="w-full border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2">Event</th>
            <th className="p-2">Vendor</th>
            <th className="p-2">Price</th>
            <th className="p-2">Status</th>
            <th className="p-2">Action</th>
          </tr>
        </thead>

        <tbody>
          {tickets.map((ticket) => (
            <tr key={ticket._id} className="border-b">
              <td className="p-2">{ticket?.title}</td>
              <td className="p-2">{ticket?.seller?.email}</td>
              <td className="p-2">${ticket?.price}</td>

              <td className="p-2">
                <span
                  className={`px-2 py-1 rounded text-white ${
                    ticket.status === "approved"
                      ? "bg-green-500"
                      : ticket.status === "rejected"
                      ? "bg-red-500"
                      : "bg-yellow-500"
                  }`}
                >
                  {ticket.status || "pending"}
                </span>
              </td>

              <td className="p-2 flex gap-2">
                <button
                  onClick={() => handleApprove(ticket._id)}
                  disabled={ticket.status !== "pending"}
                  className="px-3 py-1 bg-green-500 text-white rounded disabled:bg-gray-300 disabled:cursor-not-allowed"
                >
                  Approve
                </button>

                <button
                  onClick={() => handleReject(ticket._id)}
                  disabled={ticket.status !== "pending"}
                  className="px-3 py-1 bg-red-500 text-white rounded disabled:bg-gray-300 disabled:cursor-not-allowed"
                >
                  Reject
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

