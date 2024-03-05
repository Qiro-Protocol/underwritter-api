import express from "express";
import homeRoute from "./routes/homeRoute";
import authRoute from "./routes/auth";
import cors from "cors";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import { config } from "dotenv";
import { onBoardingRoute } from "./routes/onboarding";
config();

const app = express();
app.use(bodyParser.json());
app.use(cookieParser());

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use("/", homeRoute);
app.use("/auth", authRoute);
app.use("/onboarding", onBoardingRoute);

export default app;
