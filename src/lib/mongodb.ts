import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI!;

declare global {
  var mongooseCache: {
    conn: typeof mongoose | null;
    promise: Promise<typeof mongoose> | null;
  };
}

if (!global.mongooseCache) {
  global.mongooseCache = { conn: null, promise: null };
}

async function connectToMongo() {
  if (global.mongooseCache.conn) {
    return global.mongooseCache.conn;
  }
  if (!global.mongooseCache.promise) {
    global.mongooseCache.promise = mongoose.connect(MONGODB_URI).then((m) => m);
  }
  global.mongooseCache.conn = await global.mongooseCache.promise;
  return global.mongooseCache.conn;
}

export default connectToMongo;
