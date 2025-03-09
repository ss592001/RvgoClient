import React, { useState, useEffect } from "react";
import { Expression, GraphingCalculator } from "desmos-react";

import "./CustomTestPlatform.css";
import { useSelector, useDispatch } from "react-redux";
import { setAnswers, setTestOtherDetails } from "../../Redux/Store";
import { useNavigate } from "react-router";
import { setTimeTaken, setTestStartTIme } from "../../Redux/Store";
import { PostRoute } from "../../Custom_hooks/Routes";
import ClimbingBoxLoader from "react-spinners/ClipLoader";
import { toast } from "react-toastify";
import reference from "../../../images/reference.png";
import "react-toastify/dist/ReactToastify.css";
function Desmos({ setIsDesmosVisible }) {
  return (
    <>
      <div className="calculator">
        <div className="desmosTopBar">
          DESMOS
          <span
            className="desmosExitBtn"
            onClick={() => {
              setIsDesmosVisible(false);
            }}
          >
            EXIT
          </span>
        </div>
        <GraphingCalculator
          attributes={{ className: " cVisible" }}
          projectorMode
        >
          <Expression id="fn" latex="x^2" />
        </GraphingCalculator>
      </div>
    </>
  );
}
function RefrenceSheet({ SetIsRefSheetVisible }) {
  return (
    <>
      <div className="calculator" style={{ width: "50vw", height: "65vh" }}>
        <div className="desmosTopBar">
          REFERENCE SHEET
          <span
            className="desmosExitBtn"
            onClick={() => {
              SetIsRefSheetVisible(false);
            }}
          >
            EXIT
          </span>
        </div>
        <div style={{ width: "100%", height: "60vh", overflow: "scroll" }}>
          <img src={reference} alt="reference" width={"100%"} />
        </div>
      </div>
    </>
  );
}
export const SubmitTestConfirmation = ({
  isOpen,
  onClose,
  onConfirm,
  isCancelButtonVisible,
  isConfirmButtonVisible,
  message,
  fontSize,
  loader,
}) => {
  if (!isOpen) return null;
  return (
    <>
      <div className="popup-overlay">
        <div className="popup-container">
          <div className="popupText" style={{ fontSize: fontSize }}>
            {message}
          </div>
          <div className="popup-buttons">
            {loader ? (
              <ClimbingBoxLoader
                color={"rgb(126, 23, 28)"}
                loading={loader}
                size={30}
                aria-label="Loading Spinner"
                data-testid="loader"
              />
            ) : (
              <>
                {isCancelButtonVisible && (
                  <button className="popup-btn cancel-btn" onClick={onClose}>
                    Cancel
                  </button>
                )}
                {isConfirmButtonVisible && (
                  <button
                    className="popup-btn confirm-btn"
                    onClick={onConfirm}
                    onClickCapture={onConfirm}
                  >
                    Confirm
                  </button>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

const QuestionsTavPreviewer = ({
  setQuestionTabPreviewer,
  test,
  currentQuestion,
  setCurrentQuestion,
  answers,
}) => {
  const handleFindQuestionAttempted = (question) => {
    const isAttempted =
      answers &&
      answers.findIndex(
        (ans, index) =>
          ans.isUnattempted !== true && ans.question.id === question.id
      );
    return isAttempted >= 0 ? true : false;
  };

  const handleFindQuestionIsSetForReview = (question) => {
    const isAttempted =
      answers &&
      answers.findIndex(
        (ans, index) =>
          ans.isMarkedForReview === true && ans.question.id === question.id
      );
    return isAttempted >= 0 ? true : false;
  };
  return (
    <>
      <div
        className="overlay"
        onClick={() => {
          setQuestionTabPreviewer(false);
        }}
      >
        <div className="questionsTabContainer">
          <div className="testDescription">
            <div>{test.name}</div>
            <div>{test.description}</div>
          </div>
          <div className="questionIdentifier">
            <div className="identifier">
              <div>
                <img
                  width="50"
                  height="50"
                  src="https://img.icons8.com/ios/50/marker--v1.png"
                  alt="current q icon"
                  className="identifierIcon"
                />
              </div>
              <div className="identifierText">Current</div>
            </div>
            <div className="identifier">
              <div>
                <img
                  width="50"
                  height="50"
                  src="https://img.icons8.com/ios/50/square-90.png"
                  alt="unanswered icon"
                  className="identifierIcon"
                />
              </div>
              <div className="identifierText">Unanswered</div>
            </div>
            <div className="identifier">
              <div>
                <img
                  width="50"
                  height="50"
                  src="https://img.icons8.com/external-bearicons-glyph-bearicons/64/ff0000/external-mark-call-to-action-bearicons-glyph-bearicons.png"
                  alt="for review icon"
                  className="identifierIcon"
                />
              </div>
              <div className="identifierText">For Review</div>
            </div>
          </div>
          <div
            className="questionsTabsPreviewer"
            style={{ overflow: "scroll", height: "50vh" }}
          >
            {test.Test &&
              test.Test.map((question, index) => {
                return (
                  <>
                    <div
                      key={index}
                      className="questioTab"
                      style={
                        handleFindQuestionAttempted(question)
                          ? {
                              backgroundColor: "rgb(42, 120, 255)",
                              color: "white",
                            }
                          : {}
                      }
                      onClick={() => {
                        setCurrentQuestion(index);
                      }}
                    >
                      {handleFindQuestionIsSetForReview(question) ? (
                        <img
                          width="20"
                          height="20"
                          src={
                            "https://img.icons8.com/external-bearicons-glyph-bearicons/64/ff0000/external-mark-call-to-action-bearicons-glyph-bearicons.png"
                          }
                          alt="external-mark-call-to-action-bearicons-detailed-outline-bearicons"
                          style={{
                            position: "absolute",
                            height: "1.3vw",
                            width: "1vw",
                            marginTop: "-4%",
                            marginLeft: "5%",
                          }}
                        />
                      ) : (
                        <></>
                      )}
                      {index === currentQuestion ? (
                        <>
                          <img
                            width="50"
                            height="50"
                            src="https://img.icons8.com/ios/50/marker--v1.png"
                            alt="current q icon"
                            className="identifierIcon"
                            style={{
                              position: "absolute",
                              height: "1.5vw",
                              width: "1.5vw",
                              marginTop: "-8%",
                            }}
                          />
                        </>
                      ) : (
                        ""
                      )}
                      {index + 1}
                    </div>
                  </>
                );
              })}
          </div>
          <div
            className="reviewBtn"
            onClick={() => {
              setQuestionTabPreviewer(false);
            }}
          >
            Go to Review Page
          </div>
        </div>
      </div>
    </>
  );
};

const useCountdown = (timeLeft, setTimeLeft, setIsTimeOver) => {
  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);

      return () => clearInterval(timer);
    } else {
      setIsTimeOver(true);
    }
  }, [timeLeft]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  return formatTime(timeLeft);
};

const CustomTestPlatform = () => {
  const question = useSelector((state) => state.user.activeTest);
  const testStartTime = useSelector((state) => state.user.startTime);
  const auth = useSelector((state) => state.user.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isDesmosVisible, setIsDesmosVisible] = useState(false);
  const [isRefSheetVisible, SetIsRefSheetVisible] = useState(false);
  const [questionTabPreviewer, setQuestionTabPreviewer] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedQuestion, setSelectedQuestion] = useState(currentQuestion);
  const [isSubmiting, setisSubmiting] = useState(false);
  const [answers, setMyAnswers] = useState([]);
  const [startTime, setStartTime] = useState(Date.now());
  const [rendring, setRendring] = useState(false);
  const [timeLeft, setTimeLeft] = useState(question.testTime * 60);
  const [loader, setLoader] = useState(false);
  const [isTimeOver, setIsTimeOver] = useState(false);

  const handleProceede = () => {
    console.log(answers);
    setStartTime(Date.now());
    setCurrentQuestion(currentQuestion + 1);
  };

  const handlePressBackButton = () => {
    setStartTime(Date.now());
    setCurrentQuestion(currentQuestion - 1);
  };

  useEffect(() => {
    for (let i = 0; i < question.Test.length; i++) {
      const ques = question.Test[i];

      setMyAnswers((prevAnswers) => [
        ...prevAnswers,
        {
          question: ques,
          isMarkedForReview: false,
          isSaved: false,
          isUnattempted: true,
          answer: "",
          time: "",
        },
      ]);
    }
  }, []);

  const handleCalculateTimeTakenToSolveQuestion = () => {
    const diffInMs = Math.abs(startTime - new Date());
    const diffInHours = Math.floor(
      (diffInMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const diffInMinutes = Math.floor(
      (diffInMs % (1000 * 60 * 60)) / (1000 * 60)
    );
    const diffInSeconds = Math.floor((diffInMs % (1000 * 60)) / 1000);

    return `${diffInMinutes}:${diffInSeconds}`;
  };

  const handleMarkForReviewToTrue = () => {
    const currentAnswer = answers.find(
      (ans) => ans.question.id === question.Test[currentQuestion].id
    );
    const index = answers.findIndex(
      (ans) => ans.question.id === question.Test[currentQuestion].id
    );

    const updatedAnswer = {
      ...currentAnswer,
      isMarkedForReview: !currentAnswer.isMarkedForReview,
      isUnattempted: false,
      question: question.Test[currentQuestion],
      time: handleCalculateTimeTakenToSolveQuestion(),
    };
    answers[index] = updatedAnswer;
    setRendring(!rendring);
  };
  const handleMarkForReviewToFalse = () => {
    const currentAnswer = answers.find(
      (ans) => ans.question.id === question.Test[currentQuestion].id
    );
    const index = answers.findIndex(
      (ans) => ans.question.id === question.Test[currentQuestion].id
    );
    const updatedAnswer = {
      ...currentAnswer,
      isMarkedForReview: !currentAnswer.isMarkedForReview,
      isUnattempted: true,
      question: question.Test[currentQuestion],
      time: handleCalculateTimeTakenToSolveQuestion(),
    };
    answers[index] = updatedAnswer;
    setRendring(!rendring);
  };

  const handleOptionChange = (option) => {
    let newAnswer;
    if (answers[currentQuestion].answer === option) {
      newAnswer = "";
    } else {
      newAnswer = option;
    }
    const updatedAnswer = {
      question: question.Test[currentQuestion],
      isMarkedForReview: false,
      isSaved: true,
      isUnattempted: false,
      answer: newAnswer,
      time: handleCalculateTimeTakenToSolveQuestion(),
    };
    updateAnswers(updatedAnswer);
  };
  const updateAnswers = (newAnswer) => {
    setMyAnswers((prevAnswers) => {
      const existingIndex = prevAnswers.findIndex(
        (ans) => ans.question.id === newAnswer.question.id
      );
      if (existingIndex !== -1) {
        const updatedAnswers = [...prevAnswers];
        updatedAnswers[existingIndex] = newAnswer;
        return updatedAnswers;
      }
      return [...prevAnswers, newAnswer];
    });
    setRendring(!rendring);
  };
  const handleTextAnswerChange = (text) => {
    updateTextAnswer({
      question: question.Test[currentQuestion],
      isMarkedForReview: false,
      isSaved: true,
      isUnattempted: false,
      answer: text,
      time: handleCalculateTimeTakenToSolveQuestion(),
    });
  };

  const updateTextAnswer = (newAnswer) => {
    setMyAnswers((prevAnswers) => {
      const existingIndex = prevAnswers.findIndex(
        (ans) => ans.question.id === newAnswer.question.id
      );
      if (existingIndex !== -1) {
        const updatedAnswers = [...prevAnswers];
        updatedAnswers[existingIndex] = newAnswer;
        return updatedAnswers;
      }
      return [...prevAnswers, newAnswer];
    });
    setRendring(!rendring);
  };
  const openFullScreen = () => {
    const element = document.documentElement;
    element
      .requestFullscreen()
      .then((result) => {})
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    dispatch(setTestStartTIme(new Date()));
    openFullScreen();
  }, []);

  const handleFindQuestionIsSetForReview = () => {
    const currentAnswer = answers.find(
      (ans) => ans.question.id === question.Test[currentQuestion].id
    );
    return currentAnswer?.isMarkedForReview;
  };
  const handleFindQuestionSaved = (option) => {
    const currentAnswer = answers.find(
      (ans) => ans.question.id === question.Test[currentQuestion].id
    );
    return currentAnswer?.answer === option;
  };

  const handleSubmitTest = () => {
    const bodyData = {
      testId: question._id,
      answers: answers,
      startTime: testStartTime,
      userId: auth.data._id,
    };
    dispatch(setAnswers(answers));
    dispatch(
      setTestOtherDetails({ startTime: testStartTime, endTime: new Date() })
    );
    PostRoute(
      "submitTest",
      () => {
        setLoader(true);
      },
      (res) => {
        console.log(res);
        navigate("/test/submit/result");
        setLoader(false);
      },
      bodyData
    );
  };

  useEffect(() => {
    if (isTimeOver) {
      toast.success("Test is over .Submitting the test.");
      handleSubmitTest();
    }
  }, [isTimeOver]);
  return (
    <>
      {isDesmosVisible && <Desmos setIsDesmosVisible={setIsDesmosVisible} />}
      {isRefSheetVisible && (
        <RefrenceSheet SetIsRefSheetVisible={SetIsRefSheetVisible} />
      )}
      {(isSubmiting || isTimeOver) && (
        <SubmitTestConfirmation
          isOpen={isSubmiting || isTimeOver}
          onClose={() => {
            setisSubmiting(!isSubmiting);
          }}
          onConfirm={handleSubmitTest}
          isCancelButtonVisible={true}
          isConfirmButtonVisible={true}
          loader={loader}
          message={"Are you sure you want to submit the test ?"}
        />
      )}
      {questionTabPreviewer && (
        <QuestionsTavPreviewer
          setQuestionTabPreviewer={setQuestionTabPreviewer}
          test={question}
          currentQuestion={currentQuestion}
          selectedQuestion={selectedQuestion}
          setCurrentQuestion={setCurrentQuestion}
          answers={answers}
        />
      )}
      <div
        className="testPlatformContainer"
        style={{ backgroundColor: "white" }}
      >
        <div className="testPlatformHeader">
          <div className="testInfo">
            <div>{question?.name}</div>
            <div>{question?.description}</div>
            <div className="testheplers">Directions</div>
          </div>
          <div className="testTimePreviewer">
            {useCountdown(timeLeft, setTimeLeft, setIsTimeOver)} s
          </div>
          <div className="testHelper">
            <div
              className="testheplers"
              onClick={() => {
                setIsDesmosVisible(true);
              }}
            >
              <div>
                <img
                  width="30"
                  height="30"
                  src="https://img.icons8.com/ios-glyphs/30/1A1A1A/calculator.png"
                  alt="calculator"
                  className="headerIcon"
                />
              </div>
              Calculator
            </div>
            <div
              className="testheplers"
              onClick={() => {
                SetIsRefSheetVisible(true);
              }}
            >
              <div>
                <img
                  width="24"
                  height="24"
                  src="https://img.icons8.com/material-rounded/24/1A1A1A/book.png"
                  alt="book"
                  className="headerIcon"
                />{" "}
              </div>
              Ref. Sheet
            </div>
          </div>
        </div>
        <div className="testPreviewer">
          {question &&
            question.Test.map((q, index) => {
              return (
                <>
                  {index === currentQuestion && (
                    <>
                      <div className="questionContainer" key={index}>
                        <div className="questionHeader">
                          <div className="questionSno">{index + 1}.</div>

                          <div className="markForReview">
                            {handleFindQuestionIsSetForReview() ? (
                              <img
                                width="20"
                                height="20"
                                src={
                                  "https://img.icons8.com/external-bearicons-glyph-bearicons/64/ff0000/external-mark-call-to-action-bearicons-glyph-bearicons.png"
                                }
                                alt="external-mark-call-to-action-bearicons-detailed-outline-bearicons"
                                onClickCapture={() => {
                                  handleMarkForReviewToFalse();
                                }}
                              />
                            ) : (
                              <img
                                width="20"
                                height="20"
                                src={
                                  "https://img.icons8.com/external-bearicons-detailed-outline-bearicons/64/1A1A1A/external-mark-call-to-action-bearicons-detailed-outline-bearicons.png"
                                }
                                alt="external-mark-call-to-action-bearicons-detailed-outline-bearicons"
                                onClickCapture={() => {
                                  handleMarkForReviewToTrue();
                                }}
                              />
                            )}
                            &nbsp;
                            {handleFindQuestionIsSetForReview()
                              ? "Marked "
                              : "Mark "}
                            for review
                          </div>
                          <div className="questionType">MCQ</div>
                        </div>
                        <div className="mainQuestionContainer">
                          {q.diagram !== "" && (
                            <div className="questionImageontainer">
                              <img
                                src={q.diagram}
                                alt="question img"
                                className="questionImage"
                              />
                            </div>
                          )}

                          <div
                            className="question"
                            style={{
                              display: "flex",
                              justifyContent: "left",
                              alignItems: "left",
                              textAlign: "left",
                            }}
                          >
                            {q.question}
                          </div>
                          <div className="optionsContainer">
                            {q.options.length > 0 ? (
                              q.options.map((option, index) => {
                                return (
                                  <div
                                    className="option"
                                    key={index}
                                    onClick={() => {
                                      if (handleFindQuestionSaved(option)) {
                                        handleOptionChange("");
                                      } else {
                                        handleOptionChange(option);
                                      }
                                    }}
                                    style={
                                      handleFindQuestionSaved(option)
                                        ? {
                                            border:
                                              "1px solid rgb(42, 120, 255)",
                                            backgroundColor:
                                              "rgb(220, 220, 239)",
                                          }
                                        : {}
                                    }
                                  >
                                    <span className="optionNo">
                                      {index === 0
                                        ? "A"
                                        : index === 1
                                        ? "B"
                                        : index === 2
                                        ? "C"
                                        : "D"}
                                    </span>
                                    <div
                                      style={{
                                        display: "flex",
                                        justifyContent: "left",
                                        alignItems: "left",
                                        textAlign: "left",
                                      }}
                                    >
                                      {option?.split(".")[1]
                                        ? option?.split(".")[1]
                                        : option}
                                    </div>
                                  </div>
                                );
                              })
                            ) : (
                              <>
                                <input
                                  placeholder="Your answer"
                                  value={answers[currentQuestion]?.answer || ""}
                                  onChange={(e) =>
                                    handleTextAnswerChange(e.target.value)
                                  }
                                ></input>
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                </>
              );
            })}
        </div>
        <div className="testPlatformFooter">
          <div className="userName" style={{ fontSize: "1.8vw" }}>
            Student Test
          </div>
          <div
            className="questionNoIdentifier"
            onClick={() => {
              setQuestionTabPreviewer(true);
            }}
          >
            Question - {currentQuestion + 1} of {question.Test.length}
          </div>
          <div className="footerButtons">
            <button
              className="nextFooterButton"
              onClick={() => {
                handlePressBackButton();
              }}
              style={currentQuestion === 0 ? { backgroundColor: "grey" } : {}}
              disabled={currentQuestion === 0}
            >
              Back
            </button>
            <button
              className="nextFooterButton"
              onClick={() => {
                if (currentQuestion + 1 < question.Test.length) {
                  handleProceede();
                } else {
                  setisSubmiting(!isSubmiting);
                }
              }}
            >
              {currentQuestion + 1 === question.Test.length ? "Submit" : "Next"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default CustomTestPlatform;
