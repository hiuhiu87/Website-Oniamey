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

import service from "../../../../../services/CustomerService";
import provinceService from "../../../../../services/ProvinceService";
import { Button } from "react-bootstrap";
import { useEffect } from "react";

const ListAddressDetail = ({ address, index }) => {
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);
  const [provinceId, setProvinceId] = useState();
  const [districtId, setDistrictId] = useState();
  const [finalAddress, setFinalAddress] = useState({});

  const handleDefaultAddress = (addressId) => {
    service
      .changeDefaultAddress(addressId)
      .then((res) => {
        console.log(res);
        toast.success("Đặt làm mặc định thành công");
      })
      .catch((err) => {
        console.log(err);
        toast.error("Đặt làm mặc định thất bại");
      });
  };

  const handleChangeAddress = (e) => {
    const { name, value } = e.target;
    setFinalAddress({ ...address, [name]: value });
    if (name === "province") {
      const selectedProvince = provinces.find(
        (province) => province.name === value
      );
      setProvinceId(selectedProvince.code);
    } else if (name === "district") {
      const selectedDistrict = districts.find(
        (district) => district.name === value
      );
      setDistrictId(selectedDistrict.code);
    }
  };

  useEffect(() => {
    provinceService
      .getProvinces()
      .then((res) => {
        setProvinces(res.data);
        const selectedProvince = res.data.find(
          (province) => province.name === address.province
        );
        setProvinceId(selectedProvince.code);
      })
      .catch((err) => console.log(err));
  }, []);

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

  return (
    <Fragment>
      <Collapse defaultActiveKey={["0"]}>
        <Collapse.Panel header={`Địa Chỉ ${index + 1}`} key={index}>
          <Container className="d-flex flex-column justify-content-between pb-0">
            <Row>
              <Col>
                <Form.Group controlId="receiverInput" className="mb-4">
                  <Form.Label>Họ và tên người nhận</Form.Label>
                  <Form.Control type="text" value={address.receiver} />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId="phoneNumberInput" className="mb-4">
                  <Form.Label>Số điện thoại</Form.Label>
                  <Form.Control type="text" value={address.phoneNumber} />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Group controlId="addressInput" className="mb-4">
                  <Form.Label>Địa chỉ</Form.Label>
                  <Form.Control type="text" value={address.line} />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Group controlId="cityInput" className="mb-4">
                  <Form.Label>Tỉnh/Thành phố</Form.Label>
                  <Form.Select
                    name="province"
                    value={address.province}
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
                    value={address.district}
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
                    value={address.ward}
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
                  defaultChecked={address.isDefault}
                  onChange={(checked) =>
                    checked && handleDefaultAddress(address.id)
                  }
                />
              </div>
              <div>
                <Space>
                  <Button variant="primary">Sửa</Button>
                  <Button variant="danger">Xóa</Button>
                </Space>
              </div>
            </div>
          </Container>
        </Collapse.Panel>
      </Collapse>
    </Fragment>
  );
};

export default ListAddressDetail;
