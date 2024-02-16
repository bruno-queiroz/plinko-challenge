import mongoose from "mongoose";

export const connectDb = async () => {
  await mongoose.connect(process.env.MONGODB_URL!);
  console.log("connected to the database");
};
