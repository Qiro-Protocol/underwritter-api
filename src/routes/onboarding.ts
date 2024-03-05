import { createCompany } from "@/controllers/company";
import { verifyJwt } from "@/middleware/verify";
import { Router } from "express";

const onBoardingRoute = Router();

onBoardingRoute.post("/add-role", verifyJwt);
onBoardingRoute.post("/add-company", verifyJwt, createCompany);

export { onBoardingRoute };
