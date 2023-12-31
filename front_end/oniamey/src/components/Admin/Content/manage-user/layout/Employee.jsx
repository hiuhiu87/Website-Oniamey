import React, { Fragment } from "react";
import { Container, Form, Col, Button, Row } from "react-bootstrap";
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
import { Tag } from "antd";
import { AiOutlineUnorderedList, AiOutlineFileSearch } from "react-icons/ai";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

import userService from "../../../../../services/UserService";
import "../style/Table.css";
import "../style/Employee.css";

const Employee = (props) => {
  const [records, setRecords] = useState([]);
  const [allUser, setAllUser] = useState([]);
  const [progressPending, setProgressPending] = useState(true);
  const navigate = useNavigate();

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

  const handleRowClicked = (row) => {
    navigate(`/admins/manage-employees/update-employee/${row.id}`);
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
          return <Tag color={"red"}>Đã Nghỉ</Tag>;
        } else {
          return <Tag color={"green"}>Đang Làm</Tag>;
        }
      },
      sortable: "true",
      compact: "true",
      maxWidth: "80px",
      minWidth: "80px",
    },
    {
      name: "Số Điện Thoại",
      selector: (row) => row.phoneNumber,
      sortable: "true",
      center: "true",
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
                  title: "Thông báo",
                  text: "Bạn có chắc muốn kích hoạt nhân viên này ?",
                  icon: "warning",
                  showCancelButton: true,
                  confirmButtonColor: "#3085d6",
                  cancelButtonColor: "#d33",
                  confirmButtonText: "Xác nhận",
                  cancelButtonText: "Hủy",
                }).then((result) => {
                  if (result.isConfirmed) {
                    userService
                      .changeStatusUser(row.id)
                      .then((res) => {
                        Swal.fire({
                          title: "Thành công!",
                          text: "Bạn đã kích hoạt nhân viên này!",
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
                  title: "Thông báo",
                  text: "Bạn có chắc muốn khóa nhân viên này ?",
                  icon: "warning",
                  showCancelButton: true,
                  confirmButtonColor: "#3085d6",
                  cancelButtonColor: "#d33",
                  confirmButtonText: "Xác nhận",
                  cancelButtonText: "Hủy",
                }).then((result) => {
                  if (result.isConfirmed) {
                    userService
                      .changeStatusUser(row.id)
                      .then((res) => {
                        Swal.fire({
                          title: "Thành công!",
                          text: "Bạn đã khóa nhân viên này!",
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
        user.phoneNumber.toLowerCase().includes(value.toLowerCase()),
    );
    setRecords(filter);
    if (value === "") {
      setRecords(allUser);
    }
  };

  const handleStatus = (e) => {
    const value = e.target.value;
    const filter = allUser.filter(
      (user) => user.status.toString() === value.toString(),
    );
    setRecords(filter);
    if (value === "all") {
      setRecords(allUser);
    }
  };

  useEffect(() => {
    getAllUser();
  }, []);

  const paginationComponentOptions = {
    rowsPerPageText: "Số bản ghi mỗi trang: ",
    rangeSeparatorText: "trên",
    selectAllRowsItem: true,
    selectAllRowsItemText: "Tất cả",
  };

  return (
    <Fragment>
      <Container className="manager-employee-container">
        <Container className="pb-0 filter-staff-container">
          <h5>
            <AiOutlineFileSearch className="me-2" />
            Bộ Lọc
          </h5>
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
                  placeholder="Tìm kiếm theo tên, email, số điện thoại"
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
          </Row>
        </Container>
        <Container className="pb-0 list-staff-container">
          <h5>
            <AiOutlineUnorderedList className="me-2" />
            Danh Sách Nhân Viên
          </h5>
          <hr />
          <Container className="d-flex justify-content-end align-items-center">
            <Link
              to="add-employee"
              style={{ fontSize: "15px" }}
              className="btn btn-dark text-light"
            >
              <BsPersonPlusFill style={{ marginRight: "5px" }} />
              Thêm
            </Link>
          </Container>
          <Container className=" mb-3 mt-2 pt-0 ps-4 pe-4 table-container">
            <DataTable
              columns={columns}
              data={records}
              progressPending={allUser.length === 0 ? null : progressPending}
              pagination
              paginationComponentOptions={paginationComponentOptions}
              highlightOnHover
              pointerOnHover
              paginationRowsPerPageOptions={[5, 10, 15]}
              paginationPerPage={5}
              paginationDefaultPage={1}
              responsive
              onRowClicked={(row) => handleRowClicked(row)}
            />
          </Container>
        </Container>
      </Container>
    </Fragment>
  );
};

export default Employee;
