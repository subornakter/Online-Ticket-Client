import React, { useEffect, useState } from 'react'
import axios from 'axios'
import TicketCard from '../components/TicketCard'
import LoadingSpinner from '../components/LoadingSpinner'
import useAuth from '../hooks/useAuth'
import { FaSearch, FaMapMarkerAlt, FaCalendarAlt } from "react-icons/fa";

const AllTickets = () => {
  const [tickets, setTickets] = useState([])
  const [loading, setLoading] = useState(true)
  const { user } = useAuth()

  // Search States
  const [searchFrom, setSearchFrom] = useState("")
  const [searchTo, setSearchTo] = useState("")
  const [searchDate, setSearchDate] = useState("")

  // Load ALL tickets initially
  useEffect(() => {
    const fetchTickets = async () => {
      if (!user) return
      try {
        const token = await user.getIdToken()
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/tickets`, {
          headers: { Authorization: `Bearer ${token}` }
        })
        setTickets(res.data)
      } catch (err) {
        console.log(err)
      } finally {
        setLoading(false)
      }
    }
    fetchTickets()
  }, [user])

  // SEARCH FUNCTION
  const handleSearch = async () => {
    if (!user) return
    try {
      setLoading(true)

      const token = await user.getIdToken()

      const queryParams = new URLSearchParams({
        from: searchFrom,
        to: searchTo,
        date: searchDate
      }).toString()

      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/tickets/search?${queryParams}`,
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      )

      setTickets(res.data)
    } catch (err) {
      console.log("Search error:", err)
    } finally {
      setLoading(false)
    }
  }

  if (loading) return <LoadingSpinner />

  return (
    <div className="p-5">

      {/* 🔍 NEW STYLISH SEARCH BAR */}
      <div className="bg-white shadow-lg rounded-xl p-4 mb-6">
        
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

          {/* SEARCH BUTTON */}
          <button
            onClick={handleSearch}
            className="flex items-center justify-center gap-2 bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition w-full lg:w-auto"
          >
            <FaSearch />
            Search
          </button>

        </div>
      </div>

      {/* RESULTS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {tickets.length > 0 ? (
          tickets.map(ticket => (
            <TicketCard key={ticket._id} ticket={ticket} />
          ))
        ) : (
          <p className="text-center text-gray-500 col-span-full">
            No tickets found
          </p>
        )}
      </div>

    </div>
  )
}

export default AllTickets




