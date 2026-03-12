import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/authContext'
import axios from 'axios'

const Setting = () => {

  const { user } = useAuth()
  const navigate = useNavigate()

  const [setting, setSetting] = useState({
    userId: user._id,
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  })

  const [error, setError] = useState(null)

  const handleChange = (e) => {
    const { name, value } = e.target
    setSetting((prevState) => ({
      ...prevState,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (setting.newPassword !== setting.confirmPassword) {
      setError("New password and confirm password do not match")
      return
    }

    try {
      const response = await axios.post(
        `http://localhost:5000/api/employee/change-password`,
        setting,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        }
      )

      if (response.data.success) {
        navigate('/employee-dashboard')
      }

    } catch (err) {
      setError(err.response?.data?.error || "Something went wrong")
    }
  }

  return (
    <div className='px-6 mx-6 mt-4'>
      <h2 className="text-2xl font-bold mb-6">Change Password</h2>
      <p className="text-red-500">{error}</p>

      <form onSubmit={handleSubmit}>

        <div>
          <label className="text-sm font-medium text-gray-700">
            Old Password
          </label>

          <input
            type="password"
            name="oldPassword"
            placeholder="Old Password"
            onChange={handleChange}
            className="mt-1 w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>

        <div>
          <label className="text-sm font-medium text-gray-700">
            New Password
          </label>

          <input
            type="password"
            name="newPassword"
            placeholder="New Password"
            onChange={handleChange}
            className="mt-1 w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>

        <div>
          <label className="text-sm font-medium text-gray-700">
            Confirm Password
          </label>

          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            onChange={handleChange}
            className="mt-1 w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full mt-6 bg-teal-600 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded"
        >
          Change Password
        </button>

      </form>
    </div>
  )
}

export default Setting