const express = require("express");
const connectDB = require("./config/monDB");
const dotenv = require("dotenv");
const PlanData = require("./routes/planData");
const userRoutes = require("./routes/user");
const User = require("./models/user");
const subscribeRoutes = require("./routes/subscribe");
const currSubs = require("./routes/currplan");
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
app.use("/api/currplan", currSubs);

// Error Handling middlewares
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT;

const server = app.listen(
  PORT,
  console.log(`Server running on PORT ${PORT}...`)
);
