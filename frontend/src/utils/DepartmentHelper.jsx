import { useNavigate } from "react-router-dom"

export const columns = [
    {
        name: "S No",
        selector: (row) => row.sno
    },
    {
        name: "Department Name",
        selector: (row) => row.dep_name
    },
    {
        name: "Action",
        selector: (row) => row.action
    }
]

export const DepartmentButton = ({_id}) => {
    const navigate = useNavigate()
    return (
        <div className="flex space-x-3 ">
            <button className="px-3 py-1 bg-gray-500 hover:bg-gray-400 text-white font-bold py-2 px-4 rounded"
                onClick={() => navigate(`/admin-dashboard/department/${_id}`)}
            >Edit</button>
            <button className="px-3 py-1 bg-red-500 hover:bg-red-300 text-white font-bold py-2 px-4 rounded">Delete</button>
        </div>
    )
}