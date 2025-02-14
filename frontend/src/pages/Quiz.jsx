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

    useEffect(() => {
        fetchAns();
    }, [examname]); // Added dependency

    useEffect(()=>{
        if(result.length==queue.length)
        {
            publishResult();
        }
    },[result]);
    // Define functions inside useCallback to avoid re-renders
    const handleFullscreenChange = useCallback(() => {
        if (!document.fullscreenElement) {
            handleError("You exited fullscreen mode. Please return to fullscreen to continue the exam.");
        }
    }, []);

    const handleVisibilityChange = useCallback(() => {
        if (document.visibilityState === "hidden") {
            handleError("Do not switch tabs during the exam!");
        }
    }, []);

    useEffect(() => {
        document.addEventListener("visibilitychange", handleVisibilityChange);
        document.addEventListener("fullscreenchange", handleFullscreenChange);

        return () => {
            document.removeEventListener("visibilitychange", handleVisibilityChange);
            document.removeEventListener("fullscreenchange", handleFullscreenChange);
        };
    }, [handleVisibilityChange, handleFullscreenChange]); // Added dependencies

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
        }
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
                <h3>Time Left 00:00:00</h3>
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
