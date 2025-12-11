import axios from "axios";
import { useEffect, useState } from "react";
import useAuth from "../../../hooks/useAuth";

const TransactionHistory = () => {
  const { user } = useAuth();
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const loadTransactions = async () => {
      if (user) {
        const token = await user.getIdToken();

        try {
          const res = await axios.get(
            `${import.meta.env.VITE_API_URL}/transactions?email=${user.email}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          setTransactions(res.data);
        } catch (err) {
          console.log("Error loading history:", err);
        }
      }
    };

    loadTransactions();
  }, [user]);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-6">Transaction History</h2>

      <div className="overflow-x-auto shadow-lg rounded-xl border border-gray-200">
        <table className="w-full text-left">
          <thead className="bg-gray-100 text-gray-700 uppercase text-sm">
            <tr>
              <th className="p-4 border-b">Transaction ID</th>
              <th className="p-4 border-b">Amount</th>
              <th className="p-4 border-b">Ticket Title</th>
              <th className="p-4 border-b">Payment Date</th>
            </tr>
          </thead>

          <tbody>
            {transactions.length === 0 ? (
              <tr>
                <td
                  colSpan="4"
                  className="text-center p-6 text-gray-500 italic"
                >
                  No transactions found
                </td>
              </tr>
            ) : (
              transactions.map((t, index) => (
                <tr
                  key={t.transactionId}
                  className={`transition duration-200 ${
                    index % 2 === 0
                      ? "bg-white"
                      : "bg-gray-50"
                  } hover:bg-blue-50`}
                >
                  <td className="p-4 border-b text-sm font-mono">
                    {t.transactionId}
                  </td>
                  <td className="p-4 border-b font-semibold text-green-600">
                    ${t.amount}
                  </td>
                  <td className="p-4 border-b">{t.title}</td>
                  <td className="p-4 border-b">
                    {new Date(t.date).toLocaleString()}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TransactionHistory;


