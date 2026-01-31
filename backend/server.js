import express from "express";
import cors from "cors";

import authRoutes from "./routes/auth.routes.js";
import paymentRoutes from "./routes/payment.routes.js";
import questionRoutes from "./routes/question.routes.js";

const app = express();

/* ---------- CORS (FIXED FOR VERCEL + PREFLIGHT) ---------- */
app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

// 👇 THIS IS THE KEY LINE (preflight support)
app.options("*", cors());

/* ---------- BODY PARSER ---------- */
app.use(express.json());

/* ---------- API ROUTES ---------- */
app.use("/api/auth", authRoutes);
app.use("/api/payment", paymentRoutes);
app.use("/api/questions", questionRoutes);

/* ---------- HEALTH CHECK ---------- */
app.get("/", (req, res) => {
  res.send("Backend running ✅");
});

/* ❌ DO NOT USE app.listen() */
export default app;
