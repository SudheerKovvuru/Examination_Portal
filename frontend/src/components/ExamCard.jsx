import React, { useEffect } from "react";
import "../styles/ExamCard.css";
import RulesPopup from "./RulesPopup";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useFetchQuestion } from "../hooks/Fetchquestion";
import { getSideInfo } from "../helper/Helper";

const ExamCard = ({index,exam,createAt,endAt,noofqs}) => {
  const [showPopup, setShowPopup] = useState(false);
  const handleButtonClick = () => {
    setShowPopup(true);
  };
  const handleClosePopup = () => {
    setShowPopup(false);
  };
  const date = new Date(createAt);
  createAt = date.toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
    // year: 'numeric',
  });
  const date2 = new Date(endAt);
  endAt = date2.toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
    // year: 'numeric',
  });
  return (
    <div className="ecard">
      <div className="card-left">
        <div className="card-icon">
          <i className="fa-solid fa-medal" id="green-icon"></i>
        </div>
        <div className="text-section">
          <div className="title">{exam}</div>
          <div className="details">{noofqs} MCQ's · {noofqs*10} Marks</div>
        </div>
      </div>
      <div className="card-right">
        <div className="time">{createAt} to {endAt}</div>
        <button className="join-button" onClick={handleButtonClick}>Take Test</button>
      </div>
      {showPopup && <RulesPopup onClose={handleClosePopup} exam={exam} />}
    </div>
  );
};

export default ExamCard;
