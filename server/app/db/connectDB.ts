import { connect } from "mongoose";

const connectDB = async (mongoUri: string) => {
  try {
    await connect(mongoUri, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    });
    console.log(`Database connected at ${mongoUri}`);
  } catch (error) {
    console.error("Error connecting database", error.message);
    process.exit(1);
  }
};

export { connectDB };
