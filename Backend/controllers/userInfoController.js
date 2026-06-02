import User from "../models/donorSchema.js";
import validatePhoneNumber from "../utilities/validatePhoneNumber.js";
import generateToken from "../utilities/generateToken.js";

// GET user info by ID
export const getUserInfo = async(req,res)=>{
    try{
        const user = await User.findById(req.user._id).select('-password');
        if(!user){
            return res.status(404).json({
                success:false,
                message:"User not found"
            });
        }
        res.status(200).json({
            success:true, 
            user
        });
    }catch(error){
        res.status(500).json({
            success:false,
            message:"Error getting user info",
            error:error.message
        })
    }
}

// UPDATE user info 
const updateUserInfo = async(req, res) => {
    const { name,phoneNumber,password, bloodGroup, location,organization,lastDonatedTime,currentlyAvailable,donationTimes,profileImage } = req.body;

    // Validate input - all fields required as per model
    if (!phoneNumber) {
        return res.status(400).json({
            success: false,
            message: "Phone number is required"
        });
    }

    // Validate phone format
    if (!validatePhoneNumber(phoneNumber)) {
        return res.status(400).json({
            success: false,
            message: "Invalid phone number"
        });
    }

    try {
        // Find user by phone number
        const user = await User.findOne({ phoneNumber });
        
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found. Please register first."
            });
        }

        // Update user with provided info
        if(name && name.trim() !== "")
            user.name = name;
        if(bloodGroup)
            user.bloodGroup = bloodGroup;
        if(location !== undefined)
            user.location = location;
        if(organization !== undefined)
            user.organization = organization;
        if(lastDonatedTime !== undefined)
            user.lastDonatedTime = lastDonatedTime;
        if(currentlyAvailable !== undefined)
            user.currentlyAvailable = currentlyAvailable;
        if(donationTimes !== undefined)
            user.donationTimes = donationTimes;
        if(profileImage)
            user.profileImage = profileImage;
        
        // Handle password update - compare with existing hashed password
        if(password && password.length >= 8) {
            const isSamePassword = await user.comparePassword(password);
            if(!isSamePassword) {
                user.password = password; // This will trigger the pre-save hook to hash the password
            }
        }
        
        // Save updated user
        const updatedUser = await user.save();

        // Generate JWT token
        const token = generateToken(user._id);

        return res.status(200).json({
            success: true,
            message: "User info updated successfully",
            user: {
                id: updatedUser._id,
                name: updatedUser.name,
                phoneNumber: updatedUser.phoneNumber,
                bloodGroup: updatedUser.bloodGroup,
                location: updatedUser.location,
                currentlyAvailable: updatedUser.currentlyAvailable
            },
            token: token
        });
    } catch (error) {
        console.error("Update user info error:", error);
        return res.status(500).json({
            success: false,
            message: "Error occurred while updating user info"
        });
    }
};

// DELETE user account
const deleteUserInfo = async(req, res) => {
    const userId = req.user._id

    try {
        // Find and delete user by ID
        const user = await User.findByIdAndDelete(userId);
        
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        return res.status(200).json({
            success: true,
            message: "User account deleted successfully"
        });
    } catch (error) {
        console.error("Delete user error:", error);
        return res.status(500).json({
            success: false,
            message: "Error occurred while deleting user account"
        });
    }
};

export {updateUserInfo, deleteUserInfo };
