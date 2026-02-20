import axios from "axios"


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