import { React, useState, useEffect } from "react";
import "./ManageBrand.scss";
import { SiBrandfolder } from "react-icons/si";
import { FaFilter, FaThList, FaPenSquare } from "react-icons/fa";
import { MdLibraryAdd, MdDeleteSweep } from "react-icons/md";
import ModalCreateBrand from "./ModalCreateBrand";
import ModalUpdateBrand from "./ModalUpdateBrand";
import { deleteProperty } from "../../../../../services/apiService";
import { getAllProperties } from "../../../../../services/apiService";
import { Button, Col, Form, Row } from "react-bootstrap";
import DataTable from "react-data-table-component";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import QrReader from "react-qr-scanner";
import {Modal} from "antd";
import FormatString from "../../../../../utils/FormatString";

const ManageBrand = (props) => {
    const [showModalCreateBrand, setShowModalCreateBrand] = useState(false);
    const [showModalUpdateBrand, setShowModalUpdateBrand] = useState(false);

    const [dataUpdate, setDataUpdate] = useState({});

    const [listBrand, setListBrand] = useState([]);
    const [brandId, setBrandId] = useState("");

    const [record, setRecord] = useState([]);

    const [open, setOpen] = useState(false);
    const delay = 100;

    const handleCancelScan = () => {
        stopStreamedVideo(document.querySelector("video"));
        setOpen(false);
    };

    const handleScan = (data) => {
        if(data) {
            console.log(data.text)
            stopStreamedVideo(document.querySelector("video"));
            setOpen(false);
        }

    };

    const stopStreamedVideo = (videoElem) => {
        const stream = videoElem.srcObject;
        const tracks = stream.getTracks();

        tracks.forEach((track) => {
            track.stop();
        });

        videoElem.srcObject = null;
    };

    const handleError = (err) => {
        console.error(err);
    };

    useEffect(() => {
        fetchListBrand();
    }, []);

    const fetchListBrand = async () => {
        let res = await getAllProperties("brand");
        setListBrand(res.data);
        setRecord(res.data);
    };

    const handleFilterName = (e) => {
        const value = e.target.value;
        const filter = listBrand.filter((brand) => brand.name.toLowerCase().includes(value.toLowerCase()));
        setRecord(filter);
    }

    const handleFilterStatus = (e) => {
        const value = e.target.value;
        const filter = listBrand.filter((brand) => brand.deleted.toString() === value.toString());
        setRecord(filter);
        if(value === 'all') {
            setRecord(listBrand)
        }
    }

    const handleShowModalUpdateBrand = (brand) => {
        setShowModalUpdateBrand(true);
        setDataUpdate(brand);
    };

    const resetDataUpdate = () => {
        setDataUpdate({});
    };

    const handleSubmitDeleteBrand = (brand) => {
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
                await deleteProperty("brand", brand.id);
                fetchListBrand();
                toast.success("Xóa thành công!");
            }
        });
    };

    const columnsBrand = [
        {
            name: "STT",
            selector: (row) => listBrand.indexOf(row) + 1,
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
                        onClick={() => handleShowModalUpdateBrand(row)}
                    >
                        <FaPenSquare />
                    </Button>
                    <Button
                        variant="dark"
                        className="w-25"
                        onClick={() => handleSubmitDeleteBrand(row)}
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
        <div className="manage-brand-container">
            <div className="manage-brand-title">
                <div className="title">
                    <SiBrandfolder size={32} /> Quản Lý Thương Hiệu
                </div>
            </div>
            <div className="manage-brand-search">
                <div className="search-brand-title">
                    <div className="title">
                        <FaFilter size={26} /> Bộ Lọc
                    </div>
                </div>
                <Form>
                    <Row className="mb-3 justify-content-md-center">
                        <Col lg="4">
                            <FloatingLabel controlId="floatingInput" label="Tìm kiếm">
                                <Form.Control type="text" placeholder="name@example.com" onChange={(e) => handleFilterName(e)}/>
                            </FloatingLabel>
                        </Col>
                        <Col lg="2">
                            <FloatingLabel controlId="floatingSelect" label="Trạng thái">
                                <Form.Select onChange={(e) => handleFilterStatus(e)}>
                                    <option value={"all"}>Tất cả</option>
                                    <option value={false}>Hoạt động</option>
                                    <option value={true}>Ngừng hoạt động</option>
                                </Form.Select>
                            </FloatingLabel>
                        </Col>
                    </Row>
                </Form>
            </div>
            <div className="manage-brand-table">
                <div className="list-brand-title">
                    <div className="title">
                        <FaThList size={26} /> Danh Sách Thương Hiệu
                    </div>
                    <Button
                        type="button"
                        variant="dark"
                        onClick={() => setShowModalCreateBrand(true)}
                    >
                        <MdLibraryAdd /> Thêm
                    </Button>
                    <Button
                        type="button"
                        variant="dark"
                        onClick={() => setOpen(true)}
                    >
                        <MdLibraryAdd /> Scan QR
                    </Button>
                </div>
                <DataTable
                    rounded-3
                    columns={columnsBrand}
                    data={record}
                    pagination
                    paginationComponentOptions={paginationComponentOptions}
                    highlightOnHover
                    pointerOnHover
                    paginationRowsPerPageOptions={[5, 10, 15]}
                    paginationPerPage={5}
                    paginationDefaultPage={1}
                    // onRowClicked={(row) => handleClickTable(row)}
                />
            </div>
            <ModalCreateBrand
                show={showModalCreateBrand}
                setShow={setShowModalCreateBrand}
                fetchListBrand={fetchListBrand}
            />
            <ModalUpdateBrand
                show={showModalUpdateBrand}
                setShow={setShowModalUpdateBrand}
                fetchListBrand={fetchListBrand}
                dataUpdate={dataUpdate}
                resetDataUpdate={resetDataUpdate}
            />
            <Modal
                title="Quét Mã QR"
                open={open}
                onCancel={handleCancelScan}
                onOk={handleCancelScan}
            >
                <div className="qrcode-container">
                    {open ? (
                        <QrReader delay={delay} onError={handleError} onScan={handleScan} />
                    ) : null}
                </div>
            </Modal>
        </div>
    );
};

export default ManageBrand;