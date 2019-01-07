import React from 'react';
import './QuizNav.css';
import Timer from './Timer/index'

const QuizNav = (props) => {
    let navClassName = 'quiz-navigation-normal';
    let buttonClassName;
    let buttonText;
    let clickhandler;
    // let elaspetime;
    // const handledata = (data) =>{
    //     elaspetime = data;
    // }
    if(props.currentView === "start" ) {
        buttonText = "Start";
        clickhandler = props.handleClick;
    } else if(props.currentView === "finish") {
        buttonText = "Finish";
        clickhandler = () => {
            props.sendAnswers();
            props.closeModal();
        };
    } else {
        if(props.correctAnswer != null) {
            buttonText = "Next";
            //navClassName = props.correctAnswer ? 'quiz-navigation-correct' : 'quiz-navigation-incorrect';  
            clickhandler = props.handleClick;
        } else {
            buttonText = "Next";
            buttonClassName = "check-button"
            if(props.questionAnswered){
                clickhandler = props.handleClick;
            } else {
                clickhandler = props.handleClick;
                // clickhandler = () => {
                //     console.log("wiggle this");
                //}
            }
        }
    }
    const thirdElement =  <button onClick={clickhandler} className={buttonClassName}>{buttonText}</button>
    //console.log(props.elapsedTime,'ttt')
    const secondElement = () => {
         if(props.currentView === "start"){
            return;
         } else if (props.currentView === "finish") {
             return;
         } else {
        //    if(props.correctAnswer !== null) {
        //       return props.correctAnswer ? <h2>You are correct!</h2> : <h2>Incorrect answer</h2>
        //     } else {
        //         return <button className="skip-button" onClick={props.handleSkip}>Skip</button>
    //  }
        // return <Timer handlerFromParent={this.handle}/>
        return <Timer elapsedTime={props.elapsedTime}/>
        
         }
    }

    const firstElement = () => {
        if(props.currentView === "start" || props.currentView === "finish"){
            return;
        } else {
            if(props.correctAnswer != null) {
                return <button onClick={props.handleBack}>Back</button>
            } else {
                return <button className="check-button" onClick={props.handleBack}>Back</button>

            }
        }
    }

    const answerElement = () => {
        if (props.currentView === "finish"){
            return;
        } else if(props.currentView == "start"){
            return;
        }else if(props.correctAnswer !== null) {
            return <h2 className="solution">correctAnswer: {props.currentrightAnswer} </h2>
        }
    }

    return(
     <div>
        {/* {answerElement()} */}
        <div className={`quiz-navigation  ${navClassName}`}>
        {firstElement()}
        {secondElement()}
        {thirdElement}
        </div>
     </div>
    
    );
}

export default QuizNav;