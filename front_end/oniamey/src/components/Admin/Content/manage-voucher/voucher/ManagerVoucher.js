import React from "react";
import { BiNoEntry } from "react-icons/bi";
import { GrEdit } from "react-icons/gr";
import { ToastContainer, toast } from 'react-toastify';
import FilterVoucher from "./FilterVoucher";
import TableVoucher from "./TableVoucher";
import { useState, useEffect } from "react";
import { deleteVoucher, getAllVouchers, getSearch, getSearchByCode, updateVoucher } from "../../../../../services/VocherService";
import ModalDelete from "./ModalDelete";
import ModalUpdate from "./ModalUpdate";


const ManagerVoucher = () => {

    const [listVoucher, setListVoucher] = useState([]);
    const [showModalDelete, setShowModalDelete] = useState(false);
    const [showModalUpdate, setShowModalUpdate] = useState(false);

    const [dataUpdate, setDataUpdate] = useState({});
    const [dataDelete, setDataDelete] = useState(0);
    const [dataFilter, setDataFilter] = useState({
        code: '',
        status: '',
        type: ''
    });

    // getAll
    const fetchVoucher = async () => {
        let res = await getAllVouchers();
        setListVoucher(res.data)
    }

    // disable
    const handleDisable = async (id) => {
        let res = await deleteVoucher(id)
        const result = res.data;
        toast.success(result)
        fetchVoucher()
        setShowModalDelete(false)
    }

    // Update
    const handleUpdate = async (voucher) => {
        try {
            const updateService = await updateVoucher(voucher.id, voucher);
            let result = updateService.data;
            if (updateService.status === 200) {
                toast.success(result)
            }
        } catch (error) {
            toast.error("Update thất bại")
        }
        fetchVoucher()
        setShowModalUpdate(false)
    }

    // Lọc
    const handleFilter = () => {
        const code = dataFilter.code;
        const type = dataFilter.type;
        const status = dataFilter.status;
        if (dataFilter.status === 'true' || dataFilter.status === 'false') {
            searchAll(code, type, status)
        } else {
            searchByCode(code, type)
        }
    }

    // SEARCH
    // TH1
    const searchByCode = async (code, type) => {
        let res = await getSearchByCode(code, type)
        setListVoucher(res.data)
    }

    // TH2
    const searchAll = async (code, type, status) => {
        let res = await getSearch(code, type, status)
        setListVoucher(res.data)
    }

    useEffect(() => {
        fetchVoucher()
    }, [])

    useEffect(() => {
        handleFilter()
    }, [dataFilter])

    // Dữ liệu table
    const clickBtnUpdate = (voucher) => {
        setShowModalUpdate(true)
        setDataUpdate(voucher)
    }

    const clickBtnDisable = (idVoucher) => {
        console.log(idVoucher);
        setShowModalDelete(true)
        setDataDelete(idVoucher)
    }

    const paginationComponentOptions = {
        rowsPerPageText: 'Số lượng bản ghi',
        rangeSeparatorText: '/',
        selectAllRowsItem: true,
        selectAllRowsItemText: 'Tất cả',
    };

    const columns = [
        {
            name: "STT",
            selector: row => listVoucher.indexOf(row) + 1,
            minWidth: "40px",
            maxWidth: "80px",
            center: "true",
        },
        {
            name: "Mã",
            selector: row => row.voucherCode,
            center: "true",
        },
        {
            name: "Giá trị",
            selector: row => {
                if (row.type === "phanTram") {
                    return <span className="d-inline-block rounded d-flex justify-content-center p-1"
                        style={{ width: "50px", backgroundColor: "blue", color: "white" }}>{row.value + "%"}</span>
                } else {
                    return <span className="text-warning">{row.value + "VND"}</span>
                }
            },
            center: "true",
        },
        {
            name: "Giá trị tối đa",
            selector: row => row.maximumDiscount,
            center: "true",
        },
        {
            name: "Giá trị tối thiểu",
            selector: row => row.minimumDiscount,
            center: "true",
        },
        {
            name: "Số lượng",
            selector: row => row.quantity,
            center: "true",
        },
        {
            name: "Thời gian",
            selector: row => {
                return <span>{row.startDate} / {row.endDate}</span>
            },
            center: "true",
            minWidth: "200px",
        },
        {
            name: "Trạng thái",
            selector: row => {
                if (row.deleted) {
                    return <span className="text-danger">Ngừng hoạt động</span>
                } else {
                    return <span className="text-success">Hoạt động</span>
                }
            },
            center: "true",
        },
        {
            name: "Hành động",
            cell: row =>
                <>
                    <span className="p-1"><GrEdit onClick={() => clickBtnUpdate(row)} /></span>
                    <span className="p-1"><BiNoEntry onClick={() => clickBtnDisable(row.id)} /></span>
                </>
            ,
            center: "true",
        },
    ]


    return (
        <>
            <FilterVoucher
                dataFilter={dataFilter}
                setDataFilter={setDataFilter}
            />
            <TableVoucher
                listVoucher={listVoucher}
                // setShowModalDelete={setShowModalDelete}
                // setDataDelete={setDataDelete}
                // setShowModalUpdate={setShowModalUpdate}
                // setDataUpdate={setDataUpdate}

                columns={columns}
                paginationComponentOptions={paginationComponentOptions}
            />
            <ModalDelete
                showModalDelete={showModalDelete}
                setShowModalDelete={setShowModalDelete}
                handleDisable={handleDisable}
                dataDelete={dataDelete}
            />
            <ModalUpdate
                showModalUpdate={showModalUpdate}
                setShowModalUpdate={setShowModalUpdate}
                handleUpdate={handleUpdate}
                dataUpdate={dataUpdate}
            />
        </>
    )
}

export default ManagerVoucher;