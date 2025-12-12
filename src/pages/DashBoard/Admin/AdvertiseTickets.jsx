import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { motion } from "framer-motion";

export default function AdvertiseTickets() {
  const axiosSecure = useAxiosSecure();

  const { data: tickets = [], isLoading, refetch } = useQuery({
    queryKey: ["advertiseTickets"],
    queryFn: async () => {
      const res = await axiosSecure.get("/admin/advertise-tickets");
      return res.data;
    },
  });

  const handleAdvertise = async (ticket) => {
    await axiosSecure.patch(`/admin/ticket/advertise/${ticket._id}`, {
      advertise: !ticket.advertise,
    });
    refetch();
  };

  if (isLoading)
    return (
      <div className="flex justify-center py-20">
        <span className="loading loading-spinner loading-lg text-blue-500"></span>
      </div>
    );

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="p-6"
    >
      <h2 className="text-2xl font-bold mb-6 text-center">
        Manage Advertised Tickets
      </h2>

      <div className="overflow-x-auto bg-white shadow-lg rounded-lg">
        <table className="table w-full">
          <thead className="bg-gray-200 text-gray-700">
            <tr>
              <th>#</th>
              <th>Image</th>
              <th>Title</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Seller</th>
              <th>Status</th>
              <th>Advertise</th>
            </tr>
          </thead>

          <tbody>
            {tickets.map((t, index) => (
              <motion.tr
                key={t._id}
                initial={{ opacity: 0, x: -15 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="border-b"
              >
                <td>{index + 1}</td>

                <td>
                  <img
                    src={t.image}
                    alt={t.title}
                    className="h-14 w-20 rounded object-cover shadow"
                  />
                </td>

                <td className="font-semibold">{t.title}</td>

                <td className="text-blue-600 font-bold">${t.price}</td>

                <td>{t.ticket_quantity}</td>

                <td className="text-sm">{t.seller?.email}</td>

                <td>
                  <span
                    className={`px-2 py-1 rounded text-white text-xs ${
                      t.advertise ? "bg-green-600" : "bg-gray-500"
                    }`}
                  >
                    {t.advertise ? "Advertised" : "Not Advertised"}
                  </span>
                </td>

                <td>
                  <button
                    onClick={() => handleAdvertise(t)}
                    className={`px-3 py-1 rounded text-white font-medium ${
                      t.advertise
                        ? "bg-red-500 hover:bg-red-600"
                        : "bg-blue-500 hover:bg-blue-600"
                    } transition`}
                  >
                    {t.advertise ? "Unadvertise" : "Advertise"}
                  </button>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
}
