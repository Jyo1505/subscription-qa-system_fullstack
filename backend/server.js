import express from "express";
import cors from "cors";

import authRoutes from "./routes/auth.routes.js";
import paymentRoutes from "./routes/payment.routes.js";
import questionRoutes from "./routes/question.routes.js";

const app = express();

/* ---------- MIDDLEWARE ---------- */
app.use(cors());
app.use(express.json());

/* ---------- API ROUTES ---------- */
app.use("/api/auth", authRoutes);
app.use("/api/payment", paymentRoutes);
app.use("/api/questions", questionRoutes);

/* ---------- HEALTH CHECK ---------- */
app.get("/", (req, res) => {
  res.send("Backend running ✅");
});

/* ❌ DO NOT use app.all('*') or app.options('*') */
/* ❌ DO NOT use wildcard routes in Express 5 */

export default app;
