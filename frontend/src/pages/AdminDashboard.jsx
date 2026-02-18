import React from 'react'
import { useAuth } from '../context/authContext.jsx'
import AdminSideBar from '../components/dashboard/AdminSideBar.jsx'
import Navbar from '../components/dashboard/Navbar.jsx'

const AdminDashboard = () => {
  const {user, logout} = useAuth()
 
  return (
    <div className='flex'>
      <AdminSideBar />
      <div className='flex-1 ml-64 h-screen'>
        <Navbar />
      </div>
    </div>
  )
}

export default AdminDashboard
