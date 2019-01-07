import React from 'react';
import axios from 'axios';
import './App.css';
import QuizHeader from './components/QuizHeader/QuizHeader.js';
import QuizNav from './components/QuizNav/QuizNav.js';
import QuizQuestion from './components/MainViews/QuizQuestion/QuizQuestion.js';
import QuizStart from './components/MainViews/QuizStart/QuizStart.js';
import QuizResults from './components/MainViews/QuizResults/QuizResults.js';

class App extends React.Component {
  componentDidMount() {
    this.setState({user_id: this.props.user_id});
    axios.get('https://sonkhya.com/webapp/webapp.php?api_key=1234567&nonce=12345&timestamp=1234567&api_type=GET_TOPIC&user_id=' + this.state.user_id)
    .then(res => {
      const response = res.data;
      console.log(response,'data')
      // get currect quiz data and save it to app state
      const timeelapsed = response.timeElapsed;
      this.setState({timeElapsed:timeelapsed});
      //console.log(this.state.timeElapsed,'tiem')
      const problems = response.results.map(element => {
        let problem = {
          problemID: element.problem_id,
          title: element.problemTitle,
          description: element.problemDescription
          }
        return problem;
        });

      // const answers = response.results.map((element) => {
      //   let answer = {
      //     a: "problemChoiseA",
      //     b: "problemChoiseB",
      //     c: "problemChoiseC",
      //     d: "problemChoiseD",
      //   }
      //   return answer;
      // });
      const answers = response.results.map((element) => {
        let answer = {
        a: element.problemChoiseA,
        b: element.problemChoiseB,
        c: element.problemChoiseC,
        d: element.problemChoiseD,
        }
        return answer;
        });
      const rightAnswers = response.results.map(element => {
        const letters = ['A','B','C','D'];
        return letters[parseInt(element.problemCorrectChoise) - 1];
      });
      let userCanGoNext = Array(response.pageSize).fill(null);
      userCanGoNext[0] = true;
      this.setState({
        challengeSubject: response.results[0].subjectName,
        challengeDescription: response.results[0].subjectName,
        numberOfProblems: response.pageSize,
        problems: problems,
        answers: answers,
        rightAnswers: rightAnswers,
        userAnswers: Array(response.pageSize).fill(null),
        userAnsweredCorrectly: Array(response.pageSize).fill(null),
        userCanGoNext: userCanGoNext,
      });
    })
    .catch( error => {
      // if unable to get questions from server
      const problems = [
        {
          problemID: 1,
          title: "problemTitle",
          description: "problemDescription"
        },
        {
          problemID: 2,
          title: "problemTitle",
          description: "problemDescription"
        },
        {
          problemID: 3,
          title: "problemTitle",
          description: "problemDescription"
        },
        {
          problemID: 4,
          title: "problemTitle",
          description: "problemDescription"
        },
        {
          problemID: 5,
          title: "problemTitle",
          description: "problemDescription"
        },
        {
          problemID: 6,
          title: "problemTitle",
          description: "problemDescription"
        }];

      const answers = [
      {
          a: "problemChoiseA",
          b: "problemChoiseB",
          c: "problemChoiseC",
          d: "problemChoiseD",
      },
        {
          a: "problemChoiseA",
          b: "problemChoiseB",
          c: "problemChoiseC",
          d: "problemChoiseD",
        },
        {
          a: "problemChoiseA",
          b: "problemChoiseB",
          c: "problemChoiseC",
          d: "problemChoiseD",
        },
        {
          a: "problemChoiseA",
          b: "problemChoiseB",
          c: "problemChoiseC",
          d: "problemChoiseD",
        },
        {
          a: "problemChoiseA",
          b: "problemChoiseB",
          c: "problemChoiseC",
          d: "problemChoiseD",
        },
        {
          a: "problemChoiseA",
          b: "problemChoiseB",
          c: "problemChoiseC",
          d: "problemChoiseD",
        }
      ];

      const rightAnswers = ['A','B','A','C','D','D'];
      const noOfProblems = 6
      let userCanGoNext = Array(noOfProblems).fill(null);
      userCanGoNext[0] = true;
      this.setState({
        challengeSubject: "Mathematics",
        numberOfProblems: noOfProblems,
        problems: problems,
        answers: answers,
        rightAnswers: rightAnswers,
        userAnswers: Array(noOfProblems).fill(null),
        userAnsweredCorrectly: Array(noOfProblems).fill(null),
        userCanGoNext: userCanGoNext
      });
    });
  }

  componentWillUnmount() {
    this.sendAnswers();
  }

  constructor(props) {
    super(props);
    this.state = {        
        currentProblemNo: 1,
        currentView: "start",
        userAnsweredCorrectly: [null],
        userAnswers: [null],
        userCanGoNext: [true],
        rightAnswers: ['C','C','B','D','D','C','A','B'],
        solutions: [null],
        timeElapsed:0
    }
  }


  requireAuth = () => {
    console.log("user authenticated");
  }

  calculateProgress = ({currentProblemNo}) => {
    let progress;
    if(this.state.currentView !== 'start' &&  currentProblemNo !== 1){
      progress = currentProblemNo - 1;
      let t = this.state.numberOfProblems;
      progress = progress / t;
      progress *= 100;
    } else if(this.state.currentView === "finish") {
      progress = 99;
    } else {
      progress = 0;
    }
    return progress;
  }

  incrementCanGoNextArray = ({userCanGoNext, currentProblemNo}) => {
    let array = userCanGoNext.slice();
    array[currentProblemNo] = true;
    array[currentProblemNo + 1] = false;
    this.setState({userCanGoNext: array});
  }

  nextView = () => {
    let currentView = this.state.currentView;
    if(currentView === "start"){
      currentView = "question";
      this.setState({ currentView: currentView});
    } else if(currentView === "question") {
      let i = this.state.currentProblemNo;
      let max = this.state.numberOfProblems;
      if(i !== max){
        i++;
        this.setState({currentProblemNo: i});
      } else {
        currentView = "finish";
        this.setState({ currentView: currentView});
      }
    }
  }

  previousView = () => {
    let currentView = this.state.currentView;
    if(currentView === "results"){
      currentView = "question";
      this.setState({ currentView: currentView});
    } else if(currentView === "question") {
      let i = this.state.currentProblemNo;
      if(i !== 1){
        i--;
        this.setState({currentProblemNo: i});
      } else {
        //currentView = "start";
        //this.setState({ currentView: currentView});
      }
    }
  }

  sendAnswers = () => {
    const userAnswers = JSON.stringify(this.state.userAnswers);
    console.log(userAnswers);
    // send post request to server
  }

  
  sendAnswerToServer = () => {
    const currentProblem = this.state.currentProblemNo - 1;
    let userAnswer = this.state.userAnswers[currentProblem];
    
    switch(userAnswer){
      case 'A':
        userAnswer = 1;
        break;
      case 'B':
        userAnswer = 2;
        break;
      case 'C':
        userAnswer = 3;
        break;
      case 'D':
        userAnswer = 4;
      case null:
        userAnswer = 0;
        break;
      default:
        console.log("Should be unreachable - check this.state.userAnswer if it's uppercase ABCD");
    }
    console.log(userAnswer,'afhafasjlflksajflkal');
    const questionID = this.state.problems[currentProblem].problemID;
    const userID = this.state.user_id;
    const solutions = this.state.solutions;
    axios.get('https://sonkhya.com/webapp/webapp.php?api_key=1234567&nonce=12345&timestamp=1234567&api_type=UPDATE_SOLUTION&user_id='+userID+'&question_id='+questionID+'&answer_choice='+userAnswer)
    .then(function (response) {
      console.log(response.data.results["0"].problemSolution,'solution');
      let solution = response.data.results["0"].problemSolution;
      console.log(currentProblem);
      if (solutions[currentProblem]==null){
      solutions[currentProblem] = solution;
      //console.log(solutions[currentProblem]);
      }
    })
    .catch(function (error) {
      console.log(error);
    });
    this.setState({solutions: solutions});
    //console.log(this.state.solutions,'hhhhhh');
  }

  closeModal = () => {
    this.props.closeModal();
    console.log('modal closed')
  }

  handleNavClick = () => {
    const array = this.state.userCanGoNext;
    const userCanGoNext = array[this.state.currentProblemNo - 1];

    if(this.state.currentView != "start") {
      this.sendAnswerToServer();
      console.log('afafsafaf');
    }
    if(userCanGoNext){
      this.nextView();
      this.incrementCanGoNextArray(this.state);
    }
  }

  handleQuestionClick = (e) => {
    //if(this.state.userAnswers[this.state.currentProblemNo - 1] === null){
      let answer = e.target;
      answer = answer.childNodes[0].innerHTML; 
      console.log(answer,'answer')
      const currentProblem = this.state.currentProblemNo - 1;
      const userAnswers = this.state.userAnswers;
      //if(userAnswers[currentProblem] === null) {
        userAnswers[currentProblem] = answer;
        this.setState({userAnswers: userAnswers});
     // }
    //}
    // if(this.state.userAnswers[this.state.currentProblemNo - 1] !== null) {
    //   this.sendAnswerToServer();
    //   this.incrementCanGoNextArray(this.state);
    //   const currentProblem = this.state.currentProblemNo - 1;
    //   const userAnswers = this.state.userAnswers;
    //   const rightAnswers = this.state.rightAnswers;
    //   const userAnsweredCorrectly = this.state.userAnsweredCorrectly.slice();
    //   const answer = userAnswers[currentProblem];
    //   const rightAnswer = rightAnswers[currentProblem];
    //   if(answer === rightAnswer) {
    //     userAnsweredCorrectly[currentProblem] = true;
    //   } else {
    //     userAnsweredCorrectly[currentProblem] = false;
    //   }
    //   this.setState({userAnsweredCorrectly: userAnsweredCorrectly});
    // }
  }
  handleQuestionCheck = () => {
    if(this.state.userAnswers[this.state.currentProblemNo - 1] !== null) {
      this.sendAnswerToServer();
      this.incrementCanGoNextArray(this.state);
      const currentProblem = this.state.currentProblemNo - 1;
      const userAnswers = this.state.userAnswers;
      const rightAnswers = this.state.rightAnswers;
      const userAnsweredCorrectly = this.state.userAnsweredCorrectly.slice();
      const answer = userAnswers[currentProblem];
      const rightAnswer = rightAnswers[currentProblem];
      if(answer === rightAnswer) {
        userAnsweredCorrectly[currentProblem] = true;
      } else {
        userAnsweredCorrectly[currentProblem] = false;
      }
      this.setState({userAnsweredCorrectly: userAnsweredCorrectly});
    }
  }

  handleSkip = () => {
    this.incrementCanGoNextArray(this.state);
    this.nextView();
  }
  

  renderMainView = ({currentView}) => {
    switch(currentView) {
      case 'start':
      return(
        <QuizStart 
        subject={this.state.challengeSubject}
        description={this.state.challengeDescription}
        />
      );
      case 'finish':
      return(
        <QuizResults
            questions={this.state.problems}
            userAnswers={this.state.userAnswers}   
            rightAnswers={this.state.rightAnswers}
            solutions={this.state.solutions}
        />
        );
      default:
        const currentProblem = this.state.problems[this.state.currentProblemNo - 1];
        const currentAnswers = this.state.answers[this.state.currentProblemNo - 1];
        const userAnswers = this.state.userAnswers[this.state.currentProblemNo - 1];
        const userAnsweredCorrectly = this.state.userAnsweredCorrectly.slice();
        const answerCorrect = userAnsweredCorrectly[this.state.currentProblemNo - 1];
        return(
          <QuizQuestion
          problemid={currentProblem.problemID}
          problemtitle={currentProblem.title}
          problemdescription={currentProblem.description}
          answers={currentAnswers}
          userAnswer={userAnswers}
          answerCorrect={answerCorrect}
          handleClick={this.handleQuestionClick}
          />
        );
    }
  }

  render() {
    return (
        <div className="quiz">
          <QuizHeader close={this.closeModal} progress={this.calculateProgress(this.state)}/>
          <div className="mainview">
          {this.renderMainView(this.state)}
          </div>
            <QuizNav 
            handleClick={this.handleNavClick}
            handleSkip={this.handleSkip}
            handleBack={this.previousView}
            handleCheck={this.handleQuestionCheck}
            currentView={this.state.currentView} 
            questionAnswered={this.state.userAnswers[this.state.currentProblemNo - 1] !== null}
            correctAnswer={this.state.userAnsweredCorrectly[this.state.currentProblemNo - 1]}
            canGoNext={this.state.userCanGoNext}
            sendAnswers={this.sendAnswers}
            closeModal={this.closeModal}
            currentrightAnswer={this.state.rightAnswers[this.state.currentProblemNo - 1]}
            user_id={this.state.user_id}
            elapsedTime={this.state.timeElapsed}
            />
        </div>
    );
  }
}

export default App;


