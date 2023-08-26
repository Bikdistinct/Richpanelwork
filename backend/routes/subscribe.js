const express = require("express");
const User = require("../models/user");
// import Article from "../models/article";
const { protect } = "../middleware/auth";
const Stripe = require("stripe");

const stripe = new Stripe(process.env.SECRET_KEY, {
  apiVersion: "2023-08-16",
});

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
  let prices = req.body.priceId;
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

  const userId = req.body.id; // Assuming you have a user object in the request (middleware)

  // Update the planId field in the user document
  await User.findByIdAndUpdate(userId._id, { $set: { planId: prices } });

  return res.json(session);
});

// router.post("/session", async (req, res) => {
//   try {
//     const { priceId } = req.body;

//     // Create a new session
//     const session = await stripe.checkout.sessions.create({
//       mode: "subscription",
//       payment_method_types: ["card"],
//       line_items: [
//         {
//           price: priceId,
//           quantity: 1,
//         },
//       ],
//       success_url: "http://localhost:3000/currentplan",
//       cancel_url: "http://localhost:3000/",
//     });

//     // Update the user's planId after successful payment
//     const userId = req.user.id; // Assuming you have a user object in the request (middleware)

//     // Update the planId field in the user document
//     await User.updateOne({ _id: userId }, { $set: { planId: priceId } });

//     return res.json(session);
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({ error: "An error occurred." });
//   }
// });
module.exports = router;
