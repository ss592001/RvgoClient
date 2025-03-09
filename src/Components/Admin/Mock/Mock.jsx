// import React,{useState,useEffect} from "react";
// import "./Mock.css";
// import TestSkeliton from "../TestSkeliton/TestSkeliton";
// import { TESTS } from "../TestSkeliton/Test";
// import { GetRoute } from "../../Custom_hooks/Routes";
// const Mock = () => {
//     const [tests, setTests] = useState([]);

//     const handleFilterTests = (tests) => {
//       return tests.filter((test, index) => test.type === "Mock");
//     };

//     useEffect(() => {
//       GetRoute(
//         `allTests`,
//         () => {},
//         (data) => {
//           const practiceTests = handleFilterTests(data);
//           setTests(practiceTests);
//         }
//       );
//     }, []);
//   return (
//     <div>
//       <TestSkeliton tests={tests} heading={"Mock Tests"} />
//     </div>
//   );
// };

// export default Mock;

import React, { useEffect, useState } from "react";
import "./Mock.css";
import TestSkeliton from "../TestSkeliton/TestSkeliton";
import { GetRoute } from "../../Custom_hooks/Routes";
import ClimbingBoxLoader from "react-spinners/ClipLoader";
import { useMediaQuery } from "../../Custom_hooks/Custom";
import CustomDataLoader from "Components/CustomComponents/CustomDataLoader";

const Mock = () => {
  const isMobile = useMediaQuery("(max-width:700px)");
  const [tests, setTests] = useState([]);
  const [loader, setLoader] = useState(false);

  const handleFilterTests = (tests) => {
    return tests.filter((test, index) => test.type === "Mock");
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
        setLoader(false);
      }
    );
  }, []);
  return (
    <div>
      {loader ? (
        <div className="loaderContainer">
          <CustomDataLoader />
          <div className="loaderText">Loading Uploaded Tests...</div>
        </div>
      ) : (
        <TestSkeliton tests={tests} heading={"Mock Tests"} />
      )}
    </div>
  );
};

export default Mock;
