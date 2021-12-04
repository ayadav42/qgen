import React, { Component } from "react";
import AQuestion from "./AQuestion";
import "../App.css";
import GetQuestions from "../utils/GetQuestions";
import Button from "@mui/material/Button";
import { useDispatch } from "react-redux";
import { upDateQuesitons } from "../store/QuestionSlice";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { useNavigate } from "react-router-dom";
import BlockRotateLoading from "../components/BlockRotateLoading";
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function Questions(props) {
  const [open, setOpen] = React.useState(false);
  const navigate = useNavigate();
  const handleClose = () => {
    setOpen(false);
  };
  const questions = GetQuestions();
  const dispatch = useDispatch();
  const handleGoBack = () => {
    navigate("/");
  };

  const handleSubmit = () => {
    dispatch(
      upDateQuesitons({
        showAnswer: "true",
      })
    );
    setOpen(true);
  };

  if(questions.isLoading){
    return <BlockRotateLoading></BlockRotateLoading>
  }

  return (
    <div className="parent">
      {questions.questions.map((row) => (
        <AQuestion
          key={row.id}
          id={row.id}
          question={row.body}
          answer={row.answer}
        ></AQuestion>
      ))}
      <Button
        variant="contained"
        disabled={questions.showAnswer === "true"}
        sx={{ marginTop: "-120px" }}
        onClick={handleSubmit}
      >
        Submit
      </Button>
      {questions.showAnswer === "true" && (
        <Button
          variant="contained"
          sx={{ marginTop: "-120px", marginLeft: "5px" }}
          onClick={handleGoBack}
        >
          Go Back
        </Button>
      )}
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle sx={{ backgroundColor: "black", color: "white" }}>
          {"Total Scores:"}
        </DialogTitle>
        <DialogContent sx={{ display: "flex" }}>
          <DialogContentText
            id="alert-dialog-slide-description"
            sx={{ textAlign: "center"}}
          >
            {questions.totalPoints}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>OK</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
