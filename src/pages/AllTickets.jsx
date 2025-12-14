import React, { useEffect, useState } from "react";
import axios from "axios";
import TicketCard from "../components/TicketCard";
import LoadingSpinner from "../components/LoadingSpinner";
import useAuth from "../hooks/useAuth";
import { FaSearch, FaMapMarkerAlt, FaCalendarAlt } from "react-icons/fa";

const AllTickets = () => {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  // Search States
  const [searchFrom, setSearchFrom] = useState("");
  const [searchTo, setSearchTo] = useState("");
  const [searchDate, setSearchDate] = useState("");

  // Sorting
  const [sortOrder, setSortOrder] = useState("none"); // none / asc / desc

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const ticketsPerPage = 6;

  // Load ALL tickets initially
  useEffect(() => {
    const fetchTickets = async () => {
      if (!user) return;
      try {
        const token = await user.getIdToken();
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/tickets`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setTickets(res.data);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };
    fetchTickets();
  }, [user]);

  // SEARCH FUNCTION
  const handleSearch = async () => {
    if (!user) return;
    try {
      setLoading(true);

      const token = await user.getIdToken();
      const queryParams = new URLSearchParams({
        from: searchFrom,
        to: searchTo,
        date: searchDate,
      }).toString();

      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/tickets/search?${queryParams}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setTickets(res.data);
      setCurrentPage(1);
    } catch (err) {
      console.log("Search error:", err);
    } finally {
      setLoading(false);
    }
  };

  // SORT FUNCTION
  const sortedTickets = [...tickets].sort((a, b) => {
    if (sortOrder === "asc") return a.price - b.price;
    if (sortOrder === "desc") return b.price - a.price;
    return 0;
  });

  // PAGINATION CALCULATION
  const indexOfLastTicket = currentPage * ticketsPerPage;
  const indexOfFirstTicket = indexOfLastTicket - ticketsPerPage;
  const currentTickets = sortedTickets.slice(
    indexOfFirstTicket,
    indexOfLastTicket
  );
  const totalPages = Math.ceil(sortedTickets.length / ticketsPerPage);

  if (loading) return <LoadingSpinner />;

  return (
    <div className="p-5">
      {/* PAGE TITLE */}
      <h1 className="text-3xl md:text-4xl font-bold mb-6 text-center bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
        Explore All Tickets
      </h1>

      {/* 🔍 SEARCH + SORT BAR */}
      <div className="bg-base-100 shadow-lg rounded-xl p-4 mb-6">
        <div className="flex flex-col lg:flex-row items-center gap-4">
          {/* From */}
          <div className="flex items-center gap-2 border border-green-400 px-4 py-3 rounded-lg w-full">
            <FaMapMarkerAlt className="text-green-600" />
            <input
              type="text"
              placeholder="From"
              value={searchFrom}
              onChange={(e) => setSearchFrom(e.target.value)}
              className="w-full outline-none"
            />
          </div>

          {/* To */}
          <div className="flex items-center gap-2 border border-green-400 px-4 py-3 rounded-lg w-full">
            <FaMapMarkerAlt className="text-green-600" />
            <input
              type="text"
              placeholder="To"
              value={searchTo}
              onChange={(e) => setSearchTo(e.target.value)}
              className="w-full outline-none"
            />
          </div>

          {/* Date */}
          <div className="flex items-center gap-2 border border-green-400 px-4 py-3 rounded-lg w-full">
            <FaCalendarAlt className="text-green-600" />
            <input
              type="date"
              value={searchDate}
              onChange={(e) => setSearchDate(e.target.value)}
              className="w-full outline-none"
            />
          </div>

          {/* SEARCH BUTTON with gradient */}
          <button
            onClick={handleSearch}
            className="flex items-center justify-center gap-2 bg-gradient-to-r from-green-600 to-emerald-600 text-white px-6 py-3 rounded-lg hover:from-green-700 hover:to-emerald-700 transition w-full lg:w-auto"
          >
            <FaSearch />
            Search
          </button>
        </div>

        {/* SORT DROPDOWN */}
        <div className="mt-4 flex justify-end">
          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            className="border border-green-400 rounded-lg px-3 py-2 outline-none"
          >
            <option value="none">Sort by Price</option>
            <option value="asc">Low to High</option>
            <option value="desc">High to Low</option>
          </select>
        </div>
      </div>

      {/* RESULTS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {currentTickets.length > 0 ? (
          currentTickets.map((ticket) => (
            <TicketCard key={ticket._id} ticket={ticket} />
          ))
        ) : (
          <p className="text-center text-gray-500 col-span-full">
            No tickets found
          </p>
        )}
      </div>

      {/* PAGINATION */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-6 gap-2">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`px-4 py-2 rounded-lg font-medium border ${
                currentPage === page
                  ? "bg-green-600 text-white border-green-600"
                  : "bg-base-100 text-gray-700 border-gray-300 hover:bg-green-100"
              }`}
            >
              {page}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default AllTickets;
