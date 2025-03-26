require("dotenv").config();
const User = require("../models/users");
const jwt = require("jsonwebtoken");
const Joi = require("joi");

const signup = async (req, res) => {
  try {
    const validatedBody = Joi.object({
      name: Joi.string().required().max(30),
      email: Joi.string().required().max(50),
      password: Joi.string().required().max(50),
      role: Joi.string().required().valid("admin", "editor", "reader"),
    });

    const { error } = validatedBody.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
    const { name, email, password, role } = req.body;
    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      return res.status(400).json({ error: "Email already exists" });
    }
    const newUser = new User({ name, email, password, role });
    await newUser.save();

    // Generate JWT token
    const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.status(201).json({
      message: "User registered successfully",
      user: { id: newUser._id, name: newUser.name, email: newUser.email },
      token,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = { signup };
