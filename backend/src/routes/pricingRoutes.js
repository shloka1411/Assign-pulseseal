const express = require("express");
const PricingPlan = require("../models/PricingPlan");
const { protectAdmin } = require("../middleware/auth");

const router = express.Router();

const pickPlanFields = (body) => ({
  name: body.name,
  price: body.price,
  features: body.features,
  notIncluded: body.notIncluded,
  popular: body.popular,
  isActive: body.isActive,
});

router.get("/", async (_req, res) => {
  try {
    const plans = await PricingPlan.find({ isActive: true }).sort({ createdAt: 1 });
    return res.json({ success: true, data: plans });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Failed to fetch pricing plans" });
  }
});

router.get("/all", protectAdmin, async (_req, res) => {
  try {
    const plans = await PricingPlan.find().sort({ createdAt: 1 });
    return res.json({ success: true, data: plans });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Failed to fetch pricing plans" });
  }
});

router.post("/", protectAdmin, async (req, res) => {
  try {
    const plan = await PricingPlan.create(pickPlanFields(req.body));
    return res.status(201).json({ success: true, data: plan, message: "Pricing plan created" });
  } catch (error) {
    return res.status(400).json({ success: false, message: "Failed to create pricing plan" });
  }
});

router.put("/:id", protectAdmin, async (req, res) => {
  try {
    const plan = await PricingPlan.findByIdAndUpdate(req.params.id, pickPlanFields(req.body), {
      new: true,
      runValidators: true,
    });
    if (!plan) {
      return res.status(404).json({ success: false, message: "Pricing plan not found" });
    }
    return res.json({ success: true, data: plan, message: "Pricing plan updated" });
  } catch (error) {
    return res.status(400).json({ success: false, message: "Failed to update pricing plan" });
  }
});

router.delete("/:id", protectAdmin, async (req, res) => {
  try {
    const plan = await PricingPlan.findByIdAndDelete(req.params.id);
    if (!plan) {
      return res.status(404).json({ success: false, message: "Pricing plan not found" });
    }
    return res.json({ success: true, message: "Pricing plan deleted" });
  } catch (error) {
    return res.status(400).json({ success: false, message: "Failed to delete pricing plan" });
  }
});

module.exports = router;
