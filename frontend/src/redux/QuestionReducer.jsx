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
            let {question}=action.payload
            return {
                ...state,
                queue:question,
            }
        },
        fetchAnswersAction:(state,action)=>{
            let {answers}=action.payload
            return{
                ...state,
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
        },
        ResetQuiz: (state) => {
            state.queue = [];
            state.answers = [];
            state.trace = 0;
        }
    }
})

export const{startExamAction,fetchAnswersAction,moveNextAction,movePrevAction,ResetQuiz} =QuestionReducer.actions;
export default QuestionReducer.reducer;

