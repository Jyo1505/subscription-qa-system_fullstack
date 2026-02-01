// import { Router } from "express";
// import { fakePayment } from "../controllers/payment.controller.js";
// import auth from "../middlewares/auth.middleware.js";

// const router = Router();
// router.post("/fake-pay", auth, fakePayment);
// export default router;


import express from "express";
const router = express.Router();

router.post("/fake-pay", async (req, res) => {
  const { userId, plan } = req.body;

  // 1️⃣ Save plan to DB
  await db.query(
    "UPDATE users SET plan=? WHERE id=?",
    [plan, userId]
  );

  // 2️⃣ Generate invoice number
  const invoiceId = "INV-" + Date.now();

  // 3️⃣ Save invoice
  await db.query(
    "INSERT INTO invoices(user_id,plan,invoice_id) VALUES(?,?,?)",
    [userId, plan, invoiceId]
  );

  // 4️⃣ Email logic (conditional)
  if (process.env.NODE_ENV !== "production") {
    await sendInvoiceEmail(); // nodemailer here
  }

  // 5️⃣ Always respond success
  res.json({
    success: true,
    msg: "Payment successful",
    invoiceId
  });
});

export default router;
