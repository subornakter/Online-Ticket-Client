import axios from "axios";
import { useEffect, useState } from "react";
import useAuth from "../../../hooks/useAuth";
import {
  FaHistory,
  FaReceipt,
  FaCalendarAlt,
  FaDollarSign,
} from "react-icons/fa";
import LoadingSpinner from "../../../components/LoadingSpinner";

const TransactionHistory = () => {
  const { user } = useAuth();
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadTransactions = async () => {
      if (user) {
        setLoading(true); // Start loading
        const token = await user.getIdToken();
        try {
          const res = await axios.get(
            `${import.meta.env.VITE_API_URL}/transactions?email=${user.email}`,
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );
          setTransactions(res.data);
        } catch (err) {
          console.log("Error loading history:", err);
        } finally {
          setLoading(false); // Stop loading
        }
      }
    };
    loadTransactions();
  }, [user]);

  // Show spinner if loading
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="max-w-6xl min-h-screen p-4 mx-auto md:p-8 bg-gray-50/50">
      {/* Header Section */}
      <div className="flex items-center gap-3 mb-8">
        <div className="p-3 text-white bg-indigo-600 rounded-lg shadow-lg shadow-indigo-200">
          <FaHistory size={24} />
        </div>
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-gray-800 md:text-3xl">
            Payment History
          </h2>
          <p className="text-sm text-gray-500">
            Review and manage your ticket purchases
          </p>
        </div>
      </div>

      {transactions.length === 0 ? (
        <div className="p-12 text-center bg-base-100 border border-gray-300 border-dashed shadow-sm rounded-2xl">
          <FaReceipt className="mx-auto mb-4 text-5xl text-gray-200" />
          <p className="text-lg italic text-gray-500">
            No transactions found in your account.
          </p>
        </div>
      ) : (
        <>
          {/* Desktop Table View */}
          <div className="hidden overflow-hidden bg-base-100 border border-gray-100 shadow-xl md:block shadow-gray-100 rounded-2xl">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="text-gray-600 bg-green-100/80">
                  <th className="p-5 text-sm font-bold tracking-wider uppercase">
                    Transaction ID
                  </th>
                  <th className="p-5 text-sm font-bold tracking-wider uppercase">
                    Ticket Title
                  </th>
                  <th className="p-5 text-sm font-bold tracking-wider text-center uppercase">
                    Amount
                  </th>
                  <th className="p-5 text-sm font-bold tracking-wider text-right uppercase">
                    Date & Time
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {transactions.map((t) => (
                  <tr
                    key={t.transactionId}
                    className="transition-colors hover:bg-indigo-50/30"
                  >
                    <td className="p-5">
                      <span className="px-2 py-1 font-mono text-xs text-gray-600 bg-gray-100 rounded">
                        {t.transactionId}
                      </span>
                    </td>
                    <td className="p-5 font-medium text-gray-700">{t.title}</td>
                    <td className="p-5 text-center">
                      <span className="inline-flex items-center px-3 py-1 font-bold text-green-600 rounded-full bg-green-50">
                        <FaDollarSign size={12} /> {t.amount}
                      </span>
                    </td>
                    <td className="p-5 text-sm font-bold text-right text-gray-500">
                      {new Date(t.date).toLocaleDateString("en-GB", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                      <br />
                      <span className="text-xs opacity-60">
                        {new Date(t.date).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Card Layout */}
          <div className="space-y-4 md:hidden">
            {transactions.map((t) => (
              <div
                key={t.transactionId}
                className="p-5 bg-base-100 border border-gray-100 shadow-sm rounded-2xl"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-2 px-3 py-1 text-xs font-bold text-indigo-700 rounded-lg bg-indigo-50">
                    <FaReceipt size={14} /> TXN: {t.transactionId.slice(-8)}
                  </div>
                  <span className="text-lg font-black text-green-600">
                    ${t.amount}
                  </span>
                </div>
                <h3 className="mb-2 text-lg font-bold text-gray-800">
                  {t.title}
                </h3>
                <div className="flex items-center gap-2 text-sm text-gray-400">
                  <FaCalendarAlt size={14} />
                  {new Date(t.date).toLocaleString()}
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default TransactionHistory;
