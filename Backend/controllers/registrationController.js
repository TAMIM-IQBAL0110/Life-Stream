import User from "../models/donorSchema.js";
import validatePhoneNumber from "../utilities/validatePhoneNumber.js";


const registrationController = async (req , res)=>{

    const {name,phoneNumber,password,bloodGroup,location} = req.body;

    // Validate input
    if(!name || !phoneNumber || !password || !bloodGroup || !location){
        return res.status(400).json({ 
            success: false, 
            message: "Please provide all required fields: name, phoneNumber, password, bloodGroup, location" 
        });
    }

    // Check if the phone number is valid and password is strong enough
    if(!validatePhoneNumber(phoneNumber)){
        return res.status(400).json({
            success: false,
            message: "Invalid phone number format. Use Bangladesh format: 01XXXXXXXXX or +8801XXXXXXXXX"
        });
    }

    if(password.length < 8){
        return res.status(400).json({
            success: false,
            message: "Password must be at least 8 characters long"
        });
    }

    try{
        // Check if user already exists with the same phone number
        const isUserExist = await User.findOne({phoneNumber});
        if(isUserExist && isUserExist.role === "individual"){
            return res.status(409).json({
                success: false,
                message: "User already exists with this phone number"
            });
        }
        if(isUserExist && isUserExist.role === "admin"){
            isUserExist.name = name.trim();
            isUserExist.password = password;
            isUserExist.bloodGroup = bloodGroup.trim();
            isUserExist.location = location.trim();
            isUserExist.role = "individual";
            await isUserExist.save();
            return res.status(200).json({
                success: true,
                message: "User registered successfully",
                user: {
                    id: isUserExist._id,
                    name: isUserExist.name,
                    phoneNumber: isUserExist.phoneNumber,
                    bloodGroup: isUserExist.bloodGroup,
                    location: isUserExist.location
                }
            });
        }
        // Create new user
        const newUser = await User.create({
            name: name.trim(),
            phoneNumber: phoneNumber.trim(),
            password: password,
            bloodGroup: bloodGroup.trim(),
            location: location.trim()
        });

        return res.status(201).json({
            success: true,
            message: "User registered successfully",
            user: {
                id: newUser._id,
                name: newUser.name,
                phoneNumber: newUser.phoneNumber,
                bloodGroup: newUser.bloodGroup,
                location: newUser.location
            }
        });
    } catch (error) {
        console.error("Registration error details:", error.message);
        console.error("Error stack:", error.stack);
        console.error("Error name:", error.name);
        
        // Handle validation errors from mongoose
        if(error.name === 'ValidationError'){
            const messages = Object.values(error.errors).map(err => err.message);
            return res.status(400).json({
                success: false,
                message: messages.join(', ')
            });
        }

        // Handle duplicate key error
        if(error.code === 11000){
            return res.status(409).json({
                success: false,
                message: "Phone number already registered"
            });
        }

        return res.status(500).json({
            success: false,
            message: `Error occurred while registering user: ${error.message}`
        });
    }
}

export default registrationController;