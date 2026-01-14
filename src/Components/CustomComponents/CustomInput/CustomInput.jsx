import React from "react";
import "./CustomInput.css";

const CustomInput = ({
  label,
  placeholder,
  type,
  inputStyle,
  labelStyle,
  handleInputChange,
  onKeyDown,
  value,
  Required,
}) => {
  return (
    <>
      <div className="inputLabel" style={labelStyle}>
        {label}
        {Required && <span style={{ color: "red", margin: "1%" }}>*</span>}
      </div>
      <input
        placeholder={placeholder}
        type={type}
        onChange={(ev) => {
          handleInputChange(ev);
        }}
        onChangeCapture={(ev) => {
          handleInputChange(ev);
        }}
        value={value}
        className="inputStyle"
        style={inputStyle}
        onKeyDown={onKeyDown}
      />
    </>
  );
};

export default CustomInput;
