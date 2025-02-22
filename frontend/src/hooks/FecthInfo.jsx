import { useDispatch } from 'react-redux';
import { getServerData } from '../helper/Helper';
import { setInfo,setExamNames, setSideInfo } from '../redux/InfoReducer';

export const useFetchInfo = () => {
    const dispatch = useDispatch();

    return async () => {
        try {
            const questionurl = import.meta.env.VITE_QUESTION;
            const data = await getServerData(questionurl);
            dispatch(setInfo(data));
            dispatch(setExamNames(data));
            dispatch(setSideInfo(data));
        } catch (error) {
            console.log(error);
        }
    };
};