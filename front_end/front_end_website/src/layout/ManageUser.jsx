import React, { Fragment, useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import DataTable from "react-data-table-component";
import service from "../services/CustomerService";
import { Link } from "react-router-dom";

const ManageUser = () => {
  const [customer, setCustomer] = useState([]);

  const customStyles = {
    rows: {
        style: {
            minHeight: '72px', // override the row height
        },
    },
    headCells: {
        style: {
            paddingLeft: '8px', // override the cell padding for head cells
            paddingRight: '8px',
        },
    },
    cells: {
        style: {
            paddingLeft: '8px', // override the cell padding for data cells
            paddingRight: '8px',
        },
    },
};

  const columns = [
    {
      name: "ID",
      selector: (row) => row.id,
      compact: true,
      maxWidth: "50px",
      minWidth: "50px",
    },
    {
      name: "Full Name",
      selector: (row) => row.fullName,
      sortable: true,
    },
    {
      name: "Gender",
      selector: (row) => (row.gender ? "Nam" : "Nữ"),
      sortable: true,
    },
    {
      name: "Birth Date",
      selector: (row) => row.birthDate,
      sortable: true,
    },
    {
      name: "Email",
      selector: (row) => row.email,
      sortable: true,
    },
    {
      name: "Avatar",
      selector: (row) => row.avatar,
      sortable: true,
      compact: true,
      maxWidth: "50px",
      minWidth: "50px",
    },
    {
      name: "Phone Number",
      selector: (row) => row.phoneNumber,
      sortable: true,
    },
    {
      name: "Created Date",
      selector: (row) => row.createdAt,
      sortable: true,
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
      <h2>Quản Lý Khách Hàng</h2>
      <DataTable columns={columns} data={customer} customStyles={customStyles}/>
    </Fragment>
  );
};

export default ManageUser;
