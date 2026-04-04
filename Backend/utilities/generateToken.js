import jwt from 'jsonwebtoken';

// jwt.sign(payload, secret, options)
const generateToken = (id)=>{
    return jwt.sign({id}, process.env.JWT_SECRET, {
        expiresIn:"30d",
    });
}
export default generateToken;