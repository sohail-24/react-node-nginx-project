const express = require("express");
const cors = require("cors");
const crypto = require("crypto");

const app = express();
app.use(cors());
app.use(express.json());

// ==============================
// SIMPLE IN-MEMORY TOKEN STORE
// ==============================
const activeTokens = new Set();

// ==============================
// AUTH MIDDLEWARE
// ==============================
function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({
      success: false,
      message: "No token provided",
    });
  }

  const token = authHeader.split(" ")[1];

  if (!activeTokens.has(token)) {
    return res.status(403).json({
      success: false,
      message: "Invalid or expired token",
    });
  }

  next();
}

// ==============================
// ROOT
// ==============================
app.get("/", (req, res) => {
  res.send("Backend is running 🚀 Use /api endpoints");
});

// ==============================
// HEALTH CHECK (PROTECTED)
// ==============================
app.get("/api/health", authMiddleware, (req, res) => {
  res.status(200).json({
    status: "OK",
    message: "Backend is running fine",
    time: new Date().toISOString(),
  });
});

// ==============================
// LOGIN API
// ==============================
app.post("/api/login", (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({
      success: false,
      message: "Username and password are required",
    });
  }

  // demo credentials (replace later with DB)
  if (username === "admin" && password === "1234") {
    const token = crypto.randomBytes(32).toString("hex");
    activeTokens.add(token);

    return res.json({
      success: true,
      message: "Login successful",
      token: token,
    });
  }

  return res.status(401).json({
    success: false,
    message: "Invalid credentials",
  });
});

// ==============================
// LOGOUT API
// ==============================
app.post("/api/logout", authMiddleware, (req, res) => {
  const token = req.headers.authorization.split(" ")[1];
  activeTokens.delete(token);

  res.json({
    success: true,
    message: "Logged out successfully",
  });
});

// ==============================
// START SERVER
// ==============================
app.listen(5000, "0.0.0.0", () => {
  console.log("Backend running securely on port 5000");
});

