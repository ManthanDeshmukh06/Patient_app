const Otp = require("../models/Otp");
const User = require("../models/User");
const { sendOtpToMobile } = require("../utils/sendOtp");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// --- Send OTP ---
const sendOtp = async (req, res) => {
  const { mobile } = req.body;
  if (!mobile) return res.status(400).json({ message: "Mobile is required" });

  const otp = await sendOtpToMobile(mobile);
  const expiresAt = new Date(Date.now() + 5 * 60 * 1000); // 5 minutes

  await Otp.findOneAndUpdate(
    { mobile },
    { otp, expiresAt },
    { upsert: true, new: true }
  );

  return res
    .status(200)
    .json({ success: true, message: "OTP sent successfully" });
};

// --- Verify OTP ---
const verifyOtp = async (req, res) => {
  const { mobile, otp } = req.body;

  if (!mobile || !otp)
    return res.status(400).json({ message: "Missing fields" });

  const record = await Otp.findOne({ mobile });

  if (!record)
    return res.status(400).json({ message: "OTP not found or expired" });
  if (record.otp !== otp)
    return res.status(400).json({ message: "Invalid OTP" });
  if (record.expiresAt < Date.now())
    return res.status(400).json({ message: "OTP expired" });

  await Otp.findOneAndUpdate({ mobile }, { verified: true });

  return res
    .status(200)
    .json({ success: true, message: "OTP verified successfully" });
};

// --- Register User ---
const register = async (req, res) => {
  try {
    const { name, email, mobile, password, confirmPassword, role, hospital } =
      req.body;

    if (
      !name ||
      !email ||
      !mobile ||
      !password ||
      !confirmPassword ||
      !role ||
      !hospital
    ) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Passwords do not match" });
    }

    const otpRecord = await Otp.findOne({ mobile });
    if (!otpRecord || !otpRecord.verified) {
      return res
        .status(400)
        .json({ message: "Mobile not verified. Please verify OTP first." });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "User with this email already exists" });
    }

    // ❌ Don't hash manually here. Let schema pre("save") handle it
    const newUser = new User({
      name,
      email,
      mobile,
      password, // plain text → schema will hash before saving
      hospital,
      role,
      isMobileVerified: true,
      createdAt: new Date(),
    });

    await newUser.save();
    await Otp.deleteOne({ mobile });

    return res
      .status(201)
      .json({ success: true, message: "User registered successfully" });
  } catch (error) {
    console.error("Register error:", error);
    return res.status(500).json({ message: error.message || "Server error" });
  }
};

// --- Login User ---
const loginUser = async (req, res) => {
  try {
    const { emailOrMobile, password } = req.body;

    const user = await User.findOne({
      $or: [{ email: emailOrMobile }, { mobile: emailOrMobile }],
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (!user.isMobileVerified) {
      return res.status(403).json({ message: "Mobile number not verified" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid password" });
    }

    const token = jwt.sign(
      {
        userId: user._id,
        email: user.email,
        mobile: user.mobile,
        role: user.role,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    return res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        mobile: user.mobile,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({ message: "Server error" });
  }
};
const resetPassword = async (req, res) => {
  try {
    const { mobile, otp, newPassword } = req.body;

    if (!mobile || !otp || !newPassword) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const otpRecord = await Otp.findOne({ mobile });
    if (!otpRecord) {
      return res.status(400).json({ message: "OTP not found or expired" });
    }

    if (otpRecord.otp !== otp) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    if (otpRecord.expiresAt < Date.now()) {
      return res.status(400).json({ message: "OTP expired" });
    }

    const user = await User.findOne({ mobile });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // hash the new password
    user.password = newPassword;
    await user.save();

    await user.save();
    await Otp.deleteOne({ mobile }); // clear OTP after reset

    return res
      .status(200)
      .json({ success: true, message: "Password reset successful" });
  } catch (error) {
    console.error("Reset password error:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  sendOtp,
  verifyOtp,
  register,
  loginUser,
  resetPassword,
};
