import express from 'express'
import generateToken from '../utilities/generateToken.js';
import validatePhoneNumber from '../utilities/validatePhoneNumber.js';
import Donor from '../models/donorSchema.js';


const loginController = async(req,res,next)=>{
    const {phoneNumber, password} = req.body;
    // Validate input
    if(!phoneNumber || !password){
        return next({ status: 400, message: "Please provide phone number and password" });
    }
    
    // check if the phone number is valid and matches the Bangladeshi format
    if(!validatePhoneNumber(phoneNumber)){
            return next({ status: 400, message: "Invalid phone number" });
    }
    
    try{
        // Find donor by phone number
        const user = await Donor.findOne({phoneNumber});
        if(!user){
            return next({ status: 401, message: "Invalid phone number or password" });
        }
        
        // Check if password matches
        const isMatch = await user.comparePassword(password);
        if(!isMatch){
            return next({ status: 401, message: "Invalid phone number or password" });
        }

        // Generate token
        const token = generateToken(user._id);
        // Send response with user data and token
        res.status(200).json({
            success:true,
            message:"Login successful",
            user:{
                id:user._id,
                phoneNumber: user.phoneNumber,
                name: user.name,
                isVerified: user.isVerified,
            },
            token:token
        })
    }catch(error){
        console.error("Login error:", error);
        return next(error);
    }


}
export default loginController;