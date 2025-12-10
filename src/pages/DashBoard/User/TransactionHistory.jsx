import { useEffect, useState } from "react";
import axios from "axios";

const TransactionHistory = () => {
  const [payments, setPayments] = useState([]);

 useEffect(() => {
  const token = localStorage.getItem("access-token");

  axios.get(`${import.meta.env.VITE_API_URL}/payments`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  .then(res => setPayments(res.data))
  .catch(err => console.log(err));
}, []);


  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Transaction History</h2>

      <table className="border w-full">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2">Transaction ID</th>
            <th className="p-2">Amount</th>
            <th className="p-2">Ticket Title</th>
            <th className="p-2">Payment Date</th>
          </tr>
        </thead>
        <tbody>
          {payments.map((pay) => (
            <tr key={pay.transactionId}>
              <td className="p-2">{pay.transactionId}</td>
              <td className="p-2">${pay.amount}</td>
              <td className="p-2">{pay.title}</td>
              <td className="p-2">{pay.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TransactionHistory;
