import React from 'react';

import './QuizResults.css';
import ResultAnswer from './ResultAnswer.js';
import Axios from 'axios';


class QuizResults extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data:""
        }
    }

    componentDidMount(){
        this.setState({user_id: this.props.user_id});
        Axios.get('https://sonkhya.com/webapp/webapp.php?api_key=1234567&nonce=12345&timestamp=1234567&api_type=GET_TOPIC_SOLUTION&user_id=' + this.props.user_id)
        .then(res => {
            const response = res.data;
            console.log(response,'dsafdsfafs');
            this.setState({data: response});
            })
    }


    render() {
        console.log('question rendering');
        return(
            DataView
        )
    }
}

export default QuizResults;


// class QuizResults-1 extends React.Component {
//     componentDidMount(){
//         this.setState({user_id: this.props.user_id});
//         Axios.get('https://sonkhya.com/webapp/webapp.php?api_key=1234567&nonce=12345&timestamp=1234567&api_type=GET_TOPIC_SOLUTION&user_id=' + this.props.user_id)
//         .then(res => {
//             const response = res.data;
//             console.log(response);
//         })
//     }
// }

// const QuizResults = (props) => {
//         const answersList = props.userAnswers.map( (answer, index) => {
//             const question = props.questions[index];
//             const rightAnswer = props.rightAnswers[index];
//             return <ResultAnswer key={index} index={index} question={question} answer={answer} rightAnswer={rightAnswer} />
//             }
//         );

//         return(
//             <div className="results-container">
//                 <h1>Summary</h1>
//                 <ul>
//                     <li>
//                     <h4 opacity='0'>No.</h4>
//                     <div className="answer">
//                         <button className="userAnswerSkipped tableheadings">Your Answer</button>
//                     </div>
//                     <div className="answer">
//                         <button className="userAnswerSkipped tableheadings">Correct Answer</button> 
//                     </div>
//                     </li>
//                 {answersList}</ul>
//             </div>
//         );
// }

// export default QuizResults;
