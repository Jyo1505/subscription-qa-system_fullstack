// import express from "express";
// import db from "../config/db.js";

// const router = express.Router();

// router.post("/fake-pay", async (req, res) => {
//   try {
//     const { userId, plan } = req.body;

//     // 1. Save plan
//     await db.query(
//       "UPDATE users SET plan=? WHERE id=?",
//       [plan, userId]
//     );

//     // 2. Generate invoice
//     const invoiceId = "INV-" + Date.now();

//     await db.query(
//       "INSERT INTO invoices(user_id, plan, invoice_id) VALUES (?, ?, ?)",
//       [userId, plan, invoiceId]
//     );

//     // 3. DO NOT SEND EMAIL IN PRODUCTION
//     res.json({
//       success: true,
//       message: "Payment successful",
//       invoiceId
//     });

//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: "Payment failed" });
//   }
// });

// export default router;
   


import { Router } from "express";
import { fakePayment } from "../controllers/payment.controller.js";
import auth from "../middlewares/auth.middleware.js";

const router = Router();

router.post("/fake-pay", auth, fakePayment);

export default router;
