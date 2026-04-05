import jwt from 'jsonwebtoken';
import User from '../models/donorSchema.js';

const protect = async (req, res, next)=>{
    let token = req.headers.authorization;

    if(!token){
        return res.status(401).json({message:"Not authorized, no token"});
    }

    try{
        // Remove "Bearer " if present
        if(token.startsWith("Bearer ")){
            token = token.split(" ")[1];
        }
        const decoded  =  jwt.verify(token,process.env.JWT_SECRET);
        const user = await User.findById(decoded.id).select("-password");

        //check if user exists
        if(!user) throw new Error("User not found");

        req.user = user;
        next();

    } catch (error) {
        next(error); // passes error to global error handler
    }
}
export default protect;