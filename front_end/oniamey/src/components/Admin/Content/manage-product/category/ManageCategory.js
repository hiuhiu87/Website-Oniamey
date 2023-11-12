import { React, useState, useEffect } from 'react';
import './ManageCategory.scss';
import { MdCategory } from 'react-icons/md';
import { FaFilter, FaThList, FaPenSquare } from 'react-icons/fa';
import { MdLibraryAdd, MdDeleteSweep } from 'react-icons/md';
import ModalCreateCategory from './ModalCreateCategory';
import ModalUpdateCategory from './ModalUpdateCategory';
import {deleteProperty, getAllProperties} from '../../../../../services/apiService';
import { Button, Col, Form, Row, Table } from 'react-bootstrap';
import DataTable from "react-data-table-component";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Swal from "sweetalert2";
import {toast} from "react-toastify";

const ManageCategory = (props) => {

    const [showModalCreateCategory, setShowModalCreateCategory] = useState(false);
    const [showModalUpdateCategory, setShowModalUpdateCategory] = useState(false);

    const [dataUpdate, setDataUpdate] = useState({});

    const [listCategory, setListCategory] = useState([]);
    const [categoryId, setCategoryId] = useState('');

    useEffect(() => {
        fetchListCategory();
    }, []);

    const fetchListCategory = async () => {
        let res = await getAllProperties('category');
        setListCategory(res.data);
        setCategoryId(res.data[0].id)
        console.log(res);
    }

    const handleShowModalUpdateCategory = (category) => {
        setShowModalUpdateCategory(true);
        setDataUpdate(category);
    }

    const resetDataUpdate = () => {
        setDataUpdate({});
    }

    const handleSubmitDeleteCategory = (category) => {
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
                await deleteProperty("category", category.id);
                fetchListCategory();
                toast.success("Xóa thành công!");
            }
        });
    };

    const columnsCategory = [
        {
            name: "STT",
            selector: (row) => listCategory.indexOf(row) + 1,
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
                        onClick={() => handleShowModalUpdateCategory(row)}
                    >
                        <FaPenSquare />
                    </Button>
                    <Button
                        variant="dark"
                        className='w-25'
                        onClick={() => handleSubmitDeleteCategory(row)}
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
        <div class="manage-category-container">
            <div className='manage-category-title'>
                <div className="title">
                    <MdCategory size={32} /> Quản Lý Danh Mục
                </div>
            </div>
            <div className='manage-category-search'>
                <div className='search-category-title'>
                    <div className="title">
                        <FaFilter size={26} /> Bộ Lọc
                    </div>

                </div>
                <Form>
                    <Row className="mb-3 justify-content-md-center">
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
            <div className='manage-category-table'>
                <div className='list-category-title'>
                    <div className="title">
                        <FaThList size={26} /> Danh Sách Danh Mục
                    </div>
                    <button type="button" class="btn btn-dark" onClick={() => setShowModalCreateCategory(true)}>
                        <MdLibraryAdd /> Thêm</button>
                </div>
                <DataTable
                    rounded-3
                    columns={columnsCategory}
                    data={listCategory}
                    pagination
                    paginationComponentOptions={paginationComponentOptions}
                    highlightOnHover
                    pointerOnHover
                    paginationRowsPerPageOptions={[5, 10, 15]}
                // onRowClicked={(row) => handleClickTable(row)}
                />
            </div>
            <ModalCreateCategory
                show={showModalCreateCategory}
                setShow={setShowModalCreateCategory}
                fetchListCategory={fetchListCategory}
            />
            <ModalUpdateCategory
                show={showModalUpdateCategory}
                setShow={setShowModalUpdateCategory}
                fetchListCategory={fetchListCategory}
                dataUpdate={dataUpdate}
                resetDataUpdate={resetDataUpdate}
            />
        </div >
    );
}

export default ManageCategory;