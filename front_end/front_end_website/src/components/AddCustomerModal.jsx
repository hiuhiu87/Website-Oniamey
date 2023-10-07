import React, { Fragment, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { useState } from "react";
import service from "../services/CustomerService";
import { useParams } from "react-router-dom";
// import DatePicker from "react-datepicker";
import Swal from "sweetalert2";

const AddCustomerModal = ({ isOpen, onClose }) => {
  const { id } = useParams();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState(1);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [birthDate, setBirthDate] = useState();
  const [gender, setGender] = useState();
  const [avatar, setAvatar] = useState("");

  const showAlert = (title, message) => {
    Swal.fire({
      title: title,
      text: message,
      icon: "info",
      confirmButtonText: "Back to Home Page",
      showCancelButton: true,
      cancelButtonText: "Continue",
    });
  };

  const saveOrUpdateCustomer = (e) => {
    const customer = {
      fullName,
      birthDate,
      email,
      password,
      phoneNumber,
      gender,
      avatar,
      status,
    };

    if (id) {
      service
        .updateCustomer(customer, id)
        .then((res) => {
          console.log(res);
          onClose();
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      service
        .createCustomer(customer)
        .then((res) => {
          console.log(res);
          showAlert("Success", res.data);
          onClose();
        })
        .catch((err) => {
          console.log(err);
          showAlert("Error", "Create customer failed");
        });
    }
  };

  const renderUpdateFields = () => {
    return (
      <Fragment>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Date of Birth</Form.Label>
          <Form.Control type="date" />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Gender</Form.Label>
          <Form.Select>
            <option>Male</option>
            <option>Female</option>
            <option>Another</option>
          </Form.Select>
        </Form.Group>
      </Fragment>
    );
  };

  const handleClose = () => {
    onClose();
  };

  if (!isOpen) {
    return null;
  }

  return (
    <Fragment>
      <Modal show={isOpen} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{id ? "Update Customer" : "Add Customer"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
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
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>
            {/* {renderUpdateFields()} */}
            <Form.Group className="mb-3">
              <Form.Label>Status</Form.Label>
              <Form.Select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <option value={1}>Active</option>
                <option value={0}>Deactivate</option>
              </Form.Select>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button
            variant="primary"
            onClick={(e) => {
              e.preventDefault();
              Swal.fire({
                title: "Xác Nhận",
                text: "Bạn có chắc chắn muốn lưu lại thay đổi không ?",
                showCancelButton: true,
                showConfirmButton: true,
              }).then((result) => {
                if (result["isConfirmed"]) {
                  saveOrUpdateCustomer(e);
                }
              });
            }}
          >
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </Fragment>
  );
};

export default AddCustomerModal;
