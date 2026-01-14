import React from "react";
import { useState } from "react";
import "./TestAnalysis.css";
import AnalysisCharts from "./AnalysisCharts";
import AnalysisData from "./AnalysisData";
import { useMediaQuery } from "Components/Custom_hooks/Custom";
import { useLocation } from "react-router";
import CustomRadio from "Components/CustomComponents/CustomButton/CustomRadio";

const TestAnalysis = () => {
  const location = useLocation();
  const filter = location.state?.filter || "analysis";
  const userData = location.state?.user || {};
  console.log(".....", userData);
  const isMobile = useMediaQuery("(max-width:430px)");
  const [type, setType] = useState(filter);

  console.log("user data", userData);
  return (
    <>
      <div className="mainOuterContainer">
        <div className="outerContainer">
          <div>
            <div className="header">Student Performance Analysis</div>
            <div className="analysisTypeSetter">
              <CustomRadio
                label={"Strength Analysis"}
                type={type}
                setType={setType}
                setter={"analysis"}
              />

              <CustomRadio
                label={"Question Reviewer"}
                type={type}
                setType={setType}
                setter={"reviewer"}
              />
            </div>
          </div>
          {type === "analysis" ? (
            <AnalysisCharts userData={userData} />
          ) : (
            <>
              <AnalysisData userData={userData} />
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default TestAnalysis;
