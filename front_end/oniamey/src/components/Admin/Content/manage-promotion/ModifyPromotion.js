import React, { useState, useEffect } from "react";
import "./ManagePromotion.scss";
import {
  Button,
  Col,
  Container,
  Dropdown,
  DropdownButton,
  Form,
  InputGroup,
  Row,
} from "react-bootstrap";
// import { useParams } from "react-router-dom";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { DatePicker, Space } from "antd";
import promotionService from "../../../../services/promotion/PromotionService";
import { Navigator, useNavigate } from "react-router-dom";

const ModifyPromotion = (props) => {
  const [selectedType, setSelectedType] = useState("percentage");
  let navigate = useNavigate();
  // ----- them promotion
  const [promotion, setPromotion] = useState({
    promotionName: "",
    promotionCode: "",
    promotionValue: "",
    promotionType: "",
    promotionDeleted: "",
    promotionStartDate: "",
    promotionEndDate: "",
    promotionProductID: "",
    promotionProductDetailID: "",
  });

  const {
    promotionName,
    promotionCode,
    promotionValue,
    promotionType,
    promotionDeleted,
    promotionStartDate,
    promotionEndDate,
    promotionProductID,
    promotionProductDetailID,
  } = promotion;

  const onInputChangeFormAddPromotion = (e) => {
    const { name, value } = e.target;
    setPromotion({ ...promotion, [name]: value });
  };

  // -- het them promotion

  const handleTypeSelect = (type) => {
    setSelectedType(type);
  };

  // time
  dayjs.extend(customParseFormat);

  const { RangePicker } = DatePicker;

  const range = (start, end) => {
    const result = [];
    for (let i = start; i < end; i++) {
      result.push(i);
    }
    return result;
  };

  // eslint-disable-next-line arrow-body-style
  const disabledDate = (current) => {
    // Can not select days before today and today
    return current && current < dayjs().endOf("day");
  };

  // const disabledDateTime = () => ({
  //   disabledHours: () => range(0, 24).splice(4, 20),
  //   disabledMinutes: () => range(30, 60),
  //   disabledSeconds: () => [55, 56],
  // });

  const disabledRangeTime = (_, type) => {
    if (type === "start") {
      return {
        disabledHours: () => range(0, 60).splice(4, 20),
        disabledMinutes: () => range(30, 60),
        disabledSeconds: () => [55, 56],
      };
    }
    return {
      disabledHours: () => range(0, 60).splice(20, 4),
      disabledMinutes: () => range(0, 31),
      disabledSeconds: () => [55, 56],
    };
  };

  const addPromotion = (e) => {
    e.preventDefault();
    promotionService
      .createPromotion()
      .then((response) => {
        console.log(response.data);
        navigate("../manage-promotion");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {}, []);

  return (
    <Container className="manage-modifypromotion-container">
      <Row className="relative">
        <Col xs lg={4} className="fixed manage-addpromotion-container">
          <Form className="p-4">
            <h3 className="text-center pb-2">Thêm khuyến mại</h3>
            <Form.Group className="mb-3" controlId="formBasicMa">
              <Form.Label>Mã khuyến mại</Form.Label>
              <Form.Control
                name="promotionCode"
                type="text"
                placeholder="nhập vào mã khuyến mại"
                value={promotionCode}
                onChange={(e) => onInputChangeFormAddPromotion(e)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicName">
              <Form.Label>Tên khuyến mại</Form.Label>
              <Form.Control
                name="promotionName"
                type="text"
                placeholder="nhập vào tên khuyến mại"
                value={promotionName}
                onChange={(e) => onInputChangeFormAddPromotion(e)}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Giá trị khuyến mại</Form.Label>
              <InputGroup className="mb-3">
                <Form.Control
                  name="promotionValue"
                  type="Text"
                  placeholder="nhập vào giá trị khuyến mại"
                  value={promotionValue}
                  onChange={(e) => onInputChangeFormAddPromotion(e)}
                />

                <DropdownButton
                  title={`${selectedType === "percentage" ? "%" : "VNĐ"}`}
                  name="promotionType"
                  onSelect={handleTypeSelect}
                  variant="outline-secondary"
                  align="end"
                  value={promotionType}
                  onChange={(e) => onInputChangeFormAddPromotion(e)}
                >
                  <Dropdown.Item eventKey="percentage" className="background-hover-dropdown-item">
                    Kiểu 1: %
                  </Dropdown.Item>
                  <Dropdown.Item eventKey="vnd" className="background-hover-dropdown-item">
                    Kiểu 2: Giá trị cố định
                  </Dropdown.Item>
                </DropdownButton>
              </InputGroup>
            </Form.Group>
            <Form.Group>
              <Form.Label>Thời gian khuyến mại</Form.Label>
              <Space direction="vertical" size={12} className="w-100">
                <RangePicker
                  className="w-100 p-2 text-light"
                  disabledDate={disabledDate}
                  disabledTime={disabledRangeTime}
                  showTime={{
                    hideDisabledOptions: true,
                    defaultValue: [
                      dayjs("00:00:00", "HH:mm:ss"),
                      dayjs("11:59:59", "HH:mm:ss"),
                    ],
                  }}
                  format="YYYY-MM-DD HH:mm:ss"
                />
              </Space>
            </Form.Group>
            <Form.Group className="text-center pt-4">
              <Button variant="outline-dark" onClick={(e) => addPromotion(e)}>
                Thêm khuyến mãi
              </Button>
            </Form.Group>
          </Form>
        </Col>
        <Col ms lg={7} className="relative">
          <Row className="manage-addpromotion-container">
            <Col ms log={10} className="absolute-col-2">
              {/* <Form className="p-4">
                <h3 className="text-center pb-2">Thêm khuyến mại</h3>
                <Form.Group className="mb-3" controlId="formBasicMa">
                  <Form.Label>Mã khuyến mại</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="nhập vào mã khuyến mại"
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicName">
                  <Form.Label>Tên khuyến mại</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="nhập vào tên khuyến mại"
                  />
                </Form.Group>

                <Form.Group>
                  <Form.Label>Giá trị khuyến mại</Form.Label>
                  <InputGroup className="mb-3">
                    <Form.Control
                      type="Text"
                      placeholder="nhập vào giá trị khuyến mại"
                    />

                    <DropdownButton
                      title={`${selectedType === "percentage" ? "%" : "VNĐ"}`}
                      onSelect={handleTypeSelect}
                      variant="outline-secondary"
                      align="end"
                    >
                      <Dropdown.Item eventKey="percentage">
                        Kiểu 1: %
                      </Dropdown.Item>
                      <Dropdown.Item eventKey="vnd">
                        Kiểu 2: Giá trị cố định
                      </Dropdown.Item>
                    </DropdownButton>
                  </InputGroup>
                </Form.Group>
                <Form.Group>
                  <Form.Label>Thời gian khuyến mại</Form.Label>
                  <Space direction="vertical" size={12} className="w-100">
                    <RangePicker
                      className="w-100 p-2 text-light"
                      disabledDate={disabledDate}
                      disabledTime={disabledRangeTime}
                      showTime={{
                        hideDisabledOptions: true,
                        defaultValue: [
                          dayjs("00:00:00", "HH:mm:ss"),
                          dayjs("11:59:59", "HH:mm:ss"),
                        ],
                      }}
                      format="YYYY-MM-DD HH:mm:ss"
                    />
                  </Space>
                </Form.Group>
                <Form.Group className="text-center pt-4">
                  <Button variant="outline-dark">Thêm khuyến mãi</Button>
                </Form.Group>
              </Form>
               */}
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default ModifyPromotion;
