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
import CustomInput from "../CustomInput/CustomInput";

import Swal from "sweetalert2";
import CustomModal from "../CustomModal/CustomModal";
import CustomButton from "../CustomButton/CustomButton";
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
  start,
  end,
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
              test.Test.slice(start, end).map((question, index) => {
                const actualIndex = start + index;
                return (
                  <>
                    <div
                      key={actualIndex}
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
                        setCurrentQuestion(actualIndex);
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
                      {actualIndex === currentQuestion ? (
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
const Timer = ({ setBreakPopup }) => {
  const [time, setTime] = useState(600);

  useEffect(() => {
    const interval = setInterval(() => {
      setTime((prevTime) => {
        if (prevTime <= 1) {
          setBreakPopup(false);
          clearInterval(interval);
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(interval); // cleanup on unmount
  }, []);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  return (
    <div>
      <h2>Time Left: {formatTime(time)}</h2>
    </div>
  );
};
const CustomTestPlatform = () => {
  const question = useSelector((state) => state.user.activeTest);
  const testStartTime = useSelector((state) => state.user.startTime);
  const auth = useSelector((state) => state.user.auth);
  const tester = useSelector((state) => state.user.tester);
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
  const [moduleActive, setModuleActive] = useState(1);
  const [start, setStart] = useState(0);
  const [end, setEnd] = useState(question.Test.length);

  const [breakPopup, setBreakPopup] = useState(false);

  useEffect(() => {
    if (window?.MathJax && window?.MathJax?.typesetPromise) {
      window?.MathJax?.typesetPromise();
    }
  }, [currentQuestion]);
  const handleProceede = () => {
    setStartTime(Date.now());
    setCurrentQuestion(currentQuestion + 1);
  };

  useEffect(() => {
    if (question.Flt) {
      if (isTimeOver) {
        if (moduleActive === 1) {
          setModuleActive(2);
          setCurrentQuestion(27);
          setStart(27);
          setEnd(54);
          setIsTimeOver(false);
          toast.success("Module 1 time Over.");
          return setTimeLeft(32 * 60);
        }
        if (moduleActive === 2) {
          setBreakPopup(true);
          setModuleActive(3);
          setCurrentQuestion(54);
          setStart(54);
          setEnd(76);
          setIsTimeOver(false);
          toast.success("Module 2 time Over.");
          return setTimeLeft(38 * 60);
        }
        if (moduleActive === 3) {
          setModuleActive(4);
          setCurrentQuestion(76);
          setStart(76);
          setEnd(98);
          setIsTimeOver(false);
          toast.success("Module 3 time Over.");
          return setTimeLeft(35 * 60);
        }
        if (moduleActive === 4) {
          toast.success("Time over .Submitting the test.");
          return handleSubmitTest();
        }
      }
    } else if (question.sectional === 1) {
      if (isTimeOver) {
        if (moduleActive === 3) {
          setModuleActive(4);
          setCurrentQuestion(22);
          setStart(22);
          setEnd(44);
          setIsTimeOver(false);
          toast.success("Module 1 time Over.");
          return setTimeLeft(35 * 60);
        }
        if (moduleActive === 4) {
          toast.success("Time over .Submitting the test.");
          return handleSubmitTest();
        }
      }
    } else if (question.sectional === 2) {
      if (isTimeOver) {
        if (moduleActive === 1) {
          setModuleActive(2);
          setCurrentQuestion(27);
          setStart(27);
          setEnd(54);
          setIsTimeOver(false);
          toast.success("Module 1 time Over.");
          return setTimeLeft(32 * 60);
        }
        if (moduleActive === 4) {
          toast.success("Time over .Submitting the test.");
          return handleSubmitTest();
        }
      }
    } else if (!question.Flt && question.sectional === 0) {
      if (isTimeOver) {
        toast.success("Test is over .Submitting the test.");
        return handleSubmitTest();
      }
    }
  }, [isTimeOver]);

  useEffect(() => {
    if (question.Flt) {
      if (currentQuestion === 0) {
        setStart(0);
        setEnd(27);
        setTimeLeft(32 * 60);
        return setModuleActive(1);
      }
      if (currentQuestion === 27) {
        setStart(27);
        setEnd(54);
        if (moduleActive === 1) setTimeLeft(32 * 60);

        return setModuleActive(2);
      }
      if (currentQuestion === 54) {
        if (moduleActive === 2) setBreakPopup(true);
        setStart(54);
        setEnd(76);
        if (moduleActive === 2) setTimeLeft(45 * 60);
        return setModuleActive(3);
      }
      if (currentQuestion === 76) {
        setStart(76);
        setEnd(98);
        if (moduleActive === 3) setTimeLeft(35 * 60);
        return setModuleActive(4);
      }
    } else if (question.sectional === 1) {
      if (currentQuestion === 0) {
        setStart(0);
        setEnd(22);
        setTimeLeft(35 * 60);
        return setModuleActive(3);
      }
      if (currentQuestion === 22) {
        setStart(22);
        setEnd(44);
        if (moduleActive === 3) setTimeLeft(35 * 60);
        return setModuleActive(4);
      }
    } else if (question.sectional === 2) {
      if (currentQuestion === 0) {
        setStart(0);
        setEnd(27);
        setTimeLeft(32 * 60);
        return setModuleActive(1);
      }
      if (currentQuestion === 27) {
        setStart(27);
        setEnd(54);
        if (moduleActive === 1) setTimeLeft(32 * 60);

        return setModuleActive(2);
      }
    }
  }, [currentQuestion, question.Flt, question.sectional]);

  const splitToModules = () => {
    if (moduleActive === 1) {
      return <div className="module">Module 1 English</div>;
    }
    if (moduleActive === 2) {
      return <div className="module">Module 2 English</div>;
    }
    if (moduleActive === 3) {
      return <div className="module">Module 1 Maths</div>;
    }
    if (moduleActive === 4) {
      return <div className="module">Module 2 Maths</div>;
    }
  };
  // const handlePressBackButton = () => {
  //   setStartTime(Date.now());
  //   setCurrentQuestion(currentQuestion - 1);
  // };
  const handlePressBackButton = () => {
    let minQuestion = 0;
    if (question.Flt) {
      console.log({
        currentQuestion,
        minQuestion,
        isFLT: question.isFLT,
        sectional: question.sectional,
        moduleActive,
      });

      if (moduleActive === 1) {
        minQuestion = 0;
      } else if (moduleActive === 2) {
        minQuestion = 27;
      } else if (moduleActive === 3) {
        minQuestion = 54;
      } else if (moduleActive === 4) {
        minQuestion = 76;
      }
    } else if (question.sectional === 1) {
      console.log("....");
      if (moduleActive === 3) {
        minQuestion = 0;
      } else if (moduleActive === 4) {
        minQuestion = 22;
      }
    } else if (question.sectional === 2) {
      console.log("////");
      if (moduleActive === 1) {
        minQuestion = 0;
      } else if (moduleActive === 2) {
        minQuestion = 27;
      }
    }
    if (Number(currentQuestion) > minQuestion) {
      setStartTime(Date.now());
      setCurrentQuestion(currentQuestion - 1);
    }
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

  // const handleCalculateTimeTakenToSolveQuestion = () => {
  //   const diffInMs = Math.abs(startTime - new Date());
  //   const diffInMinutes = Math.floor(
  //     (diffInMs % (1000 * 60 * 60)) / (1000 * 60)
  //   );
  //   const diffInSeconds = Math.floor((diffInMs % (1000 * 60)) / 1000);

  //   return `${diffInMinutes}:${diffInSeconds}`;
  // };

  const handleCalculateTimeTakenToSolveQuestion = () => {
    const now = Date.now(); // ms since epoch
    const diffInMs = now - startTime; // difference in ms

    const totalSeconds = Math.floor(diffInMs / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;

    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
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
      isUnattempted: currentAnswer.isSaved?false:true,
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
      isSaved: option === "" ? false : true,
      isUnattempted: option === "" ? true : false,
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
    // if (tester === "admin") {
    //   navigate("/test/submit/result");
    //  return setLoader(false);
    // }
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

  return (
    <>
      {breakPopup && (
        <CustomModal>
          <div className="header">BREAK</div>
          <div className="header">
            A 10 minutes break is provided before the starting of the next
            module. You can skip the break by clicking the button and continue
            the test.
          </div>
          <div className="header">
            <Timer setBreakPopup={setBreakPopup} />
          </div>
          <CustomButton
            text={"SKIP"}
            handleClick={() => {
              setBreakPopup(false);
              setModuleActive(3);
              setStart(54);
              setEnd(76);
              setTimeLeft(35 * 60);
            }}
          />
        </CustomModal>
      )}
      {isDesmosVisible && <Desmos setIsDesmosVisible={setIsDesmosVisible} />}
      {isRefSheetVisible && (
        <RefrenceSheet SetIsRefSheetVisible={SetIsRefSheetVisible} />
      )}
      {(isSubmiting || isTimeOver) && question?.Flt && moduleActive === 4 && (
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
      {(isSubmiting || isTimeOver) && !question?.Flt && (
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
          start={start}
          end={end}
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
            {question.sectional !== 2 && (
              <div
                className="testheplers"
                onClick={() => {
                  setIsDesmosVisible(true);
                }}
              >
                <div style={{ marginLeft: "27%" }}>
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
            )}

            <div
              className="testheplers"
              onClick={() => {
                SetIsRefSheetVisible(true);
              }}
            >
              <div style={{ marginLeft: "23%" }}>
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
                        {(question.Flt || question.sectional !== 0) &&
                          splitToModules()}
                        <div className="questionHeader">
                          <div className="questionSno">
                            {question.Flt ? (
                              <>{index + 1 - start}.</>
                            ) : question.sectional === 1 ? (
                              <>{index + 1 - start}.</>
                            ) : question.sectional === 2 ? (
                              <>{index + 1 - start}.</>
                            ) : (
                              <>{index + 1}.</>
                            )}
                          </div>

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
                          {q?.diagram && q.diagram !== "" && (
                            <div className="questionImageontainer">
                              <img
                                src={q.diagram}
                                alt="question img"
                                className="questionImage"
                              />
                            </div>
                          )}
                          {q.passage !== "" && (
                            <div
                              className="question"
                              style={{
                                justifyContent: "left",
                                alignItems: "left",
                                textAlign: "left",
                              }}
                            >
                              <div>
                                <span style={{ fontWeight: "bolder" }}>
                                  Passage
                                </span>{" "}
                                <br />
                                <span
                                  dangerouslySetInnerHTML={{
                                    __html: q.passage,
                                  }}
                                ></span>
                                {/* {q.passage} */}
                              </div>
                            </div>
                          )}

                          <div
                            className="question"
                            style={{
                              display: "block",
                              justifyContent: "left",
                              alignItems: "left",
                              textAlign: "left",
                            }}
                          >
                            <span style={{ fontWeight: "bolder" }}>
                              {q.passage !== "" ? "Question" : ``}
                              {q.passage !== "" ? <br /> : ""}
                            </span>
                            <span
                              dangerouslySetInnerHTML={{
                                __html: q.question,
                              }}
                            ></span>
                            {/* {q.question} */}
                          </div>
                          <div className="optionsContainer">
                            {q.options.length > 0 && q.type === "objective" ? (
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
                                      {option.replace(
                                        index === 0
                                          ? "A. "
                                          : index === 1
                                          ? "B. "
                                          : index === 2
                                          ? "C. "
                                          : "D. ",
                                        ""
                                      )}
                                    </div>
                                  </div>
                                );
                              })
                            ) : (
                              <>
                                <CustomInput
                                  placeholder={"Enter Your Answer Here"}
                                  value={answers[currentQuestion]?.answer || ""}
                                  handleInputChange={(e) =>
                                    handleTextAnswerChange(e.target.value)
                                  }
                                />
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
            style={{ cursor: "pointer" }}
            className="questionNoIdentifier"
            onClick={() => {
              setQuestionTabPreviewer(true);
            }}
          >
            {question.Flt ? (
              <div>
                Question - {currentQuestion - start + 1} of {end - start}
              </div>
            ) : question.sectional === 1 ? (
              <div>
                Question - {currentQuestion - start + 1} of {end - start}
              </div>
            ) : question.sectional === 2 ? (
              <div>
                Question - {currentQuestion - start + 1} of {end - start}
              </div>
            ) : (
              <div>
                Question - {currentQuestion + 1} of {question.Test.length}
              </div>
            )}
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
