import React, { useState, useEffect } from "react";
import { Button, Modal } from "rsuite";
import "./Modal.css";

const CustomModal = ({children }) => {

  return (
    <div className="popup">
      <div className="popupdialogue">{children}</div>
    </div>
  );
};




export default CustomModal;
