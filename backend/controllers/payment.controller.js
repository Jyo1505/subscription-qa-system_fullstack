import pool from "../config/db.js";
import isAllowed from "../utils/timeCheck.js";
import mailer from "../utils/mailer.js";

/* 🔹 Plan hierarchy */
const PLAN_LEVEL = {
  FREE: 0,
  BRONZE: 1,
  SILVER: 2,
  GOLD: 3
};

/* 🔹 Plan details */
const PLANS = {
  BRONZE: { price: 100, limit: 5 },
  SILVER: { price: 300, limit: 10 },
  GOLD: { price: 1000, limit: 9999 }
};

export const fakePayment = async (req, res) => {
  try {
    if (!isAllowed()) {
      return res.status(403).json({
        message: "Payments allowed only between 10–11 AM IST"
      });
    }

    const { plan } = req.body;

    if (!PLANS[plan]) {
      return res.status(400).json({ message: "Invalid plan selected" });
    }

    const [subs] = await pool.query(
      "SELECT plan, expires_at FROM subscriptions WHERE user_id=?",
      [req.userId]
    );

    if (subs.length === 0) {
      await pool.query(
        "INSERT INTO subscriptions (user_id, plan, daily_limit) VALUES (?, 'FREE', 1)",
        [req.userId]
      );
      return res.json({
        message: "Free plan created. Please try payment again."
      });
    }

    const { plan: currentPlan, expires_at } = subs[0];


    if (expires_at && new Date(expires_at) > new Date()) {
      if (currentPlan === "GOLD") {
        return res.status(400).json({
          message: "You already have GOLD plan active"
        });
      }

      if (PLAN_LEVEL[plan] <= PLAN_LEVEL[currentPlan]) {
        return res.status(400).json({
          message: "You can only upgrade to a higher plan"
        });
      }
    }

    const selectedPlan = PLANS[plan];
    const transactionId = "TXN" + Date.now();

    const newExpiry = new Date();
    newExpiry.setDate(newExpiry.getDate() + 30);

    await pool.query(
      "UPDATE subscriptions SET plan=?, daily_limit=?, expires_at=? WHERE user_id=?",
      [plan, selectedPlan.limit, newExpiry, req.userId]
    );

    const [[user]] = await pool.query(
      "SELECT email FROM users WHERE id=?",
      [req.userId]
    );
    console.log("📧 Attempting to send invoice to:", user.email);

    if (user?.email) {
      await mailer.sendInvoice(user.email, {
        plan,
        amount: selectedPlan.price,
        txnId: transactionId,
        expiry: newExpiry.toDateString(),
        date: new Date().toDateString()
      });
    }

    res.json({
      message: "Payment successful. Invoice sent to email.",
      transactionId
    });
  } catch (err) {
    res.status(500).json({ message: "Payment failed", error: err.message });
  }
};

// export default { fakePayment };
