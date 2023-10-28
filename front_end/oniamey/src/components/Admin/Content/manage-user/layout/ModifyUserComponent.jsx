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
import { Modal } from "antd";
import QrReader from "react-qr-scanner";
import validator from "validator";
import { AiFillEdit } from "react-icons/ai";
import { BsPersonPlusFill } from "react-icons/bs";

import formatDate from "../../../../../utils/FormatDate";
import apiUploadAvater from "../../../../../services/ApiUploadAvater";
import provinceService from "../../../../../services/ProvinceService";
import userService from "../../../../../services/UserService";
import "../style/UserStyle.css";
import {
  faQrcode,
  faBackward,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import FormatString from "../../../../../utils/FormatString";
import Swal from "sweetalert2";

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

const ModifyUserComponent = () => {
  const [user, setUser] = useState({
    username: "",
    identityCard: "",
    fullName: "",
    email: "",
    avatar: "",
    birthDate: "",
    phoneNumber: "",
    gender: 0,
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

  const [showDeleteButton, setShowDeleteButton] = useState(false);
  const [open, setOpen] = useState(false);
  let delay = 100;
  const [messageValidate, setMessageValidate] = useState({});

  const validateField = () => {
    const messageValidate = {};

    if (validator.isEmpty(user.username)) {
      messageValidate.username = "Username không được để trống";
    } else if (user.username.length < 6) {
      messageValidate.username = "Username phải có ít nhất 6 ký tự";
    } else if (user.username.length > 32) {
      messageValidate.username = "Username phải có ít hơn 32 ký tự";
    }

    if (validator.isEmpty(user.fullName)) {
      messageValidate.fullName = "Họ Và Tên không được để trống";
    } else if (user.fullName.length < 6) {
      messageValidate.fullName = "Họ và Tên phải có ít nhất 6 ký tự";
    } else if (user.fullName.length > 32) {
      messageValidate.fullName = "Họ và Tên phải có ít hơn 32 ký tự";
    }

    if (validator.isEmpty(user.identityCard)) {
      messageValidate.identityCard = "Mã Định Danh không được để trống";
    } else if (user.identityCard.length < 9) {
      messageValidate.identityCard = "Mã Định Danh phải có ít nhất 9 ký tự";
    } else if (user.identityCard.length > 12) {
      messageValidate.identityCard = "Mã Định Danh phải có ít hơn 12 ký tự";
    }

    if (validator.isEmpty(user.phoneNumber)) {
      messageValidate.phoneNumber = "Số Điện Thoại không được để trống";
    } else if (user.phoneNumber.length < 10) {
      messageValidate.phoneNumber = "Số Điện Thoại phải có ít nhất 10 ký tự";
    } else if (user.phoneNumber.length > 11) {
      messageValidate.phoneNumber = "Số Điện Thoại phải có ít hơn 11 ký tự";
    }

    if (validator.isEmpty(user.email)) {
      messageValidate.email = "Email không được để trống";
    } else if (!validator.isEmail(user.email)) {
      messageValidate.email = "Email không hợp lệ";
    }

    if (validator.isEmpty(user.birthDate)) {
      messageValidate.birthDate = "Ngày Sinh không được để trống";
    } else if (!validator.isDate(user.birthDate)) {
      messageValidate.birthDate = "Ngày Sinh không hợp lệ";
    }

    if (user.address === "") {
      if (validator.isEmpty(address.line)) {
        messageValidate.line = "Địa Chỉ không được để trống";
      } else if (address.line.length < 6) {
        messageValidate.line = "Địa Chỉ phải có ít nhất 6 ký tự";
      } else if (address.line.length > 32) {
        messageValidate.line = "Địa Chỉ phải có ít hơn 32 ký tự";
      }

      if (validator.isEmpty(address.province)) {
        messageValidate.province = "Tỉnh/Thành Phố không được để trống";
      }

      if (validator.isEmpty(address.district)) {
        messageValidate.district = "Quận/Huyện không được để trống";
      }

      if (validator.isEmpty(address.ward)) {
        messageValidate.ward = "Phường/Xã không được để trống";
      }
    }

    if (user.gender === 0) {
      messageValidate.gender = "Giới Tính không được để trống";
    }

    setMessageValidate(messageValidate);
    console.log(user);
    if (Object.keys(messageValidate).length > 0) return false;
    return true;
  };

  const stopStreamedVideo = (videoElem) => {
    const stream = videoElem.srcObject;
    const tracks = stream.getTracks();

    tracks.forEach((track) => {
      track.stop();
    });

    videoElem.srcObject = null;
  };

  const handleScan = (data) => {
    const regex =
      /^(\d{8,12})\|([\p{L}\s]+)\|(\d{2}\/\d{2}\/\d{4})\|([A-Za-z]+)\|(.+)\|(\d{2}\/\d{2}\/\d{4})$/u;

    if (data !== "" && data !== null && data !== undefined) {
      if (!regex.test(data.text)) {
        toast.error("QR Code không hợp lệ!");
        return;
      }
    }

    if (data) {
      stopStreamedVideo(document.querySelector("video"));
      setOpen(false);
      console.log(data);
      let parts = data.text.split("|");

      let identityCard = parts[0];
      let fullName = parts[1];
      fullName = FormatString.upperCaseFirstLetter(
        FormatString.lowerCaseAllWordsExceptFirstLetters(fullName)
      );
      let birthDate = parts[2];
      birthDate = birthDate.replace(/(\d{2})\/(\d{2})\/(\d{4})/, "$3-$2-$1");
      let gender = parts[3];
      let address = parts[4];
      setUser({
        ...user,
        identityCard: identityCard,
        fullName: fullName,
        birthDate: birthDate,
        gender: gender === "Nam" ? 1 : 2,
        address: address,
      });

      setAddress({
        ...address,
        line: address,
      });
    }
  };

  const handleError = (err) => {
    console.error(err);
  };

  const showModal = () => {
    setOpen(true);
  };

  const handleCancel = () => {
    stopStreamedVideo(document.querySelector("video"));
    setOpen(false);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUser({ ...user, [name]: value });
  };

  const handleDeleteImage = (e) => {
    e.stopPropagation();
    const deleteFromServer = async () => {
      const parts = user.avatar.split("/");
      const fileName = parts[parts.length - 1];
      console.log(fileName);
      await apiUploadAvater
        .deleteAvatar(fileName)
        .then((response) => {
          console.log(response.data);
          toast.success("Delete successfully!");
        })
        .catch((error) => {
          console.log(error);
          toast.error("Delete failed!");
        });
    };
    deleteFromServer();
    setUser({ ...user, avatar: "" });
    setShowDeleteButton(false);
    setLoading(false);
  };

  const handleSaveChanges = () => {
    if (!validateField()) return;

    Swal.fire({
      title: `Bạn có chắc chắn muốn ${
        id ? "lưu thay đổi của" : "thêm"
      } nhân viên này không?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
    }).then((result) => {
      if (result.isConfirmed) {
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
      }
    });
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
  };

  useEffect(() => {
    provinceService
      .getProvinces()
      .then((response) => {
        console.log(response.data);
        setProvinces(response.data);
        const selectedProvince = response.data.find(
          (province) => province.name === address.province
        );
        setProvinceId(selectedProvince.code);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    provinceService
      .getProvinces()
      .then((response) => {
        console.log(response.data);
        setProvinces(response.data);
        const selectedProvince = response.data.find(
          (province) => province.name === address.province
        );
        setProvinceId(selectedProvince.code);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [address]);

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
          }

          setUser({
            username: response.data.username,
            identityCard: response.data.identityCard,
            fullName: response.data.fullName,
            email: response.data.email,
            avatar: response.data.avatar,
            birthDate: formatDate(response.data.birthDate),
            phoneNumber: response.data.phoneNumber,
            gender: response.data.gender,
            address: response.data.address,
            role: response.data.role === "ROLE_ADMIN" ? 1 : 0,
            isDeleted: response.data.isDeleted,
          });

          if (response.data.avatar) {
            setShowDeleteButton(true);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [id]);

  useEffect(() => {
    if (provinceId) {
      provinceService
        .getDistricts(provinceId)
        .then((res) => {
          setDistricts(res.data.districts);
          const selectedDistrict = res.data.districts.find(
            (district) => district.name === address.district
          );
          setDistrictId(selectedDistrict.code);
        })
        .catch((err) => console.log(err));
    }
  }, [provinceId]);

  useEffect(() => {
    if (districtId) {
      provinceService
        .getWards(districtId)
        .then((res) => {
          setWards(res.data.wards);
        })
        .catch((err) => console.log(err));
    }
  }, [districtId]);

  const handleChange = (info) => {
    if (info.file.status === "uploading") {
      setLoading(true);
      return;
    }
    if (info.file.status === "done") {
      setUser({ ...user, avatar: info.file.response });
      setShowDeleteButton(true);
    }
  };

  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  return (
    <Container className="content-user-container mt-4">
      <div className="d-flex justify-content-between align-items-center">
        <Link to="/admins/manage-employees">
          <Button variant="secondary" className="m-3">
            <FontAwesomeIcon icon={faBackward} />
          </Button>
        </Link>
        <Button variant="success" onClick={showModal} className="m-3">
          <FontAwesomeIcon icon={faQrcode} className="me-2" />
          Quét CCCD
        </Button>
      </div>
      <Container className="d-flex justify-content-center">
        <Col md={4}>
          <h4 className="mb-4">Thông Tin Nhân Viên</h4>
          <Container className="d-flex flex-column justify-content-between pb-0">
            <div className="image-container d-flex justify-content-center align-items-center mb-2">
              <Upload
                name="file"
                listType="picture-circle"
                className="avatar-uploader d-flex justify-content-center align-items-center"
                showUploadList={false}
                action={apiUploadAvater.uploadAvatar}
                beforeUpload={beforeUpload}
                onChange={handleChange}
                headers={{
                  Authorization: `Bearer ${
                    JSON.parse(localStorage.getItem("user")).accessToken
                  }`,
                  "Access-Control-Allow-Origin": "*",
                }}
              >
                {user.avatar ? (
                  <div className="">
                    <img
                      src={user.avatar}
                      alt="avatar"
                      style={{ width: "100%" }}
                    />
                    {showDeleteButton && (
                      <Button
                        variant="outline-light-*"
                        onClick={(e) => handleDeleteImage(e)}
                        className="delete-button"
                      >
                        <FontAwesomeIcon icon={faTrash} color="red" />
                      </Button>
                    )}
                  </div>
                ) : (
                  uploadButton
                )}
              </Upload>
            </div>
            <div>
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
                  isValid={!messageValidate.username && user.username !== ""}
                  isInvalid={messageValidate.username}
                />
                <Form.Control.Feedback type="invalid">
                  {messageValidate.username}
                </Form.Control.Feedback>
              </FloatingLabel>
              <FloatingLabel
                controlId="floatingInput"
                label="Tên Nhân Viên"
                className="mb-4"
              >
                <Form.Control
                  type="text"
                  placeholder="Tên Nhân Viên"
                  name="fullName"
                  value={user.fullName}
                  onChange={handleInputChange}
                  isValid={!messageValidate.fullName && user.fullName !== ""}
                  isInvalid={messageValidate.fullName}
                />
                <Form.Control.Feedback type="invalid">
                  {messageValidate.fullName}
                </Form.Control.Feedback>
              </FloatingLabel>
            </div>
          </Container>
        </Col>
        <Col className="mh-100 d-flex justify-content-between flex-column">
          <h4 className="mb-5">Thông Tin Chi Tiết</h4>
          <div className="">
            <Row>
              <Col className="mh-100">
                <FloatingLabel
                  controlId="floatingInput"
                  label="Mã Định Danh (CMND / CCCD)"
                  className="mb-4"
                >
                  <Form.Control
                    type="text"
                    placeholder="Identity Card"
                    name="identityCard"
                    value={user.identityCard}
                    onChange={(e) => handleInputChange(e)}
                    isValid={
                      !messageValidate.identityCard && user.identityCard !== ""
                    }
                    isInvalid={messageValidate.identityCard}
                  />
                  <Form.Control.Feedback type="invalid">
                    {messageValidate.identityCard}
                  </Form.Control.Feedback>
                </FloatingLabel>
                <FloatingLabel
                  controlId="floatingInput"
                  label="Ngày Sinh"
                  className="mb-4"
                >
                  <Form.Control
                    type="date"
                    placeholder="Birth Date"
                    name="birthDate"
                    value={user.birthDate}
                    onChange={(e) => handleInputChange(e)}
                    isValid={
                      !messageValidate.birthDate && user.birthDate !== ""
                    }
                    isInvalid={messageValidate.birthDate}
                  />
                  <Form.Control.Feedback type="invalid">
                    {messageValidate.birthDate}
                  </Form.Control.Feedback>
                </FloatingLabel>
                <FloatingLabel
                  controlId="floatingInput"
                  label="Số Điện Thoại"
                  className="mb-4"
                >
                  <Form.Control
                    type="text"
                    placeholder="Phone Number"
                    name="phoneNumber"
                    value={user.phoneNumber}
                    onChange={(e) => handleInputChange(e)}
                    isValid={
                      !messageValidate.phoneNumber && user.phoneNumber !== ""
                    }
                    isInvalid={messageValidate.phoneNumber}
                  />
                  <Form.Control.Feedback type="invalid">
                    {messageValidate.phoneNumber}
                  </Form.Control.Feedback>
                </FloatingLabel>
              </Col>
              <Col>
                <FloatingLabel
                  controlId="floatingInput"
                  label="Giới Tính"
                  className="mb-4"
                >
                  <Form.Select
                    value={user.gender}
                    onChange={(e) => handleInputChange(e)}
                    name="gender"
                    isValid={user.gender > 0 && user.gender < 4}
                    isInvalid={messageValidate.gender}
                  >
                    <option value={0}>--Choose--</option>
                    <option value={1}>Nam</option>
                    <option value={2}>Nữ</option>
                    <option value={3}>Khác</option>
                  </Form.Select>
                  <Form.Control.Feedback type="invalid">
                    {messageValidate.gender}
                  </Form.Control.Feedback>
                </FloatingLabel>
                <FloatingLabel
                  controlId="floatingInput"
                  label="Email"
                  className="mb-4"
                >
                  <Form.Control
                    type="email"
                    placeholder="Email"
                    name="email"
                    value={user.email}
                    onChange={(e) => handleInputChange(e)}
                    isValid={!messageValidate.email && user.email !== ""}
                    isInvalid={messageValidate.email}
                  />
                  <Form.Control.Feedback type="invalid">
                    {messageValidate.email}
                  </Form.Control.Feedback>
                </FloatingLabel>
                <FloatingLabel
                  controlId="floatingInput"
                  label="Địa Chỉ Cụ Thể"
                  className="mb-4"
                >
                  <Form.Control
                    type="text"
                    placeholder="line"
                    name="line"
                    value={address.line}
                    onChange={(e) => handleChangeAddress(e)}
                    isValid={!messageValidate.line && address.line !== ""}
                    isInvalid={messageValidate.line}
                    disabled={
                      address.province === "" ||
                      address.district === "" ||
                      address.ward === ""
                    }
                  />
                  <Form.Control.Feedback type="invalid">
                    {messageValidate.line}
                  </Form.Control.Feedback>
                </FloatingLabel>
              </Col>
            </Row>
            <Row>
              <Col>
                <FloatingLabel
                  controlId="floatingInput"
                  label="Tỉnh/Thành Phố"
                  className="mb-4"
                >
                  <Form.Select
                    value={address.province}
                    onChange={(e) => handleChangeAddress(e)}
                    name="province"
                    isValid={
                      !messageValidate.province && address.province !== ""
                    }
                    isInvalid={messageValidate.province}
                  >
                    <option>--Choose--</option>
                    {provinces.map((province) => (
                      <option key={province.code} value={province.name}>
                        {province.name}
                      </option>
                    ))}
                  </Form.Select>
                  <Form.Control.Feedback type="invalid">
                    {messageValidate.province}
                  </Form.Control.Feedback>
                </FloatingLabel>
              </Col>
              <Col>
                <FloatingLabel
                  controlId="floatingInput"
                  label="Quận/Huyện"
                  className="mb-4"
                >
                  <Form.Select
                    value={address.district}
                    onChange={(e) => handleChangeAddress(e)}
                    name="district"
                    isValid={
                      !messageValidate.district && address.district !== ""
                    }
                    isInvalid={messageValidate.district}
                  >
                    <option>--Choose--</option>
                    {districts.map((district) => (
                      <option key={district.code} value={district.name}>
                        {district.name}
                      </option>
                    ))}
                  </Form.Select>
                  <Form.Control.Feedback type="invalid">
                    {messageValidate.district}
                  </Form.Control.Feedback>
                </FloatingLabel>
              </Col>
              <Col>
                <FloatingLabel
                  controlId="floatingInput"
                  label="Phường/Xã"
                  className="mb-4"
                >
                  <Form.Select
                    value={address.ward}
                    onChange={(e) => handleChangeAddress(e)}
                    name="ward"
                    isValid={!messageValidate.ward && address.ward !== ""}
                    isInvalid={messageValidate.ward}
                  >
                    <option>--Choose--</option>
                    {wards.map((ward) => (
                      <option key={ward.code} value={ward.name}>
                        {ward.name}
                      </option>
                    ))}
                  </Form.Select>
                  <Form.Control.Feedback type="invalid">
                    {messageValidate.ward}
                  </Form.Control.Feedback>
                </FloatingLabel>
              </Col>
            </Row>
          </div>
        </Col>
      </Container>
      <div className="d-flex justify-content-end">
        <Button
          variant="warning"
          onClick={handleSaveChanges}
          style={{ color: "white" }}
        >
          {id ? (
            <div>
              <AiFillEdit className="me-2" />
              Cập Nhật
            </div>
          ) : (
            <div>
              <BsPersonPlusFill className="me-2" />
              Thêm Mới
            </div>
          )}
        </Button>
      </div>
      <Modal
        title="Quét Mã QR"
        open={open}
        onCancel={handleCancel}
        onOk={handleCancel}
      >
        <div className="qrcode-container">
          {open ? (
            <QrReader delay={delay} onError={handleError} onScan={handleScan} />
          ) : null}
        </div>
      </Modal>
    </Container>
  );
};

export default ModifyUserComponent;
