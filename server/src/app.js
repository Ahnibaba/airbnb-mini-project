const path = require("path")
const express = require("express")
const cors = require("cors")
const cookieParser = require("cookie-parser")

const registerRouter = require("./routes/registerRoute")
const loginRouter = require("./routes/loginRoute")
const userRouter = require("./routes/userRoute")
const logoutRouter = require("./routes/logoutRoute")
const uploadLinkRouter = require("./routes/uploadLinkRoute")
const uploadRouter = require("./routes/uploadRoute")
const placesRouter = require("./routes/placesRoute")
const bookRouter = require("./routes/bookRoute")

const origin = "https://airbnb-mini-project.vercel.app"
//const origin = "http://localhost:5173"


const app = express()


app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use("/uploads", express.static(path.join(__dirname, "..", "uploads")))
app.use(express.static(path.join(__dirname, "..", "public")))
app.use(cors({
    origin: origin,
    credentials: true
}))
app.use(cookieParser())

    app.use("/", registerRouter)
    app.use("/", loginRouter)
    app.use("/", userRouter)
    app.use("/", logoutRouter)
    app.use("/", uploadLinkRouter)
    app.use("/", uploadRouter)
    app.use("/places", placesRouter)
    app.use("/bookings", bookRouter)


app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, "..", "public", "index.html"));
  });
  
app.get("/test", (req, res) => {
    res.json("test ok")
    
})

module.exports = app