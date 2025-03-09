import React, { useEffect, useState } from "react";
import "./MockTests.css";
import CustomTest from "../../CustomComponents/CustomTest/CustomTest";
import { useSelector } from "react-redux";
import { GetRoute } from "../../Custom_hooks/Routes";
import ClimbingBoxLoader from "react-spinners/ClipLoader";
import { useNavigate } from "react-router";
import CustomDataLoader from "Components/CustomComponents/CustomDataLoader";
const MockTests = () => {
  const auth = useSelector((state) => state.user.auth);
  const [loader, setLoader] = useState(false);
  const [tests, setTests] = useState([]);
  const mockTests = tests.filter((test, index) => test.testType === "Mock");
  const navigate = useNavigate();
  useEffect(() => {
    if (auth === null) {
      return navigate("/auth");
    }
  }, [auth, navigate]);

  useEffect(() => {
    GetRoute(
      `refreshUser/${auth?.data._id}`,
      () => {
        setLoader(true);
      },
      (data) => {
        setTests(data.assignedTests);
        setLoader(false);
      }
    );
  }, []);
  return (
    <>
      {loader ? (
        <>
          <div className="loaderContainer">
            <CustomDataLoader />
            <div className="loaderText">Loading Assigned Tests.....</div>
          </div>
        </>
      ) : (
        <>
          <CustomTest title="Mock Tests" tests={mockTests} />
        </>
      )}
    </>
  );
};

export default MockTests;
