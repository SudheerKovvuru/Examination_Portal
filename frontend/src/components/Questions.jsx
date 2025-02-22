import React, { useEffect, useState } from "react";
import "../styles/Questions.css";
import { useDispatch,useSelector } from "react-redux";
import { useFetchQuestion } from "../hooks/Fetchquestion";
import { updateResult } from "../hooks/SetResult";

function Questions({onChecked,examname}){
    const [checked,setChecked]=useState(undefined);
    const {trace}=useSelector(state=>state.questions);
    const result=useSelector(state=>state.result.result);
    const [{isLoading,apiData,serverError}]=useFetchQuestion(examname);

    const questions=useSelector(state=>state.questions.queue[state.questions.trace]);
    const dispatch=useDispatch();
    useEffect(()=>{
        // console.log({trace,checked})
        dispatch(updateResult({trace,checked}));
    },[checked])

    useEffect(()=>{
      // console.log(isLoading);
      // console.log(apiData);
      // console.log(serverError);
    });
    function onSelect(i){
        onChecked(i);
        setChecked(i);
        dispatch(updateResult({trace,checked}));
    }
    // if(isLoading) return <h3>isLoading</h3>
    // if(serverError) return <h3>{serverError|| "unknow error"}</h3>
    return(
    <div className="container">
      <p className="question">{questions?.question}</p>
      <ul key={questions?.id}>
            {
                questions?.options.map((q, i) => (
                    <li key={i}>
                        <input 
                            type="radio"
                            value={false}
                            name="options"
                            id={`q${i}-option`}
                            onChange={() => onSelect(i)}
                        />

                        <label htmlFor={`q${i}-option`}>{q}</label>
                        <div className={`check ${result[trace] == i ? 'checked' : ''}`}></div>
                    </li>
                ))
            }
        </ul>
</div>
    );
}
export default Questions;
