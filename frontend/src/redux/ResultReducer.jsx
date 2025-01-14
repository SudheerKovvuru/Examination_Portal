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
        }
    }
})

export const {setUserId,pushResultAction,updateResultAction}=ResultReducer.actions;
export default ResultReducer.reducer;