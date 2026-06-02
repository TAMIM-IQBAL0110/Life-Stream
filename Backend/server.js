import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import mongoose  from 'mongoose';
import healthLimiter from './middlewares/healthLimiter.js';
import authRoutes from './routes/authRoutes.js'
import donorRoutes from './routes/donorRoutes.js'
import donorFindRoutes from './routes/donorFindRoutes.js';

// Load environment variables from .env file
dotenv.config();

// create express application 
const app = express() 

// json parsing middleware -> convert json request to js object
app.use(express.json())

// Cors middleware -> check the requested origin (allowed or not)
const allowedOrigins = (
    process.env.CLIENT_URL || 
    'http://localhost:5173'
).split(',').map(url => url.trim());

app.use(cors({
    origin:(origin,callback) =>{
        // Allow requests with no origin (like mobile apps or curl)
        if(!origin) return callback(null,true); 

        // checks allowable origin match with origin or not
        if(allowedOrigins.includes(origin)) return  callback(null,true);

        // if origin is not allowable
        const error = new Error("Origin is not allowed by CORS");
        error.status = 403; // Set proper HTTP status
        return callback(error, false);
    },
    methods:['GET','POST','PUT','DELETE'],
    allowedHeaders:['Content-Type','Authorization'],
    credentials:true
}));


// Health Checks endpoint 
app.get('/health',healthLimiter,(req,res)=>{
    
    const response = {
        status:"Server is running",
        database: mongoose.connection.readyState === 1? "Connected" : "Disconnected"
    }

    res.status(200).json(response)
});

// connect to MongoDB
connectDB();

//Route Handling
app.use("/api/v1/auth",authRoutes);
app.use("/api/v1/donor",donorRoutes);
app.use("/api/v1/search",donorFindRoutes);


// 404 Not Found Handler
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: `Route ${req.originalUrl} not found`
    });
});


// Global Error Handler
app.use((err, req, res, next) => {
    console.error("Error:", err.message);

    res.status(err.status || 500).json({
        success: false,
        message: err.message || "Internal Server Error"
    });
});


app.listen(process.env.PORT || 5000, () => {
    console.log(`Server is running on port ${process.env.PORT || 5000}`);
});



