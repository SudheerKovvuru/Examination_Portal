import {combineReducers,configureStore} from '@reduxjs/toolkit';
import QuestionReducer from './QuestionReducer';
import ResultReducer from './ResultReducer';
import ExamReducer from './ExamReducer';
import InfoReducer from './InfoReducer';

const rootReducer=combineReducers({
      questions:QuestionReducer,
      result:ResultReducer,
      examnames:ExamReducer,
      info:InfoReducer,
})

export default configureStore({reducer:rootReducer})