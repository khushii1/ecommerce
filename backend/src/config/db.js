import mongoose from 'mongoose';
import Category from '../models/Category.js';

const cleanupLegacyCategoryIndexes = async () => {
  const indexes = await Category.collection.indexes();
  const hasLegacySlugIndex = indexes.some((index) => index.name === 'slug_1');

  if (hasLegacySlugIndex) {
    await Category.collection.dropIndex('slug_1');
    console.log('🧹 Removed legacy categories slug_1 index');
  }

  await Category.syncIndexes();
};

const connectDB = async () => {
  try {
    if (!process.env.MONGODB_URI) throw new Error('Missing MONGODB_URI');

    await mongoose.connect(process.env.MONGODB_URI);
    await cleanupLegacyCategoryIndexes();

    console.log("✅ MongoDB Connected");
  } catch (error) {
    console.error("❌ MongoDB Error:", error.message);
    process.exit(1);
  }
};

export default connectDB;