import { React, useState, useEffect } from "react";
import "./ManageMaterial.scss";
import { GiExplosiveMaterials } from "react-icons/gi";
import { FaFilter, FaThList, FaPenSquare } from "react-icons/fa";
import { MdLibraryAdd, MdDeleteSweep } from "react-icons/md";
import ModalCreateMaterial from "./ModalCreateMaterial";
import ModalUpdateMaterial from "./ModalUpdateMaterial";
import {
  deleteProperty,
  getAllProperties,
} from "../../../../../services/apiService";
import { Button, Col, Form, Row } from "react-bootstrap";
import DataTable from "react-data-table-component";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Swal from "sweetalert2";
import { toast } from "react-toastify";

const ManageMaterial = (props) => {
  const [showModalCreateMaterial, setShowModalCreateMaterial] = useState(false);
  const [showModalUpdateMaterial, setShowModalUpdateMaterial] = useState(false);

  const [dataUpdate, setDataUpdate] = useState({});

  const [listMaterial, setListMaterial] = useState([]);
  const [materialId, setMaterialId] = useState("");

  useEffect(() => {
    fetchListMaterial();
  }, []);

  const fetchListMaterial = async () => {
    let res = await getAllProperties("material");
    setListMaterial(res.data);
    setMaterialId(res.data[0].id);
    console.log(res);
  };

  const handleShowModalUpdateMaterial = (material) => {
    setShowModalUpdateMaterial(true);
    setDataUpdate(material);
  };

  const resetDataUpdate = () => {
    setDataUpdate({});
  };

  const handleSubmitDeleteMaterial = (material) => {
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
        await deleteProperty("material", material.id);
        fetchListMaterial();
        toast.success("Xóa thành công!");
      }
    });
  };

  const columnsMaterial = [
    {
      name: "STT",
      selector: (row) => listMaterial.indexOf(row) + 1,
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
            onClick={() => handleShowModalUpdateMaterial(row)}
          >
            <FaPenSquare />
          </Button>
          <Button
            variant="dark"
            className="w-25"
            onClick={() => handleSubmitDeleteMaterial(row)}
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
    <div class="manage-material-container">
      <div className="manage-material-title">
        <div className="title">
          <GiExplosiveMaterials size={32} /> Quản Lý Chất Liệu
        </div>
      </div>
      <div className="manage-material-search">
        <div className="search-material-title">
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
      <div className="manage-material-table">
        <div className="list-material-title">
          <div className="title">
            <FaThList size={26} /> Danh Sách Chất Liệu
          </div>
          <button
            type="button"
            class="btn btn-dark"
            onClick={() => setShowModalCreateMaterial(true)}
          >
            <MdLibraryAdd /> Thêm
          </button>
        </div>
        <DataTable
          rounded-3
          columns={columnsMaterial}
          data={listMaterial}
          pagination
          paginationComponentOptions={paginationComponentOptions}
          highlightOnHover
          pointerOnHover
          paginationRowsPerPageOptions={[5, 10, 15]}
          // onRowClicked={(row) => handleClickTable(row)}
        />
      </div>
      <ModalCreateMaterial
        show={showModalCreateMaterial}
        setShow={setShowModalCreateMaterial}
        fetchListMaterial={fetchListMaterial}
      />
      <ModalUpdateMaterial
        show={showModalUpdateMaterial}
        setShow={setShowModalUpdateMaterial}
        fetchListMaterial={fetchListMaterial}
        dataUpdate={dataUpdate}
        resetDataUpdate={resetDataUpdate}
      />
    </div>
  );
};

export default ManageMaterial;
