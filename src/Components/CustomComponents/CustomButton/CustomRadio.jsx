// import React from "react";
// import { useMediaQuery } from "Components/Custom_hooks/Custom";
// const CustomRadio = ({ label, type, setType, setter, isDissabled }) => {
//   const isMobile = useMediaQuery("(max-width:430px)");
//   return (
//     <>
//       <div style={{ display: "flex" }}>
//         <div>
//           <input
//             type="radio"
//             name="testType"
//             style={{
//               height: !isMobile ? "1.8vw" : "7vw",
//               width: !isMobile ? "1.8vw" : "7vw",
//               appearance: "none",
//               WebkitAppearance: "none",
//               MozAppearance: "none",
//               cursor: "pointer",
//               backgroundColor:
//                 type === setter ? "#333F6B" : "rgb(211, 211, 211)",
//               border: type === setter ? "3px solid orange" : "3px solid white",

//               borderRadius: "6px",
//               marginRight: "8px",
//               transition: "background-color 0.2s ease",
//             }}
//             disabled={isDissabled}
//             checked={type === setter}
//             onChange={() => {
//               setType(setter);
//             }}
//             onChangeCapture={() => {
//               setType(setter);
//             }}
//             value={setter}
//           />
//         </div>
//         <div
//           style={{
//             color: type === setter ? "#333F6B" : "rgb(211, 211, 211)",
//             fontSize: !isMobile ? "" : "4vw",
//           }}
//         >
//           {label}
//         </div>
//       </div>
//     </>
//   );
// };

// export default CustomRadio;

import React from "react";
import { useMediaQuery } from "Components/Custom_hooks/Custom";

const CustomRadio = ({ label, type, setType, setter, isDissabled }) => {
  const isMobile = useMediaQuery("(max-width:430px)");

  const handleClick = () => {
    if (type === setter) {
      setType(""); // Unset the selection
    } else {
      setType(setter); // Set the selection
    }
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
      }}
    >
      <div>
        <div
          onClick={!isDissabled ? handleClick : undefined}
          style={{
            height: !isMobile ? "1.8vw" : "7vw",
            width: !isMobile ? "1.8vw" : "7vw",
            cursor: isDissabled ? "not-allowed" : "pointer",
            backgroundColor: type === setter ? "#333F6B" : "rgb(211, 211, 211)",
            border: type === setter ? "3px solid orange" : "3px solid white",
            borderRadius: "6px",
            marginRight: "8px",

            transition: "background-color 0.2s ease",
          }}
        />
      </div>
      <div
        onClick={!isDissabled ? handleClick : undefined}
        style={{
          color: type === setter ? "#333F6B" : "gray",
          fontSize: !isMobile ? "" : "4vw",
          cursor: isDissabled ? "not-allowed" : "pointer",
        }}
      >
        {label}
      </div>
    </div>
  );
};

export default CustomRadio;
