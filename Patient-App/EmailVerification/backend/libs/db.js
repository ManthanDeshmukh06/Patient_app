import mongoose from "mongoose";

const DbCon = async () => {
  try {
    mongoose.connect(process.env.MONGODB_URL);
    console.log("MongoDB is Connected");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
};

export default DbCon;
