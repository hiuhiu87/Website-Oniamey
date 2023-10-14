import React from "react";
import { Container, Form, Image } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import { Tabs, Tab } from "react-bootstrap";
import Upload from "rc-upload";

import "../manage-user/style/DetailCustomer.css";
import defaultImage from "../manage-user/style/image/man.png";

const DetaiCustomer = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [isDeleted, setIsDeleted] = useState(true);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [birthDate, setBirthDate] = useState();
  const [gender, setGender] = useState();
  const [avatar, setAvatar] = useState("");
  const { id } = useParams();

  const props = {
    action: "http://localhost:8088/api/storage/uploadFile",
    multiple: true,
    onStart(file) {
      console.log("onStart", file, file.name);

    },
    onSuccess(ret) {
      console.log("onSuccess", ret);
      setAvatar(ret);
    },
    onError(err) {
      console.log("onError", err);

    },
    beforeUpload(file, fileList) {
      console.log(file, fileList);
      return new Promise((resolve) => {
        console.log("start check");
        setTimeout(() => {
          console.log("check finshed");
          resolve(file);
        }, 3000);
      });
    },
  };

  return (
    <Container className="detail-form">
      <h4>Detail Customer</h4>
      <Tabs
        defaultActiveKey="home"
        id="uncontrolled-tab-example"
        className="mb-3"
      >
        <Tab eventKey="home" title="About">
          <h5>Information</h5>
          <Form>
            <Form.Group className="mb-3" controlId="formBasicAvatar">
              <Upload {...props}>
                <Image src={avatar ? avatar : defaultImage} roundedCircle alt="avatar" style={{ maxWidth: "100px" }} />
              </Upload>
            </Form.Group>
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
            <Form.Group className="mb-3" controlId="formBasicDateOfBirth">
              <Form.Label>Date of Birth</Form.Label>
              <Form.Control
                type="date"
                value={birthDate}
                onChange={(e) => setBirthDate(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Gender</Form.Label>
              <Form.Select
                value={gender}
                onChange={(e) => setGender(e.target.value)}
              >
                <option value={1}>Male</option>
                <option value={2}>Female</option>
                <option value={3}>Another</option>
              </Form.Select>
            </Form.Group>
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
        </Tab>
        <Tab eventKey="profile" title="Address">
          <h5>Address Notebook</h5>
        </Tab>
      </Tabs>
    </Container>
  );
};

export default DetaiCustomer;
