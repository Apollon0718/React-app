import React from 'react';

import './QuizQuestion.css';

import Answer from './Answer.js';

const QuizQuestion = (props) => {
        return(
            <div className="quiz-container">
                <h2 className="quiz-problemTitle"><span>#{props.problemid}</span> {props.problemtitle}</h2>
                <h3 className="quiz-problemDescription">{props.problemdescription}</h3>
                <ul className="quiz-answers" onClick={props.handleClick}>
                    {Object.keys(props.answers).map((key, index) => {
                        let cl;
                        if(props.userAnswer !== null){
                            if(props.answerCorrect === true) {
                                cl = props.userAnswer === key.toUpperCase() ? "userAnswerCorrect" : "";
                            } else if(props.answerCorrect === false) {
                                cl = props.userAnswer === key.toUpperCase() ? "userAnswerCorrect" : "";
                            } else {
                                cl = props.userAnswer === key.toUpperCase() ? "userAnswerCorrect" : "";

                            }
                        }
                        return (
                            <Answer 
                        key={index}
                        letter={key.toUpperCase()} 
                        answer={props.answers[key]} 
                        className={cl}/>
                        );
                        })}
                </ul>
            </div>
        );
}

export default QuizQuestion;