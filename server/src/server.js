require("dotenv").config()
const http = require("http")

const app = require("./app")
const { connectDB } = require("./config/db")

const PORT = process.env.PORT || 4321

const server = http.createServer(app)


async function startServer() {
   await connectDB()
   server.listen(PORT, () => {
    console.log(`Server started at http://localhost:${PORT}`);
    
})
}

startServer()