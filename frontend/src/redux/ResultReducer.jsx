import { createSlice } from "@reduxjs/toolkit"


export const ResultReducer=createSlice({
    name:'result',
    initialState:{
        result:[],
    },
    reducers:{
        pushResultAction:(state,action)=>{
            state.result.push(action.payload)
        },
        updateResultAction:(state,action)=>{
            const {trace,checked}=action.payload;
            state.result.fill(checked,trace,trace+1);
        },
        ResetQuiz1: (state) => {
            state.result = [];
        }
    }
})

export const {setUserId,pushResultAction,updateResultAction,ResetQuiz1}=ResultReducer.actions;
export default ResultReducer.reducer;