(function (React,axios,ReactDOM) {
  'use strict';

  React = React && React.hasOwnProperty('default') ? React['default'] : React;
  axios = axios && axios.hasOwnProperty('default') ? axios['default'] : axios;
  ReactDOM = ReactDOM && ReactDOM.hasOwnProperty('default') ? ReactDOM['default'] : ReactDOM;

  function styleInject(css, ref) {
    if (ref === void 0) ref = {};
    var insertAt = ref.insertAt;

    if (!css || typeof document === 'undefined') {
      return;
    }

    var head = document.head || document.getElementsByTagName('head')[0];
    var style = document.createElement('style');
    style.type = 'text/css';

    if (insertAt === 'top') {
      if (head.firstChild) {
        head.insertBefore(style, head.firstChild);
      } else {
        head.appendChild(style);
      }
    } else {
      head.appendChild(style);
    }

    if (style.styleSheet) {
      style.styleSheet.cssText = css;
    } else {
      style.appendChild(document.createTextNode(css));
    }
  }

  var css = "  .show {\n    width: 150px;\n    height: 40px;\n    margin: 100px 50px;\n    background: #e74c3c;\n    color: #fff;\n    border-radius: 5px;\n    border: 0;\n    border-bottom: 2px solid #c0392b;\n    cursor: pointer;\n  }\n  \n  .show:hover {\n    background: #c0392b;\n  }\n  \n  .show:active {\n    transform: scale(0.9);\n  }\n  \n  .close {\n    position: absolute;\n    top: 0;\n    right: 0;\n    width: 35px;\n    height: 30px;\n    background: #000;\n    color: #fff;\n    cursor: pointer;\n    border: 0;\n  }\n  \n  .mask {\n    position: fixed;\n    top: 0;\n    left: 0;\n    width: 100%;\n    height: 100%;\n    background: rgba(52, 73, 94, 0.8);\n    z-index: 50;\n    visibility: hidden;\n    opacity: 0;\n    transition: 0.7s;\n  }\n  \n  .modal {\n    position: absolute;\n    width: 100%;\n    height: 90%;\n    top: 20px;\n    left: 0;\n    background: #bdc3c7;\n    z-index: 100;\n    visibility: hidden;\n    opacity: 0;\n    transition: 0.5s ease-out;\n    transform: translateY(45px);\n  }\n  .active {\n    visibility: visible;\n    opacity: 1;\n  }\n  \n  .active + .modal {\n    visibility: visible;\n    opacity: 1;\n    transform: translateY(0);\n  }";
  styleInject(css);

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
  }

  function _defineProperty(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }

    return obj;
  }

  function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function");
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        writable: true,
        configurable: true
      }
    });
    if (superClass) _setPrototypeOf(subClass, superClass);
  }

  function _getPrototypeOf(o) {
    _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
      return o.__proto__ || Object.getPrototypeOf(o);
    };
    return _getPrototypeOf(o);
  }

  function _setPrototypeOf(o, p) {
    _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
      o.__proto__ = p;
      return o;
    };

    return _setPrototypeOf(o, p);
  }

  function _assertThisInitialized(self) {
    if (self === void 0) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return self;
  }

  function _possibleConstructorReturn(self, call) {
    if (call && (typeof call === "object" || typeof call === "function")) {
      return call;
    }

    return _assertThisInitialized(self);
  }

  var css$1 = "#root, .quiz {\n  height: 100%\n}\n.quiz {\n  background-color: #fafafa;\n  width: 100%;\n  display: flex;\n  flex-direction: column;\n  justify-content: space-between;\n}\n.quiz button,\n.quiz h1,\n.quiz h2,\n.quiz h3,\n.quiz h4 {\n  font-family: 'Overlock', sans-serif;\n}\n.quiz-container {\nbackground-color: #fafafa;\ndisplay: flex;\nflex-direction: column;\ntext-align: center;\n}\n.quiz-problemTitle > span {\nfont-size: 0.8em;\ncolor: #aaa;\n}\n.mainview {\n  overflow-y: scroll;\n  height: 100%;\n}";
  styleInject(css$1);

  var css$2 = ".quiz-header {\n    display: flex;\n    flex-direction: row;\n}\n.quiz-header button{\n    background-color: #fafafa;\n    border: none;\n    cursor: pointer;\n    padding: 30px;\n}\n.quiz-header button:hover{\n    background: #fafafa;\n}\n.quiz-header button:focus{\n    outline: 0px;\n}\n.progress-wrapper {\n    width: 90%;\n    right: 20%;\n}\n.progressbar {\n    display: block;\n    height: 37px;\n    border-bottom: 3px solid #40d440;\n    transition: width 1s ease-out;\n}\n.exit {\n    color: #525252;\n    \n    font-size: 2em;\n}";
  styleInject(css$2);

  var QuizHeader = function QuizHeader(props) {
    return React.createElement("div", {
      className: "quiz-header"
    }, React.createElement("button", {
      onClick: props.close
    }, React.createElement("i", {
      className: "fas fa-times-circle exit"
    })), React.createElement("div", {
      className: "progress-wrapper"
    }, React.createElement("div", {
      className: "progressbar",
      style: {
        width: props.progress + '%'
      }
    })));
  };

  var css$3 = ".quiz-navigation{\n    width: 100%;\n    display: flex;\n    flex-direction: row;\n    justify-content: space-around;\n    padding-top: 20px;\n    padding-bottom: 30px;\n}\n.quiz-navigation h2 {\n  transition: transform 4s ease;\n}\n.quiz-navigation-normal {\n  background-color: #b9b9b970;\n}\n.quiz-navigation-normal button {\n  background-color: #35c509;\n}\n.quiz-navigation-correct {\n  background-color: #8cda79b6;\n}\n.quiz-navigation-correct button {\n  background-color: #4aaa35;\n  color: #fff;\n  cursor: pointer;\n}\n.quiz-navigation-correct h2 {\n  color: #4aaa35;\n}\n.quiz-navigation-correct .skip-button,\n.quiz-navigation-incorrect .skip-button,\n.quiz-navigation-normal .skip-button {\n  \n}\n\n.quiz-navigation-incorrect {\n  background-color: #da7979b6;\n  cursor: pointer;\n}\n.quiz-navigation-incorrect button {\n  background-color: #c72828;\n  color: #fff;\n}\n.quiz-navigation-incorrect h2 {\n  color: #c72828;\n}\n\n.quiz-navigation button {\n  width: 100px;\n  height: 60px;\n  font-size: 1.3em;\n  display: inline-block;\n  border: none;\n  cursor: pointer;\n  text-decoration: none;\n  -moz-border-radius: 25px;\n  -webkit-border-radius: 25px;\n  border-radius: 40px;\n  transition: all 0.5s ease-in-out;\n  -webkit-appearance: none;\n  -moz-appearance: none;\n\n  \n}\n.quiz-navigation button:focus {\n  outline: 0px;\n}\n.quiz-navigation button:active {\n  transform: scale(0.99);\n}\n.skip-button {\n  background-color: #00000000 !important;\n  border: 1px solid #6d6d6d !important;\n}\n.check-button {\n  background-color: #00000000 !important;\n  border: 1px solid #4aaa35 !important;\n  color: #4aaa35;\n}\n\n.start-button {\n  width: 70%;\n}\n\n.solution {\n  align-content: center;\n  width: 100%;\n  text-align: center;\n}";
  styleInject(css$3);

  // import Buttons from './buttons/index'
  // import './styles.css'

  var Timer =
  /*#__PURE__*/
  function (_React$Component) {
    _inherits(Timer, _React$Component);

    function Timer(props) {
      var _this;

      _classCallCheck(this, Timer);

      _this = _possibleConstructorReturn(this, _getPrototypeOf(Timer).call(this, props));
      _this.state = {
        timerStarted: false,
        timerStopped: true,
        minutes: 0,
        seconds: 0,
        captures: []
      };
      return _this;
    }

    _createClass(Timer, [{
      key: "render",
      value: function render() {
        //const {count} = this.state
        return React.createElement("div", {
          classname: "container"
        }, React.createElement("h1", null, this.state.minutes + ":" + this.state.seconds));
      }
    }, {
      key: "componentDidMount",
      value: function componentDidMount() {
        var _this2 = this;

        // axios.get('https://sonkhya.com/webapp/webapp.php?api_key=1234567&nonce=12345&timestamp=1234567&api_type=GET_TOPIC&user_id=' + this.props.user_id)
        // .then(res => {
        // const response = res.data;
        // console.log(response,'data')
        // get currect quiz data and save it to app state
        var timeelapsed = this.props.elapsedTime;
        var minutes = Math.floor(timeelapsed / 60);
        var seconds = timeelapsed % 60;
        this.setState({
          minutes: minutes
        });
        this.setState({
          seconds: seconds
        });
        console.log(this.state.minutes, 'mm');
        this.myIntreval = setInterval(function () {
          if (_this2.state.seconds >= 59) {
            _this2.setState(function (prevState) {
              return {
                minutes: prevState.minutes + 1,
                seconds: -1
              };
            });
          }

          _this2.setState(function (prevState) {
            return {
              seconds: prevState.seconds + 1
            };
          });
        }, 1000);
      }
    }, {
      key: "componentWillUnmount",
      value: function componentWillUnmount() {
        var minutes = this.state.minutes;
        var seconds = this.state.seconds;
        var elapsed_time = minutes * 60 + seconds; //    console.log(this.props.user_id, el);

        axios.get('https://sonkhya.com/webapp/webapp.php?api_key=1234567&nonce=12345&timestamp=1234567&api_type=UPDATE_ELAPSEDTIME&user_id=' + this.props.user_id + '&elapsed_time=' + elapsed_time).then(function (response) {
          console.log(response.data, 'when modal close, timer unmount');
        });
      }
    }]);

    return Timer;
  }(React.Component);

  var QuizNav = function QuizNav(props) {
    var navClassName = 'quiz-navigation-normal';
    var buttonClassName;
    var buttonText;
    var clickhandler; // let elaspetime;
    // const handledata = (data) =>{
    //     elaspetime = data;
    // }

    if (props.currentView === "start") {
      buttonText = "Start";
      clickhandler = props.handleClick;
    } else if (props.currentView === "finish") {
      buttonText = "Finish";

      clickhandler = function clickhandler() {
        props.sendAnswers();
        props.closeModal();
      };
    } else {
      if (props.correctAnswer != null) {
        buttonText = "Next"; //navClassName = props.correctAnswer ? 'quiz-navigation-correct' : 'quiz-navigation-incorrect';  

        clickhandler = props.handleClick;
      } else {
        buttonText = "Next";
        buttonClassName = "check-button";

        if (props.questionAnswered) {
          clickhandler = props.handleClick;
        } else {
          clickhandler = props.handleClick; // clickhandler = () => {
          //     console.log("wiggle this");
          //}
        }
      }
    }

    var thirdElement = React.createElement("button", {
      onClick: clickhandler,
      className: buttonClassName
    }, buttonText); //console.log(props.elapsedTime,'ttt')

    var secondElement = function secondElement() {
      if (props.currentView === "start") {
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
        return React.createElement(Timer, {
          elapsedTime: props.elapsedTime
        });
      }
    };

    var firstElement = function firstElement() {
      if (props.currentView === "start" || props.currentView === "finish") {
        return;
      } else {
        if (props.correctAnswer != null) {
          return React.createElement("button", {
            onClick: props.handleBack
          }, "Back");
        } else {
          return React.createElement("button", {
            className: "check-button",
            onClick: props.handleBack
          }, "Back");
        }
      }
    };

    return React.createElement("div", null, React.createElement("div", {
      className: "quiz-navigation  ".concat(navClassName)
    }, firstElement(), secondElement(), thirdElement));
  };

  var css$4 = ".quiz-problemTitle > span {\n    font-size: 0.8em;\n    color: #aaa;\n  }\n  .quiz-answers {\n    display: block;\n    max-width: 200px;\n    margin: 0 auto;\n    list-style-position: inside;\n    list-style-type: none; \n  }\n  .quiz-answers button {\n      display: inline-block;\n      border: none;\n      padding: 1rem 2rem;\n      min-width: 200px;\n      margin: 1px;\n      text-decoration: none;\n      background-color: #fafafa;\n      color: #000;\n      font-family: sans-serif;\n      font-size: 1rem;\n      cursor: pointer;\n      text-align: center;\n      transition: background 100ms ease-in-out, \n                  transform 50ms ease;\n      -webkit-appearance: none;\n      -moz-appearance: none;\n  }\n  .quiz-answers {\n    position: relative;\n  }\n  .quiz-answers button span {\n    color: #e0e0e0;\n    position: absolute;\n    left: 0;\n  }\n  .quiz-answers button:hover,\n  .quiz-answers button:focus,\n  .userAnswer {\n      border: 1px solid #4aaa35;\n  }\n  .userAnswerCorrect {\n    border: 2px solid #4aaa35 !important;\n  }\n  .userAnswerCorrect:after {\n    position: absolute;\n    left: 250px;\n    font-family: \"Font Awesome 5 Free\";\n    font-weight: 900;\n    content: \"\\f00c\"; \n    color: #4aaa35;\n  } \n  .userAnswerIncorrect {\n    border: 2px solid #2e2e2eaa !important;\n  }\n  .userAnswerIncorrect:after {\n    position: absolute;\n    left: 250px;\n    font-family: \"Font Awesome 5 Free\";\n    font-weight: 900;\n    content: \"\\f00d\"; \n    color: #c72828;\n  }\n  .quiz-answers button:focus {\n      outline: 0px;\n      outline-offset: -4px;\n  }\n  .quiz-answers button:active,\n  .chosen-answer {\n      background-color: #e3e3e3b0;\n  }";
  styleInject(css$4);

  var Answer = function Answer(props) {
    return React.createElement("li", null, React.createElement("button", {
      className: props.className
    }, React.createElement("span", null, props.letter), props.answer));
  };

  var QuizQuestion = function QuizQuestion(props) {
    return React.createElement("div", {
      className: "quiz-container"
    }, React.createElement("h2", {
      className: "quiz-problemTitle"
    }, React.createElement("span", null, "#", props.problemid), " ", props.problemtitle), React.createElement("h3", {
      className: "quiz-problemDescription"
    }, props.problemdescription), React.createElement("ul", {
      className: "quiz-answers",
      onClick: props.handleClick
    }, Object.keys(props.answers).map(function (key, index) {
      var cl;

      if (props.userAnswer !== null) {
        if (props.answerCorrect === true) {
          cl = props.userAnswer === key.toUpperCase() ? "userAnswerCorrect" : "";
        } else if (props.answerCorrect === false) {
          cl = props.userAnswer === key.toUpperCase() ? "userAnswerCorrect" : "";
        } else {
          cl = props.userAnswer === key.toUpperCase() ? "userAnswerCorrect" : "";
        }
      }

      return React.createElement(Answer, {
        key: index,
        letter: key.toUpperCase(),
        answer: props.answers[key],
        className: cl
      });
    })));
  };

  var css$5 = ".quizstart {\n    text-align: center;\n    margin-top: 140px;\n}\n.quizstart * {\n    color: #000;\n}\n.quizstart h2 {\n    font-size: 1.2em;\n}\n.quizstart h3 {\n    font-size: 0.8em; \n}";
  styleInject(css$5);

  function QuizStart(props) {
    return React.createElement("div", {
      className: "quizstart"
    }, React.createElement("h2", null, props.subject), React.createElement("h3", null, props.description));
  }

  var css$6 = ".results-container {\n    overflow-x: hidden;\n}\n.results-container li {\n    list-style: none;\n    display: flex;\n    flex-direction: row;\n    justify-content: space-around;\n    width: 100%;\n    margin: 10px 0;\n}\n.results-container ul {\n    display: block;\n    \n    margin: 0 auto;\n    padding: 0;\n}\n.results-container {\n    display: block;\n    margin: 0 auto;\n    list-style-position: inside;\n    list-style-type: none; \n    text-align: center;\n}\n.results-container button {\n    display: inline-block;\n    border: none;\n    padding: 1rem 2rem;\n    margin: 1px;\n    text-decoration: none;\n    background-color: #fafafa;\n    color: #000;\n    font-family: sans-serif;\n    font-size: 1rem;\n    cursor: pointer;\n    text-align: center;\n    transition: background 100ms ease-in-out, \n                transform 50ms ease;\n    -webkit-appearance: none;\n    -moz-appearance: none;\n}\n.youranswer, .answer {\n    margin-right: 20px;\n    display: flex;\n    flex-direction: row;\n    justify-content: space-evenly;\n}\n.tableheadings {\n    font-weight: 600;\n}";
  styleInject(css$6);

  var css$7 = ".answer .userAnswerCorrect:after,\n.answer .userAnswerIncorrect:after {\n    content: none;\n}\n\n.userAnswerCorrect {\n    border: 2px solid #4aaa35 !important;\n  }\n  .userAnswerIncorrect {\n    border: 2px solid #c72828 !important;\n  }\n.answer .userAnswerSkipped,\n.tableheadings {\n    min-width: 200px;\n}\n.userAnswerSkipped {\n    border: none;\n\n  }\nli > h4 {\n    min-width: 23px;\n}\n";
  styleInject(css$7);

  var ResultAnswer = function ResultAnswer(props) {
    if (props.answer === props.rightAnswer) {
      return React.createElement("li", null, React.createElement("h4", null, props.index + 1, "."), React.createElement("div", {
        className: "answer correctanswer"
      }, React.createElement("button", {
        className: "userAnswerCorrect"
      }, props.answer)), React.createElement("div", {
        className: "answer correctanswer"
      }, React.createElement("button", {
        className: "userAnswerCorrect"
      }, props.rightAnswer)), React.createElement("div", {
        className: "answer correctanswer"
      }, React.createElement("button", {
        className: "userAnswerCorrect"
      }, props.solution)));
    } else if (props.answer === null) {
      return React.createElement("li", null, React.createElement("h4", null, props.index + 1, "."), React.createElement("div", {
        className: "answer incorrectanswer"
      }, React.createElement("button", {
        className: "userAnswerSkipped"
      }, "Skipped")), React.createElement("div", {
        className: "answer correctanswer"
      }, React.createElement("button", {
        className: "userAnswerCorrect"
      }, props.rightAnswer)), React.createElement("div", {
        className: "answer correctanswer"
      }, React.createElement("button", {
        className: "userAnswerCorrect"
      }, props.solution)));
    } else {
      return React.createElement("li", null, React.createElement("h4", null, props.index + 1, "."), React.createElement("div", {
        className: "answer incorrectanswer"
      }, React.createElement("button", {
        className: "userAnswerIncorrect"
      }, props.answer)), React.createElement("div", {
        className: "answer correctanswer"
      }, React.createElement("button", {
        className: "userAnswerCorrect"
      }, props.rightAnswer)), React.createElement("div", {
        className: "answer correctanswer"
      }, React.createElement("button", {
        className: "userAnswerCorrect"
      }, props.solution)));
    }
  };

  var QuizResults = function QuizResults(props) {
    console.log(props.userAnswers, 'aa');
    console.log(props.solutions, 'ss');
    var answersList = props.userAnswers.map(function (answer, index) {
      var question = props.questions[index];
      var rightAnswer = props.rightAnswers[index];
      var solution = props.solutions[index];
      console.log(solution, index);
      return React.createElement(ResultAnswer, {
        key: index,
        index: index,
        question: question,
        answer: answer,
        rightAnswer: rightAnswer,
        solution: solution
      });
    });
    return React.createElement("div", {
      className: "results-container"
    }, React.createElement("h1", null, "Summary"), React.createElement("ul", null, React.createElement("li", null, React.createElement("h4", {
      opacity: "0"
    }, "No."), React.createElement("div", {
      className: "answer"
    }, React.createElement("button", {
      className: "userAnswerSkipped tableheadings"
    }, "Your Answer")), React.createElement("div", {
      className: "answer"
    }, React.createElement("button", {
      className: "userAnswerSkipped tableheadings"
    }, "Correct Answer")), React.createElement("div", {
      className: "answer"
    }, React.createElement("button", {
      className: "userAnswerSkipped tableheadings"
    }, "solution"))), answersList));
  };

  var App =
  /*#__PURE__*/
  function (_React$Component) {
    _inherits(App, _React$Component);

    _createClass(App, [{
      key: "componentDidMount",
      value: function componentDidMount() {
        var _this2 = this;

        this.setState({
          user_id: this.props.user_id
        });
        axios.get('https://sonkhya.com/webapp/webapp.php?api_key=1234567&nonce=12345&timestamp=1234567&api_type=GET_TOPIC&user_id=' + this.state.user_id).then(function (res) {
          var response = res.data;
          console.log(response, 'data'); // get currect quiz data and save it to app state

          var timeelapsed = response.timeElapsed;

          _this2.setState({
            timeElapsed: timeelapsed
          }); //console.log(this.state.timeElapsed,'tiem')


          var problems = response.results.map(function (element) {
            var problem = {
              problemID: element.problem_id,
              title: element.problemTitle,
              description: element.problemDescription
            };
            return problem;
          }); // const answers = response.results.map((element) => {
          //   let answer = {
          //     a: "problemChoiseA",
          //     b: "problemChoiseB",
          //     c: "problemChoiseC",
          //     d: "problemChoiseD",
          //   }
          //   return answer;
          // });

          var answers = response.results.map(function (element) {
            var answer = {
              a: element.problemChoiseA,
              b: element.problemChoiseB,
              c: element.problemChoiseC,
              d: element.problemChoiseD
            };
            return answer;
          });
          var rightAnswers = response.results.map(function (element) {
            var letters = ['A', 'B', 'C', 'D'];
            return letters[parseInt(element.problemCorrectChoise) - 1];
          });
          var userCanGoNext = Array(response.pageSize).fill(null);
          userCanGoNext[0] = true;

          _this2.setState({
            challengeSubject: response.results[0].subjectName,
            challengeDescription: response.results[0].subjectName,
            numberOfProblems: response.pageSize,
            problems: problems,
            answers: answers,
            rightAnswers: rightAnswers,
            userAnswers: Array(response.pageSize).fill(null),
            userAnsweredCorrectly: Array(response.pageSize).fill(null),
            userCanGoNext: userCanGoNext
          });
        }).catch(function (error) {
          // if unable to get questions from server
          var problems = [{
            problemID: 1,
            title: "problemTitle",
            description: "problemDescription"
          }, {
            problemID: 2,
            title: "problemTitle",
            description: "problemDescription"
          }, {
            problemID: 3,
            title: "problemTitle",
            description: "problemDescription"
          }, {
            problemID: 4,
            title: "problemTitle",
            description: "problemDescription"
          }, {
            problemID: 5,
            title: "problemTitle",
            description: "problemDescription"
          }, {
            problemID: 6,
            title: "problemTitle",
            description: "problemDescription"
          }];
          var answers = [{
            a: "problemChoiseA",
            b: "problemChoiseB",
            c: "problemChoiseC",
            d: "problemChoiseD"
          }, {
            a: "problemChoiseA",
            b: "problemChoiseB",
            c: "problemChoiseC",
            d: "problemChoiseD"
          }, {
            a: "problemChoiseA",
            b: "problemChoiseB",
            c: "problemChoiseC",
            d: "problemChoiseD"
          }, {
            a: "problemChoiseA",
            b: "problemChoiseB",
            c: "problemChoiseC",
            d: "problemChoiseD"
          }, {
            a: "problemChoiseA",
            b: "problemChoiseB",
            c: "problemChoiseC",
            d: "problemChoiseD"
          }, {
            a: "problemChoiseA",
            b: "problemChoiseB",
            c: "problemChoiseC",
            d: "problemChoiseD"
          }];
          var rightAnswers = ['A', 'B', 'A', 'C', 'D', 'D'];
          var noOfProblems = 6;
          var userCanGoNext = Array(noOfProblems).fill(null);
          userCanGoNext[0] = true;

          _this2.setState({
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
    }, {
      key: "componentWillUnmount",
      value: function componentWillUnmount() {
        this.sendAnswers();
      }
    }]);

    function App(props) {
      var _this;

      _classCallCheck(this, App);

      _this = _possibleConstructorReturn(this, _getPrototypeOf(App).call(this, props));

      _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "requireAuth", function () {
        console.log("user authenticated");
      });

      _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "calculateProgress", function (_ref) {
        var currentProblemNo = _ref.currentProblemNo;
        var progress;

        if (_this.state.currentView !== 'start' && currentProblemNo !== 1) {
          progress = currentProblemNo - 1;
          var t = _this.state.numberOfProblems;
          progress = progress / t;
          progress *= 100;
        } else if (_this.state.currentView === "finish") {
          progress = 99;
        } else {
          progress = 0;
        }

        return progress;
      });

      _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "incrementCanGoNextArray", function (_ref2) {
        var userCanGoNext = _ref2.userCanGoNext,
            currentProblemNo = _ref2.currentProblemNo;
        var array = userCanGoNext.slice();
        array[currentProblemNo] = true;
        array[currentProblemNo + 1] = false;

        _this.setState({
          userCanGoNext: array
        });
      });

      _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "nextView", function () {
        var currentView = _this.state.currentView;

        if (currentView === "start") {
          currentView = "question";

          _this.setState({
            currentView: currentView
          });
        } else if (currentView === "question") {
          var i = _this.state.currentProblemNo;
          var max = _this.state.numberOfProblems;

          if (i !== max) {
            i++;

            _this.setState({
              currentProblemNo: i
            });
          } else {
            currentView = "finish";

            _this.setState({
              currentView: currentView
            });
          }
        }
      });

      _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "previousView", function () {
        var currentView = _this.state.currentView;

        if (currentView === "results") {
          currentView = "question";

          _this.setState({
            currentView: currentView
          });
        } else if (currentView === "question") {
          var i = _this.state.currentProblemNo;

          if (i !== 1) {
            i--;

            _this.setState({
              currentProblemNo: i
            });
          }
        }
      });

      _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "sendAnswers", function () {
        var userAnswers = JSON.stringify(_this.state.userAnswers);
        console.log(userAnswers); // send post request to server
      });

      _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "sendAnswerToServer", function () {
        var currentProblem = _this.state.currentProblemNo - 1;
        var userAnswer = _this.state.userAnswers[currentProblem];

        switch (userAnswer) {
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

        console.log(userAnswer, 'afhafasjlflksajflkal');
        var questionID = _this.state.problems[currentProblem].problemID;
        var userID = _this.state.user_id;
        var solutions = _this.state.solutions;
        axios.get('https://sonkhya.com/webapp/webapp.php?api_key=1234567&nonce=12345&timestamp=1234567&api_type=UPDATE_SOLUTION&user_id=' + userID + '&question_id=' + questionID + '&answer_choice=' + userAnswer).then(function (response) {
          console.log(response.data.results["0"].problemSolution, 'solution');
          var solution = response.data.results["0"].problemSolution;
          console.log(currentProblem);

          if (solutions[currentProblem] == null) {
            solutions[currentProblem] = solution; //console.log(solutions[currentProblem]);
          }
        }).catch(function (error) {
          console.log(error);
        });

        _this.setState({
          solutions: solutions
        }); //console.log(this.state.solutions,'hhhhhh');

      });

      _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "closeModal", function () {
        _this.props.closeModal();

        console.log('modal closed');
      });

      _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "handleNavClick", function () {
        var array = _this.state.userCanGoNext;
        var userCanGoNext = array[_this.state.currentProblemNo - 1];

        if (_this.state.currentView != "start") {
          _this.sendAnswerToServer();

          console.log('afafsafaf');
        }

        if (userCanGoNext) {
          _this.nextView();

          _this.incrementCanGoNextArray(_this.state);
        }
      });

      _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "handleQuestionClick", function (e) {
        //if(this.state.userAnswers[this.state.currentProblemNo - 1] === null){
        var answer = e.target;
        answer = answer.childNodes[0].innerHTML;
        console.log(answer, 'answer');
        var currentProblem = _this.state.currentProblemNo - 1;
        var userAnswers = _this.state.userAnswers; //if(userAnswers[currentProblem] === null) {

        userAnswers[currentProblem] = answer;

        _this.setState({
          userAnswers: userAnswers
        }); // }
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

      });

      _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "handleQuestionCheck", function () {
        if (_this.state.userAnswers[_this.state.currentProblemNo - 1] !== null) {
          _this.sendAnswerToServer();

          _this.incrementCanGoNextArray(_this.state);

          var currentProblem = _this.state.currentProblemNo - 1;
          var userAnswers = _this.state.userAnswers;
          var rightAnswers = _this.state.rightAnswers;

          var userAnsweredCorrectly = _this.state.userAnsweredCorrectly.slice();

          var answer = userAnswers[currentProblem];
          var rightAnswer = rightAnswers[currentProblem];

          if (answer === rightAnswer) {
            userAnsweredCorrectly[currentProblem] = true;
          } else {
            userAnsweredCorrectly[currentProblem] = false;
          }

          _this.setState({
            userAnsweredCorrectly: userAnsweredCorrectly
          });
        }
      });

      _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "handleSkip", function () {
        _this.incrementCanGoNextArray(_this.state);

        _this.nextView();
      });

      _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "renderMainView", function (_ref3) {
        var currentView = _ref3.currentView;

        switch (currentView) {
          case 'start':
            return React.createElement(QuizStart, {
              subject: _this.state.challengeSubject,
              description: _this.state.challengeDescription
            });

          case 'finish':
            return React.createElement(QuizResults, {
              questions: _this.state.problems,
              userAnswers: _this.state.userAnswers,
              rightAnswers: _this.state.rightAnswers,
              solutions: _this.state.solutions
            });

          default:
            var currentProblem = _this.state.problems[_this.state.currentProblemNo - 1];
            var currentAnswers = _this.state.answers[_this.state.currentProblemNo - 1];
            var userAnswers = _this.state.userAnswers[_this.state.currentProblemNo - 1];

            var userAnsweredCorrectly = _this.state.userAnsweredCorrectly.slice();

            var answerCorrect = userAnsweredCorrectly[_this.state.currentProblemNo - 1];
            return React.createElement(QuizQuestion, {
              problemid: currentProblem.problemID,
              problemtitle: currentProblem.title,
              problemdescription: currentProblem.description,
              answers: currentAnswers,
              userAnswer: userAnswers,
              answerCorrect: answerCorrect,
              handleClick: _this.handleQuestionClick
            });
        }
      });

      _this.state = {
        currentProblemNo: 1,
        currentView: "start",
        userAnsweredCorrectly: [null],
        userAnswers: [null],
        userCanGoNext: [true],
        rightAnswers: ['C', 'C', 'B', 'D', 'D', 'C', 'A', 'B'],
        solutions: [null],
        timeElapsed: 0
      };
      return _this;
    }

    _createClass(App, [{
      key: "render",
      value: function render() {
        return React.createElement("div", {
          className: "quiz"
        }, React.createElement(QuizHeader, {
          close: this.closeModal,
          progress: this.calculateProgress(this.state)
        }), React.createElement("div", {
          className: "mainview"
        }, this.renderMainView(this.state)), React.createElement(QuizNav, {
          handleClick: this.handleNavClick,
          handleSkip: this.handleSkip,
          handleBack: this.previousView,
          handleCheck: this.handleQuestionCheck,
          currentView: this.state.currentView,
          questionAnswered: this.state.userAnswers[this.state.currentProblemNo - 1] !== null,
          correctAnswer: this.state.userAnsweredCorrectly[this.state.currentProblemNo - 1],
          canGoNext: this.state.userCanGoNext,
          sendAnswers: this.sendAnswers,
          closeModal: this.closeModal,
          currentrightAnswer: this.state.rightAnswers[this.state.currentProblemNo - 1],
          user_id: this.state.user_id,
          elapsedTime: this.state.timeElapsed
        }));
      }
    }]);

    return App;
  }(React.Component);

  function closeModal() {
    document.getElementsByClassName("mask")[0].classList.remove("active");
    ReactDOM.unmountComponentAtNode(document.getElementById('root'));
  }

  function runReactApp(userid) {
    document.getElementsByClassName("mask")[0].classList.add("active");
    ReactDOM.render(React.createElement(App, {
      user_id: userid,
      closeModal: closeModal
    }), document.getElementById('root'));
    console.log(userid);
  }

  var t = document.getElementsByClassName("show");

  var _loop = function _loop(i) {
    t[i].addEventListener("click", function () {
      runReactApp(t[i].id);
    }, false);
  };

  for (var i = 0; i < t.length; i++) {
    _loop(i);
  }

}(React,axios,ReactDOM));
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicXVpemJ1bmRsZS5qcyIsInNvdXJjZXMiOlsiLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWluamVjdC9kaXN0L3N0eWxlLWluamVjdC5lcy5qcyIsIi4uLy4uL3NyYy9hcHAvY29tcG9uZW50cy9RdWl6SGVhZGVyL1F1aXpIZWFkZXIuanMiLCIuLi8uLi9zcmMvYXBwL2NvbXBvbmVudHMvUXVpek5hdi9UaW1lci9pbmRleC5qcyIsIi4uLy4uL3NyYy9hcHAvY29tcG9uZW50cy9RdWl6TmF2L1F1aXpOYXYuanMiLCIuLi8uLi9zcmMvYXBwL2NvbXBvbmVudHMvTWFpblZpZXdzL1F1aXpRdWVzdGlvbi9BbnN3ZXIuanMiLCIuLi8uLi9zcmMvYXBwL2NvbXBvbmVudHMvTWFpblZpZXdzL1F1aXpRdWVzdGlvbi9RdWl6UXVlc3Rpb24uanMiLCIuLi8uLi9zcmMvYXBwL2NvbXBvbmVudHMvTWFpblZpZXdzL1F1aXpTdGFydC9RdWl6U3RhcnQuanMiLCIuLi8uLi9zcmMvYXBwL2NvbXBvbmVudHMvTWFpblZpZXdzL1F1aXpSZXN1bHRzL1Jlc3VsdEFuc3dlci5qcyIsIi4uLy4uL3NyYy9hcHAvY29tcG9uZW50cy9NYWluVmlld3MvUXVpelJlc3VsdHMvUXVpelJlc3VsdHMuanMiLCIuLi8uLi9zcmMvYXBwL0FwcC5qcyIsIi4uLy4uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJmdW5jdGlvbiBzdHlsZUluamVjdChjc3MsIHJlZikge1xuICBpZiAoIHJlZiA9PT0gdm9pZCAwICkgcmVmID0ge307XG4gIHZhciBpbnNlcnRBdCA9IHJlZi5pbnNlcnRBdDtcblxuICBpZiAoIWNzcyB8fCB0eXBlb2YgZG9jdW1lbnQgPT09ICd1bmRlZmluZWQnKSB7IHJldHVybjsgfVxuXG4gIHZhciBoZWFkID0gZG9jdW1lbnQuaGVhZCB8fCBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZSgnaGVhZCcpWzBdO1xuICB2YXIgc3R5bGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzdHlsZScpO1xuICBzdHlsZS50eXBlID0gJ3RleHQvY3NzJztcblxuICBpZiAoaW5zZXJ0QXQgPT09ICd0b3AnKSB7XG4gICAgaWYgKGhlYWQuZmlyc3RDaGlsZCkge1xuICAgICAgaGVhZC5pbnNlcnRCZWZvcmUoc3R5bGUsIGhlYWQuZmlyc3RDaGlsZCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGhlYWQuYXBwZW5kQ2hpbGQoc3R5bGUpO1xuICAgIH1cbiAgfSBlbHNlIHtcbiAgICBoZWFkLmFwcGVuZENoaWxkKHN0eWxlKTtcbiAgfVxuXG4gIGlmIChzdHlsZS5zdHlsZVNoZWV0KSB7XG4gICAgc3R5bGUuc3R5bGVTaGVldC5jc3NUZXh0ID0gY3NzO1xuICB9IGVsc2Uge1xuICAgIHN0eWxlLmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKGNzcykpO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IHN0eWxlSW5qZWN0O1xuIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCAnLi9RdWl6SGVhZGVyLmNzcyc7XG5jb25zdCBRdWl6SGVhZGVyID0gKHByb3BzKSA9PiB7XG4gICAgcmV0dXJuKFxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInF1aXotaGVhZGVyXCI+XG4gICAgICAgICAgICA8YnV0dG9uIG9uQ2xpY2s9e3Byb3BzLmNsb3NlfT48aSBjbGFzc05hbWU9XCJmYXMgZmEtdGltZXMtY2lyY2xlIGV4aXRcIj48L2k+PC9idXR0b24+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInByb2dyZXNzLXdyYXBwZXJcIj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInByb2dyZXNzYmFyXCIgc3R5bGU9e3t3aWR0aDogcHJvcHMucHJvZ3Jlc3MgKyAnJSd9fT48L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICApO1xufVxuXG5leHBvcnQgZGVmYXVsdCBRdWl6SGVhZGVyOyIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCdcclxuaW1wb3J0IGF4aW9zIGZyb20gJ2F4aW9zJztcclxuLy8gaW1wb3J0IEVsYXBzZWRUaW1lIGZyb20gJy4vZWxhcHNlZC10aW1lL2luZGV4J1xyXG4vLyBpbXBvcnQgQnV0dG9ucyBmcm9tICcuL2J1dHRvbnMvaW5kZXgnXHJcblxyXG4vLyBpbXBvcnQgJy4vc3R5bGVzLmNzcydcclxuXHJcbmNsYXNzIFRpbWVyIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcclxuICAgIGNvbnN0cnVjdG9yKHByb3BzKXtcclxuICAgICAgICBzdXBlcihwcm9wcykgXHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgIHRoaXMuc3RhdGUgPSB7XHJcbiAgICAgICAgICAgIHRpbWVyU3RhcnRlZDogZmFsc2UsXHJcbiAgICAgICAgICAgIHRpbWVyU3RvcHBlZDogdHJ1ZSxcclxuICAgICAgICAgICAgbWludXRlczogMCxcclxuICAgICAgICAgICAgc2Vjb25kczogMCxcclxuICAgICAgICAgICAgY2FwdHVyZXM6IFtdXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIFxyXG5cclxuICAgIHJlbmRlcigpIHtcclxuICAgICAgICAvL2NvbnN0IHtjb3VudH0gPSB0aGlzLnN0YXRlXHJcbiAgICAgICAgXHJcbiAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgPGRpdiBjbGFzc25hbWU9J2NvbnRhaW5lcic+XHJcbiAgICAgICAgICAgICAgICA8aDE+e3RoaXMuc3RhdGUubWludXRlcyArIFwiOlwiICsgdGhpcy5zdGF0ZS5zZWNvbmRzfTwvaDE+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgIClcclxuICAgIH1cclxuXHJcbiAgICBjb21wb25lbnREaWRNb3VudCAoKSB7XHJcbiAgICAgICAgLy8gYXhpb3MuZ2V0KCdodHRwczovL3NvbmtoeWEuY29tL3dlYmFwcC93ZWJhcHAucGhwP2FwaV9rZXk9MTIzNDU2NyZub25jZT0xMjM0NSZ0aW1lc3RhbXA9MTIzNDU2NyZhcGlfdHlwZT1HRVRfVE9QSUMmdXNlcl9pZD0nICsgdGhpcy5wcm9wcy51c2VyX2lkKVxyXG4gICAgICAgIC8vIC50aGVuKHJlcyA9PiB7XHJcbiAgICAgICAgLy8gY29uc3QgcmVzcG9uc2UgPSByZXMuZGF0YTtcclxuICAgICAgICAvLyBjb25zb2xlLmxvZyhyZXNwb25zZSwnZGF0YScpXHJcbiAgICAgICAgLy8gZ2V0IGN1cnJlY3QgcXVpeiBkYXRhIGFuZCBzYXZlIGl0IHRvIGFwcCBzdGF0ZVxyXG4gICAgICAgIGNvbnN0IHRpbWVlbGFwc2VkID0gdGhpcy5wcm9wcy5lbGFwc2VkVGltZTtcclxuICAgICAgICBjb25zdCBtaW51dGVzID0gTWF0aC5mbG9vcih0aW1lZWxhcHNlZC82MCk7XHJcbiAgICAgICAgY29uc3Qgc2Vjb25kcyA9IHRpbWVlbGFwc2VkICUgNjA7XHJcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7bWludXRlczptaW51dGVzfSk7XHJcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7c2Vjb25kczpzZWNvbmRzfSk7XHJcbiAgICAgICAgY29uc29sZS5sb2codGhpcy5zdGF0ZS5taW51dGVzLCdtbScpXHJcbiAgICAgICAgdGhpcy5teUludHJldmFsID0gc2V0SW50ZXJ2YWwoKCk9PntcclxuICAgICAgICAgICAgaWYgKHRoaXMuc3RhdGUuc2Vjb25kcz49NTkpe1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSgocHJldlN0YXRlKT0+KHttaW51dGVzOiBwcmV2U3RhdGUubWludXRlcysxLHNlY29uZHM6IC0xfSkpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUocHJldlN0YXRlID0+ICh7XHJcbiAgICAgICAgICAgICAgICBzZWNvbmRzOiBwcmV2U3RhdGUuc2Vjb25kcyArIDFcclxuICAgICAgICAgICAgfSkpXHJcbiAgICAgICAgfSwgMTAwMClcclxuICAgIH1cclxuXHJcbiAgICBjb21wb25lbnRXaWxsVW5tb3VudCgpIHtcclxuICAgICAgIFxyXG4gICAgICAgY29uc3QgbWludXRlcyA9IHRoaXMuc3RhdGUubWludXRlcztcclxuICAgICAgIGNvbnN0IHNlY29uZHMgPSB0aGlzLnN0YXRlLnNlY29uZHM7XHJcbiAgICAgICBjb25zdCBlbGFwc2VkX3RpbWUgPSBtaW51dGVzKjYwK3NlY29uZHM7XHJcbiAgICAvLyAgICBjb25zb2xlLmxvZyh0aGlzLnByb3BzLnVzZXJfaWQsIGVsKTtcclxuICAgICAgIGF4aW9zLmdldCgnaHR0cHM6Ly9zb25raHlhLmNvbS93ZWJhcHAvd2ViYXBwLnBocD9hcGlfa2V5PTEyMzQ1Njcmbm9uY2U9MTIzNDUmdGltZXN0YW1wPTEyMzQ1NjcmYXBpX3R5cGU9VVBEQVRFX0VMQVBTRURUSU1FJnVzZXJfaWQ9JyArIHRoaXMucHJvcHMudXNlcl9pZCsnJmVsYXBzZWRfdGltZT0nK2VsYXBzZWRfdGltZSlcclxuICAgICAgICAudGhlbihmdW5jdGlvbiAocmVzcG9uc2UpIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2cocmVzcG9uc2UuZGF0YSwnd2hlbiBtb2RhbCBjbG9zZSwgdGltZXIgdW5tb3VudCcpXHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG59IFxyXG5cclxuZXhwb3J0IGRlZmF1bHQgVGltZXIiLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0ICcuL1F1aXpOYXYuY3NzJztcbmltcG9ydCBUaW1lciBmcm9tICcuL1RpbWVyL2luZGV4J1xuXG5jb25zdCBRdWl6TmF2ID0gKHByb3BzKSA9PiB7XG4gICAgbGV0IG5hdkNsYXNzTmFtZSA9ICdxdWl6LW5hdmlnYXRpb24tbm9ybWFsJztcbiAgICBsZXQgYnV0dG9uQ2xhc3NOYW1lO1xuICAgIGxldCBidXR0b25UZXh0O1xuICAgIGxldCBjbGlja2hhbmRsZXI7XG4gICAgLy8gbGV0IGVsYXNwZXRpbWU7XG4gICAgLy8gY29uc3QgaGFuZGxlZGF0YSA9IChkYXRhKSA9PntcbiAgICAvLyAgICAgZWxhc3BldGltZSA9IGRhdGE7XG4gICAgLy8gfVxuICAgIGlmKHByb3BzLmN1cnJlbnRWaWV3ID09PSBcInN0YXJ0XCIgKSB7XG4gICAgICAgIGJ1dHRvblRleHQgPSBcIlN0YXJ0XCI7XG4gICAgICAgIGNsaWNraGFuZGxlciA9IHByb3BzLmhhbmRsZUNsaWNrO1xuICAgIH0gZWxzZSBpZihwcm9wcy5jdXJyZW50VmlldyA9PT0gXCJmaW5pc2hcIikge1xuICAgICAgICBidXR0b25UZXh0ID0gXCJGaW5pc2hcIjtcbiAgICAgICAgY2xpY2toYW5kbGVyID0gKCkgPT4ge1xuICAgICAgICAgICAgcHJvcHMuc2VuZEFuc3dlcnMoKTtcbiAgICAgICAgICAgIHByb3BzLmNsb3NlTW9kYWwoKTtcbiAgICAgICAgfTtcbiAgICB9IGVsc2Uge1xuICAgICAgICBpZihwcm9wcy5jb3JyZWN0QW5zd2VyICE9IG51bGwpIHtcbiAgICAgICAgICAgIGJ1dHRvblRleHQgPSBcIk5leHRcIjtcbiAgICAgICAgICAgIC8vbmF2Q2xhc3NOYW1lID0gcHJvcHMuY29ycmVjdEFuc3dlciA/ICdxdWl6LW5hdmlnYXRpb24tY29ycmVjdCcgOiAncXVpei1uYXZpZ2F0aW9uLWluY29ycmVjdCc7ICBcbiAgICAgICAgICAgIGNsaWNraGFuZGxlciA9IHByb3BzLmhhbmRsZUNsaWNrO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgYnV0dG9uVGV4dCA9IFwiTmV4dFwiO1xuICAgICAgICAgICAgYnV0dG9uQ2xhc3NOYW1lID0gXCJjaGVjay1idXR0b25cIlxuICAgICAgICAgICAgaWYocHJvcHMucXVlc3Rpb25BbnN3ZXJlZCl7XG4gICAgICAgICAgICAgICAgY2xpY2toYW5kbGVyID0gcHJvcHMuaGFuZGxlQ2xpY2s7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGNsaWNraGFuZGxlciA9IHByb3BzLmhhbmRsZUNsaWNrO1xuICAgICAgICAgICAgICAgIC8vIGNsaWNraGFuZGxlciA9ICgpID0+IHtcbiAgICAgICAgICAgICAgICAvLyAgICAgY29uc29sZS5sb2coXCJ3aWdnbGUgdGhpc1wiKTtcbiAgICAgICAgICAgICAgICAvL31cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICBjb25zdCB0aGlyZEVsZW1lbnQgPSAgPGJ1dHRvbiBvbkNsaWNrPXtjbGlja2hhbmRsZXJ9IGNsYXNzTmFtZT17YnV0dG9uQ2xhc3NOYW1lfT57YnV0dG9uVGV4dH08L2J1dHRvbj5cbiAgICAvL2NvbnNvbGUubG9nKHByb3BzLmVsYXBzZWRUaW1lLCd0dHQnKVxuICAgIGNvbnN0IHNlY29uZEVsZW1lbnQgPSAoKSA9PiB7XG4gICAgICAgICBpZihwcm9wcy5jdXJyZW50VmlldyA9PT0gXCJzdGFydFwiKXtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgIH0gZWxzZSBpZiAocHJvcHMuY3VycmVudFZpZXcgPT09IFwiZmluaXNoXCIpIHtcbiAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICB9IGVsc2Uge1xuICAgICAgICAvLyAgICBpZihwcm9wcy5jb3JyZWN0QW5zd2VyICE9PSBudWxsKSB7XG4gICAgICAgIC8vICAgICAgIHJldHVybiBwcm9wcy5jb3JyZWN0QW5zd2VyID8gPGgyPllvdSBhcmUgY29ycmVjdCE8L2gyPiA6IDxoMj5JbmNvcnJlY3QgYW5zd2VyPC9oMj5cbiAgICAgICAgLy8gICAgIH0gZWxzZSB7XG4gICAgICAgIC8vICAgICAgICAgcmV0dXJuIDxidXR0b24gY2xhc3NOYW1lPVwic2tpcC1idXR0b25cIiBvbkNsaWNrPXtwcm9wcy5oYW5kbGVTa2lwfT5Ta2lwPC9idXR0b24+XG4gICAgLy8gIH1cbiAgICAgICAgLy8gcmV0dXJuIDxUaW1lciBoYW5kbGVyRnJvbVBhcmVudD17dGhpcy5oYW5kbGV9Lz5cbiAgICAgICAgcmV0dXJuIDxUaW1lciBlbGFwc2VkVGltZT17cHJvcHMuZWxhcHNlZFRpbWV9Lz5cbiAgICAgICAgXG4gICAgICAgICB9XG4gICAgfVxuXG4gICAgY29uc3QgZmlyc3RFbGVtZW50ID0gKCkgPT4ge1xuICAgICAgICBpZihwcm9wcy5jdXJyZW50VmlldyA9PT0gXCJzdGFydFwiIHx8IHByb3BzLmN1cnJlbnRWaWV3ID09PSBcImZpbmlzaFwiKXtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGlmKHByb3BzLmNvcnJlY3RBbnN3ZXIgIT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIHJldHVybiA8YnV0dG9uIG9uQ2xpY2s9e3Byb3BzLmhhbmRsZUJhY2t9PkJhY2s8L2J1dHRvbj5cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIDxidXR0b24gY2xhc3NOYW1lPVwiY2hlY2stYnV0dG9uXCIgb25DbGljaz17cHJvcHMuaGFuZGxlQmFja30+QmFjazwvYnV0dG9uPlxuXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjb25zdCBhbnN3ZXJFbGVtZW50ID0gKCkgPT4ge1xuICAgICAgICBpZiAocHJvcHMuY3VycmVudFZpZXcgPT09IFwiZmluaXNoXCIpe1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9IGVsc2UgaWYocHJvcHMuY3VycmVudFZpZXcgPT0gXCJzdGFydFwiKXtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfWVsc2UgaWYocHJvcHMuY29ycmVjdEFuc3dlciAhPT0gbnVsbCkge1xuICAgICAgICAgICAgcmV0dXJuIDxoMiBjbGFzc05hbWU9XCJzb2x1dGlvblwiPmNvcnJlY3RBbnN3ZXI6IHtwcm9wcy5jdXJyZW50cmlnaHRBbnN3ZXJ9IDwvaDI+XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4oXG4gICAgIDxkaXY+XG4gICAgICAgIHsvKiB7YW5zd2VyRWxlbWVudCgpfSAqL31cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9e2BxdWl6LW5hdmlnYXRpb24gICR7bmF2Q2xhc3NOYW1lfWB9PlxuICAgICAgICB7Zmlyc3RFbGVtZW50KCl9XG4gICAgICAgIHtzZWNvbmRFbGVtZW50KCl9XG4gICAgICAgIHt0aGlyZEVsZW1lbnR9XG4gICAgICAgIDwvZGl2PlxuICAgICA8L2Rpdj5cbiAgICBcbiAgICApO1xufVxuXG5leHBvcnQgZGVmYXVsdCBRdWl6TmF2OyIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5cbmNvbnN0IEFuc3dlciA9IChwcm9wcykgPT4ge1xuICAgIHJldHVybihcblxuICAgIDxsaT5cbiAgICAgICAgPGJ1dHRvbiBjbGFzc05hbWU9e3Byb3BzLmNsYXNzTmFtZX0+PHNwYW4+e3Byb3BzLmxldHRlcn08L3NwYW4+e3Byb3BzLmFuc3dlcn08L2J1dHRvbj5cbiAgICA8L2xpPlxuICAgICk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IEFuc3dlcjsiLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuXG5pbXBvcnQgJy4vUXVpelF1ZXN0aW9uLmNzcyc7XG5cbmltcG9ydCBBbnN3ZXIgZnJvbSAnLi9BbnN3ZXIuanMnO1xuXG5jb25zdCBRdWl6UXVlc3Rpb24gPSAocHJvcHMpID0+IHtcbiAgICAgICAgcmV0dXJuKFxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJxdWl6LWNvbnRhaW5lclwiPlxuICAgICAgICAgICAgICAgIDxoMiBjbGFzc05hbWU9XCJxdWl6LXByb2JsZW1UaXRsZVwiPjxzcGFuPiN7cHJvcHMucHJvYmxlbWlkfTwvc3Bhbj4ge3Byb3BzLnByb2JsZW10aXRsZX08L2gyPlxuICAgICAgICAgICAgICAgIDxoMyBjbGFzc05hbWU9XCJxdWl6LXByb2JsZW1EZXNjcmlwdGlvblwiPntwcm9wcy5wcm9ibGVtZGVzY3JpcHRpb259PC9oMz5cbiAgICAgICAgICAgICAgICA8dWwgY2xhc3NOYW1lPVwicXVpei1hbnN3ZXJzXCIgb25DbGljaz17cHJvcHMuaGFuZGxlQ2xpY2t9PlxuICAgICAgICAgICAgICAgICAgICB7T2JqZWN0LmtleXMocHJvcHMuYW5zd2VycykubWFwKChrZXksIGluZGV4KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgY2w7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZihwcm9wcy51c2VyQW5zd2VyICE9PSBudWxsKXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZihwcm9wcy5hbnN3ZXJDb3JyZWN0ID09PSB0cnVlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsID0gcHJvcHMudXNlckFuc3dlciA9PT0ga2V5LnRvVXBwZXJDYXNlKCkgPyBcInVzZXJBbnN3ZXJDb3JyZWN0XCIgOiBcIlwiO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZihwcm9wcy5hbnN3ZXJDb3JyZWN0ID09PSBmYWxzZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbCA9IHByb3BzLnVzZXJBbnN3ZXIgPT09IGtleS50b1VwcGVyQ2FzZSgpID8gXCJ1c2VyQW5zd2VyQ29ycmVjdFwiIDogXCJcIjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbCA9IHByb3BzLnVzZXJBbnN3ZXIgPT09IGtleS50b1VwcGVyQ2FzZSgpID8gXCJ1c2VyQW5zd2VyQ29ycmVjdFwiIDogXCJcIjtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPEFuc3dlciBcbiAgICAgICAgICAgICAgICAgICAgICAgIGtleT17aW5kZXh9XG4gICAgICAgICAgICAgICAgICAgICAgICBsZXR0ZXI9e2tleS50b1VwcGVyQ2FzZSgpfSBcbiAgICAgICAgICAgICAgICAgICAgICAgIGFuc3dlcj17cHJvcHMuYW5zd2Vyc1trZXldfSBcbiAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17Y2x9Lz5cbiAgICAgICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9KX1cbiAgICAgICAgICAgICAgICA8L3VsPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IFF1aXpRdWVzdGlvbjsiLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0ICcuL1F1aXpTdGFydC5jc3MnO1xuXG5mdW5jdGlvbiBRdWl6U3RhcnQocHJvcHMpIHtcbiAgICByZXR1cm4gKFxuICAgIDxkaXYgY2xhc3NOYW1lPVwicXVpenN0YXJ0XCI+XG4gICAgICAgIDxoMj57cHJvcHMuc3ViamVjdH08L2gyPlxuICAgICAgICA8aDM+e3Byb3BzLmRlc2NyaXB0aW9ufTwvaDM+XG4gICAgPC9kaXY+XG4gICAgKTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgUXVpelN0YXJ0OyIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5cbmltcG9ydCAnLi9SZXN1bHRBbnN3ZXIuY3NzJztcblxuY29uc3QgUmVzdWx0QW5zd2VyID0gKHByb3BzKSA9PiB7XG4gICAgaWYgKHByb3BzLmFuc3dlciA9PT0gcHJvcHMucmlnaHRBbnN3ZXIpIHtcbiAgICAgICAgcmV0dXJuKFxuICAgICAgICAgICAgPGxpPlxuICAgICAgICAgICAgPGg0Pntwcm9wcy5pbmRleCArIDF9LjwvaDQ+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImFuc3dlciBjb3JyZWN0YW5zd2VyXCI+XG4gICAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzc05hbWU9XCJ1c2VyQW5zd2VyQ29ycmVjdFwiPntwcm9wcy5hbnN3ZXJ9PC9idXR0b24+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYW5zd2VyIGNvcnJlY3RhbnN3ZXJcIj5cbiAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzc05hbWU9XCJ1c2VyQW5zd2VyQ29ycmVjdFwiPntwcm9wcy5yaWdodEFuc3dlcn08L2J1dHRvbj4gXG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYW5zd2VyIGNvcnJlY3RhbnN3ZXJcIj5cbiAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzc05hbWU9XCJ1c2VyQW5zd2VyQ29ycmVjdFwiPntwcm9wcy5zb2x1dGlvbn08L2J1dHRvbj4gXG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9saT5cbiAgICAgICAgKTtcbiAgICB9IGVsc2UgaWYocHJvcHMuYW5zd2VyID09PSBudWxsKSB7XG4gICAgICAgIHJldHVybihcbiAgICAgICAgICAgIDxsaT5cbiAgICAgICAgICAgICAgICA8aDQ+e3Byb3BzLmluZGV4ICsgMX0uPC9oND5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImFuc3dlciBpbmNvcnJlY3RhbnN3ZXJcIj5cbiAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzc05hbWU9XCJ1c2VyQW5zd2VyU2tpcHBlZFwiPlNraXBwZWQ8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImFuc3dlciBjb3JyZWN0YW5zd2VyXCI+XG4gICAgICAgICAgICAgICAgICAgIDxidXR0b24gY2xhc3NOYW1lPVwidXNlckFuc3dlckNvcnJlY3RcIj57cHJvcHMucmlnaHRBbnN3ZXJ9PC9idXR0b24+IFxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYW5zd2VyIGNvcnJlY3RhbnN3ZXJcIj5cbiAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzc05hbWU9XCJ1c2VyQW5zd2VyQ29ycmVjdFwiPntwcm9wcy5zb2x1dGlvbn08L2J1dHRvbj4gXG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvbGk+XG4gICAgICAgICk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuKFxuICAgICAgICAgICAgPGxpPlxuICAgICAgICAgICAgICAgIDxoND57cHJvcHMuaW5kZXggKyAxfS48L2g0PlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYW5zd2VyIGluY29ycmVjdGFuc3dlclwiPlxuICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzTmFtZT1cInVzZXJBbnN3ZXJJbmNvcnJlY3RcIj57cHJvcHMuYW5zd2VyfTwvYnV0dG9uPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYW5zd2VyIGNvcnJlY3RhbnN3ZXJcIj5cbiAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzc05hbWU9XCJ1c2VyQW5zd2VyQ29ycmVjdFwiPntwcm9wcy5yaWdodEFuc3dlcn08L2J1dHRvbj4gXG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhbnN3ZXIgY29ycmVjdGFuc3dlclwiPlxuICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzTmFtZT1cInVzZXJBbnN3ZXJDb3JyZWN0XCI+e3Byb3BzLnNvbHV0aW9ufTwvYnV0dG9uPiBcbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9saT5cbiAgICAgICAgKTtcbiAgICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IFJlc3VsdEFuc3dlcjsiLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuXG5pbXBvcnQgJy4vUXVpelJlc3VsdHMuY3NzJztcbmltcG9ydCBSZXN1bHRBbnN3ZXIgZnJvbSAnLi9SZXN1bHRBbnN3ZXIuanMnO1xuXG5jb25zdCBRdWl6UmVzdWx0cyA9IChwcm9wcykgPT4ge1xuICAgIGNvbnNvbGUubG9nKHByb3BzLnVzZXJBbnN3ZXJzLCdhYScpO1xuICAgIGNvbnNvbGUubG9nKHByb3BzLnNvbHV0aW9ucywnc3MnKTtcbiAgICAgICAgY29uc3QgYW5zd2Vyc0xpc3QgPSBwcm9wcy51c2VyQW5zd2Vycy5tYXAoIChhbnN3ZXIsIGluZGV4KSA9PiB7XG4gICAgICAgICAgICBjb25zdCBxdWVzdGlvbiA9IHByb3BzLnF1ZXN0aW9uc1tpbmRleF07XG4gICAgICAgICAgICBjb25zdCByaWdodEFuc3dlciA9IHByb3BzLnJpZ2h0QW5zd2Vyc1tpbmRleF07XG4gICAgICAgICAgICBjb25zdCBzb2x1dGlvbiA9IHByb3BzLnNvbHV0aW9uc1tpbmRleF07XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhzb2x1dGlvbixpbmRleClcbiAgICAgICAgICAgIHJldHVybiA8UmVzdWx0QW5zd2VyIGtleT17aW5kZXh9IGluZGV4PXtpbmRleH0gcXVlc3Rpb249e3F1ZXN0aW9ufSBhbnN3ZXI9e2Fuc3dlcn0gcmlnaHRBbnN3ZXI9e3JpZ2h0QW5zd2VyfSBzb2x1dGlvbj17c29sdXRpb259IC8+XG4gICAgICAgICAgICB9XG4gICAgICAgICk7XG5cbiAgICAgICAgcmV0dXJuKFxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJyZXN1bHRzLWNvbnRhaW5lclwiPlxuICAgICAgICAgICAgICAgIDxoMT5TdW1tYXJ5PC9oMT5cbiAgICAgICAgICAgICAgICA8dWw+XG4gICAgICAgICAgICAgICAgICAgIDxsaT5cbiAgICAgICAgICAgICAgICAgICAgPGg0IG9wYWNpdHk9JzAnPk5vLjwvaDQ+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYW5zd2VyXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzTmFtZT1cInVzZXJBbnN3ZXJTa2lwcGVkIHRhYmxlaGVhZGluZ3NcIj5Zb3VyIEFuc3dlcjwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhbnN3ZXJcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxidXR0b24gY2xhc3NOYW1lPVwidXNlckFuc3dlclNraXBwZWQgdGFibGVoZWFkaW5nc1wiPkNvcnJlY3QgQW5zd2VyPC9idXR0b24+IFxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhbnN3ZXJcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxidXR0b24gY2xhc3NOYW1lPVwidXNlckFuc3dlclNraXBwZWQgdGFibGVoZWFkaW5nc1wiPnNvbHV0aW9uPC9idXR0b24+IFxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPC9saT5cbiAgICAgICAgICAgICAgICB7YW5zd2Vyc0xpc3R9PC91bD5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApO1xufVxuXG5leHBvcnQgZGVmYXVsdCBRdWl6UmVzdWx0cztcbiIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgYXhpb3MgZnJvbSAnYXhpb3MnO1xuaW1wb3J0ICcuL0FwcC5jc3MnO1xuaW1wb3J0IFF1aXpIZWFkZXIgZnJvbSAnLi9jb21wb25lbnRzL1F1aXpIZWFkZXIvUXVpekhlYWRlci5qcyc7XG5pbXBvcnQgUXVpek5hdiBmcm9tICcuL2NvbXBvbmVudHMvUXVpek5hdi9RdWl6TmF2LmpzJztcbmltcG9ydCBRdWl6UXVlc3Rpb24gZnJvbSAnLi9jb21wb25lbnRzL01haW5WaWV3cy9RdWl6UXVlc3Rpb24vUXVpelF1ZXN0aW9uLmpzJztcbmltcG9ydCBRdWl6U3RhcnQgZnJvbSAnLi9jb21wb25lbnRzL01haW5WaWV3cy9RdWl6U3RhcnQvUXVpelN0YXJ0LmpzJztcbmltcG9ydCBRdWl6UmVzdWx0cyBmcm9tICcuL2NvbXBvbmVudHMvTWFpblZpZXdzL1F1aXpSZXN1bHRzL1F1aXpSZXN1bHRzLmpzJztcblxuY2xhc3MgQXBwIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgY29tcG9uZW50RGlkTW91bnQoKSB7XG4gICAgdGhpcy5zZXRTdGF0ZSh7dXNlcl9pZDogdGhpcy5wcm9wcy51c2VyX2lkfSk7XG4gICAgYXhpb3MuZ2V0KCdodHRwczovL3NvbmtoeWEuY29tL3dlYmFwcC93ZWJhcHAucGhwP2FwaV9rZXk9MTIzNDU2NyZub25jZT0xMjM0NSZ0aW1lc3RhbXA9MTIzNDU2NyZhcGlfdHlwZT1HRVRfVE9QSUMmdXNlcl9pZD0nICsgdGhpcy5zdGF0ZS51c2VyX2lkKVxuICAgIC50aGVuKHJlcyA9PiB7XG4gICAgICBjb25zdCByZXNwb25zZSA9IHJlcy5kYXRhO1xuICAgICAgY29uc29sZS5sb2cocmVzcG9uc2UsJ2RhdGEnKVxuICAgICAgLy8gZ2V0IGN1cnJlY3QgcXVpeiBkYXRhIGFuZCBzYXZlIGl0IHRvIGFwcCBzdGF0ZVxuICAgICAgY29uc3QgdGltZWVsYXBzZWQgPSByZXNwb25zZS50aW1lRWxhcHNlZDtcbiAgICAgIHRoaXMuc2V0U3RhdGUoe3RpbWVFbGFwc2VkOnRpbWVlbGFwc2VkfSk7XG4gICAgICAvL2NvbnNvbGUubG9nKHRoaXMuc3RhdGUudGltZUVsYXBzZWQsJ3RpZW0nKVxuICAgICAgY29uc3QgcHJvYmxlbXMgPSByZXNwb25zZS5yZXN1bHRzLm1hcChlbGVtZW50ID0+IHtcbiAgICAgICAgbGV0IHByb2JsZW0gPSB7XG4gICAgICAgICAgcHJvYmxlbUlEOiBlbGVtZW50LnByb2JsZW1faWQsXG4gICAgICAgICAgdGl0bGU6IGVsZW1lbnQucHJvYmxlbVRpdGxlLFxuICAgICAgICAgIGRlc2NyaXB0aW9uOiBlbGVtZW50LnByb2JsZW1EZXNjcmlwdGlvblxuICAgICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHByb2JsZW07XG4gICAgICAgIH0pO1xuXG4gICAgICAvLyBjb25zdCBhbnN3ZXJzID0gcmVzcG9uc2UucmVzdWx0cy5tYXAoKGVsZW1lbnQpID0+IHtcbiAgICAgIC8vICAgbGV0IGFuc3dlciA9IHtcbiAgICAgIC8vICAgICBhOiBcInByb2JsZW1DaG9pc2VBXCIsXG4gICAgICAvLyAgICAgYjogXCJwcm9ibGVtQ2hvaXNlQlwiLFxuICAgICAgLy8gICAgIGM6IFwicHJvYmxlbUNob2lzZUNcIixcbiAgICAgIC8vICAgICBkOiBcInByb2JsZW1DaG9pc2VEXCIsXG4gICAgICAvLyAgIH1cbiAgICAgIC8vICAgcmV0dXJuIGFuc3dlcjtcbiAgICAgIC8vIH0pO1xuICAgICAgY29uc3QgYW5zd2VycyA9IHJlc3BvbnNlLnJlc3VsdHMubWFwKChlbGVtZW50KSA9PiB7XG4gICAgICAgIGxldCBhbnN3ZXIgPSB7XG4gICAgICAgIGE6IGVsZW1lbnQucHJvYmxlbUNob2lzZUEsXG4gICAgICAgIGI6IGVsZW1lbnQucHJvYmxlbUNob2lzZUIsXG4gICAgICAgIGM6IGVsZW1lbnQucHJvYmxlbUNob2lzZUMsXG4gICAgICAgIGQ6IGVsZW1lbnQucHJvYmxlbUNob2lzZUQsXG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGFuc3dlcjtcbiAgICAgICAgfSk7XG4gICAgICBjb25zdCByaWdodEFuc3dlcnMgPSByZXNwb25zZS5yZXN1bHRzLm1hcChlbGVtZW50ID0+IHtcbiAgICAgICAgY29uc3QgbGV0dGVycyA9IFsnQScsJ0InLCdDJywnRCddO1xuICAgICAgICByZXR1cm4gbGV0dGVyc1twYXJzZUludChlbGVtZW50LnByb2JsZW1Db3JyZWN0Q2hvaXNlKSAtIDFdO1xuICAgICAgfSk7XG4gICAgICBsZXQgdXNlckNhbkdvTmV4dCA9IEFycmF5KHJlc3BvbnNlLnBhZ2VTaXplKS5maWxsKG51bGwpO1xuICAgICAgdXNlckNhbkdvTmV4dFswXSA9IHRydWU7XG4gICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgY2hhbGxlbmdlU3ViamVjdDogcmVzcG9uc2UucmVzdWx0c1swXS5zdWJqZWN0TmFtZSxcbiAgICAgICAgY2hhbGxlbmdlRGVzY3JpcHRpb246IHJlc3BvbnNlLnJlc3VsdHNbMF0uc3ViamVjdE5hbWUsXG4gICAgICAgIG51bWJlck9mUHJvYmxlbXM6IHJlc3BvbnNlLnBhZ2VTaXplLFxuICAgICAgICBwcm9ibGVtczogcHJvYmxlbXMsXG4gICAgICAgIGFuc3dlcnM6IGFuc3dlcnMsXG4gICAgICAgIHJpZ2h0QW5zd2VyczogcmlnaHRBbnN3ZXJzLFxuICAgICAgICB1c2VyQW5zd2VyczogQXJyYXkocmVzcG9uc2UucGFnZVNpemUpLmZpbGwobnVsbCksXG4gICAgICAgIHVzZXJBbnN3ZXJlZENvcnJlY3RseTogQXJyYXkocmVzcG9uc2UucGFnZVNpemUpLmZpbGwobnVsbCksXG4gICAgICAgIHVzZXJDYW5Hb05leHQ6IHVzZXJDYW5Hb05leHQsXG4gICAgICB9KTtcbiAgICB9KVxuICAgIC5jYXRjaCggZXJyb3IgPT4ge1xuICAgICAgLy8gaWYgdW5hYmxlIHRvIGdldCBxdWVzdGlvbnMgZnJvbSBzZXJ2ZXJcbiAgICAgIGNvbnN0IHByb2JsZW1zID0gW1xuICAgICAgICB7XG4gICAgICAgICAgcHJvYmxlbUlEOiAxLFxuICAgICAgICAgIHRpdGxlOiBcInByb2JsZW1UaXRsZVwiLFxuICAgICAgICAgIGRlc2NyaXB0aW9uOiBcInByb2JsZW1EZXNjcmlwdGlvblwiXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICBwcm9ibGVtSUQ6IDIsXG4gICAgICAgICAgdGl0bGU6IFwicHJvYmxlbVRpdGxlXCIsXG4gICAgICAgICAgZGVzY3JpcHRpb246IFwicHJvYmxlbURlc2NyaXB0aW9uXCJcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIHByb2JsZW1JRDogMyxcbiAgICAgICAgICB0aXRsZTogXCJwcm9ibGVtVGl0bGVcIixcbiAgICAgICAgICBkZXNjcmlwdGlvbjogXCJwcm9ibGVtRGVzY3JpcHRpb25cIlxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgcHJvYmxlbUlEOiA0LFxuICAgICAgICAgIHRpdGxlOiBcInByb2JsZW1UaXRsZVwiLFxuICAgICAgICAgIGRlc2NyaXB0aW9uOiBcInByb2JsZW1EZXNjcmlwdGlvblwiXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICBwcm9ibGVtSUQ6IDUsXG4gICAgICAgICAgdGl0bGU6IFwicHJvYmxlbVRpdGxlXCIsXG4gICAgICAgICAgZGVzY3JpcHRpb246IFwicHJvYmxlbURlc2NyaXB0aW9uXCJcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIHByb2JsZW1JRDogNixcbiAgICAgICAgICB0aXRsZTogXCJwcm9ibGVtVGl0bGVcIixcbiAgICAgICAgICBkZXNjcmlwdGlvbjogXCJwcm9ibGVtRGVzY3JpcHRpb25cIlxuICAgICAgICB9XTtcblxuICAgICAgY29uc3QgYW5zd2VycyA9IFtcbiAgICAgIHtcbiAgICAgICAgICBhOiBcInByb2JsZW1DaG9pc2VBXCIsXG4gICAgICAgICAgYjogXCJwcm9ibGVtQ2hvaXNlQlwiLFxuICAgICAgICAgIGM6IFwicHJvYmxlbUNob2lzZUNcIixcbiAgICAgICAgICBkOiBcInByb2JsZW1DaG9pc2VEXCIsXG4gICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgYTogXCJwcm9ibGVtQ2hvaXNlQVwiLFxuICAgICAgICAgIGI6IFwicHJvYmxlbUNob2lzZUJcIixcbiAgICAgICAgICBjOiBcInByb2JsZW1DaG9pc2VDXCIsXG4gICAgICAgICAgZDogXCJwcm9ibGVtQ2hvaXNlRFwiLFxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgYTogXCJwcm9ibGVtQ2hvaXNlQVwiLFxuICAgICAgICAgIGI6IFwicHJvYmxlbUNob2lzZUJcIixcbiAgICAgICAgICBjOiBcInByb2JsZW1DaG9pc2VDXCIsXG4gICAgICAgICAgZDogXCJwcm9ibGVtQ2hvaXNlRFwiLFxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgYTogXCJwcm9ibGVtQ2hvaXNlQVwiLFxuICAgICAgICAgIGI6IFwicHJvYmxlbUNob2lzZUJcIixcbiAgICAgICAgICBjOiBcInByb2JsZW1DaG9pc2VDXCIsXG4gICAgICAgICAgZDogXCJwcm9ibGVtQ2hvaXNlRFwiLFxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgYTogXCJwcm9ibGVtQ2hvaXNlQVwiLFxuICAgICAgICAgIGI6IFwicHJvYmxlbUNob2lzZUJcIixcbiAgICAgICAgICBjOiBcInByb2JsZW1DaG9pc2VDXCIsXG4gICAgICAgICAgZDogXCJwcm9ibGVtQ2hvaXNlRFwiLFxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgYTogXCJwcm9ibGVtQ2hvaXNlQVwiLFxuICAgICAgICAgIGI6IFwicHJvYmxlbUNob2lzZUJcIixcbiAgICAgICAgICBjOiBcInByb2JsZW1DaG9pc2VDXCIsXG4gICAgICAgICAgZDogXCJwcm9ibGVtQ2hvaXNlRFwiLFxuICAgICAgICB9XG4gICAgICBdO1xuXG4gICAgICBjb25zdCByaWdodEFuc3dlcnMgPSBbJ0EnLCdCJywnQScsJ0MnLCdEJywnRCddO1xuICAgICAgY29uc3Qgbm9PZlByb2JsZW1zID0gNlxuICAgICAgbGV0IHVzZXJDYW5Hb05leHQgPSBBcnJheShub09mUHJvYmxlbXMpLmZpbGwobnVsbCk7XG4gICAgICB1c2VyQ2FuR29OZXh0WzBdID0gdHJ1ZTtcbiAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICBjaGFsbGVuZ2VTdWJqZWN0OiBcIk1hdGhlbWF0aWNzXCIsXG4gICAgICAgIG51bWJlck9mUHJvYmxlbXM6IG5vT2ZQcm9ibGVtcyxcbiAgICAgICAgcHJvYmxlbXM6IHByb2JsZW1zLFxuICAgICAgICBhbnN3ZXJzOiBhbnN3ZXJzLFxuICAgICAgICByaWdodEFuc3dlcnM6IHJpZ2h0QW5zd2VycyxcbiAgICAgICAgdXNlckFuc3dlcnM6IEFycmF5KG5vT2ZQcm9ibGVtcykuZmlsbChudWxsKSxcbiAgICAgICAgdXNlckFuc3dlcmVkQ29ycmVjdGx5OiBBcnJheShub09mUHJvYmxlbXMpLmZpbGwobnVsbCksXG4gICAgICAgIHVzZXJDYW5Hb05leHQ6IHVzZXJDYW5Hb05leHRcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG5cbiAgY29tcG9uZW50V2lsbFVubW91bnQoKSB7XG4gICAgdGhpcy5zZW5kQW5zd2VycygpO1xuICB9XG5cbiAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICBzdXBlcihwcm9wcyk7XG4gICAgdGhpcy5zdGF0ZSA9IHsgICAgICAgIFxuICAgICAgICBjdXJyZW50UHJvYmxlbU5vOiAxLFxuICAgICAgICBjdXJyZW50VmlldzogXCJzdGFydFwiLFxuICAgICAgICB1c2VyQW5zd2VyZWRDb3JyZWN0bHk6IFtudWxsXSxcbiAgICAgICAgdXNlckFuc3dlcnM6IFtudWxsXSxcbiAgICAgICAgdXNlckNhbkdvTmV4dDogW3RydWVdLFxuICAgICAgICByaWdodEFuc3dlcnM6IFsnQycsJ0MnLCdCJywnRCcsJ0QnLCdDJywnQScsJ0InXSxcbiAgICAgICAgc29sdXRpb25zOiBbbnVsbF0sXG4gICAgICAgIHRpbWVFbGFwc2VkOjBcbiAgICB9XG4gIH1cblxuXG4gIHJlcXVpcmVBdXRoID0gKCkgPT4ge1xuICAgIGNvbnNvbGUubG9nKFwidXNlciBhdXRoZW50aWNhdGVkXCIpO1xuICB9XG5cbiAgY2FsY3VsYXRlUHJvZ3Jlc3MgPSAoe2N1cnJlbnRQcm9ibGVtTm99KSA9PiB7XG4gICAgbGV0IHByb2dyZXNzO1xuICAgIGlmKHRoaXMuc3RhdGUuY3VycmVudFZpZXcgIT09ICdzdGFydCcgJiYgIGN1cnJlbnRQcm9ibGVtTm8gIT09IDEpe1xuICAgICAgcHJvZ3Jlc3MgPSBjdXJyZW50UHJvYmxlbU5vIC0gMTtcbiAgICAgIGxldCB0ID0gdGhpcy5zdGF0ZS5udW1iZXJPZlByb2JsZW1zO1xuICAgICAgcHJvZ3Jlc3MgPSBwcm9ncmVzcyAvIHQ7XG4gICAgICBwcm9ncmVzcyAqPSAxMDA7XG4gICAgfSBlbHNlIGlmKHRoaXMuc3RhdGUuY3VycmVudFZpZXcgPT09IFwiZmluaXNoXCIpIHtcbiAgICAgIHByb2dyZXNzID0gOTk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHByb2dyZXNzID0gMDtcbiAgICB9XG4gICAgcmV0dXJuIHByb2dyZXNzO1xuICB9XG5cbiAgaW5jcmVtZW50Q2FuR29OZXh0QXJyYXkgPSAoe3VzZXJDYW5Hb05leHQsIGN1cnJlbnRQcm9ibGVtTm99KSA9PiB7XG4gICAgbGV0IGFycmF5ID0gdXNlckNhbkdvTmV4dC5zbGljZSgpO1xuICAgIGFycmF5W2N1cnJlbnRQcm9ibGVtTm9dID0gdHJ1ZTtcbiAgICBhcnJheVtjdXJyZW50UHJvYmxlbU5vICsgMV0gPSBmYWxzZTtcbiAgICB0aGlzLnNldFN0YXRlKHt1c2VyQ2FuR29OZXh0OiBhcnJheX0pO1xuICB9XG5cbiAgbmV4dFZpZXcgPSAoKSA9PiB7XG4gICAgbGV0IGN1cnJlbnRWaWV3ID0gdGhpcy5zdGF0ZS5jdXJyZW50VmlldztcbiAgICBpZihjdXJyZW50VmlldyA9PT0gXCJzdGFydFwiKXtcbiAgICAgIGN1cnJlbnRWaWV3ID0gXCJxdWVzdGlvblwiO1xuICAgICAgdGhpcy5zZXRTdGF0ZSh7IGN1cnJlbnRWaWV3OiBjdXJyZW50Vmlld30pO1xuICAgIH0gZWxzZSBpZihjdXJyZW50VmlldyA9PT0gXCJxdWVzdGlvblwiKSB7XG4gICAgICBsZXQgaSA9IHRoaXMuc3RhdGUuY3VycmVudFByb2JsZW1ObztcbiAgICAgIGxldCBtYXggPSB0aGlzLnN0YXRlLm51bWJlck9mUHJvYmxlbXM7XG4gICAgICBpZihpICE9PSBtYXgpe1xuICAgICAgICBpKys7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe2N1cnJlbnRQcm9ibGVtTm86IGl9KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGN1cnJlbnRWaWV3ID0gXCJmaW5pc2hcIjtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7IGN1cnJlbnRWaWV3OiBjdXJyZW50Vmlld30pO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHByZXZpb3VzVmlldyA9ICgpID0+IHtcbiAgICBsZXQgY3VycmVudFZpZXcgPSB0aGlzLnN0YXRlLmN1cnJlbnRWaWV3O1xuICAgIGlmKGN1cnJlbnRWaWV3ID09PSBcInJlc3VsdHNcIil7XG4gICAgICBjdXJyZW50VmlldyA9IFwicXVlc3Rpb25cIjtcbiAgICAgIHRoaXMuc2V0U3RhdGUoeyBjdXJyZW50VmlldzogY3VycmVudFZpZXd9KTtcbiAgICB9IGVsc2UgaWYoY3VycmVudFZpZXcgPT09IFwicXVlc3Rpb25cIikge1xuICAgICAgbGV0IGkgPSB0aGlzLnN0YXRlLmN1cnJlbnRQcm9ibGVtTm87XG4gICAgICBpZihpICE9PSAxKXtcbiAgICAgICAgaS0tO1xuICAgICAgICB0aGlzLnNldFN0YXRlKHtjdXJyZW50UHJvYmxlbU5vOiBpfSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvL2N1cnJlbnRWaWV3ID0gXCJzdGFydFwiO1xuICAgICAgICAvL3RoaXMuc2V0U3RhdGUoeyBjdXJyZW50VmlldzogY3VycmVudFZpZXd9KTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBzZW5kQW5zd2VycyA9ICgpID0+IHtcbiAgICBjb25zdCB1c2VyQW5zd2VycyA9IEpTT04uc3RyaW5naWZ5KHRoaXMuc3RhdGUudXNlckFuc3dlcnMpO1xuICAgIGNvbnNvbGUubG9nKHVzZXJBbnN3ZXJzKTtcbiAgICAvLyBzZW5kIHBvc3QgcmVxdWVzdCB0byBzZXJ2ZXJcbiAgfVxuXG4gIFxuICBzZW5kQW5zd2VyVG9TZXJ2ZXIgPSAoKSA9PiB7XG4gICAgY29uc3QgY3VycmVudFByb2JsZW0gPSB0aGlzLnN0YXRlLmN1cnJlbnRQcm9ibGVtTm8gLSAxO1xuICAgIGxldCB1c2VyQW5zd2VyID0gdGhpcy5zdGF0ZS51c2VyQW5zd2Vyc1tjdXJyZW50UHJvYmxlbV07XG4gICAgXG4gICAgc3dpdGNoKHVzZXJBbnN3ZXIpe1xuICAgICAgY2FzZSAnQSc6XG4gICAgICAgIHVzZXJBbnN3ZXIgPSAxO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ0InOlxuICAgICAgICB1c2VyQW5zd2VyID0gMjtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICdDJzpcbiAgICAgICAgdXNlckFuc3dlciA9IDM7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAnRCc6XG4gICAgICAgIHVzZXJBbnN3ZXIgPSA0O1xuICAgICAgY2FzZSBudWxsOlxuICAgICAgICB1c2VyQW5zd2VyID0gMDtcbiAgICAgICAgYnJlYWs7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICBjb25zb2xlLmxvZyhcIlNob3VsZCBiZSB1bnJlYWNoYWJsZSAtIGNoZWNrIHRoaXMuc3RhdGUudXNlckFuc3dlciBpZiBpdCdzIHVwcGVyY2FzZSBBQkNEXCIpO1xuICAgIH1cbiAgICBjb25zb2xlLmxvZyh1c2VyQW5zd2VyLCdhZmhhZmFzamxmbGtzYWpmbGthbCcpO1xuICAgIGNvbnN0IHF1ZXN0aW9uSUQgPSB0aGlzLnN0YXRlLnByb2JsZW1zW2N1cnJlbnRQcm9ibGVtXS5wcm9ibGVtSUQ7XG4gICAgY29uc3QgdXNlcklEID0gdGhpcy5zdGF0ZS51c2VyX2lkO1xuICAgIGNvbnN0IHNvbHV0aW9ucyA9IHRoaXMuc3RhdGUuc29sdXRpb25zO1xuICAgIGF4aW9zLmdldCgnaHR0cHM6Ly9zb25raHlhLmNvbS93ZWJhcHAvd2ViYXBwLnBocD9hcGlfa2V5PTEyMzQ1Njcmbm9uY2U9MTIzNDUmdGltZXN0YW1wPTEyMzQ1NjcmYXBpX3R5cGU9VVBEQVRFX1NPTFVUSU9OJnVzZXJfaWQ9Jyt1c2VySUQrJyZxdWVzdGlvbl9pZD0nK3F1ZXN0aW9uSUQrJyZhbnN3ZXJfY2hvaWNlPScrdXNlckFuc3dlcilcbiAgICAudGhlbihmdW5jdGlvbiAocmVzcG9uc2UpIHtcbiAgICAgIGNvbnNvbGUubG9nKHJlc3BvbnNlLmRhdGEucmVzdWx0c1tcIjBcIl0ucHJvYmxlbVNvbHV0aW9uLCdzb2x1dGlvbicpO1xuICAgICAgbGV0IHNvbHV0aW9uID0gcmVzcG9uc2UuZGF0YS5yZXN1bHRzW1wiMFwiXS5wcm9ibGVtU29sdXRpb247XG4gICAgICBjb25zb2xlLmxvZyhjdXJyZW50UHJvYmxlbSk7XG4gICAgICBpZiAoc29sdXRpb25zW2N1cnJlbnRQcm9ibGVtXT09bnVsbCl7XG4gICAgICBzb2x1dGlvbnNbY3VycmVudFByb2JsZW1dID0gc29sdXRpb247XG4gICAgICAvL2NvbnNvbGUubG9nKHNvbHV0aW9uc1tjdXJyZW50UHJvYmxlbV0pO1xuICAgICAgfVxuICAgIH0pXG4gICAgLmNhdGNoKGZ1bmN0aW9uIChlcnJvcikge1xuICAgICAgY29uc29sZS5sb2coZXJyb3IpO1xuICAgIH0pO1xuICAgIHRoaXMuc2V0U3RhdGUoe3NvbHV0aW9uczogc29sdXRpb25zfSk7XG4gICAgLy9jb25zb2xlLmxvZyh0aGlzLnN0YXRlLnNvbHV0aW9ucywnaGhoaGhoJyk7XG4gIH1cblxuICBjbG9zZU1vZGFsID0gKCkgPT4ge1xuICAgIHRoaXMucHJvcHMuY2xvc2VNb2RhbCgpO1xuICAgIGNvbnNvbGUubG9nKCdtb2RhbCBjbG9zZWQnKVxuICB9XG5cbiAgaGFuZGxlTmF2Q2xpY2sgPSAoKSA9PiB7XG4gICAgY29uc3QgYXJyYXkgPSB0aGlzLnN0YXRlLnVzZXJDYW5Hb05leHQ7XG4gICAgY29uc3QgdXNlckNhbkdvTmV4dCA9IGFycmF5W3RoaXMuc3RhdGUuY3VycmVudFByb2JsZW1ObyAtIDFdO1xuXG4gICAgaWYodGhpcy5zdGF0ZS5jdXJyZW50VmlldyAhPSBcInN0YXJ0XCIpIHtcbiAgICAgIHRoaXMuc2VuZEFuc3dlclRvU2VydmVyKCk7XG4gICAgICBjb25zb2xlLmxvZygnYWZhZnNhZmFmJyk7XG4gICAgfVxuICAgIGlmKHVzZXJDYW5Hb05leHQpe1xuICAgICAgdGhpcy5uZXh0VmlldygpO1xuICAgICAgdGhpcy5pbmNyZW1lbnRDYW5Hb05leHRBcnJheSh0aGlzLnN0YXRlKTtcbiAgICB9XG4gIH1cblxuICBoYW5kbGVRdWVzdGlvbkNsaWNrID0gKGUpID0+IHtcbiAgICAvL2lmKHRoaXMuc3RhdGUudXNlckFuc3dlcnNbdGhpcy5zdGF0ZS5jdXJyZW50UHJvYmxlbU5vIC0gMV0gPT09IG51bGwpe1xuICAgICAgbGV0IGFuc3dlciA9IGUudGFyZ2V0O1xuICAgICAgYW5zd2VyID0gYW5zd2VyLmNoaWxkTm9kZXNbMF0uaW5uZXJIVE1MOyBcbiAgICAgIGNvbnNvbGUubG9nKGFuc3dlciwnYW5zd2VyJylcbiAgICAgIGNvbnN0IGN1cnJlbnRQcm9ibGVtID0gdGhpcy5zdGF0ZS5jdXJyZW50UHJvYmxlbU5vIC0gMTtcbiAgICAgIGNvbnN0IHVzZXJBbnN3ZXJzID0gdGhpcy5zdGF0ZS51c2VyQW5zd2VycztcbiAgICAgIC8vaWYodXNlckFuc3dlcnNbY3VycmVudFByb2JsZW1dID09PSBudWxsKSB7XG4gICAgICAgIHVzZXJBbnN3ZXJzW2N1cnJlbnRQcm9ibGVtXSA9IGFuc3dlcjtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7dXNlckFuc3dlcnM6IHVzZXJBbnN3ZXJzfSk7XG4gICAgIC8vIH1cbiAgICAvL31cbiAgICAvLyBpZih0aGlzLnN0YXRlLnVzZXJBbnN3ZXJzW3RoaXMuc3RhdGUuY3VycmVudFByb2JsZW1ObyAtIDFdICE9PSBudWxsKSB7XG4gICAgLy8gICB0aGlzLnNlbmRBbnN3ZXJUb1NlcnZlcigpO1xuICAgIC8vICAgdGhpcy5pbmNyZW1lbnRDYW5Hb05leHRBcnJheSh0aGlzLnN0YXRlKTtcbiAgICAvLyAgIGNvbnN0IGN1cnJlbnRQcm9ibGVtID0gdGhpcy5zdGF0ZS5jdXJyZW50UHJvYmxlbU5vIC0gMTtcbiAgICAvLyAgIGNvbnN0IHVzZXJBbnN3ZXJzID0gdGhpcy5zdGF0ZS51c2VyQW5zd2VycztcbiAgICAvLyAgIGNvbnN0IHJpZ2h0QW5zd2VycyA9IHRoaXMuc3RhdGUucmlnaHRBbnN3ZXJzO1xuICAgIC8vICAgY29uc3QgdXNlckFuc3dlcmVkQ29ycmVjdGx5ID0gdGhpcy5zdGF0ZS51c2VyQW5zd2VyZWRDb3JyZWN0bHkuc2xpY2UoKTtcbiAgICAvLyAgIGNvbnN0IGFuc3dlciA9IHVzZXJBbnN3ZXJzW2N1cnJlbnRQcm9ibGVtXTtcbiAgICAvLyAgIGNvbnN0IHJpZ2h0QW5zd2VyID0gcmlnaHRBbnN3ZXJzW2N1cnJlbnRQcm9ibGVtXTtcbiAgICAvLyAgIGlmKGFuc3dlciA9PT0gcmlnaHRBbnN3ZXIpIHtcbiAgICAvLyAgICAgdXNlckFuc3dlcmVkQ29ycmVjdGx5W2N1cnJlbnRQcm9ibGVtXSA9IHRydWU7XG4gICAgLy8gICB9IGVsc2Uge1xuICAgIC8vICAgICB1c2VyQW5zd2VyZWRDb3JyZWN0bHlbY3VycmVudFByb2JsZW1dID0gZmFsc2U7XG4gICAgLy8gICB9XG4gICAgLy8gICB0aGlzLnNldFN0YXRlKHt1c2VyQW5zd2VyZWRDb3JyZWN0bHk6IHVzZXJBbnN3ZXJlZENvcnJlY3RseX0pO1xuICAgIC8vIH1cbiAgfVxuICBoYW5kbGVRdWVzdGlvbkNoZWNrID0gKCkgPT4ge1xuICAgIGlmKHRoaXMuc3RhdGUudXNlckFuc3dlcnNbdGhpcy5zdGF0ZS5jdXJyZW50UHJvYmxlbU5vIC0gMV0gIT09IG51bGwpIHtcbiAgICAgIHRoaXMuc2VuZEFuc3dlclRvU2VydmVyKCk7XG4gICAgICB0aGlzLmluY3JlbWVudENhbkdvTmV4dEFycmF5KHRoaXMuc3RhdGUpO1xuICAgICAgY29uc3QgY3VycmVudFByb2JsZW0gPSB0aGlzLnN0YXRlLmN1cnJlbnRQcm9ibGVtTm8gLSAxO1xuICAgICAgY29uc3QgdXNlckFuc3dlcnMgPSB0aGlzLnN0YXRlLnVzZXJBbnN3ZXJzO1xuICAgICAgY29uc3QgcmlnaHRBbnN3ZXJzID0gdGhpcy5zdGF0ZS5yaWdodEFuc3dlcnM7XG4gICAgICBjb25zdCB1c2VyQW5zd2VyZWRDb3JyZWN0bHkgPSB0aGlzLnN0YXRlLnVzZXJBbnN3ZXJlZENvcnJlY3RseS5zbGljZSgpO1xuICAgICAgY29uc3QgYW5zd2VyID0gdXNlckFuc3dlcnNbY3VycmVudFByb2JsZW1dO1xuICAgICAgY29uc3QgcmlnaHRBbnN3ZXIgPSByaWdodEFuc3dlcnNbY3VycmVudFByb2JsZW1dO1xuICAgICAgaWYoYW5zd2VyID09PSByaWdodEFuc3dlcikge1xuICAgICAgICB1c2VyQW5zd2VyZWRDb3JyZWN0bHlbY3VycmVudFByb2JsZW1dID0gdHJ1ZTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHVzZXJBbnN3ZXJlZENvcnJlY3RseVtjdXJyZW50UHJvYmxlbV0gPSBmYWxzZTtcbiAgICAgIH1cbiAgICAgIHRoaXMuc2V0U3RhdGUoe3VzZXJBbnN3ZXJlZENvcnJlY3RseTogdXNlckFuc3dlcmVkQ29ycmVjdGx5fSk7XG4gICAgfVxuICB9XG5cbiAgaGFuZGxlU2tpcCA9ICgpID0+IHtcbiAgICB0aGlzLmluY3JlbWVudENhbkdvTmV4dEFycmF5KHRoaXMuc3RhdGUpO1xuICAgIHRoaXMubmV4dFZpZXcoKTtcbiAgfVxuICBcblxuICByZW5kZXJNYWluVmlldyA9ICh7Y3VycmVudFZpZXd9KSA9PiB7XG4gICAgc3dpdGNoKGN1cnJlbnRWaWV3KSB7XG4gICAgICBjYXNlICdzdGFydCc6XG4gICAgICByZXR1cm4oXG4gICAgICAgIDxRdWl6U3RhcnQgXG4gICAgICAgIHN1YmplY3Q9e3RoaXMuc3RhdGUuY2hhbGxlbmdlU3ViamVjdH1cbiAgICAgICAgZGVzY3JpcHRpb249e3RoaXMuc3RhdGUuY2hhbGxlbmdlRGVzY3JpcHRpb259XG4gICAgICAgIC8+XG4gICAgICApO1xuICAgICAgY2FzZSAnZmluaXNoJzpcbiAgICAgIHJldHVybihcbiAgICAgICAgPFF1aXpSZXN1bHRzXG4gICAgICAgICAgICBxdWVzdGlvbnM9e3RoaXMuc3RhdGUucHJvYmxlbXN9XG4gICAgICAgICAgICB1c2VyQW5zd2Vycz17dGhpcy5zdGF0ZS51c2VyQW5zd2Vyc30gICBcbiAgICAgICAgICAgIHJpZ2h0QW5zd2Vycz17dGhpcy5zdGF0ZS5yaWdodEFuc3dlcnN9XG4gICAgICAgICAgICBzb2x1dGlvbnM9e3RoaXMuc3RhdGUuc29sdXRpb25zfVxuICAgICAgICAvPlxuICAgICAgICApO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgY29uc3QgY3VycmVudFByb2JsZW0gPSB0aGlzLnN0YXRlLnByb2JsZW1zW3RoaXMuc3RhdGUuY3VycmVudFByb2JsZW1ObyAtIDFdO1xuICAgICAgICBjb25zdCBjdXJyZW50QW5zd2VycyA9IHRoaXMuc3RhdGUuYW5zd2Vyc1t0aGlzLnN0YXRlLmN1cnJlbnRQcm9ibGVtTm8gLSAxXTtcbiAgICAgICAgY29uc3QgdXNlckFuc3dlcnMgPSB0aGlzLnN0YXRlLnVzZXJBbnN3ZXJzW3RoaXMuc3RhdGUuY3VycmVudFByb2JsZW1ObyAtIDFdO1xuICAgICAgICBjb25zdCB1c2VyQW5zd2VyZWRDb3JyZWN0bHkgPSB0aGlzLnN0YXRlLnVzZXJBbnN3ZXJlZENvcnJlY3RseS5zbGljZSgpO1xuICAgICAgICBjb25zdCBhbnN3ZXJDb3JyZWN0ID0gdXNlckFuc3dlcmVkQ29ycmVjdGx5W3RoaXMuc3RhdGUuY3VycmVudFByb2JsZW1ObyAtIDFdO1xuICAgICAgICByZXR1cm4oXG4gICAgICAgICAgPFF1aXpRdWVzdGlvblxuICAgICAgICAgIHByb2JsZW1pZD17Y3VycmVudFByb2JsZW0ucHJvYmxlbUlEfVxuICAgICAgICAgIHByb2JsZW10aXRsZT17Y3VycmVudFByb2JsZW0udGl0bGV9XG4gICAgICAgICAgcHJvYmxlbWRlc2NyaXB0aW9uPXtjdXJyZW50UHJvYmxlbS5kZXNjcmlwdGlvbn1cbiAgICAgICAgICBhbnN3ZXJzPXtjdXJyZW50QW5zd2Vyc31cbiAgICAgICAgICB1c2VyQW5zd2VyPXt1c2VyQW5zd2Vyc31cbiAgICAgICAgICBhbnN3ZXJDb3JyZWN0PXthbnN3ZXJDb3JyZWN0fVxuICAgICAgICAgIGhhbmRsZUNsaWNrPXt0aGlzLmhhbmRsZVF1ZXN0aW9uQ2xpY2t9XG4gICAgICAgICAgLz5cbiAgICAgICAgKTtcbiAgICB9XG4gIH1cblxuICByZW5kZXIoKSB7XG4gICAgcmV0dXJuIChcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJxdWl6XCI+XG4gICAgICAgICAgPFF1aXpIZWFkZXIgY2xvc2U9e3RoaXMuY2xvc2VNb2RhbH0gcHJvZ3Jlc3M9e3RoaXMuY2FsY3VsYXRlUHJvZ3Jlc3ModGhpcy5zdGF0ZSl9Lz5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm1haW52aWV3XCI+XG4gICAgICAgICAge3RoaXMucmVuZGVyTWFpblZpZXcodGhpcy5zdGF0ZSl9XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8UXVpek5hdiBcbiAgICAgICAgICAgIGhhbmRsZUNsaWNrPXt0aGlzLmhhbmRsZU5hdkNsaWNrfVxuICAgICAgICAgICAgaGFuZGxlU2tpcD17dGhpcy5oYW5kbGVTa2lwfVxuICAgICAgICAgICAgaGFuZGxlQmFjaz17dGhpcy5wcmV2aW91c1ZpZXd9XG4gICAgICAgICAgICBoYW5kbGVDaGVjaz17dGhpcy5oYW5kbGVRdWVzdGlvbkNoZWNrfVxuICAgICAgICAgICAgY3VycmVudFZpZXc9e3RoaXMuc3RhdGUuY3VycmVudFZpZXd9IFxuICAgICAgICAgICAgcXVlc3Rpb25BbnN3ZXJlZD17dGhpcy5zdGF0ZS51c2VyQW5zd2Vyc1t0aGlzLnN0YXRlLmN1cnJlbnRQcm9ibGVtTm8gLSAxXSAhPT0gbnVsbH1cbiAgICAgICAgICAgIGNvcnJlY3RBbnN3ZXI9e3RoaXMuc3RhdGUudXNlckFuc3dlcmVkQ29ycmVjdGx5W3RoaXMuc3RhdGUuY3VycmVudFByb2JsZW1ObyAtIDFdfVxuICAgICAgICAgICAgY2FuR29OZXh0PXt0aGlzLnN0YXRlLnVzZXJDYW5Hb05leHR9XG4gICAgICAgICAgICBzZW5kQW5zd2Vycz17dGhpcy5zZW5kQW5zd2Vyc31cbiAgICAgICAgICAgIGNsb3NlTW9kYWw9e3RoaXMuY2xvc2VNb2RhbH1cbiAgICAgICAgICAgIGN1cnJlbnRyaWdodEFuc3dlcj17dGhpcy5zdGF0ZS5yaWdodEFuc3dlcnNbdGhpcy5zdGF0ZS5jdXJyZW50UHJvYmxlbU5vIC0gMV19XG4gICAgICAgICAgICB1c2VyX2lkPXt0aGlzLnN0YXRlLnVzZXJfaWR9XG4gICAgICAgICAgICBlbGFwc2VkVGltZT17dGhpcy5zdGF0ZS50aW1lRWxhcHNlZH1cbiAgICAgICAgICAgIC8+XG4gICAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgQXBwO1xuXG5cbiIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUmVhY3RET00gZnJvbSAncmVhY3QtZG9tJztcbmltcG9ydCAnLi9pbmRleC5jc3MnO1xuaW1wb3J0IEFwcCBmcm9tICcuL2FwcC9BcHAuanMnO1xuXG5mdW5jdGlvbiBjbG9zZU1vZGFsKCl7XG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShcIm1hc2tcIilbMF0uY2xhc3NMaXN0LnJlbW92ZShcImFjdGl2ZVwiKTtcbiAgICBSZWFjdERPTS51bm1vdW50Q29tcG9uZW50QXROb2RlKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdyb290JykpXG4gIFxuICB9XG4gICAgICBcbiAgZnVuY3Rpb24gcnVuUmVhY3RBcHAodXNlcmlkKSB7XG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShcIm1hc2tcIilbMF0uY2xhc3NMaXN0LmFkZChcImFjdGl2ZVwiKTtcbiAgICAgICAgUmVhY3RET00ucmVuZGVyKFJlYWN0LmNyZWF0ZUVsZW1lbnQoQXBwLCB7IHVzZXJfaWQ6IHVzZXJpZCwgY2xvc2VNb2RhbDogY2xvc2VNb2RhbCB9KSwgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Jvb3QnKSk7XG4gIFxuICAgIGNvbnNvbGUubG9nKHVzZXJpZCk7XG4gICAgXG4gIH1cbiAgICAgIGxldCB0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShcInNob3dcIik7XG4gICAgICBmb3IobGV0IGkgPSAwOyBpIDwgdC5sZW5ndGg7IGkrKyl7XG4gICAgICAgIHRbaV0uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGZ1bmN0aW9uKCkge1xuICAgICAgcnVuUmVhY3RBcHAodFtpXS5pZClcbiAgfSwgZmFsc2UpO1xuICBcbiAgICAgIH1cbiAgIl0sIm5hbWVzIjpbInN0eWxlSW5qZWN0IiwiY3NzIiwicmVmIiwiaW5zZXJ0QXQiLCJkb2N1bWVudCIsImhlYWQiLCJnZXRFbGVtZW50c0J5VGFnTmFtZSIsInN0eWxlIiwiY3JlYXRlRWxlbWVudCIsInR5cGUiLCJmaXJzdENoaWxkIiwiaW5zZXJ0QmVmb3JlIiwiYXBwZW5kQ2hpbGQiLCJzdHlsZVNoZWV0IiwiY3NzVGV4dCIsImNyZWF0ZVRleHROb2RlIiwiUXVpekhlYWRlciIsInByb3BzIiwiY2xvc2UiLCJ3aWR0aCIsInByb2dyZXNzIiwiVGltZXIiLCJzdGF0ZSIsInRpbWVyU3RhcnRlZCIsInRpbWVyU3RvcHBlZCIsIm1pbnV0ZXMiLCJzZWNvbmRzIiwiY2FwdHVyZXMiLCJ0aW1lZWxhcHNlZCIsImVsYXBzZWRUaW1lIiwiTWF0aCIsImZsb29yIiwic2V0U3RhdGUiLCJjb25zb2xlIiwibG9nIiwibXlJbnRyZXZhbCIsInNldEludGVydmFsIiwicHJldlN0YXRlIiwiZWxhcHNlZF90aW1lIiwiYXhpb3MiLCJnZXQiLCJ1c2VyX2lkIiwidGhlbiIsInJlc3BvbnNlIiwiZGF0YSIsIlJlYWN0IiwiQ29tcG9uZW50IiwiUXVpek5hdiIsIm5hdkNsYXNzTmFtZSIsImJ1dHRvbkNsYXNzTmFtZSIsImJ1dHRvblRleHQiLCJjbGlja2hhbmRsZXIiLCJjdXJyZW50VmlldyIsImhhbmRsZUNsaWNrIiwic2VuZEFuc3dlcnMiLCJjbG9zZU1vZGFsIiwiY29ycmVjdEFuc3dlciIsInF1ZXN0aW9uQW5zd2VyZWQiLCJ0aGlyZEVsZW1lbnQiLCJzZWNvbmRFbGVtZW50IiwiZmlyc3RFbGVtZW50IiwiaGFuZGxlQmFjayIsIkFuc3dlciIsImNsYXNzTmFtZSIsImxldHRlciIsImFuc3dlciIsIlF1aXpRdWVzdGlvbiIsInByb2JsZW1pZCIsInByb2JsZW10aXRsZSIsInByb2JsZW1kZXNjcmlwdGlvbiIsIk9iamVjdCIsImtleXMiLCJhbnN3ZXJzIiwibWFwIiwia2V5IiwiaW5kZXgiLCJjbCIsInVzZXJBbnN3ZXIiLCJhbnN3ZXJDb3JyZWN0IiwidG9VcHBlckNhc2UiLCJRdWl6U3RhcnQiLCJzdWJqZWN0IiwiZGVzY3JpcHRpb24iLCJSZXN1bHRBbnN3ZXIiLCJyaWdodEFuc3dlciIsInNvbHV0aW9uIiwiUXVpelJlc3VsdHMiLCJ1c2VyQW5zd2VycyIsInNvbHV0aW9ucyIsImFuc3dlcnNMaXN0IiwicXVlc3Rpb24iLCJxdWVzdGlvbnMiLCJyaWdodEFuc3dlcnMiLCJBcHAiLCJyZXMiLCJ0aW1lRWxhcHNlZCIsInByb2JsZW1zIiwicmVzdWx0cyIsImVsZW1lbnQiLCJwcm9ibGVtIiwicHJvYmxlbUlEIiwicHJvYmxlbV9pZCIsInRpdGxlIiwicHJvYmxlbVRpdGxlIiwicHJvYmxlbURlc2NyaXB0aW9uIiwiYSIsInByb2JsZW1DaG9pc2VBIiwiYiIsInByb2JsZW1DaG9pc2VCIiwiYyIsInByb2JsZW1DaG9pc2VDIiwiZCIsInByb2JsZW1DaG9pc2VEIiwibGV0dGVycyIsInBhcnNlSW50IiwicHJvYmxlbUNvcnJlY3RDaG9pc2UiLCJ1c2VyQ2FuR29OZXh0IiwiQXJyYXkiLCJwYWdlU2l6ZSIsImZpbGwiLCJjaGFsbGVuZ2VTdWJqZWN0Iiwic3ViamVjdE5hbWUiLCJjaGFsbGVuZ2VEZXNjcmlwdGlvbiIsIm51bWJlck9mUHJvYmxlbXMiLCJ1c2VyQW5zd2VyZWRDb3JyZWN0bHkiLCJjYXRjaCIsImVycm9yIiwibm9PZlByb2JsZW1zIiwiY3VycmVudFByb2JsZW1ObyIsInQiLCJhcnJheSIsInNsaWNlIiwiaSIsIm1heCIsIkpTT04iLCJzdHJpbmdpZnkiLCJjdXJyZW50UHJvYmxlbSIsInF1ZXN0aW9uSUQiLCJ1c2VySUQiLCJwcm9ibGVtU29sdXRpb24iLCJzZW5kQW5zd2VyVG9TZXJ2ZXIiLCJuZXh0VmlldyIsImluY3JlbWVudENhbkdvTmV4dEFycmF5IiwiZSIsInRhcmdldCIsImNoaWxkTm9kZXMiLCJpbm5lckhUTUwiLCJjdXJyZW50QW5zd2VycyIsImhhbmRsZVF1ZXN0aW9uQ2xpY2siLCJjYWxjdWxhdGVQcm9ncmVzcyIsInJlbmRlck1haW5WaWV3IiwiaGFuZGxlTmF2Q2xpY2siLCJoYW5kbGVTa2lwIiwicHJldmlvdXNWaWV3IiwiaGFuZGxlUXVlc3Rpb25DaGVjayIsImdldEVsZW1lbnRzQnlDbGFzc05hbWUiLCJjbGFzc0xpc3QiLCJyZW1vdmUiLCJSZWFjdERPTSIsInVubW91bnRDb21wb25lbnRBdE5vZGUiLCJnZXRFbGVtZW50QnlJZCIsInJ1blJlYWN0QXBwIiwidXNlcmlkIiwiYWRkIiwicmVuZGVyIiwiYWRkRXZlbnRMaXN0ZW5lciIsImlkIiwibGVuZ3RoIl0sIm1hcHBpbmdzIjoiOzs7Ozs7O0VBQUEsU0FBU0EsV0FBVCxDQUFxQkMsR0FBckIsRUFBMEJDLEdBQTFCLEVBQStCO0VBQzdCLE1BQUtBLEdBQUcsS0FBSyxLQUFLLENBQWxCLEVBQXNCQSxHQUFHLEdBQUcsRUFBTjtFQUN0QixNQUFJQyxRQUFRLEdBQUdELEdBQUcsQ0FBQ0MsUUFBbkI7O0VBRUEsTUFBSSxDQUFDRixHQUFELElBQVEsT0FBT0csUUFBUCxLQUFvQixXQUFoQyxFQUE2QztFQUFFO0VBQVM7O0VBRXhELE1BQUlDLElBQUksR0FBR0QsUUFBUSxDQUFDQyxJQUFULElBQWlCRCxRQUFRLENBQUNFLG9CQUFULENBQThCLE1BQTlCLEVBQXNDLENBQXRDLENBQTVCO0VBQ0EsTUFBSUMsS0FBSyxHQUFHSCxRQUFRLENBQUNJLGFBQVQsQ0FBdUIsT0FBdkIsQ0FBWjtFQUNBRCxFQUFBQSxLQUFLLENBQUNFLElBQU4sR0FBYSxVQUFiOztFQUVBLE1BQUlOLFFBQVEsS0FBSyxLQUFqQixFQUF3QjtFQUN0QixRQUFJRSxJQUFJLENBQUNLLFVBQVQsRUFBcUI7RUFDbkJMLE1BQUFBLElBQUksQ0FBQ00sWUFBTCxDQUFrQkosS0FBbEIsRUFBeUJGLElBQUksQ0FBQ0ssVUFBOUI7RUFDRCxLQUZELE1BRU87RUFDTEwsTUFBQUEsSUFBSSxDQUFD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
