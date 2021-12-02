import {useSelector} from 'react-redux'

export default function GetAnswer(id) {
    const state = useSelector(state => state)
    const questions = state.questions;
    questions.forEach(e => {
        if(e.id === id){
            return e.answer;
        }
    });
    return null;
}