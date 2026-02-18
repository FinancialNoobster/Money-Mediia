import React from 'react'
import { useAuth } from '../../context/authContext.jsx'

const Navbar = () => {
    const {user, logout} = useAuth()

    const handleLogout = async => {
        logout()
    }
  return (
    <div className='flex items-center justify-between h-12 bg-black text-white px-5'>
      <p>Welcome {user.name}</p>
      <button onClick={handleLogout} className='text-black px-4 py-1 bg-white hover:bg-teal-800 duration-300'>Logout</button>
    </div>
  )
}

export default Navbar
