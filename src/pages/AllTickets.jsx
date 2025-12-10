import React, { useEffect, useState } from 'react'
import axios from 'axios'
import TicketCard from '../components/TicketCard'
import LoadingSpinner from '../components/LoadingSpinner'
import useAuth from '../hooks/useAuth'

const AllTickets = () => {
  const [tickets, setTickets] = useState([])
  const [loading, setLoading] = useState(true)
  const { user } = useAuth()

  useEffect(() => {
    const fetchTickets = async () => {
      if (!user) return
      try {
        // Get Firebase token
        const token = await user.getIdToken()
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/tickets`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
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

  if (loading) return <LoadingSpinner />

  return (
    <div className="p-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {tickets.map(ticket => (
        <TicketCard key={ticket._id} ticket={ticket} />
      ))}
    </div>
  )
}

export default AllTickets

