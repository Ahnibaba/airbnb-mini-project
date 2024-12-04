
const logout = async (req, res) => {
    try {
        res.cookie("accessToken", "")
        res.cookie("refreshToken", "")

        res.status(200).json({ success: true, message: "Logout successful" })
    } catch (err) {
        console.log(err);
        res.status(400).json({ success: false, error: err })
    }


}

module.exports = logout