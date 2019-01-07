(function (React,axios,ReactDOM) {
  'use strict';

  React = React && React.hasOwnProperty('default') ? React['default'] : React;
  axios = axios && axios.hasOwnProperty('default') ? axios['default'] : axios;
  ReactDOM = ReactDOM && ReactDOM.hasOwnProperty('default') ? ReactDOM['default'] : ReactDOM;

  function styleInject(css, ref) {
    if ( ref === void 0 ) ref = {};
    var insertAt = ref.insertAt;

    if (!css || typeof document === 'undefined') { return; }

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

  var css = ".show {\n    width: 150px;\n    height: 40px;\n    margin: 100px 50px;\n    background: #e74c3c;\n    color: #fff;\n    border-radius: 5px;\n    border: 0;\n    border-bottom: 2px solid #c0392b;\n    cursor: pointer;\n  }\n  \n  .show:hover {\n    background: #c0392b;\n  }\n  \n  .show:active {\n    transform: scale(0.9);\n  }\n  \n  .close {\n    position: absolute;\n    top: 0;\n    right: 0;\n    width: 35px;\n    height: 30px;\n    background: #000;\n    color: #fff;\n    cursor: pointer;\n    border: 0;\n  }\n  \n  .mask {\n    position: fixed;\n    top: 0;\n    left: 0;\n    width: 100%;\n    height: 100%;\n    background: rgba(52, 73, 94, 0.8);\n    z-index: 50;\n    visibility: hidden;\n    opacity: 0;\n    transition: 0.7s;\n  }\n  \n  .modal {\n    position: absolute;\n    width: 100%;\n    height: 90%;\n    top: 20px;\n    left: 0;\n    background: #bdc3c7;\n    z-index: 100;\n    visibility: hidden;\n    opacity: 0;\n    transition: 0.5s ease-out;\n    transform: translateY(45px);\n  }\n  .active {\n    visibility: visible;\n    opacity: 1;\n  }\n  \n  .active + .modal {\n    visibility: visible;\n    opacity: 1;\n    transform: translateY(0);\n  }";
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

  var css$3 = ".quiz-navigation{\n    width: 100%;\n    display: flex;\n    flex-direction: row;\n    justify-content: space-around;\n    padding-top: 20px;\n    padding-bottom: 30px;\n}\n.quiz-navigation h2 {\n  transition: transform 4s ease;\n}\n.quiz-navigation-normal {\n  background-color: #b9b9b970;\n}\n.quiz-navigation-normal button {\n  background-color: #35c509;\n}\n.quiz-navigation-correct {\n  background-color: #8cda79b6;\n}\n.quiz-navigation-correct button {\n  background-color: #4aaa35;\n  color: #fff;\n  cursor: pointer;\n}\n.quiz-navigation-correct h2 {\n  color: #4aaa35;\n}\n.quiz-navigation-correct .skip-button,\n.quiz-navigation-incorrect .skip-button,\n.quiz-navigation-normal .skip-button {\n  \n}\n\n.quiz-navigation-incorrect {\n  background-color: #da7979b6;\n  cursor: pointer;\n}\n.quiz-navigation-incorrect button {\n  background-color: #c72828;\n  color: #fff;\n}\n.quiz-navigation-incorrect h2 {\n  color: #c72828;\n}\n\n.quiz-navigation button {\n  width: 100px;\n  height: 60px;\n  font-size: 1.3em;\n  display: inline-block;\n  border: none;\n  cursor: pointer;\n  text-decoration: none;\n  -moz-border-radius: 25px;\n  -webkit-border-radius: 25px;\n  border-radius: 40px;\n  transition: all 0.5s ease-in-out;\n  -webkit-appearance: none;\n  -moz-appearance: none;\n\n  \n}\n.quiz-navigation button:focus {\n  outline: 0px;\n}\n.quiz-navigation button:active {\n  transform: scale(0.99);\n}\n.skip-button {\n  background-color: #00000000 !important;\n  border: 1px solid #6d6d6d !important;\n}\n.check-button {\n  background-color: #00000000 !important;\n  border: 1px solid #4aaa35 !important;\n  color: #4aaa35;\n}\n\n.start-button {\n  width: 70%;\n}";
  styleInject(css$3);

  var QuizNav = function QuizNav(props) {
    var navClassName = 'quiz-navigation-normal';
    var buttonClassName;
    var buttonText;
    var clickhandler;

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
        buttonText = "Next";
        navClassName = props.correctAnswer ? 'quiz-navigation-correct' : 'quiz-navigation-incorrect';
        clickhandler = props.handleClick;
      } else {
        buttonText = "Check";
        buttonClassName = "check-button";

        if (props.questionAnswered) {
          clickhandler = props.handleCheck;
        } else {
          clickhandler = function clickhandler() {
            console.log("wiggle this");
          };
        }
      }
    }

    var thirdElement = React.createElement("button", {
      onClick: clickhandler,
      className: buttonClassName
    }, buttonText);

    var secondElement = function secondElement() {
      if (props.currentView === "start") {
        return;
      } else if (props.currentView === "finish") {
        return;
      } else {
        if (props.correctAnswer !== null) {
          return props.correctAnswer ? React.createElement("h2", null, "You are correct!") : React.createElement("h2", null, "Incorrect answer");
        } else {
          return React.createElement("button", {
            className: "skip-button",
            onClick: props.handleSkip
          }, "Skip");
        }
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

    return React.createElement("div", {
      className: "quiz-navigation  ".concat(navClassName)
    }, firstElement(), secondElement(), thirdElement);
  };

  var css$4 = ".quiz-problemTitle > span {\n    font-size: 0.8em;\n    color: #aaa;\n  }\n  .quiz-answers {\n    display: block;\n    max-width: 200px;\n    margin: 0 auto;\n    list-style-position: inside;\n    list-style-type: none; \n  }\n  .quiz-answers button {\n      display: inline-block;\n      border: none;\n      padding: 1rem 2rem;\n      min-width: 200px;\n      margin: 1px;\n      text-decoration: none;\n      background-color: #fafafa;\n      color: #000;\n      font-family: sans-serif;\n      font-size: 1rem;\n      cursor: pointer;\n      text-align: center;\n      transition: background 100ms ease-in-out, \n                  transform 50ms ease;\n      -webkit-appearance: none;\n      -moz-appearance: none;\n  }\n  .quiz-answers {\n    position: relative;\n  }\n  .quiz-answers button span {\n    color: #e0e0e0;\n    position: absolute;\n    left: 0;\n  }\n  .quiz-answers button:hover,\n  .quiz-answers button:focus,\n  .userAnswer {\n      border: 1px solid #2e2e2eaa;\n  }\n  .userAnswerCorrect {\n    border: 2px solid #4aaa35 !important;\n  }\n  .userAnswerCorrect:after {\n    position: absolute;\n    left: 250px;\n    font-family: \"Font Awesome 5 Free\";\n    font-weight: 900;\n    content: \"\\f00c\";\n    color: #4aaa35;\n  }\n  .userAnswerIncorrect {\n    border: 2px solid #c72828 !important;\n  }\n  .userAnswerIncorrect:after {\n    position: absolute;\n    left: 250px;\n    font-family: \"Font Awesome 5 Free\";\n    font-weight: 900;\n    content: \"\\f00d\";\n    color: #c72828;\n  }\n  .quiz-answers button:focus {\n      outline: 0px;\n      outline-offset: -4px;\n  }\n  .quiz-answers button:active,\n  .chosen-answer {\n      background-color: #e3e3e3b0;\n  }";
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
          cl = props.userAnswer === key.toUpperCase() ? "userAnswerIncorrect" : "";
        } else {
          cl = props.userAnswer === key.toUpperCase() ? "userAnswer" : "";
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

  var css$6 = "..results-container {\n    overflow-x: hidden;\n}\n.results-container li {\n    list-style: none;\n    display: flex;\n    flex-direction: row;\n    justify-content: space-around;\n    width: 100%;\n    margin: 10px 0;\n}\n.results-container ul {\n    display: block;\n    \n    margin: 0 auto;\n    padding: 0;\n}\n.results-container {\n    display: block;\n    margin: 0 auto;\n    list-style-position: inside;\n    list-style-type: none; \n    text-align: center;\n}\n.results-container button {\n    display: inline-block;\n    border: none;\n    padding: 1rem 2rem;\n    margin: 1px;\n    text-decoration: none;\n    background-color: #fafafa;\n    color: #000;\n    font-family: sans-serif;\n    font-size: 1rem;\n    cursor: pointer;\n    text-align: center;\n    transition: background 100ms ease-in-out, \n                transform 50ms ease;\n    -webkit-appearance: none;\n    -moz-appearance: none;\n}\n.youranswer, .answer {\n    margin-right: 20px;\n    display: flex;\n    flex-direction: row;\n    justify-content: space-evenly;\n}\n.tableheadings {\n    font-weight: 600;\n}";
  styleInject(css$6);

  var css$7 = ".answer .userAnswerCorrect:after,\n.answer .userAnswerIncorrect:after {\n    content: none;\n}\n\n.answer .userAnswerCorrect,\n.answer .userAnswerIncorrect,\n.answer .userAnswerSkipped,\n.tableheadings {\n    min-width: 200px;\n}\n.userAnswerSkipped {\n    border: none;\n\n  }\nli > h4 {\n    min-width: 23px;\n}\n";
  styleInject(css$7);

  var ResultAnswer = function ResultAnswer(props) {
    if (props.answer === props.rightAnswer) {
      return React.createElement("li", null, React.createElement("h4", null, props.index + 1, "."), React.createElement("div", {
        className: "answer correctanswer"
      }, React.createElement("button", {
        className: "userAnswerCorrect"
      }, props.answer)));
    } else if (props.answer === null) {
      return React.createElement("li", null, React.createElement("h4", null, props.index + 1, "."), React.createElement("div", {
        className: "answer incorrectanswer"
      }, React.createElement("button", {
        className: "userAnswerSkipped"
      }, "Skipped")), React.createElement("div", {
        className: "answer correctanswer"
      }, React.createElement("button", {
        className: "userAnswerCorrect"
      }, props.rightAnswer)));
    } else {
      return React.createElement("li", null, React.createElement("h4", null, props.index + 1, "."), React.createElement("div", {
        className: "answer incorrectanswer"
      }, React.createElement("button", {
        className: "userAnswerIncorrect"
      }, props.answer)), React.createElement("div", {
        className: "answer correctanswer"
      }, React.createElement("button", {
        className: "userAnswerCorrect"
      }, props.rightAnswer)));
    }
  };

  var QuizResults = function QuizResults(props) {
    var answersList = props.userAnswers.map(function (answer, index) {
      var question = props.questions[index];
      var rightAnswer = props.rightAnswers[index];
      return React.createElement(ResultAnswer, {
        key: index,
        index: index,
        question: question,
        answer: answer,
        rightAnswer: rightAnswer
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
    }, "Correct Answer"))), answersList));
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
          var response = res.data; // get currect quiz data and save it to app state

          var problems = response.results.map(function (element) {
            var problem = {
              problemID: element.problem_id,
              title: element.problemTitle,
              description: element.problemDescription
            };
            return problem;
          });
          var answers = response.results.map(function (element) {
            var answer = {
              a: "problemChoiseA",
              b: "problemChoiseB",
              c: "problemChoiseC",
              d: "problemChoiseD"
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
          } else {
            currentView = "start";

            _this.setState({
              currentView: currentView
            });
          }
        }
      });

      _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "sendAnswers", function () {
        var userAnswers = JSON.stringify(_this.state.userAnswers);
        console.log(userAnswers); // send post request to server
      });

      _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "sendAnswerToServer", function () {
        console.log('sending answer to server');
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
            break;

          default:
            console.log("Should be unreachable - check this.state.userAnswer if it's uppercase ABCD");
        }

        var questionID = _this.state.problems[currentProblem].problemID;
        var userID = _this.state.user_id;
        axios.get('https://sonkhya.com/webapp/webapp.php?api_key=1234567&nonce=12345&timestamp=1234567&api_type=UPDATE_SOLUTION&user_id=' + userID + '&question_id=' + questionID + '&answer_choice=' + userAnswer).then(function (response) {
          console.log(response);
        }).catch(function (error) {
          console.log(error);
        });
      });

      _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "closeModal", function () {
        _this.props.closeModal();
      });

      _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "handleNavClick", function () {
        var array = _this.state.userCanGoNext;
        var userCanGoNext = array[_this.state.currentProblemNo - 1];

        if (userCanGoNext) {
          _this.nextView();

          _this.incrementCanGoNextArray(_this.state);
        }
      });

      _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "handleQuestionClick", function (e) {
        if (_this.state.userAnswers[_this.state.currentProblemNo - 1] === null) {
          var answer = e.target;
          answer = answer.childNodes[0].innerHTML;
          var currentProblem = _this.state.currentProblemNo - 1;
          var userAnswers = _this.state.userAnswers;

          if (userAnswers[currentProblem] === null) {
            userAnswers[currentProblem] = answer;

            _this.setState({
              userAnswers: userAnswers
            });
          }
        }
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
              rightAnswers: _this.state.rightAnswers
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
        userCanGoNext: [true]
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
          closeModal: this.closeModal
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVuZGxlLmpzIiwic291cmNlcyI6WyIuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtaW5qZWN0L2Rpc3Qvc3R5bGUtaW5qZWN0LmVzLmpzIiwiLi4vLi4vc3JjL2FwcC9jb21wb25lbnRzL1F1aXpIZWFkZXIvUXVpekhlYWRlci5qcyIsIi4uLy4uL3NyYy9hcHAvY29tcG9uZW50cy9RdWl6TmF2L1F1aXpOYXYuanMiLCIuLi8uLi9zcmMvYXBwL2NvbXBvbmVudHMvTWFpblZpZXdzL1F1aXpRdWVzdGlvbi9BbnN3ZXIuanMiLCIuLi8uLi9zcmMvYXBwL2NvbXBvbmVudHMvTWFpblZpZXdzL1F1aXpRdWVzdGlvbi9RdWl6UXVlc3Rpb24uanMiLCIuLi8uLi9zcmMvYXBwL2NvbXBvbmVudHMvTWFpblZpZXdzL1F1aXpTdGFydC9RdWl6U3RhcnQuanMiLCIuLi8uLi9zcmMvYXBwL2NvbXBvbmVudHMvTWFpblZpZXdzL1F1aXpSZXN1bHRzL1Jlc3VsdEFuc3dlci5qcyIsIi4uLy4uL3NyYy9hcHAvY29tcG9uZW50cy9NYWluVmlld3MvUXVpelJlc3VsdHMvUXVpelJlc3VsdHMuanMiLCIuLi8uLi9zcmMvYXBwL0FwcC5qcyIsIi4uLy4uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJmdW5jdGlvbiBzdHlsZUluamVjdChjc3MsIHJlZikge1xuICBpZiAoIHJlZiA9PT0gdm9pZCAwICkgcmVmID0ge307XG4gIHZhciBpbnNlcnRBdCA9IHJlZi5pbnNlcnRBdDtcblxuICBpZiAoIWNzcyB8fCB0eXBlb2YgZG9jdW1lbnQgPT09ICd1bmRlZmluZWQnKSB7IHJldHVybjsgfVxuXG4gIHZhciBoZWFkID0gZG9jdW1lbnQuaGVhZCB8fCBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZSgnaGVhZCcpWzBdO1xuICB2YXIgc3R5bGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzdHlsZScpO1xuICBzdHlsZS50eXBlID0gJ3RleHQvY3NzJztcblxuICBpZiAoaW5zZXJ0QXQgPT09ICd0b3AnKSB7XG4gICAgaWYgKGhlYWQuZmlyc3RDaGlsZCkge1xuICAgICAgaGVhZC5pbnNlcnRCZWZvcmUoc3R5bGUsIGhlYWQuZmlyc3RDaGlsZCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGhlYWQuYXBwZW5kQ2hpbGQoc3R5bGUpO1xuICAgIH1cbiAgfSBlbHNlIHtcbiAgICBoZWFkLmFwcGVuZENoaWxkKHN0eWxlKTtcbiAgfVxuXG4gIGlmIChzdHlsZS5zdHlsZVNoZWV0KSB7XG4gICAgc3R5bGUuc3R5bGVTaGVldC5jc3NUZXh0ID0gY3NzO1xuICB9IGVsc2Uge1xuICAgIHN0eWxlLmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKGNzcykpO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IHN0eWxlSW5qZWN0O1xuIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCAnLi9RdWl6SGVhZGVyLmNzcyc7XG5jb25zdCBRdWl6SGVhZGVyID0gKHByb3BzKSA9PiB7XG4gICAgcmV0dXJuKFxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInF1aXotaGVhZGVyXCI+XG4gICAgICAgICAgICA8YnV0dG9uIG9uQ2xpY2s9e3Byb3BzLmNsb3NlfT48aSBjbGFzc05hbWU9XCJmYXMgZmEtdGltZXMtY2lyY2xlIGV4aXRcIj48L2k+PC9idXR0b24+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInByb2dyZXNzLXdyYXBwZXJcIj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInByb2dyZXNzYmFyXCIgc3R5bGU9e3t3aWR0aDogcHJvcHMucHJvZ3Jlc3MgKyAnJSd9fT48L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICApO1xufVxuXG5leHBvcnQgZGVmYXVsdCBRdWl6SGVhZGVyOyIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgJy4vUXVpek5hdi5jc3MnO1xuXG5jb25zdCBRdWl6TmF2ID0gKHByb3BzKSA9PiB7XG4gICAgbGV0IG5hdkNsYXNzTmFtZSA9ICdxdWl6LW5hdmlnYXRpb24tbm9ybWFsJztcbiAgICBcbiAgICAgICAgbGV0IGJ1dHRvbkNsYXNzTmFtZTtcbiAgICAgICAgbGV0IGJ1dHRvblRleHQ7XG4gICAgICAgIGxldCBjbGlja2hhbmRsZXI7XG4gICAgICAgIGlmKHByb3BzLmN1cnJlbnRWaWV3ID09PSBcInN0YXJ0XCIgKSB7XG4gICAgICAgICAgICBidXR0b25UZXh0ID0gXCJTdGFydFwiO1xuICAgICAgICAgICAgY2xpY2toYW5kbGVyID0gcHJvcHMuaGFuZGxlQ2xpY2s7XG4gICAgICAgIH0gZWxzZSBpZihwcm9wcy5jdXJyZW50VmlldyA9PT0gXCJmaW5pc2hcIikge1xuICAgICAgICAgICAgYnV0dG9uVGV4dCA9IFwiRmluaXNoXCI7XG4gICAgICAgICAgICBjbGlja2hhbmRsZXIgPSAoKSA9PiB7XG4gICAgICAgICAgICAgICAgcHJvcHMuc2VuZEFuc3dlcnMoKTtcbiAgICAgICAgICAgICAgICBwcm9wcy5jbG9zZU1vZGFsKCk7XG4gICAgICAgICAgICB9O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaWYocHJvcHMuY29ycmVjdEFuc3dlciAhPSBudWxsKSB7XG4gICAgICAgICAgICAgICAgYnV0dG9uVGV4dCA9IFwiTmV4dFwiO1xuICAgICAgICAgICAgICAgIG5hdkNsYXNzTmFtZSA9IHByb3BzLmNvcnJlY3RBbnN3ZXIgPyAncXVpei1uYXZpZ2F0aW9uLWNvcnJlY3QnIDogJ3F1aXotbmF2aWdhdGlvbi1pbmNvcnJlY3QnOyAgXG4gICAgICAgICAgICAgICAgY2xpY2toYW5kbGVyID0gcHJvcHMuaGFuZGxlQ2xpY2s7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGJ1dHRvblRleHQgPSBcIkNoZWNrXCI7XG4gICAgICAgICAgICAgICAgYnV0dG9uQ2xhc3NOYW1lID0gXCJjaGVjay1idXR0b25cIlxuICAgICAgICAgICAgICAgIGlmKHByb3BzLnF1ZXN0aW9uQW5zd2VyZWQpe1xuICAgICAgICAgICAgICAgICAgICBjbGlja2hhbmRsZXIgPSBwcm9wcy5oYW5kbGVDaGVjaztcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBjbGlja2hhbmRsZXIgPSAoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIndpZ2dsZSB0aGlzXCIpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHRoaXJkRWxlbWVudCA9ICA8YnV0dG9uIG9uQ2xpY2s9e2NsaWNraGFuZGxlcn0gY2xhc3NOYW1lPXtidXR0b25DbGFzc05hbWV9PntidXR0b25UZXh0fTwvYnV0dG9uPlxuXG4gICAgY29uc3Qgc2Vjb25kRWxlbWVudCA9ICgpID0+IHtcbiAgICAgICAgaWYocHJvcHMuY3VycmVudFZpZXcgPT09IFwic3RhcnRcIil7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH0gZWxzZSBpZiAocHJvcHMuY3VycmVudFZpZXcgPT09IFwiZmluaXNoXCIpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGlmKHByb3BzLmNvcnJlY3RBbnN3ZXIgIT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gcHJvcHMuY29ycmVjdEFuc3dlciA/IDxoMj5Zb3UgYXJlIGNvcnJlY3QhPC9oMj4gOiA8aDI+SW5jb3JyZWN0IGFuc3dlcjwvaDI+XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHJldHVybiA8YnV0dG9uIGNsYXNzTmFtZT1cInNraXAtYnV0dG9uXCIgb25DbGljaz17cHJvcHMuaGFuZGxlU2tpcH0+U2tpcDwvYnV0dG9uPlxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgY29uc3QgZmlyc3RFbGVtZW50ID0gKCkgPT4ge1xuICAgICAgICBpZihwcm9wcy5jdXJyZW50VmlldyA9PT0gXCJzdGFydFwiIHx8IHByb3BzLmN1cnJlbnRWaWV3ID09PSBcImZpbmlzaFwiKXtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGlmKHByb3BzLmNvcnJlY3RBbnN3ZXIgIT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIHJldHVybiA8YnV0dG9uIG9uQ2xpY2s9e3Byb3BzLmhhbmRsZUJhY2t9PkJhY2s8L2J1dHRvbj5cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIDxidXR0b24gY2xhc3NOYW1lPVwiY2hlY2stYnV0dG9uXCIgb25DbGljaz17cHJvcHMuaGFuZGxlQmFja30+QmFjazwvYnV0dG9uPlxuXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4oXG4gICAgPGRpdiBjbGFzc05hbWU9e2BxdWl6LW5hdmlnYXRpb24gICR7bmF2Q2xhc3NOYW1lfWB9PlxuICAgIHtmaXJzdEVsZW1lbnQoKX1cbiAgICB7c2Vjb25kRWxlbWVudCgpfVxuICAgIHt0aGlyZEVsZW1lbnR9XG4gICAgPC9kaXY+XG4gICAgKTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgUXVpek5hdjsiLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuXG5jb25zdCBBbnN3ZXIgPSAocHJvcHMpID0+IHtcbiAgICByZXR1cm4oXG5cbiAgICA8bGk+XG4gICAgICAgIDxidXR0b24gY2xhc3NOYW1lPXtwcm9wcy5jbGFzc05hbWV9PjxzcGFuPntwcm9wcy5sZXR0ZXJ9PC9zcGFuPntwcm9wcy5hbnN3ZXJ9PC9idXR0b24+XG4gICAgPC9saT5cbiAgICApO1xufVxuXG5leHBvcnQgZGVmYXVsdCBBbnN3ZXI7IiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcblxuaW1wb3J0ICcuL1F1aXpRdWVzdGlvbi5jc3MnO1xuXG5pbXBvcnQgQW5zd2VyIGZyb20gJy4vQW5zd2VyLmpzJztcblxuY29uc3QgUXVpelF1ZXN0aW9uID0gKHByb3BzKSA9PiB7XG4gICAgICAgIHJldHVybihcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicXVpei1jb250YWluZXJcIj5cbiAgICAgICAgICAgICAgICA8aDIgY2xhc3NOYW1lPVwicXVpei1wcm9ibGVtVGl0bGVcIj48c3Bhbj4je3Byb3BzLnByb2JsZW1pZH08L3NwYW4+IHtwcm9wcy5wcm9ibGVtdGl0bGV9PC9oMj5cbiAgICAgICAgICAgICAgICA8aDMgY2xhc3NOYW1lPVwicXVpei1wcm9ibGVtRGVzY3JpcHRpb25cIj57cHJvcHMucHJvYmxlbWRlc2NyaXB0aW9ufTwvaDM+XG4gICAgICAgICAgICAgICAgPHVsIGNsYXNzTmFtZT1cInF1aXotYW5zd2Vyc1wiIG9uQ2xpY2s9e3Byb3BzLmhhbmRsZUNsaWNrfT5cbiAgICAgICAgICAgICAgICAgICAge09iamVjdC5rZXlzKHByb3BzLmFuc3dlcnMpLm1hcCgoa2V5LCBpbmRleCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGNsO1xuICAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgICAgICBpZihwcm9wcy51c2VyQW5zd2VyICE9PSBudWxsKXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZihwcm9wcy5hbnN3ZXJDb3JyZWN0ID09PSB0cnVlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsID0gcHJvcHMudXNlckFuc3dlciA9PT0ga2V5LnRvVXBwZXJDYXNlKCkgPyBcInVzZXJBbnN3ZXJDb3JyZWN0XCIgOiBcIlwiO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZihwcm9wcy5hbnN3ZXJDb3JyZWN0ID09PSBmYWxzZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbCA9IHByb3BzLnVzZXJBbnN3ZXIgPT09IGtleS50b1VwcGVyQ2FzZSgpID8gXCJ1c2VyQW5zd2VySW5jb3JyZWN0XCIgOiBcIlwiO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsID0gcHJvcHMudXNlckFuc3dlciA9PT0ga2V5LnRvVXBwZXJDYXNlKCkgPyBcInVzZXJBbnN3ZXJcIiA6IFwiXCI7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxBbnN3ZXIgXG4gICAgICAgICAgICAgICAgICAgICAgICBrZXk9e2luZGV4fVxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0dGVyPXtrZXkudG9VcHBlckNhc2UoKX0gXG4gICAgICAgICAgICAgICAgICAgICAgICBhbnN3ZXI9e3Byb3BzLmFuc3dlcnNba2V5XX0gXG4gICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2NsfS8+XG4gICAgICAgICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSl9XG4gICAgICAgICAgICAgICAgPC91bD5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApO1xufVxuXG5leHBvcnQgZGVmYXVsdCBRdWl6UXVlc3Rpb247IiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCAnLi9RdWl6U3RhcnQuY3NzJztcblxuZnVuY3Rpb24gUXVpelN0YXJ0KHByb3BzKSB7XG4gICAgcmV0dXJuIChcbiAgICA8ZGl2IGNsYXNzTmFtZT1cInF1aXpzdGFydFwiPlxuICAgICAgICA8aDI+e3Byb3BzLnN1YmplY3R9PC9oMj5cbiAgICAgICAgPGgzPntwcm9wcy5kZXNjcmlwdGlvbn08L2gzPlxuICAgIDwvZGl2PlxuICAgICk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IFF1aXpTdGFydDsiLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuXG5pbXBvcnQgJy4vUmVzdWx0QW5zd2VyLmNzcyc7XG5cbmNvbnN0IFJlc3VsdEFuc3dlciA9IChwcm9wcykgPT4ge1xuICAgIGlmIChwcm9wcy5hbnN3ZXIgPT09IHByb3BzLnJpZ2h0QW5zd2VyKSB7XG4gICAgICAgIHJldHVybihcbiAgICAgICAgICAgIDxsaT5cbiAgICAgICAgICAgIDxoND57cHJvcHMuaW5kZXggKyAxfS48L2g0PlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhbnN3ZXIgY29ycmVjdGFuc3dlclwiPlxuICAgICAgICAgICAgICAgIDxidXR0b24gY2xhc3NOYW1lPVwidXNlckFuc3dlckNvcnJlY3RcIj57cHJvcHMuYW5zd2VyfTwvYnV0dG9uPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvbGk+XG4gICAgICAgICk7XG4gICAgfSBlbHNlIGlmKHByb3BzLmFuc3dlciA9PT0gbnVsbCkge1xuICAgICAgICByZXR1cm4oXG4gICAgICAgICAgICA8bGk+XG4gICAgICAgICAgICAgICAgPGg0Pntwcm9wcy5pbmRleCArIDF9LjwvaDQ+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhbnN3ZXIgaW5jb3JyZWN0YW5zd2VyXCI+XG4gICAgICAgICAgICAgICAgICAgIDxidXR0b24gY2xhc3NOYW1lPVwidXNlckFuc3dlclNraXBwZWRcIj5Ta2lwcGVkPC9idXR0b24+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhbnN3ZXIgY29ycmVjdGFuc3dlclwiPlxuICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzTmFtZT1cInVzZXJBbnN3ZXJDb3JyZWN0XCI+e3Byb3BzLnJpZ2h0QW5zd2VyfTwvYnV0dG9uPiBcbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvbGk+XG4gICAgICAgICk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuKFxuICAgICAgICAgICAgPGxpPlxuICAgICAgICAgICAgICAgIDxoND57cHJvcHMuaW5kZXggKyAxfS48L2g0PlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYW5zd2VyIGluY29ycmVjdGFuc3dlclwiPlxuICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzTmFtZT1cInVzZXJBbnN3ZXJJbmNvcnJlY3RcIj57cHJvcHMuYW5zd2VyfTwvYnV0dG9uPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYW5zd2VyIGNvcnJlY3RhbnN3ZXJcIj5cbiAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzc05hbWU9XCJ1c2VyQW5zd2VyQ29ycmVjdFwiPntwcm9wcy5yaWdodEFuc3dlcn08L2J1dHRvbj4gXG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2xpPlxuICAgICAgICApO1xuICAgIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgUmVzdWx0QW5zd2VyOyIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5cbmltcG9ydCAnLi9RdWl6UmVzdWx0cy5jc3MnO1xuaW1wb3J0IFJlc3VsdEFuc3dlciBmcm9tICcuL1Jlc3VsdEFuc3dlci5qcyc7XG5cbmNvbnN0IFF1aXpSZXN1bHRzID0gKHByb3BzKSA9PiB7XG4gICAgICAgIGNvbnN0IGFuc3dlcnNMaXN0ID0gcHJvcHMudXNlckFuc3dlcnMubWFwKCAoYW5zd2VyLCBpbmRleCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgcXVlc3Rpb24gPSBwcm9wcy5xdWVzdGlvbnNbaW5kZXhdO1xuICAgICAgICAgICAgY29uc3QgcmlnaHRBbnN3ZXIgPSBwcm9wcy5yaWdodEFuc3dlcnNbaW5kZXhdO1xuICAgICAgICAgICAgcmV0dXJuIDxSZXN1bHRBbnN3ZXIga2V5PXtpbmRleH0gaW5kZXg9e2luZGV4fSBxdWVzdGlvbj17cXVlc3Rpb259IGFuc3dlcj17YW5zd2VyfSByaWdodEFuc3dlcj17cmlnaHRBbnN3ZXJ9IC8+XG4gICAgICAgICAgICB9XG4gICAgICAgICk7XG5cbiAgICAgICAgcmV0dXJuKFxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJyZXN1bHRzLWNvbnRhaW5lclwiPlxuICAgICAgICAgICAgICAgIDxoMT5TdW1tYXJ5PC9oMT5cbiAgICAgICAgICAgICAgICA8dWw+XG4gICAgICAgICAgICAgICAgICAgIDxsaT5cbiAgICAgICAgICAgICAgICAgICAgPGg0IG9wYWNpdHk9JzAnPk5vLjwvaDQ+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYW5zd2VyXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzTmFtZT1cInVzZXJBbnN3ZXJTa2lwcGVkIHRhYmxlaGVhZGluZ3NcIj5Zb3VyIEFuc3dlcjwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhbnN3ZXJcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxidXR0b24gY2xhc3NOYW1lPVwidXNlckFuc3dlclNraXBwZWQgdGFibGVoZWFkaW5nc1wiPkNvcnJlY3QgQW5zd2VyPC9idXR0b24+IFxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPC9saT5cbiAgICAgICAgICAgICAgICB7YW5zd2Vyc0xpc3R9PC91bD5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApO1xufVxuXG5leHBvcnQgZGVmYXVsdCBRdWl6UmVzdWx0czsiLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IGF4aW9zIGZyb20gJ2F4aW9zJztcbmltcG9ydCAnLi9BcHAuY3NzJztcbmltcG9ydCBRdWl6SGVhZGVyIGZyb20gJy4vY29tcG9uZW50cy9RdWl6SGVhZGVyL1F1aXpIZWFkZXIuanMnO1xuaW1wb3J0IFF1aXpOYXYgZnJvbSAnLi9jb21wb25lbnRzL1F1aXpOYXYvUXVpek5hdi5qcyc7XG5pbXBvcnQgUXVpelF1ZXN0aW9uIGZyb20gJy4vY29tcG9uZW50cy9NYWluVmlld3MvUXVpelF1ZXN0aW9uL1F1aXpRdWVzdGlvbi5qcyc7XG5pbXBvcnQgUXVpelN0YXJ0IGZyb20gJy4vY29tcG9uZW50cy9NYWluVmlld3MvUXVpelN0YXJ0L1F1aXpTdGFydC5qcyc7XG5pbXBvcnQgUXVpelJlc3VsdHMgZnJvbSAnLi9jb21wb25lbnRzL01haW5WaWV3cy9RdWl6UmVzdWx0cy9RdWl6UmVzdWx0cy5qcyc7XG5cbmNsYXNzIEFwcCBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gIGNvbXBvbmVudERpZE1vdW50KCkge1xuICAgIHRoaXMuc2V0U3RhdGUoe3VzZXJfaWQ6IHRoaXMucHJvcHMudXNlcl9pZH0pO1xuICAgIGF4aW9zLmdldCgnaHR0cHM6Ly9zb25raHlhLmNvbS93ZWJhcHAvd2ViYXBwLnBocD9hcGlfa2V5PTEyMzQ1Njcmbm9uY2U9MTIzNDUmdGltZXN0YW1wPTEyMzQ1NjcmYXBpX3R5cGU9R0VUX1RPUElDJnVzZXJfaWQ9JyArIHRoaXMuc3RhdGUudXNlcl9pZClcbiAgICAudGhlbihyZXMgPT4ge1xuICAgICAgY29uc3QgcmVzcG9uc2UgPSByZXMuZGF0YTtcbiAgICAgIC8vIGdldCBjdXJyZWN0IHF1aXogZGF0YSBhbmQgc2F2ZSBpdCB0byBhcHAgc3RhdGVcbiAgICAgIGNvbnN0IHByb2JsZW1zID0gcmVzcG9uc2UucmVzdWx0cy5tYXAoZWxlbWVudCA9PiB7XG4gICAgICAgIGxldCBwcm9ibGVtID0ge1xuICAgICAgICAgIHByb2JsZW1JRDogZWxlbWVudC5wcm9ibGVtX2lkLFxuICAgICAgICAgIHRpdGxlOiBlbGVtZW50LnByb2JsZW1UaXRsZSxcbiAgICAgICAgICBkZXNjcmlwdGlvbjogZWxlbWVudC5wcm9ibGVtRGVzY3JpcHRpb25cbiAgICAgICAgICB9XG4gICAgICAgIHJldHVybiBwcm9ibGVtO1xuICAgICAgICB9KTtcblxuICAgICAgY29uc3QgYW5zd2VycyA9IHJlc3BvbnNlLnJlc3VsdHMubWFwKChlbGVtZW50KSA9PiB7XG4gICAgICAgIGxldCBhbnN3ZXIgPSB7XG4gICAgICAgICAgYTogXCJwcm9ibGVtQ2hvaXNlQVwiLFxuICAgICAgICAgIGI6IFwicHJvYmxlbUNob2lzZUJcIixcbiAgICAgICAgICBjOiBcInByb2JsZW1DaG9pc2VDXCIsXG4gICAgICAgICAgZDogXCJwcm9ibGVtQ2hvaXNlRFwiLFxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBhbnN3ZXI7XG4gICAgICB9KTtcbiAgICAgIGNvbnN0IHJpZ2h0QW5zd2VycyA9IHJlc3BvbnNlLnJlc3VsdHMubWFwKGVsZW1lbnQgPT4ge1xuICAgICAgICBjb25zdCBsZXR0ZXJzID0gWydBJywnQicsJ0MnLCdEJ107XG4gICAgICAgIHJldHVybiBsZXR0ZXJzW3BhcnNlSW50KGVsZW1lbnQucHJvYmxlbUNvcnJlY3RDaG9pc2UpIC0gMV07XG4gICAgICB9KTtcbiAgICAgIGxldCB1c2VyQ2FuR29OZXh0ID0gQXJyYXkocmVzcG9uc2UucGFnZVNpemUpLmZpbGwobnVsbCk7XG4gICAgICB1c2VyQ2FuR29OZXh0WzBdID0gdHJ1ZTtcbiAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICBjaGFsbGVuZ2VTdWJqZWN0OiByZXNwb25zZS5yZXN1bHRzWzBdLnN1YmplY3ROYW1lLFxuICAgICAgICBjaGFsbGVuZ2VEZXNjcmlwdGlvbjogcmVzcG9uc2UucmVzdWx0c1swXS5zdWJqZWN0TmFtZSxcbiAgICAgICAgbnVtYmVyT2ZQcm9ibGVtczogcmVzcG9uc2UucGFnZVNpemUsXG4gICAgICAgIHByb2JsZW1zOiBwcm9ibGVtcyxcbiAgICAgICAgYW5zd2VyczogYW5zd2VycyxcbiAgICAgICAgcmlnaHRBbnN3ZXJzOiByaWdodEFuc3dlcnMsXG4gICAgICAgIHVzZXJBbnN3ZXJzOiBBcnJheShyZXNwb25zZS5wYWdlU2l6ZSkuZmlsbChudWxsKSxcbiAgICAgICAgdXNlckFuc3dlcmVkQ29ycmVjdGx5OiBBcnJheShyZXNwb25zZS5wYWdlU2l6ZSkuZmlsbChudWxsKSxcbiAgICAgICAgdXNlckNhbkdvTmV4dDogdXNlckNhbkdvTmV4dCxcbiAgICAgIH0pO1xuICAgIH0pXG4gICAgLmNhdGNoKCBlcnJvciA9PiB7XG4gICAgICAvLyBpZiB1bmFibGUgdG8gZ2V0IHF1ZXN0aW9ucyBmcm9tIHNlcnZlclxuICAgICAgY29uc3QgcHJvYmxlbXMgPSBbXG4gICAgICAgIHtcbiAgICAgICAgICBwcm9ibGVtSUQ6IDEsXG4gICAgICAgICAgdGl0bGU6IFwicHJvYmxlbVRpdGxlXCIsXG4gICAgICAgICAgZGVzY3JpcHRpb246IFwicHJvYmxlbURlc2NyaXB0aW9uXCJcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIHByb2JsZW1JRDogMixcbiAgICAgICAgICB0aXRsZTogXCJwcm9ibGVtVGl0bGVcIixcbiAgICAgICAgICBkZXNjcmlwdGlvbjogXCJwcm9ibGVtRGVzY3JpcHRpb25cIlxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgcHJvYmxlbUlEOiAzLFxuICAgICAgICAgIHRpdGxlOiBcInByb2JsZW1UaXRsZVwiLFxuICAgICAgICAgIGRlc2NyaXB0aW9uOiBcInByb2JsZW1EZXNjcmlwdGlvblwiXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICBwcm9ibGVtSUQ6IDQsXG4gICAgICAgICAgdGl0bGU6IFwicHJvYmxlbVRpdGxlXCIsXG4gICAgICAgICAgZGVzY3JpcHRpb246IFwicHJvYmxlbURlc2NyaXB0aW9uXCJcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIHByb2JsZW1JRDogNSxcbiAgICAgICAgICB0aXRsZTogXCJwcm9ibGVtVGl0bGVcIixcbiAgICAgICAgICBkZXNjcmlwdGlvbjogXCJwcm9ibGVtRGVzY3JpcHRpb25cIlxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgcHJvYmxlbUlEOiA2LFxuICAgICAgICAgIHRpdGxlOiBcInByb2JsZW1UaXRsZVwiLFxuICAgICAgICAgIGRlc2NyaXB0aW9uOiBcInByb2JsZW1EZXNjcmlwdGlvblwiXG4gICAgICAgIH1dO1xuXG4gICAgICBjb25zdCBhbnN3ZXJzID0gW1xuICAgICAge1xuICAgICAgICAgIGE6IFwicHJvYmxlbUNob2lzZUFcIixcbiAgICAgICAgICBiOiBcInByb2JsZW1DaG9pc2VCXCIsXG4gICAgICAgICAgYzogXCJwcm9ibGVtQ2hvaXNlQ1wiLFxuICAgICAgICAgIGQ6IFwicHJvYmxlbUNob2lzZURcIixcbiAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICBhOiBcInByb2JsZW1DaG9pc2VBXCIsXG4gICAgICAgICAgYjogXCJwcm9ibGVtQ2hvaXNlQlwiLFxuICAgICAgICAgIGM6IFwicHJvYmxlbUNob2lzZUNcIixcbiAgICAgICAgICBkOiBcInByb2JsZW1DaG9pc2VEXCIsXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICBhOiBcInByb2JsZW1DaG9pc2VBXCIsXG4gICAgICAgICAgYjogXCJwcm9ibGVtQ2hvaXNlQlwiLFxuICAgICAgICAgIGM6IFwicHJvYmxlbUNob2lzZUNcIixcbiAgICAgICAgICBkOiBcInByb2JsZW1DaG9pc2VEXCIsXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICBhOiBcInByb2JsZW1DaG9pc2VBXCIsXG4gICAgICAgICAgYjogXCJwcm9ibGVtQ2hvaXNlQlwiLFxuICAgICAgICAgIGM6IFwicHJvYmxlbUNob2lzZUNcIixcbiAgICAgICAgICBkOiBcInByb2JsZW1DaG9pc2VEXCIsXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICBhOiBcInByb2JsZW1DaG9pc2VBXCIsXG4gICAgICAgICAgYjogXCJwcm9ibGVtQ2hvaXNlQlwiLFxuICAgICAgICAgIGM6IFwicHJvYmxlbUNob2lzZUNcIixcbiAgICAgICAgICBkOiBcInByb2JsZW1DaG9pc2VEXCIsXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICBhOiBcInByb2JsZW1DaG9pc2VBXCIsXG4gICAgICAgICAgYjogXCJwcm9ibGVtQ2hvaXNlQlwiLFxuICAgICAgICAgIGM6IFwicHJvYmxlbUNob2lzZUNcIixcbiAgICAgICAgICBkOiBcInByb2JsZW1DaG9pc2VEXCIsXG4gICAgICAgIH1cbiAgICAgIF07XG5cbiAgICAgIGNvbnN0IHJpZ2h0QW5zd2VycyA9IFsnQScsJ0InLCdBJywnQycsJ0QnLCdEJ107XG4gICAgICBjb25zdCBub09mUHJvYmxlbXMgPSA2XG4gICAgICBsZXQgdXNlckNhbkdvTmV4dCA9IEFycmF5KG5vT2ZQcm9ibGVtcykuZmlsbChudWxsKTtcbiAgICAgIHVzZXJDYW5Hb05leHRbMF0gPSB0cnVlO1xuICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgIGNoYWxsZW5nZVN1YmplY3Q6IFwiTWF0aGVtYXRpY3NcIixcbiAgICAgICAgbnVtYmVyT2ZQcm9ibGVtczogbm9PZlByb2JsZW1zLFxuICAgICAgICBwcm9ibGVtczogcHJvYmxlbXMsXG4gICAgICAgIGFuc3dlcnM6IGFuc3dlcnMsXG4gICAgICAgIHJpZ2h0QW5zd2VyczogcmlnaHRBbnN3ZXJzLFxuICAgICAgICB1c2VyQW5zd2VyczogQXJyYXkobm9PZlByb2JsZW1zKS5maWxsKG51bGwpLFxuICAgICAgICB1c2VyQW5zd2VyZWRDb3JyZWN0bHk6IEFycmF5KG5vT2ZQcm9ibGVtcykuZmlsbChudWxsKSxcbiAgICAgICAgdXNlckNhbkdvTmV4dDogdXNlckNhbkdvTmV4dFxuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cblxuICBjb21wb25lbnRXaWxsVW5tb3VudCgpIHtcbiAgICB0aGlzLnNlbmRBbnN3ZXJzKCk7XG4gIH1cblxuICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgIHN1cGVyKHByb3BzKTtcbiAgICB0aGlzLnN0YXRlID0geyAgICAgICAgXG4gICAgICAgIGN1cnJlbnRQcm9ibGVtTm86IDEsXG4gICAgICAgIGN1cnJlbnRWaWV3OiBcInN0YXJ0XCIsXG4gICAgICAgIHVzZXJBbnN3ZXJlZENvcnJlY3RseTogW251bGxdLFxuICAgICAgICB1c2VyQW5zd2VyczogW251bGxdLFxuICAgICAgICB1c2VyQ2FuR29OZXh0OiBbdHJ1ZV1cbiAgICB9XG4gIH1cblxuXG4gIHJlcXVpcmVBdXRoID0gKCkgPT4ge1xuICAgIGNvbnNvbGUubG9nKFwidXNlciBhdXRoZW50aWNhdGVkXCIpO1xuICB9XG5cbiAgY2FsY3VsYXRlUHJvZ3Jlc3MgPSAoe2N1cnJlbnRQcm9ibGVtTm99KSA9PiB7XG4gICAgbGV0IHByb2dyZXNzO1xuICAgIGlmKHRoaXMuc3RhdGUuY3VycmVudFZpZXcgIT09ICdzdGFydCcgJiYgIGN1cnJlbnRQcm9ibGVtTm8gIT09IDEpe1xuICAgICAgcHJvZ3Jlc3MgPSBjdXJyZW50UHJvYmxlbU5vIC0gMTtcbiAgICAgIGxldCB0ID0gdGhpcy5zdGF0ZS5udW1iZXJPZlByb2JsZW1zO1xuICAgICAgcHJvZ3Jlc3MgPSBwcm9ncmVzcyAvIHQ7XG4gICAgICBwcm9ncmVzcyAqPSAxMDA7XG4gICAgfSBlbHNlIGlmKHRoaXMuc3RhdGUuY3VycmVudFZpZXcgPT09IFwiZmluaXNoXCIpIHtcbiAgICAgIHByb2dyZXNzID0gOTk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHByb2dyZXNzID0gMDtcbiAgICB9XG4gICAgcmV0dXJuIHByb2dyZXNzO1xuICB9XG5cbiAgaW5jcmVtZW50Q2FuR29OZXh0QXJyYXkgPSAoe3VzZXJDYW5Hb05leHQsIGN1cnJlbnRQcm9ibGVtTm99KSA9PiB7XG4gICAgbGV0IGFycmF5ID0gdXNlckNhbkdvTmV4dC5zbGljZSgpO1xuICAgIGFycmF5W2N1cnJlbnRQcm9ibGVtTm9dID0gdHJ1ZTtcbiAgICBhcnJheVtjdXJyZW50UHJvYmxlbU5vICsgMV0gPSBmYWxzZTtcbiAgICB0aGlzLnNldFN0YXRlKHt1c2VyQ2FuR29OZXh0OiBhcnJheX0pO1xuICB9XG5cbiAgbmV4dFZpZXcgPSAoKSA9PiB7XG4gICAgbGV0IGN1cnJlbnRWaWV3ID0gdGhpcy5zdGF0ZS5jdXJyZW50VmlldztcbiAgICBpZihjdXJyZW50VmlldyA9PT0gXCJzdGFydFwiKXtcbiAgICAgIGN1cnJlbnRWaWV3ID0gXCJxdWVzdGlvblwiO1xuICAgICAgdGhpcy5zZXRTdGF0ZSh7IGN1cnJlbnRWaWV3OiBjdXJyZW50Vmlld30pO1xuICAgIH0gZWxzZSBpZihjdXJyZW50VmlldyA9PT0gXCJxdWVzdGlvblwiKSB7XG4gICAgICBsZXQgaSA9IHRoaXMuc3RhdGUuY3VycmVudFByb2JsZW1ObztcbiAgICAgIGxldCBtYXggPSB0aGlzLnN0YXRlLm51bWJlck9mUHJvYmxlbXM7XG4gICAgICBpZihpICE9PSBtYXgpe1xuICAgICAgICBpKys7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe2N1cnJlbnRQcm9ibGVtTm86IGl9KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGN1cnJlbnRWaWV3ID0gXCJmaW5pc2hcIjtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7IGN1cnJlbnRWaWV3OiBjdXJyZW50Vmlld30pO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHByZXZpb3VzVmlldyA9ICgpID0+IHtcbiAgICBsZXQgY3VycmVudFZpZXcgPSB0aGlzLnN0YXRlLmN1cnJlbnRWaWV3O1xuICAgIGlmKGN1cnJlbnRWaWV3ID09PSBcInJlc3VsdHNcIil7XG4gICAgICBjdXJyZW50VmlldyA9IFwicXVlc3Rpb25cIjtcbiAgICAgIHRoaXMuc2V0U3RhdGUoeyBjdXJyZW50VmlldzogY3VycmVudFZpZXd9KTtcbiAgICB9IGVsc2UgaWYoY3VycmVudFZpZXcgPT09IFwicXVlc3Rpb25cIikge1xuICAgICAgbGV0IGkgPSB0aGlzLnN0YXRlLmN1cnJlbnRQcm9ibGVtTm87XG4gICAgICBpZihpICE9PSAxKXtcbiAgICAgICAgaS0tO1xuICAgICAgICB0aGlzLnNldFN0YXRlKHtjdXJyZW50UHJvYmxlbU5vOiBpfSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjdXJyZW50VmlldyA9IFwic3RhcnRcIjtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7IGN1cnJlbnRWaWV3OiBjdXJyZW50Vmlld30pO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHNlbmRBbnN3ZXJzID0gKCkgPT4ge1xuICAgIGNvbnN0IHVzZXJBbnN3ZXJzID0gSlNPTi5zdHJpbmdpZnkodGhpcy5zdGF0ZS51c2VyQW5zd2Vycyk7XG4gICAgY29uc29sZS5sb2codXNlckFuc3dlcnMpO1xuICAgIC8vIHNlbmQgcG9zdCByZXF1ZXN0IHRvIHNlcnZlclxuICB9XG5cbiAgc2VuZEFuc3dlclRvU2VydmVyID0gKCkgPT4ge1xuICAgIGNvbnNvbGUubG9nKCdzZW5kaW5nIGFuc3dlciB0byBzZXJ2ZXInKTtcbiAgICBjb25zdCBjdXJyZW50UHJvYmxlbSA9IHRoaXMuc3RhdGUuY3VycmVudFByb2JsZW1ObyAtIDE7XG4gICAgbGV0IHVzZXJBbnN3ZXIgPSB0aGlzLnN0YXRlLnVzZXJBbnN3ZXJzW2N1cnJlbnRQcm9ibGVtXTtcbiAgICBzd2l0Y2godXNlckFuc3dlcil7XG4gICAgICBjYXNlICdBJzpcbiAgICAgICAgdXNlckFuc3dlciA9IDE7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAnQic6XG4gICAgICAgIHVzZXJBbnN3ZXIgPSAyO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ0MnOlxuICAgICAgICB1c2VyQW5zd2VyID0gMztcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICdEJzpcbiAgICAgICAgdXNlckFuc3dlciA9IDQ7XG4gICAgICAgIGJyZWFrO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgY29uc29sZS5sb2coXCJTaG91bGQgYmUgdW5yZWFjaGFibGUgLSBjaGVjayB0aGlzLnN0YXRlLnVzZXJBbnN3ZXIgaWYgaXQncyB1cHBlcmNhc2UgQUJDRFwiKTtcbiAgICB9XG5cbiAgICBjb25zdCBxdWVzdGlvbklEID0gdGhpcy5zdGF0ZS5wcm9ibGVtc1tjdXJyZW50UHJvYmxlbV0ucHJvYmxlbUlEO1xuICAgIGNvbnN0IHVzZXJJRCA9IHRoaXMuc3RhdGUudXNlcl9pZDtcbiAgICBheGlvcy5nZXQoJ2h0dHBzOi8vc29ua2h5YS5jb20vd2ViYXBwL3dlYmFwcC5waHA/YXBpX2tleT0xMjM0NTY3Jm5vbmNlPTEyMzQ1JnRpbWVzdGFtcD0xMjM0NTY3JmFwaV90eXBlPVVQREFURV9TT0xVVElPTiZ1c2VyX2lkPScrdXNlcklEKycmcXVlc3Rpb25faWQ9JytxdWVzdGlvbklEKycmYW5zd2VyX2Nob2ljZT0nK3VzZXJBbnN3ZXIpXG4gICAgLnRoZW4oZnVuY3Rpb24gKHJlc3BvbnNlKSB7XG4gICAgICBjb25zb2xlLmxvZyhyZXNwb25zZSk7XG4gICAgfSlcbiAgICAuY2F0Y2goZnVuY3Rpb24gKGVycm9yKSB7XG4gICAgICBjb25zb2xlLmxvZyhlcnJvcik7XG4gICAgfSk7XG4gIH1cblxuICBjbG9zZU1vZGFsID0gKCkgPT4ge1xuICAgIHRoaXMucHJvcHMuY2xvc2VNb2RhbCgpO1xuICB9XG5cbiAgaGFuZGxlTmF2Q2xpY2sgPSAoKSA9PiB7XG4gICAgY29uc3QgYXJyYXkgPSB0aGlzLnN0YXRlLnVzZXJDYW5Hb05leHQ7XG4gICAgY29uc3QgdXNlckNhbkdvTmV4dCA9IGFycmF5W3RoaXMuc3RhdGUuY3VycmVudFByb2JsZW1ObyAtIDFdO1xuICAgIGlmKHVzZXJDYW5Hb05leHQpe1xuICAgICAgdGhpcy5uZXh0VmlldygpO1xuICAgICAgdGhpcy5pbmNyZW1lbnRDYW5Hb05leHRBcnJheSh0aGlzLnN0YXRlKTtcbiAgICB9XG4gIH1cblxuICBoYW5kbGVRdWVzdGlvbkNsaWNrID0gKGUpID0+IHtcbiAgICBpZih0aGlzLnN0YXRlLnVzZXJBbnN3ZXJzW3RoaXMuc3RhdGUuY3VycmVudFByb2JsZW1ObyAtIDFdID09PSBudWxsKXtcbiAgICAgIGxldCBhbnN3ZXIgPSBlLnRhcmdldDtcbiAgICAgIGFuc3dlciA9IGFuc3dlci5jaGlsZE5vZGVzWzBdLmlubmVySFRNTDsgXG4gICAgICBjb25zdCBjdXJyZW50UHJvYmxlbSA9IHRoaXMuc3RhdGUuY3VycmVudFByb2JsZW1ObyAtIDE7XG4gICAgICBjb25zdCB1c2VyQW5zd2VycyA9IHRoaXMuc3RhdGUudXNlckFuc3dlcnM7XG4gICAgICBpZih1c2VyQW5zd2Vyc1tjdXJyZW50UHJvYmxlbV0gPT09IG51bGwpIHtcbiAgICAgICAgdXNlckFuc3dlcnNbY3VycmVudFByb2JsZW1dID0gYW5zd2VyO1xuICAgICAgICB0aGlzLnNldFN0YXRlKHt1c2VyQW5zd2VyczogdXNlckFuc3dlcnN9KTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgaGFuZGxlUXVlc3Rpb25DaGVjayA9ICgpID0+IHtcbiAgICBpZih0aGlzLnN0YXRlLnVzZXJBbnN3ZXJzW3RoaXMuc3RhdGUuY3VycmVudFByb2JsZW1ObyAtIDFdICE9PSBudWxsKSB7XG4gICAgICB0aGlzLnNlbmRBbnN3ZXJUb1NlcnZlcigpO1xuICAgICAgdGhpcy5pbmNyZW1lbnRDYW5Hb05leHRBcnJheSh0aGlzLnN0YXRlKTtcbiAgICAgIGNvbnN0IGN1cnJlbnRQcm9ibGVtID0gdGhpcy5zdGF0ZS5jdXJyZW50UHJvYmxlbU5vIC0gMTtcbiAgICAgIGNvbnN0IHVzZXJBbnN3ZXJzID0gdGhpcy5zdGF0ZS51c2VyQW5zd2VycztcbiAgICAgIGNvbnN0IHJpZ2h0QW5zd2VycyA9IHRoaXMuc3RhdGUucmlnaHRBbnN3ZXJzO1xuICAgICAgY29uc3QgdXNlckFuc3dlcmVkQ29ycmVjdGx5ID0gdGhpcy5zdGF0ZS51c2VyQW5zd2VyZWRDb3JyZWN0bHkuc2xpY2UoKTtcbiAgICAgIGNvbnN0IGFuc3dlciA9IHVzZXJBbnN3ZXJzW2N1cnJlbnRQcm9ibGVtXTtcbiAgICAgIGNvbnN0IHJpZ2h0QW5zd2VyID0gcmlnaHRBbnN3ZXJzW2N1cnJlbnRQcm9ibGVtXTtcbiAgICAgIGlmKGFuc3dlciA9PT0gcmlnaHRBbnN3ZXIpIHtcbiAgICAgICAgdXNlckFuc3dlcmVkQ29ycmVjdGx5W2N1cnJlbnRQcm9ibGVtXSA9IHRydWU7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB1c2VyQW5zd2VyZWRDb3JyZWN0bHlbY3VycmVudFByb2JsZW1dID0gZmFsc2U7XG4gICAgICB9XG4gICAgICB0aGlzLnNldFN0YXRlKHt1c2VyQW5zd2VyZWRDb3JyZWN0bHk6IHVzZXJBbnN3ZXJlZENvcnJlY3RseX0pO1xuICAgIH1cbiAgfVxuXG4gIGhhbmRsZVNraXAgPSAoKSA9PiB7XG4gICAgdGhpcy5pbmNyZW1lbnRDYW5Hb05leHRBcnJheSh0aGlzLnN0YXRlKTtcbiAgICB0aGlzLm5leHRWaWV3KCk7XG4gIH1cbiAgXG5cbiAgcmVuZGVyTWFpblZpZXcgPSAoe2N1cnJlbnRWaWV3fSkgPT4ge1xuICAgIHN3aXRjaChjdXJyZW50Vmlldykge1xuICAgICAgY2FzZSAnc3RhcnQnOlxuICAgICAgcmV0dXJuKFxuICAgICAgICA8UXVpelN0YXJ0IFxuICAgICAgICBzdWJqZWN0PXt0aGlzLnN0YXRlLmNoYWxsZW5nZVN1YmplY3R9XG4gICAgICAgIGRlc2NyaXB0aW9uPXt0aGlzLnN0YXRlLmNoYWxsZW5nZURlc2NyaXB0aW9ufVxuICAgICAgICAvPlxuICAgICAgKTtcbiAgICAgIGNhc2UgJ2ZpbmlzaCc6XG4gICAgICByZXR1cm4oXG4gICAgICAgIDxRdWl6UmVzdWx0c1xuICAgICAgICAgICAgcXVlc3Rpb25zPXt0aGlzLnN0YXRlLnByb2JsZW1zfVxuICAgICAgICAgICAgdXNlckFuc3dlcnM9e3RoaXMuc3RhdGUudXNlckFuc3dlcnN9ICAgXG4gICAgICAgICAgICByaWdodEFuc3dlcnM9e3RoaXMuc3RhdGUucmlnaHRBbnN3ZXJzfVxuICAgICAgICAvPlxuICAgICAgICApO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgY29uc3QgY3VycmVudFByb2JsZW0gPSB0aGlzLnN0YXRlLnByb2JsZW1zW3RoaXMuc3RhdGUuY3VycmVudFByb2JsZW1ObyAtIDFdO1xuICAgICAgICBjb25zdCBjdXJyZW50QW5zd2VycyA9IHRoaXMuc3RhdGUuYW5zd2Vyc1t0aGlzLnN0YXRlLmN1cnJlbnRQcm9ibGVtTm8gLSAxXTtcbiAgICAgICAgY29uc3QgdXNlckFuc3dlcnMgPSB0aGlzLnN0YXRlLnVzZXJBbnN3ZXJzW3RoaXMuc3RhdGUuY3VycmVudFByb2JsZW1ObyAtIDFdO1xuICAgICAgICBjb25zdCB1c2VyQW5zd2VyZWRDb3JyZWN0bHkgPSB0aGlzLnN0YXRlLnVzZXJBbnN3ZXJlZENvcnJlY3RseS5zbGljZSgpO1xuICAgICAgICBjb25zdCBhbnN3ZXJDb3JyZWN0ID0gdXNlckFuc3dlcmVkQ29ycmVjdGx5W3RoaXMuc3RhdGUuY3VycmVudFByb2JsZW1ObyAtIDFdO1xuICAgICAgICByZXR1cm4oXG4gICAgICAgICAgPFF1aXpRdWVzdGlvblxuICAgICAgICAgIHByb2JsZW1pZD17Y3VycmVudFByb2JsZW0ucHJvYmxlbUlEfVxuICAgICAgICAgIHByb2JsZW10aXRsZT17Y3VycmVudFByb2JsZW0udGl0bGV9XG4gICAgICAgICAgcHJvYmxlbWRlc2NyaXB0aW9uPXtjdXJyZW50UHJvYmxlbS5kZXNjcmlwdGlvbn1cbiAgICAgICAgICBhbnN3ZXJzPXtjdXJyZW50QW5zd2Vyc31cbiAgICAgICAgICB1c2VyQW5zd2VyPXt1c2VyQW5zd2Vyc31cbiAgICAgICAgICBhbnN3ZXJDb3JyZWN0PXthbnN3ZXJDb3JyZWN0fVxuICAgICAgICAgIGhhbmRsZUNsaWNrPXt0aGlzLmhhbmRsZVF1ZXN0aW9uQ2xpY2t9XG4gICAgICAgICAgLz5cbiAgICAgICAgKTtcbiAgICB9XG4gIH1cblxuICByZW5kZXIoKSB7XG4gICAgcmV0dXJuIChcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJxdWl6XCI+XG4gICAgICAgICAgPFF1aXpIZWFkZXIgY2xvc2U9e3RoaXMuY2xvc2VNb2RhbH0gcHJvZ3Jlc3M9e3RoaXMuY2FsY3VsYXRlUHJvZ3Jlc3ModGhpcy5zdGF0ZSl9Lz5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm1haW52aWV3XCI+XG4gICAgICAgICAge3RoaXMucmVuZGVyTWFpblZpZXcodGhpcy5zdGF0ZSl9XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8UXVpek5hdiBcbiAgICAgICAgICAgIGhhbmRsZUNsaWNrPXt0aGlzLmhhbmRsZU5hdkNsaWNrfVxuICAgICAgICAgICAgaGFuZGxlU2tpcD17dGhpcy5oYW5kbGVTa2lwfVxuICAgICAgICAgICAgaGFuZGxlQmFjaz17dGhpcy5wcmV2aW91c1ZpZXd9XG4gICAgICAgICAgICBoYW5kbGVDaGVjaz17dGhpcy5oYW5kbGVRdWVzdGlvbkNoZWNrfVxuICAgICAgICAgICAgY3VycmVudFZpZXc9e3RoaXMuc3RhdGUuY3VycmVudFZpZXd9IFxuICAgICAgICAgICAgcXVlc3Rpb25BbnN3ZXJlZD17dGhpcy5zdGF0ZS51c2VyQW5zd2Vyc1t0aGlzLnN0YXRlLmN1cnJlbnRQcm9ibGVtTm8gLSAxXSAhPT0gbnVsbH1cbiAgICAgICAgICAgIGNvcnJlY3RBbnN3ZXI9e3RoaXMuc3RhdGUudXNlckFuc3dlcmVkQ29ycmVjdGx5W3RoaXMuc3RhdGUuY3VycmVudFByb2JsZW1ObyAtIDFdfVxuICAgICAgICAgICAgY2FuR29OZXh0PXt0aGlzLnN0YXRlLnVzZXJDYW5Hb05leHR9XG4gICAgICAgICAgICBzZW5kQW5zd2Vycz17dGhpcy5zZW5kQW5zd2Vyc31cbiAgICAgICAgICAgIGNsb3NlTW9kYWw9e3RoaXMuY2xvc2VNb2RhbH1cbiAgICAgICAgICAgIC8+XG4gICAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgQXBwO1xuXG5cbiIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUmVhY3RET00gZnJvbSAncmVhY3QtZG9tJztcbmltcG9ydCAnLi9pbmRleC5jc3MnO1xuaW1wb3J0IEFwcCBmcm9tICcuL2FwcC9BcHAuanMnO1xuXG5mdW5jdGlvbiBjbG9zZU1vZGFsKCl7XG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShcIm1hc2tcIilbMF0uY2xhc3NMaXN0LnJlbW92ZShcImFjdGl2ZVwiKTtcbiAgICBSZWFjdERPTS51bm1vdW50Q29tcG9uZW50QXROb2RlKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdyb290JykpXG4gIFxuICB9XG4gICAgICBcbiAgZnVuY3Rpb24gcnVuUmVhY3RBcHAodXNlcmlkKSB7XG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShcIm1hc2tcIilbMF0uY2xhc3NMaXN0LmFkZChcImFjdGl2ZVwiKTtcbiAgICAgICAgUmVhY3RET00ucmVuZGVyKFJlYWN0LmNyZWF0ZUVsZW1lbnQoQXBwLCB7IHVzZXJfaWQ6IHVzZXJpZCwgY2xvc2VNb2RhbDogY2xvc2VNb2RhbCB9KSwgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Jvb3QnKSk7XG4gIFxuICAgIGNvbnNvbGUubG9nKHVzZXJpZCk7XG4gICAgXG4gIH1cbiAgICAgIGxldCB0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShcInNob3dcIik7XG4gICAgICBmb3IobGV0IGkgPSAwOyBpIDwgdC5sZW5ndGg7IGkrKyl7XG4gICAgICAgIHRbaV0uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGZ1bmN0aW9uKCkge1xuICAgICAgcnVuUmVhY3RBcHAodFtpXS5pZClcbiAgfSwgZmFsc2UpO1xuICBcbiAgICAgIH1cbiAgIl0sIm5hbWVzIjpbIlF1aXpIZWFkZXIiLCJwcm9wcyIsImNsb3NlIiwid2lkdGgiLCJwcm9ncmVzcyIsIlF1aXpOYXYiLCJuYXZDbGFzc05hbWUiLCJidXR0b25DbGFzc05hbWUiLCJidXR0b25UZXh0IiwiY2xpY2toYW5kbGVyIiwiY3VycmVudFZpZXciLCJoYW5kbGVDbGljayIsInNlbmRBbnN3ZXJzIiwiY2xvc2VNb2RhbCIsImNvcnJlY3RBbnN3ZXIiLCJxdWVzdGlvbkFuc3dlcmVkIiwiaGFuZGxlQ2hlY2siLCJjb25zb2xlIiwibG9nIiwidGhpcmRFbGVtZW50Iiwic2Vjb25kRWxlbWVudCIsImhhbmRsZVNraXAiLCJmaXJzdEVsZW1lbnQiLCJoYW5kbGVCYWNrIiwiQW5zd2VyIiwiY2xhc3NOYW1lIiwibGV0dGVyIiwiYW5zd2VyIiwiUXVpelF1ZXN0aW9uIiwicHJvYmxlbWlkIiwicHJvYmxlbXRpdGxlIiwicHJvYmxlbWRlc2NyaXB0aW9uIiwiT2JqZWN0Iiwia2V5cyIsImFuc3dlcnMiLCJtYXAiLCJrZXkiLCJpbmRleCIsImNsIiwidXNlckFuc3dlciIsImFuc3dlckNvcnJlY3QiLCJ0b1VwcGVyQ2FzZSIsIlF1aXpTdGFydCIsInN1YmplY3QiLCJkZXNjcmlwdGlvbiIsIlJlc3VsdEFuc3dlciIsInJpZ2h0QW5zd2VyIiwiUXVpelJlc3VsdHMiLCJhbnN3ZXJzTGlzdCIsInVzZXJBbnN3ZXJzIiwicXVlc3Rpb24iLCJxdWVzdGlvbnMiLCJyaWdodEFuc3dlcnMiLCJBcHAiLCJzZXRTdGF0ZSIsInVzZXJfaWQiLCJheGlvcyIsImdldCIsInN0YXRlIiwidGhlbiIsInJlcyIsInJlc3BvbnNlIiwiZGF0YSIsInByb2JsZW1zIiwicmVzdWx0cyIsImVsZW1lbnQiLCJwcm9ibGVtIiwicHJvYmxlbUlEIiwicHJvYmxlbV9pZCIsInRpdGxlIiwicHJvYmxlbVRpdGxlIiwicHJvYmxlbURlc2NyaXB0aW9uIiwiYSIsImIiLCJjIiwiZCIsImxldHRlcnMiLCJwYXJzZUludCIsInByb2JsZW1Db3JyZWN0Q2hvaXNlIiwidXNlckNhbkdvTmV4dCIsIkFycmF5IiwicGFnZVNpemUiLCJmaWxsIiwiY2hhbGxlbmdlU3ViamVjdCIsInN1YmplY3ROYW1lIiwiY2hhbGxlbmdlRGVzY3JpcHRpb24iLCJudW1iZXJPZlByb2JsZW1zIiwidXNlckFuc3dlcmVkQ29ycmVjdGx5IiwiY2F0Y2giLCJlcnJvciIsIm5vT2ZQcm9ibGVtcyIsImN1cnJlbnRQcm9ibGVtTm8iLCJ0IiwiYXJyYXkiLCJzbGljZSIsImkiLCJtYXgiLCJKU09OIiwic3RyaW5naWZ5IiwiY3VycmVudFByb2JsZW0iLCJxdWVzdGlvbklEIiwidXNlcklEIiwibmV4dFZpZXciLCJpbmNyZW1lbnRDYW5Hb05leHRBcnJheSIsImUiLCJ0YXJnZXQiLCJjaGlsZE5vZGVzIiwiaW5uZXJIVE1MIiwic2VuZEFuc3dlclRvU2VydmVyIiwiY3VycmVudEFuc3dlcnMiLCJoYW5kbGVRdWVzdGlvbkNsaWNrIiwiY2FsY3VsYXRlUHJvZ3Jlc3MiLCJyZW5kZXJNYWluVmlldyIsImhhbmRsZU5hdkNsaWNrIiwicHJldmlvdXNWaWV3IiwiaGFuZGxlUXVlc3Rpb25DaGVjayIsIlJlYWN0IiwiQ29tcG9uZW50IiwiZG9jdW1lbnQiLCJnZXRFbGVtZW50c0J5Q2xhc3NOYW1lIiwiY2xhc3NMaXN0IiwicmVtb3ZlIiwiUmVhY3RET00iLCJ1bm1vdW50Q29tcG9uZW50QXROb2RlIiwiZ2V0RWxlbWVudEJ5SWQiLCJydW5SZWFjdEFwcCIsInVzZXJpZCIsImFkZCIsInJlbmRlciIsImNyZWF0ZUVsZW1lbnQiLCJhZGRFdmVudExpc3RlbmVyIiwiaWQiLCJsZW5ndGgiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7RUFBQSxTQUFTLFdBQVcsQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFO0VBQy9CLEVBQUUsS0FBSyxHQUFHLEtBQUssS0FBSyxDQUFDLEdBQUcsR0FBRyxHQUFHLEVBQUUsQ0FBQztFQUNqQyxFQUFFLElBQUksUUFBUSxHQUFHLEdBQUcsQ0FBQyxRQUFRLENBQUM7O0VBRTlCLEVBQUUsSUFBSSxDQUFDLEdBQUcsSUFBSSxPQUFPLFFBQVEsS0FBSyxXQUFXLEVBQUUsRUFBRSxPQUFPLEVBQUU7O0VBRTFELEVBQUUsSUFBSSxJQUFJLEdBQUcsUUFBUSxDQUFDLElBQUksSUFBSSxRQUFRLENBQUMs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
