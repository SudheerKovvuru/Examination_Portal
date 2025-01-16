import React, { useEffect } from "react";
import "../styles/ExamCard.css";
import RulesPopup from "./RulesPopup";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useFetchQuestion } from "../hooks/Fetchquestion";
import { getSideInfo } from "../helper/Helper";

const ExamCard = ({index,exam}) => {
  const [showPopup, setShowPopup] = useState(false);
  const handleButtonClick = () => {
    setShowPopup(true);
  };
  const handleClosePopup = () => {
    setShowPopup(false);
  };
  const questionurl = import.meta.env.VITE_QUESTION;
  const [noofqs,setNoofqs]=useState(0);
  const [createAt,setCreateAt]=useState();
  async function fetchData() {
    try {
        const data = await getSideInfo(questionurl, exam);
        const { questions, createdAt } = data[0];
        setNoofqs(questions.length)
        const date = new Date(createdAt);
          const formattedDate = date.toLocaleDateString('en-GB', {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
          });
        setCreateAt(formattedDate);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}
fetchData();

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
        <div className="time">{createAt}</div>
        <button className="join-button" onClick={handleButtonClick}>Take Test</button>
      </div>
      {showPopup && <RulesPopup onClose={handleClosePopup} exam={exam} />}
    </div>
  );
};

export default ExamCard;
