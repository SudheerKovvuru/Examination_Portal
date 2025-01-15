import { useDispatch } from 'react-redux';
import { getServerData } from '../helper/Helper';
import { getExamNamesAction } from '../redux/ExamReducer';

export const useFetchExam = () => {
    const dispatch = useDispatch();

    return async () => {
        try {
            const questionurl = import.meta.env.VITE_QUESTION;
            const data = await getServerData(questionurl);
            const examnames = data.map((exam) => exam.examname);
            // console.log(examnames);
            dispatch(getExamNamesAction({ examnames }));
        } catch (error) {
            console.log(error);
        }
    };
};
