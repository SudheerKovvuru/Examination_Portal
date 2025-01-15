import React, { useState,useEffect } from "react";
import "../styles/ExamTabs.css";
import ExamCard from "../components/ExamCard";
import { useFetchExam } from "../hooks/FetchExam";
import { useSelector } from "react-redux";
import { useFetchQuestion } from "../hooks/Fetchquestion";
function ExamTabs() {
    const [activeTab, setActiveTab] = useState("previous exams")
    const fetchExam = useFetchExam(); // Get the fetch function from the hook
    const examNames = useSelector((state) => state.examnames.queue); // Correct selector to match your reducer
    useEffect(() => {
        fetchExam(); // Call the fetch function on component mount
    }, []);
    const renderContent = () => {
        switch (activeTab) {
            case "previous exams":
                return (
                    <div className="tab-content">
                        {examNames.map((exam,index)=>(
                            <ExamCard key={index} exam={exam}/>
                        ))}
                    </div>
                );
            case "ongoing exams":
                return (
                    <div className="tab-content">
                        <p>There are no ongoing exams.</p>
                    </div>
                );
            case "upcoming exams":
                return (
                    <div className="tab-content">
                        <p>There are no upcoming exams.</p>
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div className="tabs-container">
            <div className="tabs">
                {["Previous Exams", "Ongoing Exams", "Upcoming Exams"].map((tab) => (
                    <button
                        key={tab}
                        className={`tab ${activeTab === tab.toLowerCase() ? "active" : ""}`}
                        onClick={() => setActiveTab(tab.toLowerCase())}
                    >
                        {tab}
                    </button>
                ))}
            </div>
            <div className="content-container">{renderContent()}</div>
        </div>
    );
}

export default ExamTabs;
