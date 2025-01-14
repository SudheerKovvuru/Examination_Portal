import React, { useState } from "react";
import "../styles/RulesPopup.css";
import { useNavigate} from "react-router-dom";
const RulesPopup = ({onClose}) => {
  const [isAgreed, setIsAgreed] = useState(false);

  const handleCheckboxChange = () => {
    setIsAgreed(!isAgreed);
  };
  const enterFullscreen = () => {
    const elem = document.documentElement; // Full page goes fullscreen
    if (elem.requestFullscreen) {
      elem.requestFullscreen();
    } else if (elem.mozRequestFullScreen) {
      elem.mozRequestFullScreen();
    } else if (elem.webkitRequestFullscreen) {
      elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) {
      elem.msRequestFullscreen();
    }
  };
  const navigate=useNavigate();
  const handleStartTest = () => {
    setTimeout(()=>{
      onClose();
      navigate("/quiz");
      document.getElementById("rulesPopup").style.display = "none";
      enterFullscreen();
    },1000);
  };
  const handleOverlayClick = () => {
    onClose(); // Close the popup when the overlay is clicked
  };

  const handlePopupClick = (event) => {
    event.stopPropagation(); // Prevent click events from bubbling to the overlay
  };
  return (
    <div className="overlay" id="rulesPopup" onClick={handleOverlayClick}>
      <div className="popup-box" onClick={handlePopupClick}>
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
