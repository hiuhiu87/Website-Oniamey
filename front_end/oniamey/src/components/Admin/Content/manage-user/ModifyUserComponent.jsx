import React from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import Image from "react-bootstrap/Image";
import { useState } from "react";
import avatarStatic from "../manage-user/style/image/man.png";

const ModifyUserComponent = () => {
const [fullName, setFullName] = useState("");
const [email, setEmail] = useState("");
const [birthDate, setBirthDate] = useState("");
const [phoneNumber, setPhoneNumber] = useState("");
const [address, setAddress] = useState("");
const [gender, setGender] = useState(3);
const [setstatus, setSetstatus] = useState(true);



  return (
    <Container>
      <h1>Add Staff</h1>
      <Container>
        <Form>
          <Image src={avatarStatic} roundedCircle style={{width: "100px"}}/>
          <Row className="mb-3">
            <Form.Group as={Col} controlId="formGridEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" placeholder="Enter email" />
            </Form.Group>

            <Form.Group as={Col} controlId="formGridPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" />
            </Form.Group>
          </Row>

          <Form.Group className="mb-3" controlId="formGridAddress1">
            <Form.Label>Address</Form.Label>
            <Form.Control placeholder="1234 Main St" />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formGridAddress2">
            <Form.Label>Address 2</Form.Label>
            <Form.Control placeholder="Apartment, studio, or floor" />
          </Form.Group>

          <Row className="mb-3">
            <Form.Group as={Col} controlId="formGridCity">
              <Form.Label>City</Form.Label>
              <Form.Control />
            </Form.Group>

            <Form.Group as={Col} controlId="formGridState">
              <Form.Label>State</Form.Label>
              <Form.Select defaultValue="Choose...">
                <option>Choose...</option>
                <option>...</option>
              </Form.Select>
            </Form.Group>

            <Form.Group as={Col} controlId="formGridZip">
              <Form.Label>Zip</Form.Label>
              <Form.Control />
            </Form.Group>
          </Row>

          <Form.Group className="mb-3" id="formGridCheckbox">
            <Form.Check type="checkbox" label="Check me out" />
          </Form.Group>

          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </Container>
    </Container>
  );
};

export default ModifyUserComponent;
