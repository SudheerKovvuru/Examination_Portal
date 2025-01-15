import mongoose from "mongoose";
const Schema=mongoose.Schema;

const questionModel=new Schema({
    examname:{type:String,default:''},
    questions:{type:Array,default:[]},
    answers:{type:Array,default:[]},
    createdAt:{type:Date,default:Date.now}
})

export default mongoose.model("Question",questionModel);