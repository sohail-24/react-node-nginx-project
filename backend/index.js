const express = require("express");
const cors = require("cors");

const app = express();

// =====================
// MIDDLEWARES
// =====================
app.use(cors());                 // allow frontend requests
app.use(express.json());          // parse JSON body

// =====================
// ROOT ROUTE
// =====================
app.get("/", (req, res) => {
  res.send("Backend is running 🚀 Use /api endpoints");
});

// =====================
// HEALTH CHECK API
// =====================
app.get("/api/health", (req, res) => {
  res.status(200).json({
    status: "OK",
    message: "Backend is running fine",
    time: new Date().toISOString()
  });
});

// =====================
// LOGIN API
// =====================
app.post("/api/login", (req, res) => {
  const { username, password } = req.body;

  // validation
  if (!username || !password) {
    return res.status(400).json({
      success: false,
      message: "Username and password are required"
    });
  }

  // dummy authentication (replace with DB later)
  if (username === "admin" && password === "1234") {
    return res.status(200).json({
      success: true,
      message: "Login successful",
      user: {
        username: "admin",
        role: "admin"
      },
      token: "dummy-jwt-token"
    });
  }

  return res.status(401).json({
    success: false,
    message: "Invalid credentials"
  });
});

// =====================
// 404 HANDLER
// =====================
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "API route not found"
  });
});

// =====================
// START SERVER
// =====================
const PORT = process.env.PORT || 5000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Backend running on port ${PORT}`);
});

