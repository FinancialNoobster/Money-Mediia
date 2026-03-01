import React from 'react'
import { FaUser } from 'react-icons/fa'
import { useAuth } from '../../context/authContext.jsx'

const SummaryCard = () => {
    const {user} = useAuth()
  return (
    <div className='p-6'>
      <h3 className='text-2xl font-bold '>Employee Overview</h3>
      <div className='grid grid-cols-1 md:grid-cols-3 gap-4 mt-6'>
      <div className='rounded flex bg-gray-200'>
      <div className={`text-3xl flex justify-center items-center bg-teal-600 text-white px-4`}>
        <FaUser />
      </div>
      <div className='pl-4 py-1'>
        <p className='text-lg font-semibold'>Welcome Back!</p>
        <p className='text-xl font-bold'>{user.name}</p>
      </div>
    </div>
    </div>
    </div>
  )
}

export default SummaryCard
