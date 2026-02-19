import React from 'react'
import {Link} from "react-router-dom"
import DataTable from 'react-data-table-component'
import {columns, DepartmentButton } from '../../utils/DepartmentHelper.jsx'
import { useEffect } from 'react'
import { useState } from 'react'
import axios from 'axios'

const DepartmentList = () => {
  const [department, setDepartment] = useState([])
  const [depLoading, setDepLoading] = useState(false)

  const onDepartmentDelete = async (id) => {
    const data = department.filter(dep => dep._id !== id)
    setDepartment(data)
  }

  useEffect(() => {
    const fetchDepartmnets = async () => {
      setDepLoading(true)
      try {
        const response = await axios.get('http://localhost:5000/api/departments',{
          headers: {
            "Authorization" : `Bearer ${localStorage.getItem('token')}`
          }
        })
        if (response.data.success) {
          let sno = 1;
          const data = await response.data.department.map((dep) => (
            {
              _id: dep._id,
              sno: sno++,
              dep_name: dep.dep_name,
              action: (<DepartmentButton _id={dep._id} onDepartmentDelete={onDepartmentDelete}/>)
            }
          ))
          setDepartment(data)
        }
      } catch (error){
        if(error.response && !error.response.data.success){
        alert(error.response.data.error)
      }
      } finally{
        setDepLoading(false)
      }
    }
    fetchDepartmnets();
  }, [])
  return (
    <>{depLoading ? <div>Loading...</div> :
    <div className='p-5'>
    <div className='text-center '>
      <h3 className='text-2xl font-bold'>Manage Departments</h3>
      </div>
      <div className='flex justify-between items-center '>
        <input type="text" placeholder='Search By Dep Name' className='px-4 py-0.5 border'/>
        <Link to="/admin-dashboard/add-department" className='px-4 py-1 bg-gray-500 hover:bg-gray-400 rounded text-white'>
        Add New Department</Link>
      </div>
      <div className='mt-5'>
        <DataTable 
         columns={columns}
         data={department}
        />
      </div>
    </div>
    }</>
  )
}

export default DepartmentList
