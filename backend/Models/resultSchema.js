
import mongoose from "mongoose";
const Schema=mongoose.Schema

const resultModel=new Schema({
    username:{type:String},
    result:{type:Array,default:[]},
    correct:{type:Number,default:0},
    marks:{type:Number,default:0},
    achived:{type:String,default:''},
    createdAt:{type:Date,default:Date.now}
})

export default mongoose.model('result',resultModel);