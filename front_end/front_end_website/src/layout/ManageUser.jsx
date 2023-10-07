import React, { Fragment, useEffect, useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import DataTable from "react-data-table-component";
import service from "../services/CustomerService";
import { Link } from "react-router-dom";
import { createTheme } from "react-data-table-component";
import AddCustomerModal from "../components/AddCustomerModal";

import "../assets/style/Datatable.css";

const ManageUser = () => {
  const [customer, setCustomer] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    getAllCustomer(1);
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

  createTheme(
    "solarized",
    {
      text: {
        primary: "#268bd2",
        secondary: "#2aa198",
      },
      background: {
        default: "#002b36",
      },
      context: {
        background: "#cb4b16",
        text: "#FFFFFF",
      },
      divider: {
        default: "#073642",
      },
      action: {
        button: "rgba(0,0,0,.54)",
        hover: "rgba(0,0,0,.08)",
        disabled: "rgba(0,0,0,.12)",
      },
    },
    "dark"
  );

  const columns = [
    {
      name: "ID",
      selector: (row) => row.id,
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
      selector: (row) => row.birthDate,
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
      name: "Avatar",
      selector: (row) => row.avatar,
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
      // cell: (row) => (
      //   <>
      //     <Link
      //       className="btn btn-secondary"
      //       to={`/detail-product/${row.productId}`}
      //     >
      //       <i className="fa fa-eye"></i>
      //     </Link>
      //     <Link
      //       className="btn btn-info"
      //       style={{ marginLeft: "10px" }}
      //       to={`/edit-product/${row.productId}`}
      //     >
      //       <i className="fa fa-pencil-square-o"></i>
      //     </Link>
      //     {"     "}
      //     <button
      //       className="btn btn-danger"
      //       onClick={() => {
      //         // showConfirmDelete(row.productId);
      //       }}
      //       style={{ marginLeft: "10px" }}
      //     >
      //       <i className="fa fa-trash-o"></i>
      //     </button>
      //   </>
      // ),
    },
  ];

  const getAllCustomer = (page) => {
    service
      .getAllCustomers(page)
      .then((res) => {
        setCustomer(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getAllCustomer(1);
    console.log(customer);
  }, []);

  return (
    <Fragment>
      <h4>Quản Lý Khách Hàng</h4>
      <Container className="d-flex justify-content-between align-items-center mb-3 mt-3 p-0">
        <Col xs={4} className="d-flex">
          <Form.Control
            type="search"
            placeholder="Search"
            className="me-2"
            aria-label="Search"
          />
          <Button variant="dark">Search</Button>
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
      <DataTable
        columns={columns}
        data={customer}
        customStyles={customStyles}
        theme="solarized"
      />
      <AddCustomerModal isOpen={isModalOpen} onClose={closeModal} />
    </Fragment>
  );
};

export default ManageUser;
