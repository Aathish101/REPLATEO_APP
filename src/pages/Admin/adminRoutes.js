import express from "express";
import adminAuth from "./adminAuth.js";

const router = express.Router();

router.post("/login", (req, res) => {
  const { email, password } = req.body;

  if (email === "admin@gmail.com" && password === "admin123") {
    return res.json({
      success: true,
      token: "ADMIN_TOKEN_123",
    });
  }

  res.status(401).json({
    success: false,
    message: "Invalid admin credentials",
  });
});

router.get("/dashboard", adminAuth, (req, res) => {
  res.json({
    totalDonations: 120,
    totalReceivers: 45,
    foodSavedKg: 320,
  });
});

export default router;