const express = require("express");
const router = express.Router();

const {
  registerDoctor,
  loginDoctor,
} = require("../controllers/doctorController");
const { isLoggedIn } = require("../middleware/authMiddleware");
const Doctor = require("../models/Doctor");
// Doctor Register
router.post("/register", registerDoctor);

// Doctor Login
router.post("/login", loginDoctor);

// Example: Protected route (Doctor profile)
router.get("/profile", isLoggedIn, (req, res) => {
  res.json({
    message: "Doctor profile fetched successfully",
    doctor: req.user, // 🩺 comes from isLoggedIn middleware
  });
});

router.get("/hospital/:hospitalId", async (req, res) => {
  try {
    const hospitalId = req.params.hospitalId; // now HOSP01
    const doctors = await Doctor.find({ hospital_id: hospitalId });
    res.json(doctors);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching doctors", error: error.message });
  }
});

module.exports = router;
