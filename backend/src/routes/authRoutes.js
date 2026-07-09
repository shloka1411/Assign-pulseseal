const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Admin = require("../models/Admin");

const router = express.Router();
const jwtSecret = process.env.JWT_SECRET || "dev-jwt-secret";

const signToken = (admin) =>
  jwt.sign(
    {
      user: {
        _id: admin._id.toString(),
        id: admin._id.toString(),
        name: admin.name,
        email: admin.email,
        organizationId: "",
        departmentId: [],
        is_superuser: admin.is_superuser,
        is_organizer: admin.is_organizer,
        isActive: admin.isActive,
        isFreezed: false,
      },
      org_permission: {
        isHRMS_enabled: true,
        isTaskManagement_enabled: true,
      },
    },
    jwtSecret,
    { expiresIn: process.env.JWT_EXPIRES_IN || "7d" }
  );

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, message: "Email and password are required" });
    }

    const admin = await Admin.findOne({ email: email.toLowerCase() });
    if (!admin) {
      return res.status(401).json({ success: false, message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: "Invalid credentials" });
    }

    const token = signToken(admin);
    return res.json({
      success: true,
      data: {
        token,
        user: {
          _id: admin._id.toString(),
          name: admin.name,
          email: admin.email,
        },
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({ success: false, message: "Login failed" });
  }
});

router.post("/logout", (_req, res) => {
  return res.json({ success: true, message: "Logged out" });
});

router.post("/forget-password", (_req, res) => {
  return res.json({ success: true, message: "OTP sent (placeholder)" });
});

router.post("/reset-password", (_req, res) => {
  return res.json({ success: true, message: "Password reset (placeholder)" });
});

module.exports = router;
