// controllers/userController.js
import bcrypt from "bcryptjs";
import User from "../models/user.js";
import auth from "../middlewares/auth.js";

// Register user
const registerUser = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });

    console.log(newUser);

    await newUser.save();
    res.status(201).json({
      message: "User registered successfully",
    });
  } catch (error) {
    console.error("Error during registration:", error);
    res.status(500).json({ message: "Error registering user" });
  }
};

// Login user
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(req.body);

    // Check if the user exists
    const user = await User.findOne({ email });
    if (!user) {
      console.log("no user")
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Compare the passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.log("no match")
      return res.status(400).json({ message: "Invalid credentials" });
    }
    console.log("logging in")
    // Generate JWT token
    const token = auth.generateToken(user); // remove

    res.status(200).json({
      message: "Login successful",
      token,
    });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ message: "Error logging in" });
  }
};

// Logout user (clear the token in the front-end, if needed)
const logoutUser = (req, res) => {
  res.status(200).json({ message: "Logout successful" });
};

const editUser = async (req, res) => {
  try {
    const { history } = req.body;
    console.log("controller id: "+req.params.userId);
    console.log(history);
    const updatedUser = await User.findByIdAndUpdate(
      req.params.userId,
      {history}
    );
    console.log(updatedUser);
    if (!updatedUser)
      return res.status(404).json({ message: "User not found" });
    res.json(updatedUser);
  } catch (error) {
    res.status(400).json({ message: "Error updating user", error });
  }
};

export default {
  registerUser,
  loginUser,
  logoutUser,
  editUser,
};
