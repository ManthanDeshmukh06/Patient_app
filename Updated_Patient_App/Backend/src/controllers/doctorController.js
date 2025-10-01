const Doctor = require("../models/Doctor");
const bcrypt = require("bcrypt");
const generateToken = require("../utils/generateToken");
const Hospital = require("../models/Hospital");
// ✅ Register Doctor
exports.registerDoctor = async (req, res) => {
  try {
    const {
      name,
      email,
      contact,
      password,
      hospital_id, // can be either ObjectId or HOSP01
      specialization,
      workingHours,
      slotSize,
      breaks,
    } = req.body;

    let hospitalObjectId = hospital_id;

    // If frontend accidentally sends HOSP01 → convert it to ObjectId
    if (typeof hospital_id === "string" && hospital_id.startsWith("HOSP")) {
      const hospital = await Hospital.findOne({ hospital_id }); // hospital_id = HOSP01
      if (!hospital) {
        return res.status(404).json({ message: "Hospital not found" });
      }
      hospitalObjectId = hospital._id; // ✅ Use ObjectId
    }

    const existingDoctor = await Doctor.findOne({ email });
    if (existingDoctor) {
      return res.status(400).json({ message: "Doctor already exists" });
    }

    const doctor = new Doctor({
      name,
      email,
      contact,
      password,
      hospital_id, // ✅ Always save ObjectId
      specialization,
      workingHours,
      slotSize,
      breaks,
    });

    await doctor.save();

    res.status(201).json({
      message: "Doctor registered successfully",
      token: generateToken(doctor._id, "doctor"),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// ✅ Login Doctor
exports.loginDoctor = async (req, res) => {
  try {
    const { email, password } = req.body;

    const doctor = await Doctor.findOne({ email });
    if (!doctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, doctor.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    res.json({
      message: "Login successful",
      token: generateToken(doctor._id, "doctor"),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
