import React from "react";
import { Button, Container, Form, Image } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import { Tabs, Tab } from "react-bootstrap";
import Upload from "rc-upload";
import { Fragment } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import DataTable from "react-data-table-component";

import service from "../../../../services/CustomerService";
import "../manage-user/style/DetailCustomer.css";
import defaultImage from "../manage-user/style/image/man.png";
import ModifyAddressModal from "./components/ModifyAddressModal";
import "../manage-user/style/Table.css";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { faPenSquare, faSquare } from "@fortawesome/free-solid-svg-icons";

const DetaiCustomer = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [isDeleted, setIsDeleted] = useState(true);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [birthDate, setBirthDate] = useState();
  const [gender, setGender] = useState();
  const [avatar, setAvatar] = useState("");
  const { id } = useParams();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [addresses, setAddresses] = useState([]);

  const openModal = async (idCustomer) => {
    if (id) {
      setIsModalOpen(true);
    } else {
      setIsModalOpen(true);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    getAddresses();
  };

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

  const handleSubmit = () => {
    const customer = {
      fullName,
      birthDate,
      email,
      phoneNumber,
      gender,
      avatar,
      isDeleted,
    };

    service
      .updateCustomer(customer, id)
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getAddresses = async () => {
    await service
      .getAddressesById(id)
      .then((res) => {
        console.log(res.data);
        setAddresses(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleChangeDefaultAddress = (id) => {
    return () => {
      service
        .changeDefaultAddress(id)
        .then((res) => {
          console.log(res.data);
          getAddresses();
        })
        .catch((err) => {
          console.log(err);
        });
    };
  };

  const columns = [
    {
      name: "Line",
      center: true,
      selector: (row) => row.line,
    },
    {
      name: "Province",
      center: true,
      selector: (row) => row.province,
    },
    {
      name: "District",
      center: true,
      selector: (row) => row.district,
    },
    {
      name: "Ward",
      center: true,
      selector: (row) => row.ward,
    },
    {
      name: "Action",
      center: true,
      cell: (row) => (
        <>
          <Button
            className="btn btn-dark"
            onClick={() => {}}
            style={{ marginLeft: "10px" }}
          >
            <FontAwesomeIcon icon={faPenSquare} />
          </Button>
          {row.isDefault ? (
            <Button
              className="btn btn-dark"
              // onClick={() => {}}
              style={{ marginLeft: "10px" }}
            >
              <FontAwesomeIcon icon={faCheck} />
            </Button>
          ) : (
            <Button
              className="btn btn-dark"
              onClick={handleChangeDefaultAddress(row.id)}
              style={{ marginLeft: "10px" }}
            >
              <FontAwesomeIcon icon={faSquare} />
            </Button>
          )}
        </>
      ),
    },
  ];

  useEffect(() => {
    console.log(id);
    service
      .getCustomerById(id)
      .then((res) => {
        console.log(res.data);
        setFullName(res.data.fullName);
        setEmail(res.data.email);
        setIsDeleted(res.data.isDeleted);
        setPhoneNumber(res.data.phoneNumber);
        setBirthDate(res.data.birthDate);
        setAvatar(res.data.avatar);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  useEffect(() => {
    getAddresses();
  }, []);

  return (
    <Fragment>
      <h4 className="detail-customer-title">Detail Customer</h4>
      <Container className="detail-form h-75">
        <Tabs
          defaultActiveKey="home"
          id="uncontrolled-tab-example"
          className="mb-3"
        >
          <Tab eventKey="home" title="About">
            <div className="d-flex justify-content-between align-items-center">
              <h5>Information</h5>
              <div className="">
                <Link
                  to="/admins/manage-customers"
                  className="btn btn-secondary"
                >
                  Back
                </Link>
                <Button
                  variant="dark"
                  onClick={handleSubmit}
                  style={{ marginLeft: "3px" }}
                >
                  Save Changes
                </Button>
              </div>
            </div>
            <Form>
              <Form.Group className="mb-3" controlId="formBasicAvatar">
                <Upload {...props}>
                  <Image
                    src={avatar ? avatar : defaultImage}
                    roundedCircle
                    alt="avatar"
                    style={{ maxWidth: "100px" }}
                  />
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
            <div className="d-flex justify-content-end mb-2">
              <Button variant="dark" onClick={() => openModal(id)}>
                Add Address
              </Button>
            </div>
            <div className="table-container p-0">
              <DataTable columns={columns} data={addresses} />
            </div>
          </Tab>
        </Tabs>
        <ModifyAddressModal isOpen={isModalOpen} onClose={closeModal} id={id} />
      </Container>
    </Fragment>
  );
};

export default DetaiCustomer;
