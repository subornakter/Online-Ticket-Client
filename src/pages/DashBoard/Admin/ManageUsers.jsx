import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";


export default function ManageUsers() {
  const axiosSecure = useAxiosSecure();

  const { data: users = [], isLoading, refetch } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/admin/users");
      return res.data;
    },
  });

  const makeAdmin = async (email) => {
    await axiosSecure.patch(`/admin/make-admin/${email}`);
    refetch();
  };

  const makeVendor = async (email) => {
    await axiosSecure.patch(`/admin/make-vendor/${email}`);
    refetch();
  };

  if (isLoading) return <p>Loading...</p>;

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Manage Users</h2>

      <table className="w-full border">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2">Name</th>
            <th className="p-2">Email</th>
            <th className="p-2">Role</th>
            <th className="p-2">Actions</th>
          </tr>
        </thead>

        <tbody>
          {users.map((u) => (
            <tr key={u._id} className="border-b">
              <td className="p-2">{u.name}</td>
              <td className="p-2">{u.email}</td>
              <td className="p-2 font-semibold">{u.role}</td>
              <td className="p-2 space-x-2">
                <button
                  onClick={() => makeAdmin(u.email)}
                  className="px-2 py-1 bg-blue-500 text-white rounded"
                >
                  Make Admin
                </button>

                <button
                  onClick={() => makeVendor(u.email)}
                  className="px-2 py-1 bg-green-500 text-white rounded"
                >
                  Make Vendor
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
