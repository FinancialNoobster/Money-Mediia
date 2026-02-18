import React from 'react'
import { useAuth } from '../context/authContext.jsx'
import AdminSideBar from '../components/dashboard/AdminSideBar.jsx'

const AdminDashboard = () => {
  const {user, logout} = useAuth()
 
  return (
    <div>
      <AdminSideBar />
    </div>
  )
}

export default AdminDashboard
