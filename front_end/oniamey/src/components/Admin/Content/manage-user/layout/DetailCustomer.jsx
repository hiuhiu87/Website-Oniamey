import React from "react";
import { Button, Container, Form, Row } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { BsPencilSquare, BsPersonPlusFill } from "react-icons/bs";
import Swal from "sweetalert2";
import {
  faBackward,
  faQrcode,
  faTrash,
  faHouseChimneyMedical,
} from "@fortawesome/free-solid-svg-icons";
import apiUploadAvater from "../../../../../services/ApiUploadAvater";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { Col } from "react-bootstrap";
import { toast } from "react-toastify";
import { message, Upload } from "antd";
import { Modal } from "antd";
import QrReader from "react-qr-scanner";
import validator from "validator";
import { Collapse } from "antd";
import { CloseCircleFilled, PlusCircleFilled } from "@ant-design/icons";



import ListAddressDetail from "../components/ListAddressDetail";
import provinceService from "../../../../../services/ProvinceService";
import FormatString from "../../../../../utils/FormatString";
import formatDate from "../../../../../utils/FormatDate";
import service from "../../../../../services/CustomerService";
import "../style/DetailCustomer.css";
// import "../style/Table.css";

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

const DetaiCustomer = () => {
  const [customer, setCustomer] = useState({
    username: "",
    fullName: "",
    identityCard: "",
    phoneNumber: "",
    birthDate: "",
    gender: 0,
    email: "",
    avatar: "",
    isDeleted: false,
  });
  const [customerAddress, setCustomerAddress] = useState({
    receiver: "",
    phoneNumber: "",
    line: "",
    province: "",
    district: "",
    ward: "",
    customerId: "",
    isDefault: false,
    isDeleted: false,
  });
  const [showDeleteButton, setShowDeleteButton] = useState(false);
  const [messageValidate, setMessageValidate] = useState({});
  const [messageValidateAddress, setMessageValidateAddress] = useState({});
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [delay, setDelay] = useState(100);
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);
  const [provinceId, setProvinceId] = useState();
  const [districtId, setDistrictId] = useState();
  const [hadId, setHadId] = useState(false);
  const { id } = useParams();
  const [allAddress, setAllAddress] = useState([]);

  const validateCustomerField = () => {
    const messageValidate = {};

    if (validator.isEmpty(customer.username)) {
      messageValidate.username = "Username không được để trống";
    } else if (customer.username.length < 6) {
      messageValidate.username = "Username phải có ít nhất 6 ký tự";
    } else if (customer.username.length > 32) {
      messageValidate.username = "Username phải có ít hơn 32 ký tự";
    }

    if (validator.isEmpty(customer.fullName)) {
      messageValidate.fullName = "Họ Và Tên không được để trống";
    } else if (customer.fullName.length < 6) {
      messageValidate.fullName = "Họ và Tên phải có ít nhất 6 ký tự";
    } else if (customer.fullName.length > 32) {
      messageValidate.fullName = "Họ và Tên phải có ít hơn 32 ký tự";
    }

    if (validator.isEmpty(customer.identityCard)) {
      messageValidate.identityCard = "Mã Định Danh không được để trống";
    } else if (customer.identityCard.length < 9) {
      messageValidate.identityCard = "Mã Định Danh phải có ít nhất 9 ký tự";
    } else if (customer.identityCard.length > 12) {
      messageValidate.identityCard = "Mã Định Danh phải có ít hơn 12 ký tự";
    }

    if (validator.isEmpty(customer.phoneNumber)) {
      messageValidate.phoneNumber = "Số Điện Thoại không được để trống";
    } else if (customer.phoneNumber.length < 10) {
      messageValidate.phoneNumber = "Số Điện Thoại phải có ít nhất 10 ký tự";
    } else if (customer.phoneNumber.length > 11) {
      messageValidate.phoneNumber = "Số Điện Thoại phải có ít hơn 11 ký tự";
    } else if (!validator.isMobilePhone(customer.phoneNumber)) {
      messageValidate.phoneNumber = "Số Điện Thoại không hợp lệ";
    }

    if (validator.isEmpty(customer.email)) {
      messageValidate.email = "Email không được để trống";
    } else if (!validator.isEmail(customer.email)) {
      messageValidate.email = "Email không hợp lệ";
    }

    if (validator.isEmpty(customer.birthDate)) {
      messageValidate.birthDate = "Ngày Sinh không được để trống";
    } else if (!validator.isDate(customer.birthDate)) {
      messageValidate.birthDate = "Ngày Sinh không hợp lệ";
    }

    if (customer.gender === 0) {
      messageValidate.gender = "Giới Tính không được để trống";
    }

    setMessageValidate(messageValidate);
    if (Object.keys(messageValidate).length > 0) return false;
    return true;
  };

  const validateAddressField = () => {
    const messageValidate = {};
    if (validator.isEmpty(customerAddress.receiver)) {
      messageValidate.receiver = "Người Nhận không được để trống";
    }

    if (validator.isEmpty(customerAddress.phoneNumber)) {
      messageValidate.phoneNumber = "Số Điện Thoại không được để trống";
    }

    if (validator.isEmpty(customerAddress.line)) {
      messageValidate.line = "Số Nhà, Đường không được để trống";
    }

    if (validator.isEmpty(customerAddress.province)) {
      messageValidate.province = "Tỉnh/Thành Phố không được để trống";
    }

    if (validator.isEmpty(customerAddress.district)) {
      messageValidate.district = "Quận/Huyện không được để trống";
    }

    if (validator.isEmpty(customerAddress.ward)) {
      messageValidate.ward = "Phường/Xã không được để trống";
    }

    setMessageValidateAddress(messageValidate);
    console.log(customerAddress);
    if (Object.keys(messageValidate).length > 0) return false;
    return true;
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setCustomer({ ...customer, [name]: value });
    console.log(customer);
  };

  const handleError = (err) => {
    console.error(err);
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
      setCustomer({
        ...customer,
        identityCard: identityCard,
        fullName: fullName,
        birthDate: birthDate,
        gender: gender === "Nam" ? 1 : 2,
      });

      // setCustomerAddress({
      //   ...address,
      //   line: address,
      // });
    }
  };

  const stopStreamedVideo = (videoElem) => {
    const stream = videoElem.srcObject;
    const tracks = stream.getTracks();

    tracks.forEach((track) => {
      track.stop();
    });

    videoElem.srcObject = null;
  };

  const handleCancel = () => {
    console.log("Clicked cancel button");
    stopStreamedVideo(document.querySelector("video"));
    setOpen(false);
  };

  const handleDeleteImage = (e) => {
    e.stopPropagation();
    const deleteFromServer = async () => {
      const parts = customer.avatar.split("/");
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
    setCustomer({ ...customer, avatar: "" });
    setShowDeleteButton(false);
    setLoading(false);
  };

  const showModal = () => {
    setOpen(true);
  };

  const handleChange = (info) => {
    if (info.file.status === "uploading") {
      setLoading(true);
      return;
    }
    if (info.file.status === "done") {
      setCustomer({ ...customer, avatar: info.file.response });
      setShowDeleteButton(true);
    }
  };

  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  const handleChangeAddress = (event) => {
    const { name, value } = event.target;
    setCustomerAddress({ ...customerAddress, [name]: value });
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

    console.log(customerAddress);
  };

  const handleAddAddress = () => {
    if (!validateAddressField()) return;
    if (customerAddress.customerId === "") {
      toast.error("Vui lòng tạo thông tin khách hàng trước!");
      return;
    }
    service
      .createAddress(customerAddress)
      .then((response) => {
        console.log(response.data);
        toast.success("Create successfully!");
      })
      .catch((error) => {
        console.log(error);
        toast.error("Create failed!");
      });
  };

  const handleSubmit = () => {
    console.log(customer);
    if (!validateCustomerField()) return;
    if (id) {
      setHadId(true);
      service
        .updateCustomer(customer, id)
        .then((response) => {
          console.log(response.data);
          toast.success("Update successfully!");
        })
        .catch((error) => {
          console.log(error);
          toast.error("Update failed!");
        });
    } else {
      service
        .createCustomer(customer)
        .then((response) => {
          if (response.status === 201 && isNaN(response.data) === false) {
            console.log(response.data);
            setHadId(true);
            setCustomerAddress({
              ...customerAddress,
              receiver: customer.fullName,
              phoneNumber: customer.phoneNumber,
              customerId: response.data,
            });
            toast.success("Create successfully!");
          } else if (response.data === "Email already exists") {
            toast.error("Email đã tồn tại!");
          } else if (response.data === "Username already exists") {
            toast.error("Username đã tồn tại!");
          } else if (response.data === "Identity Card already exists") {
            toast.error("Mã Định Danh đã tồn tại!");
          } else if (response.data === "Phone Number already exists") {
            toast.error("Số Điện Thoại đã tồn tại!");
          }
        })
        .catch((error) => {
          console.log(error);
          toast.error("Create failed!");
        });
    }
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
      setHadId(true);
      service
        .getCustomerById(id)
        .then((response) => {
          console.log(response.data);
          setCustomer({
            username: response.data.username,
            fullName: response.data.fullName,
            identityCard: response.data.identityCard,
            phoneNumber: response.data.phoneNumber,
            birthDate: formatDate(response.data.birthDate),
            gender: response.data.gender,
            email: response.data.email,
            avatar: response.data.avatar,
          });
          setCustomerAddress({
            ...customerAddress,
            customerId: response.data.id,
          });
        })
        .catch((error) => {
          console.log(error);
        });

      service
        .getAddressesById(id)
        .then((response) => {
          console.log(response.data);
          setAllAddress(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [id]);

  useEffect(() => {
    if (
      customerAddress.province &&
      provinceId !== undefined &&
      provinceId !== null
    ) {
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
  }, [provinceId, customerAddress.province]);

  useEffect(() => {
    if (customerAddress.district) {
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
  }, [districtId, customerAddress.district]);

  return (
    <Container className="detail-customer mt-4">
      <div className="d-flex justify-content-between align-items-center">
        <Link to="/admins/manage-customers">
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
          <h4 className="mb-4">Thông Tin Khách Hàng</h4>
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
              >
                {customer.avatar ? (
                  <div className="">
                    <img
                      src={customer.avatar}
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
              <Form.Group controlId="usernameInput" className="mb-4">
                <Form.Label>Username</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="vana123"
                  name="username"
                  value={customer.username}
                  onChange={handleInputChange}
                  isValid={
                    !messageValidate.username && customer.username !== ""
                  }
                  isInvalid={messageValidate.username}
                />
                <Form.Control.Feedback type="invalid">
                  {messageValidate.username}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group controlId="fullNameInput" className="mb-4">
                <Form.Label>Tên Khách Hàng</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Nguyễn Văn A"
                  name="fullName"
                  value={customer.fullName}
                  onChange={handleInputChange}
                  isValid={
                    !messageValidate.fullName && customer.fullName !== ""
                  }
                  isInvalid={messageValidate.fullName}
                />
                <Form.Control.Feedback type="invalid">
                  {messageValidate.fullName}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group controlId="indentifyCardInput" className="mb-4">
                <Form.Label>Mã Định Danh</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="0123*********"
                  name="identityCard"
                  value={customer.identityCard}
                  onChange={handleInputChange}
                  isValid={
                    !messageValidate.identityCard &&
                    customer.identityCard !== ""
                  }
                  isInvalid={messageValidate.identityCard}
                />
                <Form.Control.Feedback type="invalid">
                  {messageValidate.identityCard}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group controlId="phoneNumberInput" className="mb-4">
                <Form.Label>Số Điện Thoại</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="0123456789"
                  name="phoneNumber"
                  value={customer.phoneNumber}
                  onChange={handleInputChange}
                  isValid={
                    !messageValidate.phoneNumber && customer.phoneNumber !== ""
                  }
                  isInvalid={messageValidate.phoneNumber}
                />
                <Form.Control.Feedback type="invalid">
                  {messageValidate.phoneNumber}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group controlId="emailInput" className="mb-4">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="vana@gmail.com"
                  name="email"
                  value={customer.email}
                  onChange={handleInputChange}
                  isValid={!messageValidate.email && customer.email !== ""}
                  isInvalid={messageValidate.email}
                />
                <Form.Control.Feedback type="invalid">
                  {messageValidate.email}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group controlId="dateOfBirthInput" className="mb-4">
                <Form.Label>Ngày Sinh</Form.Label>
                <Form.Control
                  type="date"
                  name="birthDate"
                  value={customer.birthDate}
                  onChange={handleInputChange}
                  isValid={
                    !messageValidate.birthDate && customer.birthDate !== ""
                  }
                  isInvalid={messageValidate.birthDate}
                />
                <Form.Control.Feedback type="invalid">
                  {messageValidate.birthDate}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group className="mb-4" controlId="">
                <Form.Label>Giới Tính</Form.Label>
                <div className="d-flex">
                  <Form.Check
                    inline
                    label="Nam"
                    name="gender"
                    type="radio"
                    defaultChecked
                    value="1"
                    onChange={handleInputChange}
                  />
                  <Form.Check
                    inline
                    label="Nữ"
                    name="gender"
                    type="radio"
                    value="2"
                    onChange={handleInputChange}
                  />
                  <Form.Check
                    inline
                    label="Khác"
                    name="gender"
                    type="radio"
                    value="3"
                    onChange={handleInputChange}
                  />
                </div>
              </Form.Group>
              <div className="d-flex justify-content-end">
                <Button
                  variant="warning"
                  className="mt-4 "
                  onClick={handleSubmit}
                >
                  {hadId ? (
                    <div className="">
                      <BsPencilSquare className="me-2" />
                      Cập Nhật
                    </div>
                  ) : (
                    <div className="">
                      <BsPersonPlusFill className="me-2" />
                      Thêm Mới
                    </div>
                  )}
                </Button>
              </div>
            </div>
          </Container>
        </Col>
        <Col>
          <h4 className="mb-5">Thông Tin Địa Chỉ</h4>
          <div className="d-flex justify-content-between flex-column">
            <Collapse
              defaultActiveKey={hadId ? "1" : ""}
              expandIcon={({ isActive }) =>
                isActive ? <CloseCircleFilled /> : <PlusCircleFilled />
              }
              collapsible={hadId ? "" : "disabled"}
              size="large"
            >
              <Collapse.Panel header="Tạo Địa Chỉ" key="1">
                <Container className="d-flex flex-column justify-content-between pb-0">
                  <Row>
                    <Col>
                      <Form.Group controlId="receiverInput" className="mb-4">
                        <Form.Label>Người Nhận</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Nguyễn Văn A"
                          name="receiver"
                          value={customerAddress.receiver}
                          onChange={(e) => handleChangeAddress(e)}
                          isValid={
                            !messageValidateAddress.receiver &&
                            customerAddress.receiver !== ""
                          }
                          isInvalid={messageValidateAddress.receiver}
                        />
                        <Form.Control.Feedback type="invalid">
                          {messageValidateAddress.receiver}
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                    <Col>
                      <Form.Group controlId="phoneNumberInput" className="mb-4">
                        <Form.Label>Số Điện Thoại</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="0123456789"
                          name="phoneNumber"
                          value={customerAddress.phoneNumber}
                          onChange={(e) => handleChangeAddress(e)}
                          isValid={
                            !messageValidateAddress.phoneNumber &&
                            customerAddress.phoneNumber !== ""
                          }
                          isInvalid={messageValidateAddress.phoneNumber}
                        />
                        <Form.Control.Feedback type="invalid">
                          {messageValidateAddress.phoneNumber}
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Form.Group controlId="lineInput" className="mb-4">
                    <Form.Label>Số Nhà, Đường</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Số nhà, đường"
                      name="line"
                      value={messageValidateAddress.line}
                      onChange={(e) => handleChangeAddress(e)}
                      isValid={
                        !messageValidateAddress.line &&
                        customerAddress.line !== ""
                      }
                      isInvalid={messageValidateAddress.line}
                    />
                    <Form.Control.Feedback type="invalid">
                      {messageValidateAddress.line}
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Row>
                    <Col>
                      <Form.Group controlId="provinceInput" className="mb-4">
                        <Form.Label>Tỉnh/Thành Phố</Form.Label>
                        <Form.Select
                          name="province"
                          value={customerAddress.province}
                          onChange={(e) => handleChangeAddress(e)}
                          isValid={
                            !messageValidateAddress.province &&
                            customerAddress.province !== ""
                          }
                          isInvalid={messageValidateAddress.province}
                        >
                          <option>Chọn Tỉnh/Thành Phố</option>
                          {provinces.map((province) => (
                            <option key={province.code} value={province.name}>
                              {province.name}
                            </option>
                          ))}
                        </Form.Select>
                        <Form.Control.Feedback type="invalid">
                          {messageValidateAddress.province}
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                    <Col>
                      <Form.Group controlId="districtInput" className="mb-4">
                        <Form.Label>Quận/Huyện</Form.Label>
                        <Form.Select
                          name="district"
                          value={customerAddress.district}
                          onChange={(e) => handleChangeAddress(e)}
                          isValid={
                            !messageValidateAddress.district &&
                            customerAddress.district !== ""
                          }
                          isInvalid={messageValidateAddress.district}
                        >
                          <option>Chọn Quận/Huyện</option>
                          {districts.map((district) => (
                            <option key={district.code} value={district.name}>
                              {district.name}
                            </option>
                          ))}
                        </Form.Select>
                        <Form.Control.Feedback type="invalid">
                          {messageValidateAddress.district}
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                    <Col>
                      <Form.Group controlId="wardInput" className="mb-4">
                        <Form.Label>Phường/Xã</Form.Label>
                        <Form.Select
                          name="ward"
                          value={customerAddress.ward}
                          onChange={(e) => handleChangeAddress(e)}
                          isValid={
                            !messageValidateAddress.ward &&
                            customerAddress.ward !== ""
                          }
                          isInvalid={messageValidateAddress.ward}
                        >
                          <option value="">Chọn Phường/Xã</option>
                          {wards.map((ward) => (
                            <option key={ward.code} value={ward.name}>
                              {ward.name}
                            </option>
                          ))}
                        </Form.Select>
                        <Form.Control.Feedback type="invalid">
                          {messageValidateAddress.ward}
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                  </Row>
                  <div className="d-flex justify-content-end">
                    <Button
                      variant="success"
                      className="mt-4"
                      onClick={handleAddAddress}
                    >
                      <FontAwesomeIcon
                        icon={faHouseChimneyMedical}
                        className="me-2"
                      />
                      Lưu Địa Chỉ
                    </Button>
                  </div>
                </Container>
              </Collapse.Panel>
            </Collapse>
            <hr />
            {allAddress.map((address, index) => (
              <ListAddressDetail
                address={address}
                index={index}
                key={address.id}
              />
            ))}
          </div>
        </Col>
      </Container>
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

export default DetaiCustomer;
