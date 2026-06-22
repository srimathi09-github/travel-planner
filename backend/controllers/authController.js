const bcrypt = require("bcryptjs");
const User = require("../models/User");
const generateToken = require("../utils/generateToken");

// REGISTER
exports.registerUser = async (req, res) => {
  try {
    console.log("BODY:", req.body);

    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required"
      });
    }

    const existingUser = await User.findOne({
      email
    });

    if (existingUser) {
      return res.status(400).json({
        message: "User already exists"
      });
    }

    console.log("Before Hash");

    const hashedPassword = await bcrypt.hash(
      password,
      10
    );

    console.log("After Hash");

    const user = await User.create({
      email,
      password: hashedPassword
    });

    console.log("User Created:", user);

    const token = generateToken(
      user._id
    );

    console.log("Token Generated");

    res.status(201).json({
      success: true,
      token,
      user: {
        id: user._id,
        email: user.email
      }
    });

  } catch (error) {
    console.log("REGISTER ERROR:");
    console.log(error);

    res.status(500).json({
      message: "Registration failed",
      error: error.message
    });
  }
};

// LOGIN
exports.loginUser = async (req, res) => {
  try {
    const { email, password } =
      req.body;

    const user =
      await User.findOne({
        email
      });

    if (!user) {
      return res.status(400).json({
        message:
          "Invalid credentials"
      });
    }

    const isMatch =
      await bcrypt.compare(
        password,
        user.password
      );

    if (!isMatch) {
      return res.status(400).json({
        message:
          "Invalid credentials"
      });
    }

    const token = generateToken(
      user._id
    );

    res.status(200).json({
      success: true,
      token,
      user: {
        id: user._id,
        email: user.email
      }
    });

  } catch (error) {
    console.log("LOGIN ERROR:");
    console.log(error);

    res.status(500).json({
      message: "Login failed",
      error: error.message
    });
  }
};