import React, { useEffect, useState } from "react";
import "./Test.css";
import { useNavigate, useLocation } from "react-router";
import { GetRoute } from "../../Custom_hooks/Routes";
import { setActiveTest, setTestStartTIme } from "../../Redux/Store";
import { useDispatch, useSelector } from "react-redux";

const Description = () => {
  const location = useLocation();
  const { test } = location.state || {};
  const [isTestPrepared, setIsTestPrepared] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.user.auth);
  useEffect(() => {
    if (auth === null) {
      return navigate("/auth");
    }
  }, [auth, navigate]);

  const descriptionInfo = [
    {
      title: "Timing",
      info: "The full length of the test is timed to the real SAT test But you can exit the test any time by clicking on save and exis button.You can also navigate from one question to another.",
    },
    {
      title: "Scores",
      info: "Whe You finish the test , go to my SAT test to view your scores.",
    },
    {
      title: "Assistive Technology",
      info: "If you use any assistive technology , you should try it on this test so that you may come to know what to expect on the test day.",
    },
    {
      title: "Alert",
      info: "Please do not press esc button as it may lead to test cancellation.",
    },
  ];

  const openFullScreen = () => {
    const element = document.documentElement;
    element
      .requestFullscreen()
      .then((result) => {
        console.log(result);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    GetRoute(
      `getTest/${test.testId}`,
      () => {
        setIsTestPrepared(false);
      },
      (data) => {
        dispatch(setActiveTest(data));
        setIsTestPrepared(true);
      }
    );
    openFullScreen();
  }, []);

  return (
    <>
      {
        <div
          className="mainPreparingContainer"
          style={isTestPrepared ? { marginTop: "10%" } : {}}
        >
          <div style={{ fontSize: "1.8vw", fontWeight: "bold" }}>
            {!isTestPrepared
              ? "We're Preparing Your Test Exam."
              : "SAT Test Exam"}
          </div>
          <div className="preparingContainer">
            {!isTestPrepared ? (
              <>
                <div>
                  <img
                    width="64"
                    height="64"
                    src="https://img.icons8.com/external-flatart-icons-solid-flatarticons/64/1A1A1A/external-upload-network-and-cloud-computing-flatart-icons-solid-flatarticons.png"
                    alt="external-upload-network-and-cloud-computing-flatart-icons-solid-flatarticons"
                  />
                </div>
                This may take upto a minute. Please do not close the window.
              </>
            ) : (
              <>
                <div className="descriptionContainer">
                  {descriptionInfo.map((desc, index) => {
                    return (
                      <>
                        <div style={{ display: "flex", marginTop: "2%" }}>
                          <div className="mainDescription">
                            <div className="descriptionHeader">
                              {" "}
                              <span className="descriptionBall">
                                {index + 1}.{" "}
                              </span>
                              {desc.title}
                            </div>
                            <div className="descriptionInfo">{desc.info}</div>
                          </div>
                        </div>
                      </>
                    );
                  })}
                </div>
              </>
            )}
            {isTestPrepared && (
              <>
                <div
                  className="nextButton"
                  style={{
                    display: "flex",
                    textAlign: "center",
                    alignItems: "center",
                    justifyContent: "center",
                    marginTop: "4%",
                    cursor: "pointer",
                  }}
                  onClick={() => {
                    dispatch(setTestStartTIme(new Date()));
                    navigate("/test/platform");
                  }}
                >
                  Next
                </div>
              </>
            )}
          </div>
        </div>
      }
    </>
  );
};

export default Description;
