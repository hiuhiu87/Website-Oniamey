import React from "react";
import { Container, Form } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";

import "../manage-user/style/DetailCustomer.css";

const DetaiCustomer = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [isDeleted, setIsDeleted] = useState(true);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [birthDate, setBirthDate] = useState();
  const [gender, setGender] = useState();
  const [avatar, setAvatar] = useState("");
  const { id } = useParams();
  console.log(id);

  return (
    <Container className="detail-form">
      <Form>
        <h4>Detail Customer</h4>
        <Form.Group className="mb-3" controlId="formBasicFullname">
          <Form.Label>Full Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter full name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPhoneNumber">
          <Form.Label>Phone Number</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter phone number"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
        </Form.Group>
        {/* {id > 0 && renderUpdateFields(id)} */}
        <Form.Group className="mb-3">
          <Form.Label>Status</Form.Label>
          <Form.Select
            value={isDeleted}
            onChange={(e) => setIsDeleted(e.target.value)}
          >
            <option value={true}>Active</option>
            <option value={false}>Deactivate</option>
          </Form.Select>
        </Form.Group>
      </Form>
    </Container>
  );
};

export default DetaiCustomer;
