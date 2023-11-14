import React from "react";
import { Button, Modal } from "react-bootstrap";

const ModalDelete = (props) => {

    const { showModalDelete, setShowModalDelete, handleDisable, dataDelete } = props;
    const handleDelete = () => {
        handleDisable(dataDelete)
    }

    const closeModal = () => {
        setShowModalDelete(false)
    }

    return (
        <>
            <Modal
                show={showModalDelete}
            >
                <Modal.Header>
                    <Modal.Title>Xác Nhận Vô Hiệu Hóa</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>Bạn Chắc Chắn Muốn Vô Hiệu Hóa Voucher Có Id = {dataDelete}?</p>
                    <p>Bạn Chắc Chắn Muốn Vô Hiệu Hóa Voucher Có Id = {dataDelete}?</p>
                    <p>Bạn Chắc Chắn Muốn Vô Hiệu Hóa Voucher Có Id = {dataDelete}?</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button className="btn-success" onClick={() => handleDelete()}>Xác Nhận</Button>
                    <Button className="btn-secondary" onClick={() => closeModal()}>Hủy</Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default ModalDelete;