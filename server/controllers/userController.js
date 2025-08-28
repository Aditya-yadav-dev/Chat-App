import cloudinary from "../lib/Cloudinary.js";
import { generateToken } from "../lib/utils.js";
import User from "../models/User.js";
import bcrypt from 'bcryptjs'

export const signup = async (req, res) => {
    try {   
        // console.log("something is missig")
        const {fullname, email, password, bio} = req.body;

        if(!fullname || !email || !password || !bio){
            return res.json({success: true, message: "Missig details"})
        }
        const user = await User.findOne({email});

        if(user){
            return res.json({success: true, message: "User already exists!"})
        }
        const hashedPassword = await bcrypt.hash(password,10);
        // console.log("before user created")
        
        const newUser = await User.create({
            fullname,
            email,
            password: hashedPassword,
            bio
        })
  
        // console.log("new user has been created")

        const token = generateToken(newUser._id);
         return res.json({success: true, userData: newUser, token, message: "Account created succesfully"})
    } catch (error) {
        return res.json({message: "signUp failed!", success: false})
    }

}


export const login = async (req, res) => {
    try {
        const {email, password} = req.body;
        if(!email || !password){
            return res.json({success: true, message: "Missig details"})
        }
        const user = await User.findOne({email});
        if(!user){
            return res.json({success: true, message: "User doesn't exist!"})
        }
        const isCorrectPassword = await bcrypt.compare(password,user.password);
        if(!isCorrectPassword){
            return res.json({success: false, message: "Invalid Credentials!"});
        }

        const token = generateToken(user._id);
         return res.json({success: true, userData: user, token, message: "Login successfully!"})

    } catch (error) {
        //  console.log(error.message);
        return res.json({message: "Login failed!", success: false})
    }
}

// controller to check if user is authenticate

export const checkAuth = (req, res)=>{
    res.json({success: true, user: req.user});
}

export const updateProfile = async (req,res) => {
    try {
        const {profilePic, bio, fullName} = req.body;
        // console.log("profile pic is:", profilePic)
        const userId = req.user._id;
        let updatedUser;
        if(!profilePic){
            updatedUser = await User.findByIdAndUpdate(userId, {bio, fullName},{new:true})
        } else{
            const upload = await cloudinary.uploader.upload(profilePic)
            updatedUser = await User.findByIdAndUpdate(userId,{profilePic: upload.secure_url,bio, fullName},{new:true})
        }
        res.json({success: true, user: updatedUser})
    } catch (error) {
        res.json({success: false, message: error.message})
    }
}