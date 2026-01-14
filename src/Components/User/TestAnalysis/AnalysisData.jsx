import React, { useEffect, useState } from "react";
import "./TestAnalysis.css";
import CustomRadio from "Components/CustomComponents/CustomButton/CustomRadio";
import CustomButton from "Components/CustomComponents/CustomButton/CustomButton";
import { easeIn } from "framer-motion";
import { useMediaQuery } from "Components/Custom_hooks/Custom";
const AnalysisData = ({ userData }) => {
  const isMobile = useMediaQuery("(max-width:430px)");
  const [strategy, setStrategy] = useState("");
  const [subject, setSubject] = useState("");
  const [domain, setDomain] = useState("");
  const [subdomain, setSubdomain] = useState("");
  const [viewType, setViewType] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [topic, setTopic] = useState("");
  const [subTopic, setSubTopic] = useState("");
  const [filteredQuestions, setFilteredQuestions] = useState([]);
  const [qNo, setQNo] = useState(0);
  const [subTopicToRender, setSubTopicToREnder] = useState([]);
  const topicSelectorPAM = [
    {
      topic: "Exponent Rules",
      subTopic: ["Simplification of expressions using exponent rules"],
    },
    {
      topic: "Basic function questions",
      subTopic: [
        "Function graph intrepretation",
        "Comparrision of two functions",
        "Function evaluation at a given point",
      ],
    },
    {
      topic: "Radical equations",
      subTopic: ["Solving radical equations"],
    },
    {
      topic: "Polynomial",
      subTopic: [
        "Equivalent expression/simplification based questions",
        "Identifying functions using graphs(Factor theorem)",
      ],
    },
    {
      topic: "Exponential functions",
      subTopic: [
        "Solving exponential functions",
        "Identifying y-intercept of exponential functions",
        "Linear versus exponential functions(Distinguishing/Comparing)",
        "Compound interest problems",
        "Identifying exponential function of a graph",
        "Identifying exponential function for a word problem",
        "Interpreting y-intercept / rate of exponential function",
      ],
    },
    {
      topic: "Absolute value equations and inequalities",
      subTopic: [
        "Framing / solving of absolute value equation / inequalities",
        "Absolute value equations inequalities",
      ],
    },
    {
      topic: "Parabolas",
      subTopic: [
        "Identifying x/y intercept of a parabola",
        "Identifying x/y coordinate of vertex of parabola",
        "Converting one form to another for parabolas",
        "Word problems on parabolas",
        "Identification of equations using graphs",
      ],
    },
    {
      topic: "Quadratic equations",
      subTopic: [
        "Sum and Product of roots (cubic)",
        "Sum and Product of roots (quadratic)",
        "Solving system of one linear and one quadratic equation",
        "Solving quadratic equations",
        "Using discriminant of a quadratic equation(no. of x intercepts)",
        "Frame quadratic equation and solve",
        "Complex numbers",
      ],
    },
    {
      topic: "Transformations of graph",
      subTopic: [
        "Transformations of graph",
        "Transformation of linear equations",
        "Circles",
        "Exponential functions",
        "Rational functions",
        "Transformation of parabolas",
        "Function graphs",
      ],
    },
  ];
  const topicSelectorHOA = [
    {
      topic: "Linear equations in one or two variables",
      subTopic: [
        "Identifiaction of linear equations for word problems",
        "Interpreting slope/y-intercept of linear functions",
        "Identification for linear equation using graphs",
        "Finding linear function (using x,f(x))",
        "Conditions of solvability for slop intercept form",
        "Solving simultaneous linear equations in two variables",
        "Solving linear equation in one variable",
      ],
    },
    {
      topic: "Linear inequalities",
      subTopic: [
        "Solving linear inequality in one variable",
        "Solving linear inequality in two variable",
        "Absolute value functions (Equations/inequalities)",
      ],
    },
  ];
  const topicSelectorPSDA = [
    {
      topic: "Research studies",
      subTopic: [
        "Confidence interval / Margin of error based inference",
        "Cause and effect questions",
        "Generalisation questions",
      ],
    },
    {
      topic: "Statistics",
      subTopic: [
        "Two way probablity table",
        "Effects on numerical values(outliers / removal of values)",
        "Table based data interpretation",
        "Graph based data interpretation",
        "Scatterplot based questions(including line of best fit)",
        "Data based calculation questions(mean/median.sd etc.)",
      ],
    },
    {
      topic: "Ratios, Rates, Percentages",
      subTopic: [
        "Questions on time , distance and speed",
        "Percentage based",
        "Unit change questions (other than areas and volumes)",
        "Area / volume based questions on ratios/ unit charge",
        "Calculating multipliers for percentage increase and decrease",
      ],
    },
  ];
  const topicSelectorGeometry = [
    {
      topic: "Lines and angles",
      subTopic: ["Basic properties"],
    },
    {
      topic: "Area and volumes",
      subTopic: ["Calculating area/volumes/dimensions of geometric figures"],
    },
    {
      topic: "Triangles",
      subTopic: [
        "Properties of triangles",
        "Trignometry",
        "Special triangles",
        "Similarity in triangels",
      ],
    },
    {
      topic: "Circles",
      subTopic: [
        "Arc length/area of sector calculations",
        "Circle properties (Angles/chords)",
        "Translations on circles",
        "Circle equations(identification/solving)",
        "Unit circle/circle trignometry",
      ],
    },
    {
      topic: "Polygons",
      subTopic: ["Angle sum properties", "length and area"],
    },
  ];

  const handleFilterQuestions = () => {
    let finalFilteredQuestions;

    const completedTests = userData.assignedTests
      .filter((test) => test.testStatus === "Completed")
      .slice(
        userData.assignedTests.length - qNo,
        userData.assignedTests.length
      );
    console.log("completedTests", completedTests);

    const allAnswers = completedTests.flatMap((test) => test.answers);

    finalFilteredQuestions = allAnswers.filter((q) => {
      // Apply subject (tags) filter
      if (subject) {
        const tags = q.question.tags.map((t) => t.toLowerCase());
        if (!tags.includes(subject.toLowerCase())) {
          return false;
        }
      }

      // Apply correctness filter
      if (viewType === "Correct only" || viewType === "Mistakes only") {
        const isObjective = q.question.type === "objective";
        const userAnswer = q.answer?.split(".")[0];
        const correctAnswer = q.question.answer?.trim();
        if (userAnswer === "") {
          return false;
        }
        let isCorrect;
        if (q.isUnattempted === true) {
          isCorrect = false;
        } else {
          isCorrect = isObjective
            ? userAnswer === correctAnswer
            : q.answer === q.question.answer;
        }

        if (viewType === "Correct only" && !isCorrect) {
          return false;
        }

        if (viewType === "Mistakes only" && isCorrect) {
          return false;
        }
      }

      // Apply difficulty filter
      if (difficulty && q.question.difficulty !== difficulty) {
        return false;
      }

      // Apply topic filter
      if (topic && q.question.topic !== topic) {
        return false;
      }

      // Apply subTopic filter
      if (subTopic && q.question.subTopic !== subTopic) {
        return false;
      }

      // If all checks passed
      return true;
    });

    setFilteredQuestions(finalFilteredQuestions);
  };

  useEffect(() => {
    handleFilterQuestions();
  }, [
    strategy,
    subject,
    domain,
    subdomain,
    viewType,
    difficulty,
    topic,
    subTopic,
    qNo,
    subTopicToRender,
  ]);

  useEffect(() => {
    if (window?.MathJax && window?.MathJax?.typesetPromise) {
      window.MathJax.typesetPromise();
    }
  }, [filteredQuestions]);

  const findCorrectAnswer = (q) => {
    if (q.isUnattempted === true) {
      return "Unattempted";
    }
    if (q.question.type === "objective") {
      if (q.answer.split(".")[0] === q.question.answer) {
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
  return (
    <>
      <div className="reviewerMainCintainer">
        <div className="reviewerContainer">
          <div className="flexContent gap">
            <div className="filters strategyFilter">
              <div className="miniHeader">Filter Mocks</div>
              <div
                onClick={() => {
                  setQNo(userData.assignedTests.length);
                }}
              >
                <CustomRadio
                  label={"All"}
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
                  label={"Last two"}
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
                  label={"Last five"}
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
                  label={"Last eight"}
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
                  setSubTopicToREnder([]);
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
              <div className="miniHeader">Domain</div>
              {subject === "Maths" ? (
                <div>
                  <div
                    onClick={() => {
                      setSubdomain("");
                      setSubTopicToREnder([]);

                      // handleSetDomain("Algebra");
                    }}
                  >
                    <CustomRadio
                      label={"Algebra"}
                      setType={setDomain}
                      setter={"Algebra"}
                      type={domain}
                      isDissabled={strategy === "" || subject === ""}
                    />
                  </div>
                  <div
                    onClick={() => {
                      setSubTopicToREnder([]);
                      setSubdomain("");
                      // handleSetDomain("Misc");
                    }}
                  >
                    <CustomRadio
                      label={"Misc"}
                      setType={setDomain}
                      setter={"Misc"}
                      type={domain}
                      isDissabled={strategy === "" || subject === ""}
                    />
                  </div>
                </div>
              ) : (
                <div>
                  <div
                    onClick={() => {
                      // handleSetDomain("Reading");
                    }}
                  >
                    <CustomRadio
                      label={"Reading"}
                      setType={setDomain}
                      setter={"Reading"}
                      type={domain}
                      isDissabled={strategy === "" || subject === ""}
                    />
                  </div>
                  <div
                    onClick={() => {
                      // handleSetDomain("Writing");
                    }}
                  >
                    <CustomRadio
                      label={"Writing"}
                      setType={setDomain}
                      setter={"Writing"}
                      type={domain}
                      isDissabled={strategy === "" || subject === ""}
                    />
                  </div>
                </div>
              )}
            </div>

            {subject === "Maths" && (
              <div className="filters">
                <div className="miniHeader">Subdomain</div>
                {domain === "Algebra" ? (
                  <>
                    <div
                      onClick={() => {
                        // handleSetSubDomain("PAM");
                      }}
                    >
                      <CustomRadio
                        label={"PAM"}
                        setType={setSubdomain}
                        setter={"PAM"}
                        type={subdomain}
                        isDissabled={
                          strategy === "" || subject === "" || domain === ""
                        }
                      />
                    </div>
                    <div
                      onClick={() => {
                        // handleSetSubDomain("HOA");
                      }}
                    >
                      <CustomRadio
                        label={"HOA"}
                        setType={setSubdomain}
                        setter={"HOA"}
                        type={subdomain}
                        isDissabled={
                          strategy === "" || subject === "" || domain === ""
                        }
                      />
                    </div>
                  </>
                ) : (
                  <>
                    <div
                      onClick={() => {
                        // handleSetSubDomain("Geometry");
                      }}
                    >
                      <CustomRadio
                        label={"Geometry"}
                        setType={setSubdomain}
                        setter={"Geometry"}
                        type={subdomain}
                        isDissabled={
                          strategy === "" || subject === "" || domain === ""
                        }
                      />
                    </div>
                    <div
                      onClick={() => {
                        // handleSetSubDomain("PSDA");
                      }}
                    >
                      <CustomRadio
                        label={"PSDA"}
                        setType={setSubdomain}
                        setter={"PSDA"}
                        type={subdomain}
                        isDissabled={
                          strategy === "" || subject === "" || domain === ""
                        }
                      />
                    </div>
                  </>
                )}
              </div>
            )}

            <div className="filters viewFilter">
              <div className="miniHeader">View Type</div>
              <div
                onClick={() => {
                  // handleSetviewType(0, "Mistakes only");
                }}
              >
                <CustomRadio
                  label={"Mistakes only"}
                  setType={setViewType}
                  setter={"Mistakes only"}
                  type={viewType}
                />
              </div>
              <div
                onClick={() => {
                  // handleSetviewType(1, "Correct only");
                }}
              >
                <CustomRadio
                  label={"Correct only"}
                  setType={setViewType}
                  setter={"Correct only"}
                  type={viewType}
                />
              </div>
              <div
                onClick={() => {
                  // handleSetviewType(2, "All questions");
                }}
              >
                <CustomRadio
                  label={"All questions"}
                  setType={setViewType}
                  setter={"All questions"}
                  type={viewType}
                />
              </div>
            </div>
            <div className="filters">
              <div className="miniHeader">Difficulty</div>
              <div
                onClick={() => {
                  // handleSetDifficulty("easy");
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
                  // handleSetDifficulty("moderate");
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
                  // handleSetDifficulty("hard");
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
          {subject === "Maths" && subdomain !== "" && (
            <div className="topicsContainer">
              <div className="topicHeader">Select Topic</div>
              <div className="subTopics">
                {(subdomain === "PAM"
                  ? topicSelectorPAM
                  : subdomain === "HOA"
                  ? topicSelectorHOA
                  : subdomain === "PSDA"
                  ? topicSelectorPSDA
                  : topicSelectorGeometry
                ).map((t, index) => {
                  return (
                    <>
                      <div
                        className="subTopic"
                        key={index}
                        onClick={() => setSubTopicToREnder(t.subTopic)}
                      >
                        <CustomRadio
                          label={t.topic}
                          setType={setTopic}
                          setter={t.topic}
                          type={topic}
                        />
                      </div>
                    </>
                  );
                })}
              </div>
            </div>
          )}
          {subTopicToRender.length > 0 && (
            <div className="topicsContainer">
              <div className="topicHeader">Select Subtopic</div>
              <div className="subsubTopics">
                {subTopicToRender &&
                  subTopicToRender.map((st, index) => {
                    return (
                      <div className="subTopic" key={index}>
                        <CustomRadio
                          label={st}
                          setType={setSubTopic}
                          setter={st}
                          type={subTopic}
                        />
                      </div>
                    );
                  })}
              </div>
            </div>
          )}
          {/* 
          <CustomButton
            text={"Search"}
            handleClick={handleFilterQuestions}
            style={{ width: "12%", marginLeft: "88%" }}
          /> */}
          {filteredQuestions.length > 0 && (
            <div className="topicsContainer">
              <div className="topicHeader">Questions</div>
              {filteredQuestions &&
                filteredQuestions?.map((q, index) => (
                  <div
                    className=" questionContainerForResult"
                    key={index}
                    style={{ borderRadius: "2vw" }}
                  >
                    <div className="questionIndex">
                      <div className="indexNo">{index + 1}.</div>
                      <div
                        style={{
                          display: "flex",
                          gap: "2%",
                        }}
                      >
                        {!q.isUnattempted && (
                          <div className="indexItem">Time Taken {q.time}s</div>
                        )}

                        <div className="indexItem">{findCorrectAnswer(q)}</div>
                      </div>
                    </div>
                    <div className="questionDescriptor">
                      <div className="questionElementContainer">
                        <div className="imageContainer uploaderImage">
                          {false ? (
                            <>
                              <div
                                title="Upload question image"
                                style={{ cursor: "pointer" }}
                                // onClick={handleUploadImage}
                              >
                                {q.question.diagram !== "" && (
                                  <div>
                                    <img
                                      src={q.question.diagram}
                                      alt="diagram"
                                      height={"60%"}
                                      width={"60%"}
                                      style={{ marginLeft: "23%" }}
                                    />
                                  </div>
                                )}
                              </div>
                            </>
                          ) : (
                            <>
                              <div>
                                <div>
                                  {q.question.diagram === "" ? (
                                    <>
                                      {/* <img
                                        width="30"
                                        height="30"
                                        src="https://img.icons8.com/ios-glyphs/30/737373/no-image.png"
                                        alt="no-image"
                                      /> */}
                                    </>
                                  ) : (
                                    <>
                                      <img
                                        src={q.question.diagram}
                                        alt="diagram"
                                        height={"60%"}
                                        width={"60%"}
                                        style={{ marginLeft: "23%" }}
                                      />
                                    </>
                                  )}
                                </div>
                              </div>
                            </>
                          )}
                        </div>
                        <div className="extractedText textHead">Title</div>
                        {false ? (
                          <textarea
                            value={q.question.title}
                            className="editArea"
                            onChange={(ev) => {}}
                            style={{ height: "6vh" }}
                          />
                        ) : (
                          <>
                            <div className="extractedText">
                              {q.question.title}
                            </div>
                          </>
                        )}
                        {q.question.passage && (
                          <>
                            <div className="extractedText textHead">
                              Passage
                            </div>
                            {false ? (
                              <textarea
                                value={q.question.passage}
                                className="editArea"
                                onChange={(ev) => {}}
                              />
                            ) : (
                              <>
                                <div
                                  className="extractedText"
                                  span
                                  dangerouslySetInnerHTML={{
                                    __html: q.question.passage,
                                  }}
                                >
                                  {/* {q.question.passage} */}
                                </div>
                              </>
                            )}
                          </>
                        )}
                        <div className="extractedText textHead">Question</div>
                        {false ? (
                          <textarea
                            value={q.question.question}
                            className="editArea"
                            onChange={(ev) => {}}
                          />
                        ) : (
                          <div
                            className="extractedText"
                            dangerouslySetInnerHTML={{
                              __html: q.question.question,
                            }}
                          >
                            {/* {q.question.question} */}
                          </div>
                        )}
                      </div>
                      <div className="questionElementContainer">
                        {q.question?.options[0] &&
                          q.question.type === "objective" && (
                            <div className="extractedText textHead">
                              Options
                            </div>
                          )}
                        {q.question?.options[0] &&
                          q.question.type === "objective" && (
                            <>
                              {q.question.options.map((option, index) => (
                                <div className="extractedText options">
                                  {index === 0
                                    ? "A."
                                    : index === 1
                                    ? "B."
                                    : index === 2
                                    ? "C."
                                    : "D."}
                                  &nbsp;
                                  <span>
                                    {false ? (
                                      <textarea
                                        value={option.replace(
                                          index === 0
                                            ? "A. "
                                            : index === 1
                                            ? "B. "
                                            : index === 2
                                            ? "C. "
                                            : "D. ",
                                          ""
                                        )}
                                        className="editArea optionEditArea"
                                        onChange={(ev) => {}}
                                      />
                                    ) : (
                                      <span className="extractedText">
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
                                      </span>
                                    )}
                                  </span>
                                </div>
                              ))}
                            </>
                          )}
                        <div className="extractedText textHead">
                          Correct Answer
                        </div>
                        <div className="extractedText">
                          {false ? (
                            <textarea
                              value={q.question.answer}
                              className="editArea optionEditArea"
                              onChange={(ev) => {}}
                            />
                          ) : (
                            <div className="extractedText">
                              {q.question.answer}
                            </div>
                          )}
                        </div>
                        <div className="options">
                          <div className="extractedText textHead">
                            Your Answer
                          </div>
                          <div>
                            {q.answer !== ""
                              ? q.answer
                              : "Question not attempted"}
                          </div>
                        </div>
                        <div className="extractedText textHead">
                          Explanation
                        </div>
                        <div className="extractedText">
                          {false ? (
                            <textarea
                              value={q.question.explanation}
                              className="editArea"
                              onChange={(ev) => {}}
                            />
                          ) : (
                            <div className="extractedText">
                              {q.question.explanation}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                    {/* <div className="extraElementsContainer ">
                      <div className="questionElementContainer2">
                        <div>Tags</div>
                        <div className="tagsContainer">
                          {q.question?.tags?.map((tag, index) => (
                            <div key={index} className="tags">
                              &nbsp;
                              <span> {tag}</span>
                              &nbsp;&nbsp;&nbsp;&nbsp;
                              <span
                                style={{
                                  color: "red",
                                  cursor: "pointer",
                                }}
                                onClick={() => {
                                  // deleteTag(index);
                                }}
                              >
                                &times;
                              </span>
                              &nbsp;
                            </div>
                          ))}
                        </div>

                        <div>Question Type</div>
                        <div className="difficultyTypes">
                          <div className="checkBoxInput">
                            <div>
                              <input
                                type="checkbox"
                                name="type"
                                id=""
                                checked={q.question.type === "objective"}
                                onChange={() => {}}
                              />
                            </div>
                            <div className="extractedText">Objective</div>
                          </div>
                          <div className="checkBoxInput">
                            <div>
                              <input
                                type="checkbox"
                                name="type"
                                id=""
                                checked={q.question.type === "subjective"}
                                onChange={() => {}}
                              />
                            </div>
                            <div className="extractedText">Subjective</div>
                          </div>
                        </div>
                      </div>
                      <div className="questionElementContainer2">
                        <div>Difficulty Level</div>
                        <div className="difficultyTypes">
                          <div className="checkBoxInput">
                            <div>
                              <input
                                type="checkbox"
                                name="level"
                                id=""
                                checked={q.question.difficulty === "easy"}
                                onChange={() => {}}
                              />
                            </div>
                            <div className="extractedText">Easy</div>
                          </div>
                          <div className="checkBoxInput">
                            <div>
                              <input
                                type="checkbox"
                                name="level"
                                id=""
                                checked={q.question.difficulty === "moderate"}
                                onChange={() => {}}
                              />
                            </div>
                            <div className="extractedText">Moderate</div>
                          </div>
                          <div className="checkBoxInput">
                            <div>
                              <input
                                type="checkbox"
                                name="level"
                                id=""
                                checked={q.question.difficulty === "hard"}
                                onChange={() => {}}
                              />
                            </div>
                            <div className="extractedText">Hard</div>
                          </div>
                        </div>
                        <div
                          style={{
                            display: "flex",
                            gap: "4%",
                            // marginTop: !isMobile ? "10%" : "20%",
                          }}
                        ></div>
                      </div>
                    </div> */}
                  </div>
                ))}
            </div>
          )}

          {/* )} */}
        </div>
      </div>
    </>
  );
};

export default AnalysisData;
