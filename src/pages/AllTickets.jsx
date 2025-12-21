import React, { useEffect, useState } from "react";
import axios from "axios";
import TicketCard from "../components/TicketCard";
import LoadingSpinner from "../components/LoadingSpinner";
import useAuth from "../hooks/useAuth";
import {
  FaSearch,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaFilter,
} from "react-icons/fa";

const AllTickets = () => {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  // Search States
  const [searchFrom, setSearchFrom] = useState("");
  const [searchTo, setSearchTo] = useState("");
  const [searchDate, setSearchDate] = useState("");

  // Sorting
  const [sortOrder, setSortOrder] = useState("none");

  // ✅ Transport Filter
  const [transportType, setTransportType] = useState("all");

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const ticketsPerPage = 6;

  // Load ALL tickets
  useEffect(() => {
    const fetchTickets = async () => {
      if (!user) return;
      try {
        const token = await user.getIdToken();
        const res = await axios.get(
          `https://online-ticket-system-server.vercel.app/tickets`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setTickets(res.data);
        console.log("Fetched tickets:", res.data);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };
    fetchTickets();
  }, [user]);

  // SEARCH
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
        `https://online-ticket-system-server.vercel.app/tickets/search?${queryParams}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setTickets(res.data);
      setCurrentPage(1);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  // ✅ FILTER BY TRANSPORT
  const filteredTickets =
    transportType === "all"
      ? tickets
      : tickets.filter(
          (t) => t.transport_type === transportType
        );

  // SORT
  const sortedTickets = [...filteredTickets].sort((a, b) => {
    if (sortOrder === "asc") return a.price - b.price;
    if (sortOrder === "desc") return b.price - a.price;
    return 0;
  });

  // PAGINATION
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
      {/* TITLE */}
      <h1 className="mb-6 text-3xl font-bold text-center text-transparent md:text-4xl bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text">
        Explore All Tickets
      </h1>

      {/* SEARCH + FILTER BAR */}
      <div className="p-4 mb-6 shadow-lg bg-base-100 rounded-xl">
        <div className="flex flex-col items-center gap-4 lg:flex-row">
          {/* From */}
          <div className="flex items-center w-full gap-2 px-4 py-3 border border-green-400 rounded-lg">
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
          <div className="flex items-center w-full gap-2 px-4 py-3 border border-green-400 rounded-lg">
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
          <div className="flex items-center w-full gap-2 px-4 py-3 border border-green-400 rounded-lg">
            <FaCalendarAlt className="text-green-600" />
            <input
              type="date"
              value={searchDate}
              onChange={(e) => setSearchDate(e.target.value)}
              className="w-full outline-none"
            />
          </div>

          {/* Search */}
          <button
            onClick={handleSearch}
            className="flex items-center justify-center w-full gap-2 px-6 py-3 text-white rounded-lg bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 lg:w-auto"
          >
            <FaSearch /> Search
          </button>
        </div>

        {/* SORT + FILTER */}
        <div className="flex flex-wrap items-center justify-end gap-3 mt-4">
          {/* Transport Filter */}
          <select
            value={transportType}
            onChange={(e) => {
              setTransportType(e.target.value);
              setCurrentPage(1);
            }}
            className="px-3 py-2 border border-green-400 rounded-lg outline-none"
          >
            <option value="all">All Transport</option>
            <option value="bus">Bus</option>
            <option value="train">Train</option>
            <option value="launch">Launch</option>
            <option value="plane">Plane</option>
          </select>

          {/* Sort */}
          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            className="px-3 py-2 border border-green-400 rounded-lg outline-none"
          >
            <option value="none">Sort by Price</option>
            <option value="asc">Low to High</option>
            <option value="desc">High to Low</option>
          </select>
        </div>
      </div>

      {/* RESULTS */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
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
        <div className="flex justify-center gap-2 mt-6">
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

