import { Navigate } from 'react-router'
import LoadingSpinner from '../components/LoadingSpinner'
import useRole from '../hooks/useRole'

const CustomerRoute = ({ children }) => {
  const [role, isRoleLoading] = useRole()

  if (isRoleLoading) return <LoadingSpinner />
  if (role === 'customer') return children
  return <Navigate to='/' replace='true' />
}

export default CustomerRoute