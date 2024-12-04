const userModel = require("../models/userModel")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

const login = async (req, res) => {
    console.log("Am here");

    const { email, password } = req.body
    const user = await userModel.findOne({ email })
    if (!user) {
        return res.status(404).json({ success: false, message: "User does not exist" })
    }

    const matchingPassword = await bcrypt.compare(password, user.password)

    if (!matchingPassword) {
        return res.status(400).json({ success: false, message: "Incorrect password" })
    }
    const accessToken = jwt.sign(
        { email: user.email, id: user._id },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "1d" }
    )
    const refreshToken = jwt.sign(
        { email: user.email, id: user._id },
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: "2d" }
    )

    res.cookie("accessToken", accessToken, {
        maxAge: 1 * 60 * 1000,
        httpOnly: true,
        // secure: true,
        // sameSite: none
    })
    res.cookie("refreshToken", refreshToken, {
        maxAge: 2  * 60 * 1000,
        httpOnly: true,
        // secure: true,
        // sameSite: none
    })

    

    res.status(200).json({ success: true, message: "Login successfully", user })

}

module.exports = { login }