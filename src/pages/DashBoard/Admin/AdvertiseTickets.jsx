import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";

export default function AdvertiseTickets() {
  const axiosSecure = useAxiosSecure();

  const { data: tickets = [], isLoading, refetch } = useQuery({
    queryKey: ["advertiseTickets"],
    queryFn: async () => {
      const res = await axiosSecure.get("/admin/advertise");
      return res.data;
    },
  });

  const handleAdvertise = async (id) => {
    await axiosSecure.patch(`/admin/advertise/${id}`);
    refetch();
  };

  if (isLoading) return <p>Loading...</p>;

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Advertise Tickets</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {tickets.map((t) => (
          <div key={t._id} className="p-4 border rounded shadow bg-white">
            <h3 className="font-bold text-lg">{t.title}</h3>
            <p>Price: ${t.price}</p>
            <p>Status: {t.isAdvertised ? "Advertised" : "Not Advertised"}</p>

            <button
              onClick={() => handleAdvertise(t._id)}
              className="mt-3 w-full bg-blue-500 text-white py-2 rounded"
            >
              {t.isAdvertised ? "Remove" : "Advertise"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
