import React from 'react';

import './ResultAnswer.css';

const ResultAnswer = (props) => {
    if (props.answer === props.rightAnswer) {
        return(
            <li>
            <h4>{props.index + 1}.</h4>
            <div className="answer correctanswer">
                <button className="userAnswerCorrect">{props.answer}</button>
            </div>
            <div className="answer correctanswer">
                    <button className="userAnswerCorrect">{props.rightAnswer}</button> 
            </div>
            <div className="answer correctanswer">
                    <button className="userAnswerCorrect">{props.solution}</button> 
            </div>
        </li>
        );
    } else if(props.answer === null) {
        return(
            <li>
                <h4>{props.index + 1}.</h4>
                <div className="answer incorrectanswer">
                    <button className="userAnswerSkipped">Skipped</button>
                </div>
                <div className="answer correctanswer">
                    <button className="userAnswerCorrect">{props.rightAnswer}</button> 
                </div>
                <div className="answer correctanswer">
                    <button className="userAnswerCorrect">{props.solution}</button> 
            </div>
            </li>
        );
    } else {
        return(
            <li>
                <h4>{props.index + 1}.</h4>
                <div className="answer incorrectanswer">
                    <button className="userAnswerIncorrect">{props.answer}</button>
                </div>
                <div className="answer correctanswer">
                    <button className="userAnswerCorrect">{props.rightAnswer}</button> 
                </div>
                <div className="answer correctanswer">
                    <button className="userAnswerCorrect">{props.solution}</button> 
            </div>
            </li>
        );
    }
}

export default ResultAnswer;