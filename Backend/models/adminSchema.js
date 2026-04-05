const adminSchema = new mongoose.Schema({
    name: String,
    phoneNumber: String,
    password: String,
    role: {
        type: String,
        enum: ["admin"],
        default: "admin"
    }
});
export default mongoose.model("Admin", adminSchema);