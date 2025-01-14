import { useEffect,useState } from "react"
import Data,{answers}from "../database/Data"
import { useDispatch } from "react-redux"
import * as Action from '../redux/QuestionReducer'


export const useFetchQuestion=()=>{
    const dispatch=useDispatch();
    const [getData,setgetData]=useState({isLoading:false,apiData:[],serverError:null})
    useEffect(()=>{
        setgetData(prev=>({...prev,isLoading:true}));
        (async()=>{
            try{
                let question=await Data;

                if(question.length>0)
                {
                    setgetData(prev=>({...prev,isLoading:false}));
                    setgetData(prev=>({...prev,apiData:{question,answers}}));

                    dispatch(Action.startExamAction({question,answers}));
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