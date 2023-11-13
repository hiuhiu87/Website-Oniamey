import { React, useState, useEffect } from "react";
import "./ManageCollar.scss";
import { GiHeavyCollar } from "react-icons/gi";
import { FaFilter, FaThList, FaPenSquare } from "react-icons/fa";
import { MdLibraryAdd, MdDeleteSweep } from "react-icons/md";
import ModalCreateCollar from "./ModalCreateCollar";
import ModalUpdateCollar from "./ModalUpdateCollar";
import {
    deleteProperty,
    getAllProperties,
} from "../../../../../services/apiService";
import { Button, Col, Form, Row } from "react-bootstrap";
import DataTable from "react-data-table-component";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Swal from "sweetalert2";
import { toast } from "react-toastify";

const ManageCollar = (props) => {
    const [showModalCreateCollar, setShowModalCreateCollar] = useState(false);
    const [showModalUpdateCollar, setShowModalUpdateCollar] = useState(false);

    const [dataUpdate, setDataUpdate] = useState({});

    const [listCollar, setListCollar] = useState([]);

    useEffect(() => {
        fetchListCollar();
    }, []);

    const fetchListCollar = async () => {
        let res = await getAllProperties("collar");
        setListCollar(res.data);
    };

    const handleShowModalUpdateCollar = (collar) => {
        setShowModalUpdateCollar(true);
        setDataUpdate(collar);
    };

    const resetDataUpdate = () => {
        setDataUpdate({});
    };

    const handleSubmitDeleteCollar = (collar) => {
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
                await deleteProperty("collar", collar.id);
                fetchListCollar();
                toast.success("Xóa thành công!");
            }
        });
    };

    const columnsCollar = [
        {
            name: "STT",
            selector: (row) => listCollar.indexOf(row) + 1,
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
                        onClick={() => handleShowModalUpdateCollar(row)}
                    >
                        <FaPenSquare />
                    </Button>
                    <Button
                        variant="dark"
                        className="w-25"
                        onClick={() => handleSubmitDeleteCollar(row)}
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
        <div class="manage-collar-container">
            <div className="manage-collar-title">
                <div className="title">
                    <GiHeavyCollar size={32} /> Quản Lý Cổ Áo
                </div>
            </div>
            <div className="manage-collar-search">
                <div className="search-collar-title">
                    <div className="title">
                        <FaFilter size={26} /> Bộ Lọc
                    </div>
                </div>
                <Form>
                    <Row className="mb-3 justify-content-md-center">
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
            <div className="manage-collar-table">
                <div className="list-collar-title">
                    <div className="title">
                        <FaThList size={26} /> Danh Sách Cổ Áo
                    </div>
                    <button
                        type="button"
                        class="btn btn-dark"
                        onClick={() => setShowModalCreateCollar(true)}
                    >
                        <MdLibraryAdd /> Thêm
                    </button>
                </div>
                <DataTable
                    rounded-3
                    columns={columnsCollar}
                    data={listCollar}
                    pagination
                    paginationComponentOptions={paginationComponentOptions}
                    highlightOnHover
                    pointerOnHover
                    paginationRowsPerPageOptions={[5, 10, 15]}
                    // onRowClicked={(row) => handleClickTable(row)}
                />
            </div>
            <ModalCreateCollar
                show={showModalCreateCollar}
                setShow={setShowModalCreateCollar}
                fetchListCollar={fetchListCollar}
            />
            <ModalUpdateCollar
                show={showModalUpdateCollar}
                setShow={setShowModalUpdateCollar}
                fetchListCollar={fetchListCollar}
                dataUpdate={dataUpdate}
                resetDataUpdate={resetDataUpdate}
            />
        </div>
    );
};

export default ManageCollar;