import { createSlice } from "@reduxjs/toolkit"

export const QuestionReducer=createSlice({
    name:'questions',
    initialState:{
        queue:[],
        answers:[],
        trace:0
    },
    reducers:{
        startExamAction:(state,action)=>{
            let {question,answers}=action.payload
            return {
                ...state,
                queue:question,
                answers,
            }
        },
        moveNextAction:(state,action)=>{
            return{
                ...state,
                trace:state.trace+1
            }
        },
        movePrevAction:(state,action)=>{
            return{
                ...state,
                trace:state.trace-1
            }
        }
    }
})

export const{startExamAction,moveNextAction,movePrevAction} =QuestionReducer.actions;
export default QuestionReducer.reducer;

