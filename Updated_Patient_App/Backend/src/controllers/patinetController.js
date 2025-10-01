const Patient = require("../models/Patient");
const jwt = require("jsonwebtoken");
const Otp = require("../models/Otp");

// Generate JWT token
const generateToken = require("../utils/generateToken");

// @desc    Register a new patient
// @route   POST /api/patients/register
// @access  Public
exports.registerPatient = async (req, res) => {
  try {
    const { name, email, mobile, password, dob, gender, contact, address } =
      req.body;

    // Check if patient exists (by email or mobile)
    const existing = await Patient.findOne({ $or: [{ email }, { mobile }] });
    if (existing) {
      return res.status(400).json({ message: "Patient already exists" });
    }

    const patient = new Patient({
      name,
      email,
      mobile,
      password,
      dob,
      gender,
      contact,
      address,
    });

    await patient.save();

    res.status(201).json({
      success: true,
      message: "Patient registered successfully",
      token: generateToken(patient._id),
      patient: {
        id: patient._id,
        name: patient.name,
        email: patient.email,
        mobile: patient.mobile,
        dob: patient.dob,
        gender: patient.gender,
        contact: patient.contact,
        address: patient.address,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Login patient
// @route   POST /api/patients/login
// @access  Public
exports.loginPatient = async (req, res) => {
  try {
    const { emailOrMobile, password } = req.body;

    const patient = await Patient.findOne({
      $or: [{ email: emailOrMobile }, { mobile: emailOrMobile }],
    });

    if (!patient) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isMatch = await patient.matchPassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    res.json({
      success: true,
      message: "Logged in successfully",
      token: generateToken(patient._id, "patient"),
      user: {
        id: patient._id,
        name: patient.name,
        email: patient.email,
        mobile: patient.mobile,
        dob: patient.dob,
        gender: patient.gender,
        contact: patient.contact,
        address: patient.address,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get patient profile
// @route   GET /api/patients/profile
// @access  Private
exports.getPatientProfile = async (req, res) => {
  const patient = await Patient.findById(req.patient.id);
  if (patient) {
    res.json({
      _id: patient._id,
      name: patient.name,
      email: patient.email,
      mobile: patient.mobile,
      dob: patient.dob,
      gender: patient.gender,
      contact: patient.contact,
      address: patient.address,
    });
  } else {
    res.status(404).json({ message: "Patient not found" });
  }
};

// @desc    Reset patient password
// @route   POST /api/patients/reset-password
// @access  Public
exports.resetPassword = async (req, res) => {
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

    const patient = await Patient.findOne({ mobile });
    if (!patient) {
      return res.status(404).json({ message: "Patient not found" });
    }

    // ✅ Assign plain password and let schema handle hashing
    patient.password = newPassword;
    await patient.save();

    await Otp.deleteOne({ mobile }); // clear OTP after reset

    return res
      .status(200)
      .json({ success: true, message: "Password reset successful" });
  } catch (error) {
    console.error("Reset password error:", error);
    return res.status(500).json({ message: "Server error" });
  }
};
