import React from "react";
import { Form, FloatingLabel } from "react-bootstrap";

const ModifyAddressModal = () => {
  return (
    <>
      <FloatingLabel
          controlId="floatingSelectGrid"
          label="Works with selects"
        >
          <Form.Select aria-label="Floating label select example">
            <option>Open this select menu</option>
            <option value="1">One</option>
            <option value="2">Two</option>
            <option value="3">Three</option>
          </Form.Select>
        </FloatingLabel>
    </>
  );
};

export default ModifyAddressModal;
