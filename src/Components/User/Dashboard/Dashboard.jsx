import React from "react";
import { PieChart } from "@mui/x-charts/PieChart";
import { useSelector } from "react-redux";
import { useMediaQuery } from "../../Custom_hooks/Custom";
const Dashboard = () => {
  const auth = useSelector((state) => state.user.auth);
  const isMobile = useMediaQuery("(max-width:430px)");
  const handleFidTestCount = (status) => {
    const tests = auth.data.assignedTests.filter(
      (test) => test.testStatus === status
    );
    return tests.length;
  };

  const handleFindTestTypeCount = (type) => {
    const tests = auth.data.assignedTests.filter(
      (test) => test.testType === type
    );
    return tests.length;
  };
  return (
    <>
      <div className="dashboardContainer">
        <div className="profileContainer">
          <div className="ProfileIcon">{auth.data.name[0]}</div>
          <div>
            <div className="adminHeader">{auth.data.name}</div>
            <div className="adminText">{auth.data.email}</div>
          </div>
        </div>
        <div className="mainAnalysisContainer">
          <div className="analysisContainer">
            <div className="analysisElement">
              <div>
                <img
                  className="analysisIcon"
                  src="https://img.icons8.com/ios/50/FFFFFF/student-registration.png"
                  alt="student-registration"
                />
              </div>
              <div >
                Total Mock Tests - {handleFindTestTypeCount("Mock")}
              </div>

              <div >
                Total Practice Tests -{" "}
                {handleFidTestCount("Completed") +
                  handleFidTestCount("Pending") -
                  handleFindTestTypeCount("Mock")}
              </div>
            </div>
          </div>
          <div
            className="analysisContainer"
            style={{ backgroundColor: "white" }}
          >
            <div>
              <div className="boldText">Test Count Analyser</div>
              <PieChart
                series={[
                  {
                    data: [
                      {
                        id: 0,
                        value: handleFidTestCount("Completed"),
                        label: "Completed",
                      },
                      {
                        id: 1,
                        value: handleFidTestCount("Pending"),
                        label: "Pending",
                      },
                    ],
                  },
                ]}
                width={isMobile ? 400 : 400}
                height={isMobile ? 150 : 200}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
