import { useQuery } from "@tanstack/react-query";
 
import { Link } from "react-router";
import { motion } from "framer-motion";
import useAxiosSecure from "../hooks/useAxiosSecure";

export default function LatestTickets() {
  const axios = useAxiosSecure();

  const { data: tickets = [], isLoading } = useQuery({
    queryKey: ["latestTickets"],
    queryFn: async () => {
      const res = await axios.get("/tickets");
      return res.data;
    },
  });

  if (isLoading) return <p className="text-center py-10">Loading...</p>;

  return (
    <div className="my-14 max-w-7xl mx-auto px-4">
      <h2 className="text-2xl font-bold mb-8 text-center">Latest Tickets</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {tickets.map((t) => (
          <motion.div
            key={t._id}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            className="border rounded-lg shadow-lg bg-white overflow-hidden"
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
                {Array.isArray(t.perks) ? t.perks.join(", ") : t.perks}
              </p>

              <Link
                to={`/ticket/${t._id}`}
                className="block w-full text-center bg-green-600 text-white py-2 rounded hover:bg-green-600 transition"
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
