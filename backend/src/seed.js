require("dotenv").config();
const bcrypt = require("bcryptjs");
const connectDB = require("./config/db");
const Admin = require("./models/Admin");
const PricingPlan = require("./models/PricingPlan");

const plans = [
  {
    name: "HRMS Only",
    price: "900",
    features: [
      "Employee Records & Profiles",
      "Attendance Tracking",
      "Leave Management System",
      "Role Hierarchy & Reporting",
      "Workforce Access Controls",
      "Basic Analytics Dashboard",
      "Email Support (24h Response)",
    ],
    notIncluded: [
      "Task tracking & execution",
      "Proof of work uploads",
      "Manager approval workflows",
      "Performance leaderboards",
      "Real-time risk signals",
      "Unified dashboard",
      "API access",
      "Dedicated success manager",
    ],
    popular: false,
  },
  {
    name: "TMS Only",
    price: "2,400",
    features: [
      "Task Creation & Assignment",
      "Proof-Based Work Submission",
      "Manager Approval Workflows",
      "Real-Time Signal Lights",
      "Task-Based Login/Logout",
      "TAT & Smart Reminders",
      "Performance Leaderboards",
      "Advanced Task Analytics",
      "Email Support (24h Response)",
    ],
    notIncluded: [
      "Attendance tracking",
      "Leave management",
      "Employee records",
      "Unified dashboard",
      "Cross-module analytics",
      "API access",
      "Dedicated success manager",
    ],
    popular: false,
  },
  {
    name: "Combined",
    price: "3,000",
    features: [
      "Employee Records & Profiles",
      "Attendance Tracking",
      "Leave Management System",
      "Task Creation & Assignment",
      "Proof-Based Work Submission",
      "Manager Approval Workflows",
      "Real-Time Signal Lights",
      "Unified Performance Dashboard",
      "Cross-Module Insights",
      "Predictive Risk Alerts",
      "Advanced Reporting & Exports",
      "Full API Access",
      "Dedicated Success Manager",
    ],
    notIncluded: [],
    popular: true,
  },
];

const seed = async () => {
  await connectDB();

  const adminEmail = (process.env.ADMIN_EMAIL || "admin@pulseseal.com").toLowerCase();
  const adminPassword = process.env.ADMIN_PASSWORD || "Admin@123";
  const adminName = process.env.ADMIN_NAME || "Super Admin";

  const existing = await Admin.findOne({ email: adminEmail });
  if (!existing) {
    const hashedPassword = await bcrypt.hash(adminPassword, 10);
    await Admin.create({
      name: adminName,
      email: adminEmail,
      password: hashedPassword,
      is_superuser: true,
      is_organizer: true,
      isActive: true,
    });
  }

  await PricingPlan.deleteMany({});
  await PricingPlan.insertMany(plans);

  console.log("Seed completed");
  process.exit(0);
};

seed().catch((error) => {
  console.error("Seed failed", error);
  process.exit(1);
});
