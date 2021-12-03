import React, { Component, useState } from "react";
import { scroller } from "react-scroll";
import { Button, ButtonBase, Grid } from "@mui/material";
import { Sticky, StickyContainer } from "react-sticky";
import { Form } from "react-bootstrap";
import { useDispatch } from "react-redux";

import "../App.css";
import { upDateQuesitons } from "../store/QuestionSlice";
import GetQuestions from "../utils/GetQuestions";

export default function AQuestion(props) {
  const dispatch = useDispatch();
  const questions = GetQuestions();
  const [correct, setCorrect] = useState({value:false,isLoading:false});
  const handleChange = (e, id) => {
     dispatch(
      upDateQuesitons({
        id: id,
        userAnswer: e.target.value,
        answer: props.answer
      })
    );
    let isCorrect = false;
    props.answer.forEach(ans => {
            if(ans.toLowerCase()===e.target.value.toLowerCase()){
              isCorrect = true;
              console.log(isCorrect);
            }
          });
    console.log("isCorrect:");
    console.log(isCorrect);
    const newCorrect = {};
    newCorrect.value = isCorrect;
    console.log(newCorrect.value);
    newCorrect.isLoading = !newCorrect.isLoading;
    setCorrect(newCorrect);
    console.log("correct:");
    console.log(correct);
  };

  return (
    <div className="section">
      <StickyContainer className="container">
        <div style={{ width: "40px", position: "absolute", right: "50" }}>
        </div>
        <div className="question" id={props.id}>
          <Grid container spacing={2} sx={{marginTop:"-150px"}}>
            <Grid item xs={12}>
              <div>
                {props.id + ". "}
                {props.question}
              </div>
            </Grid>
            
            <Grid item xs={7} display="flex" justifyContent="flex-end">
              <Form.Control
                required
                disabled ={questions.showAnswer === "true"}
                size="lg"
                type="text"
                onChange={(e) => handleChange(e, props.id)}
                style={{ minWidth: "300px", minHeight: "40px",fontSize:"20px" }}
              />
            </Grid>
            <Grid item xs={4} display="flex" justifyContent="flex-start">
              { questions.showAnswer === "true" && correct.value &&
                <img  src="check.jpeg" alt="" height="60" />
              }
              { questions.showAnswer === "true" && !correct.value &&
                <img src="cross.jpeg" alt="" height="60" />
              }
            </Grid>
            {questions.showAnswer === "true" && (
              <div style={{width:"100%",display:"flex",justifyContent:"center",color:"green"}}>Correct Answer: {props.answer.join(" ")}</div>
            )}
          </Grid>
        </div>
      </StickyContainer>
    </div>
  );
}
