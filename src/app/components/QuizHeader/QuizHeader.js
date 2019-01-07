import React from 'react';
import './QuizHeader.css';
const QuizHeader = (props) => {
    return(
        <div className="quiz-header">
            <button onClick={props.close}><i className="fas fa-times-circle exit"></i></button>
            <div className="progress-wrapper">
                <div className="progressbar" style={{width: props.progress + '%'}}></div>
            </div>
        </div>
    );
}

export default QuizHeader;