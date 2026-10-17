import mongoose from 'mongoose';

export async function connectDB() {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    throw new Error('MONGODB_URI is not configured');
  }
  // Reuse the existing connection between requests
  if (mongoose.connection.readyState === 1) return;
  await mongoose.connect(uri);
}
