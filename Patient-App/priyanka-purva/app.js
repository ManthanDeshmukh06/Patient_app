// const express = require("express");
// const bodyParser = require("body-parser");
// const connectDB = require("./src/config/ConnectToMongoDb");
// const dotenv = require("dotenv");
// dotenv.config();

// const app = express();

// // Connect to MongoDB
// connectDB();

// // Middlewares
// app.use(bodyParser.json());
// app.use(express.json());

// // Routes
// const authRoutes = require("./src/routes/authRoutes");
// const medicalHistoryRoutes = require("./src/routes/medicalHistoryRoutes");

// app.use("/api/auth", authRoutes);
// app.use("/api/patient", medicalHistoryRoutes); // <-- correct mounting

// app.get("/", (req, res) => {
//   res.send("Welcome to the Hospital Management System API");
// });

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, "0.0.0.0", () => {
//   console.log(`Server running on port ${PORT}`);
// });
const express = require("express");
const bodyParser = require("body-parser");
const connectDB = require("./src/config/ConnectToMongoDb");
const dotenv = require("dotenv");

dotenv.config();
const app = express();
connectDB();

app.use(bodyParser.json());
app.use(express.json());

// Routes
const authRoutes = require("./src/routes/authRoutes");
const medicalHistoryRoutes = require("./src/routes/medicalHistoryRoutes");

app.use("/api/auth", authRoutes);
app.use("/api/patient/medical-history", medicalHistoryRoutes);

app.get("/", (req, res) => {
  res.send("Welcome to the Hospital Management System API");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});
