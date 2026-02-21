import express from "express"
import 'dotenv/config'
import authRoutes from './routes/auth.route.js'
import messageRoutes from './routes/message.route.js'

const app = express()
const PORT = process.env.PORT || 3000
app.use(express.json())

//Auth Router 
app.use("/api/auth", authRoutes)
// Message Router
app.use("/api/messages", messageRoutes)

app.listen(PORT, (req, res) => {
    console.log(`Server is running on the port http://localhost:${PORT}`)
})