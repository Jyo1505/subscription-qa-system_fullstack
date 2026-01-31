import { Router } from "express";
import auth from "../middlewares/auth.middleware.js";
import { ask } from "../controllers/question.controller.js";

const router = Router();

router.post("/ask", auth, ask);

export default router;
