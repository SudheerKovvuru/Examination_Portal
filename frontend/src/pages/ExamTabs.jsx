import React, { useState } from "react";
import "../styles/ExamTabs.css";
import ExamCard from "../components/ExamCard";
function ExamTabs() {
    const [activeTab, setActiveTab] = useState("previous exams");

    const renderContent = () => {
        switch (activeTab) {
            case "previous exams":
                return (
                    <div className="tab-content">
                        <ExamCard/>
                        <ExamCard/>
                        <ExamCard/>
                        <ExamCard/>
                        <ExamCard/>
                        <ExamCard/>
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
