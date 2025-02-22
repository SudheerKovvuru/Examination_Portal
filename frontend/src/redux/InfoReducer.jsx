import { createSlice } from '@reduxjs/toolkit';

export const InfoReducer = createSlice({
    name: 'info',
    initialState: {
        queue: [],
        examnames: [],
        sideInfo: {}, 
    },
    reducers: {
        setInfo: (state, action) => {
            state.queue = action.payload;
        },
        setExamNames: (state, action) => {
            state.examnames = action.payload.map(queue => queue.examname);
        },
        setSideInfo: (state, action) => {
            action.payload.forEach(item => {
                const exam = state.queue.find(q => q.examname === item.examname);
                if (exam) {
                    state.sideInfo[item.examname]= {
                        createdAt: exam.createdAt,
                        endAt: exam.endAt,
                        questions: exam.questions,
                    };
                }
            });
        },
    }
});

export const { setInfo, setExamNames, setSideInfo } = InfoReducer.actions;
export default InfoReducer.reducer;
