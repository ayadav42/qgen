import {configureStore} from '@reduxjs/toolkit'
import questionReducer from './QuestionSlice'

export default configureStore({
    reducer:{
        questions:questionReducer,
    },
});