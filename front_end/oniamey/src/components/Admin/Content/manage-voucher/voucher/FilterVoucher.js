import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { BiSearch } from "react-icons/bi";

const FilterVoucher = (props) => {

    const { dataFilter, setDataFilter } = props;

    const handleOnChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setDataFilter({ ...dataFilter, [name]: value })
    }

    return (
        <>
            <div className="m-0 p-4">
                <div className="shadow-sm bg-white p-4 rounded">
                    <h5>Bộ Lọc</h5>
                    <div className="row m-2">
                        <div className="form-group col-sm-3">
                            <div className="input-group mt-4">
                                <span class="input-group-text"><BiSearch /></span>
                                <input type="text" className="form-control" placeholder="Tìm Mã Giảm Giá"
                                    name="code"
                                    value={dataFilter.code} onChange={(e) => handleOnChange(e)}
                                />
                            </div>
                        </div>
                        <div className="col-sm-5"></div>
                        <div className="form-group col-sm-2">
                            <label>Trạng thái</label>
                            <select className="form-control" name="status"
                                value={dataFilter.status}
                                onChange={(e) => handleOnChange(e)}
                            >
                                <option value={null}>All status</option>
                                <option value={false}>Activity</option>
                                <option value={true}>Disable</option>
                            </select>
                        </div>
                        <div className="form-group col-sm-2">
                            <label>Loại</label>
                            <select className="form-control" name="type"
                                value={dataFilter.type}
                                onChange={(e) => handleOnChange(e)}
                            >
                                <option value={""}>All type</option>
                                <option value={"phanTram"}>%</option>
                                <option value={"VND"}>VND</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default FilterVoucher;