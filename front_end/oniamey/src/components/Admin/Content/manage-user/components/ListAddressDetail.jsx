import { Collapse } from "antd";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import { Switch, Space } from "antd";
import { Fragment } from "react";
import { CheckOutlined, CloseOutlined } from "@ant-design/icons";
import { toast } from "react-toastify";
import { useState } from "react";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import PropTypes from "prop-types";

import service from "../../../../../services/CustomerService";
import provinceService from "../../../../../services/ProvinceService";
import { Button } from "react-bootstrap";
import { useEffect } from "react";
import Swal from "sweetalert2";

const ListAddressDetail = ({
  address,
  index,
  customerId,
  refreshList,
  checkedSwitch,
}) => {
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);
  const [provinceId, setProvinceId] = useState();
  const [districtId, setDistrictId] = useState();
  const [finalAddress, setFinalAddress] = useState({
    id: address.id,
    receiver: address.receiver,
    phoneNumber: address.phoneNumber,
    line: address.line,
    ward: address.ward,
    district: address.district,
    province: address.province,
    isDefault: address.isDefault,
    customerId: customerId,
    isDeleted: false,
  });

  const handleDefaultAddress = (addressId) => {
    service
      .changeDefaultAddress(addressId)
      .then((res) => {
        console.log(res);
        refreshList();
        toast.success("Đặt làm mặc định thành công");
      })
      .catch((err) => {
        console.log(err);
        toast.error("Đặt làm mặc định thất bại");
      });
  };

  const handleUpdateAddress = () => {
    service
      .updateAddress(finalAddress, finalAddress.id)
      .then((res) => {
        console.log(res);
        toast.success("Cập nhật địa chỉ thành công");
      })
      .catch((err) => {
        console.log(err);
        toast.error("Cập nhật địa chỉ thất bại");
      });
  };

  const handleAddressDelete = () => {
    const deleteAddress = () => {
      service
        .deleteAddress(finalAddress.id)
        .then((res) => {
          console.log(res);
          toast.success("Xóa địa chỉ thành công");
          refreshList();
        })
        .catch((err) => {
          console.log(err);
          toast.error("Xóa địa chỉ thất bại");
        });
    };

    Swal.fire({
      title: "Bạn có chắc chắn muốn xóa địa chỉ này?",
      text: "Bạn sẽ không thể khôi phục lại địa chỉ này!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Xóa",
      cancelButtonText: "Hủy",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteAddress();
      }
    });
  };

  const handleChangeAddress = (e) => {
    const { name, value } = e.target;
    if (name === "province") {
      provinces.forEach((province) => {
        if (province.name === value) {
          setProvinceId(province.code);
        }
      });
    } else if (name === "district") {
      districts.forEach((district) => {
        if (district.name === value) {
          setDistrictId(district.code);
        }
      });
    }
    setFinalAddress({ ...finalAddress, [name]: value });
  };

  useEffect(() => {
    provinceService
      .getProvinces()
      .then((res) => {
        setProvinces(res.data);
        const selectedProvince = res.data.find(
          (province) => province.name === finalAddress.province
        );
        setProvinceId(selectedProvince.code);
      })
      .catch((err) => console.log(err));
  }, [finalAddress.province]);

  useEffect(() => {
    if (provinceId) {
      provinceService
        .getDistricts(provinceId)
        .then((res) => {
          setDistricts(res.data.districts);
          const selectedDistrict = res.data.districts.find(
            (district) => district.name === finalAddress.district
          );
          setDistrictId(selectedDistrict.code);
        })
        .catch((err) => console.log(err));
    }
  }, [provinceId, finalAddress.district]);

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

  return (
    <Fragment>
      <Collapse defaultActiveKey={["0"]}>
        <Collapse.Panel
          header={
            address.isDefault ? "Địa Chỉ Mặc Định" : `Địa Chỉ ${index + 1}`
          }
          key={index}
        >
          <Container className="d-flex flex-column justify-content-between pb-0">
            <Row>
              <Col>
                <Form.Group controlId="receiverInput" className="mb-4">
                  <Form.Label>Họ và tên người nhận</Form.Label>
                  <Form.Control
                    name="receiver"
                    type="text"
                    value={finalAddress.receiver}
                    onChange={(e) => handleChangeAddress(e)}
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId="phoneNumberInput" className="mb-4">
                  <Form.Label>Số điện thoại</Form.Label>
                  <Form.Control
                    name="phoneNumber"
                    type="text"
                    value={finalAddress.phoneNumber}
                    onChange={(e) => handleChangeAddress(e)}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Group controlId="addressInput" className="mb-4">
                  <Form.Label>Địa chỉ</Form.Label>
                  <Form.Control
                    type="text"
                    value={finalAddress.line}
                    onChange={(e) => handleChangeAddress(e)}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Group controlId="cityInput" className="mb-4">
                  <Form.Label>Tỉnh/Thành phố</Form.Label>
                  <Form.Select
                    name="province"
                    value={finalAddress.province}
                    onChange={(e) => handleChangeAddress(e)}
                  >
                    {provinces.map((province) => (
                      <option key={province.id} value={province.name}>
                        {province.name}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId="districtInput" className="mb-4">
                  <Form.Label>Quận/Huyện</Form.Label>
                  <Form.Select
                    name="district"
                    value={finalAddress.district}
                    onChange={(e) => handleChangeAddress(e)}
                  >
                    {districts.map((district) => (
                      <option key={district.id} value={district.name}>
                        {district.name}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId="wardInput" className="mb-4">
                  <Form.Label>Phường/Xã</Form.Label>
                  <Form.Select
                    name="ward"
                    value={finalAddress.ward}
                    onChange={(e) => handleChangeAddress(e)}
                  >
                    {wards.map((ward) => (
                      <option key={ward.id} value={ward.name}>
                        {ward.name}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>
            <div className="d-flex justify-content-between">
              <div className="">
                <span>Đặt Làm Mặc Định {"    "}</span>
                <Switch
                  checkedChildren={<CheckOutlined />}
                  unCheckedChildren={<CloseOutlined />}
                  checked={checkedSwitch}
                  onChange={() => handleDefaultAddress(finalAddress.id)}
                  disabled={address.isDefault}
                />
              </div>
              <div>
                <Space>
                  <Button variant="warning" onClick={handleUpdateAddress}>
                    <AiFillEdit color="white" />
                  </Button>
                  <Button variant="danger" onClick={handleAddressDelete}>
                    <AiFillDelete />
                  </Button>
                </Space>
              </div>
            </div>
          </Container>
        </Collapse.Panel>
      </Collapse>
    </Fragment>
  );
};

ListAddressDetail.propTypes = {
  address: PropTypes.object,
  index: PropTypes.number,
  customerId: PropTypes.number,
  refreshList: PropTypes.func,
  checkedSwitch: PropTypes.bool,
};

export default ListAddressDetail;
