import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { motion } from "framer-motion";
import LoadingSpinner from "../../../components/LoadingSpinner";

export default function AdvertiseTickets() {
  const axiosSecure = useAxiosSecure();

  const {
    data: tickets = [],
    isLoading,
    refetch,
  } = useQuery({
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
        <LoadingSpinner />
      </div>
    );

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="p-6"
    >
      <h2 className="mb-6 text-2xl font-bold text-center">
        Manage Advertised Tickets
      </h2>

      {/* Table layout for desktop */}
      <div className="hidden overflow-x-auto rounded-lg shadow-xl bg-base-100 md:block">
        <table className="table w-full">
          <thead className="text-gray-700 bg-gray-100">
            <tr>
              <th>#</th>
              <th>Image</th>
              <th>Title</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Seller</th>
              <th className="w-32 text-center">Status</th>
              <th className="text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {tickets.map((t, index) => (
              <motion.tr
                key={t._id}
                initial={{ opacity: 0, x: -15 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="transition border-b hover:bg-gray-50"
              >
                <td>{index + 1}</td>
                <td>
                  <img
                    src={t.image}
                    alt={t.title}
                    className="object-cover w-20 rounded-md shadow h-14"
                  />
                </td>
                <td className="font-semibold">{t.title}</td>
                <td className="font-bold text-blue-600">${t.price}</td>
                <td>{t.ticket_quantity}</td>
                <td className="text-sm text-gray-600">{t.seller?.email}</td>
                <td className="text-center">
                  <span
                    className={`px-3 py-1 rounded-full text-white text-xs font-semibold whitespace-nowrap inline-flex items-center justify-center ${
                      t.advertise ? "bg-green-600" : "bg-gray-600"
                    }`}
                  >
                    {t.advertise ? "Advertised" : "Not Advertised"}
                  </span>
                </td>
                <td className="text-center">
                  <button
                    onClick={() => handleAdvertise(t)}
                    className={`px-4 py-1.5 rounded-lg text-white font-medium shadow transition ${
                      t.advertise
                        ? "bg-red-500 hover:bg-red-600"
                        : "bg-blue-500 hover:bg-blue-600"
                    }`}
                  >
                    {t.advertise ? "Unadvertise" : "Advertise"}
                  </button>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Card layout for mobile */}
      <div className="space-y-4 md:hidden">
        {tickets.map((t, index) => (
          <motion.div
            key={t._id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
            className="flex flex-col gap-2 p-4 rounded-lg shadow bg-base-100"
          >
            <div className="flex items-center justify-between">
              <span className="text-lg font-semibold">{t.title}</span>
              <span
                className={`px-2 py-1 rounded-full text-white text-xs font-semibold ${
                  t.advertise ? "bg-green-600" : "bg-gray-600"
                }`}
              >
                {t.advertise ? "Advertised" : "Not Advertised"}
              </span>
            </div>
            <img
              src={t.image}
              alt={t.title}
              className="object-cover w-full h-40 rounded-md shadow"
            />
            <div className="flex justify-between">
              <span className="font-bold text-blue-600">${t.price}</span>
              <span>Qty: {t.ticket_quantity}</span>
            </div>
            <div className="text-sm text-gray-600">{t.seller?.email}</div>
            <button
              onClick={() => handleAdvertise(t)}
              className={`mt-2 px-4 py-2 rounded-lg text-white font-medium shadow transition ${
                t.advertise
                  ? "bg-red-500 hover:bg-red-600"
                  : "bg-blue-500 hover:bg-blue-600"
              }`}
            >
              {t.advertise ? "Unadvertise" : "Advertise"}
            </button>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
