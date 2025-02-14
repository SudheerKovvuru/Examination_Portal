import { useLocation, useNavigate } from 'react-router-dom';
import '../styles/Result.css';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { getServerResult } from '../helper/Helper';
function Result()
{
    const navigate=useNavigate();
    const location=useLocation();
    const examname=location.state;
    const [result,setResult]=useState([]);
    const [correct,setCorrect]=useState(0);
    const [marks,setMarks]=useState(0);
    const [achieved,setAchieved]=useState("");
    const getResult=()=>{
        (async()=>{
            try {
            const data=await getServerResult(import.meta.env.VITE_RESULT,{username:localStorage.getItem("username"),examname},data=>data); 
            setResult(data.result);
            setCorrect(data.correct);
            setMarks(data.marks);
            setAchieved(data.achieved);
            } catch (error) {
                console.log(error)
            }
        })();
    }
    getResult();
    return(
        <>
        <nav>
        <img src="./src/assets/aitam.png" alt=""/>
      </nav>
        <div className="result-page">
      <div className="result-card">
        <h1 className="quiz-name">Internal Exam</h1>
        <div className="result-details">
            <div className="result-section">
                <h4>Username</h4>
                <p>{localStorage.getItem("username")}</p>
            </div>
            <div className="result-section">
                <h4>Total no of question </h4>
                <p>{result.length}</p>
            </div>
            <div className="result-section">
                <h4>Total marks:</h4>
                <p>{marks}</p>
            </div>
            <div className="result-section">
                <h4>correct answers</h4>
                <p>{correct/10}</p>
            </div>
            <div className="result-section">
                <h4>Marks Obtained</h4>
                <p>{correct}</p>
            </div>
            <div className="result-section">
                <h4>Status</h4>
                <p style={{ color: achieved === "passed" ? "green" :"red",fontWeight:600 }}>{achieved}</p>
            </div>
            <button className='back-btn'onClick={()=>navigate("/home")}>Back</button>
        </div>
      </div>
    </div>
    </>
    );
}
export default Result;