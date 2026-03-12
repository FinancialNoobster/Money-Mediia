import Employee from "../models/Employee.js"
import Leave from "../models/Leave.js"

const addLeave = async (req, res) => {
    try {
        const {userId, leaveType, startDate, endDate, reason} = req.body

        const newLeave = new Leave({
            employeeId: userId,
            leaveType,
            startDate,
            endDate,
            reason
        })

        await newLeave.save()

        return res.status(200).json({
            success: true
        })
    } catch(error) {
        return res.status(500).json({
            success: false,
            error: "Leave Add Server Error"
        })
    }
}

const getLeaves = async (req, res) => {
    try {
        const {id} = req.params; 
        const employee = await Employee.findOne({userId:id})
        const leaves = await Leave.find({employeeId: employee.userId})
        return res.status(200).json({success: true, leaves})
    }catch(error) {
        return res.status(500).json({
            success: false,
            error: "Leaves get Server Error"
        })
    }
}

export {addLeave, getLeaves}