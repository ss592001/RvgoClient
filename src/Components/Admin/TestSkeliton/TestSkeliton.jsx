import React, { useState, useEffect } from "react";
import "./TestSkeliton.css";
import CustomButton from "../../CustomComponents/CustomButton/CustomButton";
import { useModelState } from "../../Custom_hooks/Custom";
import CustomModal from "../../CustomComponents/CustomModal/CustomModal";
import { useNavigate, useLocation } from "react-router";
import ClimbingBoxLoader from "react-spinners/ClipLoader";
import { PostRoute } from "../../Custom_hooks/Routes";
import { toast } from "react-toastify";
import { useMediaQuery } from "../../Custom_hooks/Custom";
import { useDispatch } from "react-redux";
import CustomInput from "Components/CustomComponents/CustomInput/CustomInput";
import Swal from "sweetalert2";
import { setActiveTest, setTester } from "Components/Redux/Store";

import { motion, AnimatePresence } from "framer-motion";

const TestsGrid = ({
  tests,
  userToAssignTest,
  selectedTests,
  handleSelectTests,
  handleStartTest,
  handleViewTest,
  handleFindIsTestAlreadyAssigned,
  getDateAndTime,
  heading,
  isMobile,
}) => {
  return (
    <div
      className="allTestsContainer"
      style={{
        height: "87vh",
        display: "grid",
        gridTemplateColumns: isMobile ? "1fr" : "repeat(2, 1fr)",
        gap: "1.5rem",
        padding: "1rem",
        overflowY: "auto",
      }}
    >
      {tests?.length > 0 ? (
        <AnimatePresence>
          {[...tests].reverse().map((test, index) => {
            const isAssigned = handleFindIsTestAlreadyAssigned(test);
            const isSelected = selectedTests.some(
              (_test) => _test.testId === test._id
            );

            return (
              <motion.div
                key={test._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                whileHover={{
                  scale: isAssigned ? 1 : 1.03,
                  boxShadow: isAssigned
                    ? "0px 0px 0px rgba(0,0,0,0)"
                    : "0px 8px 20px rgba(0,0,0,0.12)",
                }}
                className="testCard"
                style={{
                  background: "#fff",
                  borderRadius: "12px",
                  padding: "1rem",
                  position: "relative",
                  border: `2px solid ${isSelected ? "#333F6B" : "#E0E0E0"}`,
                  cursor: isAssigned ? "not-allowed" : "pointer",
                  opacity: isAssigned ? 0.5 : 1,
                  transition: "all 0.3s ease-in-out",
                }}
              >
                <div
                  className="testInfoContainer"
                  onClick={() => !userToAssignTest && handleStartTest(test)}
                >
                  <h3
                    className="testName"
                    style={{
                      color: "#333F6B",
                      fontSize: isMobile ? "1.2rem" : "1.5rem",
                      marginBottom: "0.5rem",
                    }}
                  >
                    {test.name}
                  </h3>
                  <p
                    className="testDescription"
                    style={{
                      color: "#555",
                      fontSize: isMobile ? "0.9rem" : "1rem",
                      minHeight: "3rem",
                    }}
                  >
                    {test.description}
                  </p>

                  {/* Status */}
                  <div
                    className="testStatus"
                    style={{
                      display: "flex",
                      gap: "1rem",
                      marginTop: "0.8rem",
                    }}
                  >
                    <div style={{ fontSize: "0.8rem", color: "#777" }}>
                      <div>Uploaded At</div>
                      <div style={{ fontWeight: 600 }}>
                        {getDateAndTime(test.uploadedAt)}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                {userToAssignTest ? (
                  <input
                    type="checkbox"
                    checked={isSelected}
                    onChange={() => handleSelectTests(test)}
                    disabled={isAssigned}
                    className="checkBoxBtn shake"
                    style={{
                      position: "absolute",
                      top: "1rem",
                      right: "1rem",
                      width: isMobile ? "1.5rem" : "1.2rem",
                      height: isMobile ? "1.5rem" : "1.2rem",
                    }}
                  />
                ) : (
                  <CustomButton
                    text="View"
                    handleClick={() => handleViewTest(test)}
                    style={{
                      position: "absolute",
                      bottom: "1rem",
                      right: "1rem",
                      backgroundColor: "#333F6B",
                      color: "#fff",
                      padding: isMobile ? "0.4rem 0.8rem" : "0.6rem 1rem",
                      fontSize: isMobile ? "0.8rem" : "0.9rem",
                    }}
                  />
                )}
              </motion.div>
            );
          })}
        </AnimatePresence>
      ) : (
        <motion.div
          className="noTestMessage"
          style={{
            gridColumn: "1 / -1",
            textAlign: "center",
            fontSize: isMobile ? "1rem" : "1.2rem",
            color: "#333F6B",
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          No {heading} Uploaded !!!
        </motion.div>
      )}
    </div>
  );
};

const TestSkeliton = ({ tests, heading }) => {
  const dispatch = useDispatch();
  const isMobile = useMediaQuery("(max-width:700px)");
  const location = useLocation();
  const { user } = location.state || {};
  const userToAssignTest = user;
  const navigate = useNavigate();
  const [selectedTests, setSelectedTests] = useState([]);
  const [loader, setLoader] = useState(false);
  const [isChecking, setIsChecking] = useState(false);
  const [checkingData, setCheckingData] = useState();
  const [activeModule, setActiveModule] = useState(0);
  const [start, setStart] = useState(0);
  const [end, setEnd] = useState(checkingData?.Test?.length);

  console.log("tests", tests);
  const containerVariants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.08 },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const handleManageModule = (module) => {
    if (!checkingData.Flt) {
      if (checkingData.sectional === 1) {
        if (module === 3) {
          setStart(0);
          return setEnd(22);
        } else if (module === 4) {
          setStart(22);
          return setEnd(44);
        }
      } else if (checkingData.sectional === 2) {
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

  useEffect(() => {
    if (window?.MathJax && window?.MathJax?.typesetPromise) {
      window?.MathJax?.typesetPromise();
    }
  });

  const getDateAndTime = (dateTimeString) => {
    const dateObj = new Date(dateTimeString);
    const extractedDate = dateObj.toLocaleDateString();
    const extractedTime = dateObj.toLocaleTimeString();
    return `${extractedDate} - ${extractedTime}`;
  };
  const handleSelectTests = (test) => {
    const isPresent = selectedTests.findIndex(
      (_test, index) => _test.testId === test._id
    );
    if (isPresent >= 0) {
      const updatedTests = selectedTests.filter(
        (_test, index) => _test.testId !== test._id
      );
      setSelectedTests(updatedTests);
    } else {
      setSelectedTests([
        ...selectedTests,
        {
          testId: test._id,
          testType: test.type,
          testName: test.name,
          testDescription: test.description,
          testStatus: "Pending",
          assignedAt: new Date(),
          answers: [],
          startTime: "",
          endTime: "",
        },
      ]);
    }
  };
  const handleSubmit = () => {
    if (selectedTests.length === 0) {
      return Swal.fire({
        title: "Error",
        text: "No test selected. Please select atleat 1 test to assign.",
        icon: "error",
      });
    }
    const bodyData = {
      assignedTests: selectedTests,
      userId: userToAssignTest._id,
    };
    PostRoute(
      "assignTest",
      () => {
        setLoader(true);
      },
      (res) => {
        console.log(res);
        setLoader(false);
        Swal.fire({
          title: "Success!",
          text: "Test(s) successfully assigned to the student.",
          icon: "success",
        });
        navigate("/admin/access/users");
        // toast.success("Tests successfully assigned the student.");

        setSelectedTests([]);
      },
      bodyData
    );
  };

  const handleFindIsTestAlreadyAssigned = (test) => {
    if (!user) {
      return false;
    }
    const testIndex = user?.assignedTests.findIndex(
      (_test) => _test.testId === test._id
    );

    return testIndex === -1 ? false : true;
  };

  const handleViewTest = (test) => {
    setIsChecking(true);
    console.log("test", test);
    setCheckingData(test);
  };

  const handleTakeTest = (test) => {
    if (isMobile) {
      return toast.error(
        "Error !! Device not supported for taking test. Please use a desktop to attempt the test."
      );
    }
    dispatch(setActiveTest(test));
    dispatch(setTester("admin"));
    navigate("/test/description", { state: { test } });
  };

  const handleStartTest = (test) => {
    // Swal.fire({
    //   title: "Begin Testing the Paper?",
    //   text: "This test is just a dummy test and will not be saved for future verification.",
    //   icon: "warning",
    //   showCancelButton: true,
    //   confirmButtonColor: "#3085d6",
    //   cancelButtonColor: "#d33",
    //   confirmButtonText: "Start",
    // }).then((result) => {
    //   if (result.isConfirmed) {
    //     handleTakeTest(test);
    //   }
    // });
  };

  const handleEditTest = (data) => {
    navigate("/admin/test/upload", { state: { data } });
  };
  return (
    <>
      <div className="testContainer">
        <div
          className="testHeader"
          style={{
            height: isMobile ? "auto" : "",
            alignItems: "center",
            display: "flex",
          }}
        >
          {!userToAssignTest && (
            <>
              {isChecking && (
                <img
                  width="40"
                  height="40"
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    setIsChecking(false);
                    setCheckingData();
                    setStart();
                    setEnd();
                    setActiveModule(0);
                  }}
                  src="https://img.icons8.com/sf-black-filled/64/333f6b/long-arrow-left.png"
                  alt="circled-left-2"
                />
              )}

              {isChecking ? (
                <>
                  <div
                    className="testHeaderText marksTimeHeader"
                    style={{ color: "#333F6B" }}
                  >
                    {checkingData.name.toUpperCase()}
                  </div>
                </>
              ) : (
                <div className="testHeaderText" style={{ color: "#333F6B" }}>
                  {" "}
                  {heading}
                </div>
              )}
            </>
          )}
          {userToAssignTest && (
            <div style={{ display: "flex", width: "75%" }}>
              <div className="userToAssignTestHeader">
                Assigning {heading} to {userToAssignTest?.name}
              </div>
              {loader ? (
                <>
                  <div
                    style={
                      !isMobile
                        ? {
                            position: "fixed",
                            right: "7%",
                            top: "5%",
                          }
                        : {
                            position: "fixed",
                            right: "7%",
                            top: "7%",
                          }
                    }
                  >
                    <ClimbingBoxLoader
                      color={"rgb(126, 23, 28)"}
                      loading={loader}
                      size={20}
                      aria-label="Loading Spinner"
                      data-testid="loader"
                    />
                  </div>
                </>
              ) : (
                <CustomButton
                  text={"Assign Test"}
                  style={
                    !isMobile
                      ? {
                          width: "15%",
                          position: "fixed",
                          right: "2%",
                          marginTop: "0%",
                          marginLeft: "2%",
                          backgroundColor: "blue",
                        }
                      : {
                          width: "30%",
                          height: "32px",
                          position: "fixed",
                          right: "2%",
                          marginTop: "0%",
                          marginLeft: "2%",
                          backgroundColor: "blue",
                        }
                  }
                  // isDissabled={selectedTests.length === 0}
                  handleClick={() => {
                    handleSubmit();
                  }}
                />
              )}
            </div>
          )}
        </div>

        {isChecking ? (
          <>
            <div
              style={{
                width: "98%",
                marginLeft: "1%",
                marginTop: "1%",
                paddingBottom: "1%",
              }}
            >
              {checkingData.Flt === true || checkingData.sectional !== 0 ? (
                <>
                  <div
                    onClick={() => {
                      handleEditTest(checkingData);
                    }}
                    title="Edit Test"
                    style={{
                      display: "flex",
                      textAlign: "right",
                      alignItems: "flex-end",
                      justifyContent: "right",
                      cursor: "pointer",
                      position: "fixed",
                      backgroundColor: "transparent",
                      right: "2%",
                      marginTop: isMobile ? "-32%" : "",
                    }}
                  >
                    <img
                      width="44"
                      height="44"
                      src="https://img.icons8.com/ios-filled/50/333f6b/edit-property.png"
                      alt="create-new"
                    />
                  </div>
                </>
              ) : (
                <>
                  <div
                    onClick={() => {
                      handleEditTest(checkingData);
                    }}
                    title="Edit Test"
                    style={{
                      display: "flex",
                      textAlign: "left",
                      alignItems: "flex-start",
                      justifyContent: "left",
                      cursor: "pointer",
                      width: "100%",
                      height: "auto",
                      paddingLeft: "1.4%",
                      backgroundColor: "white",
                    }}
                  >
                    <img
                      width="44"
                      height="44"
                      src="https://img.icons8.com/ios-filled/50/333f6b/edit-property.png"
                      alt="create-new"
                    />
                  </div>
                </>
              )}

              <div
                className="moduleContainer"
                style={
                  checkingData.Flt ? { display: "flex" } : { display: "none" }
                }
              >
                <div
                  className={
                    activeModule === 1 ? "moduleBtnActive" : "moduleBtn"
                  }
                  onClick={() => {
                    setActiveModule(1);
                    handleManageModule(1);
                  }}
                >
                  Section 1, Module 1 : Reading and Writing
                </div>
                <div
                  className={
                    activeModule === 2 ? "moduleBtnActive" : "moduleBtn"
                  }
                  onClick={() => {
                    setActiveModule(2);
                    handleManageModule(2);
                  }}
                >
                  Section 1, Module 2 : Reading and Writing
                </div>
                <div
                  className={
                    activeModule === 3 ? "moduleBtnActive" : "moduleBtn"
                  }
                  onClick={() => {
                    setActiveModule(3);
                    handleManageModule(3);
                  }}
                >
                  Section 2, Module 1 : Maths
                </div>
                <div
                  className={
                    activeModule === 4 ? "moduleBtnActive" : "moduleBtn"
                  }
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
                  checkingData.sectional === 2
                    ? { display: "flex" }
                    : { display: "none" }
                }
              >
                <div
                  className={
                    activeModule === 1 ? "moduleBtnActive" : "moduleBtn"
                  }
                  onClick={() => {
                    setActiveModule(1);
                    handleManageModule(1);
                  }}
                >
                  Module 1 : Reading and Writing
                </div>
                <div
                  className={
                    activeModule === 2 ? "moduleBtnActive" : "moduleBtn"
                  }
                  onClick={() => {
                    setActiveModule(2);
                    handleManageModule(2);
                  }}
                >
                  Module 2 : Reading and Writing
                </div>
              </div>
              <div
                className="moduleContainer"
                style={
                  checkingData.sectional === 1
                    ? { display: "flex" }
                    : { display: "none" }
                }
              >
                <div
                  className={
                    activeModule === 3 ? "moduleBtnActive" : "moduleBtn"
                  }
                  onClick={() => {
                    setActiveModule(3);
                    handleManageModule(3);
                  }}
                >
                  Module 1 : Maths
                </div>
                <div
                  className={
                    activeModule === 4 ? "moduleBtnActive" : "moduleBtn"
                  }
                  onClick={() => {
                    setActiveModule(4);
                    handleManageModule(4);
                  }}
                >
                  Module 2 : Maths
                </div>
              </div>
              <div className="allTestsContainer" style={{ padding: "1%" }}>
                {checkingData &&
                  checkingData.Test.slice(start, end).map((question, index) => {
                    return (
                      <>
                        {/* {checkingData.Flt && splitToModules(index + 1)} */}
                        <div
                          className=" questionContainerForResult"
                          key={index}
                          style={
                            !checkingData.Flt || checkingData.sectional === 0
                              ? {}
                              : { borderRadius: "2vw" }
                          }
                        >
                          <div className="questionIndex">
                            <div className="indexNo">{index + 1}.</div>
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
                                      {question.diagram !== "" && (
                                        <div>
                                          <img
                                            src={question.diagram}
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
                                        {question.diagram === "" ? (
                                          <>
                                            <img
                                              width="30"
                                              height="30"
                                              src="https://img.icons8.com/ios-glyphs/30/737373/no-image.png"
                                              alt="no-image"
                                            />
                                          </>
                                        ) : (
                                          <>
                                            <img
                                              src={question.diagram}
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
                              <div className="extractedText textHead">
                                Title
                              </div>
                              {false ? (
                                <textarea
                                  value={question.title}
                                  className="editArea"
                                  onChange={(ev) => {}}
                                  style={{ height: "6vh" }}
                                />
                              ) : (
                                <>
                                  <div className="extractedText">
                                    {question.title}
                                  </div>
                                </>
                              )}
                              {question.passage && (
                                <>
                                  <div className="extractedText textHead">
                                    Passage
                                  </div>
                                  {false ? (
                                    <textarea
                                      value={question.passage}
                                      className="editArea"
                                      onChange={(ev) => {}}
                                    />
                                  ) : (
                                    <>
                                      <div
                                        className="extractedText"
                                        dangerouslySetInnerHTML={{
                                          __html: question.passage,
                                        }}
                                      >
                                        {/* {question.passage} */}
                                      </div>
                                    </>
                                  )}
                                </>
                              )}
                              <div className="extractedText textHead">
                                Question
                              </div>
                              {false ? (
                                <textarea
                                  value={question.question}
                                  className="editArea"
                                  onChange={(ev) => {}}
                                />
                              ) : (
                                <div
                                  className="extractedText"
                                  dangerouslySetInnerHTML={{
                                    __html: question.question,
                                  }}
                                >
                                  {/* {question.question} */}
                                </div>
                              )}
                            </div>
                            <div className="questionElementContainer">
                              {question?.options[0] &&
                                question.type === "objective" && (
                                  <div className="extractedText textHead">
                                    Options
                                  </div>
                                )}
                              {question?.options[0] &&
                                question.type === "objective" && (
                                  <>
                                    {question.options.map((option, index) => (
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
                                Answer
                              </div>
                              <div className="extractedText">
                                {false ? (
                                  <textarea
                                    value={question.answer}
                                    className="editArea optionEditArea"
                                    onChange={(ev) => {}}
                                  />
                                ) : (
                                  <div className="extractedText">
                                    {question.answer}
                                  </div>
                                )}
                              </div>
                              <div className="extractedText textHead">
                                Explanation
                              </div>
                              <div className="extractedText">
                                {false ? (
                                  <textarea
                                    value={question.explanation}
                                    className="editArea"
                                    onChange={(ev) => {}}
                                  />
                                ) : (
                                  <div className="extractedText">
                                    {question.explanation}
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                          <div className="extraElementsContainer ">
                            <div className="questionElementContainer2">
                              <div>Tags</div>
                              <div className="tagsContainer">
                                {question?.tags?.map((tag, index) => (
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
                                      checked={question.type === "objective"}
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
                                      checked={question.type === "subjective"}
                                      onChange={() => {}}
                                    />
                                  </div>
                                  <div className="extractedText">
                                    Subjective
                                  </div>
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
                                      checked={question.difficulty === "easy"}
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
                                      checked={
                                        question.difficulty === "moderate"
                                      }
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
                                      checked={question.difficulty === "hard"}
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
                                  marginTop: !isMobile ? "10%" : "20%",
                                }}
                              ></div>
                            </div>
                          </div>
                          {/* <div className="mainQuestionContainer">
                            {q?.diagram && (
                              <div className="questionImageontainer">
                                <div>
                                  <img
                                    src={q.diagram}
                                    alt="question img"
                                    className="questionImage"
                                  />
                                </div>
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
                                    {index + 1}. Passage
                                  </span>{" "}
                                  <br />
                                  {q.passage}
                                </div>
                              </div>
                            )}

                            <div
                              style={{
                                textAlign: "left",
                                alignItems: "left",
                                justifyContent: "left",
                                fontSize: !isMobile ? "1.2vw" : "3vw",
                              }}
                            >
                              <span style={{ fontWeight: "bolder" }}>
                                {q.passage !== ""
                                  ? "Question"
                                  : `${index + 1}.`}
                                {q.passage !== "" ? <br /> : ""}
                              </span>{" "}
                              {q.question}
                            </div>
                            <div className="optionsContainer">
                              {q.options.length > 0 &&
                              q.type === "objective" ? (
                                q.options.map((option, optIndex) => {
                                  return (
                                    <div
                                      className="option"
                                      key={optIndex}
                                      style={{
                                        display: "flex",
                                        textAlign: "left",
                                        alignItems: "left",
                                        justifyContent: "left",
                                      }}
                                    >
                                      <span className="optionNo">
                                        {optIndex === 0
                                          ? "A"
                                          : optIndex === 1
                                          ? "B"
                                          : optIndex === 2
                                          ? "C"
                                          : "D"}
                                      </span>
                                      {option?.split(".")[1]
                                        ? option?.split(".")[1]
                                        : option}
                                    </div>
                                  );
                                })
                              ) : (
                                <div>
                                  <CustomInput
                                    label={"Answer"}
                                    value={q.answer}
                                    handleInputChange={() => {}}
                                  />
                                </div>
                              )}
                            </div>
                          
                          </div> */}
                        </div>
                      </>
                    );
                  })}
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="allTestsContainer" style={{ height: "87vh" }}>
              {tests?.length > 0 ? (
                [...tests].reverse().map((test, index) => {
                  return (
                    <>
                      <div
                        className="testElementsContainer"
                        style={{
                          opacity: handleFindIsTestAlreadyAssigned(test)
                            ? 0.5
                            : 1,
                          cursor: handleFindIsTestAlreadyAssigned(test)
                            ? "not-allowed"
                            : "pointer",
                        }}
                        title={
                          handleFindIsTestAlreadyAssigned(test)
                            ? userToAssignTest && "Test already assigned."
                            : userToAssignTest &&
                              "Click to select the test to assign."
                        }
                      >
                        <div className="elementContainer">
                          <div
                            onClick={() => {
                              handleStartTest(test);
                            }}
                            className="testNameInfo"
                            style={{ color: "#333F6B" }}
                          >
                            {test.name}
                          </div>
                          <div className="testOtherInfo">
                            {test.description}
                          </div>
                          <div className="testStatusContainer">
                            <div className="statusItemContainer">
                              <div className="statusItemHeader">
                                Uploaded At
                              </div>
                              <div className="statusItemValue">
                                {getDateAndTime(test.uploadedAt)}
                              </div>
                            </div>
                          </div>
                        </div>
                        {userToAssignTest ? (
                          <input
                            type="checkbox"
                            name={`checkBox${index}`}
                            id={`checkBox${index}`}
                            checked={selectedTests.some(
                              (_test, index) => _test.testId === test._id
                            )}
                            onChange={() => handleSelectTests(test)}
                            className="checkBoxBtn shake"
                            disabled={handleFindIsTestAlreadyAssigned(test)}
                          />
                        ) : (
                          <>
                            {" "}
                            <CustomButton
                              text={"View"}
                              style={{
                                width: "auto",
                                margin: "1%",
                                marginLeft: isMobile ? "25%" : "60%",
                                marginTop: isMobile ? "10%" : "3.7%",
                              }}
                              isDissabled={false}
                              handleClick={() => {
                                handleViewTest(test);
                              }}
                            />
                          </>
                        )}
                      </div>
                    </>
                  );
                })
              ) : (
                <div className="noTestMessage">No {heading} Uploaded !!!</div>
              )}
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default TestSkeliton;
