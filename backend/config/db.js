const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        // console.log(`✅ Database connected successfully`);
        console.log(`✅ MongoDB Connected successfully`);
    } catch (error) {
        console.error(`❌ DB Connection Error: ${error.message}`);
        process.exit(1);   // Stop the server if DB fails
    }
}

module.exports=connectDB;