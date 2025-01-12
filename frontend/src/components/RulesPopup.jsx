import React, { useState } from "react";
import "../styles/RulesPopup.css";
import { useNavigate} from "react-router-dom";
const RulesPopup = ({onClose}) => {
  const [isAgreed, setIsAgreed] = useState(false);

  const handleCheckboxChange = () => {
    setIsAgreed(!isAgreed);
  };
  const navigate=useNavigate();
  const handleStartTest = () => {
    setTimeout(()=>{
      onClose();
      navigate("/quiz");
      document.getElementById("rulesPopup").style.display = "none";
    },1000);
  };

  return (
    <div className="overlay" id="rulesPopup">
      <div className="popup-box">
        <div className="popup-header">Exam Rules and Regulations</div>
        <div className="popup-content">
          <ol>
            <li>Make sure your internet connection is stable.</li>
            <li>Do not navigate away from the test window.</li>
            <li>Cheating or plagiarism is strictly prohibited.</li>
            <li>Submit your answers before the time limit ends.</li>
            <li>Ensure a quiet environment during the test.</li>
          </ol>
        </div>
        <div className="popup-footer">
          <label>
            <input
              type="checkbox"
              checked={isAgreed}
              onChange={handleCheckboxChange}
            />
            I have read and agree to the rules.
          </label>
          <button
            className="start-btn"
            disabled={!isAgreed}
            onClick={handleStartTest}
          >
            Start Test
          </button>
        </div>
      </div>
    </div>
  );
};

export default RulesPopup;
