import {combineReducers,configureStore} from '@reduxjs/toolkit';
import QuestionReducer from './QuestionReducer';
import ResultReducer from './ResultReducer';
import ExamReducer from './ExamReducer';

const rootReducer=combineReducers({
      questions:QuestionReducer,
      result:ResultReducer,
      examnames:ExamReducer,
})

export default configureStore({reducer:rootReducer})