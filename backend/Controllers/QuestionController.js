import Questions from "../Models/questionSchema.js";
import resultSchema from "../Models/resultSchema.js";
import Results from "../Models/resultSchema.js";
import questions,{answers,examname} from "../database/data.js";
import questions2,{answers2,examname2} from "../database/data2.js";
import questions3,{answers3,examname3} from "../database/data3.js";
export async function getQuestions(req,res){
    try {
        const q=await Questions.find()
        res.json(q)
    } catch (error) {
        res.json({error})
    }
}
export async function insertQuestions(req, res) {
    try {
        await Questions.insertMany([
            {examname,questions,answers},
            {examname:examname2,questions:questions2,answers:answers2},
            {examname:examname3,questions:questions3,answers:answers3},
        ]);

        res.json({ msg: "Data saved successfully."});
    } catch (error) {
        res.json({ error});
    }
}

export async function deleteQuestions(req,res) {
    try {
        await Questions.deleteMany();
        res.json({msg:"Questions Deleted Successfully."});
    } catch (error) {
        res.json({error});
    }
}




export async function getResult(req,res) {
    try {
        const r=await Results.find();
        res.json(r)
    } catch (error) {
     res.json({error})   
    }
}
export async function postResult(req,res) {
    try {
        const {username,result,correct,marks,achived}=req.body;
        if(!username && !result) throw new Error("Data not provided..");
        await Results.create({username,result,correct,marks,achived});
        res.json({msg:"result Saved Successfully.."})
    } catch (error) {
        res.json({error})
    }
}
export async function deleteResult(req,res) {
    try {
        await Results.deleteMany();
        res.json({msg:"Results deleted successfully"})
    } catch (error) {
        res.json({error})
    }
}


