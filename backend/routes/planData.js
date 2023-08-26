const express = require('express');
const router = express.Router();
const { MonthlySubscription, YearlySubscription } = require('../models/Subscribtion');// Adjust the path accordingly

// Fetch plans
router.get('/monthly', async (req, res) => {
  try {
    const plans = await MonthlySubscription.find();
    res.json(plans);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching plans', error: error.message });
  }
});

router.get('/yearly', async (req, res) => {
    try {
      const plans = await YearlySubscription.find();
      res.json(plans);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching plans', error: error.message });
    }
  });

module.exports = router;
