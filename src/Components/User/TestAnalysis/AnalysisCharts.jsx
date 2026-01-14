import React, { useEffect, useState, useRef } from "react";
import "./TestAnalysis.css";
import { PieChart } from "@mui/x-charts/PieChart";
import { useMediaQuery } from "Components/Custom_hooks/Custom";
import CustomRadio from "Components/CustomComponents/CustomButton/CustomRadio";
import CustomButton from "Components/CustomComponents/CustomButton/CustomButton";
const AnalysisCharts = ({ userData }) => {
  const [strategy, setStrategy] = useState("");
  const [subject, setSubject] = useState("");
  const [domain, setDomain] = useState("");
  const [subdomain, setSubdomain] = useState("");
  const [activeModule, setActiveModule] = useState(1);
  const [difficulty, setDifficulty] = useState("");
  const [topic, setTopic] = useState("");
  const [filteredQuestions, setFilteredQuestions] = useState([]);
  const [qNo, setQNo] = useState(userData.assignedTests.length);
  const isMobile = useMediaQuery("(max-width:700px)");

  const findCorrectAnswer = (q) => {
    if (q.isUnattempted === true) {
      return "Unattempted";
    }
    if (q.question.type === "objective") {
      if (q.answer?.split(".")[0]?.trim() === q.question.answer?.trim()) {
        return "Correct Answer";
      } else {
        return "Incorrect Answer";
      }
    } else {
      if (q.answer === q.question.answer) {
        return "Correct Answer";
      } else {
        return "Incorrect Answer";
      }
    }
  };
  const parseTimeToSeconds2 = (timeStr) => {
    if (!timeStr) return 0;

    const parts = timeStr.split(":").map((p) => parseInt(p, 10));

    if (parts.length === 2) {
      const [minutes, seconds] = parts;
      return minutes * 60 + seconds;
    } else if (parts.length === 1) {
      return parts[0];
    } else {
      return 0;
    }
  };
  const handleFilterQuestions2 = () => {
    console.log("sd", subdomain);
    let finalFilteredQuestions;

    const completedTests = userData.assignedTests
      .filter((test) => test.testStatus === "Completed")
      .slice(0, qNo);

    const allAnswers = completedTests.flatMap((test) => test.answers);

    finalFilteredQuestions = allAnswers.filter((q) => {
      if (subject) {
        const tags = q.question.tags.map((t) => t.toLowerCase());
        if (!tags.includes(subject.toLowerCase())) {
          return false;
        }
      }
      if (subdomain !== "") {
        if (subdomain === "0-30s") {
          finalFilteredQuestions = finalFilteredQuestions.filter((q, index) => {
            const timeInSeconds = parseTimeToSeconds(q.time);
            return timeInSeconds >= 0 && timeInSeconds <= 30;
          });
        } else if (subdomain === "30-60s") {
          finalFilteredQuestions = finalFilteredQuestions.filter((q, index) => {
            const timeInSeconds = parseTimeToSeconds(q.time);
            return timeInSeconds > 30 && timeInSeconds <= 60;
          });
        } else {
          finalFilteredQuestions = finalFilteredQuestions.filter((q, index) => {
            const timeInSeconds = parseTimeToSeconds(q.time);
            return timeInSeconds > 60;
          });
        }
      }

      if (difficulty && q.question.difficulty !== difficulty) {
        return false;
      }

      return true;
    });

    // Group and calculate metrics
    const grouped = finalFilteredQuestions.reduce((acc, q) => {
      const topicName = q.question.topic || "Unknown Topic";
      let group = acc.find((g) => g.topic === topicName);

      if (!group) {
        group = {
          topic: topicName,
          questions: [],
          totalQs: 0,
          correctQs: 0,
          avgMistakes: 0,
          Accuracy: 0,
        };
        acc.push(group);
      }

      group.questions.push(q);
      group["totalQs"] += 1;

      const correctness = findCorrectAnswer(q);
      if (correctness === "Correct Answer") {
        group["correctQs"] += 1;
      }

      return acc;
    }, []);

    // Compute Avg Mistakes and Accuracy
    grouped.forEach((group) => {
      const incorrectQs = group["totalQs"] - group["correctQs"];
      group["avgMistakes"] =
        group["totalQs"] > 0
          ? parseFloat((incorrectQs / group["totalQs"]).toFixed(2))
          : 0;
      group["Accuracy"] =
        group["Total Qs"] > 0
          ? parseFloat((group["correctQs"] / group["totalQs"]).toFixed(2))
          : 0;
    });

    setFilteredQuestions(grouped);
    return grouped;
  };

  const parseTimeToSeconds = (timeStr) => {
    if (!timeStr) return 0;
    const parts = timeStr.split(":").map((p) => parseInt(p, 10));
    if (parts.length === 2) {
      const [minutes, seconds] = parts;
      return minutes * 60 + seconds;
    } else if (parts.length === 1) {
      return parts[0];
    } else {
      return 0;
    }
  };

  const handleFilterQuestions = () => {
    if (!qNo || !subject || !domain) {
      return setFilteredQuestions([]);
    }
    let finalFilteredQuestions;

    const completedTests = userData.assignedTests
      .filter(
        (test) => test.testStatus === "Completed" && test.testType === "Mock"
      )
      .slice(
        userData.assignedTests.length - qNo,
        userData.assignedTests.length
      );

    const allAnswers = completedTests.flatMap((test) => test.answers);

    finalFilteredQuestions = allAnswers.filter((q) => {
      // Subject filter
      if (subject) {
        const tags = q.question.tags.map((t) => t.toLowerCase());
        if (!tags.includes(subject.toLowerCase())) {
          return false;
        }
      }

      // Time filter
      // if (subdomain) {
      const timeInSeconds = parseTimeToSeconds(q.time);
      console.log("time converted", timeInSeconds);
      if (subdomain === "0-30s") {
        if (!(timeInSeconds >= 0 && timeInSeconds <= 30)) {
          return false;
        }
      } else if (subdomain === "30-60s") {
        if (!(timeInSeconds > 30 && timeInSeconds <= 60)) {
          return false;
        }
      } else if (subdomain === ">60s") {
        if (!(timeInSeconds > 60)) {
          return false;
        }
      }
      // }

      // Difficulty filter
      if (difficulty && q.question.difficulty !== difficulty) {
        return false;
      }

      return true;
    });

    // Group and calculate metrics
    const grouped = finalFilteredQuestions.reduce((acc, q) => {
      const topicName = q.question.topic || "Miscellaneous";
      let group = acc.find((g) => g.topic === topicName);

      if (!group) {
        group = {
          topic: topicName,
          questions: [],
          totalQs: 0,
          correctQs: 0,
          avgMistakes: 0,
          Accuracy: 0,
        };
        acc.push(group);
      }

      group.questions.push(q);
      group.totalQs += 1;

      const correctness = findCorrectAnswer(q);
      if (correctness === "Correct Answer") {
        group.correctQs += 1;
      }

      return acc;
    }, []);

    // Compute Avg Mistakes and Accuracy
    grouped.forEach((group) => {
      const incorrectQs = group.totalQs - group.correctQs;
      group.avgMistakes =
        group.totalQs > 0
          ? parseFloat((incorrectQs / group.totalQs).toFixed(2))
          : 0;
      group.Accuracy =
        group.totalQs > 0
          ? parseFloat((group.correctQs / group.totalQs).toFixed(2))
          : 0;
    });

    setFilteredQuestions(grouped);
    return grouped;
  };

  const handleFilterQuestionsByTimeGroup = () => {
    if (!qNo || !subject || !domain) {
      return setFilteredQuestions([]);
    }
    let finalFilteredQuestions;

    const completedTests = userData.assignedTests
      .filter((test) => test.testStatus === "Completed")
      .slice(0, qNo);

    const allAnswers = completedTests.flatMap((test) => test.answers);

    // Apply the existing filters (except grouping logic)
    finalFilteredQuestions = allAnswers.filter((q) => {
      if (subject) {
        const tags = q.question.tags.map((t) => t.toLowerCase());
        if (!tags.includes(subject.toLowerCase())) {
          return false;
        }
      }
      if (difficulty && q.question.difficulty !== difficulty) {
        return false;
      }
      return true;
    });

    // Group and calculate metrics by time range
    const grouped = finalFilteredQuestions.reduce((acc, q) => {
      const timeInSec = parseTimeToSeconds(q.time);
      let timeGroup = "";

      if (timeInSec >= 0 && timeInSec <= 30) {
        timeGroup = "0-30s";
      } else if (timeInSec > 30 && timeInSec <= 60) {
        timeGroup = "30-60s";
      } else {
        timeGroup = ">60s";
      }

      let group = acc.find((g) => g.topic === timeGroup);

      if (!group) {
        group = {
          topic: timeGroup,
          questions: [],
          totalQs: 0,
          correctQs: 0,
          avgMistakes: 0,
          Accuracy: 0,
        };
        acc.push(group);
      }

      group.questions.push(q);
      group["totalQs"] += 1;

      const correctness = findCorrectAnswer(q);
      if (correctness === "Correct Answer") {
        group["correctQs"] += 1;
      }

      return acc;
    }, []);

    // Compute Avg Mistakes and Accuracy
    grouped.forEach((group) => {
      const incorrectQs = group["totalQs"] - group["correctQs"];
      group["avgMistakes"] =
        group["totalQs"] > 0
          ? parseFloat((incorrectQs / group["totalQs"]).toFixed(2))
          : 0;
      group["Accuracy"] =
        group["totalQs"] > 0
          ? parseFloat((group["correctQs"] / group["totalQs"]).toFixed(2))
          : 0;
    });

    setFilteredQuestions(grouped);
    return grouped;
  };

  const handleFilterQuestionsByDifficultyGroup = () => {
    if (!qNo || !subject || !domain) {
      return setFilteredQuestions([]);
    }
    let finalFilteredQuestions;

    const completedTests = userData.assignedTests
      .filter((test) => test.testStatus === "Completed")
      .slice(0, qNo);

    const allAnswers = completedTests.flatMap((test) => test.answers);

    // Apply filters (except grouping logic)
    finalFilteredQuestions = allAnswers.filter((q) => {
      if (subject) {
        const tags = q.question.tags.map((t) => t.toLowerCase());
        if (!tags.includes(subject.toLowerCase())) {
          return false;
        }
      }

      return true;
    });

    // Group by difficulty
    const grouped = finalFilteredQuestions.reduce((acc, q) => {
      const difficultyGroup = q.question.difficulty || "Unknown";

      let group = acc.find((g) => g.topic === difficultyGroup);

      if (!group) {
        group = {
          topic: difficultyGroup,
          questions: [],
          totalQs: 0,
          correctQs: 0,
          avgMistakes: 0,
          Accuracy: 0,
        };
        acc.push(group);
      }

      group.questions.push(q);
      group.totalQs += 1;

      const correctness = findCorrectAnswer(q);
      if (correctness === "Correct Answer") {
        group.correctQs += 1;
      }

      return acc;
    }, []);

    // Compute Avg Mistakes and Accuracy
    grouped.forEach((group) => {
      const incorrectQs = group.totalQs - group.correctQs;
      group.avgMistakes =
        group.totalQs > 0
          ? parseFloat((incorrectQs / group.totalQs).toFixed(2))
          : 0;
      group.Accuracy =
        group.totalQs > 0
          ? parseFloat((group.correctQs / group.totalQs).toFixed(2))
          : 0;
    });

    setFilteredQuestions(grouped);
    return grouped;
  };

  const headerStyle = {
    backgroundColor: "rgb(108, 108, 108)",
    color: "#fff",
    padding: "5px",
    textAlign: "left",
    border: "1px solid #ccc",
    fontSize: isMobile ? "2vw" : "1.2vw",
  };

  const cellStyle = {
    padding: "5px",
    border: "1px solid #ccc",
    cursor: "pointer",
    fontSize: isMobile ? "2vw" : "1vw",
  };
  useEffect(() => {
    if (window?.MathJax && window?.MathJax?.typesetPromise) {
      window.MathJax.typesetPromise();
    }
  }, [filteredQuestions]);
  useEffect(() => {
    setDomain("");
    setSubject("");
    setSubdomain("");
    setDifficulty("");
  }, [qNo]);
  useEffect(() => {
    setDomain("");
    setSubdomain("");
    setDifficulty("");
  }, [subject]);
  useEffect(() => {
    setSubdomain("");
    setDifficulty("");
  }, [domain]);
  useEffect(() => {
    setDifficulty("");
  }, [subdomain]);

  useEffect(() => {
    if (domain === "Topic") {
      handleFilterQuestions();
    } else if (domain === "Time") {
      handleFilterQuestionsByTimeGroup();
    } else {
      handleFilterQuestionsByDifficultyGroup();
    }
  }, [subdomain, difficulty, domain, subject, qNo]);

  console.log("filtered", filteredQuestions);
  console.log("subdomian", subdomain);

  return (
    <>
      <div className="reviewerMainCintainer">
        <div className="reviewerContainer">
          <div className="flexContent gap">
            <div className="filters strategyFilter">
              <div className="miniHeader">Filter strategy</div>
              <div
                onClick={() => {
                  setQNo(userData.assignedTests.length);
                }}
              >
                <CustomRadio
                  label={"All mock tests"}
                  setType={setStrategy}
                  setter={"All mock tests"}
                  type={strategy}
                />
              </div>
              <div
                onClick={() => {
                  setQNo(2);
                }}
              >
                <CustomRadio
                  label={"Last two mock tests"}
                  setType={setStrategy}
                  setter={"Last two mock tests"}
                  type={strategy}
                />
              </div>
              <div
                onClick={() => {
                  setQNo(5);
                }}
              >
                <CustomRadio
                  label={"Last five mock tests"}
                  setType={setStrategy}
                  setter={"Last five mock tests"}
                  type={strategy}
                />
              </div>
              <div
                onClick={() => {
                  setQNo(8);
                }}
              >
                <CustomRadio
                  label={"Last eight mock tests"}
                  setType={setStrategy}
                  setter={"Last eight mock tests"}
                  type={strategy}
                />
              </div>
            </div>
            <div className="filters">
              <div className="miniHeader">Subject</div>
              <div
                onClick={() => {
                  setSubdomain("");
                  setTopic("");

                  // handleSetSubject("English");
                }}
              >
                <CustomRadio
                  label={"English"}
                  setType={setSubject}
                  setter={"English"}
                  type={subject}
                  isDissabled={strategy === ""}
                />
              </div>
              <div
                onClick={() => {
                  // handleSetSubject("Maths");
                }}
              >
                <CustomRadio
                  label={"Maths"}
                  setType={setSubject}
                  setter={"Maths"}
                  type={subject}
                  isDissabled={strategy === ""}
                />
              </div>
            </div>
            <div className="filters">
              <div className="miniHeader">Select Output</div>

              <div>
                <div>
                  <CustomRadio
                    label={"Topic"}
                    setType={setDomain}
                    setter={"Topic"}
                    type={domain}
                    isDissabled={strategy === "" || subject === ""}
                  />
                </div>
                <div>
                  <CustomRadio
                    label={"Difficulty"}
                    setType={setDomain}
                    setter={"Difficulty"}
                    type={domain}
                    isDissabled={strategy === "" || subject === ""}
                  />
                </div>
                <div>
                  <CustomRadio
                    label={"Time"}
                    setType={setDomain}
                    setter={"Time"}
                    type={domain}
                    isDissabled={strategy === "" || subject === ""}
                  />
                </div>
              </div>
            </div>

            <div className="filters">
              <div className="miniHeader">Time Taken</div>
              <div>
                <CustomRadio
                  label={"0-30s"}
                  setType={setSubdomain}
                  setter={"0-30s"}
                  type={subdomain}
                  isDissabled={
                    strategy === "" || subject === "" || domain === ""
                  }
                />
              </div>
              <div>
                <CustomRadio
                  label={"30-60s"}
                  setType={setSubdomain}
                  setter={"30-60s"}
                  type={subdomain}
                  isDissabled={
                    strategy === "" || subject === "" || domain === ""
                  }
                />
              </div>

              <div>
                <CustomRadio
                  label={">60s"}
                  setType={setSubdomain}
                  setter={">60s"}
                  type={subdomain}
                  isDissabled={
                    strategy === "" || subject === "" || domain === ""
                  }
                />
              </div>
            </div>
            <div className="filters">
              <div className="miniHeader">Difficulty</div>
              <div
                onClick={() => {
                  handleFilterQuestions();
                }}
              >
                <CustomRadio
                  label={"Easy"}
                  setType={setDifficulty}
                  setter={"easy"}
                  type={difficulty}
                />
              </div>
              <div
                onClick={() => {
                  handleFilterQuestions();
                }}
              >
                <CustomRadio
                  label={"Moderate"}
                  setType={setDifficulty}
                  setter={"moderate"}
                  type={difficulty}
                />
              </div>
              <div
                onClick={() => {
                  handleFilterQuestions();
                }}
              >
                <CustomRadio
                  label={"Hard"}
                  setType={setDifficulty}
                  setter={"hard"}
                  type={difficulty}
                />
              </div>
            </div>
          </div>
          <div className="moduleContainer" style={{ marginTop: "2%" }}>
            <div
              className={activeModule === 1 ? "moduleBtnActive" : "moduleBtn"}
              onClick={() => {
                setActiveModule(1);
              }}
            >
              Table View
            </div>
            <div
              className={activeModule === 2 ? "moduleBtnActive" : "moduleBtn"}
              onClick={() => {
                setActiveModule(2);
              }}
            >
              Chart View
            </div>
          </div>
          {activeModule === 1 ? (
            <>
              {filteredQuestions.length > 0 && (
                <table
                  style={{
                    borderCollapse: "collapse",
                    width: "100%",
                    marginTop: "2%",
                  }}
                >
                  <thead>
                    <tr>
                      {[
                        "#",
                        "Topic",
                        "Total Qs",
                        "Correct Qs",
                        "Avg Mistakes",
                        "Accuracy",
                      ].map((col, idx) => (
                        <th key={idx} style={headerStyle}>
                          {col}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {filteredQuestions &&
                      filteredQuestions.map((q, rowIndex) => (
                        <tr
                          key={rowIndex}
                          style={{ color: "black", fontSize: "1.1vw" }}
                        >
                          <td style={cellStyle}>{rowIndex + 1}.</td>
                          <td style={cellStyle}>{q.topic}</td>
                          <td style={cellStyle}>{q.totalQs}</td>
                          <td style={cellStyle}>{q.correctQs}</td>
                          <td style={cellStyle}>{q.avgMistakes}</td>
                          <td style={cellStyle}>
                            {((q.correctQs / q.totalQs) * 100).toFixed(1)} %{" "}
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              )}
            </>
          ) : (
            <>
              {" "}
              {filteredQuestions.length > 0 ? (
                <>
                  <div className="supporterCharts">
                    <div className="pieChart">
                      <PieChart
                        series={[
                          {
                            data: filteredQuestions.map((q, index) => {
                              return {
                                id: index,
                                value: q.totalQs,
                                label: q.topic,
                              };
                            }),
                            innerRadius: 30,
                            outerRadius: 100,
                            paddingAngle: 5,
                            cornerRadius: 5,
                            startAngle: -45,
                            endAngle: 225,
                            cx: 150,
                            cy: 150,
                          },
                        ]}
                        width={isMobile ? 380 : 500}
                        height={300}
                      />
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="supporterCharts">
                    <div className="pieChart">
                      <PieChart
                        series={[
                          {
                            data: [
                              {
                                id: 0,
                                value: 10,
                                label: "No data found",
                              },
                              {
                                id: 0,
                                value: 5,
                                label: "Dummy data preview",
                              },
                            ],
                            innerRadius: 30,
                            outerRadius: 100,
                            paddingAngle: 5,
                            cornerRadius: 5,
                            startAngle: -45,
                            endAngle: 225,
                            cx: 150,
                            cy: 150,
                          },
                        ]}
                        width={isMobile ? 380 : 500}
                        height={300}
                      />
                    </div>
                  </div>
                </>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default AnalysisCharts;
