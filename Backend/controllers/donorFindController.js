import Donor from "../models/donorSchema";

const donorFindController = async (req, res) => {
    const { bloodGroup, location } = req.query;
    if(!bloodGroup || !location){
        return res.status(400).json({
            success: false,
            message: "Please provide both bloodGroup and location as query parameters"
        });
    }
    try{
        const donors = await Donor.find({
            bloodGroup: bloodGroup,
            location: location,
        }).select("-password -__v"); // exclude password and version fields
        if(donors.length === 0){
            return res.status(404).json({
                success: false,
                message: "No donors found matching the criteria"
            });
        }
        return res.status(200).json({
            success: true,
            donors: donors.map(donor => ({
                id: donor._id,
                name: donor.name,
                phoneNumber: donor.phoneNumber,
                bloodGroup: donor.bloodGroup,
                location: donor.location,
                lastDonatedTime: donor.lastDonatedTime,
                currentlyAvailable: donor.currentlyAvailable,
                donationTimes: donor.donationTimes,
                profileImage: donor.profileImage
            }))
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        }); 
    }

}
export default donorFindController;