const express = require("express");
const router = express.Router();
const {
  MonthlySubscription,
  YearlySubscription,
} = require("../models/Subscribtion");

router.get("/subscription/:planId", async (req, res) => {
  try {
    const planId = req.params.planId;

    // First, search in MonthlySubscription
    const monthlySubscription = await MonthlySubscription.findOne({ planId });

    if (monthlySubscription) {
      return res.json({
        subscriptionName: monthlySubscription.name,
        subscriptionPrice: monthlySubscription.Price,
        subscriptionDevices: monthlySubscription.Devices.join(" + "),
        subscriptionType: "mn",
      });
    }

    // If not found in MonthlySubscription, search in YearlySubscription
    const yearlySubscription = await YearlySubscription.findOne({ planId });

    if (yearlySubscription) {
      return res.json({
        subscriptionName: yearlySubscription.name,
        subscriptionPrice: yearlySubscription.Price,
        subscriptionDevices: yearlySubscription.Devices.join(" + "),
        subscriptionType: "yr",
      });
    }

    // If not found in both collections, return a default response
    return res.json({
      subscriptionName: "No Subscription",
      subscriptionPrice: "b",
      subscriptionDevices: "c",
      subscriptionType: "unknown",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "An error occurred." });
  }
});

module.exports = router;