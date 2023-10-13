import React, { Fragment } from "react";
import { Container, Form, Col, Button, Pagination, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPencilSquare,
  faLock,
  faUnlock,
} from "@fortawesome/free-solid-svg-icons";
import Swal from "sweetalert2";

import userService from "../../../../services/UserService";
import "../manage-user/style/Table.css";

const Employee = (props) => {
  const [user, setUser] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [records, setRecords] = useState([]);
  const [allUser, setAllUser] = useState([]);
  const [progressPending, setProgressPending] = useState(true);
  const [idUser, setIdUser] = useState();

  const renderNameColumns = () => {};

  const columns = [
    {
      name: renderNameColumns(),
      selector: (row) => {
        if (currentPage === 1) {
          return user.indexOf(row) + 1;
        } else if (currentPage > 1) {
          return (currentPage - 1) * 5 + user.indexOf(row) + 1;
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
              //   openModal(row.id);
            }}
          >
            <FontAwesomeIcon icon={faPencilSquare} />
          </Button>
          {"     "}
          <Button
            className="btn btn-danger"
            onClick={() => {
              //   showConfirmDelete(row.id);
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

  const getListStaff = (page) => {
    userService
      .getUsersPaging(page)
      .then((res) => {
        setUser(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getListStaff(currentPage);
  }, []);

  return (
    <Fragment>
      <Container>
        <h4>Quản Lý Nhân Viên</h4>
        <Container className="d-flex justify-content-between align-items-center mb-3 mt-3 p-0 table-container">
          <Col xs={4} className="d-flex">
            <Form.Control
              type="search"
              placeholder="Search by name or email"
              className="me-2"
              aria-label="Search"
              autoComplete="on"
              //   onChange={(e) => handleFilter(e)}
            />
          </Col>
          <Col xs={7} className="d-flex justify-content-end align-items-center">
            <Form>
              <Form.Group className="me-2 d-flex justify-content-center align-items-center">
                <Form.Label className="m-2">Status</Form.Label>
                <Form.Select role="button">
                  <option value="">Find by status</option>
                  <option value={1}>Active</option>
                  <option value={0}>Deactivate</option>
                </Form.Select>
              </Form.Group>
            </Form>
          </Col>
          <Col md={1}>
            <Link
              to="/admins/add-employee"
              variant="primary"
              style={{ fontSize: "15px" }}
              className="btn btn-primary"
            >
              Add New
            </Link>
          </Col>
        </Container>
        <Container>
          <DataTable columns={columns} data={allUser} />
        </Container>
      </Container>
    </Fragment>
  );
};

export default Employee;
