import React from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import Image from "react-bootstrap/Image";
import { useState } from "react";
import avatarStatic from "../manage-user/style/image/man.png";
import { useEffect } from "react";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";

import provinceService from "../../../../services/ProvinceService";
import userService from "../../../../services/UserService";

const ModifyUserComponent = () => {
  const [user, setUser] = useState({
    fullName: "",
    email: "",
    avatar: "",
    birthDate: "",
    phoneNumber: "",
    gender: 3,
    address: "",
    role: 0,
    isDeleted: false,
  });

  const [address, setAddress] = useState({
    province: "",
    district: "",
    ward: "",
    line: "",
  });
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);
  const [provinceId, setProvinceId] = useState();
  const [districtId, setDistrictId] = useState();
  const { id } = useParams();

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUser({ ...user, [name]: value });
    console.log(user);
  };

  const handleSaveChanges = () => {
    if (id) {
      userService
        .updateUser(user, id)
        .then((response) => {
          console.log(response.data);
          toast.success("Update successfully!");
        })
        .catch((error) => {
          console.log(error);
          toast.error("Update failed!");
        });
    } else {
      userService
        .createUser(user)
        .then((response) => {
          console.log(response.data);
          toast.success("Add successfully!");
        })
        .catch((error) => {
          console.log(error);
          toast.error("Add failed!");
        });
    }
  };

  const handleChangeAddress = (e) => {
    const { name, value } = e.target;
    setAddress({ ...address, [name]: value });
    if (name === "province") {
      const selectedProvince = provinces.find(
        (province) => province.name === value
      );
      setProvinceId(selectedProvince ? selectedProvince.code : null);
    }

    if (name === "district") {
      const selectedDistrict = districts.find(
        (district) => district.name === value
      );
      setDistrictId(selectedDistrict ? selectedDistrict.code : null);
    }

    setUser({
      ...user,
      address: `${address.line}, ${address.ward}, ${address.district}, ${address.province}`,
    });

    return () => {
      setAddress({
        province: "",
        district: "",
        ward: "",
        line: "",
      });
    };
  };

  useEffect(() => {
    provinceService
      .getProvinces()
      .then((response) => {
        console.log(response.data);
        setProvinces(response.data);
      })
      .catch((error) => {
        console.log(error);
      });

    return () => {
      setProvinces([]);
    };
  }, []);

  useEffect(() => {
    if (id) {
      userService
        .getUserById(id)
        .then((response) => {
          console.log(response.data);
          if (response.data.address) {
            const address = response.data.address.split(", ");
            setAddress({
              province: address[3],
              district: address[2],
              ward: address[1],
              line: address[0],
            });
          } else {
            setAddress({
              province: "",
              district: "",
              ward: "",
              line: "",
            });
          }

          setUser({
            fullName: response.data.fullName,
            email: response.data.email,
            avatar: response.data.avatar,
            birthDate: response.data.birthDate,
            phoneNumber: response.data.phoneNumber,
            gender: response.data.gender,
            address: response.data.address,
            role: response.data.role === "ROLE_ADMIN" ? 1 : 0,
            isDeleted: response.data.isDeleted,
          });
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [id]);

  useEffect(() => {
    if (address.province && provinceId !== undefined) {
      provinceService
        .getDistricts(provinceId)
        .then((response) => {
          console.log(response.data.districts);
          setDistricts(response.data.districts);
        })
        .catch((error) => {
          console.log(error);
        });
    }

    return () => {
      setDistricts([]);
      setWards([]);
    };
  }, [provinceId, address.province]);

  useEffect(() => {
    if (address.district && districtId !== undefined) {
      provinceService
        .getWards(districtId)
        .then((response) => {
          console.log(response.data.wards);
          setWards(response.data.wards);
        })
        .catch((error) => {
          console.log(error);
        });
    }

    return () => {
      setWards([]);
    };
  }, [districtId, address.district]);

  return (
    <Container>
      <h1>{id ? "Update Staff Informtion" : "Add Staff"}</h1>
      <Container className="mw-75">
        <Form>
          <Image src={avatarStatic} roundedCircle style={{ width: "100px" }} />
          <Row className="mb-3 mt-4">
            <Form.Group as={Col} controlId="formGridFullName">
              <FloatingLabel
                controlId="floatingInput"
                label="Full Name"
                className="mb-3"
              >
                <Form.Control
                  type="text"
                  placeholder="Enter Full Name"
                  name="fullName"
                  onChange={(e) => handleInputChange(e)}
                  value={user.fullName}
                />
              </FloatingLabel>
            </Form.Group>

            <Form.Group as={Col} controlId="formGridPhoneNumber">
              <FloatingLabel
                controlId="floatingInput"
                label="Phone Number"
                className="mb-3"
              >
                <Form.Control
                  type="text"
                  placeholder="Enter Phone Number"
                  name="phoneNumber"
                  onChange={(e) => handleInputChange(e)}
                  value={user.phoneNumber}
                />
              </FloatingLabel>
            </Form.Group>

            <Form.Group as={Col} controlId="formGridEmail">
              <FloatingLabel
                controlId="floatingInput"
                label="Email Address"
                className="mb-3"
              >
                <Form.Control
                  type="email"
                  required
                  placeholder="Enter Email"
                  name="email"
                  onChange={(e) => handleInputChange(e)}
                  value={user.email}
                />
              </FloatingLabel>
            </Form.Group>
            <Form.Group as={Col} controlId="formGridBirthDate">
              <FloatingLabel
                controlId="floatingInput"
                label="Date of Birth"
                className="mb-3"
              >
                <Form.Control
                  type="date"
                  name="birthDate"
                  onChange={(e) => handleInputChange(e)}
                  value={user.birthDate}
                />
              </FloatingLabel>
            </Form.Group>
            <Form.Group as={Col} controlId="formGridGender">
              <FloatingLabel
                controlId="floatingSelect"
                label="Choose Gender"
                className="mb-3"
              >
                <Form.Select
                  aria-label="Floating label select example"
                  name="gender"
                  onChange={(e) => handleInputChange(e)}
                  value={user.gender}
                >
                  <option>--Choose One--</option>
                  <option value={1}>Male</option>
                  <option value={2}>Female</option>
                  <option value={3}>Another</option>
                </Form.Select>
              </FloatingLabel>
            </Form.Group>
          </Row>
          <Row className="mb-3">
            <Form.Group as={Col} controlId="formGridCity">
              <FloatingLabel
                controlId="floatingSelect"
                label="Choose Province / City"
                className="mb-3"
              >
                <Form.Select
                  aria-label="Floating label select example"
                  name="province"
                  onChange={(e) => handleChangeAddress(e)}
                  value={address.province}
                >
                  <option>--Choose One--</option>
                  {provinces.map((province) => (
                    <option key={province.code} value={province.name}>
                      {province.name}
                    </option>
                  ))}
                </Form.Select>
              </FloatingLabel>
            </Form.Group>

            <Form.Group as={Col} controlId="formGridState">
              <FloatingLabel
                controlId="floatingSelectGrid"
                label="Choose District"
                className="mb-3"
              >
                <Form.Select
                  aria-label="Floating label select example"
                  name="district"
                  onChange={(e) => handleChangeAddress(e)}
                  value={address.district}
                >
                  <option>--Choose One--</option>
                  {districts.map((district) => (
                    <option key={district.code} value={district.name}>
                      {district.name}
                    </option>
                  ))}
                </Form.Select>
              </FloatingLabel>
            </Form.Group>
            <Form.Group as={Col} controlId="formGridZip">
              <FloatingLabel controlId="floatingSelect" label="Choose Ward">
                <Form.Select
                  aria-label="Floating label select example"
                  name="ward"
                  onChange={(e) => handleChangeAddress(e)}
                  value={address.ward}
                >
                  <option>--Choose One--</option>
                  {wards.map((ward) => (
                    <option key={ward.code} value={ward.name}>
                      {ward.name}
                    </option>
                  ))}
                </Form.Select>
              </FloatingLabel>
            </Form.Group>
            <Form.Group as={Col} controlId="formGridZip">
              <FloatingLabel
                controlId="floatingInputGrid"
                label="Address Detail"
              >
                <Form.Control
                  type="text"
                  placeholder="Address Detail"
                  name="line"
                  onChange={(e) => handleChangeAddress(e)}
                  value={address.line}
                />
              </FloatingLabel>
            </Form.Group>
          </Row>

          <Form.Group className="mb-3" controlId="formGridAddress1">
            <Form.Label>Address</Form.Label>
            <Form.Control
              placeholder="1234 Main St"
              name="address"
              onChange={(e) => handleInputChange(e)}
              value={user.address}
            />
          </Form.Group>
          <Form.Group
            as={Col}
            controlId="formGridRole"
            className="d-flex flex-row"
          >
            <Form.Check
              type="checkbox"
              label="Admin"
              name="role"
              onChange={(e) => handleInputChange(e)}
              value={1}
              checked={user.role === 1 ? true : false}
            />
            <Form.Check
              className="ms-3"
              type="checkbox"
              label="Staff"
              name="role"
              onChange={(e) => handleInputChange(e)}
              value={0}
              checked={user.role === 0 ? true : false}
            />
          </Form.Group>
          <div className="mt-3">
            <Link to="/admins/manage-employees">
              <Button variant="secondary" className="me-3">
                Back
              </Button>
            </Link>
            <Button variant="dark" onClick={handleSaveChanges}>
              Submit
            </Button>
          </div>
        </Form>
      </Container>
    </Container>
  );
};

export default ModifyUserComponent;
