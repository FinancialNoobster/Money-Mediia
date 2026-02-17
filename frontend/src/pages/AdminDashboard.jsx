import React from 'react'
import { useAuth } from '../context/authContext.jsx'

const AdminDashboard = () => {
  const {user} = useAuth()
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
