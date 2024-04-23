import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { config } from "dotenv";

import cookieParser from "cookie-parser";
import homeRoute from "./routes/homeRoute";
import authRoute from "./routes/auth";

import { borrowerRoute } from "./routes/borrower";
import { verifyJwt } from "./middleware/verify";
import { serviceRouter } from "./routes/service";
import { underwriterRoute } from "./routes/underwriter";
import { subscriptionRouter } from "./routes/subscription";

config();

const app = express();
app.use(bodyParser.json());
app.use(cookieParser());

app.set("trust proxy", 1);

app.use(
  cors({
    origin:
      "https://underwritter-60v2418v7-vikas-projects-e3c814ab.vercel.app/",
    credentials: true,
  })
);

app.use("/", homeRoute);
app.use("/auth", authRoute);
app.use("/borrower", verifyJwt, borrowerRoute);
app.use("/service", verifyJwt, serviceRouter);
app.use("/underwriter", verifyJwt, underwriterRoute);
app.use("/subscriptions", verifyJwt, subscriptionRouter);

export default app;
