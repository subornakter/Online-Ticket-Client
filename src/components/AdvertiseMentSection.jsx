import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { Link } from "react-router";
import { motion } from "framer-motion";

export default function AdvertisementSection() {
  const axiosSecure = useAxiosSecure();

  const { data: tickets = [], isLoading } = useQuery({
    queryKey: ["advertisedTickets"],
    queryFn: async () => {
      const res = await axiosSecure.get("/advertised-tickets");
      return res.data;
    },
  });

  if (isLoading) return <p className="text-center py-10">Loading...</p>;

  return (
    <div className="my-10 max-w-7xl mx-auto px-4">
      <h2 className="text-2xl font-bold mb-8 text-center">Featured Tickets</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-8">
        {tickets.map((t) => (
          <motion.div
            key={t._id}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="border rounded-lg shadow-lg overflow-hidden bg-white"
          >
            <img
              src={t.image}
              alt={t.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-4 space-y-2">
              <h3 className="font-bold text-lg">{t.title}</h3>
              <p>
                <span className="font-semibold">Price:</span> ${t.price}
              </p>
              <p>
                <span className="font-semibold">Quantity:</span> {t.ticket_quantity}
              </p>
              <p>
                <span className="font-semibold">Transport:</span> {t.transport_type}
              </p>
              <p>
                <span className="font-semibold">Perks:</span>{" "}
                {t.perks?.join(", ")}
              </p>
              <Link
                to={`/ticket/${t._id}`}
                className="mt-3 inline-block w-full text-center bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
              >
                See Details
              </Link>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
