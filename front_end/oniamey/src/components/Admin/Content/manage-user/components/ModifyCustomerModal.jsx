import React, {Fragment, useEffect} from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import {useState} from "react";
import service from "../../../../../services/CustomerService";
import Swal from "sweetalert2";

import formatDate from "../../../../../utils/FormatDate";

const ModifyCustomerModal = ({isOpen, onClose, id}) => {
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [isDeleted, setIsDeleted] = useState(true);
    const [phoneNumber, setPhoneNumber] = useState("");
    const [birthDate, setBirthDate] = useState();
    const [gender, setGender] = useState();
    const [avatar, setAvatar] = useState("");

    useEffect(() => {
        if (id > 0) {
            service
                .getCustomerById(id)
                .then((res) => {
                    setFullName(res.data.fullName);
                    setEmail(res.data.email);
                    setAvatar(res.data.avatar);
                    if (res.data.birthDate) {
                        setBirthDate(formatDate(res.data.birthDate));
                    } else {
                        setBirthDate("");
                    }
                    setGender(res.data.gender);
                    setPhoneNumber(res.data.phoneNumber);
                    setIsDeleted(res.data.isActive);
                    console.log(res.data.gender);
                })
                .catch((err) => {
                    console.log(err);
                });
        } else {
            setFullName("");
            setEmail("");
            setPhoneNumber("");
            setIsDeleted(true);
            setBirthDate("");
            setGender(3);
            setAvatar("");
        }
    }, [id]);

    const showAlert = (title, message) => {
        Swal.fire({
            title: title,
            text: message,
            icon: "info",
            confirmButtonText: "Back to Home Page",
            showCancelButton: true,
            cancelButtonText: "Continue",
        }).then((result) => {
            if (result.isConfirmed) {
                onClose();
            }
        });
    };

    const saveOrUpdateCustomer = (e) => {
        const customer = {
            fullName,
            birthDate,
            email,
            phoneNumber,
            gender,
            avatar,
            isDeleted,
        };

        console.log(customer);

        if (id > 0) {
            service
                .updateCustomer(customer, id)
                .then((res) => {
                    console.log(res);
                    showAlert("Infor", res.data);
                    onClose();
                })
                .catch((err) => {
                    console.log(err.response.data);
                    showAlert("Error", err.response.data.birthDate);
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

    const renderUpdateFields = (idCheck) => {
        if (idCheck > 0) {
            return (
                <Fragment>
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
                </Fragment>
            );
        } else {
            setFullName("");
            setEmail("");
            setPhoneNumber("");
            setIsDeleted(true);
            setBirthDate("");
            setGender(1);
            setAvatar("");
        }
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
                    <Modal.Title>
                        {id > 0 ? "Update Customer" : "Add Customer"}
                    </Modal.Title>
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
                        {id > 0 && renderUpdateFields(id)}
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
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button
                        variant="dark"
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

export default ModifyCustomerModal;