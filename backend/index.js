import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import './Models/db.js';
import bodyParser from 'body-parser';
import cors from 'cors';
import {router} from './Routes/AuthRouter.js';
import { questionRouter } from './Routes/QuestionRouter.js';




const port=process.env.PORT;
const app = express();
app.get('/',(req,res)=>{res.send("Backend of Aitam ExamPortal")});

app.use(bodyParser.json());
app.use(cors());


app.use('/auth',router);
app.use('/',questionRouter);
app.listen(port,()=>console.log(`server is running on port ${port}`));