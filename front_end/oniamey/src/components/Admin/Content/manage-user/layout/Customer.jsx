import React, { Fragment } from "react";
import { Container, Form, Col, Button, Row } from "react-bootstrap";
import { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLock,
  faUnlock,
  faCircleInfo,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import { AiOutlineUnorderedList, AiOutlineFileSearch } from "react-icons/ai";
import Swal from "sweetalert2";

import service from "../../../../../services/CustomerService";
import "../style/Table.css";
import "../style/CustomerStyle.css";
import { Link } from "react-router-dom";

const Customer = (props) => {
  const [onSearch, setOnSearch] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [records, setRecords] = useState([]);
  const [allCustomer, setAllCustomer] = useState([]);
  const [progressPending, setProgressPending] = useState(true);

  const customStyles = {
    rows: {
      style: {
        minHeight: "72px",
      },
    },
    headCells: {
      style: {
        paddingLeft: "8px", // override the cell padding for head cells
        paddingRight: "8px",
        fontSize: "15px",
      },
    },
    cells: {
      style: {
        paddingLeft: "8px", // override the cell padding for data cells
        paddingRight: "8px",
      },
    },
  };

  const paginationComponentOptions = {
    rowsPerPageText: "Số bản ghi mỗi trang: ",
    rangeSeparatorText: "trên",
    selectAllRowsItem: true,
    selectAllRowsItemText: "Tất cả",
  };

  const changeStatusCustomer = (customerId) => {
    service.changeStatusCustomer(customerId).then((res) => {
      if (res.status === 200) {
        Swal.fire({
          title: "Thông Báo",
          text: `Khóa tài khoản ID ${customerId} Thành Công`,
          icon: "success",
          confirmButtonText: "OK",
        }).then((result) => {
          if (result.isConfirmed) {
            getAllCustomer();
          }
        });
      } else {
        Swal.fire({
          title: "Thông Báo",
          text: "Xóa Sản Phẩm Thất Bại",
          icon: "error",
          confirmButtonText: "OK",
        });
      }
    });
  };

  const showConfirmDelete = (customerId) => {
    Swal.fire({
      title: "Thông Báo",
      text: "Bạn Có Chắc Chắn Khóa Khách Hàng Này Không ?",
      icon: "warning",
      confirmButtonText: "OK",
      showCancelButton: true,
    }).then((result) => {
      if (result["isConfirmed"]) {
        changeStatusCustomer(customerId);
      }
    });
  };

  const renderNameColumns = () => {
    if (onSearch === true) {
      return "ID";
    } else {
      return "STT";
    }
  };

  const columns = [
    {
      name: renderNameColumns(),
      selector: (row) => {
        if (currentPage === 1) {
          return records.indexOf(row) + 1;
        } else if (currentPage > 1) {
          return (currentPage - 1) * 5 + records.indexOf(row) + 1;
        } else {
          return row.id;
        }
      },
      compact: true,
      maxWidth: "40px",
      minWidth: "40px",
      center: true,
    },
    {
      name: "Họ Và Tên",
      selector: (row) => row.fullName,
      sortable: true,
      center: true,
    },
    {
      name: "Email",
      selector: (row) => row.email,
      sortable: true,
      minWidth: "180px",
      maxWidth: "180px",
    },
    {
      name: "Số Điện Thoại",
      selector: (row) => row.phoneNumber,
      sortable: true,
      center: true,
    },
    {
      name: "Trạng Thái",
      selector: (row) => {
        if (row.status === "false") {
          return <span style={{ color: "red" }}>Khóa</span>;
        } else {
          return <span style={{ color: "green" }}>Kích Hoạt</span>;
        }
      },
      sortable: true,
      compact: true,
      maxWidth: "100px",
      minWidth: "100px",
      center: true,
    },

    {
      name: "Ngày Tham Gia",
      selector: (row) => row.createdAt,
      sortable: true,
      center: true,
    },
    {
      name: "Thao Tác",
      center: true,
      minWidth: "200px",
      maxWidth: "200px",
      cell: (row) => (
        <>
          <Button
            className="btn btn-dark"
            onClick={() => {
              showConfirmDelete(row.id);
            }}
            style={{ marginLeft: "10px" }}
          >
            <FontAwesomeIcon
              icon={row.status === "false" ? faLock : faUnlock}
            />
          </Button>
          <Link
            to={`/admins/manage-customers/detail-customer/${row.id}`}
            className="btn btn-dark"
            style={{ marginLeft: "10px" }}
          >
            <FontAwesomeIcon icon={faCircleInfo} />
          </Link>
        </>
      ),
    },
  ];

  const getAllCustomer = () => {
    service
      .getAllCustomerSearch()
      .then((res) => {
        setAllCustomer(res.data);
        setRecords(res.data);
        setProgressPending(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleFilter = (e) => {
    setOnSearch(true);
    const searchText = e.target.value.toLowerCase();
    const newData = allCustomer.filter((row) => {
      const customerNameMatch = row.fullName.toLowerCase().includes(searchText);
      const emailMatch = row.email.toLowerCase().includes(searchText);
      const phoneNumberMatch = row.phoneNumber.includes(searchText);
      return customerNameMatch || emailMatch || phoneNumberMatch;
    });
    setRecords(newData);
    if (searchText === "") {
      setRecords(allCustomer);
      setOnSearch(false);
      setCurrentPage(1);
    }
  };

  const handleStatus = (e) => {
    const value = e.target.value;
    const filter = allCustomer.filter((customer) => customer.status === value);
    setRecords(filter);
    if (value === "all") {
      setRecords(allCustomer);
    }
  };

  useEffect(() => {
    getAllCustomer();
  }, []);

  return (
    <Container className="manager-customer-container">
      <Container className="pb-0 filter-customer-container">
        <h3>
          <AiOutlineFileSearch className="me-2" />
          Bộ Lọc
        </h3>
        <Row>
          <Col>
            <Form.Group
              className="mb-3 flex-grow-1"
              controlId="searchFilter"
              style={{ marginLeft: "20px" }}
            >
              <Form.Label>Tìm Kiếm</Form.Label>
              <Form.Control
                type="search"
                placeholder="Tìm kiếm theo Họ Tên / Email / Số Điện Thoại"
                className="me-2"
                aria-label="Search"
                autoComplete="on"
                onChange={(e) => handleFilter(e)}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className="mb-3 ms-3" controlId="searchStatus">
              <Form.Label>Trạng Thái</Form.Label>
              <div className="d-flex">
                <Form.Check
                  inline
                  label="Tất Cả"
                  name="status"
                  type="radio"
                  defaultChecked
                  value="all"
                  onClick={(e) => handleStatus(e)}
                />
                <Form.Check
                  inline
                  label="Kích Hoạt"
                  name="status"
                  type="radio"
                  value="true"
                  onClick={(e) => handleStatus(e)}
                />
                <Form.Check
                  inline
                  label="Khóa"
                  name="status"
                  type="radio"
                  value="false"
                  onClick={(e) => handleStatus(e)}
                />
              </div>
            </Form.Group>
          </Col>
        </Row>
      </Container>
      <Container className="pb-0 list-customer-container">
        <h3>
          <AiOutlineUnorderedList className="me-2" />
          Danh Sách Khách Hàng
        </h3>
        <hr />
        <Container className="d-flex justify-content-end align-items-center">
          <Link to="/admins/manage-customers/add-customer">
            <Button className="btn btn-dark">
              <FontAwesomeIcon icon={faPlus} className="me-2" />
              Thêm Khách Hàng
            </Button>
          </Link>
        </Container>
        <Container className="table-container">
          <DataTable
            columns={columns}
            data={records}
            customStyles={customStyles}
            progressPending={progressPending}
            pagination
            paginationComponentOptions={paginationComponentOptions}
            responsive
          />
        </Container>
      </Container>
    </Container>
  );
};

export default Customer;
