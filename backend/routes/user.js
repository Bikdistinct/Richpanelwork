const express = require("express");
const {
  registerUser,
  authUser,
  logoutUser,
  getUserById,
} = require("../controllers/userControllers");
const { protect } = require("../middleware/auth");

const router = express.Router();
router.route("/signup").post(registerUser);
router.post("/login", authUser);
router.post("/logout", protect, logoutUser);
router.get("/getuser/:id", getUserById);
module.exports = router;
