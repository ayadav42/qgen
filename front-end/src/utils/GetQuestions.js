import {useSelector} from 'react-redux'

export default function GetQuestions() {
    const state = useSelector(state => state)
    const questions = state.questions;
    return questions;
}