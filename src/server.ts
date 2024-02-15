import express from "express"
import homeRoute from "./routes/homeRoute"


const app = express()

app.use("/", homeRoute)

export default app