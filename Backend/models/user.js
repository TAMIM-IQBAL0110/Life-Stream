import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const validBloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

const userSchema = new mongoose.Schema({
    name:{type:String,required:true,trim:true},
    phoneNumber: { type: String, required: true, unique: true, minlength: 11 },
    password: { type: String, required: true, trim: true, minlength: 8 },
    bloodGroup:{ type: String,enum: validBloodGroups,trim: true },
    location:{ type: String, required: false, trim: true},
    organization:{ type: String, trim: true},
    isDonor:{ type: Boolean, default: false},
    lastTimeDonated:{ type: Date, default: null},
    currentlyAvailable:{ type: Boolean, default: true},
    donationTimes:{ type: Number, default: 0},
    isVerified:{ type: Boolean, default: false},
    firebaseUID:{ type: String, default: null, unique: true, sparse: true },
    otp:{ type: Number, default: null},
    profileImage:{ type: String, default: ""},
    expiresAt: { type: Date, default: null } // use this field to set the expiration time for the user document

},{timestamps:true});

// TTL INDEX (auto delete when expiresAt reached)
userSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

// Hash the password before saving the user
userSchema.pre('save',async function (){
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
userSchema.methods.comparePassword = async function (candidatePassword){
    return await bcrypt.compare(candidatePassword,this.password);
}

const User = mongoose.model('User',userSchema);
export default User;