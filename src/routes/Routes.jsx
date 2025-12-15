
import ErrorPage from '../pages/ErrorPage'
import Login from '../pages/Login'
import SignUp from '../pages/SignUp'

// import Statistics from '../pages/Dashboard/Common/Statistics'
import MainLayout from '../layouts/MainLayout'

import { createBrowserRouter } from 'react-router'
import Home from '../pages/Home'
import AddTicketForm from '../pages/AddTicketForm'
import AllTickets from '../pages/AllTickets'
import TicketDetails from '../pages/TicketDetails'
import PrivateRoute from './PrivateRoute'
import DashboardLayout from '../layouts/DashboardLayout'
import MyBooking from '../pages/DashBoard/User/MyBooking'
import UserProfile from '../pages/DashBoard/User/userProfile'
import PaymentSuccess from '../pages/PaymentSuccess'
import TransactionHistory from '../pages/DashBoard/User/TransactionHistory'
import MyAddedTickets from '../pages/DashBoard/Vendor/MyAddedTickets'
import VendorBookings from '../pages/DashBoard/Vendor/VendorBookings'
import Profile from '../pages/DashBoard/Common/Profile'
import ManageUsers from '../pages/DashBoard/Admin/ManageUsers'
import ManageTickets from '../pages/DashBoard/Admin/ManageTickets'
import RevenueOverview from '../pages/DashBoard/Vendor/RevenueOverview'
import AdvertiseTickets from '../pages/DashBoard/Admin/AdvertiseTickets'
import Contact from '../pages/Contact'
import AboutUs from '../pages/AboutUs'
import VendorRoute from './VendorRoute'
import AdminRoute from './AdminRoute'
export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: <Home/>,
      },
      {
  path: "/ticket/:id",
  element: (
    <PrivateRoute>
      <TicketDetails/>
    </PrivateRoute>
  ),
},
{
        path: '/payment-success',
        element: <PaymentSuccess/>,
      },
     { path: '/all-tickets', element: <PrivateRoute><AllTickets/></PrivateRoute> },
         
      { path: '/contact', element: <Contact/> },
          { path: '/about', element: <AboutUs/> },
        
      { path: '/login', element: <Login /> },
  { path: '/signup', element: <SignUp /> },
    ],
  },

  {
    path: '/dashboard',
    element: (
      <PrivateRoute>
        <DashboardLayout/>
      </PrivateRoute>
    ),
    children: [
      {
        index: true,
        element: (
          <PrivateRoute>
           <UserProfile/>
          </PrivateRoute>
        ),
      },
        { path: 'add-ticket', 
          element: <PrivateRoute><AddTicketForm/></PrivateRoute> },
      {
        path: 'bookings',
        element: (
          <PrivateRoute>
            <MyBooking/>
          </PrivateRoute>
        ),
      },
       {
        path: 'transactions',
        element: (
          <PrivateRoute>
            <TransactionHistory></TransactionHistory>
          </PrivateRoute>
        ),
      },

      {
  path: "my-tickets",
  element: (
    <PrivateRoute>
    <VendorRoute> <MyAddedTickets/></VendorRoute>
    </PrivateRoute>
  ),
}
,
{ path: "vendor-bookings",
  element: (
    <PrivateRoute>
      <VendorRoute><VendorBookings/></VendorRoute>
    </PrivateRoute>
  ),
},
{ path: "vendor-revenue",
  element: (
    <PrivateRoute>
      <VendorRoute><RevenueOverview/></VendorRoute>
    </PrivateRoute>
  ),
},
      {
        path: 'profile',
        element: (
          <PrivateRoute>
            <Profile/>
          </PrivateRoute>
        ),
      },
        // ADMIN ROUTES (Add these)
  {
    path: "manage-users",
    element: (
      <PrivateRoute>
        <AdminRoute><ManageUsers/></AdminRoute>
      </PrivateRoute>
    ),
  },
  // {
  //   path: "admin-stats",
  //   element: (
  //     <PrivateRoute>
  //       <Statistics />
  //     </PrivateRoute>
  //   ),
  // },
  {
    path: "manage-tickets",
    element: (
      <PrivateRoute>
        <AdminRoute><ManageTickets/></AdminRoute>
      </PrivateRoute>
    ),
  },
   {
    path: "advertise-tickets",
    element: (
      <PrivateRoute>
      <AdminRoute>  <AdvertiseTickets/></AdminRoute>
      </PrivateRoute>
    ),
  }

    ],
  },
])