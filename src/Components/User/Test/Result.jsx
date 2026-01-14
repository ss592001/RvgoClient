import React, { useEffect, useState } from "react";

import "./Test.css";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import CustomButton from "../../CustomComponents/CustomButton/CustomButton";
import { useMediaQuery } from "../../Custom_hooks/Custom";
import CustomInput from "Components/CustomComponents/CustomInput/CustomInput";
import CustomRadio from "Components/CustomComponents/CustomButton/CustomRadio";
const Result = () => {
  const isMobile = useMediaQuery("(max-width:430px)");
  const navigate = useNavigate();
  const answers = useSelector((state) => state.user.answers);
  const test = useSelector((state) => state.user.activeTest);
  const auth = useSelector((state) => state.user.auth);
  const testTimings = useSelector((state) => state.user.testOtherDetails);
  const [activeModule, setActiveModule] = useState(
    test.isFLT ? 1 : test.sectional === 1 ? 3 : 1
  );
  const [start, setStart] = useState(0);
  const [end, setEnd] = useState(
    test.Flt
      ? 27
      : test.sectional === 1
      ? 22
      : test.sectional === 2
      ? 27
      : test.Test.length
  );

  const handleManageModule = (module) => {
    // if (module === 1) {
    //   setStart(0);
    //   return setEnd(27);
    // } else if (module === 2) {
    //   setStart(27);
    //   return setEnd(54);
    // } else if (module === 3) {
    //   setStart(54);
    //   return setEnd(76);
    // } else if (module === 4) {
    //   setStart(76);
    //   return setEnd(98);
    // }
    if (!test.Flt) {
      if (test.sectional === 1) {
        if (module === 3) {
          setStart(0);
          return setEnd(22);
        } else if (module === 4) {
          setStart(22);
          return setEnd(44);
        }
      } else if (test.sectional === 2) {
        if (module === 1) {
          setStart(0);
          return setEnd(27);
        } else if (module === 2) {
          setStart(27);
          return setEnd(54);
        }
      }
    } else {
      if (module === 1) {
        setStart(0);
        return setEnd(27);
      } else if (module === 2) {
        setStart(27);
        return setEnd(54);
      } else if (module === 3) {
        setStart(54);
        return setEnd(76);
      } else if (module === 4) {
        setStart(76);
        return setEnd(98);
      }
    }
  };

  console.log("answers", answers);
  const closeFullScreen = () => {
    if (document.fullscreenElement) {
      document
        .exitFullscreen()
        .then(() => {
          console.log("Exited full screen");
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  useEffect(() => {
    if (auth === null) {
      return navigate("/auth");
    }
    closeFullScreen();
  }, [auth, navigate]);

  const handleBackNavigation = () => {
    if (auth.type === "admin") {
      return navigate("/admin/access/users", {
        state: {},
      });
    }
    navigate("/test/practice", {
      state: { filter: "English Writing Practice" },
    });
  };
  const handleGetQuestionsCount = (type) => {
    const filteredAnswers = answers.filter((ans, index) => ans[type] === true);
    return filteredAnswers.length;
  };
  const handleGetQuestionsCountModuleWise = (type, start, end) => {
    const filteredAnswers = answers
      .slice(start, end)
      .filter((ans, index) => ans[type] === true);
    return filteredAnswers.length;
  };
  const handleGetQuestionsCountEng = (type) => {
    const filteredAnswers = answers
      .slice(0, 54)
      .filter((ans, index) => ans[type] === true);
    return filteredAnswers.length;
  };
  const handleGetQuestionsCountMaths = (type) => {
    const filteredAnswers = answers
      .slice(54, 98)
      .filter((ans, index) => ans[type] === true);
    return filteredAnswers.length;
  };
  const handleFindCorrectAnswersModuleWise = (start, end) => {
    const filteredAnswers = answers
      .slice(start, end)
      .filter(
        (ans, index) =>
          (ans.answer.split(".")[0] === ans.question.answer &&
            ans.isSaved === true) ||
          (ans.answer.split(".")[0] === ans.question.answer &&
            ans.isMarkedForReview === true) ||
          (ans.answer === ans.question.answer &&
            ans.isMarkedForReview === true) ||
          (ans.answer === ans.question.answer && ans.isSaved === true)
      );
    return filteredAnswers.length;
  };
  // const handleFindCorrectAnswers = () => {
  //   const filteredAnswers = answers.filter(
  //     (ans, index) =>
  //       (ans.answer.split(".")[0] === ans.question.answer &&
  //         ans.isSaved === true) ||
  //       (ans.answer.split(".")[0] === ans.question.answer &&
  //         ans.isMarkedForReview === true) ||
  //       (ans.answer === ans.question.answer &&
  //         ans.isMarkedForReview === true) ||
  //       (ans.answer === ans.question.answer && ans.isSaved === true)
  //   );
  //   return filteredAnswers.length;
  // };

  // const handleFindInCorrectAnswers = () => {
  //   const filteredAnswers = answers.filter((ans, index) => {
  //     if (ans.question.type === "objective") {
  //       return (
  //         (ans.answer.split(".")[0] !== ans.question.answer &&
  //           ans.isSaved === true) ||
  //         (ans.answer.split(".")[0] !== ans.question.answer &&
  //           ans.isMarkedForReview === true)
  //       );
  //     } else {
  //       return (
  //         (ans.answer !== ans.question.answer &&
  //           ans.isMarkedForReview === true) ||
  //         (ans.answer !== ans.question.answer && ans.isSaved === true)
  //       );
  //     }
  //   });
  //   return filteredAnswers.length;
  // };
  // Helper: returns normalized key for comparison
const getAnswerKey = (answer, questionType) => {
  if (!answer && answer !== "") return ""; // guard

  const str = String(answer).trim();

  if (questionType === "objective") {
    // Return the letter part before the first '.' if present,
    // otherwise return the full trimmed string (handles "C" or "C. text")
    return str.split(".")[0].trim();
  } else {
    // For non-objective (subjective / descriptive) compare full text
    return str;
  }
};

const wasSavedOrMarked = (ans) => ans.isSaved === true || ans.isMarkedForReview === true;

// Count correct answers
const handleFindCorrectAnswers = () => {
  const filtered = answers.filter((ans) => {
    if (!wasSavedOrMarked(ans)) return false;

    const qType = ans.question?.type || "objective"; // fallback
    const leftKey = getAnswerKey(ans.answer, qType);
    const rightKey = getAnswerKey(ans.question?.answer, qType);

    // For objective we compare option letters, for others full text
    return leftKey === rightKey;
  });

  return filtered.length;
};

// Count incorrect answers
const handleFindInCorrectAnswers = () => {
  const filtered = answers.filter((ans) => {
    if (!wasSavedOrMarked(ans)) return false;

    const qType = ans.question?.type || "objective";
    const leftKey = getAnswerKey(ans.answer, qType);
    const rightKey = getAnswerKey(ans.question?.answer, qType);

    // If either side empty/invalid, treat as not equal (incorrect)
    return leftKey !== rightKey;
  });

  return filtered.length;
};


  const handleFindInCorrectAnswersModuleWise = (start, end) => {
    const filteredAnswers = answers.slice(start, end).filter((ans, index) => {
      if (ans.question.type === "objective") {
        return (
          (ans.answer.split(".")[0] !== ans.question.answer &&
            ans.isSaved === true) ||
          (ans.answer.split(".")[0] !== ans.question.answer &&
            ans.isMarkedForReview === true)
        );
      } else {
        return (
          (ans.answer !== ans.question.answer &&
            ans.isMarkedForReview === true) ||
          (ans.answer !== ans.question.answer && ans.isSaved === true)
        );
      }
    });
    return filteredAnswers.length;
  };

  const handleFindAccuracy = () => {
    const correctAnswers = handleFindCorrectAnswers();
    const totalQuestions = test?.Test.length;
    return ((correctAnswers / totalQuestions) * 100).toFixed();
  };

  const handleFindTimeTaken = (question) => {
    const answer = answers.findIndex(
      (ans, index) => ans.question.id === question.id
    );
    return answers[answer].time;
  };

  const handleFindIsUnattempted = (question) => {
    const answer = answers.findIndex(
      (ans, index) => ans.question.id === question.id
    );
    return answers[answer]?.isUnattempted;
  };

  const handleFindIsQuestionSaved = (question) => {
    const answer = answers.findIndex(
      (ans, index) => ans.question.id === question.id
    );
    return answers[answer].isSaved;
  };
  const handleFindIsMarkedForReview = (question) => {
    const answer = answers.findIndex(
      (ans, index) => ans.question.id === question.id
    );
    return answers[answer].isMarkedForReview;
  };

  const handleFindIsAnswerCorrect = (question) => {
    const ans = answers.find((ans, index) => ans.question.id === question.id);
    return question.type !== "subjective"
      ? ans.answer.split(".")[0] === question.answer
      : ans.answer === question.answer;
  };

  const handleFindIsAnswerInCorrect = (question) => {
    const ans = answers.find((ans, index) => ans.question.id === question.id);
    return question.type !== "subjective"
      ? ans.answer.split(".")[0] !== question.answer
      : ans.answer !== question.answer;
  };

  const findTotalUnattemptedQUestions = (type) => {
    const filteredAnswers = answers.filter((ans, index) => ans[type] === true);
    return filteredAnswers.length - test?.Test.length;
  };
  const findTotalQuestionsForReview = (type) => {
    const filteredAnswers = answers.filter(
      (ans, index) => ans[type] === true && ans.isSaved !== true
    );
    return filteredAnswers.length;
  };
  const findTotalQuestionsForReviewModuleWise = (type, start, end) => {
    const filteredAnswers = answers
      .slice(start, end)
      .filter((ans, index) => ans[type] === true && ans.isSaved !== true);
    return filteredAnswers.length;
  };
  const calculateTimeDifference = () => {
    const start = new Date(testTimings?.startTime);
    const end = new Date(testTimings?.endTime);

    // Calculate the difference in milliseconds
    const difference = Math.abs(end - start);

    // Convert the difference to seconds
    const totalSeconds = Math.floor(difference / 1000);

    // Calculate minutes and seconds
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;

    // Format as mm:ss
    const formattedTime = `${String(minutes).padStart(2, "0")}:${String(
      seconds
    ).padStart(2, "0")}`;

    return formattedTime;
  };
  const handleIsSubjectiveCorrect = (question) => {
    const ans = answers.find((ans, index) => ans.question.id === question.id);
    return ans.answer === question.answer;
  };
  useEffect(() => {
    if (window?.MathJax && window?.MathJax?.typesetPromise) {
      window?.MathJax?.typesetPromise();
    }
  }, [activeModule]);
  const findIsAnswerCorrectCondition2 = (
    studentAnswer,
    options,
    realAnswer
  ) => {
    const mappedAnswer =
      realAnswer === "A"
        ? 0
        : realAnswer === "B"
        ? 1
        : realAnswer === "C"
        ? 2
        : 3;
    const mappedAnswerValue = options[mappedAnswer];
    return mappedAnswerValue === studentAnswer;
  };

  const getOptionStyle = (q, option, answers) => {
    const isCorrect = q.answer === option.split(".")[0];
    const isSelected = answers.some(
      (_ans) => _ans.answer === option && _ans.question.id === q.id
    );
    const isIncorrectSelection =
      isSelected &&
      !answers.some(
        (_ans) =>
          _ans.answer.split(".")[0] === q.answer && _ans.question.id === q.id
      );
    const hasIncorrectSelection = answers.some(
      (_ans) =>
        _ans.answer.split(".")[0] !== q.answer && _ans.question.id === q.id
    );
    const isCorrectAnswer = q.answer === option;

    if (isCorrect) {
      return {
        border: "1px solid green",
        backgroundColor: "rgb(221, 250, 221)",
      };
    }

    if (isIncorrectSelection) {
      return {
        border: "1.2px solid red",
        backgroundColor: "rgb(255, 214, 214)",
      };
    }

    if (isCorrectAnswer && hasIncorrectSelection) {
      return {
        border: "2px solid blue",
        backgroundColor: "rgb(200, 230, 255)",
      };
    }

    return {};
  };
  return (
    <>
      <div style={{ backgroundColor: "rgb(250, 253, 255)", zIndex: -1 }}>
        <div className="resultHeader">
          <img
            width="40"
            height="40"
            style={{ cursor: "pointer" }}
            onClick={handleBackNavigation}
            src="https://img.icons8.com/ios-filled/50/circled-left-2.png"
            alt="circled-left-2"
          />
          <span style={{ fontSize: isMobile ? "6vw" : "" }}>RVGO</span>
        </div>
        <div className="resultPreviewer" style={{ display: "inline-block" }}>
          <div className="testInfoContainer">
            <div className="profileIcon">{"S"}</div>
            <div className="testInfo">
              <div className="userName" style={{ width: "100%" }}>
                {"Student Test Analysis"}
              </div>
              <div className="testName">{test?.name}</div>
              <div className="testDesc">{test?.description}</div>
              <div className="testType">{test?.type} Test</div>
            </div>
          </div>
          <div className="testOverview">Overall Score</div>
          <div className="testDescriber1">
            <div
              className="describer1 leftRadiusProvider"
              style={{ backgroundColor: " #333f6b", color: "white" }}
            >
              <div>Total Questions</div>
              <div
                style={{
                  fontWeight: "bolder",
                  fontSize: !isMobile ? "1.5vw" : "4vw",
                }}
              >
                {handleGetQuestionsCount("isSaved") +
                  findTotalQuestionsForReview("isMarkedForReview")}
                / {test?.Test.length}
              </div>
            </div>
            <div className="describer1">
              <div>
                {test.Flt ? (
                  <>Reading and Writing</>
                ) : (
                  <>Total Questions Attempted</>
                )}{" "}
              </div>
              <div
                style={{
                  fontWeight: "bolder",
                  fontSize: !isMobile ? "1.5vw" : "4vw",
                }}
              >
                {test.Flt ? (
                  <>{handleGetQuestionsCountEng("isSaved")} / 54</>
                ) : (
                  <>
                    {handleGetQuestionsCount("isSaved")} / {test?.Test.length}
                  </>
                )}
              </div>
            </div>
            <div className="describer1">
              <div>
                {test.Flt ? <>Maths</> : <>Total Unattempted Questions</>}{" "}
              </div>
              <div
                style={{
                  fontWeight: "bolder",
                  fontSize: !isMobile ? "1.5vw" : "4vw",
                }}
              >
                {test.Flt ? (
                  <> {handleGetQuestionsCountMaths("isSaved")} / 44</>
                ) : (
                  <>
                    {" "}
                    {test.Test.length -
                      handleGetQuestionsCount("isSaved") -
                      findTotalQuestionsForReview("isMarkedForReview")}
                    / {test?.Test.length}
                  </>
                )}
              </div>
            </div>
            <div className="describer1 rightRadiusProvider">
              <div>Marked For Review </div>
              <div
                style={{
                  fontWeight: "bolder",
                  fontSize: !isMobile ? "1.5vw" : "4vw",
                }}
              >
                {handleGetQuestionsCount("isMarkedForReview")} /{" "}
                {test?.Test.length}
              </div>
            </div>
          </div>
          <div className="testOverview">Questions Overview</div>

          <div className="testDescriber">
            <div className="describer overviewer leftRadiusProvider">
              <div
                style={{
                  marginTop: isMobile ? "-28%" : "-10%",
                  marginBottom: 0,
                  marginLeft: isMobile ? "10%" : "38%",
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  x="0px"
                  y="0px"
                  width="50"
                  height="50"
                  viewBox="0,0,300,150"
                  style={{ fill: "#40C057" }}
                >
                  <g>
                    <g transform="scale(3.55556,3.55556)">
                      <path d="M36,12c-13.25,0 -24,10.75 -24,24c0,13.25 10.75,24 24,24c13.25,0 24,-10.75 24,-24c0,-2.59 -0.40969,-5.08016 -1.17969,-7.41016l-7.29102,11.26953c-0.023,0.093 -0.04727,0.1863 -0.07227,0.2793c-1.817,6.829 -8.04803,11.86133 -15.45703,11.86133c-8.84,0 -16,-7.16 -16,-16c0,-8.84 7.16,-16 16,-16c2.54,0 4.94031,0.59062 7.07031,1.64063l4.35938,-6.74023c-3.4,-1.85 -7.28969,-2.90039 -11.42969,-2.90039zM53.12109,17.12695c-1.44433,0.02869 -2.84898,0.75031 -3.69336,2.05469l-10.27344,15.87695l-5.1875,-5.94727c-1.634,-1.874 -4.47861,-2.06564 -6.34961,-0.43164c-1.873,1.634 -2.06564,4.47566 -0.43164,6.34766l9.11328,10.44531c0.858,0.983 2.09562,1.54297 3.39063,1.54297c0.107,0 0.21331,-0.00472 0.32031,-0.01172c1.409,-0.101 2.68903,-0.85597 3.45703,-2.04297l13.51758,-20.89063c1.35,-2.086 0.75302,-4.87166 -1.33398,-6.22266c-0.7815,-0.50587 -1.6627,-0.73792 -2.5293,-0.7207z"></path>
                    </g>
                  </g>
                </svg>
              </div>
              <div className="describerText">
                {handleFindCorrectAnswers()} Correct
              </div>
            </div>
            <div className="describer overviewer">
              <div
                style={{
                  marginTop: isMobile ? "-30%" : "-10%",
                  marginLeft: isMobile ? "20%" : "40%",
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  x="0px"
                  y="0px"
                  width="38"
                  height="50"
                  viewBox="0,0,300,150"
                  style={{ fill: "#ff000d" }}
                >
                  <g>
                    <g transform="scale(5.12,5.12)">
                      <path d="M25,2c-12.681,0 -23,10.319 -23,23c0,12.681 10.319,23 23,23c12.681,0 23,-10.319 23,-23c0,-12.681 -10.319,-23 -23,-23zM33.71,32.29c0.39,0.39 0.39,1.03 0,1.42c-0.2,0.19 -0.45,0.29 -0.71,0.29c-0.26,0 -0.51,-0.1 -0.71,-0.29l-7.29,-7.29l-7.29,7.29c-0.2,0.19 -0.45,0.29 -0.71,0.29c-0.26,0 -0.51,-0.1 -0.71,-0.29c-0.39,-0.39 -0.39,-1.03 0,-1.42l7.29,-7.29l-7.29,-7.29c-0.39,-0.39 -0.39,-1.03 0,-1.42c0.39,-0.39 1.03,-0.39 1.42,0l7.29,7.29l7.29,-7.29c0.39,-0.39 1.03,-0.39 1.42,0c0.39,0.39 0.39,1.03 0,1.42l-7.29,7.29z"></path>
                    </g>
                  </g>
                </svg>
              </div>
              <div className="describerText">
                {
                  handleFindInCorrectAnswers()
                  - findTotalQuestionsForReview("isMarkedForReview")
                }{" "}
                Incorrect
              </div>
            </div>
            <div className="describer overviewer">
              <div
                style={{
                  marginBottom: "3%",
                  marginLeft: isMobile ? "17%" : "40%",
                }}
              >
                <img
                  width="35"
                  height="35"
                  src="https://img.icons8.com/ios-filled/50/ff000d/empty_1.png"
                  alt="empty_1"
                />
              </div>
              <div className="describerText">
                {test.Test.length -
                  handleGetQuestionsCount("isSaved") -
                  findTotalQuestionsForReview("isMarkedForReview")}{" "}
                Omitted
              </div>
            </div>
            <div className="describer overviewer">
              <div
                style={{
                  marginBottom: "3%",
                  marginLeft: isMobile ? "17%" : "40%",
                }}
              >
                <img
                  width="35"
                  height="35"
                  src="https://img.icons8.com/fluency/48/bill.png"
                  alt="bill"
                />
              </div>
              <div className="describerText">Total - {test?.Test.length} </div>
            </div>
            <div className="describer overviewer">
              <div
                style={{
                  marginBottom: "3%",
                  marginLeft: isMobile ? "17%" : "40%",
                }}
              >
                <img
                  width="35"
                  height="35"
                  src="https://img.icons8.com/fluency/48/accuracy.png"
                  alt="accuracy"
                />
              </div>
              <div className="describerText">
                {handleFindAccuracy()}% Accuracy{" "}
              </div>
            </div>
            <div className="describer overviewer rightRadiusProvider">
              <div
                style={{
                  marginBottom: "3%",
                  marginLeft: isMobile ? "15%" : "36%",
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  x="0px"
                  y="0px"
                  width="35"
                  height="35"
                  viewBox="0 0 30 30"
                >
                  <path d="M15,3C8.373,3,3,8.373,3,15c0,6.627,5.373,12,12,12s12-5.373,12-12C27,8.373,21.627,3,15,3z M16,16H7.995 C7.445,16,7,15.555,7,15.005v-0.011C7,14.445,7.445,14,7.995,14H14V5.995C14,5.445,14.445,5,14.995,5h0.011 C15.555,5,16,5.445,16,5.995V16z"></path>
                </svg>
              </div>
              <div className="describerText">{calculateTimeDifference()} s</div>
            </div>
          </div>
          {test.Flt && !isMobile && (
            <>
              {" "}
              <div className="testOverview">Section Overview</div>
              <div className="sectionContainer">
                <div className="testDescriber1 sectionOverFlow">
                  <div className="describer1 sectionOverviewCell widthCell sectionTableHeader">
                    Section and Module
                  </div>
                  <div className="describer1 sectionOverviewCell sectionTableHeader ">
                    Correct
                  </div>
                  <div className="describer1 sectionOverviewCell sectionTableHeader">
                    Incorrect
                  </div>
                  <div className="describer1 sectionOverviewCell sectionTableHeader">
                    Omitted
                  </div>
                  <div className="describer1 sectionOverviewCell sectionTableHeader">
                    For Review
                  </div>
                  <div className="describer1 sectionOverviewCell sectionTableHeader">
                    Score
                  </div>
                  <div className="describer1 sectionOverviewCell sectionTableHeader">
                    Accuracy
                  </div>
                </div>
                <div className="testDescriber1">
                  <div
                    className={`describer1 sectionOverviewCell widthCell ${
                      activeModule === 1 && "highlightModule"
                    }`}
                  >
                    Section 1,Module 1 : Reading & Writing
                  </div>
                  <div
                    className={`describer1 sectionOverviewCell ${
                      activeModule === 1 && "highlightModule"
                    }`}
                  >
                    {handleFindCorrectAnswersModuleWise(0, 27)}
                  </div>
                  <div
                    className={`describer1 sectionOverviewCell ${
                      activeModule === 1 && "highlightModule"
                    }`}
                  >
                    {handleFindInCorrectAnswersModuleWise(0, 27) -
                      findTotalQuestionsForReviewModuleWise(
                        "isMarkedForReview",
                        0,
                        27
                      )}
                  </div>
                  <div
                    className={`describer1 sectionOverviewCell ${
                      activeModule === 1 && "highlightModule"
                    }`}
                  >
                    {27 -
                      findTotalQuestionsForReviewModuleWise(
                        "isMarkedForReview",
                        0,
                        27
                      ) -
                      handleGetQuestionsCountModuleWise("isSaved", 0, 27)}
                  </div>
                  <div
                    className={`describer1 sectionOverviewCell ${
                      activeModule === 1 && "highlightModule"
                    }`}
                  >
                    {findTotalQuestionsForReviewModuleWise(
                      "isMarkedForReview",
                      0,
                      27
                    )}
                  </div>
                  <div
                    className={`describer1 sectionOverviewCell ${
                      activeModule === 1 && "highlightModule"
                    }`}
                  >
                    {handleFindCorrectAnswersModuleWise(0, 27)}/27
                  </div>
                  <div
                    className={`describer1 sectionOverviewCell ${
                      activeModule === 1 && "highlightModule"
                    }`}
                  >
                    {" "}
                    {(
                      (handleFindCorrectAnswersModuleWise(0, 27) / 27) *
                      100
                    ).toFixed(1)}
                    %
                  </div>
                </div>
                <div className="testDescriber1">
                  <div
                    className={`describer1 sectionOverviewCell widthCell ${
                      activeModule === 2 && "highlightModule"
                    }`}
                  >
                    Section 1,Module 2 : Reading & Writing
                  </div>
                  <div
                    className={`describer1 sectionOverviewCell ${
                      activeModule === 2 && "highlightModule"
                    }`}
                  >
                    {handleFindCorrectAnswersModuleWise(27, 54)}
                  </div>
                  <div
                    className={`describer1 sectionOverviewCell ${
                      activeModule === 2 && "highlightModule"
                    }`}
                  >
                    {handleFindInCorrectAnswersModuleWise(27, 54) -
                      findTotalQuestionsForReviewModuleWise(
                        "isMarkedForReview",
                        27,
                        54
                      )}
                  </div>
                  <div
                    className={`describer1 sectionOverviewCell ${
                      activeModule === 2 && "highlightModule"
                    }`}
                  >
                    {" "}
                    {27 -
                      findTotalQuestionsForReviewModuleWise(
                        "isMarkedForReview",
                        27,
                        54
                      ) -
                      handleGetQuestionsCountModuleWise("isSaved", 27, 54)}
                  </div>
                  <div
                    className={`describer1 sectionOverviewCell ${
                      activeModule === 2 && "highlightModule"
                    }`}
                  >
                    {findTotalQuestionsForReviewModuleWise(
                      "isMarkedForReview",
                      27,
                      54
                    )}
                  </div>

                  <div
                    className={`describer1 sectionOverviewCell ${
                      activeModule === 2 && "highlightModule"
                    }`}
                  >
                    {handleFindCorrectAnswersModuleWise(27, 54)}/27
                  </div>
                  <div
                    className={`describer1 sectionOverviewCell ${
                      activeModule === 2 && "highlightModule"
                    }`}
                  >
                    {" "}
                    {(
                      (handleFindCorrectAnswersModuleWise(27, 54) / 27) *
                      100
                    ).toFixed(1)}
                    %
                  </div>
                </div>
                <div className="testDescriber1">
                  <div
                    className={`describer1 sectionOverviewCell widthCell ${
                      activeModule === 3 && "highlightModule"
                    }`}
                  >
                    Section 2,Module 1 : Maths
                  </div>
                  <div
                    className={`describer1 sectionOverviewCell ${
                      activeModule === 3 && "highlightModule"
                    }`}
                  >
                    {handleFindCorrectAnswersModuleWise(54, 76)}
                  </div>
                  <div
                    className={`describer1 sectionOverviewCell ${
                      activeModule === 3 && "highlightModule"
                    }`}
                  >
                    {" "}
                    {handleFindInCorrectAnswersModuleWise(54, 76) -
                      findTotalQuestionsForReviewModuleWise(
                        "isMarkedForReview",
                        54,
                        76
                      )}
                  </div>
                  <div
                    className={`describer1 sectionOverviewCell ${
                      activeModule === 3 && "highlightModule"
                    }`}
                  >
                    {" "}
                    {22 -
                      findTotalQuestionsForReviewModuleWise(
                        "isMarkedForReview",
                        54,
                        76
                      ) -
                      handleGetQuestionsCountModuleWise("isSaved", 54, 76)}
                  </div>
                  <div
                    className={`describer1 sectionOverviewCell ${
                      activeModule === 3 && "highlightModule"
                    }`}
                  >
                    {findTotalQuestionsForReviewModuleWise(
                      "isMarkedForReview",
                      54,
                      76
                    )}
                  </div>
                  <div
                    className={`describer1 sectionOverviewCell ${
                      activeModule === 3 && "highlightModule"
                    }`}
                  >
                    {handleFindCorrectAnswersModuleWise(54, 76)}/22
                  </div>
                  <div
                    className={`describer1 sectionOverviewCell ${
                      activeModule === 3 && "highlightModule"
                    }`}
                  >
                    {" "}
                    {(
                      (handleFindCorrectAnswersModuleWise(54, 76) / 22) *
                      100
                    ).toFixed(1)}
                    %
                  </div>
                </div>
                <div className="testDescriber1">
                  <div
                    className={`describer1 sectionOverviewCell widthCell ${
                      activeModule === 4 && "highlightModule"
                    }`}
                  >
                    Section 2,Module 2 : Maths
                  </div>
                  <div
                    className={`describer1 sectionOverviewCell ${
                      activeModule === 4 && "highlightModule"
                    }`}
                  >
                    {handleFindCorrectAnswersModuleWise(76, 98)}
                  </div>
                  <div
                    className={`describer1 sectionOverviewCell ${
                      activeModule === 4 && "highlightModule"
                    }`}
                  >
                    {" "}
                    {handleFindInCorrectAnswersModuleWise(76, 98) -
                      findTotalQuestionsForReviewModuleWise(
                        "isMarkedForReview",
                        76,
                        98
                      )}
                  </div>
                  <div
                    className={`describer1 sectionOverviewCell ${
                      activeModule === 4 && "highlightModule"
                    }`}
                  >
                    {" "}
                    {22 -
                      findTotalQuestionsForReviewModuleWise(
                        "isMarkedForReview",
                        76,
                        98
                      ) -
                      handleGetQuestionsCountModuleWise("isSaved", 76, 98)}
                  </div>
                  <div
                    className={`describer1 sectionOverviewCell ${
                      activeModule === 4 && "highlightModule"
                    }`}
                  >
                    {findTotalQuestionsForReviewModuleWise(
                      "isMarkedForReview",
                      76,
                      98
                    )}
                  </div>
                  <div
                    className={`describer1 sectionOverviewCell ${
                      activeModule === 4 && "highlightModule"
                    }`}
                  >
                    {handleFindCorrectAnswersModuleWise(76, 98)}/22
                  </div>
                  <div
                    className={`describer1 sectionOverviewCell ${
                      activeModule === 4 && "highlightModule"
                    }`}
                  >
                    {(
                      (handleFindCorrectAnswersModuleWise(76, 98) / 22) *
                      100
                    ).toFixed(1)}
                    %
                  </div>
                </div>
              </div>
            </>
          )}
          {test.Flt && isMobile && (
            <>
              <div className="testOverview">Section Overview</div>
              <table className="sectionTable">
                <thead>
                  <tr>
                    <th className="widthCell sectionTableHeader">
                      Section and Module
                    </th>
                    <th className="sectionTableHeader">Correct</th>
                    <th className="sectionTableHeader">Incorrect</th>
                    <th className="sectionTableHeader">Omitted</th>
                    <th className="sectionTableHeader">For Review</th>
                    <th className="sectionTableHeader">Score</th>
                    <th className="sectionTableHeader">Accuracy</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="widthCell">
                      Section 1, Module 1: Reading & Writing
                    </td>
                    <td>{handleFindCorrectAnswersModuleWise(0, 27)}</td>
                    <td>
                      {handleFindInCorrectAnswersModuleWise(0, 27) -
                        findTotalQuestionsForReviewModuleWise(
                          "isMarkedForReview",
                          0,
                          27
                        )}
                    </td>
                    <td>
                      {27 -
                        findTotalQuestionsForReviewModuleWise(
                          "isMarkedForReview",
                          0,
                          27
                        ) -
                        handleGetQuestionsCountModuleWise("isSaved", 0, 27)}
                    </td>
                    <td>
                      {findTotalQuestionsForReviewModuleWise(
                        "isMarkedForReview",
                        0,
                        27
                      )}
                    </td>
                    <td>{handleFindCorrectAnswersModuleWise(0, 27)}/27</td>
                    <td>
                      {(
                        (handleFindCorrectAnswersModuleWise(0, 27) / 27) *
                        100
                      ).toFixed(1)}
                      %
                    </td>
                  </tr>

                  <tr>
                    <td className="widthCell">
                      Section 1, Module 2: Reading & Writing
                    </td>
                    <td>{handleFindCorrectAnswersModuleWise(27, 54)}</td>
                    <td>
                      {handleFindInCorrectAnswersModuleWise(27, 54) -
                        findTotalQuestionsForReviewModuleWise(
                          "isMarkedForReview",
                          27,
                          54
                        )}
                    </td>
                    <td>
                      {27 -
                        findTotalQuestionsForReviewModuleWise(
                          "isMarkedForReview",
                          27,
                          54
                        ) -
                        handleGetQuestionsCountModuleWise("isSaved", 27, 54)}
                    </td>
                    <td>
                      {findTotalQuestionsForReviewModuleWise(
                        "isMarkedForReview",
                        27,
                        54
                      )}
                    </td>
                    <td>{handleFindCorrectAnswersModuleWise(27, 54)}/27</td>
                    <td>
                      {(
                        (handleFindCorrectAnswersModuleWise(27, 54) / 27) *
                        100
                      ).toFixed(1)}
                      %
                    </td>
                  </tr>

                  <tr>
                    <td className="widthCell">Section 2, Module 1: Maths</td>
                    <td>{handleFindCorrectAnswersModuleWise(54, 76)}</td>
                    <td>
                      {handleFindInCorrectAnswersModuleWise(54, 76) -
                        findTotalQuestionsForReviewModuleWise(
                          "isMarkedForReview",
                          54,
                          76
                        )}
                    </td>
                    <td>
                      {22 -
                        findTotalQuestionsForReviewModuleWise(
                          "isMarkedForReview",
                          54,
                          76
                        ) -
                        handleGetQuestionsCountModuleWise("isSaved", 54, 76)}
                    </td>
                    <td>
                      {findTotalQuestionsForReviewModuleWise(
                        "isMarkedForReview",
                        54,
                        76
                      )}
                    </td>
                    <td>{handleFindCorrectAnswersModuleWise(54, 76)}/22</td>
                    <td>
                      {(
                        (handleFindCorrectAnswersModuleWise(54, 76) / 22) *
                        100
                      ).toFixed(1)}
                      %
                    </td>
                  </tr>

                  <tr>
                    <td className="widthCell">Section 2, Module 2: Maths</td>
                    <td>{handleFindCorrectAnswersModuleWise(76, 98)}</td>
                    <td>
                      {handleFindInCorrectAnswersModuleWise(76, 98) -
                        findTotalQuestionsForReviewModuleWise(
                          "isMarkedForReview",
                          76,
                          98
                        )}
                    </td>
                    <td>
                      {22 -
                        findTotalQuestionsForReviewModuleWise(
                          "isMarkedForReview",
                          76,
                          98
                        ) -
                        handleGetQuestionsCountModuleWise("isSaved", 76, 98)}
                    </td>
                    <td>
                      {findTotalQuestionsForReviewModuleWise(
                        "isMarkedForReview",
                        76,
                        98
                      )}
                    </td>
                    <td>{handleFindCorrectAnswersModuleWise(76, 98)}/22</td>
                    <td>
                      {(
                        (handleFindCorrectAnswersModuleWise(76, 98) / 22) *
                        100
                      ).toFixed(1)}
                      %
                    </td>
                  </tr>
                </tbody>
              </table>
            </>
          )}
          {test.sectional === 1 && !isMobile && (
            <>
              {" "}
              <div className="testOverview">Section Overview</div>
              <div className="sectionContainer">
                <div className="testDescriber1 sectionOverFlow">
                  <div className="describer1 sectionOverviewCell widthCell sectionTableHeader">
                    Section and Module
                  </div>
                  <div className="describer1 sectionOverviewCell sectionTableHeader ">
                    Correct
                  </div>
                  <div className="describer1 sectionOverviewCell sectionTableHeader">
                    Incorrect
                  </div>
                  <div className="describer1 sectionOverviewCell sectionTableHeader">
                    Omitted
                  </div>
                  <div className="describer1 sectionOverviewCell sectionTableHeader">
                    For Review
                  </div>
                  <div className="describer1 sectionOverviewCell sectionTableHeader">
                    Score
                  </div>
                  <div className="describer1 sectionOverviewCell sectionTableHeader">
                    Accuracy
                  </div>
                </div>

                <div className="testDescriber1">
                  <div
                    className={`describer1 sectionOverviewCell widthCell ${
                      activeModule === 3 && "highlightModule"
                    }`}
                  >
                    Module 1 : Maths
                  </div>
                  <div
                    className={`describer1 sectionOverviewCell ${
                      activeModule === 3 && "highlightModule"
                    }`}
                  >
                    {handleFindCorrectAnswersModuleWise(0, 22)}
                  </div>
                  <div
                    className={`describer1 sectionOverviewCell ${
                      activeModule === 3 && "highlightModule"
                    }`}
                  >
                    {" "}
                    {handleFindInCorrectAnswersModuleWise(0, 22) -
                      findTotalQuestionsForReviewModuleWise(
                        "isMarkedForReview",
                        0,
                        22
                      )}
                  </div>
                  <div
                    className={`describer1 sectionOverviewCell ${
                      activeModule === 3 && "highlightModule"
                    }`}
                  >
                    {" "}
                    {22 -
                      findTotalQuestionsForReviewModuleWise(
                        "isMarkedForReview",
                        0,
                        22
                      ) -
                      handleGetQuestionsCountModuleWise("isSaved", 0, 22)}
                  </div>
                  <div
                    className={`describer1 sectionOverviewCell ${
                      activeModule === 3 && "highlightModule"
                    }`}
                  >
                    {findTotalQuestionsForReviewModuleWise(
                      "isMarkedForReview",
                      0,
                      22
                    )}
                  </div>
                  <div
                    className={`describer1 sectionOverviewCell ${
                      activeModule === 3 && "highlightModule"
                    }`}
                  >
                    {handleFindCorrectAnswersModuleWise(0, 22)}/22
                  </div>
                  <div
                    className={`describer1 sectionOverviewCell ${
                      activeModule === 3 && "highlightModule"
                    }`}
                  >
                    {" "}
                    {(
                      (handleFindCorrectAnswersModuleWise(0, 22) / 22) *
                      100
                    ).toFixed(1)}
                    %
                  </div>
                </div>
                <div className="testDescriber1">
                  <div
                    className={`describer1 sectionOverviewCell widthCell ${
                      activeModule === 4 && "highlightModule"
                    }`}
                  >
                    Module 2 : Maths
                  </div>
                  <div
                    className={`describer1 sectionOverviewCell ${
                      activeModule === 4 && "highlightModule"
                    }`}
                  >
                    {handleFindCorrectAnswersModuleWise(22, 44)}
                  </div>
                  <div
                    className={`describer1 sectionOverviewCell ${
                      activeModule === 4 && "highlightModule"
                    }`}
                  >
                    {" "}
                    {handleFindInCorrectAnswersModuleWise(22, 44) -
                      findTotalQuestionsForReviewModuleWise(
                        "isMarkedForReview",
                        22,
                        44
                      )}
                  </div>
                  <div
                    className={`describer1 sectionOverviewCell ${
                      activeModule === 4 && "highlightModule"
                    }`}
                  >
                    {" "}
                    {22 -
                      findTotalQuestionsForReviewModuleWise(
                        "isMarkedForReview",
                        22,
                        44
                      ) -
                      handleGetQuestionsCountModuleWise("isSaved", 22, 44)}
                  </div>
                  <div
                    className={`describer1 sectionOverviewCell ${
                      activeModule === 4 && "highlightModule"
                    }`}
                  >
                    {findTotalQuestionsForReviewModuleWise(
                      "isMarkedForReview",
                      22,
                      44
                    )}
                  </div>
                  <div
                    className={`describer1 sectionOverviewCell ${
                      activeModule === 4 && "highlightModule"
                    }`}
                  >
                    {handleFindCorrectAnswersModuleWise(22, 44)}/22
                  </div>
                  <div
                    className={`describer1 sectionOverviewCell ${
                      activeModule === 4 && "highlightModule"
                    }`}
                  >
                    {(
                      (handleFindCorrectAnswersModuleWise(22, 44) / 22) *
                      100
                    ).toFixed(1)}
                    %
                  </div>
                </div>
              </div>
            </>
          )}
          {test.sectional === 1 && isMobile && (
            <>
              <div className="testOverview">Section Overview</div>
              <table className="sectionTable">
                <thead>
                  <tr>
                    <th className="widthCell sectionTableHeader">
                      Section and Module
                    </th>
                    <th className="sectionTableHeader">Correct</th>
                    <th className="sectionTableHeader">Incorrect</th>
                    <th className="sectionTableHeader">Omitted</th>
                    <th className="sectionTableHeader">For Review</th>
                    <th className="sectionTableHeader">Score</th>
                    <th className="sectionTableHeader">Accuracy</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="widthCell">Section 2, Module 1: Maths</td>
                    <td>{handleFindCorrectAnswersModuleWise(0, 22)}</td>
                    <td>
                      {handleFindInCorrectAnswersModuleWise(0, 22) -
                        findTotalQuestionsForReviewModuleWise(
                          "isMarkedForReview",
                          0,
                          22
                        )}
                    </td>
                    <td>
                      {22 -
                        findTotalQuestionsForReviewModuleWise(
                          "isMarkedForReview",
                          0,
                          22
                        ) -
                        handleGetQuestionsCountModuleWise("isSaved", 0, 22)}
                    </td>
                    <td>
                      {findTotalQuestionsForReviewModuleWise(
                        "isMarkedForReview",
                        0,
                        22
                      )}
                    </td>
                    <td>{handleFindCorrectAnswersModuleWise(0, 22)}/22</td>
                    <td>
                      {(
                        (handleFindCorrectAnswersModuleWise(0, 22) / 22) *
                        100
                      ).toFixed(1)}
                      %
                    </td>
                  </tr>
                  <tr>
                    <td className="widthCell">Module 2: Maths</td>
                    <td>{handleFindCorrectAnswersModuleWise(22, 44)}</td>
                    <td>
                      {handleFindInCorrectAnswersModuleWise(22, 44) -
                        findTotalQuestionsForReviewModuleWise(
                          "isMarkedForReview",
                          22,
                          44
                        )}
                    </td>
                    <td>
                      {22 -
                        findTotalQuestionsForReviewModuleWise(
                          "isMarkedForReview",
                          22,
                          44
                        ) -
                        handleGetQuestionsCountModuleWise("isSaved", 22, 44)}
                    </td>
                    <td>
                      {findTotalQuestionsForReviewModuleWise(
                        "isMarkedForReview",
                        22,
                        44
                      )}
                    </td>
                    <td>{handleFindCorrectAnswersModuleWise(22, 44)}/22</td>
                    <td>
                      {(
                        (handleFindCorrectAnswersModuleWise(22, 44) / 22) *
                        100
                      ).toFixed(1)}
                      %
                    </td>
                  </tr>
                </tbody>
              </table>
            </>
          )}
          {test.sectional === 2 && !isMobile && (
            <>
              {" "}
              <div className="testOverview">Section Overview</div>
              <div className="sectionContainer">
                <div className="testDescriber1 sectionOverFlow">
                  <div className="describer1 sectionOverviewCell widthCell sectionTableHeader">
                    Section and Module
                  </div>
                  <div className="describer1 sectionOverviewCell sectionTableHeader ">
                    Correct
                  </div>
                  <div className="describer1 sectionOverviewCell sectionTableHeader">
                    Incorrect
                  </div>
                  <div className="describer1 sectionOverviewCell sectionTableHeader">
                    Omitted
                  </div>
                  <div className="describer1 sectionOverviewCell sectionTableHeader">
                    For Review
                  </div>
                  <div className="describer1 sectionOverviewCell sectionTableHeader">
                    Score
                  </div>
                  <div className="describer1 sectionOverviewCell sectionTableHeader">
                    Accuracy
                  </div>
                </div>

                <div className="testDescriber1">
                  <div
                    className={`describer1 sectionOverviewCell widthCell ${
                      activeModule === 1 && "highlightModule"
                    }`}
                  >
                    Module 1 : English
                  </div>
                  <div
                    className={`describer1 sectionOverviewCell ${
                      activeModule === 1 && "highlightModule"
                    }`}
                  >
                    {handleFindCorrectAnswersModuleWise(0, 27)}
                  </div>
                  <div
                    className={`describer1 sectionOverviewCell ${
                      activeModule === 1 && "highlightModule"
                    }`}
                  >
                    {" "}
                    {handleFindInCorrectAnswersModuleWise(0, 27) -
                      findTotalQuestionsForReviewModuleWise(
                        "isMarkedForReview",
                        0,
                        27
                      )}
                  </div>
                  <div
                    className={`describer1 sectionOverviewCell ${
                      activeModule === 1 && "highlightModule"
                    }`}
                  >
                    {" "}
                    {27 -
                      findTotalQuestionsForReviewModuleWise(
                        "isMarkedForReview",
                        0,
                        27
                      ) -
                      handleGetQuestionsCountModuleWise("isSaved", 0, 27)}
                  </div>
                  <div
                    className={`describer1 sectionOverviewCell ${
                      activeModule === 1 && "highlightModule"
                    }`}
                  >
                    {findTotalQuestionsForReviewModuleWise(
                      "isMarkedForReview",
                      0,
                      27
                    )}
                  </div>
                  <div
                    className={`describer1 sectionOverviewCell ${
                      activeModule === 1 && "highlightModule"
                    }`}
                  >
                    {handleFindCorrectAnswersModuleWise(0, 27)}/27
                  </div>
                  <div
                    className={`describer1 sectionOverviewCell ${
                      activeModule === 1 && "highlightModule"
                    }`}
                  >
                    {" "}
                    {(
                      (handleFindCorrectAnswersModuleWise(0, 27) / 27) *
                      100
                    ).toFixed(1)}
                    %
                  </div>
                </div>
                <div className="testDescriber1">
                  <div
                    className={`describer1 sectionOverviewCell widthCell ${
                      activeModule === 2 && "highlightModule"
                    }`}
                  >
                    Module 2 : English
                  </div>
                  <div
                    className={`describer1 sectionOverviewCell ${
                      activeModule === 2 && "highlightModule"
                    }`}
                  >
                    {handleFindCorrectAnswersModuleWise(27, 54)}
                  </div>
                  <div
                    className={`describer1 sectionOverviewCell ${
                      activeModule === 2 && "highlightModule"
                    }`}
                  >
                    {" "}
                    {handleFindInCorrectAnswersModuleWise(27, 54) -
                      findTotalQuestionsForReviewModuleWise(
                        "isMarkedForReview",
                        27,
                        54
                      )}
                  </div>
                  <div
                    className={`describer1 sectionOverviewCell ${
                      activeModule === 2 && "highlightModule"
                    }`}
                  >
                    {" "}
                    {27 -
                      findTotalQuestionsForReviewModuleWise(
                        "isMarkedForReview",
                        27,
                        54
                      ) -
                      handleGetQuestionsCountModuleWise("isSaved", 27, 54)}
                  </div>
                  <div
                    className={`describer1 sectionOverviewCell ${
                      activeModule === 2 && "highlightModule"
                    }`}
                  >
                    {findTotalQuestionsForReviewModuleWise(
                      "isMarkedForReview",
                      27,
                      54
                    )}
                  </div>
                  <div
                    className={`describer1 sectionOverviewCell ${
                      activeModule === 2 && "highlightModule"
                    }`}
                  >
                    {handleFindCorrectAnswersModuleWise(27, 54)}/27
                  </div>
                  <div
                    className={`describer1 sectionOverviewCell ${
                      activeModule === 2 && "highlightModule"
                    }`}
                  >
                    {(
                      (handleFindCorrectAnswersModuleWise(27, 54) / 27) *
                      100
                    ).toFixed(1)}
                    %
                  </div>
                </div>
              </div>
            </>
          )}
          {test.sectional === 2 && isMobile && (
            <>
              <div className="testOverview">Section Overview</div>
              <table className="sectionTable">
                <thead>
                  <tr>
                    <th className="widthCell sectionTableHeader">
                      Section and Module
                    </th>
                    <th className="sectionTableHeader">Correct</th>
                    <th className="sectionTableHeader">Incorrect</th>
                    <th className="sectionTableHeader">Omitted</th>
                    <th className="sectionTableHeader">For Review</th>
                    <th className="sectionTableHeader">Score</th>
                    <th className="sectionTableHeader">Accuracy</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="widthCell"> Module 1: English</td>
                    <td>{handleFindCorrectAnswersModuleWise(0, 27)}</td>
                    <td>
                      {handleFindInCorrectAnswersModuleWise(0, 27) -
                        findTotalQuestionsForReviewModuleWise(
                          "isMarkedForReview",
                          0,
                          27
                        )}
                    </td>
                    <td>
                      {27 -
                        findTotalQuestionsForReviewModuleWise(
                          "isMarkedForReview",
                          0,
                          27
                        ) -
                        handleGetQuestionsCountModuleWise("isSaved", 0, 27)}
                    </td>
                    <td>
                      {findTotalQuestionsForReviewModuleWise(
                        "isMarkedForReview",
                        0,
                        27
                      )}
                    </td>
                    <td>{handleFindCorrectAnswersModuleWise(0, 27)}/27</td>
                    <td>
                      {(
                        (handleFindCorrectAnswersModuleWise(0, 27) / 27) *
                        100
                      ).toFixed(1)}
                      %
                    </td>
                  </tr>
                  <tr>
                    <td className="widthCell">Module 2: English</td>
                    <td>{handleFindCorrectAnswersModuleWise(27, 54)}</td>
                    <td>
                      {handleFindInCorrectAnswersModuleWise(27, 54) -
                        findTotalQuestionsForReviewModuleWise(
                          "isMarkedForReview",
                          27,
                          54
                        )}
                    </td>
                    <td>
                      {27 -
                        findTotalQuestionsForReviewModuleWise(
                          "isMarkedForReview",
                          27,
                          54
                        ) -
                        handleGetQuestionsCountModuleWise("isSaved", 27, 54)}
                    </td>
                    <td>
                      {findTotalQuestionsForReviewModuleWise(
                        "isMarkedForReview",
                        27,
                        54
                      )}
                    </td>
                    <td>{handleFindCorrectAnswersModuleWise(27, 54)}/27</td>
                    <td>
                      {(
                        (handleFindCorrectAnswersModuleWise(27, 44) / 27) *
                        100
                      ).toFixed(1)}
                      %
                    </td>
                  </tr>
                </tbody>
              </table>
            </>
          )}
          <div
            className="moduleContainer"
            style={test.Flt ? { display: "flex" } : { display: "none" }}
          >
            <div
              className={activeModule === 1 ? "moduleBtnActive" : "moduleBtn"}
              onClick={() => {
                setActiveModule(1);
                handleManageModule(1);
              }}
            >
              Section 1, Module 1 : Reading and Writing
            </div>
            <div
              className={activeModule === 2 ? "moduleBtnActive" : "moduleBtn"}
              onClick={() => {
                setActiveModule(2);
                handleManageModule(2);
              }}
            >
              Section 1, Module 2 : Reading and Writing
            </div>
            <div
              className={activeModule === 3 ? "moduleBtnActive" : "moduleBtn"}
              onClick={() => {
                setActiveModule(3);
                handleManageModule(3);
              }}
            >
              Section 2, Module 1 : Maths
            </div>
            <div
              className={activeModule === 4 ? "moduleBtnActive" : "moduleBtn"}
              onClick={() => {
                setActiveModule(4);
                handleManageModule(4);
              }}
            >
              Section 2, Module 2 : Maths
            </div>
          </div>
          <div
            className="moduleContainer"
            style={
              test.sectional === 1 ? { display: "flex" } : { display: "none" }
            }
          >
            <div
              className={activeModule === 3 ? "moduleBtnActive" : "moduleBtn"}
              onClick={() => {
                setActiveModule(3);
                handleManageModule(3);
              }}
            >
              Module 1 : Maths
            </div>
            <div
              className={activeModule === 4 ? "moduleBtnActive" : "moduleBtn"}
              onClick={() => {
                setActiveModule(4);
                handleManageModule(4);
              }}
            >
              Module 2 : Maths
            </div>
          </div>
          <div
            className="moduleContainer"
            style={
              test.sectional === 2 ? { display: "flex" } : { display: "none" }
            }
          >
            <div
              className={activeModule === 1 ? "moduleBtnActive" : "moduleBtn"}
              onClick={() => {
                setActiveModule(1);
                handleManageModule(1);
              }}
            >
              Module 1 : Reading and Writing
            </div>
            <div
              className={activeModule === 2 ? "moduleBtnActive" : "moduleBtn"}
              onClick={() => {
                setActiveModule(2);
                handleManageModule(2);
              }}
            >
              Module 2 : Reading and Writing
            </div>
          </div>
          {test &&
            test?.Test.slice(start, end).map((q, index) => {
              return (
                <>
                  <div className="questionContainerForResult" key={q._id}>
                    <div className="questionOverview">
                      {handleFindIsUnattempted(q) ? (
                        <>
                          <div
                            className="overview"
                            style={{
                              gap: "3%",
                              borderRadius: isMobile ? "2vw" : ".5vw",
                            }}
                          >
                            <img
                              width="25"
                              height="20"
                              src="https://img.icons8.com/ios-filled/50/ff000d/empty_1.png"
                              alt="empty_1"
                            />
                            <div
                              style={{ fontSize: isMobile ? "3vw" : "1.2vw" }}
                            >
                              Not Attempted
                            </div>
                          </div>
                        </>
                      ) : (
                        <>
                          {handleFindIsMarkedForReview(q) ? (
                            <>
                              <div
                                className="overview"
                                style={{
                                  display: "flex",
                                  justifyContent: "left",
                                  alignItems: "left",
                                  textAlign: "center",
                                  borderRadius: isMobile ? "2vw" : "1vw",
                                  padding: isMobile ? "1.1%" : "",
                                }}
                              >
                                <img
                                  width={!isMobile ? "23" : "15"}
                                  height={!isMobile ? "20" : "15"}
                                  src={
                                    "https://img.icons8.com/external-bearicons-glyph-bearicons/64/ff0000/external-mark-call-to-action-bearicons-glyph-bearicons.png"
                                  }
                                  alt="external-mark-call-to-action-bearicons-detailed-outline-bearicons"
                                />
                                <div
                                  style={{
                                    fontSize: isMobile ? "2.5vw" : "1.2vw",
                                  }}
                                >
                                  Marked For Review
                                </div>
                              </div>
                            </>
                          ) : (
                            <></>
                          )}
                          {handleFindIsQuestionSaved(q) && (
                            <>
                              <div
                                className="overview"
                                style={{
                                  display: "flex",
                                  justifyContent: "left",
                                  alignItems: "left",
                                  textAlign: "center",
                                  borderRadius: isMobile ? "2vw" : "1vw",
                                }}
                              >
                                <div
                                  style={{
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    textAlign: "center",
                                  }}
                                >
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    x="0px"
                                    y="0px"
                                    width="20"
                                    height="20"
                                    viewBox="0 0 30 30"
                                  >
                                    <path d="M15,3C8.373,3,3,8.373,3,15c0,6.627,5.373,12,12,12s12-5.373,12-12C27,8.373,21.627,3,15,3z M16,16H7.995 C7.445,16,7,15.555,7,15.005v-0.011C7,14.445,7.445,14,7.995,14H14V5.995C14,5.445,14.445,5,14.995,5h0.011 C15.555,5,16,5.445,16,5.995V16z"></path>
                                  </svg>
                                </div>
                                <div
                                  style={{
                                    fontSize: isMobile ? "2.5vw" : "1.2vw",
                                    marginTop: isMobile ? "2.3%" : "0%",
                                  }}
                                >
                                  Time taken - {handleFindTimeTaken(q)} s
                                </div>
                              </div>
                              {handleFindIsAnswerCorrect(q) ? (
                                <div
                                  style={{
                                    marginTop: isMobile ? "-3%" : "-1.4%",
                                  }}
                                >
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    x="0px"
                                    y="0px"
                                    width={!isMobile ? "50" : "35"}
                                    height={!isMobile ? "60" : "45"}
                                    viewBox="0,0,300,150"
                                    style={{ fill: "#40C057" }}
                                  >
                                    <g>
                                      <g transform="scale(3.55556,3.55556)">
                                        <path d="M36,12c-13.25,0 -24,10.75 -24,24c0,13.25 10.75,24 24,24c13.25,0 24,-10.75 24,-24c0,-2.59 -0.40969,-5.08016 -1.17969,-7.41016l-7.29102,11.26953c-0.023,0.093 -0.04727,0.1863 -0.07227,0.2793c-1.817,6.829 -8.04803,11.86133 -15.45703,11.86133c-8.84,0 -16,-7.16 -16,-16c0,-8.84 7.16,-16 16,-16c2.54,0 4.94031,0.59062 7.07031,1.64063l4.35938,-6.74023c-3.4,-1.85 -7.28969,-2.90039 -11.42969,-2.90039zM53.12109,17.12695c-1.44433,0.02869 -2.84898,0.75031 -3.69336,2.05469l-10.27344,15.87695l-5.1875,-5.94727c-1.634,-1.874 -4.47861,-2.06564 -6.34961,-0.43164c-1.873,1.634 -2.06564,4.47566 -0.43164,6.34766l9.11328,10.44531c0.858,0.983 2.09562,1.54297 3.39063,1.54297c0.107,0 0.21331,-0.00472 0.32031,-0.01172c1.409,-0.101 2.68903,-0.85597 3.45703,-2.04297l13.51758,-20.89063c1.35,-2.086 0.75302,-4.87166 -1.33398,-6.22266c-0.7815,-0.50587 -1.6627,-0.73792 -2.5293,-0.7207z"></path>
                                      </g>
                                    </g>
                                  </svg>
                                </div>
                              ) : handleFindIsAnswerInCorrect(q) ? (
                                <div
                                  style={{
                                    marginTop: isMobile ? "-3%" : "-1%",
                                  }}
                                >
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    x="0px"
                                    y="0px"
                                    width={!isMobile ? "38" : "28"}
                                    height={!isMobile ? "55" : "40"}
                                    viewBox="0,0,300,150"
                                    style={{ fill: "#ff000d" }}
                                  >
                                    <g>
                                      <g transform="scale(5.12,5.12)">
                                        <path d="M25,2c-12.681,0 -23,10.319 -23,23c0,12.681 10.319,23 23,23c12.681,0 23,-10.319 23,-23c0,-12.681 -10.319,-23 -23,-23zM33.71,32.29c0.39,0.39 0.39,1.03 0,1.42c-0.2,0.19 -0.45,0.29 -0.71,0.29c-0.26,0 -0.51,-0.1 -0.71,-0.29l-7.29,-7.29l-7.29,7.29c-0.2,0.19 -0.45,0.29 -0.71,0.29c-0.26,0 -0.51,-0.1 -0.71,-0.29c-0.39,-0.39 -0.39,-1.03 0,-1.42l7.29,-7.29l-7.29,-7.29c-0.39,-0.39 -0.39,-1.03 0,-1.42c0.39,-0.39 1.03,-0.39 1.42,0l7.29,7.29l7.29,-7.29c0.39,-0.39 1.03,-0.39 1.42,0c0.39,0.39 0.39,1.03 0,1.42l-7.29,7.29z"></path>
                                      </g>
                                    </g>
                                  </svg>
                                </div>
                              ) : (
                                <></>
                              )}
                            </>
                          )}
                        </>
                      )}
                    </div>
                    <div className="mainQuestionContainer">
                      {q?.diagram && q.diagram !== "" && (
                        <div
                          className="questionImageontainer"
                          style={
                            !isMobile
                              ? { width: "38vw", marginLeft: "23%" }
                              : {}
                          }
                        >
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
                              {test.Flt ? index + 1 : index + 1}. Passage
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
                          {q.passage !== "" ? "Question" : `${index + 1}.`}
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
                        {q.type === "objective" ? (
                          // q.options.map((option, index) => {
                          //   return (
                          //     <div
                          //       className="option"
                          //       key={index}
                          //       style={

                          //         q.answer === option.split(".")[0]
                          //           ? {
                          //               border: "1px solid green",
                          //               backgroundColor: "rgb(221, 250, 221)",
                          //             }
                          //           : answers.some(
                          //               (_ans, _index) =>
                          //                 _ans.answer === option &&
                          //                 _ans.question.id === q.id
                          //             )
                          //           ? {
                          //               border: answers.some(
                          //                 (_ans, _index) =>
                          //                   _ans.answer.split(".")[0] ===
                          //                     q.answer &&
                          //                   _ans.question.id === q.id
                          //               )
                          //                 ? ""
                          //                 : "1.2px solid red",
                          //               backgroundColor: answers.some(
                          //                 (_ans, _index) =>
                          //                   _ans.answer.split(".")[0] ===
                          //                     q.answer &&
                          //                   _ans.question.id === q.id
                          //               )
                          //                 ? ""
                          //                 : "rgb(255, 214, 214)",
                          //             }
                          //           : {}
                          //       }
                          //     >
                          //       <span className="optionNoResult">
                          //         {index === 0
                          //           ? "A"
                          //           : index === 1
                          //           ? "B"
                          //           : index === 2
                          //           ? "C"
                          //           : "D"}
                          //       </span>
                          //       {option.replace(
                          //         index === 0
                          //           ? "A. "
                          //           : index === 1
                          //           ? "B. "
                          //           : index === 2
                          //           ? "C. "
                          //           : "D. ",
                          //         ""
                          //       )}
                          //       &nbsp;&nbsp;
                          //       {q.answer === option.split(".")[0] &&
                          //         "( Correct Answer )"}
                          //     </div>
                          //   );
                          // })
                          q.options.map((option, index) => {
                            const optionKey = option.split(".")[0];

                            const isCorrect = q.answer === optionKey;

                            const isStudentSelected = answers.some(
                              (a) =>
                                a.answer.split(".")[0] === optionKey &&
                                a.question.id === q.id
                            );

                            const isStudentCorrect = answers.some(
                              (a) =>
                                a.answer.split(".")[0] === q.answer &&
                                a.question.id === q.id
                            );

                            return (
                              <div
                                className="option"
                                key={index}
                                style={
                                  isCorrect
                                    ? {
                                        border: "1px solid green",
                                        backgroundColor: "rgb(221, 250, 221)",
                                      }
                                    : isStudentSelected
                                    ? {
                                        border: isStudentCorrect
                                          ? ""
                                          : "1.2px solid red",
                                        backgroundColor: isStudentCorrect
                                          ? ""
                                          : "rgb(255, 214, 214)",
                                      }
                                    : {}
                                }
                              >
                                <span className="optionNoResult">
                                  {["A", "B", "C", "D"][index]}
                                </span>
                                {option.replace(
                                  `${["A", "B", "C", "D"][index]}. `,
                                  ""
                                )}
                                &nbsp;&nbsp;
                                {isCorrect && "( Correct Answer )"}
                              </div>
                            );
                          })
                        ) : (
                          <>
                            <CustomInput
                              inputStyle={
                                handleIsSubjectiveCorrect(q)
                                  ? {
                                      borderColor: "green",
                                      color: "green",
                                      border: "1px solid green",
                                    }
                                  : {
                                      borderColor: "red",
                                      color: "red",
                                      border: "1px solid red",
                                    }
                              }
                              value={
                                answers[index + start]?.answer !== ""
                                  ? `${
                                      answers[index + start]?.answer || ""
                                    } ( Your Answer )`
                                  : "Not attempted"
                              }
                              handleInputChange={() => {}}
                            />
                          </>
                        )}
                      </div>
                      {q.type === "subjective" && (
                        <div
                          style={{
                            padding: "1%",
                            backgroundColor: "green",
                            width: !isMobile ? "20%" : "40%",
                            color: "white",
                            marginTop: !isMobile ? ".5%" : "2%",
                            borderRadius: ".7vw",
                            fontSize: !isMobile ? "1.2vw" : "3vw",
                          }}
                        >
                          Correct Answer - {q.answer}
                        </div>
                      )}
                    </div>
                  </div>
                </>
              );
            })}
        </div>
      </div>
    </>
  );
};

export default Result;
