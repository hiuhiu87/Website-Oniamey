import { React, useState, useEffect } from 'react';
import './ManageSize.scss';
import { SiZend } from 'react-icons/si';
import { FaFilter, FaThList, FaPenSquare } from 'react-icons/fa';
import { MdLibraryAdd, MdDeleteSweep } from 'react-icons/md';
import ModalCreateSize from './ModalCreateSize';
import ModalUpdateSize from './ModalUpdateSize';
import {deleteProperty, getAllProperties} from '../../../../../services/apiService';
import { Button, Col, Form, Row } from 'react-bootstrap';
import DataTable from "react-data-table-component";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Swal from "sweetalert2";
import {toast} from "react-toastify";

const ManageSize = (props) => {

    const [showModalCreateSize, setShowModalCreateSize] = useState(false);
    const [showModalUpdateSize, setShowModalUpdateSize] = useState(false);

    const [dataUpdate, setDataUpdate] = useState({});

    const [listSize, setListSize] = useState([]);
    const [sizeId, setSizeId] = useState('');

    useEffect(() => {
        fetchListSize();
    }, []);

    const fetchListSize = async () => {
        let res = await getAllProperties('size');
        setListSize(res.data);
        setSizeId(res.data[0].id)
        console.log(res);
    }

    const handleShowModalUpdateSize = (size) => {
        setShowModalUpdateSize(true);
        setDataUpdate(size);
    }

    const resetDataUpdate = () => {
        setDataUpdate({});
    }

    const handleSubmitDeleteSize = (size) => {
        Swal.fire({
            title: "Thông báo",
            text: "Xác nhận xóa!",
            icon: "infor",
            showCancelButton: true,
            confirmButtonColor: "#000",
            cancelButtonColor: "#000",
            confirmButtonText: "Đồng ý",
            cancelButtonText: "Hủy",
        }).then(async (result) => {
            if (result.isConfirmed) {
                await deleteProperty("size", size.id);
                fetchListSize();
                toast.success("Xóa thành công!");
            }
        });
    };

    const columnsSize = [
        {
            name: "STT",
            selector: (row) => listSize.indexOf(row) + 1,
            minWidth: "40px",
            maxWidth: "80px",
            center: "true",
        },
        {
            name: "Tên",
            selector: (row) => row.name,
            center: "true",
        },
        {
            name: "Ngày cập nhật",
            selector: (row) => row.updatedAt,
            center: "true",
        },
        {
            name: "Trạng thái",
            selector: (row) => {
                const status = row.deleted === false ? "Hoạt động" : "Ngừng hoạt động";
                const color = row.deleted === false ? "green" : "red";

                return <span style={{ color }}>{status}</span>;
            },
            center: "true",
        },
        {
            name: "Hành động",
            cell: (row) => (
                <>
                    <Button
                        variant="dark"
                        className='w-25 me-2'
                        onClick={() => handleShowModalUpdateSize(row)}
                    >
                        <FaPenSquare />
                    </Button>
                    <Button
                        variant="dark"
                        className='w-25'
                        onClick={() => handleSubmitDeleteSize(row)}
                    >
                        <MdDeleteSweep />
                    </Button>
                </>
            ),
            center: "true",
        },
    ];

    const paginationComponentOptions = {
        rowsPerPageText: "Số Bản Ghi Một Trang",
        rangeSeparatorText: "Trên",
        selectAllRowsItem: true,
        selectAllRowsItemText: "Tất Cả",
    };

    return (
        <div class="manage-size-container">
            <div className='manage-size-title'>
                <div className="title">
                    <SiZend size={32} /> Quản Lý Kích Cỡ
                </div>
            </div>
            <div className='manage-size-search'>
                <div className='search-size-title'>
                    <div className="title">
                        <FaFilter size={26} /> Bộ Lọc
                    </div>

                </div>
                <Form>
                    <Row className="justify-content-md-center">
                        <Col lg="4">
                            <FloatingLabel
                                controlId="floatingInput"
                                label="Tìm kiếm"
                            >
                                <Form.Control type="text" placeholder="name@example.com" />
                            </FloatingLabel>
                        </Col>
                        <Col lg="2">
                            <FloatingLabel controlId="floatingSelect" label="Trạng thái">
                                <Form.Select>
                                    <option>Tất cả</option>
                                    <option value={false}>Hoạt động</option>
                                    <option value={true}>Ngừng hoạt động</option>
                                </Form.Select>
                            </FloatingLabel>
                        </Col>
                    </Row>
                </Form>
            </div>
            <div className='manage-size-table'>
                <div className='list-size-title'>
                    <div className="title">
                        <FaThList size={26} /> Danh Sách Kích Cỡ
                    </div>
                    <button type="button" class="btn btn-dark" onClick={() => setShowModalCreateSize(true)}>
                        <MdLibraryAdd /> Thêm</button>
                </div>
                <DataTable
                    rounded-3
                    columns={columnsSize}
                    data={listSize}
                    pagination
                    paginationComponentOptions={paginationComponentOptions}
                    highlightOnHover
                    pointerOnHover
                    paginationRowsPerPageOptions={[5, 10, 15]}
                    // onRowClicked={(row) => handleClickTable(row)}
                />
            </div>
            <ModalCreateSize
                show={showModalCreateSize}
                setShow={setShowModalCreateSize}
                fetchListSize={fetchListSize}
            />
            <ModalUpdateSize
                show={showModalUpdateSize}
                setShow={setShowModalUpdateSize}
                fetchListSize={fetchListSize}
                dataUpdate={dataUpdate}
                resetDataUpdate={resetDataUpdate}
            />
        </div >
    );
}

export default ManageSize;