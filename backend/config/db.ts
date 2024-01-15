import mongoose from "mongoose";

const connectDB = async () => {
  try {
    if (typeof process.env.MONGO_URI === 'string') { // Check if MONGO_URI is defined
      const conn = await mongoose.connect(process.env.MONGO_URI);
      console.log(`MongoDB Connected: ${conn.connection.host}`);
    } else {
      throw new Error('MONGO_URI is undefined');
    }
  } catch (error: any) { // Catch any errors
    console.log(`Error: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;