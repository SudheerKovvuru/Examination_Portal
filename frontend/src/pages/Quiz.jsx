import { useEffect, useState, useCallback } from "react";
import Questions from "../components/Questions";
import '../styles/Quiz.css';
import { useSelector, useDispatch } from 'react-redux';
import { MoveNextQuestion, MovePrevQuestion } from "../hooks/Fetchquestion";
import { PushAnswer } from "../hooks/SetResult";
import { useLocation, useNavigate } from 'react-router-dom';
import { handleError, handleSuccess } from "../utils";
import { ToastContainer } from "react-toastify";
import { earnPoints } from '../helper/Helper';
import { usePublishResult } from '../hooks/SetResult';
import { useFetchAns } from '../hooks/FetchAns';
import { ResetQuiz } from '../redux/QuestionReducer'

function Quiz() {
    const navigate = useNavigate();
    const location = useLocation();
    const examname = location.state;
    const fetchAns = useFetchAns(examname);
    const dispatch = useDispatch();
    
    const { queue, answers, trace } = useSelector(state => state.questions);
    const { result } = useSelector(state => state.result);
    const totalMarks = queue.length * 10;

    const [check, setChecked] = useState(undefined);
    const [tabSwitchCount, setTabSwitchCount] = useState(0);
    const [timeLeft, setTimeLeft] = useState(30);

    useEffect(() => {
        // Disable right-click
        document.addEventListener("contextmenu", (e) => e.preventDefault());
    
        // Disable common DevTools shortcuts
        document.addEventListener("keydown", (e) => {
            if (
                e.keyCode === 123 || // F12
                (e.ctrlKey && e.shiftKey && e.keyCode === 73) || // Ctrl+Shift+I
                (e.ctrlKey && e.shiftKey && e.keyCode === 74) // Ctrl+Shift+J
            ) {
                e.preventDefault();
            }
        });
    
        return () => {
            document.removeEventListener("contextmenu", (e) => e.preventDefault());
            document.removeEventListener("keydown", () => {});
        };
    }, []);
    
    useEffect(() => {
        fetchAns();
    }, [examname]);
    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft(prevTime => {
                if (prevTime <= 1) {
                    clearInterval(timer);
                    handleError("Time is up! Submitting the test automatically.");
                    autoSubmitQuiz();
                    return 0;
                }
                return prevTime - 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, []);
    useEffect(() => {
        if (result.length === queue.length || tabSwitchCount > 1 || timeLeft === 0) {
            publishResult();
        }
    }, [result,tabSwitchCount,timeLeft]);

    const handleFullscreenChange = useCallback(() => {
        if (!document.fullscreenElement) {
            handleError("You exited fullscreen mode. Please return to fullscreen to continue the exam.");
        }
    }, []);

    const handleVisibilityChange = useCallback(() => {
        if (document.visibilityState === "hidden") {
            setTabSwitchCount(prev => {
                const newCount = prev + 1;
                if (newCount > 1) {
                    handleError("You switched tabs multiple times. Submitting the test now.");
                    autoSubmitQuiz();
                } else {
                    handleError("Do not switch tabs during the exam!");
                }
                return newCount;
            });
        }
    }, []);

    useEffect(() => {
        document.addEventListener("visibilitychange", handleVisibilityChange);
        document.addEventListener("fullscreenchange", handleFullscreenChange);

        return () => {
            document.removeEventListener("visibilitychange", handleVisibilityChange);
            document.removeEventListener("fullscreenchange", handleFullscreenChange);
        };
    }, [handleVisibilityChange, handleFullscreenChange]);

    function onPrev() {
        if (trace > 0) {
            dispatch(MovePrevQuestion());
        }
    }

    function publishResult() {
        if (answers.length > 0) {
            const earnMarks = earnPoints(result, answers, 10);
            const achieved = earnMarks >= totalMarks / 2 ? "passed" : "failed";
            usePublishResult({
                result,
                username: localStorage.getItem("username"),
                correct: earnMarks,
                marks: totalMarks,
                achieved: achieved,
                examname: examname
            });
            dispatch(ResetQuiz());
        }
    }

    function autoSubmitQuiz() {
        dispatch(PushAnswer(check));
        handleSuccess("Test Submitted Automatically");
        setTimeout(() => {
            document.exitFullscreen();
            navigate("/home");
        }, 3000);
    }

    function onNext() {
        if (trace < queue.length - 1) {
            if (result.length <= trace) {
                dispatch(PushAnswer(check));
            }
            dispatch(MoveNextQuestion());
        } else {
            dispatch(PushAnswer(check));
            handleSuccess("Test Submitted Successfully");
            setTimeout(() => {
                document.exitFullscreen();
                navigate("/home");
            }, 3000);
        }
        setChecked(undefined);
    }

    function onChecked(check) {
        setChecked(check);
    }

    return (
        <>
            <nav>
                <h3>{examname}</h3>
                <h3>Time Left: {String(Math.floor(timeLeft / 60)).padStart(2, '0')}:{String(timeLeft % 60).padStart(2, '0')}</h3>
            </nav>
            <div className="questionpage">
                <Questions onChecked={onChecked} examname={examname} />
                <div className="grid">
                    {trace > 0 ? <button className="Prev-btn" onClick={onPrev}>Previous</button> : <div></div>}
                    <button className="Next-btn" onClick={onNext}>{trace < queue.length - 1 ? "Next" : "Submit"}</button>
                </div>
            </div>
            <ToastContainer />
        </>
    );
}

export default Quiz;
