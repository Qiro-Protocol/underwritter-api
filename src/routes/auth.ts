import { Router } from "express";
import { loginUser, regiseterUser } from "@/controllers/user/auth";

const router = Router();

router.post("/register", regiseterUser);
router.post("/login", loginUser);

export default router;
