import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  questions: [],
  showAnswer: "false",
  totalPoints: 0,
};

const questionSlice = createSlice({
  name: "questions",
  initialState,
  reducers: {
    setQuestions: (state, action) => {
      const questionList = action.payload.questions;
      questionList.forEach((e) => {
        // console.log(e);
      });
      state.questions = questionList;
      state.showAnswer = "false";
      state.totalPoints = 0;
      return state;
    },
    upDateQuesitons: (state, action) => {
      if (action.payload.showAnswer === "true") {
        state.showAnswer = "true";
        state.questions.forEach((ele) => {
          // if (ele.userAnswer !== undefined) {
          //   const res = String(
          //     ele.userAnswer.toLowerCase() === ele.answer.toLowerCase()
          //   );
          //   console.log(res);
          //   if (res === "true") {
          //     state.totalPoints = state.totalPoints + 1;
          //   }
          //   console.log(state.totalPoints);
          // }
          console.log(ele.isCorrect);
          if(ele.isCorrect){
            state.totalPoints = state.totalPoints + 1;
          }
        });
        return state;
      }
      const targetId = action.payload.id;
      state.questions.forEach((e) => {
        if (e.id === targetId) {
          e.userAnswer = action.payload.userAnswer;
          let isCorrect = false;
          e.answer.forEach(ans => {
            if(ans.toLowerCase()===e.userAnswer.toLowerCase()){
              isCorrect = true;
            }
          });
          e.isCorrect = isCorrect;
        }
      });
      return state;
    },
  },
});

export const { setQuestions, upDateQuesitons } = questionSlice.actions;
export default questionSlice.reducer;
