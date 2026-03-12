const mongoose = require('mongoose');

/**
 * Handles MongoDB connection using Mongoose.
 * Integrated with process environment variables for secure deployment.
 */
async function connectDB() {
    try {
        if (mongoose.connection.readyState >= 1) {
            console.log("Using existing database connection");
            return;
        }
        const conn = await mongoose.connect(process.env.MONGODB_URL);

        console.log(`DB connected`);
    } catch (err) {
        console.error('Error in connecting with database:', err.message);

        process.exit(1);
    }
}

module.exports = connectDB;