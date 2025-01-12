import React from "react";
import "../styles/ExamCard.css";

const ExamCard = () => {
  return (
    <div className="ecard">
      <div className="card-left">
        <div className="card-icon">
        <i className="fa-solid fa-medal" id="green-icon"></i>
        </div>
        <div className="text-section">
          <div className="title">Mid-1 Internal Test</div>
          <div className="details">12 MCQ's · 10 Marks</div>
        </div>
      </div>
      <div className="card-right">
        <div className="time">Jan 30, 2025</div>
        <button className="join-button">Take Test</button>
      </div>
    </div>
  );
};

export default ExamCard;
