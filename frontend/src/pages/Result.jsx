import { useLocation, useNavigate } from 'react-router-dom';
import '../styles/Result.css';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
function Result()
{
    const navigate=useNavigate();
    const location=useLocation();
    const examname=location.state;
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
                {/* <p>{queue.length}</p> */}
            </div>
            <div className="result-section">
                <h4>Total marks:</h4>
                {/* <p>{totalMarks}</p> */}
            </div>
            <div className="result-section">
                <h4>correct answers</h4>
                {/* <p>{earnMarks/10}</p> */}
            </div>
            <div className="result-section">
                <h4>Marks Obtained</h4>
                {/* <p>{earnMarks}</p> */}
            </div>
            <div className="result-section">
                <h4>Status</h4>
                {/* <p style={{ color: achieved === "passed" ? "green" :"red",fontWeight:600 }}>{achieved}</p> */}
            </div>
            <button className='back-btn'onClick={()=>navigate("/home")}>Back</button>
        </div>
      </div>
    </div>
    </>
    );
}
export default Result;