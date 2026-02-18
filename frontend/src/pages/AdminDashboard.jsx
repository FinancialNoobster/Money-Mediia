import React from 'react'
import { useAuth } from '../context/authContext.jsx'
import AdminSideBar from '../components/dashboard/AdminSideBar.jsx'
import Navbar from '../components/dashboard/Navbar.jsx'
import AdminSummary from '../components/dashboard/AdminSummary.jsx'

const AdminDashboard = () => {
  const {user, logout} = useAuth()
 
  return (
    <div className='flex'>
      <AdminSideBar />
      <div className='flex-1 ml-64 h-screen'>
        <Navbar />
        <AdminSummary />
      </div>
    </div>
  )
}

export default AdminDashboard
