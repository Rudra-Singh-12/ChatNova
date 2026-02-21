import express from "express"
import 'dotenv/config'
import path from "path"

import authRoutes from './routes/auth.route.js'
import messageRoutes from './routes/message.route.js'

const app = express()
const _dirname = path.resolve()

const PORT = process.env.PORT || 3000
app.use(express.json())

//Auth Router 
app.use("/api/auth", authRoutes)
// Message Router
app.use("/api/messages", messageRoutes)

// make ready for deployment
if (process.env.NODE_ENV == "production") {
    app.use(express.static(path.join(_dirname, "../frontend/dist")))

    app.get("*", (_, res) => {
        res.sendFile(path.join(_dirname, "../frontend", "dist", "index.html"))
    })
}

app.listen(PORT, (req, res) => {
    console.log(`Server is running on the port http://localhost:${PORT}`)
})