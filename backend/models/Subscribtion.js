const mongoose = require("mongoose");

const subscriptionSchema = new mongoose.Schema({
  name: String,
  planId: String,
  Price: Number,
  VideoQuality: String,
  Resolution: String,
  Devices: [String],
});

const MonthlySubscription = mongoose.model(
  "MonthlySubscription",
  subscriptionSchema
);
const YearlySubscription = mongoose.model(
  "YearlySubscription",
  subscriptionSchema
);

module.exports = {
  MonthlySubscription,
  YearlySubscription,
};
