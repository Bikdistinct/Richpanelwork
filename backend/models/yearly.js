const mongoose = require('mongoose');

const subscriptionSchema = new mongoose.Schema({
  name: String,
  Price: Number,
  VideoQuality: String,
  Resolution: String,
  Devices: [String],
});

const Subscription = mongoose.model('yearlySubscription', subscriptionSchema);

module.exports = Subscription;
