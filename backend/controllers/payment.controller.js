import pool from "../config/db.js";
import isAllowed from "../utils/timeCheck.js";
import mailer from "../utils/mailer.js";

const PLAN_LEVEL = {
  FREE: 0,
  BRONZE: 1,
  SILVER: 2,
  GOLD: 3
};

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
    const userId = req.userId;

    if (!PLANS[plan]) {
      return res.status(400).json({ message: "Invalid plan selected" });
    }

    // 1️⃣ Ensure subscription exists
    const [subs] = await pool.query(
      "SELECT plan, expires_at FROM subscriptions WHERE user_id=?",
      [userId]
    );

    if (subs.length === 0) {
      await pool.query(
        "INSERT INTO subscriptions (user_id, plan, daily_limit) VALUES (?, 'FREE', 1)",
        [userId]
      );
      return res.json({
        message: "Free plan created. Please try payment again."
      });
    }

    const { plan: currentPlan, expires_at } = subs[0];

    if (expires_at && new Date(expires_at) > new Date()) {
      if (PLAN_LEVEL[plan] <= PLAN_LEVEL[currentPlan]) {
        return res.status(400).json({
          message: "You can only upgrade to a higher plan"
        });
      }
    }

    // 2️⃣ Update subscription (NOT users table)
    const selectedPlan = PLANS[plan];
    const newExpiry = new Date();
    newExpiry.setDate(newExpiry.getDate() + 30);

    await pool.query(
      "UPDATE subscriptions SET plan=?, daily_limit=?, expires_at=? WHERE user_id=?",
      [plan, selectedPlan.limit, newExpiry, userId]
    );

    // 3️⃣ Fetch email
    const [[user]] = await pool.query(
      "SELECT email FROM users WHERE id=?",
      [userId]
    );

    // 4️⃣ Send invoice (optional)
    if (user?.email) {
      await mailer.sendInvoice(user.email, {
        plan,
        amount: selectedPlan.price,
        txnId: "TXN" + Date.now(),
        expiry: newExpiry.toDateString(),
        date: new Date().toDateString()
      });
    }

    res.json({
      message: "Payment successful",
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Payment failed",
      error: err.message
    });
  }
};
