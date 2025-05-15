import mongoose, { connection } from "mongoose";

type ConnectionObject = {
  isConnected?: number;
};
const connection: ConnectionObject = {};

const connectDB: Promise<void> = async () => {
  if (connection.isConnected) {
    return;
  }
  try {
    const conn = await mongoose.connect(process.env.DATABASE_URL, {
      useNewUrlParser: true,
    });
    connection.isConnected = conn._readyState;

    console.log(`MongoDB Connected:`, conn.connection.host);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;
