import React, { useEffect, useState } from "react";
import "./Dashboard.css";
import { LineChart } from "@mui/x-charts/LineChart";
import { GetRoute } from "../../Custom_hooks/Routes";
import { useMediaQuery } from "../../Custom_hooks/Custom";
const AdminDashboard = () => {
  const isMobile = useMediaQuery("(max-width:700px)");
  const [length, setLength] = useState(0);
  const handleFindTotalStudents = () => {
    GetRoute(
      `getAllUsers`,
      () => {},
      (data) => {
        setLength(data.length);
      }
    );
  };

  useEffect(() => {
    handleFindTotalStudents();
  }, []);

  return (
    <div className="dashboardContainer">
      <div className="profileContainer">
        <div className="ProfileIcon">H</div>
        <div>
          <div className="adminHeader">HELIOS ADMIN PORTAL</div>
          <div className="adminText">helios@gmail.com</div>
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
            <div className="">Total Students - {length} </div>
          </div>
        </div>
        <div className="analysisContainer" style={{ backgroundColor: "white" }}>
          <div>
            <div className="boldText">Student Count Analyser</div>
            <LineChart
              xAxis={[{ data: [1, 2, 3, 5, 8, 10, 12] }]}
              series={[
                {
                  data: [2, 5.5, 2, 8.5, 1.5, 5],
                },
              ]}
              width={isMobile ? 400 : 400}
              height={isMobile ? 200 : 220}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
