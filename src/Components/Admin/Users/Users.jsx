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
import Swal from "sweetalert2";
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
  const [showCard, setShowCard] = useState(false);
  const rows = [
    [
      "Row 1 - A",
      "B",
      "C",
      "D",
      "E",
      <>
        <img
          style={{ marginLeft: "33%" }}
          width="40"
          height="40"
          src="https://img.icons8.com/ios-filled/50/2a78ff/course-assign.png"
          alt="course-assign"
        />
      </>,
    ],
    [
      "Row 2 - A",
      "B",
      "C",
      "D",
      "E",
      <>
        <img
          style={{ marginLeft: "33%" }}
          width="40"
          height="40"
          src="https://img.icons8.com/ios-filled/50/2a78ff/course-assign.png"
          alt="course-assign"
        />
      </>,
    ],
    ["Row 3 - A", "B", "C", "D", "E", "F"],
    ["Row 4 - A", "B", "C", "D", "E", "F"],
    ["Row 5 - A", "B", "C", "D", "E", "F"],
  ];
  const headerStyle = {
    backgroundColor: "rgb(108, 108, 108)",
    color: "#fff",
    padding: "5px",
    textAlign: "left",
    border: "1px solid #ccc",
    fontSize: isMobile ? "2vw" : "1.3vw",
  };

  const cellStyle = {
    justifyContent: "center",
    alinItems: "center",
    textAlignItems: "center",
    padding: "5px",
    border: "1px solid #ccc",
    cursor: "pointer",
    fontSize: isMobile ? "2vw" : "1.2vw",
  };

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

  const refresh = () => {
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
  };
  const handleFindCount = (tests, type) => {
    const foundTests = tests?.filter((test, index) => test.testType === type);
    return foundTests.length;
  };
  const handleFindCompletedTests = (tests, type) => {
    const filteredTests = tests?.filter(
      (_test) => _test.testStatus === "Completed" && _test.testType === type
    );
    return filteredTests.length;
  };
  const handleFindPracticeCount = (tests, type) => {
    const foundTests = tests?.filter((test, index) =>
      test.testType.includes(type)
    );
    console.log("found", foundTests);
    return foundTests.length;
  };
  const handleFindCompletedPracticeTests = (tests, type) => {
    const filteredTests = tests?.filter(
      (_test) =>
        _test.testStatus === "Completed" && _test.testType.includes(type)
    );
    return filteredTests.length;
  };
  const handleDeleteStudent = (user) => {
    const route = "deleteStudent";
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        PostRoute(
          route,
          () => {},
          () => {
            refresh();
            Swal.fire({
              title: "Deleted!",
              text: "Student has been deleted.",
              icon: "success",
            });
          },
          user
        );
      }
    });
  };
  const handleChangeStudentStatus = (user) => {
    const route = "changeStudentStatus";
    Swal.fire({
      title: "Are you sure?",
      text: `You want to ${
        user.isApproved === true ? "disapprove" : "Approve"
      } the account of this student.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: `Yes, ${
        user.isApproved === true ? "disapprove" : "Approve"
      } student`,
    }).then((result) => {
      if (result.isConfirmed) {
        PostRoute(
          route,
          () => {},
          (data) => {
            refresh();
            Swal.fire({
              title: "Student status changed!",
              text: `${
                data.isApproved === true
                  ? "Student account status have been changed successfully."
                  : "Student account status have been changed successfully."
              }`,
              icon: "success",
            });
          },
          user
        );
      }
    });
  };
  return (
    <>
      {isChecking ? (
        <>
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
              <CustomDataLoader />
              <div className="loaderText">Loading LMS Users......</div>
            </div>
          ) : (
            <div className="testContainer">
              <div
                className="allTestsContainer usersContainer"
                style={{ height: "87vh" }}
              >
                <div style={{ display: "flex" }}>
                  <div
                    className="testHeaderText adminsHeader"
                    style={{ color: "grey" }}
                  >
                    Users
                  </div>
                </div>
                <table
                  style={{
                    borderCollapse: "collapse",
                    width: "100%",
                  }}
                >
                  <thead>
                    <tr>
                      {[
                        "S.No.",
                        "Name",
                        "Practice Tests ",
                        "Mock Tests",
                        "Diagnostic Tests",
                        "Action",
                      ].map((col, idx) => (
                        <th key={idx} style={headerStyle}>
                          {col}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {users &&
                      users.map((user, rowIndex) => (
                        <tr
                          key={rowIndex}
                          style={{ color: "black", fontSize: "1.1vw" }}
                        >
                          <td style={cellStyle}>{rowIndex + 1}.</td>
                          <td style={cellStyle}>{user.name}</td>
                          <td
                            style={cellStyle}
                            className="overflow"
                            onClick={() =>
                              handleUserCheck(user.assignedTests, "Practice")
                            }
                          >
                            <div className="testDiscriptorCells">
                              <span
                                className="featuresTagAssigner"
                                style={isMobile ? { marginBottom: "2%" } : {}}
                              >
                                Assigned&nbsp;- &nbsp;
                                {handleFindPracticeCount(
                                  user.assignedTests,
                                  "Practice"
                                )}{" "}
                              </span>
                              <span className="featuresTagAssigner">
                                Completed&nbsp;- &nbsp;
                                {handleFindCompletedPracticeTests(
                                  user.assignedTests,
                                  "Practice"
                                )}
                              </span>
                            </div>
                          </td>
                          <td
                            style={cellStyle}
                            className="overflow"
                            onClick={() =>
                              handleUserCheck(user.assignedTests, "Mock")
                            }
                          >
                            <div className="testDiscriptorCells">
                              <span className="featuresTagAssigner">
                                Assigned&nbsp;-&nbsp;
                                {handleFindCount(user.assignedTests, "Mock")}
                              </span>
                              <span className="featuresTagAssigner">
                                Completed&nbsp;-&nbsp;
                                {handleFindCompletedTests(
                                  user.assignedTests,
                                  "Mock"
                                )}
                              </span>
                            </div>{" "}
                          </td>
                          <td
                            style={cellStyle}
                            className="overflow"
                            onClick={() =>
                              handleUserCheck(user.assignedTests, "diagnostic")
                            }
                          >
                            <div className="testDiscriptorCells">
                              <span className="featuresTagAssigner">
                                Assigned&nbsp;-&nbsp;
                                {handleFindCount(
                                  user.assignedTests,
                                  "diagnostic"
                                )}
                              </span>
                              <span className="featuresTagAssigner">
                                Completed&nbsp;-&nbsp;
                                {handleFindCompletedTests(
                                  user.assignedTests,
                                  "diagnostic"
                                )}
                              </span>
                            </div>{" "}
                          </td>
                          <td style={cellStyle}>
                            {" "}
                            {/* <div
                              className={`selectionOverlay ${
                                showCard !== user._id ? "closing" : "active"
                              }`}
                            >
                              <div className="selectionCard">
                                <div
                                  className="SelectionCardCross"
                                  onClick={() => {
                                    setShowCard(!showCard);
                                  }}
                                >
                                  <img
                                    width={!isMobile ? "30" : "20"}
                                    height={!isMobile ? "30" : "20"}
                                    src="https://img.icons8.com/ios-glyphs/30/FA5252/multiply.png"
                                    alt="multiply"
                                  />
                                </div>
                                <div
                                  className="actionHead"
                                  style={{ marginTop: "5%" }}
                                >
                                  Assign Tests
                                </div>
                                <div className="practiceAction">
                                  <div
                                    className="actionElement"
                                    onClick={() => {
                                      navigate("/admin/test/practice", {
                                        state: {
                                          user,
                                          filter: "English Reading",
                                        },
                                      });
                                    }}
                                  >
                                    <div>English Reading Practice</div>
                                  </div>
                                  <div
                                    className="actionElement"
                                    onClick={() => {
                                      navigate("/admin/test/practice", {
                                        state: {
                                          user,
                                          filter: "English Writing",
                                        },
                                      });
                                    }}
                                  >
                                    <div>English Writing Practice</div>
                                  </div>
                                  <div
                                    className="actionElement"
                                    onClick={() => {
                                      navigate("/admin/test/practice", {
                                        state: {
                                          user,
                                          filter: "Maths",
                                        },
                                      });
                                    }}
                                  >
                                    <div>Maths Practice</div>
                                  </div>

                                  <div
                                    className="actionElement"
                                    onClick={() => {
                                      navigate("/admin/test/practice", {
                                        state: {
                                          user,
                                          filter: "Miscellaneous",
                                        },
                                      });
                                    }}
                                  >
                                    <div>Miscellaneous</div>
                                  </div>
                                  <div
                                    className="actionElement"
                                    onClick={() => {
                                      navigate("/admin/test/mock", {
                                        state: { user },
                                      });
                                    }}
                                  >
                                    <div>Mock</div>
                                  </div>
                                  <div
                                    className="actionElement"
                                    onClick={() => {
                                      navigate("/admin/test/diagnostic", {
                                        state: { user },
                                      });
                                    }}
                                  >
                                    <div>Diagnostic</div>
                                  </div>
                                </div>

                                <div className="actionHead">
                                  View Student Analysis
                                </div>
                                <div className="practiceAction">
                                  <div
                                    className="actionElement"
                                    onClick={() => {
                                      navigate("/user/tests/analysis", {
                                        state: {
                                          user,
                                          filter: "analysis",
                                        },
                                      });
                                    }}
                                  >
                                    <div>Analytics</div>
                                  </div>
                                  <div
                                    className="actionElement"
                                    onClick={() => {
                                      navigate("/user/tests/analysis", {
                                        state: {
                                          user,
                                          filter: "reviewer",
                                        },
                                      });
                                    }}
                                  >
                                    <div>Numerical</div>
                                  </div>
                                </div>
                              </div>
                            </div> */}
                            <div
                              className={`selectionOverlay ${
                                showCard !== user._id ? "closing" : "active"
                              }`}
                            >
                              <div className="selectionCard">
                                {/* Close Button */}
                                <div
                                  className="SelectionCardCross"
                                  onClick={() => setShowCard(!showCard)}
                                >
                                  <img
                                    width={!isMobile ? "30" : "20"}
                                    height={!isMobile ? "30" : "20"}
                                    src="https://img.icons8.com/ios-glyphs/30/FA5252/multiply.png"
                                    alt="multiply"
                                  />
                                </div>

                                {/* Section: Assign Tests */}
                                <div
                                  className="actionHead"
                                  style={{ marginTop: "0%" }}
                                >
                                  Assign Tests
                                </div>
                                <div className="practiceActionGrid">
                                  {[
                                    {
                                      label: "English Reading",
                                      icon: "📖",
                                      filter: "English Reading",
                                    },
                                    {
                                      label: "English Writing",
                                      icon: "✍️",
                                      filter: "English Writing",
                                    },
                                    {
                                      label: "Maths",
                                      icon: "➗",
                                      filter: "Maths",
                                    },
                                    {
                                      label: "Miscellaneous",
                                      icon: "🧩",
                                      filter: "Miscellaneous",
                                    },
                                    {
                                      label: "Mock",
                                      icon: "📝",
                                      filter: "Mock",
                                    },
                                    {
                                      label: "Diagnostic",
                                      icon: "🔬",
                                      filter: "Diagnostic",
                                    },
                                  ].map((item) => (
                                    <div
                                      key={item.label}
                                      className="actionBox"
                                      onClick={() =>
                                        navigate(
                                          item.filter === "Mock"
                                            ? "/admin/test/mock"
                                            : item.filter === "Diagnostic"
                                            ? "/admin/test/diagnostic"
                                            : "/admin/test/practice",
                                          {
                                            state: {
                                              user,
                                              filter: item.filter,
                                            },
                                          }
                                        )
                                      }
                                    >
                                      <div className="actionIcon">
                                        {item.icon}
                                      </div>
                                      <div className="actionLabel">
                                        {item.label}
                                      </div>
                                    </div>
                                  ))}
                                </div>

                                {/* Section: View Student Analysis */}
                                <div className="actionHead">
                                  View Student Analysis
                                </div>
                                <div className="practiceActionGrid">
                                  {[
                                    {
                                      label: "Analytics",
                                      icon: "📊",
                                      filter: "analysis",
                                    },
                                    {
                                      label: "Numerical",
                                      icon: "🔢",
                                      filter: "reviewer",
                                    },
                                  ].map((item) => (
                                    <div
                                      key={item.label}
                                      className="actionBox"
                                      onClick={() =>
                                        navigate("/user/tests/analysis", {
                                          state: { user, filter: item.filter },
                                        })
                                      }
                                    >
                                      <div className="actionIcon">
                                        {item.icon}
                                      </div>
                                      <div className="actionLabel">
                                        {item.label}
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </div>
                            <div
                              className="flexContent centerContent"
                              style={{ display: "flex" }}
                            >
                              <div
                                title={`${
                                  user.isApproved
                                    ? "Disapprove student"
                                    : "Approve student"
                                }`}
                                onClick={() => {
                                  handleChangeStudentStatus(user);
                                }}
                              >
                                <img
                                  width={!isMobile ? "24" : "20"}
                                  height={!isMobile ? "24" : "20"}
                                  src={
                                    user.isApproved
                                      ? "https://img.icons8.com/ios-filled/50/4D4D4D/disapprove.png"
                                      : "https://img.icons8.com/material-rounded/24/4D4D4D/checked-checkbox.png"
                                  }
                                  alt="checked-checkbox"
                                />
                              </div>
                              <div
                                title="Delete student"
                                onClick={() => {
                                  handleDeleteStudent(user);
                                }}
                              >
                                <img
                                  width={!isMobile ? "30" : "24"}
                                  height={!isMobile ? "30" : "24"}
                                  src="https://img.icons8.com/sf-black-filled/64/4D4D4D/delete-forever.png"
                                  alt="checked-checkbox"
                                />
                              </div>
                              {user.isApproved && (
                                <div>
                                  <img
                                    onClick={() => {
                                      setShowCard(user._id);
                                    }}
                                    style={{
                                      cursor: "pointer",
                                    }}
                                    width={!isMobile ? "22" : "20"}
                                    height={!isMobile ? "22" : "20"}
                                    src="https://img.icons8.com/ios-filled/50/4D4D4D/four-squares.png"
                                    alt="course-assign"
                                  />
                                </div>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
                {/* {users &&
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
                  })} */}
              </div>
            </div>
          )}
        </>
      )}
    </>
  );
};

export default Users;
