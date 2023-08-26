const Stripe = require("stripe");

const stripe = new Stripe(process.env.SECRET_KEY, {
  apiVersion: "2020-08-27",
});

module.exports = { stripe };
