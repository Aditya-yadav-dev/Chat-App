import jwt from 'jsonwebtoken'
import User from '../models/User.js';

export const protectRoute = async (req, res, next) => {
    try {
        const token = req.headers.token;
        // console.log("token is extract from headers",token)
        
        const decode = jwt.verify(token, process.env.JWT_SECRETE)

        const user= await User.findById(decode.userId).select('-password')
        
        if(!user){
            return res.json({message:"user not found!", success: false})
        }
        req.user = user;
        next();
    } catch (error) {
        // console.log(error.message)
        return res.json({message: error.message, success: false})

    }
}