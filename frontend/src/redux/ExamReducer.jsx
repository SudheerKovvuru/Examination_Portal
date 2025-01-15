import { createSlice } from "@reduxjs/toolkit"


export const ExamReducer=createSlice({
    name:'examnames',
    initialState:{
        queue:[],
    },
    reducers:{
        getExamNamesAction:(state,action)=>{
            let {examnames}=action.payload
            return {
                ...state,
                queue:examnames
            }
        },
    }
});

export const{getExamNamesAction} =ExamReducer.actions;
export default ExamReducer.reducer;