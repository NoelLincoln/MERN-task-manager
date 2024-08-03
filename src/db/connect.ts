import mongoose from 'mongoose';

const connectDB = (url: string): Promise<typeof mongoose> =>
  mongoose.connect(url);

export default connectDB;
