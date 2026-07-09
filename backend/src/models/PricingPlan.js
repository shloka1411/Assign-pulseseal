const mongoose = require("mongoose");

const pricingPlanSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    price: { type: String, required: true, trim: true },
    features: [{ type: String, trim: true }],
    notIncluded: [{ type: String, trim: true }],
    popular: { type: Boolean, default: false },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("PricingPlan", pricingPlanSchema);
