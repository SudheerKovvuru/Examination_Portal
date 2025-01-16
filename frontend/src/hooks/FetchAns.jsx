import { useDispatch } from 'react-redux';
import { getServerAnswersBy,} from '../helper/Helper';
import { fetchAnswersAction } from '../redux/QuestionReducer';

export const useFetchAns = (examname) => {
    const dispatch = useDispatch();

    return async () => {
        try {
            const ansurl = import.meta.env.VITE_ANSWER;
            const data = await getServerAnswersBy(ansurl,examname);
            dispatch(fetchAnswersAction(data[0]));
        } catch (error) {
            console.log(error);
        }
    };
};
