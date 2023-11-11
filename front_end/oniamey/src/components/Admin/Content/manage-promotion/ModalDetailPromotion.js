import { React, useEffect, useState } from "react";
import promotionService from "../../../../services/promotion/PromotionService";
import { Button, Col, Modal, Row } from "react-bootstrap";
import { format } from "date-fns";
import DataTable from "react-data-table-component";
import Swal from "sweetalert2";

const ModalDetailPromotion = (props) => {
  const { show, setShow, promotionID } = props;
  const [productDetailsByPromotion, setProductDetailsByPromotion] = useState(
    [],
  );
  const [promotion, setPromotion] = useState({});

  const handleClose = () => {
    setShow(false);
  };

  const noDataComponent = () => {
    return (
      <div className="no-data-component">
        <h5>Không có dữ liệu</h5>
      </div>
    );
  };

  const paginationComponentOptions = {
    rowsPerPageText: "Số Bản Ghi Một Trang",
    rangeSeparatorText: "Trên",
    selectAllRowsItem: true,
    selectAllRowsItemText: "Tất Cả",
  };

  const getProductDetailsByPromotionID = (id) => {
    promotionService
      .getProductDetailsByPromotionID(id)
      .then((response) => {
        console.log(response.data);
        setProductDetailsByPromotion(response.data);
      })
      .catch((error) => {
        console.log("lỗi product");
        console.log(error);
      });
  };

  const getPromotionByID = (id) => {
    promotionService
      .getDetailPromotion(id)
      .then((response) => {
        console.log(response.data);
        setPromotion(response.data);
      })
      .catch((error) => {
        console.log("lỗi promotion");
        console.log(error);
      });
  };

  const columns = [
    {
      name: "STT",
      selector: (row) => productDetailsByPromotion.indexOf(row) + 1,
      minWidth: "40px",
      maxWidth: "80px",
      center: "true",
    },
    {
      name: "Ảnh",
      selector: (row) => row.productDetailImage,
      center: "true",
    },
    {
      name: "Tên sản phẩm",
      selector: (row) => row.productDetailName,
      center: "true",
    },
    {
      name: "Mã sản phẩm",
      selector: (row) => row.productDetailCode,
      center: "true",
    },
    {
      name: "Giá sản phẩm",
      selector: (row) => row.productDetailPrice + " VNĐ",
      center: "true",
    },
    {
      name: "Giá áp dụng",
      selector: (row) =>
        getValuePromotionPriceAfter(
          promotion.promotionType,
          promotion.promotionValue,
          row.productDetailPrice,
        ),
      center: "true",
    },
    {
      name: "Số lượng",
      selector: (row) => row.productDetailQuantity,
      center: "true",
    },
    {
      name: "Cân nặng",
      selector: (row) => row.productDetailWeight,
      center: "true",
    },
    {
      name: "Trạng thái",
      selector: (row) => {
        if (row.productDetailDeleted === true) {
          return <span className="text-success">Ngừng Hoạt ĐỘng</span>;
        } else {
          return <span className="text-danger">Hoạt Động</span>;
        }
      },
      center: "true",
    },
  ];

  useEffect(() => {
    if (show) {
      getPromotionByID(promotionID);
      getProductDetailsByPromotionID(promotionID);
    }
    return () => {
      setPromotion([]);
      setProductDetailsByPromotion([]);
    };
  }, [promotionID, show]);

  const getValuePromotionPriceAfter = (
    promotionType,
    promotionValue,
    productDetailPrice,
  ) => {
    console.log(promotionType, promotionValue, productDetailPrice);
    if (promotionType === "Percentage") {
      const giaSauGiam = parseFloat(
        productDetailPrice - (promotionValue * productDetailPrice) / 100,
      );
      console.log(giaSauGiam);
      return giaSauGiam + " VNĐ";
    } else {
      const giaSauGiam = parseFloat(productDetailPrice - promotionValue);
      console.log(giaSauGiam);
      return giaSauGiam + " VNĐ";
    }
  };

  const colorTrangThai = (e) => {
    if (e != null) {
      if (e) {
        return "form-control text-danger";
      } else {
        return "form-control text-success";
      }
    }
  };

  const changeLongToDate = (e) => {
    if (e != null) {
      const updateDate = new Date(e);
      return format(updateDate, "HH:mm:ss dd/MM/yyyy");
    }
  };

  return (
    <Modal
      show={show}
      onHide={handleClose}
      size="xl"
      backdrop="static"
      className="modal-detail"
      centered
    >
      <Modal.Header>
        <Modal.Title>Chi tiết khuyến mại</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form
          className="row g-3 justify-content-center p-3"
          style={{ borderRadius: "15px" }}
        >
          <Row className="mb-2">
            <Col>
              <div className="col-md-12">
                <label className="form-label">Tên khuyến mại</label>
                <input
                  type="text"
                  className="form-control"
                  value={promotion.promotionName}
                  disabled
                />
              </div>
              <div className="col-md-12">
                <label className="form-label">Kiểu khuyến mại</label>
                <input
                  type="text"
                  className="form-control"
                  value={
                    promotion.promotionType === "Percentage"
                      ? "Phần trăm"
                      : "Tiền cố định"
                  }
                  // text
                  disabled
                />
              </div>
              <div className="col-md-12">
                <label className="form-label">Ngày bắt đầu</label>
                <input
                  type="text"
                  className="form-control"
                  value={changeLongToDate(promotion.promotionStartDate)}
                  disabled
                />
              </div>
              <div className="col-md-12">
                <label className="form-label">Ngày cập nhật</label>
                <input
                  type="text"
                  className="form-control"
                  value={changeLongToDate(promotion.promotionUpdatedDate)}
                  disabled
                />
              </div>
            </Col>
            <Col>
              {/* <div className="col-md-12">
                <label className="form-label">Giá áo giảm</label>
                <input
                  type="text"
                  className="form-control"
                  value={
                    getValuePromotionPrice(
                      promotion.promotionType,
                      promotion.promotionValue,
                      productDetailsByPromotion.productDetailPrice
                    ) + " VNĐ"
                  }
                  disabled
                />
              </div>
              <div className="col-md-12">
                <label className="form-label">Giá áo sau khi giảm</label>
                <input
                  type="text"
                  className="form-control"
                  value={
                    getValuePromotionPriceAfter(
                      promotion.promotionType,
                      promotion.promotionValue,
                      productDetailsByPromotion.productDetailPrice
                    ) + " VNĐ"
                  }
                  disabled
                />
              </div> */}
              <div className="col-md-12">
                <label className="form-label">Mã khuyến mại</label>
                <input
                  type="text"
                  className="form-control"
                  value={promotion.promotionCode}
                  disabled
                />
              </div>
              <div className="col-md-12">
                <label className="form-label">Giá trị khuyến mại</label>
                <input
                  type="text"
                  className="form-control"
                  value={
                    promotion.promotionValue +
                    (promotion.promotionType === "Percentage" ? " %" : " VNĐ")
                  }
                  disabled
                />
              </div>
              <div className="col-md-12">
                <label className="form-label">Ngày kết thúc</label>
                <input
                  type="text"
                  className="form-control"
                  value={changeLongToDate(promotion.promotionEndDate)}
                  disabled
                />
              </div>
              {/* <div className="col-md-12">
                <label className="form-label">Cập nhật bởi</label>
                <input
                  type="text"
                  className="form-control"
                  value={promotion.promotionUpdatedBy}
                  disabled
                />
              </div> */}
              <div className="col-md-12">
                <label className="form-label">Trạng thái khuyến mại</label>
                <input
                  type="text"
                  className={colorTrangThai(promotion.promotionDeleted)}
                  value={
                    promotion.promotionDeleted ? "Ngừng Họạt Động" : "Hoạt động"
                  }
                  disabled
                />
              </div>
            </Col>
          </Row>
          <DataTable
            columns={columns}
            data={productDetailsByPromotion}
            pagination
            paginationComponentOptions={paginationComponentOptions}
            highlightOnHover
            pointerOnHover
            noDataComponent={noDataComponent()}
            paginationRowsPerPageOptions={[1, 5, 8]}
            // onRowClicked={(row) => handleClickTable(row)}
          />
        </form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalDetailPromotion;
