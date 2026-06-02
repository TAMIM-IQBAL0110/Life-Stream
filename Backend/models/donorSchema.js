import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const validBloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

const donorSchema = new mongoose.Schema({
    name:{type:String,required:true,trim:true},
    phoneNumber: { type: String, required: true, unique: true, minlength: 11 },
    role: { type: String, enum: ["individual", "admin"], default: "individual" },
    password: { type: String, required:function(){return this.role === "individual"}, trim: true, minlength: 8 },
    bloodGroup:{ type: String,required:true, enum: validBloodGroups,trim: true },
    location:{ type: String, required: true, trim: true},
    organization:{ type: String, trim: true},
    lastDonatedTime:{ type: Date, default: null},
    currentlyAvailable:{ type: Boolean, default: true},
    donationTimes:{ type: Number, default: 0},
    profileImage:{ type: String, default: ""},

},{timestamps:true});

// Hash the password before saving the user
donorSchema.pre('save',async function (){
    // Only hash the password if it has been modified (or is new)
    if(!this.isModified('password')) return;
    try{
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password,salt);
    }catch(error){
        console.error("Password hashing error:", error);
        throw new Error('Error hashing password');
    }
});

//compare passwords 
donorSchema.methods.comparePassword = async function (candidatePassword){
    return await bcrypt.compare(candidatePassword,this.password);
}

const Donor = mongoose.model('Donor',donorSchema);
export default Donor;