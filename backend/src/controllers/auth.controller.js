import "dotenv/config";
import User from "../models/User.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../lib/utils.js";
import { sendWelcomeEmail } from "../emails/emailHandlers.js";

export const signup = async (req, res) => {
  const { fullName, email, password } = req.body;
  try {
    if (!fullName || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password must be at least 6 characters" });
    }

    if (!email.includes("@") || !email.includes(".")) {
      return res.status(400).json({ message: "Invalid email format" });
    }

    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }

    //Password hashing
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    //Create new user
    const newUser = new User({
      fullName,
      email,
      password: hashedPassword,
    });

    if (newUser) {
      const saveUser = await newUser.save();
      generateToken(saveUser._id, res);
      res.status(201).json({
        message: "User Created Successfully",
        _id: newUser._id,
        fullName: newUser.fullName,
        email: newUser.email,
        profilePicture: newUser.profilePicture,
      });

      try {
        await sendWelcomeEmail(
          saveUser.email,
          saveUser.fullName,
          process.env.CLIENT_URL,
        );
      } catch (err) {
        console.log("Error sending welcome email:", err);
      }
    } else {
      res.status(400).json({ message: "User Not Created" });
    }
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
    console.log(err);
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    generateToken(user._id, res);
    res.status(200).json({
      message: "Login successful",
      _id: user._id,
      fullName: user.fullName,
      email: user.email,
      profilePicture: user.profilePicture,
    });
  } catch (err) {
    res.status(500).json({ message: "InternalServer Error" });
    console.log(err);
  }
};

export const logout = (req, res) => {
  res.cookie("jwtToken", "", { maxAge: 0 });
  res.status(200).json({ message: "Logout successful" });
};
