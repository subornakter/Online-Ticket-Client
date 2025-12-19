import { Outlet } from 'react-router'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
const MainLayout = () => {
  return (
    <div>
      <Navbar/>
      <div className='pt-24 min-h-[calc(100vh-68px)] bg-base-100 data-[theme=dark]:bg-slate-900 text-base-content'>
        <Outlet />
      </div>
      <Footer />
    </div>
  )
}

export default MainLayout
