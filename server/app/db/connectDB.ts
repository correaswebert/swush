import mongoose from 'mongoose'

const uri = "mongodb://127.0.0.1:27017/swush";

const connectDB = async() => {
    await mongoose.connect(uri, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true,
        useFindAndModify: false
    });
}

export { connectDB }