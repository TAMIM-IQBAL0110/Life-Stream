import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config()

let isConnected = false;

const connectDB = async()=>{
    if(isConnected){
        console.log("MongoDB already connected")
        return;
    }

    try{
        // checks MongoDB_URL enviroment is set or not
        if(!process.env.MONGODB_URL){
            throw new Error ('MongoDB url enviroment variable is not set');
        }

        console.log("Attempting to connect MongoDB.... ")
        await mongoose.connect(process.env.MONGODB_URL,{

            //How long to wait to connect to MongoDB
            connectTimeoutMS: 10000, // 10 seconds

            //How long to wait for a database query response
            socketTimeoutMS: 45000, // 45 seconds
            
        })
        isConnected = true;
        console.log("MongoDB connected successfully")

    }catch(error){
        console.error("Error connecting to MongoDB:", error.message);
        isConnected = false;
        
        // Retry connection after 5 seconds
        console.log("🔄 Retrying MongoDB connection in 5 seconds...");
        setTimeout(connectDB, 5000);
    }
}

export default connectDB;
