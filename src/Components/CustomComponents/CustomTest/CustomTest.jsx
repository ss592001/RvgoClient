import React, { useEffect, useState } from "react";
import "./CustomTest.css";
import CustomButton from "../CustomButton/CustomButton";
import { useModelState } from "../../Custom_hooks/Custom";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  setActiveTest,
  setAnswers,
  setAuth,
  setTestOtherDetails,
} from "../../Redux/Store";
import { GetRoute } from "../../Custom_hooks/Routes";
import ClimbingBoxLoader from "react-spinners/ClipLoader";
import { useMediaQuery } from "../../Custom_hooks/Custom";
const CustomTest = ({ title, tests, setIsChecking, setCheckingData }) => {
  const [filteredTests, setFilteredTests] = useState([]);
  const [isActive, setIsActive] = useState("Pending");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loader, setLoader] = useState(false);
  const isMobile = useMediaQuery("(max-width:430px)");
  const auth = useSelector((state) => state.user.auth);
  const handleTestFilter = (active) => {
    setIsActive(active);
    const updatedTests = tests.filter(
      (test, index) => test.testStatus === active
    );
    setFilteredTests(updatedTests);
  };
  useEffect(() => {
    handleTestFilter("Pending");
  }, [title]);

  const handleViewResult = (test, index) => {
    GetRoute(
      `getTest/${test.testId}`,
      () => {
        // setLoader(true);
        setLoader(index);
      },
      (data) => {
        setLoader(false);
        dispatch(setActiveTest(data));
        dispatch(setAnswers(test.answers));
        dispatch(
          setTestOtherDetails({
            startTime: test.startTime,
            endTime: test.endTime,
          })
        );
        navigate("/test/result");
      }
    );
  };
  const handleTakeTest = (test) => {
    if (isMobile) {
      return toast.error(
        "Error !! Device not supported for taking test. Please use a desktop to attempt the test."
      );
    }
    dispatch(setActiveTest(test));
    navigate("/test/description", { state: { test } });
  };

  const handleDateConversion = (date) => {
    const dateObj = new Date(date);
    const readableDate = dateObj.toLocaleDateString(undefined, {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    const readableTime = dateObj.toLocaleTimeString(undefined, {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    });
    return `${readableDate} / ${readableTime}`;
  };
  return (
    <>
      <div className="testContainer">
        <div className="testHeader">
          <div
            className="testHeaderText"
            style={
              auth.type === "admin"
                ? {
                    display: "flex",
                    gap: "1%",
                    width: "100%",
                    alignItems: "center",
                  }
                : {}
            }
          >
            {" "}
            {auth.type === "admin" && (
              <img
                width="40"
                height="40"
                style={{ cursor: "pointer" }}
                onClick={() => {
                  setCheckingData();
                  setIsChecking(false);
                }}
                src="https://img.icons8.com/sf-black-filled/64/333f6b/long-arrow-left.png"
                alt="circled-left-2"
              />
            )}
            <span style={{ color: "#333F6B" }}>{title}</span>
          </div>
          <div className="alert" style={{ backgroundColor: "#333F6B" }}>
            {"1"}
          </div>
        </div>
        <div className="buttonsContainer">
          <CustomButton
            text={"Pending Tests"}
            style={
              isActive === "Pending"
                ? { width: isMobile ? "auto" : "20%", margin: "1%" }
                : {
                    width: isMobile ? "auto" : "20%",
                    margin: "1%",
                    backgroundColor: "transparent",
                    border: "1px solid grey",
                    color: "grey",
                  }
            }
            isDissabled={false}
            handleClick={() => {
              handleTestFilter("Pending");
            }}
          />
          <CustomButton
            text={"Completed Tests"}
            style={
              isActive === "Completed"
                ? { width: isMobile ? "auto" : "20%", margin: "1%" }
                : {
                    width: isMobile ? "auto" : "20%",
                    margin: "1%",
                    backgroundColor: "transparent",
                    border: "1px solid grey",
                    color: "grey",
                  }
            }
            isDissabled={false}
            handleClick={() => {
              handleTestFilter("Completed");
            }}
          />
        </div>
        <div className="allTestsContainer">
          <div className="allTestHeader">{isActive} Tests</div>
          {filteredTests &&
            filteredTests.map((test, index) => {
              return (
                <div className="testElementsContainer">
                  <div className="elementContainer">
                    <div className="testNameInfo" style={{ color: "#333F6B" }}>
                      {test.testName}
                    </div>
                    <div className="testOtherInfo">{test.testDescription}</div>
                    <div className="testStatusContainer">
                      <div className="statusItemContainer">
                        <div className="statusItemHeader">Alloted At</div>
                        <div className="statusItemValue">
                          {handleDateConversion(test.assignedAt)}
                        </div>
                      </div>
                      {test.testStatus === "Completed" && (
                        <>
                          <div className="statusItemContainer">
                            <div className="statusItemHeader">Started At</div>
                            <div className="statusItemValue">
                              {handleDateConversion(test.startTime)}
                            </div>
                          </div>
                          <div className="statusItemContainer">
                            <div className="statusItemHeader">Completed At</div>
                            <div className="statusItemValue">
                              {handleDateConversion(test.endTime)}
                            </div>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                  {test.testStatus === "Completed" ? (
                    <div className="testElmentButtonContainer">
                      <CustomButton
                        text={
                          loader === index ? (
                            <>
                              <ClimbingBoxLoader
                                color={"rgb(126, 23, 28)"}
                                loading={loader === index}
                                size={30}
                                aria-label="Loading Spinner"
                                data-testid="loader"
                              />
                            </>
                          ) : (
                            <>Analyse</>
                          )
                        }
                        style={{
                          width: "100%",
                          margin: "1%",
                          marginLeft: isMobile ? "25%" : "90%",
                          backgroundColor:
                            loader === index ? "transparent" : "",
                          height: isMobile ? "35px" : "48px",
                        }}
                        isDissabled={false}
                        handleClick={() => handleViewResult(test, index)}
                      />
                    </div>
                  ) : (
                    <div className="testElmentButtonContainer">
                      {auth.type === "admin" ? (
                        <>
                          {" "}
                          <CustomButton
                            text={!isMobile ? "Not Attempted" : "Pending"}
                            style={{
                              width: "100%",
                              margin: "1%",
                              marginLeft: isMobile ? "25%" : "90%",
                              height: isMobile ? "35px" : "48px",
                            }}
                            isDissabled={false}
                          />
                        </>
                      ) : (
                        <>
                          <CustomButton
                            text={"Take Test"}
                            style={{
                              width: "100%",
                              margin: "1%",
                              marginLeft: isMobile ? "25%" : "90%",
                              height: isMobile ? "35px" : "48px",
                            }}
                            isDissabled={false}
                            handleClick={() => {
                              handleTakeTest(test);
                            }}
                          />
                        </>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          {!filteredTests[0] && (
            <>
              <div className="noTestMessage">
                No {isActive} Tests Available !!!{" "}
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default CustomTest;
