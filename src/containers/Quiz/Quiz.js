import React, { Component } from "react";
import "./Quiz.css";
import ActiveQuiz from "../../components/ActiveQuiz/ActiveQuiz";
import FinishedQuiz from "../../components/FinishedQuiz/FinishedQuiz";
import axios from "../../axios/axios-quiz";
import Loader from "../../components/UI/Loader/Loader";

class Quiz extends Component {
  state = {
    results: {}, // {[id]:success}
    isFinished: false,
    activeQuestion: 0,
    answerState: null,
    loading:true,
    quiz: []
  };

  onAnswerClickHandler = answerId => {
    console.log("answer Id :", answerId);
    const question = this.state.quiz[this.state.activeQuestion];
    const results = this.state.results;
    if (question.rightAnswerId === answerId) {
      if (!results[question.id]) {
        results[question.id] = "success";
      }
      this.setState({
        answerState: { [answerId]: "success" },
        results
      });
      console.log(results);
      const timeout = window.setTimeout(() => {
        if (this.isQuizFinished()) {
          this.setState({
            isFinished: true
          });
          console.log("Finished");
        } else {
          this.setState({
            activeQuestion: this.state.activeQuestion + 1,
            answerState: null
          });
        }
        window.clearTimeout(timeout);
      }, 1000);
    } else {
      results[question.id] = "error";
      this.setState({
        answerState: { [answerId]: "error" },
        results
      });
      console.log(results);
    }
  };
  isQuizFinished() {
    return this.state.activeQuestion + 1 === this.state.quiz.length;
  }
  retryHandler = () => {
    this.setState({
      isFinished: false,
      activeQuestion: 0,
      results: {},
      answerState: null
    });
  };

async componentDidMount(){
  try{
    const response = await axios.get(`/quizes/${this.props.match.params.id}.json`)
    const quiz = response.data
    console.log(this.props.match.params.id)

    this.setState({
      quiz,
      loading:false
    })

  }catch(e){console.log(e)}

}

  render() {
    return (
      <div className="Quiz">
        <div className="QuizWrapper">
          <h1> Ответьте на все вопросы</h1>
            {this.state.loading?
            <Loader/>
            :
          this.state.isFinished ? (
            <FinishedQuiz
              results={this.state.results}
              quiz={this.state.quiz}
              onRetry={this.retryHandler}
            />
          ) : (
            <ActiveQuiz
              answers={this.state.quiz[this.state.activeQuestion].answers}
              question={this.state.quiz[this.state.activeQuestion].question}
              onAnswerClick={this.onAnswerClickHandler}
              quizLength={this.state.quiz.length}
              answerNumber={this.state.activeQuestion + 1}
              state={this.state.answerState}
            />
          )}

        </div>
      </div>
    );
  }
}

export default Quiz;
