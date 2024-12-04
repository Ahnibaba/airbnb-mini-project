const userModel = require("../models/userModel")
const bcrypt = require("bcryptjs")


const register = async (req, res) => {
    const { name, email, password } = req.body
       
    try {
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)
    
        const user = new userModel({
            name,
            email,
            password: hashedPassword
        })
        const newUser = await user.save()
    
        res.status(200).json({ success: true, message: "Registration Successful", newUser})
    
    } catch (err) {
       res.status(422).json({ success: false, error: err })
    }
}

module.exports = { register }