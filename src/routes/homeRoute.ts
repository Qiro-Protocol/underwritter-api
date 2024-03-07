import { Router } from "express";
import { verifyJwt } from "@/middleware/verify";
import { getUser } from "@/controllers/user/user";

const router = Router();

router.get("/", verifyJwt, getUser);

export default router;
