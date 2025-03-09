import React, { useEffect, useMemo, useState } from "react";
import CustomTest from "../../CustomComponents/CustomTest/CustomTest";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router";
import { GetRoute } from "../../Custom_hooks/Routes";
import ClimbingBoxLoader from "react-spinners/ClipLoader";
import CustomDataLoader from "Components/CustomComponents/CustomDataLoader";
const PracticeTests = () => {
  const location = useLocation();
  const [loader, setLoader] = useState(false);
  const [tests, setTests] = useState([]);
  const auth = useSelector((state) => state.user.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (auth === null) {
      return navigate("/auth");
    }
  }, [auth, navigate]);

  const filter = useMemo(() => {
    return location.state?.filter || {};
  }, [location.state?.filter]);
  useEffect(() => {
    GetRoute(
      `refreshUser/${auth?.data._id}`,
      () => {
        setLoader(true);
      },
      (data) => {
        setTests(
          data.assignedTests.filter(
            (test) => test.testType === `${filter} Practice`
          )
        );
        setLoader(false);
      }
    );
  }, [filter]);

  return (
    <>
      {loader ? (
        <>
          <div className="loaderContainer">
           <CustomDataLoader/>
            <div className="loaderText">Loading Assigned Tests.....</div>
          </div>
        </>
      ) : (
        <>
          <CustomTest title={`${filter} Practice Tests`} tests={tests} />
        </>
      )}
    </>
  );
};

export default PracticeTests;
