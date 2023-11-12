import { React, useState, useEffect } from "react";
import "./ManageSleeveLength.scss";
import { CgDetailsLess } from "react-icons/cg";
import { FaFilter, FaThList, FaPenSquare } from "react-icons/fa";
import { MdLibraryAdd, MdDeleteSweep } from "react-icons/md";
import ModalCreateSleeveLength from "./ModalCreateSleeveLength";
import ModalUpdateSleeveLength from "./ModalUpdateSleeveLength";
import {
  deleteProperty,
  getAllProperties,
} from "../../../../../services/apiService";
import { Button, Col, Form, Row } from "react-bootstrap";
import DataTable from "react-data-table-component";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Swal from "sweetalert2";
import { toast } from "react-toastify";

const ManageSleeveLength = (props) => {
  const [showModalCreateSleeveLength, setShowModalCreateSleeveLength] =
    useState(false);
  const [showModalUpdateSleeveLength, setShowModalUpdateSleeveLength] =
    useState(false);

  const [dataUpdate, setDataUpdate] = useState({});

  const [listSleeveLength, setListSleeveLength] = useState([]);
  const [sleeveLengthId, setSleeveLengthId] = useState("");

  useEffect(() => {
    fetchListSleeveLength();
  }, []);

  const fetchListSleeveLength = async () => {
    let res = await getAllProperties("sleeve-length");
    setListSleeveLength(res.data);
    setSleeveLengthId(res.data[0].id);
    console.log(res);
  };

  const handleShowModalUpdateSleeveLength = (sleeveLength) => {
    setShowModalUpdateSleeveLength(true);
    setDataUpdate(sleeveLength);
  };

  const resetDataUpdate = () => {
    setDataUpdate({});
  };

  const handleSubmitDeleteSleeveLength = (sleeveLength) => {
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
        await deleteProperty("sleeve-length", sleeveLength.id);
        fetchListSleeveLength();
        toast.success("Xóa thành công!");
      }
    });
  };

  const columnsSleeveLength = [
    {
      name: "STT",
      selector: (row) => listSleeveLength.indexOf(row) + 1,
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
            onClick={() => handleShowModalUpdateSleeveLength(row)}
          >
            <FaPenSquare />
          </Button>
          <Button
            variant="dark"
            className="w-25"
            onClick={() => handleSubmitDeleteSleeveLength(row)}
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
    <div class="manage-sleeve-length-container">
      <div className="manage-sleeve-length-title">
        <div className="title">
          <CgDetailsLess size={32} /> Quản Lý Chiều Dài Tay
        </div>
      </div>
      <div className="manage-sleeve-length-search">
        <div className="search-sleeve-length-title">
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
      <div className="manage-sleeve-length-table">
        <div className="list-sleeve-length-title">
          <div className="title">
            <FaThList size={26} /> Danh Sách Chiều Dài Tay
          </div>
          <button
            type="button"
            class="btn btn-dark"
            onClick={() => setShowModalCreateSleeveLength(true)}
          >
            <MdLibraryAdd /> Thêm
          </button>
        </div>
        <DataTable
          rounded-3
          columns={columnsSleeveLength}
          data={listSleeveLength}
          pagination
          paginationComponentOptions={paginationComponentOptions}
          highlightOnHover
          pointerOnHover
          paginationRowsPerPageOptions={[5, 10, 15]}
          // onRowClicked={(row) => handleClickTable(row)}
        />
      </div>
      <ModalCreateSleeveLength
        show={showModalCreateSleeveLength}
        setShow={setShowModalCreateSleeveLength}
        fetchListSleeveLength={fetchListSleeveLength}
      />
      <ModalUpdateSleeveLength
        show={showModalUpdateSleeveLength}
        setShow={setShowModalUpdateSleeveLength}
        fetchListSleeveLength={fetchListSleeveLength}
        dataUpdate={dataUpdate}
        resetDataUpdate={resetDataUpdate}
      />
    </div>
  );
};

export default ManageSleeveLength;