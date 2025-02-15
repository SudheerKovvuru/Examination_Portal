
import mongoose from "mongoose";
const Schema=mongoose.Schema

const resultModel=new Schema({
    username:{type:String},
    result:{type:Array,default:[]},
    correct:{type:Number,default:0},
    marks:{type:Number,default:0},
    achieved:{type:String,default:''},
    createdAt:{type:Date,default:Date.now},
    examname:{type:String,default:''},
})

export default mongoose.model('Result',resultModel);