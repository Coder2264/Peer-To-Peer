import mongoose from 'mongoose';

const connectDB = async () => {
    const uri=process.env.MONGO_URI;
    try {
        const connectionInstance = await mongoose.connect(`${uri}`);
        console.log('MongoDB connected');
    } catch (error) {
        console.error('MongoDB connection failed');
        process.exit(1);
    }
}

export default connectDB;