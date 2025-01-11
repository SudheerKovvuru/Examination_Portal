import { UserModel } from "../Models/User.js";
import bycrypt from "bcrypt";
import jwt from "jsonwebtoken";

const signup = async (req, res) => {
    try{
        const {username,password}=req.body;
        const user= await UserModel.findOne({username});
        if(user){
            return res.status(400).json({message:"user already exists",success:false});
        }
        const userModel=new UserModel({username,password});
        userModel.password=await bycrypt.hash(password,10);
        await userModel.save();
        res.status(201).json({message:"user created successfully" ,success:true});
    }
    catch(err){
        res.status(500).json({message:"server error",success:false});
    }
};

const login = async (req, res) => {
    try{
        const {username,password}=req.body;
        const user= await UserModel.findOne({username});
        if(!user){
            return res.status(403).json({message:"Incorrect Data",success:false});
        }
        const isPasswordValid=await bycrypt.compare(password,user.password);
        if(!isPasswordValid){
            return res.status(403).json({message:"Incorrect Data",success:false});
        }
        const jwttoken=jwt.sign({username},process.env.JWT_SECRET,{expiresIn:"2h"});
        res.status(200).json({message:"login successfully" ,success:true,jwttoken,username});
    }
    catch(err){
        res.status(500).json({message:"server error",success:false});
    }
};

export {signup,login};