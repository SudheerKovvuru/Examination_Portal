import mongoose from "mongoose";
const Schema=mongoose.Schema;

const questionModel=new Schema({
    examname:{type:String,default:''},
    questions:{type:Array,default:[]},
    answers:{type:Array,default:[]},
    createdAt:{type:Date,default:Date.now},
    endAt: { 
        type: Date, 
        default: function() {
          return new Date(this.createdAt.getTime() + 24 * 60 * 60 * 1000);
        }
      }
})

export default mongoose.model("Question",questionModel);