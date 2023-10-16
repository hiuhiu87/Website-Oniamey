import React from "react";
import { Form, FloatingLabel, Modal, Button, Col, Row } from "react-bootstrap";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import provinceService from "../../../../../services/ProvinceService";
import CustomerService from "../../../../../services/CustomerService";

const ModifyAddressModal = ({ isOpen, onClose, id }) => {
  const [address, setAddress] = useState({
    province: "",
    district: "",
    ward: "",
    line: "",
    customerId: id,
    isDefault: false,
    isDeleted: false,
  });
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);
  const [provinceId, setProvinceId] = useState();
  const [districtId, setDistrictId] = useState();

  useEffect(() => {
    if (id > 0) {
      provinceService
        .getProvinces()
        .then((response) => {
          console.log(response.data);
          setProvinces(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }

    return () => {
      setProvinces([]);
    };
  }, [id]);

  useEffect(() => {
    if (address.province) {
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
    if (address.district) {
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

  const handleChange = (e) => {
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

    return () => {
      setAddress({
        province: "",
        district: "",
        ward: "",
        line: "",
        customerId: id,
        isDefault: false,
        isDeleted: false,
      });
    };
  };

  const handleClose = () => {
    onClose();
  };

  const handleSubmit = () => {
    console.log(address);
    CustomerService.createAddress(address)
      .then((response) => {
        console.log(response.data);
        onClose();
        toast.success("Address added successfully!");
      })
      .catch((error) => {
        console.log(error);
        toast.error("Something went wrong!");
      });
  };

  return (
    <>
      <Modal show={isOpen} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>{id > 0 ? "Update Address" : "Add Address"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row className="g-2">
            <Col md>
              <FloatingLabel
                controlId="floatingSelect"
                label="Choose Province / City"
                className="mb-3"
              >
                <Form.Select
                  aria-label="Floating label select example"
                  name="province"
                  onChange={(e) => handleChange(e)}
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
              <FloatingLabel controlId="floatingSelect" label="Choose Ward">
                <Form.Select
                  aria-label="Floating label select example"
                  name="ward"
                  onChange={handleChange}
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
            </Col>
            <Col md>
              <FloatingLabel
                controlId="floatingSelectGrid"
                label="Choose District"
                className="mb-3"
              >
                <Form.Select
                  aria-label="Floating label select example"
                  name="district"
                  onChange={handleChange}
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
              <FloatingLabel
                controlId="floatingInputGrid"
                label="Address Detail"
              >
                <Form.Control
                  type="text"
                  placeholder="Address Detail"
                  name="line"
                  onChange={handleChange}
                  value={address.line}
                />
              </FloatingLabel>
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="dark" onClick={handleSubmit}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModifyAddressModal;