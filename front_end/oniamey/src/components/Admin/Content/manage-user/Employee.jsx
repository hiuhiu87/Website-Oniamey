import React, { Fragment } from "react";
import { Container, Form, Col, Button, Pagination, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { BsPersonPlus } from "react-icons/bs";
import {
  faPencilSquare,
  faLock,
  faUnlock,
} from "@fortawesome/free-solid-svg-icons";
import Swal from "sweetalert2";

import userService from "../../../../services/UserService";
import "../manage-user/style/Table.css";

const Employee = (props) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState();
  const [records, setRecords] = useState([]);
  const [allUser, setAllUser] = useState([]);
  const [progressPending, setProgressPending] = useState(true);
  const [onSearch, setOnSearch] = useState(false);

  const renderNameColumns = () => {
    if (onSearch === true) {
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
    },
    {
      name: "Trạng Thái",
      selector: (row) => {
        if (!row.status) {
          return "Đã Nghỉ Làm";
        } else {
          return "Đang Làm";
        }
      },
      sortable: true,
      compact: true,
      maxWidth: "80px",
      minWidth: "80px",
      center: true,
    },
    {
      name: "Số Điện Thoại",
      selector: (row) => row.phoneNumber,
      sortable: true,
      center: true,
    },
    {
      name: "Ngày Tham Gia",
      selector: (row) => row.createdAt,
      sortable: true,
      center: true,
      width: "150px",
    },
    {
      name: "Thao Tác",
      center: true,
      cell: (row) => (
        <>
          <Link
            className="btn btn-dark"
            style={{ marginLeft: "10px" }}
            to={`/admins/manage-employees/update-employee/${row.id}`}
          >
            <FontAwesomeIcon icon={faPencilSquare} color="white" />
          </Link>
          <Button
            variant="dark"
            onClick={() => {
              if (!row.status) {
                Swal.fire({
                  title: "Are you sure?",
                  text: "You will activate this employee!",
                  icon: "warning",
                  showCancelButton: true,
                  confirmButtonColor: "#3085d6",
                  cancelButtonColor: "#d33",
                  confirmButtonText: "Yes!",
                }).then((result) => {
                  if (result.isConfirmed) {
                    userService
                      .changeStatusUser(row.id)
                      .then((res) => {
                        Swal.fire({
                          title: "Success!",
                          text: "You have activated this employee!",
                          icon: "success",
                          confirmButtonColor: "#3085d6",
                          confirmButtonText: "OK",
                        }).then((result) => {
                          getListStaff(currentPage);
                        });
                      })
                      .catch((err) => {
                        console.log(err);
                      });
                  }
                });
              } else {
                Swal.fire({
                  title: "Are you sure?",
                  text: "You will deactivate this employee!",
                  icon: "warning",
                  showCancelButton: true,
                  confirmButtonColor: "#3085d6",
                  cancelButtonColor: "#d33",
                  confirmButtonText: "Yes!",
                }).then((result) => {
                  if (result.isConfirmed) {
                    userService
                      .changeStatusUser(row.id)
                      .then((res) => {
                        Swal.fire({
                          title: "Success!",
                          text: "You have deactivated this employee!",
                          icon: "success",
                          confirmButtonColor: "#3085d6",
                          confirmButtonText: "OK",
                        }).then((result) => {
                          getListStaff(currentPage);
                        });
                      })
                      .catch((err) => {
                        console.log(err);
                      });
                  }
                });
              }
            }}
            style={{ marginLeft: "10px" }}
          >
            <FontAwesomeIcon icon={!row.status ? faLock : faUnlock} />
          </Button>
        </>
      ),
    },
  ];

  const getListStaff = (page) => {
    setProgressPending(true);
    userService
      .getUsersPaging(page)
      .then((res) => {
        setRecords(res.data);
        setProgressPending(false);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleFilter = (e) => {
    setOnSearch(true);
    const value = e.target.value;
    const filter = allUser.filter(
      (user) =>
        user.fullName.toLowerCase().includes(value.toLowerCase()) ||
        user.email.toLowerCase().includes(value.toLowerCase()) ||
        user.phoneNumber.toLowerCase().includes(value.toLowerCase())
    );
    setRecords(filter);
    if (value === "") {
      setOnSearch(false);
      getListStaff(currentPage);
    }
  };

  const getTotalPages = () => {
    userService
      .getTotalPages()
      .then((res) => {
        setTotalPages(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const renderButtonPage = () => {
    let button = [];
    for (let i = 1; i <= totalPages; i++) {
      button.push(
        <Pagination.Item
          key={i}
          active={i === currentPage}
          onClick={() => {
            setCurrentPage(i);
            getListStaff(i);
          }}
        >
          {i}
        </Pagination.Item>
      );
    }
    return button;
  };

  useEffect(() => {
    const getAllUser = () => {
      userService
        .getAllUsers()
        .then((res) => {
          setAllUser(res.data);
          console.log(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    getAllUser();
    getTotalPages();
  }, []);

  useEffect(() => {
    getListStaff(currentPage);
  }, [currentPage]);

  return (
    <Fragment>
      <Container>
        <h4>Manager Staff</h4>
        <Row>
          <Col xs={3} className="">
            <Form.Control
              type="search"
              placeholder="Tìm kiếm theo tên, email, số điện thoại"
              className="me-2"
              aria-label="Search"
              autoComplete="on"
              onChange={(e) => handleFilter(e)}
            />
          </Col>
          <Col className="d-flex justify-content-end align-items-center">
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
            <Link
              to="add-employee"
              style={{ fontSize: "15px" }}
              className="btn btn-dark text-light"
            >
              <BsPersonPlus style={{ marginRight: "5px" }} />
              Thêm
            </Link>
          </Col>
        </Row>
      </Container>
      <Container className="d-flex justify-content-between mb-3 pt-0 ps-4 pe-4 table-container">
        <DataTable
          columns={columns}
          data={records}
          progressPending={allUser.length === 0 ? null : progressPending}
        />
      </Container>
      <Container className="d-flex justify-content-center">
        <Pagination>{renderButtonPage()}</Pagination>
      </Container>
    </Fragment>
  );
};

export default Employee;
