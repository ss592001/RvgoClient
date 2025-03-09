import React, { useState, useEffect } from "react";
import "./Descriptor.css";
import CustomButton from "../../CustomComponents/CustomButton/CustomButton";
import { useNavigate } from "react-router";
import ClimbingBoxLoader from "react-spinners/ClipLoader";
import { useSelector } from "react-redux";
const ResultDescriptor = () => {
  const navigate = useNavigate();
  const [loader, setLoader] = useState(false);
  const auth = useSelector((state) => state.user.auth);
  useEffect(() => {
    if (auth === null) {
      return navigate("/auth");
    }
  }, [auth, navigate]);

  const handleClick = () => {
    setLoader(true);
    setTimeout(() => {
      setLoader(false);
      navigate("/test/result");
    }, [6000]);
  };
  return (
    <>
      <div className="descriptorContainer">
        <div className="descriptorHeader">TEST SUBMITED SUCCESSFULLY</div>
        <div className="descriptorInfo">
          1. Your test has been submitted successfully. Click on the below given
          button to generate a detailed analysis of your test.
        </div>
        <div className="descriptorInfo">
          2. You can also view your test analysis in the completed section of
          your given test by clicking view result button.
        </div>
        <div className="descriptorInfo">
          3. Through the test analysis , you can see you accuracy and other
          informtion which can help you to improve your performance.
        </div>
        <CustomButton
          text={
            loader ? (
              <>
                <ClimbingBoxLoader
                  color={"rgb(126, 23, 28)"}
                  loading={loader}
                  size={20}
                  aria-label="Loading Spinner"
                  data-testid="loader"
                />
                &nbsp;&nbsp;
                <span style={{ color: "rgb(126, 23, 28)" }}>
                  Generating Result...
                </span>
              </>
            ) : (
              "Generate Result"
            )
          }
          style={{ backgroundColor: loader ? "transparent" : "" }}
          handleClick={() => {
            handleClick();
          }}
        />
      </div>
    </>
  );
};

export default ResultDescriptor;
