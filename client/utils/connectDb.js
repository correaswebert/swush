import mongoose from 'mongoose';

const { MONGODB_URI, MONGODB_DB } = process.env;
const ERR_DB_CONN = 'Error connecting to database!';

if (!MONGODB_URI) {
  console.error('MONGODB_URI not defined!');
  throw new Error(ERR_DB_CONN);
}

if (!MONGODB_DB) {
  console.error('MONGODB_DB not defined!');
  throw new Error(ERR_DB_CONN);
}

export async function connectToDatabase() {
  // if already connected, do not reconnect
  if (mongoose.connection.readyState >= 1) return;

  try {
    await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true
    });
    console.log('Database connected!');
  } catch (error) {
    throw new Error(ERR_DB_CONN);
  }
}
