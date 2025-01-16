import React from "react";
import "../styles/ExamCard.css";
import RulesPopup from "./RulesPopup";
import { useState } from "react";

const ExamCard = ({index,exam}) => {
  const [showPopup, setShowPopup] = useState(false);
  const handleButtonClick = () => {
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  return (
    <div className="ecard">
      <div className="card-left">
        <div className="card-icon">
          <i className="fa-solid fa-medal" id="green-icon"></i>
        </div>
        <div className="text-section">
          <div className="title">{exam}</div>
          <div className="details">12 MCQ's · 10 Marks</div>
        </div>
      </div>
      <div className="card-right">
        <div className="time">Jan 30, 2025</div>
        <button className="join-button" onClick={handleButtonClick}>Take Test</button>
      </div>
      {showPopup && <RulesPopup onClose={handleClosePopup} exam={exam} />}
    </div>
  );
};

export default ExamCard;
