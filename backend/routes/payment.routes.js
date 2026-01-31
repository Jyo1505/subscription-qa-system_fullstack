import { Router } from "express";
import auth from "../middlewares/auth.middleware.js";
import pay from "../controllers/payment.controller.js";

const router = Router();

router.post("/fake-pay", auth, pay.fakePayment);

export default router;
