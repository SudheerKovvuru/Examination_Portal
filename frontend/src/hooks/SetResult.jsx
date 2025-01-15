import { postServerData } from "../helper/Helper"
import * as Action from "../redux/ResultReducer"

export const PushAnswer=(result)=>async(dispatch)=>{
    try{
        await dispatch(Action.pushResultAction(result))
    }catch(error){
        console.log(error)
    }
}


export const updateResult=(index)=>async(dispatch)=>{
    try{
        dispatch(Action.updateResultAction(index))
    }catch(error){
        console.log(error)
    }
}


export const usePublishResult=(resultdata)=>{
    const {result,username}=resultdata;
    (async()=>{
        try {
            if(result.length != 0 && username)
            {
                await postServerData(import.meta.env.VITE_RESULT,resultdata,data=>data);
            }   
        } catch (error) {
            console.log(error)
        }
    })();
}