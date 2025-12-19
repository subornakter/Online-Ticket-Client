import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { FaUserShield, FaUserTie, FaExclamationTriangle } from "react-icons/fa";

export default function ManageUsers() {
  const axiosSecure = useAxiosSecure();

  const {
    data: users = [],
    isLoading,
    refetch,
  } = useQuery({
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

  const markFraud = async (email) => {
    await axiosSecure.patch(`/admin/mark-fraud/${email}`);
    refetch();
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <div className="w-16 h-16 border-b-4 border-green-500 rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-6">
      <h2 className="mb-6 text-2xl font-bold text-green-700 md:text-3xl">
        Manage Users
      </h2>

      {/* Table for large screens */}
      <div className="hidden overflow-x-auto md:block">
        <table className="min-w-full bg-base-100 border border-gray-200 rounded-lg shadow-md">
          <thead className="text-2xl font-semibold text-green-700 bg-green-100">
            <tr>
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Email</th>
              <th className="p-3 text-left">Role</th>
              <th className="p-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr
                key={u._id}
                className="transition-colors duration-200 border-b hover:bg-green-50"
              >
                <td className="p-3 text-sm">{u.name}</td>
                <td className="p-3 text-sm">{u.email}</td>
                <td className="p-3 text-sm font-medium capitalize">{u.role}</td>
                <td className="flex flex-wrap gap-2 p-3">
                  {!u.isCurrentUser && (
                    <>
                      <button
                        onClick={() => makeAdmin(u.email)}
                        className="flex items-center gap-1 px-3 py-1 text-white transition bg-blue-500 rounded-lg hover:bg-blue-600"
                      >
                        <FaUserShield /> Admin
                      </button>
                      <button
                        onClick={() => makeVendor(u.email)}
                        className="flex items-center gap-1 px-3 py-1 text-white transition bg-green-500 rounded-lg hover:bg-green-600"
                      >
                        <FaUserTie /> Vendor
                      </button>
                      {u.role === "vendor" && (
                        <button
                          onClick={() => markFraud(u.email)}
                          className="flex items-center gap-1 px-3 py-1 text-white transition bg-red-500 rounded-lg hover:bg-red-600"
                        >
                          <FaExclamationTriangle /> Fraud
                        </button>
                      )}
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Card layout for mobile */}
      <div className="flex flex-col gap-4 md:hidden">
        {users.length === 0 && (
          <p className="text-center text-gray-500">No users found.</p>
        )}
        {users.map((u) => (
          <div
            key={u._id}
            className="flex flex-col gap-3 p-4 bg-base-100 border border-gray-200 shadow-md rounded-xl"
          >
            <p className="text-sm font-semibold text-gray-700">{u.name}</p>
            <p className="text-sm text-gray-500">{u.email}</p>
            <p className="text-sm font-medium text-gray-700 capitalize">
              {u.role}
            </p>
            {!u.isCurrentUser && (
              <div className="flex flex-wrap gap-2 mt-2">
                <button
                  onClick={() => makeAdmin(u.email)}
                  className="flex items-center gap-1 px-3 py-1 text-white transition bg-blue-500 rounded-lg hover:bg-blue-600"
                >
                  <FaUserShield /> Admin
                </button>
                <button
                  onClick={() => makeVendor(u.email)}
                  className="flex items-center gap-1 px-3 py-1 text-white transition bg-green-500 rounded-lg hover:bg-green-600"
                >
                  <FaUserTie /> Vendor
                </button>
                {u.role === "vendor" && (
                  <button
                    onClick={() => markFraud(u.email)}
                    className="flex items-center gap-1 px-3 py-1 text-white transition bg-red-500 rounded-lg hover:bg-red-600"
                  >
                    <FaExclamationTriangle /> Fraud
                  </button>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
