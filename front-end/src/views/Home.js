import React, { Component, useState } from "react";
import { Form, Image } from "react-bootstrap";
import "../App.css";
import { AwesomeButton } from "react-awesome-button";
import "react-awesome-button/dist/themes/theme-blue.css";
import "./awsButton.css";
import Grid from "@mui/material/Grid";
import { useDispatch } from "react-redux";
import { setQuestions } from "../store/QuestionSlice";
import Button from "@mui/material/Button";
import GetQuestions from "../utils/GetQuestions";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";

export default function Home(props) {
  const dispatch = useDispatch();
  const questions = GetQuestions();
  const navigate = useNavigate();
  const [text, setText] = useState({ t: "", isLoading: false });

  useEffect(() => {
    dispatch(
      setQuestions({
        questions: [],
        showAnswer: "false",
        totalPoints: 0,
        isLoading : true
      })
    );
  }, []);

  const handleCreate = () => {
    // axios({
    //   url: "http://semanticWeb531.com/rest/quiz/create",
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   data: {
    //     text: text,
    //   },
    // })
    //   .then((res) => res.data)
    //   .then((res) => {
    //     dispatch(
    //       setQuestions({
    //         questions: res.questions,
    //         isLoading:false
    //       })
    //     );
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });

    dispatch(
      setQuestions({
        questions: [
          {
            id: 1,
            difficulty: 1,
            type: "boolean",
            body: "Is Tammy mother of Sam?",
            answer: ["Yes", "Yeah"],
          },
          {
            id: 2,
            difficulty: 2,
            type: "one_word",
            body: "Who is the mother of Sam?",
            answer: ["Tammy","Betty","Mommy"],
          },
        ],
      })
    );
    navigate("/question");
  };

  return (
    <div className="bg">
      <div style={{ minHeight: "30px" }}></div>
      <Grid container spacing={6}>
        <Grid item xs={5} sx={{ display: "flex", direction: "rtl" }}>
          <Image src="quizWhite.png" rounded />
        </Grid>
        <Grid item xs={7}>
          <div className="font-link">QuizGenerator</div>
        </Grid>
      </Grid>
      <div className="ask">Give us text! We will generate quiz for you!</div>
      <Form style={{ width: "100%" }}>
        <Form.Group
          controlId="exampleForm.ControlTextarea1"
          style={{ marginTop: "30px", minWidth: "400px" }}
        >
          <Form.Control
            as="textarea"
            rows={20}
            onChange={(e) => {
              const newText = { ...text };
              newText.isLoading = !newText.isLoading;
              newText.t = e.target.value;
              setText(newText);
            }}
            style={{ minWidth: "800px", fontSize: "20px" }}
          />
        </Form.Group>
        <div style={{ marginTop: "20px" }}>
          <AwesomeButton size="large" type="primary" onPress={handleCreate}>
            Create Quiz
          </AwesomeButton>
        </div>
      </Form>
    </div>
  );
}
