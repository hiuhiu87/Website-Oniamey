import { React, useEffect, useState } from "react";
import promotionService from "../../../../services/promotion/PromotionService";

import _ from "lodash";
import { Button, Col, Modal, Row } from "react-bootstrap";

const ModalDetailPromotion = (props) => {
  const { show, setShow, promotionID } = props;
  const [productDetailsByPromotion, setProductDetailsByPromotion] = useState(
    []
  );
  const [promotion, setPromotion] = useState({});

  const handleClose = () => {
    setShow(false);
  };

  const getProductDetailsByPromotionID = (id) => {
    promotionService
      .getProductDetailsByPromotionID(id)
      .then((response) => {
        console.log(response.data);
        setProductDetailsByPromotion(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getPromotionByID = (id) => {
    promotionService
      .getDetailPromotion(id)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getProductDetailsByPromotionID(promotionID);
    getPromotionByID(promotionID);
  }, [promotionID]);

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
        <form className="row g-3">
          <Row>
            <Col>
              <div className="col-md-12">
                <label className="form-label">Tên khuyến mại</label>
                <input type="text" className="form-control" />
              </div>
              <div className="col-md-12">
                <label className="form-label">Mã khuyến mại</label>
                <input type="text" className="form-control" />
              </div>
              <div className="col-md-12">
                <label className="form-label">Ngày bắt đầu</label>
                <input type="text" className="form-control" />
              </div>
              <div className="col-md-12">
                <label className="form-label">ngày cập nhật</label>
                <input type="text" className="form-control" />
              </div>
            </Col>
            <Col>
              <div className="col-md-12">
                <label className="form-label">giá trị giảm</label>
                <input type="text" className="form-control" />
              </div>
              <div className="col-md-12">
                <label className="form-label">trạng thái khuyến mại</label>
                <input type="text" className="form-control" />
              </div>
              <div className="col-md-12">
                <label className="form-label">ngày kết thúc</label>
                <input type="text" className="form-control" />
              </div>
              <div className="col-md-12">
                <label className="form-label">cập nhật bởi</label>
                <input type="text" className="form-control" />
              </div>
            </Col>
          </Row>
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
