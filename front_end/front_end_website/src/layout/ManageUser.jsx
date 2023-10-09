import React, { Fragment, useEffect, useState } from "react";
import { Container, Row, Col, Form, Button, Pagination } from "react-bootstrap";
import DataTable from "react-data-table-component";
import service from "../services/CustomerService";
import AddCustomerModal from "../components/AddCustomerModal";
import Swal from "sweetalert2";

import {
  faPencilSquare,
  faLock,
  faUnlock,
} from "@fortawesome/free-solid-svg-icons";
import "../assets/style/Datatable.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const ManageUser = () => {
  const [customer, setCustomer] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [idCustomer, setIdCustomer] = useState();
  const [totalPage, setTotalPage] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [records, setRecords] = useState([]);
  const [allCustomer, setAllCustomer] = useState([]);

  const openModal = async (idCustomer) => {
    if (idCustomer) {
      setIdCustomer(idCustomer);
      setIsModalOpen(true);
    } else {
      setIdCustomer(0);
      setIsModalOpen(true);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    getCustomers(currentPage);
  };

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

  const changeStatusCustomer = (customerId) => {
    service.changeStatusCustomer(customerId).then((res) => {
      if (res.status === 200) {
        Swal.fire({
          title: "Thông Báo",
          text: "Xóa Sản Phẩm Thành Công",
          icon: "success",
          confirmButtonText: "OK",
        }).then((result) => {
          if (result.isConfirmed) {
            getCustomers(currentPage);
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

  const getTotalPages = () => {
    service
      .getTotalPages()
      .then((response) => {
        setTotalPage(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const renderButtonPage = () => {
    return (
      <Fragment>
        {Array(totalPage)
          .fill(null)
          .map((_, i) => (
            <Pagination.Item
              key={i}
              active={i + 1 === currentPage}
              onClick={() => {
                setCurrentPage(i + 1);
              }}
              style={{ cursor: "pointer" }}
            >
              {i + 1}
            </Pagination.Item>
          ))}
      </Fragment>
    );
  };

  const renderNameColumns = () => {
    if (currentPage === 0) {
      return "ID";
    } else {
      return "No.";
    }
  };

  const columns = [
    {
      name: renderNameColumns(),
      selector: (row) => {
        if (currentPage === 1) {
          return customer.indexOf(row) + 1;
        } else if (currentPage > 1) {
          return (currentPage - 1) * 5 + customer.indexOf(row) + 1;
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
      name: "Full Name",
      selector: (row) => row.fullName,
      sortable: true,
      center: true,
    },
    {
      name: "Gender",
      selector: (row) => {
        if (row.gender === 1) {
          return "Nam";
        } else if (row.gender === 2) {
          return "Nữ";
        } else {
          return "Khác";
        }
      },
      sortable: true,
      maxWidth: "100px",
      minWidth: "100px",
      center: true,
    },
    {
      name: "Birth Date",
      selector: (row) => {
        if (row.birthDate) {
          return row.birthDate;
        } else {
          return "N/A";
        }
      },
      sortable: true,
      center: true,
    },
    {
      name: "Email",
      selector: (row) => row.email,
      sortable: true,
      center: true,
    },
    {
      name: "Status",
      selector: (row) => {
        if (row.status === "false") {
          return "Inactive";
        } else {
          return "Active";
        }
      },
      sortable: true,
      compact: true,
      maxWidth: "80px",
      minWidth: "80px",
      center: true,
    },
    {
      name: "Phone Number",
      selector: (row) => row.phoneNumber,
      sortable: true,
      center: true,
    },
    {
      name: "Created Date",
      selector: (row) => row.createdAt,
      sortable: true,
      center: true,
    },
    {
      name: "Function",
      center: true,
      cell: (row) => (
        <>
          <Button
            className="btn btn-primary"
            style={{ marginLeft: "10px" }}
            onClick={() => {
              openModal(row.id);
            }}
          >
            <FontAwesomeIcon icon={faPencilSquare} />
          </Button>
          {"     "}
          <Button
            className="btn btn-danger"
            onClick={() => {
              showConfirmDelete(row.id);
            }}
            style={{ marginLeft: "10px" }}
          >
            <FontAwesomeIcon
              icon={row.status === "false" ? faLock : faUnlock}
            />
          </Button>
        </>
      ),
    },
  ];

  const getCustomers = (page) => {
    service
      .getAllCustomers(page)
      .then((res) => {
        setCustomer(res.data);
        setRecords(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getAllCustomer = () => {
    service
      .getAllCustomerSearch()
      .then((res) => {
        setAllCustomer(res.data);
        // setRecords(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleFilter = (e) => {
    e.preventDefault();
    setCurrentPage(0);
    const searchText = e.target.value.toLowerCase();
    const newData = allCustomer.filter((row) => {
      const customerNameMatch = row.fullName.toLowerCase().includes(searchText);
      const emailMatch = row.email.toLowerCase().includes(searchText);
      return customerNameMatch || emailMatch;
    });
    setRecords(newData);
    if (searchText === "") {
      setRecords(customer);
      setCurrentPage(1);
    }
  };

  useEffect(() => {
    getCustomers(currentPage);
    getAllCustomer();
    getTotalPages();
  }, [currentPage]);

  return (
    <Fragment>
      <h4>Quản Lý Khách Hàng</h4>
      <Container className="d-flex justify-content-between align-items-center mb-3 mt-3 p-0">
        <Col xs={4} className="d-flex">
          <Form.Control
            type="search"
            placeholder="Search by name or email"
            className="me-2"
            aria-label="Search"
            onChange={(e) => handleFilter(e)}
          />
        </Col>
        <Col xs={7} className="d-flex justify-content-end align-items-center">
          <Form>
            <Form.Group className="me-2">
              <Form.Select role="button">
                <option value="">Find by status</option>
                <option value={1}>Active</option>
                <option value={0}>Deactivate</option>
              </Form.Select>
            </Form.Group>
          </Form>
        </Col>
        <Col md={1}>
          <Button
            variant="primary"
            style={{ fontSize: "15px" }}
            onClick={openModal}
          >
            Add New
          </Button>
        </Col>
      </Container>
      <Container className="table-container">
        <DataTable
          columns={columns}
          data={records}
          customStyles={customStyles}
          // theme="solarized"
        />
      </Container>
      <Row className="d-flex justify-content-center align-items-center">
        <Col xs={12} className="d-flex justify-content-center">
          <Pagination>{renderButtonPage()}</Pagination>
        </Col>
      </Row>
      <AddCustomerModal
        isOpen={isModalOpen}
        onClose={closeModal}
        id={idCustomer}
      />
    </Fragment>
  );
};

export default ManageUser;
