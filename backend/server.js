// import express from "express";
// import cors from "cors";

// import authRoutes from "./routes/auth.routes.js";
// import paymentRoutes from "./routes/payment.routes.js";
// import questionRoutes from "./routes/question.routes.js";

// const app = express();

// app.use(cors({
//   origin: "*",
//   methods: ["GET", "POST"],
//   allowedHeaders: ["Content-Type", "Authorization"]
// }));

// app.use(express.json());

// app.use("/api/auth", authRoutes);
// app.use("/api/payment", paymentRoutes);
// app.use("/api/questions", questionRoutes);

// app.get("/", (req, res) => {
//   res.send("Backend running ✅");
// });

// export default app;


import express from "express";
import cors from "cors";

import authRoutes from "./routes/auth.routes.js";
import paymentRoutes from "./routes/payment.routes.js";
import questionRoutes from "./routes/question.routes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/payment", paymentRoutes);
app.use("/api/questions", questionRoutes);

app.get("/", (req, res) => {
  res.send("Backend running ✅");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Server running on port", PORT);
});
