import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import isNumberic from "validator/lib/isNumeric";
import { toast } from "react-toastify";
import { checkLength, checkInteger } from "./Validator";
import { createVoucher } from "../../../../../services/VocherService";


const CreateVoucher = () => {

    const [dataCreate, setDataCreate] = useState({})
    const [messError, setMessError] = useState({})

    const validateForm = () => {
        const mess = {};

        if (!dataCreate.voucherCode) {
            mess.voucherCode = "Mã không được để trống"
        } else {
            mess.voucherCode = checkLength("Mã", dataCreate.voucherCode, 5)
            if (mess.voucherCode == undefined) {
                delete mess.voucherCode
            }
        }

        if (!dataCreate.voucherName) {
            mess.voucherName = "Tên không được để trống"
        } else {
            mess.voucherName = checkLength("Tên", dataCreate.voucherName, 5)
            if (mess.voucherName == undefined) {
                delete mess.voucherName
            }
        }

        if (!dataCreate.type) {
            mess.type = "Loại không được để trống"
        }

        if (!dataCreate.value) {
            mess.value = "Giá trị không được để trống"
        } else if (!isNumberic(dataCreate.value)) {
            mess.value = "Giá trị là một số"
        }
        if (dataCreate.type === "phanTram" && dataCreate.value > 100) {
            mess.value = "Giá trị không được lớn hơn 100"
        }

        if (!dataCreate.minimumDiscount) {
            mess.minimumDiscount = "Giá trị tối thiểu không được để trống"
        } else if (!isNumberic(dataCreate.value)) {
            mess.minimumDiscount = "Giá trị tối thiểu là một số"
        }

        if (!dataCreate.maximumDiscount) {
            mess.maximumDiscount = "Giá trị tối đa không được để trống"
        } else if (!isNumberic(dataCreate.maximumDiscount)) {
            mess.maximumDiscount = "Giá trị tối đa là một số"
        }

        if (!dataCreate.quantity) {
            mess.quantity = "Số lượng không được để trống"
        } else if (dataCreate.quantity < 0) {
            mess.quantity = "Số lượng không được âm"
        } else {
            mess.quantity = checkInteger("Số lượng", dataCreate.quantity)
            if (mess.quantity == undefined) {
                delete mess.quantity
            }
        }

        if (!dataCreate.startDate) {
            mess.startDate = "Ngày bắt đầu không được để trống"
        }

        if (!dataCreate.endDate) {
            mess.endDate = "Ngày kết thúc được để trống"
        }

        setMessError(mess)
        if (Object.keys(mess).length > 0) return false;
        return true;
    }

    const handleOnChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setDataCreate({ ...dataCreate, [name]: value })
    }

    const handleAddVoucher = async () => {
        if (!validateForm()) {
            return;
        }
        let res = await createVoucher(dataCreate)
        const result = res.data;
        toast.success(result)
    }

    return (
        <>
            <div className='p-5 m-5 col-sm-8'>
                <h2 className="pb-2">Tạo Phiếu Giảm Giá</h2>
                <div className="row">
                    <div className="form-group col-sm-12 p-2">
                        <label>Mã giảm giá</label>
                        <input type="text" className="form-control" name='voucherCode' value={dataCreate.voucherCode}
                            onChange={(e) => handleOnChange(e)} />
                        <span className="text-danger">{messError.voucherCode}</span>
                    </div>
                </div>
                <div className="row">
                    <div className="form-group col-sm-6 p-2">
                        <label>Tên</label>
                        <input type="text" className="form-control" name='voucherName' value={dataCreate.voucherName}
                            onChange={(e) => handleOnChange(e)} />
                        <span className="text-danger">{messError.voucherName}</span>
                    </div>
                    <div className="form-group col-sm-6 p-2">
                        <label>Loại</label>
                        <select className="form-control" name='type' value={dataCreate.type}
                            onChange={(e) => handleOnChange(e)}>
                            <option value={""}>Choose</option>
                            <option value={"phanTram"}>%</option>
                            <option value={"VND"}>VND</option>
                        </select>
                        <span className="text-danger">{messError.type}</span>
                    </div>
                </div>
                <div className="row">
                    <div className="form-group col-sm-6 p-2">
                        <label>Giá trị</label>
                        <input type="text" className="form-control" name='value' value={dataCreate.value}
                            onChange={(e) => handleOnChange(e)} />
                        <span className="text-danger">{messError.value}</span>
                    </div>
                    <div className="form-group col-sm-6 p-2">
                        <label>Điều kiện sử dụng</label>
                        <input type="text" className="form-control" name='minimumDiscount'
                            value={dataCreate.minimumDiscount}
                            onChange={(e) => handleOnChange(e)} />
                        <span className="text-danger">{messError.minimumDiscount}</span>
                    </div>
                </div>
                <div className="row">
                    <div className="form-group col-sm-6 p-2">
                        <label>Giảm tối đa</label>
                        <input type="text" className="form-control" name='maximumDiscount'
                            value={dataCreate.maximumDiscount}
                            onChange={(e) => handleOnChange(e)} />
                        <span className="text-danger">{messError.maximumDiscount}</span>
                    </div>
                    <div className="form-group col-sm-6 p-2">
                        <label>Số lượng</label>
                        <input type="text" className="form-control" name='quantity'
                            value={dataCreate.quantity}
                            onChange={(e) => handleOnChange(e)} />
                        <span className="text-danger">{messError.quantity}</span>
                    </div>
                </div>
                <div className="row">
                    <div className="form-group col-sm-6 p-2">
                        <label>Ngày bắt đầu</label>
                        <input type="date" className="form-control" name='startDate' value={dataCreate.startDate}
                            onChange={(e) => handleOnChange(e)} />
                        <span className="text-danger">{messError.startDate}</span>
                    </div>
                    <div className="form-group col-sm-6 p-2">
                        <label>Ngày kết thúc</label>
                        <input type="date" className="form-control" name='endDate' value={dataCreate.endDate}
                            onChange={(e) => handleOnChange(e)} />
                        <span className="text-danger">{messError.endDate}</span>
                    </div>
                    <span className="text-danger" id="erorr"></span>
                </div>
                <div className="row justify-content-end">
                    <div className="form-group col-sm-2 p-2">
                        <button className="btn btn-success form-control mt-3"
                            onClick={() => handleAddVoucher()}>Thêm
                        </button>
                    </div>
                    <div className="form-group col-sm-2 p-2">
                        <Link to="/admins/manage-vouchers">
                            <button className="btn btn-secondary form-control mt-3">Trở Về</button>
                        </Link>
                    </div>
                </div>
            </div>

        </>
    )
}

export default CreateVoucher;