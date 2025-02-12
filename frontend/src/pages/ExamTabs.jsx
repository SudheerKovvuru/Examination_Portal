import React, { useState, useEffect } from "react";
import "../styles/ExamTabs.css";
import ExamCard from "../components/ExamCard";
import { useFetchExam } from "../hooks/FetchExam";
import { useSelector } from "react-redux";
import { getSideInfo } from "../helper/Helper";

function ExamTabs() {
    const [activeTab, setActiveTab] = useState("previous exams");
    const [classifiedExams, setClassifiedExams] = useState({
        previous: [],
        ongoing: [],
        upcoming: [],
    });

    const fetchExam = useFetchExam();
    const examNames = useSelector((state) => state.examnames.queue);
    const questionurl = import.meta.env.VITE_QUESTION;

    useEffect(() => {
        fetchExam();
    }, []);

    useEffect(() => {
        if (examNames.length > 0) {
            classifyExams(); // Fetch and classify exams after examNames are updated
        }
    }, [examNames]);

    const classifyExams = async () => {
        const currentDate = new Date();
        const previous = [];
        const ongoing = [];
        const upcoming = [];

        for (const exam of examNames) {
            try {
                const data = await getSideInfo(questionurl, exam);
                const { questions,createdAt, endAt } = data[0];
                const startDate = new Date(createdAt);
                const endDate = new Date(endAt);
                const allInfo={
                    exam,
                    createdAt,
                    endAt,
                    noofqs:questions.length
                }
                if (endDate < currentDate) {
                    previous.push(allInfo);
                } else if (startDate <= currentDate && currentDate <= endDate) {
                    ongoing.push(allInfo);
                } else if (startDate > currentDate) {
                    upcoming.push(allInfo);
                }
            } catch (error) {
                console.error(`Error fetching details for exam: ${exam}`, error);
            }
        }
        setClassifiedExams({ previous, ongoing, upcoming });
    };

    const renderContent = () => {
        switch (activeTab) {
            case "previous exams":
                return (
                    <div className="tab-content">
                        {classifiedExams.previous.length > 0 ? (
                            classifiedExams.previous.map((item, index) => (
                                <ExamCard 
                                key={index} 
                                exam={item.exam} 
                                createAt={item.createdAt} 
                                endAt={item.endAt}
                                noofqs={item.noofqs}
                                status={"Result"}
                                />
                            ))
                        ) : (
                            <p>No previous exams available.</p>
                        )}
                    </div>
                );
            case "ongoing exams":
                return (
                    <div className="tab-content">
                        {classifiedExams.ongoing.length > 0 ? (
                            classifiedExams.ongoing.map((item, index) => (
                                <ExamCard key={index} 
                                exam={item.exam}
                                createAt={item.createdAt} 
                                endAt={item.endAt}
                                noofqs={item.noofqs}
                                status={"Take Test"}
                                />
                            ))
                        ) : (
                            <p>There are no ongoing exams.</p>
                        )}
                    </div>
                );
            case "upcoming exams":
                return (
                    <div className="tab-content">
                        {classifiedExams.upcoming.length > 0 ? (
                            classifiedExams.upcoming.map((item, index) => (
                                <ExamCard key={index} 
                                exam={item.exam}
                                createAt={item.createdAt} 
                                endAt={item.endAt}
                                noofqs={item.noofqs}
                                status={"Upcoming"}
                                />
                            ))
                        ) : (
                            <p>There are no upcoming exams.</p>
                        )}
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
