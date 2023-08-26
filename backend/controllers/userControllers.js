const asyncHandler = require("express-async-handler");
const User = require("../models/user");
const generateToken = require("../config/Token");


//@description     Register new user
//@route           POST /api/user/
//@access          Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password} = req.body;

  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Please Enter all the Feilds");
  }

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  const user = await User.create({
    name,
    email,
    password
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("User not found");
  }
});

//@description     Auth the user
//@route           POST /api/users/login
//@access          Public
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error("Invalid Email or Password");
  }
});

const getUserById = async (req, res, next) => {
  const userId = req.params.id;
  try {
    const userdata = await User.findById(userId);
    res.status(200).json({ data: userdata });
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
};

//@description Logout the user
//@route POST /api/users/logout
//@access Private
const logoutUser = asyncHandler(async (req, res) => {
  // Remove the JWT token from the client-side
  res.cookie("token", "", {
    httpOnly: true,
    expires: new Date(0),
    secure: process.env.NODE_ENV === "production",
  });

  res.status(200).json({ message: "Logged out successfully" });
});

// router.post("/logout", protect, logoutUser);

module.exports = {
  registerUser,
  authUser,
  getUserById,
  logoutUser,
};
