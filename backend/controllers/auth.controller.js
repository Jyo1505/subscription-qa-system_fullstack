import pool from "../config/db.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  const { email, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const [result] = await pool.query(
      "INSERT INTO users (email, password) VALUES (?, ?)",
      [email, hashedPassword]
    );

    await pool.query(
      "INSERT INTO subscriptions (user_id, plan, daily_limit) VALUES (?, 'FREE', 1)",
      [result.insertId]
    );

    res.status(201).json({ message: "Registration successful" });
  } catch (err) {
    if (err.code === "ER_DUP_ENTRY") {
      return res.status(409).json({ message: "User already exists" });
    }
    res.status(500).json({ message: "Database error", error: err.message });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const [users] = await pool.query(
      "SELECT * FROM users WHERE email = ?",
      [email]
    );

    if (users.length === 0) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const user = users[0];
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign(
      { id: user.id },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({ message: "Login successful", token });
  } catch (err) {
    res.status(500).json({ message: "Database error", error: err.message });
  }
};

export const profile = async (req, res) => {
  try {
    const [rows] = await pool.query(
      `SELECT u.email, s.plan, s.daily_limit, s.expires_at
       FROM users u
       JOIN subscriptions s ON u.id = s.user_id
       WHERE u.id = ?`,
      [req.userId]
    );

    if (rows.length === 0) {
      return res.status(404).json({ message: "Profile not found" });
    }

    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ message: "Database error", error: err.message });
  }
};
