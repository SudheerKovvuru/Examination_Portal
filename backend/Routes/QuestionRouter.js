import { Router } from "express";
import { deleteQuestions, deleteResult, getQuestions, getResult, insertQuestions, postResult } from "../Controllers/QuestionController.js";
const questionRouter=Router();
questionRouter.get("/questions",getQuestions);
questionRouter.post("/questions",insertQuestions);
questionRouter.delete("/questions",deleteQuestions);

questionRouter.get("/result",getResult);
questionRouter.post("/result",postResult);
questionRouter.delete("/result",deleteResult);
export {questionRouter}