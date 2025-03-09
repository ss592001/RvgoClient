import React, { useEffect, useState, useMemo } from "react";
import "./PracticeTest.css";
import TestSkeliton from "../TestSkeliton/TestSkeliton";
import { TESTS } from "../TestSkeliton/Test";
import { GetRoute } from "../../Custom_hooks/Routes";
import ClimbingBoxLoader from "react-spinners/ClipLoader";
import { useLocation } from "react-router";
import { useMediaQuery } from "../../Custom_hooks/Custom";
import CustomDataLoader from "Components/CustomComponents/CustomDataLoader";
const PracticeTest = () => {
  const isMobile = useMediaQuery("(max-width:430px)");
  const location = useLocation();
  const filter = useMemo(() => {
    return location.state?.filter || {};
  }, [location.state?.filter]);
  const [tests, setTests] = useState([]);
  const [loader, setLoader] = useState(false);

  const handleFilterTests = (tests) => {
    return tests.filter((test, index) => test.type === `${filter} Practice`);
  };

  useEffect(() => {
    GetRoute(
      `allTests`,
      () => {
        setLoader(true);
      },
      (data) => {
        const practiceTests = handleFilterTests(data);
        setTests(practiceTests);
        console.log(data);
        setLoader(false);
      }
    );
  }, [filter]);
  return (
    <div>
      {loader ? (
        <div className="loaderContainer">
         <CustomDataLoader/>
          <div className="loaderText">Loading Uploaded Tests...</div>
        </div>
      ) : (
        <TestSkeliton tests={tests} heading={`${filter} Practice Tests`} />
      )}
    </div>
  );
};

export default PracticeTest;
