import { env } from "../config/env";
import mongoose from "mongoose";

 
export const disconnectDB = async (): Promise<void> => { 
  await mongoose.disconnect(); 
} 


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

afterAll(async () => { 
    console.log('Run once after tests'); 
   await disconnectDB(); 

}); 