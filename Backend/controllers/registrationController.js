import User from "../models/user.js";
import validatePhoneNumber from "../utilities/validatePhoneNumber.js";


const registrationController = async (req , res)=>{

    const {name,phoneNumber,password} = req.body;

    // Validate input
    if(!name || !phoneNumber || !password){
        return res.status(400).json({ 
            success: false, 
            message: "Please provide name, phone number and password" 
        });
    }

    // check if the phone number is valid and matches the Bangladeshi format
    if(!validatePhoneNumber(phoneNumber)){
        return res.status(400).json({
            success: false,
            message: "Invalid phone number"
        });
    }

    try{
        // check if user already exists with the same phone number
        const isUserExist = await User.findOne({phoneNumber});
        if(isUserExist){
            return res.status(409).json({
                success: false,
                message: "User already exists with this phone number"
            });
        }
        // create new user
        const newUser = await User.create({
            name: name,
            phoneNumber: phoneNumber,
            password: password,
            expiresAt: new Date(Date.now() + 30 * 60 * 1000) // 30 minutes from now
        });
        return res.status(201).json({
            success: true,
            message: "User registered successfully",
            user: newUser   
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error occurred while registering user"
        });
    }
}

export default registrationController;