import React from 'react'
import { useAuth } from '../context/authContext.jsx'
import { useNavigate } from 'react-router-dom'

const AdminDashboard = () => {
  const {user, loading} = useAuth()
  const navigate = useNavigate()
  if (loading) {
    return
    <div>loading.....</div>
  }
  if (!user) {
    navigate('/login')
  }
  return (
    <div>
      AdminDashboard
      <pre>
      Id: {user._id}  </pre> 
      <pre>
      Role: {user.role}  </pre> 
      <pre>
      Name: {user.name}  </pre> 
     
    </div>
  )
}

export default AdminDashboard
