import { useEffect,useState } from "react";
import Questions from "../components/Questions";
import '../styles/Quiz.css';
import {useSelector,useDispatch} from 'react-redux';
import { MoveNextQuestion ,MovePrevQuestion} from "../hooks/Fetchquestion";
import {PushAnswer} from "../hooks/SetResult";
import {useNavigate} from 'react-router-dom';
import { handleError,handleSuccess } from "../utils";
import { ToastContainer } from "react-toastify";


function Quiz()
{
    const {queue,trace}=useSelector(state=>state.questions);
    const result=useSelector(state=>state.result.result);
    const navigate=useNavigate();
    // useEffect(()=>{
    //     console.log(result);
    // })
    useEffect(() => {
        // Add event listeners for tab switch detection and fullscreen exit detection
        document.addEventListener("visibilitychange", handleVisibilityChange);
        document.addEventListener("fullscreenchange", handleFullscreenChange);
    
        // Cleanup event listeners on component unmount
        return () => {
          document.removeEventListener("visibilitychange", handleVisibilityChange);
          document.removeEventListener("fullscreenchange", handleFullscreenChange);
        };
      },[]);
    
      const handleFullscreenChange = () => {
        if (!document.fullscreenElement) {
          handleError("You exited fullscreen mode. Please return to fullscreen to continue the exam.");
        }
      };
    
      const handleVisibilityChange = () => {
        if (document.visibilityState === "hidden") {
          handleError("Do not switch tabs during the exam!");
        }
      };
    const dispatch=useDispatch();

    const[check,setChecked]=useState(undefined);

    function onPrev(){
        if(trace>0){
            dispatch(MovePrevQuestion());
        }
    }
    function onNext(){
        if(trace<queue.length-1)
        {
            if(result.length<=trace)
            {
                dispatch(PushAnswer(check));
            }
            dispatch(MoveNextQuestion());
        }
        else{
            dispatch(PushAnswer(check));
            handleSuccess("Test Submited Successfully");
            setTimeout(()=>{
                document.exitFullscreen();
                navigate("/result");
            },3000)
        }
        setChecked(undefined);
    }
    function onChecked(check){
        // console.log(check);
        setChecked(check);
    }
    return(
        <>
        <nav>
            <h3>Name of the Exam</h3>
            <h3>Time Left 00:00:00</h3>
        </nav>
        <div className="questionpage">
            <Questions onChecked={onChecked}/>
            <div className="grid">
                {trace>0?<button className="Prev-btn" onClick={onPrev}>Previous</button>:<div></div>}
                <button className="Next-btn" onClick={onNext}>{trace<queue.length-1?"Next":"Submit"}</button>
            </div>
        </div>
        <ToastContainer/>
        </>
    );
}
export default Quiz;