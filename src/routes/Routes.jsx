
import ErrorPage from '../pages/ErrorPage'
import Login from '../pages/Login'
import SignUp from '../pages/SignUp'
// import PlantDetails from '../pages/PlantDetails/PlantDetails'
// import PrivateRoute from './PrivateRoute'
// import DashboardLayout from '../layouts/DashboardLayout'
// import AddPlant from '../pages/Dashboard/Seller/AddPlant'
// import ManageUsers from '../pages/Dashboard/Admin/ManageUsers'
// import Profile from '../pages/Dashboard/Common/Profile'
// import Statistics from '../pages/Dashboard/Common/Statistics'
import MainLayout from '../layouts/MainLayout'
// import MyInventory from '../pages/Dashboard/Seller/MyInventory'
// import ManageOrders from '../pages/Dashboard/Seller/ManageOrders'
// import MyOrders from '../pages/Dashboard/Customer/MyOrders'
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
     { path: '/all-tickets', element: <AllTickets/> },
        
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
          element: <AddTicketForm/> },
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
      <MyAddedTickets/>
    </PrivateRoute>
  ),
}
,
{ path: "vendor-bookings",
  element: (
    <PrivateRoute>
      <VendorBookings/>
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
      // {
      //   path: 'my-inventory',
      //   element: (
      //     <PrivateRoute>
      //       <MyInventory />
      //     </PrivateRoute>
      //   ),
      // },
      // {
      //   path: 'manage-users',
      //   element: (
      //     <PrivateRoute>
      //       <ManageUsers />
      //     </PrivateRoute>
      //   ),
      // },
      // {
      //   path: 'profile',
      //   element: (
      //     <PrivateRoute>
      //       <Profile />
      //     </PrivateRoute>
      //   ),
      // },
      // {
      //   path: 'my-orders',
      //   element: (
      //     <PrivateRoute>
      //       <MyOrders />
      //     </PrivateRoute>
      //   ),
      // },
      // {
      //   path: 'manage-orders',
      //   element: <ManageOrders />,
      // },
    ],
  },
])