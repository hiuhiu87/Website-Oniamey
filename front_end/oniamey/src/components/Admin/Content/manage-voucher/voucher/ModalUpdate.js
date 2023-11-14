import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Button, Modal } from "react-bootstrap";

const ModalUpdate = (props) => {

    const { showModalUpdate, setShowModalUpdate, handleUpdate, dataUpdate } = props;

    const [id, setId] = useState()
    const [voucherCode, setVoucherCode] = useState()
    const [voucherName, setVoucherName] = useState()
    const [type, setType] = useState()
    const [value, setValue] = useState()
    const [minimumDiscount, setMinimumDiscount] = useState()
    const [maximumDiscount, setMaximumDiscount] = useState()
    const [quantity, setQuantity] = useState()
    const [startDate, setStartDate] = useState()
    const [endDate, setEndDate] = useState()
    const [deleted, setDeleted] = useState()

    const data = {
        id
        , voucherCode
        , voucherName
        , type
        , value
        , minimumDiscount
        , maximumDiscount
        , quantity
        , startDate
        , endDate
        , deleted
    }

    // Đẩy dữ liệu cũ lên modal
    useEffect(() => {
        setId(dataUpdate.id)
        setVoucherCode(dataUpdate.voucherCode)
        setVoucherName(dataUpdate.voucherName)
        setType(dataUpdate.type)
        setValue(dataUpdate.value)
        setMinimumDiscount(dataUpdate.minimumDiscount)
        setMaximumDiscount(dataUpdate.maximumDiscount)
        setQuantity(dataUpdate.quantity)
        setStartDate(dataUpdate.startDate)
        setEndDate(dataUpdate.endDate)
        setDeleted(dataUpdate.deleted)
    }, [dataUpdate])

    const closeModal = () => {
        setShowModalUpdate(false)
    }

    const clickUpdate = () => {
        handleUpdate(data)
    }

    return (
        <>
            <Modal
                show={showModalUpdate}
            >
                <Modal.Header>
                    <Modal.Title>Update Voucher</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form>
                        <div className='p-3'>
                            <div className="row">
                                <div className="form-group col-sm-12 p-2">
                                    <label>Mã giảm giá</label>
                                    <input type="text" className="form-control" name='voucherCode' value={voucherCode}
                                        onChange={(e) => setVoucherCode(e.target.value)} />
                                </div>
                            </div>
                            <div className="row">
                                <div className="form-group col-sm-6 p-2">
                                    <label>Tên</label>
                                    <input type="text" className="form-control" name='voucherName' value={voucherName}
                                        onChange={(e) => setVoucherName(e.target.value)} />
                                </div>
                                <div className="form-group col-sm-6 p-2">
                                    <label>Loại</label>
                                    <select className="form-control" name='type' value={type}
                                        onChange={(e) => setType(e.target.value)}>
                                        <option>Choose</option>
                                        <option value={"phanTram"}>%</option>
                                        <option value={"VND"}>VND</option>
                                    </select>
                                </div>
                            </div>
                            <div className="row">
                                <div className="form-group col-sm-6 p-2">
                                    <label>Giá trị</label>
                                    <input type="text" className="form-control" name='value' value={value}
                                        onChange={(e) => setValue(e.target.value)} />
                                </div>
                                <div className="form-group col-sm-6 p-2">
                                    <label>Điều kiện sử dụng</label>
                                    <input type="text" className="form-control" name='minimumDiscount' value={minimumDiscount}
                                        onChange={(e) => setMinimumDiscount(e.target.value)} />
                                </div>
                            </div>
                            <div className="row">
                                <div className="form-group col-sm-6 p-2">
                                    <label>Giảm tối đa</label>
                                    <input type="text" className="form-control" name='maximumDiscount' value={maximumDiscount}
                                        onChange={(e) => setMaximumDiscount(e.target.value)} />
                                </div>
                                <div className="form-group col-sm-6 p-2">
                                    <label>Số lượng</label>
                                    <input type="text" className="form-control" name='quantity' value={quantity}
                                        onChange={(e) => setQuantity(e.target.value)} />
                                </div>
                            </div>
                            <div className="row">
                                <div className="form-group col-sm-6 p-2">
                                    <label>Ngày bắt đầu</label>
                                    <input type="date" className="form-control" name='startDate' value={startDate}
                                        onChange={(e) => setStartDate(e.target.value)} />
                                </div>
                                <div className="form-group col-sm-6 p-2">
                                    <label>Ngày kết thúc</label>
                                    <input type="date" className="form-control" name='endDate' value={endDate}
                                        onChange={(e) => setEndDate(e.target.value)} />
                                </div>
                            </div>
                            <div className="row">
                                <div className="form-group col-sm-12 p-2">
                                    <label>Trạng thái</label>
                                    <select className="form-control" name='deleted' value={deleted}
                                        onChange={(e) => setDeleted(e.target.value)}>
                                        <option>Choose</option>
                                        <option value={false}>Activity</option>
                                        <option value={true}>Disable</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={() => clickUpdate()}>Update</Button>
                    <Button className='btn-secondary' onClick={() => closeModal()}>Close</Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default ModalUpdate;