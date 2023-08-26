const express = require("express");
const User = "../models/user";
// import Article from "../models/article";
const { protect } = "../middleware/auth";
const Stripe= require('stripe');

const stripe=new Stripe(process.env.SECRET_KEY,{
  apiVersion:"2023-08-16"
})

const router = express.Router();

router.get("/prices", async (req, res) => {
  try {
    const prices = await stripe.prices.list({
      apiKey: process.env.SECRET_KEY,
    });

    return res.json(prices);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "An error occurred." });
  }
});

router.post("/session", async (req, res) => {
  // const user = await User.findOne({ email: req.user });

  const session = await stripe.checkout.sessions.create(
    {
      mode: "subscription",
      payment_method_types: ["card"],
      line_items: [
        {
          price: req.body.priceId,
          quantity: 1,
        },
      ],
      success_url: "http://localhost:3000/currentplan",
      cancel_url: "http://localhost:3000/",
      // customer: user.stripeCustomerId,
    },
    {
      apiKey: process.env.SECRET_KEY,
    }
  );

  return res.json(session);
});

module.exports = router;
