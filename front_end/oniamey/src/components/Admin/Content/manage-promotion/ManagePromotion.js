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

const ManagePromotion = (props) => {
  const [promotions, setPromotions] = useState([]);
  const [productDetailsByPromotion, setProductDetailsByPromotion] = useState(
    []
  );
  const [promotionDetail, setPromotionDetail] = useState([]);
  const [records, setRecords] = useState([]);
  const [showModalDetailPromotion, setShowModalDetailPromotion] =
    useState(false);
  const navigate = useNavigate();
  const [promotionID, setPromotionID] = useState();

  const paginationComponentOptions = {
    rowsPerPageText: "Số Bản Ghi Một Trang",
    rangeSeparatorText: "Trên",
    selectAllRowsItem: true,
    selectAllRowsItemText: "Tất Cả",
  };

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
      selector: (row) => row.promotionStartDate,
      center: "true",
    },
    {
      name: "Ngày kết thúc",
      selector: (row) => row.promotionEndDate,
      center: "true",
    },
    {
      name: "Ngày cập nhật",
      selector: (row) => row.promotionUpdatedDate,
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
                          title: "Success!",
                          text: "You have deactivated this employee!",
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
              }
            }}
          >
            <FontAwesomeIcon icon={!row.deleted ? faLock : faUnlock} />
          </Button>
          <Link
            className="btn btn-dark"
            to={`update-promotion/${row.promotionID}`}
          >
            <FontAwesomeIcon icon={faPenToSquare} color="white" />
          </Link>
          <Button
            variant="dark"
            className="ms-2"
            onClick={() => handleClickPromotionDetail(row.promotionID)}
          >
            <FontAwesomeIcon icon={faEye} color="white" />
          </Button>
        </>
      ),
      center: "true",
    },
  ];

  const handleClickPromotionDetail = (promotionID) => {
    setShowModalDetailPromotion(true);
    if (promotionID) {
      setPromotionID(promotionID);
    }
  };

  const handleFilter = (e) => {
    const valueSearch = e.target.value.toLowerCase();
    const newData = promotions.filter((promo) => {
      const promoName = promo.promotionName
        .toLowerCase()
        .toString()
        .includes(valueSearch);
      const promoValue = promo.promotionValue.toString().includes(valueSearch);
      return promoName || promoValue;
    });
    setRecords(newData);
    if (valueSearch === "") {
      setRecords(promotions);
    }
    // set
  };

  const handleStatusSearch = (e) => {
    const valueSearch = e.target.value;
    const newData = promotions.filter((promo) => {
      if (valueSearch === "true") {
        return promo.promotionDeleted === true;
      } else {
        return promo.promotionDeleted === false;
      }
    });
    setRecords(newData);
    if (valueSearch === "all") {
      setRecords(promotions);
    }
  };

  const getAllPromotion = () => {
    promotionService
      .getAllPromotion()
      .then((response) => {
        console.log(response.data);
        setPromotions(response.data);
        setRecords(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };



  const handleClickTable = (row) => {
    navigate(`update-promotion/${row.promotionID}`);
  };

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
            <Form.Label column sm="1">
              Khuyến mại
            </Form.Label>
            <Col sm="6" xs lg="4">
              <Form.Control
                type="text"
                placeholder="Nhập "
                onChange={(e) => handleFilter(e)}
              />
            </Col>
          </Row>
          <Row className="mb-3 justify-content-md-center">
            <Form.Label column sm="1">
              Trạng Thái
            </Form.Label>
            <Col sm="6" xs lg="4">
              <Form.Select onChange={(e) => handleStatusSearch(e)}>
                <option value="all">Tất Cả</option>
                <option value="true">Hoạt Động</option>
                <option value="false">Ngừng Hoạt Động</option>
              </Form.Select>
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
          onRowClicked={(row) => handleClickTable(row)}
          // selectableRowsasdas
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
