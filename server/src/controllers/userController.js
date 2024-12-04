const userModel = require("../models/userModel")


const profile = async(req, res) => {
  const { id } = req.body.user
 
  
  const user = await userModel.findById(id)
  console.log(user);
  
  
  if (!user) {
    return res.status(403).json({ success: false, message: "Forbidden, user dont exist" })
  }
  res.status(200).json({ success: true, user })
}

module.exports ={ profile }