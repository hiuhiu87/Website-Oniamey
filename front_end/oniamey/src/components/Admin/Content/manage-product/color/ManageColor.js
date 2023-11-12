import { React, useState, useEffect } from "react";
import "./ManageColor.scss";
import { IoIosColorPalette } from "react-icons/io";
import { FaFilter, FaThList, FaPenSquare } from "react-icons/fa";
import { MdLibraryAdd, MdDeleteSweep } from "react-icons/md";
import ModalCreateColor from "./ModalCreateColor";
import ModalUpdateColor from "./ModalUpdateColor";
import {
    deleteProperty,
    getAllProperties,
} from "../../../../../services/apiService";
import { Button, Col, Container, Form, Row, Table } from "react-bootstrap";
import DataTable from "react-data-table-component";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Swal from "sweetalert2";
import { toast } from "react-toastify";

const ManageColor = (props) => {
    const [showModalCreateColor, setShowModalCreateColor] = useState(false);
    const [showModalUpdateColor, setShowModalUpdateColor] = useState(false);

    const [dataUpdate, setDataUpdate] = useState({});

    const [listColor, setListColor] = useState([]);
    const [colorId, setColorId] = useState("");

    useEffect(() => {
        fetchListColor();
    }, []);

    const fetchListColor = async () => {
        let res = await getAllProperties("color");
        setListColor(res.data);
        setColorId(res.data[0].id);
    };

    const handleShowModalUpdateColor = (color) => {
        setShowModalUpdateColor(true);
        setDataUpdate(color);
    };

    const resetDataUpdate = () => {
        setDataUpdate({});
    };

    const handleSubmitDeleteColor = (color) => {
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
                await deleteProperty("color", color.id);
                fetchListColor();
                toast.success("Xóa thành công!");
            }
        });
    };

    const columnsColor = [
        {
            name: "STT",
            selector: (row) => listColor.indexOf(row) + 1,
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
                        className="w-25 me-2"
                        onClick={() => handleShowModalUpdateColor(row)}
                    >
                        <FaPenSquare />
                    </Button>
                    <Button
                        variant="dark"
                        className="w-25"
                        onClick={() => handleSubmitDeleteColor(row)}
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
        <div class="manage-color-container">
            <div className="manage-color-title">
                <div className="title">
                    <IoIosColorPalette size={32} /> Quản Lý Màu Sắc
                </div>
            </div>
            <div className="manage-color-search">
                <div className="search-color-title">
                    <div className="title">
                        <FaFilter size={26} /> Bộ Lọc
                    </div>
                </div>
                <Form>
                    <Row className="justify-content-md-center">
                        <Col lg="4">
                            <FloatingLabel controlId="floatingInput" label="Tìm kiếm">
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
            <div className="manage-color-table">
                <div className="list-color-title">
                    <div className="title">
                        <FaThList size={26} /> Danh Sách Màu Sắc
                    </div>
                    <button
                        type="button"
                        class="btn btn-dark"
                        onClick={() => setShowModalCreateColor(true)}
                    >
                        <MdLibraryAdd /> Thêm
                    </button>
                </div>
                <DataTable
                    rounded-3
                    columns={columnsColor}
                    data={listColor}
                    pagination
                    paginationComponentOptions={paginationComponentOptions}
                    highlightOnHover
                    pointerOnHover
                    paginationRowsPerPageOptions={[5, 10, 15]}
                    // onRowClicked={(row) => handleClickTable(row)}
                />
            </div>
            <ModalCreateColor
                show={showModalCreateColor}
                setShow={setShowModalCreateColor}
                fetchListColor={fetchListColor}
            />
            <ModalUpdateColor
                show={showModalUpdateColor}
                setShow={setShowModalUpdateColor}
                fetchListColor={fetchListColor}
                dataUpdate={dataUpdate}
                resetDataUpdate={resetDataUpdate}
            />
        </div>
    );
};

export default ManageColor;