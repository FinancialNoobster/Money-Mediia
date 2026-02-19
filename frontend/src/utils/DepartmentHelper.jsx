import axios from "axios"
import { useNavigate } from "react-router-dom"

export const columns = [
    {
        name: "S No",
        selector: (row) => row.sno

    },
    {
        name: "Department Name",
        selector: (row) => row.dep_name,
        sortable: true
    },
    {
        name: "Action",
        selector: (row) => row.action
    }
]

export const DepartmentButton = ({_id, onDepartmentDelete}) => {
    const navigate = useNavigate()
    const handleDelete = async (id) => {
        const confirm = window.confirm("Do you want to Delete?")
        if (confirm) {        
        try{
            const response = await axios.delete(
            `http://localhost:5000/api/departments/${id}`,
            {
                headers: {
                "Authorization": `Bearer ${localStorage.getItem('token')}`
        }});
        if (response.data.success) {
            onDepartmentDelete(_id)
        }
        } catch (error) {
            if(error.response && !error.response.data.success){
                 alert(error.response.data.error)
            }
        }
        }
    };
    return (
        <div className="flex space-x-3 ">
            <button className="px-3 py-1 bg-gray-500 hover:bg-gray-400 text-white font-bold py-2 px-4 rounded"
                onClick={() => navigate(`/admin-dashboard/department/${_id}`)}
            >Edit</button>
            <button className="px-3 py-1 bg-red-500 hover:bg-red-300 text-white font-bold py-2 px-4 rounded"
            onClick={() => handleDelete(_id)}
            >Delete</button>
        </div>
    )
}