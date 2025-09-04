const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const {
  getMedicalHistory,
  addMedicalHistory,
} = require('../controllers/medicalHistoryController');

router.get('/', authMiddleware, getMedicalHistory);
router.post('/', authMiddleware, addMedicalHistory);

module.exports = router;
