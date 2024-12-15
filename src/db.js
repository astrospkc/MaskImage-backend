import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";

const connectToMongo = async () => {
  const connected = await mongoose.connect(process.env.MONGO_URI || "");

  if (!connected) {
    throw new Error("Failed to connect to MongoDB");
  } else {
    console.log("Connected to MongoDB");
  }
};
export default connectToMongo;
