import React, { Fragment } from "react";
import {
  Container,
  Form,
  Col,
  Button,
  Row,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { BsPersonPlusFill } from "react-icons/bs";
import {
  faPencilSquare,
  faLock,
  faUnlock,
} from "@fortawesome/free-solid-svg-icons";
import Swal from "sweetalert2";

import userService from "../../../../../services/UserService";
import "../style/Table.css";
import "../style/Employee.css";

const Employee = (props) => {
  const [records, setRecords] = useState([]);
  const [allUser, setAllUser] = useState([]);
  const [progressPending, setProgressPending] = useState(true);

  const getAllUser = () => {
    setProgressPending(true);
    userService
      .getAllUsers()
      .then((res) => {
        setAllUser(res.data);
        setRecords(res.data);
        console.log(res.data);
        setProgressPending(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const columns = [
    {
      name: "STT",
      selector: (row) => records.indexOf(row) + 1,
      compact: "true",
      maxWidth: "40px",
      minWidth: "40px",
      center: "true",
    },
    {
      name: "Họ Và Tên",
      selector: (row) => row.fullName,
      sortable: "true",
      center: "true",
    },
    {
      name: "Email",
      selector: (row) => row.email,
      sortable: "true",
    },
    {
      name: "Trạng Thái",
      selector: (row) => {
        if (!row.status) {
          return <span className="text-danger">Đã Nghỉ</span>;
        } else {
          return <span className="text-success">Đang Làm</span>;
        }
      },
      sortable: "true",
      compact: "true",
      maxWidth: "80px",
      minWidth: "80px",
      center: "true",
    },
    {
      name: "Số Điện Thoại",
      selector: (row) => row.phoneNumber,
      sortable: "true",
      center: "true",
    },
    {
      name: "Ngày Tham Gia",
      selector: (row) => row.createdAt,
      center: "true",
      width: "150px",
    },
    {
      name: "Thao Tác",
      center: "true",
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
                          getAllUser();
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
                          getAllUser();
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

  const handleFilter = (e) => {
    const value = e.target.value;
    const filter = allUser.filter(
      (user) =>
        user.fullName.toLowerCase().includes(value.toLowerCase()) ||
        user.email.toLowerCase().includes(value.toLowerCase()) ||
        user.phoneNumber.toLowerCase().includes(value.toLowerCase())
    );
    setRecords(filter);
    if (value === "") {
      setRecords(allUser);
    }
  };

  const handleStatus = (e) => {
    const value = e.target.value;
    const filter = allUser.filter((user) => {
      if (value === "true") {
        return user.status === true;
      } else if (value === "false") {
        return user.status === false;
      }
    });
    setRecords(filter);
    if (value === "all") {
      setRecords(allUser);
    }
  };

  useEffect(() => {
    getAllUser();
  }, []);

  return (
    <Fragment>
      <Container className="manager-employee-container">
        <Container className="pb-0">
          <h4>Danh Sách Nhân Viên</h4>
          <hr />
          <Row>
            <Col className="d-flex flex-row align-items-center">
              <Form.Group
                className="mb-3 flex-grow-1"
                controlId="searchFilter"
                style={{ marginLeft: "20px" }}
              >
                <Form.Label>Tìm Kiếm</Form.Label>
                <Form.Control
                  type="search"
                  placeholder="Tìm kiếm theo tên, email, số điện thoại"
                  className="me-2"
                  aria-label="Search"
                  autoComplete="on"
                  onChange={(e) => handleFilter(e)}
                />
              </Form.Group>
              <Form.Group
                className="mb-3 ms-3"
                controlId="searchStatus"
              >
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
                    label="Đang Làm"
                    name="status"
                    type="radio"
                    value="true"
                    onClick={(e) => handleStatus(e)}
                  />
                  <Form.Check
                    inline
                    label="Đã Nghỉ Làm"
                    name="status"
                    type="radio"
                    value="false"
                    onClick={(e) => handleStatus(e)}
                  />
                </div>
              </Form.Group>
            </Col>
            <Col className="d-flex justify-content-end align-items-center">
              <Link
                to="add-employee"
                style={{ fontSize: "15px" }}
                className="btn btn-dark text-light"
              >
                <BsPersonPlusFill style={{ marginRight: "5px" }} />
                Thêm
              </Link>
            </Col>
          </Row>
        </Container>
        <Container className=" mb-3 mt-2 pt-0 ps-4 pe-4 table-container">
          <DataTable
            columns={columns}
            data={records}
            progressPending={allUser.length === 0 ? null : progressPending}
            pagination
          />
        </Container>
      </Container>
    </Fragment>
  );
};

export default Employee;
