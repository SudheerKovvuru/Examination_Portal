import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import './Models/db.js';
import bodyParser from 'body-parser';
import cors from 'cors';
import {router} from './Routes/AuthRouter.js';
const port=process.env.PORT;
const app = express();
app.get('/',(req,res)=>{res.send("Hello World")});

app.use(bodyParser.json());
app.use(cors());
app.use('/auth',router);
app.listen(port,()=>console.log(`server is running on port ${port}`));