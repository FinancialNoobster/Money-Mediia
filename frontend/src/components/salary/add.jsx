import React, { useEffect, useState } from 'react'
import { fetchDepartmnets, getEmployees } from '../../utils/EmployeeHelper.jsx'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'

const Add = () => {
const [employee, setEmployee] = useState({
    name: '',
    maritalStatus: '',
    designation: '',
    salary: 0,
    departments: ''
})
const [departments, setDepartments] = useState(null)
const [employees, setemployees] = useState(null)
const navigate = useNavigate()
const {id} = useParams()

    useEffect (() => {
            const getDepartments = async () => {
                const departments = await fetchDepartmnets()
                setDepartments(departments)
            }
            getDepartments()
        }, [])

    useEffect (() => {
        const fetchEmployee = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/employee/${id}`,{
          headers: {
            "Authorization" : `Bearer ${localStorage.getItem('token')}`
          }
        })
        if (response.data.success) {
            const employee = response.data.employee
            setEmployee((prev)=> ({
                ...prev,
                name: employee.userId.name,
                maritalStatus: employee.maritalStatus,
                designation: employee.designation,
                salary: employee.salary,
                department: employee.department
            }))
        }
      } catch (error){
        if(error.response && !error.response.data.success){
        alert(error.response.data.error)
      }
      }
    }
    fetchEmployee();
    }, [])

    const handeDepartment = async(e) => {
        const emps = await getEmployees(e.target.value)
        setemployees(emps)
    }
    const handlechange = (e) => {
        const {name, value} = e.target
        setEmployee ((prevData) => ({...prevData, [name]: value}))
    }
    const handleSubmit = async(e) => {
        e.preventDefault();
        try{
      const response = await axios.put(`http://localhost:5000/api/employee/${id}`, 
        employee, {
        headers: {
          "Authorization": `Bearer ${localStorage.getItem('token')}`
        }}
      )
      if (response.data.success){
        navigate("/admin-dashboard/employees")
      }
    } catch(error) {
      if(error.response && !error.response.data.success){
        alert(error.response.data.error)
      }
    }
    }
    
  return (
    <>{departments && employee ? (
    <div className='max-w-4xl mx-auto mt-10 bg-white p-8 rounded-md shadow-md'>
        <h2 className='text-2xl font-bold mb-6'>Add Salary</h2>
        <form onSubmit={handleSubmit}>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                {/* Department */}
                <div className='col-span-2'>
                <label className="block text-sm font-medium text-gray-700">
                    Department
                </label>

                <select
                    name="department"
                    onChange={handeDepartment}
                    value={employee.department}
                    className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                    required
                >
                    <option value="">Select Department</option>
                    {departments.map(dep => (
                    <option key={dep._id} value={dep._id}>
                        {dep.dep_name}
                    </option>
                ))}

                </select>
                </div>
                
                {/* Employee */}
                <div className='col-span-2'>
                <label className="block text-sm font-medium text-gray-700">
                    Employee
                </label>

                <select
                    name="department"
                    onChange={handlechange}
                    className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                    required
                >
                    <option value="">Select Employee</option>
                    {employees.map(emp => (
                    <option key={emp._id} value={emp._id}>
                        {emp.employeeId}
                    </option>
                ))}

                </select>
                </div>
                {/* Marital Status */}
                <div>
                <label className="block text-sm font-medium text-gray-700">
                    Marital Status
                </label>

                <select
                    name="maritalStatus"
                    onChange={handlechange}
                    value={employee.maritalStatus}
                    placeholder = "Marital Status"
                    className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                    required
                >
                    <option value="">Select Status</option>
                    <option value="single">Single</option>
                    <option value="married">Married</option>
                </select>
                </div>
                {/* Designation */}
                <div>
                <label className="block text-sm font-medium text-gray-700">
                    Designation
                </label>

                <input
                    type="text"
                    name="designation"
                    onChange={handlechange}
                    value={employee.designation}
                    placeholder="Designation"
                    className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                    required
                />
                </div>
                {/* Salary */}
                <div>
                <label className="block text-sm font-medium text-gray-700">
                    Salary
                </label>

                <input
                    type="number"
                    name="salary"
                    onChange={handlechange}
                    value={employee.salary}
                    placeholder="Salary"
                    className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                    required
                />
                </div>
                 {/* Department */}
                <div className='col-span-2'>
                <label className="block text-sm font-medium text-gray-700">
                    Department
                </label>

                <select
                    name="department"
                    onChange={handlechange}
                    value={employee.department}
                    className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                    required
                >
                    <option value="">Select Department</option>
                    {departments.map(dep => (
                    <option key={dep._id} value={dep._id}>
                        {dep.dep_name}
                    </option>
                ))}

                </select>
                </div>
            </div>
            <button
            type="submit"
            className="w-full mt-6 bg-teal-600 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded"
            >
            Edit Employee
            </button>
        </form>
    </div>
    ) : <div>Loading..</div>}</>
  )
}

export default Add
