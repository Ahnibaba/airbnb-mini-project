const path = require("path")
const imageDownloader = require("image-downloader")

const uploadLink = async(req, res) => {
    try{
        const { link } = req.body
        const newName = "photo" + Date.now() + ".jpg"
        await imageDownloader.image({
            url: link,
            dest: path.join(__dirname, "..", "..", "uploads", newName)
        })
        console.log(path.join(__dirname, "..", "uploads", newName));
        
        res.status(200).json({ success: true, message: "Image successfully uploaded", image: newName })
    }catch(err){
      console.log(err);
      res.status(200).json({ success: false, message: "Upload failed" })
      
    }
}

module.exports = { uploadLink }