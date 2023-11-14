import React from "react";
import { Row } from "react-bootstrap";
import DataTable from "react-data-table-component";
import { BiNoEntry } from "react-icons/bi";
import { GrEdit } from "react-icons/gr";
import { Link } from "react-router-dom";

const TableVoucher = (props) => {

    const { listVoucher, setShowModalDelete, setDataDelete, setShowModalUpdate, setDataUpdate, columns, paginationComponentOptions } = props

    const clickBtnUpdate = (voucher) => {
        setDataUpdate(voucher)
        setShowModalUpdate(true)
    }

    const clickBtnDisable = (id) => {
        setDataDelete(id)
        setShowModalDelete(true)
    }

    return (
        <>
            <div className="m-0 p-4">
                <div className="shadow-sm bg-white p-4 rounded">
                    <h5>Danh Sách</h5>
                    {/* <Row className="justify-content-end">
                        <div className="col-sm-2 form-group">
                            <Link to="/admins/create-vouchers"><button className="btn btn-success form-control">Tạo Phiếu Giảm Giá</button></Link>
                        </div>
                    </Row>
                    <table className="table m-3">
                        <thead>
                            <tr>
                                <th className="col-sm-1">STT</th>
                                <th className="col-sm-1">Mã</th>
                                <th className="col-sm-1">Giá Trị</th>
                                <th className="col-sm-1">Giá Trị tối Đa</th>
                                <th className="col-sm-1">Cho Đơn Tối Thiểu</th>
                                <th className="col-sm-1">Số Lượng</th>
                                <th className="col-sm-1">Ngày Bắt Đầu</th>
                                <th className="col-sm-1">Ngày Kết Thúc</th>
                                <th className="col-sm-1">Trạng Thái</th>
                                <th className="col-sm-1">Hành Động</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                listVoucher && listVoucher.length > 0 && listVoucher.map((voucher, index) => {
                                    return (
                                        <tr key={voucher.id} className="justify-content-center">
                                            <td>{index + 1}</td>
                                            <td>{voucher.voucherCode}</td>
                                            {voucher.type === "phanTram" ? <td><p className="text-white bg-primary d-flex justify-content-center rounded">{voucher.value}</p></td> :
                                                <td><p className="text-white bg-warning d-flex justify-content-center rounded">{voucher.value}</p></td>}
                                            <td>{voucher.maximumDiscount}</td>
                                            <td>{voucher.minimumDiscount}</td>
                                            <td>{voucher.quantity}</td>
                                            <td>{voucher.startDate}</td>
                                            <td>{voucher.endDate}</td>
                                            {voucher.deleted ? <td className="text-danger">Disable</td> : <td className="text-primary">Activity</td>}
                                            <td>
                                                <td>
                                                    <GrEdit style={{ cursor: "pointer", marginRight: "4px" }}
                                                        onClick={() => clickBtnUpdate(voucher)}
                                                    />
                                                </td>
                                                <td>

                                                    {voucher.deleted ? <BiNoEntry className="disable" style={{ cursor: "pointer", marginRight: "4px" }} /> :
                                                        <BiNoEntry style={{ cursor: "pointer", marginLeft: "4px" }}
                                                            onClick={() => clickBtnDisable(voucher.id)}
                                                        />}
                                                </td>
                                            </td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                    <div className="d-flex justify-content-center">
                        <button className="btn m-1">1</button>
                        <button className="btn m-1">2</button>
                        <button className="btn m-1">3</button>
                    </div> */}

                    <DataTable
                        // title="Danh sách"
                        columns={columns}
                        data={listVoucher}
                        pagination
                        paginationComponentOptions={paginationComponentOptions}
                        highlightOnHover
                        pointerOnHover
                    />
                </div>
            </div>
        </>
    )
}

export default TableVoucher;