import { React, useState, useEffect } from "react";
import { IoIosColorPalette } from "react-icons/io";
import { FaFilter, FaThList, FaPenSquare } from "react-icons/fa";
import { MdLibraryAdd, MdDeleteSweep } from "react-icons/md";
import { getAllProductDetails } from "../../../../../src/services/apiService";
import { Button, Col, Container, Form, Row, Table } from "react-bootstrap";
import DataTable from "react-data-table-component";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import {Modal} from "antd";

const ListProductDetail = (props) => {

  const {show, setShow } = props;

  const [listProductDetail, setListProductDetail] = useState([]);

  useEffect(() => {
    fetchListProductDetail();
  }, []);

  const fetchListProductDetail = async () => {
    let res = await getAllProductDetails();
    setListProductDetail(res.data);
  }

  const handleClose = () => {
    setShow(false);
  }

  const columnsProductDetail = [
    {
      name: "STT",
      selector: (row) => listProductDetail.indexOf(row) + 1,
      minWidth: "40px",
      maxWidth: "80px",
      center: "true",
    },
    {
      name: "Ảnh",
      cell: (row) => (
          <div
              className="text-center image-product-detail"
              style={{ verticalAlign: "middle", width: "100px" }}
          >
            <img
                style={{ width: "100%", padding: "5px" }}
                src={`https://upload-product-image-file.s3.us-west-2.amazonaws.com/${row.cover}`}
            />
          </div>
      ),
      center: "true",
    },
    {
      name: "Tên sản phẩm",
      selector: (row) => row.name,
      center: "true",
    },
    {
      name: "Số lượng",
      selector: (row) => row.quantity,
      center: "true",
    },
    {
      name: "Giá bán",
      selector: (row) => row.price,
      center: "true",
    },
    {
      name: "Kích cỡ",
      selector: (row) => row.size,
      center: "true",
    },
    {
      name: "Màu sắc",
      selector: (row) => row.color,
      center: "true",
    },
    {
      name: "Trạng thái",
      selector: (row) =>
          row.deleted === false ? "Hoạt động" : "Ngừng hoạt động",
      center: "true",
    }
  ];

  const paginationComponentOptions = {
    rowsPerPageText: "Số Bản Ghi Một Trang",
    rangeSeparatorText: "Trên",
    selectAllRowsItem: true,
    selectAllRowsItemText: "Tất Cả",
  };

  return <>
    <Modal
        title="Danh sách sản phẩm"
        open={show}
        onCancel={handleClose}
        width={1200}
    >
      <DataTable
          rounded-3
          columns={columnsProductDetail}
          data={listProductDetail}
          pagination
          selectableRows={true}
          paginationComponentOptions={paginationComponentOptions}
          highlightOnHover
          pointerOnHover
          paginationRowsPerPageOptions={[5, 10, 15]}
          paginationPerPage={5}
          paginationDefaultPage={1}
          // onRowClicked={(row) => handleClickTable(row)}
      />
    </Modal>
  </>;
};

export default ListProductDetail;