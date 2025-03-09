import React, { useEffect } from "react";

import "./Test.css";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import CustomButton from "../../CustomComponents/CustomButton/CustomButton";
import { useMediaQuery } from "../../Custom_hooks/Custom";
const Result = () => {
  const isMobile = useMediaQuery("(max-width:430px)");
  const navigate = useNavigate();
  const answers = useSelector((state) => state.user.answers);
  const test = useSelector((state) => state.user.activeTest);
  const auth = useSelector((state) => state.user.auth);
  const testTimings = useSelector((state) => state.user.testOtherDetails);

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
  const handleFindCorrectAnswers = () => {
    const filteredAnswers = answers.filter(
      (ans, index) =>
        (ans.answer.split(".")[0] === ans.question.answer &&
          ans.isSaved === true) ||
        (ans.answer.split(".")[0] === ans.question.answer &&
          ans.isMarkedForReview === true)
        //    ||
        // (findIsAnswerCorrectCondition2(
        //   ans.answer,
        //   ans.question.options,
        //   ans.question.answer
        // ) &&
        //   ans.isSaved === true) ||
        // (findIsAnswerCorrectCondition2(
        //   ans.answer,
        //   ans.question.options,
        //   ans.question.answer
        // ) &&
        //   ans.isMarkedForReview === true)
    );
    return filteredAnswers.length;
  };
  const handleFindInCorrectAnswers = () => {
    const filteredAnswers = answers.filter(
      (ans, index) =>
        ans.answer.split(".")[0] !== ans.question.answer  &&
          ans.isSaved === true
    );
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
    return answers[answer].isUnattempted;
  };
  const handleFindIsMarkedForReview = (question) => {
    const answer = answers.findIndex(
      (ans, index) => ans.question.id === question.id
    );
    return answers[answer].isMarkedForReview;
  };

  const handleFindIsAnswerCorrect = (question) => {
    const ans = answers.find((ans, index) => ans.question.id === question.id);
    return (
      ans.answer.split(".")[0] === question.answer ||
      // findIsAnswerCorrectCondition2(
      //   ans.answer,
      //   question.options,
      //   question.answer
      // ) ||
      ans.answer === question.answer
    );
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
          <span style={{ fontSize: isMobile ? "6vw" : "" }}>HELIOS</span>
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
          <div className="testOverview">Test Overview</div>
          <div className="testDescriber1">
            <div
              className="describer1 leftRadiusProvider"
              style={{ backgroundColor: " rgb(126, 23, 28)", color: "white" }}
            >
              <div>Total Questions Attempted</div>
              <div>
                {handleGetQuestionsCount("isSaved") +
                  findTotalQuestionsForReview("isMarkedForReview")}
                / {test?.Test.length}
              </div>
            </div>
            <div className="describer1">
              <div>Answered Questions </div>
              <div>
                {handleGetQuestionsCount("isSaved")} / {test?.Test.length}
              </div>
            </div>
            <div className="describer1">
              <div>UnAnswered Questions</div>
              <div>
                {/* {findTotalUnattemptedQUestions("isUnattempted")}  */}
                {test.Test.length -
                  handleGetQuestionsCount("isSaved") -
                  findTotalQuestionsForReview("isMarkedForReview")}
                / {test?.Test.length}
              </div>
            </div>
            <div className="describer1 rightRadiusProvider">
              <div>Marked For Review </div>
              <div>
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
                {handleFindInCorrectAnswers()} Incorrect
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
          <div className="testOverview">Questions Wise Report</div>
          {test &&
            test?.Test.map((q, index) => {
              return (
                <>
                  <div className="questionContainerForResult" key={index}>
                    <div className="questionOverview">
                      {handleFindIsUnattempted(q) ? (
                        <>
                          <div
                            className="overview"
                            style={{
                              gap: "3%",
                              borderRadius: isMobile ? "2vw" : "1vw",
                            }}
                          >
                            <img
                              width="20"
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
                                }}
                              >
                                <img
                                  width="20"
                                  height="20"
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
                                marginTop: isMobile ? "-4%" : "-1.4%",
                              }}
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                x="0px"
                                y="0px"
                                width="50"
                                height="60"
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
                          ) : (
                            <div
                              style={{ marginTop: isMobile ? "-3%" : "-1%" }}
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                x="0px"
                                y="0px"
                                width="38"
                                height="55"
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
                          )}
                        </>
                      )}
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
                          textAlign: "left",
                          alignItems: "left",
                          justifyContent: "left",
                        }}
                      >
                        <div
                          className="index"
                          style={{ padding: !isMobile ? "2%" : "" }}
                        >
                          {index + 1}
                        </div>
                        {q.question}
                      </div>
                      <div className="optionsContainer">
                        {q.options.length > 0 ? (
                          q.options.map((option, index) => {
                            return (
                              <div
                                className="option"
                                key={index}
                                style={
                                  q.answer === option.split(".")[0]
                                    ? {
                                        border: "1px solid green",
                                        backgroundColor: "rgb(221, 250, 221)",
                                      }
                                    : answers.some(
                                        (_ans, _index) =>
                                          _ans.answer === option &&
                                          _ans.question.id === q.id
                                      )
                                    ? {
                                        border: answers.some(
                                          (_ans, _index) =>
                                            _ans.answer.split(".")[0] ===
                                              q.answer &&
                                            _ans.question.id === q.id
                                        )
                                          ? ""
                                          : "1.2px solid red",
                                        backgroundColor: answers.some(
                                          (_ans, _index) =>
                                            _ans.answer.split(".")[0] ===
                                              q.answer &&
                                            _ans.question.id === q.id
                                        )
                                          ? ""
                                          : "rgb(255, 214, 214)",
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
                                {option.split(".")[1]
                                  ? option.split(".")[1]
                                  : option}
                                &nbsp;&nbsp;
                                {q.answer === option.split(".")[0] &&
                                  "( Correct Answer )"}
                              </div>
                            );
                          })
                        ) : (
                          <>
                            <input
                              style={
                                handleIsSubjectiveCorrect(q)
                                  ? { borderColor: "green", color: "green" }
                                  : { borderColor: "red", color: "red" }
                              }
                              placeholder="Your answer"
                              value={answers[index]?.answer || ""}
                            ></input>
                            {!handleIsSubjectiveCorrect(q) && (
                              <div>{q.answer}</div>
                            )}
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </>
              );
            })}
          {/* <CustomButton
            text={"Upload Test"}
            handleClick={() => {
              alert("Test uploaded successfully.");
            }}
            style={{ marginBottom: "3%" }}
          /> */}
        </div>
      </div>
    </>
  );
};

export default Result;
