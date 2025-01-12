import { UserModel } from "../Models/User.js";
import bycrypt from "bcrypt";
import jwt from "jsonwebtoken";

const signup = async (req, res) => {
    try{
        const {username,password}=req.body;
        const user= await UserModel.findOne({username});
        if(user){
            return res.status(400).json({message:"User already exists",success:false});
        }
        const userModel=new UserModel({username,password});
        userModel.password=await bycrypt.hash(password,10);
        await userModel.save();
        res.status(201).json({message:"User created successfully" ,success:true});
    }
    catch(err){
        res.status(500).json({message:"Server error",success:false});
    }
};

const login = async (req, res) => {
    try{
        const {username,password}=req.body;
        const user= await UserModel.findOne({username});
        if(!user){
            console.log("User not found");
            return res.status(403).json({message:"User not found",success:false});
        }
        const isPasswordValid=await bycrypt.compare(password,user.password);
        if(!isPasswordValid){
            return res.status(403).json({message:"Password incorrect",success:false});
        }
        const jwttoken=jwt.sign({username},process.env.JWT_SECRET,{expiresIn:"2h"});
        res.status(200).json({message:"Login successfully" ,success:true,jwttoken,username});
    }
    catch(err){
        res.status(500).json({message:"Server error",success:false});
    }
};

export {signup,login};