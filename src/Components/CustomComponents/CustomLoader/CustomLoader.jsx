import React from "react";
import "./CustomLoader.css";
const CustomLoader = () => {
  return (
    <>
      {/* // <div class="container">
    //   <span></span>
    //   <span></span>
    //   <span></span>
    //   <span></span>
    // </div> */}
      <div>
        <ul class="loader">
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
        </ul>
      </div>
      {/* <div>Loading Data ....</div> */}
    </>
  );
};

export default CustomLoader;
