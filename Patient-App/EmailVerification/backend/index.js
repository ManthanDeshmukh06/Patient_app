//console.log("hello");
import express from "express";
import dotenv from "dotenv";
import DbCon from "./libs/db.js";
import AuthRoutes from "./routes/Auth.routes.js";

dotenv.config();
DbCon();
const PORT = process.env.PORT || 8000;
const app = express();
app.use(express.json());
app.use("/auth", AuthRoutes);
app.listen(PORT, () => {
  console.log(`App is running on port ${PORT}`);
});
