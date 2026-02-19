import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'

const EditDepartment = () => {
    const{id} = useParams()
    const [depEditLoading, setEditDepLoading] = useState(false)
    const [department, setDepartment] = useState([])

      useEffect(() => {
      const fetchDepartmnets = async () => {
      setEditDepLoading(true)
      try {
        const response = await axios.get(`http://localhost:5000/api/departments/${id}`,{
          headers: {
            "Authorization" : `Bearer ${localStorage.getItem('token')}`
          }
        })
        if (response.data.success) {
            setDepartment(response.data.department)
        }
      } catch (error){
        if(error.response && !error.response.data.success){
        alert(error.response.data.error)
      }
      } finally{
        setEditDepLoading(false)
      }
    }
    fetchDepartmnets();
  }, [])
  const handleChange = (e) =>{
    const{name, value} = e.target;
    setDepartment({...department, [name] : value})
  }
  
  return (
    <>{depEditLoading ? <div>Loading...</div> :
    <div className='max-w-3xl mx-auto mt-10 bg-white p-8 rounded-md shadow-md w-96'>
        <h2 className='text-2xl font-bold mb-6'>Edit Department</h2>
        <form >
          <div>
            <label htmlFor="dep_name"
            className='text-sm font-medium text-gray-700'>Department Name</label>
            <input type="text" name="dep_name" placeholder='Enter Dep Name' 
            className='mt-1 w-full p-2 border border-gray-300 rounded-md'
            onChange={handleChange} value={department.dep_name} />
          </div>
          <div className='mt-3'>
            <label htmlFor="description"
            className='block text-sm font-medium text-gray-700'>Description</label>
            <textarea name="description" placeholder='Description'
            className='mt-1 p-2 block w-full border border-gray-300 rounded-md'
            rows="4" onChange={handleChange} value={department.description} ></textarea>
          </div>
          <button
          className='w-full mt-6 bg-gray-500 hover:bg-gray-400 text-white font-bold py-2 px-4 rounded'>
            Edit Department</button>
        </form>
    </div>
    }</>
  )
}

export default EditDepartment
