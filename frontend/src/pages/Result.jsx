import { useNavigate } from 'react-router-dom';
import '../styles/Result.css';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { earnPoints } from '../helper/Helper';
function Result()
{
    const navigate=useNavigate();

    const {questions:{queue,answers},result:{result,userId}}=useSelector(state=>state);
    // useEffect(()=>{
    //     console.log(result);
    // })
    const totalMarks=queue.length*10;
    const earnMarks=earnPoints(result,answers,10);
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
                <p>{queue.length}</p>
            </div>
            <div className="result-section">
                <h4>Total marks:</h4>
                <p>{totalMarks}</p>
            </div>
            <div className="result-section">
                <h4>correct answers</h4>
                <p>{earnMarks/10}</p>
            </div>
            <div className="result-section">
                <h4>Marks Obtained</h4>
                <p>{earnMarks}</p>
            </div>
            <button className='back-btn'onClick={()=>navigate("/home")}>Back</button>
        </div>
      </div>
    </div>
    </>
    );
}
export default Result;