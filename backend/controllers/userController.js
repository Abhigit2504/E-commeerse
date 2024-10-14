import useModel from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import validator from "validator";

// Helper function to create JWT token
const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1d" });
};

// Login User
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log('Login request received', req.body);

    // Find the user in the database with case-insensitive email
    const user = await useModel.findOne({
      email: { $regex: new RegExp("^" + email + "$", "i") }
    });

    console.log('User found:', user);

    if (!user) {
      return res.json({ success: false, message: "Please enter a valid email" });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (isMatch) {
      const token = createToken(user._id);
      return res.json({ success: true, token });
    } else {
      return res.json({ success: false, message: "Invalid credentials" });
    }
  } catch (error) {
    console.error("Error during login:", error);
    return res.json({ success: false, message: error.message });
  }
};

// Register User
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    console.log('Registration request received', req.body);

    // Check if user already exists
    const exists = await useModel.findOne({
      email: { $regex: new RegExp("^" + email + "$", "i") }
    });

    if (exists) {
      return res.json({ success: false, message: "User already exists" });
    }

    // Validate email and password format
    if (!validator.isEmail(email)) {
      return res.json({ success: false, message: "Please enter a valid email" });
    }

    if (password.length < 8) {
      return res.json({ success: false, message: "Password must be at least 8 characters" });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user
    const newUser = new useModel({
      name,
      email,
      password: hashedPassword,
    });

    const user = await newUser.save();
    const token = createToken(user._id);
    return res.json({ success: true, token });
  } catch (error) {
    console.error("Error during registration:", error);
    return res.json({ success: false, message: error.message });
  }
};

// Admin Login Function
const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log('Admin login request received', req.body);

    // Find admin user in the database
    const admin = await useModel.findOne({
      email: "myb@gmail.com",
      role: 'admin'  // Assuming you have a 'role' field in your schema for admin identification
    });

    if (!admin) {
      return res.json({ success: false, message: "Invalid admin credentials" });
    }

    // Compare password
    // if(email !== process.env.ADMIN_EMAIL){
    //   return res.json({success:false,message:"Invalid email credentials"})
    // }
    // const isMatch = await bcrypt.compare(password, process.env.ADMIN_PASSWORD);
    const isMatch = password === process.env.ADMIN_PASSWORD;
    if (isMatch) {
      console.log(admin._id)
      const token = createToken(admin._id);
      console.log(token)
      return res.json({ success: true, token });
    } else {
      return res.json({ success: false, message: "Invalid credentials" });
    }
  } catch (error) {
    console.error("Error during admin login:", error);
    return res.json({ success: false, message: error.message });
  }
};

export { loginUser, registerUser, adminLogin };
