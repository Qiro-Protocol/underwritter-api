import { Router } from "express";
import { testController } from "../controllers/testController";
import { verifyJwt } from "@/middleware/verify";

const router = Router();

router.get("/", verifyJwt, testController);

export default router;
