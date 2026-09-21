import { env } from "../config/env";
import mongoose from "mongoose";


export const connectDB = async () : Promise<void> => {
  try{
    console.log(`Connecting to MongoDB at ${env.mongodbUri}`);
    const conn = await mongoose.connect(env.mongodbUri);
    console.log(`MongoDB connected: ${conn.connection.host}`);

  }catch (error){
    console.error(`Error connecting to MongoDB: ${error}`);
    process.exit(1);
  }
};