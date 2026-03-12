import Users from "../models/Users.js"
import bcrypt from "bcryptjs"

const changePassword = async (req, res) => {
  try {

    const { userId, oldPassword, newPassword } = req.body

    const user = await Users.findById(userId)

    if (!user) {
      return res.status(404).json({
        success: false,
        error: "User Not Found"
      })
    }

    const isMatch = await bcrypt.compare(oldPassword, user.password)

    if (!isMatch) {
      return res.status(400).json({
        success: false,
        error: "Old Password is Incorrect"
      })
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10)

    await Users.findByIdAndUpdate(userId, {
      password: hashedPassword
    })

    return res.status(200).json({
      success: true,
      message: "Password Changed Successfully"
    })

  } catch (error) {

    return res.status(500).json({
      success: false,
      error: "Change Password Server Error"
    })

  }
}

export { changePassword }