import { useEffect,useState } from "react"
import { useDispatch } from "react-redux"
import * as Action from '../redux/QuestionReducer'
import { getServerData, getServerDataBy } from "../helper/Helper"


export const useFetchQuestion=(examname)=>{
    const dispatch=useDispatch();
    const [getData,setgetData]=useState({isLoading:false,apiData:[],serverError:null})
    useEffect(()=>{
        setgetData(prev=>({...prev,isLoading:true}));
        (async()=>{
            try{
                // let question=await Data;
                const questionurl=import.meta.env.VITE_QUESTION;
                // const data=await getServerData(questionurl);
                // const examNames = data.map((exam) => exam.examname);
                // console.log(examNames)
                const [{questions}]=await getServerDataBy(questionurl,examname);
                // console.log(questions,answers);
                if(questions.length>0)
                {
                    setgetData(prev=>({...prev,isLoading:false}));
                    setgetData(prev=>({...prev,apiData:questions}));

                    dispatch(Action.startExamAction({question:questions}));
                }
                else{
                    throw new Error("no question avaliable");
                }
            }catch(error){
                setgetData(prev=>({...prev,isLoading:false}));
                setgetData(prev=>({...prev,serverError:error}));
            }
        })();
    },[dispatch])
    return [getData,setgetData];
}

export const MoveNextQuestion=()=>async(dispatch)=>{
    try{
        dispatch(Action.moveNextAction());
    }catch(error){
        console.log(error)
    }
}

export const MovePrevQuestion=()=>async(dispatch)=>{
    try{
        dispatch(Action.movePrevAction());
    }catch(error){
        console.log(error);
    }
}