import React from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { message, Upload } from "antd";
import { useState } from "react";
import { useEffect } from "react";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import API_UPOAD_AVATER from "../../../../services/ApiUploadAvater";
import provinceService from "../../../../services/ProvinceService";
import userService from "../../../../services/UserService";
import "./style/UserStyle.css";
import {
  faQrcode,
  faPlus,
  faBackward,
} from "@fortawesome/free-solid-svg-icons";

const ModifyUserComponent = () => {
  const [user, setUser] = useState({
    username: "",
    identityCard: "",
    fullName: "",
    email: "",
    avatar: "",
    birthDate: "",
    phoneNumber: "",
    gender: null,
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
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

  const getBase64 = (img, callback) => {
    const reader = new FileReader();
    reader.addEventListener("load", () => callback(reader.result));
    reader.readAsDataURL(img);
  };

  const beforeUpload = (file) => {
    const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
    if (!isJpgOrPng) {
      message.error("You can only upload JPG/PNG file!");
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error("Image must be smaller than 2MB!");
    }
    return isJpgOrPng && isLt2M;
  };

  const handleChange = (info) => {
    if (info.file.status === "uploading") {
      setLoading(true);
      return;
    }
    if (info.file.status === "done") {
      getBase64(info.file.originFileObj, (url) => {
        setLoading(false);
        setUser({ ...user, avatar: url });
      });
    }
  };

  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Chọn Ảnh Đại Diện</div>
    </div>
  );

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
    <Container className="content-user-container">
      <div className="d-flex justify-content-between">
        <Link to="/admins/manage-employees">
          <Button variant="secondary" className="m-3">
            <FontAwesomeIcon icon={faBackward} className="me-2" />
          </Button>
        </Link>
        <Button variant="success" onClick={handleSaveChanges} className="m-3">
          <FontAwesomeIcon icon={faQrcode} className="me-2" />
          Quét CCCD
        </Button>
      </div>
      <Container className="d-flex justify-content-center">
        <Col md={4}>
          <h4>Thông Tin Nhân Viên</h4>
          <Container>
            <div className="image-container d-flex justify-content-center align-items-center">
              <Upload
                name="avatar"
                listType="picture-circle"
                className="avatar-uploader d-flex justify-content-center align-items-center"
                showUploadList={false}
                action={API_UPOAD_AVATER}
                beforeUpload={beforeUpload}
                onChange={handleChange}
              >
                {user.avatar ? (
                  <img
                    src={user.avatar}
                    alt="avatar"
                    style={{ width: "100%" }}
                  />
                ) : (
                  uploadButton
                )}
              </Upload>
            </div>
            <FloatingLabel
              controlId="floatingInput"
              label="Username"
              className="mb-4"
            >
              <Form.Control
                type="text"
                placeholder="Username"
                name="username"
                value={user.username}
                onChange={handleInputChange}
                required
              />
            </FloatingLabel>
            <FloatingLabel
              controlId="floatingInput"
              label="Tên Nhân Viên"
              className="mb-5"
            >
              <Form.Control
                type="text"
                placeholder="Tên Nhân Viên"
                name="fullName"
                value={user.fullName}
                onChange={handleInputChange}
                required
              />
            </FloatingLabel>
          </Container>
        </Col>
        <Col className="mh-100">
          <h4>Thông Tin Chi Tiết</h4>
          <Row>
            <Col className="mh-100">
              <FloatingLabel
                controlId="floatingInput"
                label="Mã Định Danh (CMND / CCCD)"
                className="mb-5"
              >
                <Form.Control
                  type="text"
                  placeholder="Identity Card"
                  name="identityCard"
                  value={user.identityCard}
                  onChange={(e) => handleInputChange(e)}
                  required
                />
              </FloatingLabel>
              <FloatingLabel
                controlId="floatingInput"
                label="Ngày Sinh"
                className="mb-5"
              >
                <Form.Control
                  type="date"
                  placeholder="Birth Date"
                  name="birthDate"
                  value={user.birthDate}
                  onChange={(e) => handleInputChange(e)}
                  required
                />
              </FloatingLabel>
              <FloatingLabel
                controlId="floatingInput"
                label="Số Điện Thoại"
                className="mb-5"
              >
                <Form.Control
                  type="text"
                  placeholder="Phone Number"
                  name="phoneNumber"
                  value={user.phoneNumber}
                  onChange={(e) => handleInputChange(e)}
                  required
                />
              </FloatingLabel>
            </Col>
            <Col>
              <FloatingLabel
                controlId="floatingInput"
                label="Giới Tính"
                className="mb-5"
              >
                <Form.Select
                  value={user.gender}
                  onChange={(e) => handleInputChange(e)}
                >
                  <option value={1}>Nam</option>
                  <option value={2}>Nữ</option>
                  <option value={3}>Khác</option>
                </Form.Select>
              </FloatingLabel>
              <FloatingLabel
                controlId="floatingInput"
                label="Email"
                className="mb-5"
              >
                <Form.Control
                  type="email"
                  placeholder="Email"
                  name="email"
                  value={user.email}
                  onChange={(e) => handleInputChange(e)}
                  required
                />
              </FloatingLabel>
              <FloatingLabel
                controlId="floatingInput"
                label="Địa Chỉ Cụ Thể"
                className="mb-5"
              >
                <Form.Control
                  type="text"
                  placeholder="line"
                  name="line"
                  value={address.line}
                  onChange={(e) => handleChangeAddress(e)}
                  required
                />
              </FloatingLabel>
            </Col>
          </Row>
          <Row>
            <Col>
              <FloatingLabel
                controlId="floatingInput"
                label="Tỉnh/Thành Phố"
                className="mb-5"
              >
                <Form.Select
                  value={address.province}
                  onChange={(e) => handleChangeAddress(e)}
                  name="province"
                >
                  {provinces.map((province) => (
                    <option key={province.code} value={province.name}>
                      {province.name}
                    </option>
                  ))}
                </Form.Select>
              </FloatingLabel>
            </Col>
            <Col>
              <FloatingLabel
                controlId="floatingInput"
                label="Quận/Huyện"
                className="mb-5"
              >
                <Form.Select
                  value={address.district}
                  onChange={(e) => handleChangeAddress(e)}
                  name="district"
                >
                  {districts.map((district) => (
                    <option key={district.code} value={district.name}>
                      {district.name}
                    </option>
                  ))}
                </Form.Select>
              </FloatingLabel>
            </Col>
            <Col>
              <FloatingLabel
                controlId="floatingInput"
                label="Phường/Xã"
                className="mb-5"
              >
                <Form.Select
                  value={address.ward}
                  onChange={(e) => handleChangeAddress(e)}
                  name="ward"
                >
                  {wards.map((ward) => (
                    <option key={ward.code} value={ward.name}>
                      {ward.name}
                    </option>
                  ))}
                </Form.Select>
              </FloatingLabel>
            </Col>
          </Row>
        </Col>
      </Container>
      <div className="d-flex justify-content-end">
        <Button
          variant="warning"
          onClick={handleSaveChanges}
          style={{ color: "white" }}
        >
          <FontAwesomeIcon icon={faPlus} className="me-2" />
          Thêm Nhân Viên
        </Button>
      </div>
    </Container>
  );
};

export default ModifyUserComponent;

{
  /* <div className="mt-3">
          <Link to="/admins/manage-employees">
            <Button variant="secondary" className="me-3">
              Back
            </Button>
          </Link>
          <Button variant="dark" onClick={handleSaveChanges}>
            Submit
          </Button>
        </div> */
}