const MedicalHistory = require('../models/MedicalHistory');

// GET latest 3 medical history for logged-in user
exports.getMedicalHistory = async (req, res) => {
  try {
    const history = await MedicalHistory.find({ user: req.user._id })
      .sort({ date: -1 })
      .limit(3); // only latest 3
    res.json(history);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// POST new medical history
exports.addMedicalHistory = async (req, res) => {
  try {
    const { diagnosis, prescription, date } = req.body;

    if (!diagnosis || !prescription || !date) {
      return res.status(400).json({ message: 'Please fill all fields' });
    }

    const newHistory = await MedicalHistory.create({
      user: req.user._id,
      diagnosis,
      prescription,
      date,
    });

    res.status(201).json(newHistory);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
