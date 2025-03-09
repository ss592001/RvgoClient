import React, { useEffect, useState } from "react";
import "./Users.css";
// import { USERS } from "./Fields.";
import { useLocation, useNavigate } from "react-router";
import CustomButton from "../../CustomComponents/CustomButton/CustomButton";
import { GetRoute } from "../../Custom_hooks/Routes";
import { SubmitTestConfirmation } from "../../CustomComponents/CustomTestPlatform/CustomTestPlatform";
import { PostRoute } from "../../Custom_hooks/Routes";
import ClimbingBoxLoader from "react-spinners/ClipLoader";
import { useMediaQuery } from "../../Custom_hooks/Custom";
import TestSkeliton from "../TestSkeliton/TestSkeliton";
import CustomTest from "Components/CustomComponents/CustomTest/CustomTest";
import CustomDataLoader from "Components/CustomComponents/CustomDataLoader";
const Users = () => {
  const isMobile = useMediaQuery("(max-width:430px)");
  const [users, setUsers] = useState([]);
  const [alert, setAlert] = useState(false);
  const [mainLoader, setMainLoader] = useState(false);
  const navigate = useNavigate();
  const [isChecking, setIsChecking] = useState(false);
  const [checkingData, setCheckingData] = useState();
  const [completedTests, setCompletedTests] = useState();
  const [header, setheader] = useState();

  const handleUserCheck = (data, header) => {
    setIsChecking(true);
    const myTests = data.filter((test) => test.testType.includes(header));
    setCheckingData(myTests);
    setheader(header);
  };

  useEffect(() => {
    GetRoute(
      `getAllUsers`,
      () => {
        setMainLoader(true);
      },
      (data) => {
        setUsers(data);
        console.log(data);
        setMainLoader(false);
      }
    );
  }, []);
  const handleFindCount = (tests, type) => {
    const foundTests = tests?.filter((test, index) => test.testType === type);
    console.log("found", foundTests);
    return foundTests.length;
  };
  const handleFindCompletedTests = (tests, type) => {
    const filteredTests = tests?.filter(
      (_test) => _test.testStatus === "Completed" && _test.testType === type
    );
    return filteredTests.length;
  };
  return (
    <>
      {isChecking ? (
        <>
          {/* <TestSkeliton tests={checkingData} heading={header} /> */}
          <CustomTest
            tests={checkingData}
            title={header}
            setIsChecking={setIsChecking}
            setCheckingData={setCheckingData}
          />
        </>
      ) : (
        <>
          <SubmitTestConfirmation
            isOpen={alert}
            onClose={() => {
              setAlert(!alert);
            }}
            onConfirm={() => {}}
            isCancelButtonVisible={true}
            isConfirmButtonVisible={false}
            message={
              "No user selected to assign this test. Please select atleast one user to assign test."
            }
            fontSize="1.3vw"
          />
          {mainLoader ? (
            <div className="loaderContainer userLoader">
             <CustomDataLoader/>
              <div className="loaderText">Loading LMS Users......</div>
            </div>
          ) : (
            <div className="testContainer">
              <div className="testHeader" style={{ display: "flex" }}>
                <div className="testHeaderText">Users</div>
              </div>
              <div className="allTestsContainer" style={{ height: "87vh" }}>
                {users &&
                  users.map((user, index) => {
                    return (
                      <>
                        <div className="testElementsContainer">
                          <div
                            className="elementContainer"
                            style={{ width: isMobile ? "90%" : "100%" }}
                          >
                            <div className="testNameInfo">
                              {user.name?.toUpperCase()}
                            </div>
                            <div className="testOtherInfo">{user.email}</div>
                            <div className="testStatusContainer overflowContainer">
                              <div className="statusItemContainer userAnalysisContainer">
                                <div className="statusItemHeader">
                                  {isMobile
                                    ? "Assigned Tests"
                                    : "Total Tests Assigned"}
                                </div>
                                <div className="statusItemValue">
                                  Mock -{" "}
                                  {handleFindCount(user.assignedTests, "Mock")}
                                </div>
                                <div className="statusItemValue">
                                  Practice -{" "}
                                  {handleFindCount(
                                    user.assignedTests,
                                    "Practice"
                                  )}
                                </div>
                                <div className="statusItemValue">
                                  Diagnostic -{" "}
                                  {handleFindCount(
                                    user.assignedTests,
                                    "diagnostic"
                                  )}
                                </div>
                              </div>
                              <div
                                style={{ cursor: "pointer" }}
                                className="statusItemContainer userAnalysisContainer"
                              >
                                <div className="statusItemHeader ">
                                  {isMobile
                                    ? "Completed Tests"
                                    : "Total Tests Completed"}
                                </div>
                                <div
                                  title="Clock to see mock tests"
                                  style={{ color: "blue" }}
                                  className="statusItemValue"
                                  onClick={() =>
                                    handleUserCheck(user.assignedTests, "Mock")
                                  }
                                >
                                  Mock -{" "}
                                  {handleFindCompletedTests(
                                    user.assignedTests,
                                    "Mock"
                                  )}
                                </div>
                                <div
                                  title="Click to see practice tests."
                                  style={{ color: "blue" }}
                                  className="statusItemValue"
                                  onClick={() =>
                                    handleUserCheck(
                                      user.assignedTests,
                                      "Practice"
                                    )
                                  }
                                >
                                  Practice -
                                  {handleFindCompletedTests(
                                    user.assignedTests,
                                    "Practice"
                                  )}
                                </div>

                                <div
                                  title="Click to see diagnostic tests."
                                  style={{ color: "blue" }}
                                  className="statusItemValue"
                                  onClick={() =>
                                    handleUserCheck(
                                      user.assignedTests,
                                      "diagnostic"
                                    )
                                  }
                                >
                                  Diagnostic -
                                  {handleFindCompletedTests(
                                    user.assignedTests,
                                    "diagnostic"
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>

                          <>
                            <div
                              style={{
                                // marginLeft: "-10%",
                                marginTop: isMobile ? "0%" : "2%",
                                justifyContent: "center",
                                alignItems: "center",
                                textAlign: "center",
                              }}
                            >
                              <div>
                                <CustomButton
                                  text={"Assign Mock Tests"}
                                  style={{
                                    height: isMobile ? "4vh" : "",
                                    margin: "1%",
                                    fontSize: isMobile ? "2vw" : "1vw",
                                    width: "100%",
                                  }}
                                  isDissabled={false}
                                  handleClick={() => {
                                    navigate("/admin/test/mock", {
                                      state: { user },
                                    });
                                  }}
                                />
                                <CustomButton
                                  text={"Assign Diagnostic Tests"}
                                  style={{
                                    height: isMobile ? "4vh" : "",
                                    margin: "1%",
                                    fontSize: isMobile ? "2vw" : "1vw",
                                    width: "100%",
                                  }}
                                  isDissabled={false}
                                  handleClick={() => {
                                    navigate("/admin/test/diagnostic", {
                                      state: { user },
                                    });
                                  }}
                                />
                              </div>
                              <div
                                style={{
                                  fontSize: isMobile ? "1.8vw" : "1.2vw",
                                }}
                              >
                                Assign Practice Tests
                              </div>
                              <div
                                style={{ display: isMobile ? "block" : "flex" }}
                              >
                                <CustomButton
                                  text={"English Reading"}
                                  style={{
                                    height: isMobile ? "4vh" : "",
                                    margin: "1%",
                                    fontSize: isMobile ? "2vw" : "1vw",
                                    width: "100%",
                                  }}
                                  isDissabled={false}
                                  handleClick={() => {
                                    navigate("/admin/test/practice", {
                                      state: {
                                        user,
                                        filter: "English Reading",
                                      },
                                    });
                                  }}
                                />
                                <CustomButton
                                  text={"English Writing"}
                                  style={{
                                    height: isMobile ? "4vh" : "",
                                    margin: "1%",
                                    fontSize: isMobile ? "2vw" : "1vw",
                                    width: "100%",
                                  }}
                                  isDissabled={false}
                                  handleClick={() => {
                                    navigate("/admin/test/practice", {
                                      state: {
                                        user,
                                        filter: "English Writing",
                                      },
                                    });
                                  }}
                                />
                                <CustomButton
                                  text={"Maths"}
                                  style={{
                                    height: isMobile ? "4vh" : "",
                                    margin: "1%",
                                    fontSize: isMobile ? "2vw" : "1vw",
                                    width: "100%",
                                  }}
                                  isDissabled={false}
                                  handleClick={() => {
                                    navigate("/admin/test/practice", {
                                      state: { user, filter: "Maths" },
                                    });
                                  }}
                                />
                              </div>
                            </div>
                          </>
                        </div>
                      </>
                    );
                  })}
              </div>
            </div>
          )}
        </>
      )}
    </>
  );
};

export default Users;
