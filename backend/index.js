import express from "express"
import path from "path"

import authRoutes from './routes/auth.route.js'
import messageRoutes from './routes/message.route.js'
import { connectDB } from "./db/db.js"
import { ENV } from "./utils/ENV.js"

const app = express()
const _dirname = path.resolve()

const PORT = ENV.PORT || 3000
app.use(express.json())

app.use("/api/auth", authRoutes)
app.use("/api/messages", messageRoutes)

// make ready for deployment
if (ENV.NODE_ENV == "production") {
    app.use(express.static(path.join(_dirname, "../frontend/dist")))

    app.get("*", (_, res) => {
        res.sendFile(path.join(_dirname, "../frontend", "dist", "index.html"))
    })
}

connectDB()
    .then(() => {
        app.listen(PORT, (req, res) => {
            console.log(`Server is running on the port http://localhost:${PORT}`)
        })
    })
    .catch((err) => console.log("Error in connecting to Database"))