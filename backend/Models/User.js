import mongoose from "mongoose";
const Schema=mongoose.Schema;

const UserSchema=new Schema({
    username:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
});

const UserModel=mongoose.model("Students",UserSchema);
export { UserModel };