import axios from "axios"
import { useNavigate } from "react-router-dom"

export const columns = [
    {
        name: "S No",
        selector: (row) => row.sno,
        width: "70px"

    },
    {
        name: "Name",
        selector: (row) => row.name,
        sortable: true,
        width: "150px"
    },
    {
        name: "Image",
        selector: (row) => row.profileImage,
        width: "90px"
    },
    {
        name: "Department",
        selector: (row) => row.dep_name,
        width: "120px"
    },
    {
        name: "DOB",
        selector: (row) => row.dob,
        sortable: true,
        width: "150px"
    },
    {
        name: "Action",
        selector: (row) => row.action,
        center: 'true'
    }
]

export const fetchDepartmnets = async () => {
    let departments   
    try {
        const response = await axios.get('http://localhost:5000/api/departments',{
          headers: {
            "Authorization" : `Bearer ${localStorage.getItem('token')}`
          }
        })
        if (response.data.success) {
          departments = response.data.department
        }
      } catch (error){
        if(error.response && !error.response.data.success){
        alert(error.response.data.error)
      }
      }
      return departments
    }

    export const EmployeeButton = ({_id}) => {
    const navigate = useNavigate()
    return (
        <div className="flex space-x-3 ">
            <button className="px-3 py-1 bg-gray-500 hover:bg-gray-400 text-white font-bold py-2 px-4 rounded"
                onClick={() => navigate(`/admin-dashboard/employees/${_id}`)}
            >View</button>
            <button className="px-3 py-1 bg-blue-500 hover:bg-blue-300 text-white font-bold py-2 px-4 rounded"
                onClick={() => navigate(`/admin-dashboard/employees/edit/${_id}`)}
            >Edit</button>
            <button className="px-3 py-1 bg-yellow-500 hover:bg-yellow-300 text-white font-bold py-2 px-4 rounded"
                onClick={() => navigate(`/admin-dashboard/employees/Salary/${_id}`)}
            >Salary</button>
            <button className="px-3 py-1 bg-red-500 hover:bg-red-300 text-white font-bold py-2 px-4 rounded"
                onClick={() => navigate(`/admin-dashboard/employees/Leave/${_id}`)}
            >Leave</button>
        </div>
    )
}