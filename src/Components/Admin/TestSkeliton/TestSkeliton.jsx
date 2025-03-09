import React, { useState } from "react";
import "./TestSkeliton.css";
import CustomButton from "../../CustomComponents/CustomButton/CustomButton";
import { useModelState } from "../../Custom_hooks/Custom";
import CustomModal from "../../CustomComponents/CustomModal/CustomModal";
import { useNavigate, useLocation } from "react-router";
import ClimbingBoxLoader from "react-spinners/ClipLoader";
import { PostRoute } from "../../Custom_hooks/Routes";
import { toast } from "react-toastify";
import { useMediaQuery } from "../../Custom_hooks/Custom";

const TestSkeliton = ({ tests, heading }) => {
  const isMobile = useMediaQuery("(max-width:700px)");
  const location = useLocation();
  const { user } = location.state || {};
  const userToAssignTest = user;
  const { isOpen, open, close } = useModelState();
  const navigate = useNavigate();
  const [selectedTests, setSelectedTests] = useState([]);
  const [loader, setLoader] = useState(false);
  const [isChecking, setIsChecking] = useState(false);
  const [checkingData, setCheckingData] = useState();

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
      return toast.error("No test selected . Please Select a test to assign.");
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
        toast.success("Tests successfully assigned the student.");

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
                  }}
                  src="https://img.icons8.com/ios-filled/50/circled-left-2.png"
                  alt="circled-left-2"
                />
              )}

              {isChecking ? (
                <>
                  <div className="testHeaderText">
                    {checkingData.name.toUpperCase()} (
                    {checkingData.totalMarks} Marks | {checkingData.testTime}{" "}
                    Min)
                  </div>
                </>
              ) : (
                <div className="testHeaderText"> {heading}</div>
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
            <div style={{ width: "98%", marginLeft: "1%" }}>
              <CustomButton
                text={`Type - ${checkingData.type}`}
                style={{
                  width: "auto",
                  margin: "1%",
                }}
                isDissabled={false}
              />

              <div className="allTestsContainer" style={{padding:'1%'}}>
                {checkingData &&
                  checkingData.Test.map((q, index) => {
                    return (
                      <>
                        <div
                          className=" questionContainerForResult"
                          key={index}
                          style={{ borderRadius: "2vw" }}
                        >
                          <div className="mainQuestionContainer">
                            <div className="questionImageontainer">
                              <div>
                                <img
                                  src={q.diagram}
                                  alt="question img"
                                  className="questionImage"
                                />
                              </div>
                            </div>
                            <div className="question" style={{display:'flex',textAlign:'left',alignItems:'left',justifyContent:'left'}}>{index+1} . {q.question}</div>
                            <div className="optionsContainer">
                              {q.options.length > 0 ? (
                                q.options.map((option, optIndex) => {
                                  return (
                                    <div className="option" key={optIndex}>
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
                                  <input
                                    placeholder="Your answer"
                                    value={""}
                                    onChange={(ev) => {}}
                                  />
                                </div>
                              )}
                            </div>
                          </div>
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
                tests.map((test, index) => {
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
                          <div className="testNameInfo">{test.name}</div>
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
