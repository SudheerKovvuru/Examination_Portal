import {combineReducers,configureStore} from '@reduxjs/toolkit';
import QuestionReducer from './QuestionReducer';
import ResultReducer from './ResultReducer';

const rootReducer=combineReducers({
      questions:QuestionReducer,
      result:ResultReducer
})

export default configureStore({reducer:rootReducer})