import React from 'react';

import './QuizResults.css';
import ResultAnswer from './ResultAnswer.js';

const QuizResults = (props) => {
    console.log(props.userAnswers,'aa');
    console.log(props.solutions,'ss');
        const answersList = props.userAnswers.map( (answer, index) => {
            const question = props.questions[index];
            const rightAnswer = props.rightAnswers[index];
            const solution = props.solutions[index];
            console.log(solution,index)
            return <ResultAnswer key={index} index={index} question={question} answer={answer} rightAnswer={rightAnswer} solution={solution} />
            }
        );

        return(
            <div className="results-container">
                <h1>Summary</h1>
                <ul>
                    <li>
                    <h4 opacity='0'>No.</h4>
                    <div className="answer">
                        <button className="userAnswerSkipped tableheadings">Your Answer</button>
                    </div>
                    <div className="answer">
                        <button className="userAnswerSkipped tableheadings">Correct Answer</button> 
                    </div>
                    <div className="answer">
                        <button className="userAnswerSkipped tableheadings">solution</button> 
                    </div>
                    </li>
                {answersList}</ul>
            </div>
        );
}

export default QuizResults;

class Solution extends React.Component {
    constructor(props) {
        super(props);
        this.state = {        
            solutions: [null]  
        }
    }
    componentDidMount() {
        this.setState({user_id: this.props.user_id});
        axios.get('https://sonkhya.com/webapp/webapp.php?api_key=1234567&nonce=12345&timestamp=1234567&api_type=GET_TOPIC_SOLUTION&user_id=' + this.props.user_id)
        .then(res => {
            const response = res.data;
            // get currect quiz data and save it to app state
            const problems = response.results.map(element => {
                    // console.log("Problem Description:", 'https://sonkhya.com/webapp/webapp.php?api_key=1234567&nonce=12345&timestamp=1234567&api_type=GET_TOPIC&user_id=' + this.props.user_id);
                    // console.log("Problem Description processed:", parseSpacesInLatex(element.problemDescription));
                let problem = {
                        problemID: element.problem_id,
                        title: element.problemTitle,
                        description: element.problemDescription,
                        solution:element.problemSolution
                }
                    return problem;
            });

            const answers = response.results.map((element) => {
                let answer = {
                a: element.problemChoiseA,
                b: element.problemChoiseB,
                c: element.problemChoiseC,
                d: element.problemChoiseD,
                }
                return answer;
            });
        })

        this.setState({solutions: problem.Solution});
    }

}

export default Solution;
