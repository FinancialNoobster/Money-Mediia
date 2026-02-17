import React from 'react'
import { useAuth } from '../context/authContext.jsx'

const AdminDashboard = () => {
  const {user, logout} = useAuth()

  const handleClick = async () =>{
    logout()
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
      <button onClick={handleClick}>Logout</button>
    </div>
  )
}

export default AdminDashboard
