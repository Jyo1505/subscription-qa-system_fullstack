import { Router } from "express";
import auth from "../middlewares/auth.middleware.js";
import { fakePayment } from "../controllers/payment.controller.js";

const router = Router();

router.post("/fake-pay", auth, fakePayment);

export default router;
