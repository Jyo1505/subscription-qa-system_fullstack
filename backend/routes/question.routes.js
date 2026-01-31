import express from "express";
import auth from "../middlewares/auth.middleware.js";
import question from "../controllers/question.controller.js";

const router = express.Router();

router.post("/ask", auth, question.ask);

export default router;
