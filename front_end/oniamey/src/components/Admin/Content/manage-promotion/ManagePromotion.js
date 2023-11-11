import React from "react";
import "./ManagePromotion.scss";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { FaFilter, FaTag, FaThList } from "react-icons/fa";
import { MdLibraryAdd } from "react-icons/md";
import promotionService from "../../../../services/promotion/PromotionService";
import { useState } from "react";
import { useEffect } from "react";
import DataTable from "react-data-table-component";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLock,
  faUnlock,
  faPenToSquare,
  faEye,
} from "@fortawesome/free-solid-svg-icons";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import ModalDetailPromotion from "./ModalDetailPromotion";
import dayjs from "dayjs";
import { DatePicker, Space } from "antd";
import { DatePickerProps, RangePickerProps } from "antd/es/date-picker";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { format } from "date-fns";



const ManagePromotion = (props) => {
  const [promotions, setPromotions] = useState([]);
  const [records, setRecords] = useState([]);
  const [showModalDetailPromotion, setShowModalDetailPromotion] =
    useState(false);
  const navigate = useNavigate();
  const [promotionID, setPromotionID] = useState();
  const [dataSearch, setDataSearch] = useState({
    promotionEndDate: "",
    promotionInput: "",
    promotionStatus: "",
    promotionType: "",
    promotionStartDate: "",
  });

  const noDataComponent = () => {
    return (
        <div className="no-data-component">
          <h5>Không có dữ liệu</h5>
        </div>
    );
  }

  const { startTime, promotionInput, promotionStatus, promotionType, endTime } =
    dataSearch;

  const paginationComponentOptions = {
    rowsPerPageText: "Số Bản Ghi Một Trang",
    rangeSeparatorText: "Trên",
    selectAllRowsItem: true,
    selectAllRowsItemText: "Tất Cả",
  };

  dayjs.extend(customParseFormat);

  const { RangePicker } = DatePicker;

  const columns = [
    {
      name: "STT",
      selector: (row) => promotions.indexOf(row) + 1,
      minWidth: "40px",
      maxWidth: "80px",
      center: "true",
    },
    {
      name: "Tên khuyến mại",
      selector: (row) => row.promotionName,
      center: "true",
    },
    {
      name: "Mã khuyến mại",
      selector: (row) => row.promotionCode,
      center: "true",
    },
    {
      name: "Ngày bắt đầu",
      selector: (row) => {
        const startDate = new Date(row.promotionStartDate);
        return format(startDate, "HH:mm:ss dd/MM/yyyy");
      },
      center: "true",
    },
    {
      name: "Ngày kết thúc",
      selector: (row) => {
        const endDate = new Date(row.promotionEndDate);
        return format(endDate, "HH:mm:ss dd/MM/yyyy");
      },
      center: "true",
    },
    {
      name: "Ngày cập nhật",
      selector: (row) => {
        const updateDate = new Date(row.promotionUpdatedDate);
        return format(updateDate, "HH:mm:ss dd/MM/yyyy");
      },
      center: "true",
    },
    {
      name: "Giá Trị",
      selector: (row) => {
        if (row.promotionType === "Percentage" || row.type === "%") {
          return row.promotionValue + " %";
        } else {
          return row.promotionValue + " VNĐ";
        }
      },
      center: "true",
    },
    {
      name: "Trạng Thái",
      selector: (row) => {
        if (row.promotionDeleted === true) {
          return <span className="text-success">Hoạt Động</span>;
        } else {
          return <span className="text-danger">Ngừng Hoạt Động</span>;
        }
      },
      center: "true",
    },
    {
      name: "Thao Tác",
      cell: (row) => (
        <>
          <Button
            variant="dark"
            className="me-2"
            onClick={() => {
              if (!row.promotionDeleted) {
                Swal.fire({
                  title: "Thông báo",
                  text: "Bạn muốn mở hoạt động khuyến mại!",
                  icon: "infor",
                  showCancelButton: true,
                  confirmButtonColor: "#3085d6",
                  cancelButtonColor: "#d33",
                  confirmButtonText: "Có",
                  cancelButtonText: "Hủy",
                }).then((result) => {
                  if (result.isConfirmed) {
                    promotionService
                      .changeStatusPromotion(row.promotionID)
                      .then((res) => {
                        Swal.fire({
                          title: "Thành công!",
                          text: "Bản đã mở hoạt động thành công!",
                          icon: "success",
                          confirmButtonColor: "#3085d6",
                          confirmButtonText: "OK",
                        }).then((result) => {
                          getAllPromotion();
                        });
                      })
                      .catch((err) => {
                        console.log(err);
                      });
                  }
                });
              } else {
                Swal.fire({
                  title: "Thông báo?",
                  text: "Bạn muốn ngừng hoạt động khuyến mại!",
                  icon: "warning",
                  showCancelButton: true,
                  confirmButtonColor: "#3085d6",
                  cancelButtonColor: "#d33",
                  confirmButtonText: "Có!",
                  cancelButtonText: "Hủy",
                }).then((result) => {
                  if (result.isConfirmed) {
                    promotionService
                      .changeStatusPromotion(row.promotionID)
                      .then((res) => {
                        Swal.fire({
                          title: "Thành công!",
                          text: "Bạn đã ngừng hoạt động khuyến mại!",
                          icon: "Thành công",
                          confirmButtonColor: "#3085d6",
                          confirmButtonText: "OK",
                        }).then((result) => {
                          getAllPromotion();
                        });
                      })
                      .catch((err) => {
                        console.log(err);
                      });
                  }
                });
              }
            }}
          >
            <FontAwesomeIcon icon={!row.deleted ? faLock : faUnlock} />
          </Button>
          {/*<Link*/}
          {/*  className="btn btn-dark"*/}
          {/*  to={`update-promotion/${row.promotionID}`}*/}
          {/*>*/}
          {/*  <FontAwesomeIcon icon={faPenToSquare} color="white" />*/}
          {/*</Link>*/}
          <Button
            variant="dark"
            className="ms-2"
            onClick={() => handleDetailPromotion(row.promotionID)}
          >
            <FontAwesomeIcon icon={faEye} color="white" />
          </Button>
        </>
      ),
      center: "true",
    },
  ];

  const onChangeFilters = (e) => {
    const { name, value } = e.target;

    setDataSearch({ ...dataSearch, [name]: value });

    getAllPromotionByFilter({ ...dataSearch, [name]: value });
  };

  const handleTimeSearch = (dates, dateStrings) => {
    const [start, end] = dateStrings;

    if (start && end) {
      const startTime = dayjs(start, "HH:mm:ss YYYY-MM-DD").valueOf();
      const endTime = dayjs(end, "HH:mm:ss YYYY-MM-DD").valueOf();
      console.log("Start Time (long): ", startTime);
      console.log("End Time (long): ", endTime);
      setDataSearch({
        ...dataSearch,
        promotionStartDate: startTime,
        promotionEndDate: endTime,
      });

      getAllPromotionByFilter({
        ...dataSearch,
        promotionStartDate: startTime,
        promotionEndDate: endTime,
      });
    } else {
      setDataSearch({
        ...dataSearch,
        promotionStartDate: "",
        promotionEndDate: "",
      });

      getAllPromotionByFilter({
        ...dataSearch,
        promotionStartDate: "",
        promotionEndDate: "",
      });
    }
  };

  const getAllPromotion = () => {
    promotionService
      .getAllPromotion()
      .then((response) => {
        setPromotions(response.data);
        setRecords(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getAllPromotionByFilter = (dataSearch) => {
    promotionService
      .getPromotionByFilter(dataSearch)
      .then((response) => {
        setPromotions(response.data);
        setRecords(response.data);
      })
      .catch((error) => {
        console.log("lõi");
      });
  };

  const handleDetailPromotion = (promotionID) => {
    setShowModalDetailPromotion(true);
    setPromotionID(promotionID)
  }

  // const handleClickTable = (row) => {
  //   navigate(`update-promotion/${row.promotionID}`);
  // };

  useEffect(() => {
    getAllPromotion();
  }, []);

  return (
    <Container className="manage-promotion-container">
      <div className="manage-promotion-title">
        <div className="title">
          <FaTag size={32} /> Quản Lý Khuyến mại
        </div>
      </div>
      <div className="manage-promotion-search">
        <div className="search-promotion-title">
          <div className="title">
            <FaFilter size={26} /> Bộ Lọc
          </div>
        </div>
        <Form>
          <Row className="mb-3 justify-content-md-center">
            <Form.Label column sm="2">
              Khuyến mại
            </Form.Label>
            <Col sm="6" xs lg="4">
              <Form.Control
                name="promotionInput"
                type="text"
                placeholder="Tìm theo tên - mã - giá trị"
                onChange={(e) => onChangeFilters(e)}
              />
            </Col>
          </Row>
          <Row className="mb-3 justify-content-md-center">
            <Form.Label column sm="2">
              Trạng Thái / Kiểu giá trị
            </Form.Label>
            <Col sm="6" xs lg="2">
              <Form.Select
                onChange={(e) => onChangeFilters(e)}
                name="promotionStatus"
              >
                <option value="">Tất Cả</option>
                <option value="1">Hoạt Động</option>
                <option value="0">Ngừng Hoạt Động</option>
              </Form.Select>
            </Col>
            <Col sm="6" xs lg="2">
              <Form.Select
                onChange={(e) => onChangeFilters(e)}
                name="promotionType"
              >
                <option value="">Tất Cả</option>
                <option value="Percentage">Phần Trăm</option>
                <option value="Fixed Amount">Tiền Cố Định</option>
              </Form.Select>
            </Col>
          </Row>
          <Row className="mb-3 justify-content-md-center">
            <Form.Label column sm="2">
              Thời gian
            </Form.Label>
            <Col sm="6" xs lg="4">
              <Form.Group>
                <Space direction="vertical" size={12} className="w-100">
                  <RangePicker
                    className="w-100 p-2 text-light"
                    showTime={{ format: "HH:mm:ss" }}
                    format="HH:mm:ss YYYY-MM-DD"
                    onChange={handleTimeSearch}
                  />
                </Space>
              </Form.Group>
            </Col>
          </Row>
        </Form>
      </div>
      <div className="manage-promotion-table">
        <div className="list-promotion-title">
          <div className="title">
            <FaThList size={26} /> Danh Sách Khuyến mại
          </div>
          <Link className="btn btn-dark text-light" to={"add-promotion"}>
            <MdLibraryAdd color="white" /> Thêm
          </Link>
        </div>
        <DataTable
          columns={columns}
          data={records}
          pagination
          paginationComponentOptions={paginationComponentOptions}
          highlightOnHover
          pointerOnHover
          paginationRowsPerPageOptions={[5, 10, 20]}
          onRowClicked={(row) => handleDetailPromotion(row.promotionID)}
          noDataComponent={noDataComponent()}
        />
        <ModalDetailPromotion
          show={showModalDetailPromotion}
          setShow={setShowModalDetailPromotion}
          promotionID={promotionID}
        />
      </div>
    </Container>
  );
};

export default ManagePromotion;
