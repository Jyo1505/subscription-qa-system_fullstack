// const mysql = require("mysql2");

// const db = mysql.createPool({
//   host: process.env.DB_HOST || "127.0.0.1",
//   user: process.env.DB_USER || "root",
//   password: process.env.DB_PASSWORD || "152005",
//   database: process.env.DB_NAME || "stackoverflow_clone",
//   waitForConnections: true,
//   connectionLimit: 10,
//   queueLimit: 0
// });

// // ✅ Test DB connection
// db.getConnection((err, connection) => {
//   if (err) {
//     console.error("DB Error:", err);
//     return;
//   }
//   console.log("MySQL Connected");
//   connection.release();
// });

// module.exports = db;


import mysql from "mysql2/promise";

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  ssl: { rejectUnauthorized: false }
});

export default pool;
