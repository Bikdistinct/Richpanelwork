const express = require("express");
const connectDB = require("./config/monDB");
const dotenv = require("dotenv");
const PlanData = require("./routes/planData");
const userRoutes = require("./routes/user");
const User = require("./models/user");
const subscribeRoutes =require("./routes/subscribe")
const { notFound, errorHandler } = require("./middleware/error");
const cors = require("cors");

dotenv.config();
connectDB();
const app = express();

app.use(cors());
app.use(express.json()); // to accept json data
// app.get("/", (req, res) => {
//   res.send("API Running!");
// });
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Headers", "Authorization");
  next();
});

app.use("/api/plan", PlanData);
app.use("/api/user", userRoutes);
app.use("/api/subs", subscribeRoutes);

//stripe
const [mobile, basic, standard, premium] = [
  "price_1NjIugSHsgRrXGPyPcAH2Niq",
  "price_1Nj3XzSHsgRrXGPyaRj7GdJA",
  "price_1Nj3bQSHsgRrXGPyZUFcJWag",
  "price_1Nj3e3SHsgRrXGPyUKLxHYgn",
];

const stripe = require("stripe")(process.env.STRIPE_PRIVATE_KEY);

/**** create subscription *****/

const stripeSession = async (plan) => {
  try {
    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      payment_method_types: ["card"],
      line_items: [
        {
          price: plan,
          quantity: 1,
        },
      ],
      success_url: "http://localhost:3000/currplan",
      cancel_url: "http://localhost:3000/",
    });
    return session;
  } catch (e) {
    return e;
  }
};

app.post("/api/v1/create-subscription-checkout-session", async (req, res) => {
  const { plan, customerId } = req.body;
  let planId = null;
  if (plan == 200) planId = basic;
  else if (plan == 500) planId = standard;
  else if (plan == 700) planId = premium;

  try {
    const session = await stripeSession(planId);
    const user = await User.findOne({ customerId }); // Fetch user by customerId

    if (user) {
      // Update the user's subscription session in MongoDB
      user.subscription = { sessionId: session.id };
      await user.save();

      return res.json({ session });
    } else {
      return res.status(404).json({ error: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "An error occurred" });
  }
});

// Error Handling middlewares
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT;

const server = app.listen(
  PORT,
  console.log(`Server running on PORT ${PORT}...`)
);
