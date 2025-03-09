import React, { useState } from "react";
import { Button, Modal } from "rsuite";
import "rsuite/dist/rsuite.min.css";

const CustomModal = ({ open, close, isOpen, style ,data}) => {
  return (
    <div>
      <Modal
        open={isOpen}
        onClose={close}
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems:'center',
          transform:'translateY(-10%)'
        }}
      >
        <Modal.Header>
          <Modal.Title>My Modal Title</Modal.Title>
        </Modal.Header>
        <Modal.Body style={style}></Modal.Body>
        <Modal.Footer></Modal.Footer>
      </Modal>
    </div>
  );
};

export default CustomModal;
