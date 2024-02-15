import express from "express"
import homeRoute from "./routes/homeRoute"
import authRoute from "./routes/auth"
import cors from "cors"
import {config} from "dotenv"
config()

const app = express()

app.use(
    cors({
      origin: "*",
    })
);

app.use(express.json())
app.use("/", homeRoute)
app.use("/auth", authRoute)

export default app