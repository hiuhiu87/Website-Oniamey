import React, {Fragment} from "react";
import {Container, Form, Col, Button, Pagination, Row} from "react-bootstrap";
import {useState, useEffect} from "react";
import DataTable from "react-data-table-component";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    faPencilSquare,
    faLock,
    faUnlock,
    faCircleInfo,
} from "@fortawesome/free-solid-svg-icons";
import Swal from "sweetalert2";

import ModifyCustomerModal from "./components/ModifyCustomerModal";
import BreadcrumbsPage from "../../BreadCrumbs/BreadcrumbsPage";
import service from "../../../../services/CustomerService";
import "../manage-user/style/Table.css";
import "../manage-user/style/CustomerStyle.css";
import {faClipboardUser} from "@fortawesome/free-solid-svg-icons";
import {Link} from "react-router-dom";

const Customer = (props) => {
    const [customer, setCustomer] = useState([]);
    const [onSearch, setOnSearch] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [idCustomer, setIdCustomer] = useState();
    const [totalPage, setTotalPage] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [records, setRecords] = useState([]);
    const [allCustomer, setAllCustomer] = useState([]);
    const [progressPending, setProgressPending] = useState(true);

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
                    text: `Khóa tài khoản ID ${customerId} Thành Công`,
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
                            // style={{ cursor: "pointer", color: "#000", backgroundColor: "#cc9966" }}
                        >
                            {i + 1}
                        </Pagination.Item>
                    ))}
            </Fragment>
        );
    };

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
                        className="btn btn-dark"
                        style={{marginLeft: "10px"}}
                        onClick={() => {
                            openModal(row.id);
                        }}
                    >
                        <FontAwesomeIcon icon={faPencilSquare}/>
                    </Button>
                    {"     "}
                    <Button
                        className="btn btn-dark"
                        onClick={() => {
                            showConfirmDelete(row.id);
                        }}
                        style={{marginLeft: "10px"}}
                    >
                        <FontAwesomeIcon
                            icon={row.status === "false" ? faLock : faUnlock}
                        />
                    </Button>
                    <Link
                        to={`/admins/manage-customers/detail-customer/${row.id}`}
                        className="btn btn-dark"
                        style={{marginLeft: "10px"}}
                    >
                        <FontAwesomeIcon icon={faCircleInfo}/>
                    </Link>
                </>
            ),
        },
    ];

    const getCustomers = (page) => {
        setProgressPending(true);
        service
            .getAllCustomers(page)
            .then((res) => {
                setCustomer(res.data);
                setRecords(res.data);
                console.log(res.data);
                setProgressPending(false);
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
            return customerNameMatch || emailMatch;
        });
        setRecords(newData);
        if (searchText === "") {
            setRecords(customer);
            setOnSearch(false);
            setCurrentPage(1);
        }
    };

    useEffect(() => {
        getCustomers(currentPage);
        getTotalPages();
    }, [currentPage]);

    useEffect(() => {
        getAllCustomer();
    }, [records]);

    return (
        <Container className="wrapper">
            <h3 className="ml-5">Manager Customer</h3>
            {/* <BreadcrumbsPage /> */}
            <Container className="d-flex justify-content-between align-items-center mt-3">
                <Col xs={3} className="d-flex">
                    <Form.Control
                        type="search"
                        placeholder="Search by name or email"
                        className="me-2"
                        aria-label="Search"
                        autoComplete="on"
                        onChange={(e) => handleFilter(e)}
                    />
                </Col>
                <Col sm={8} className="d-flex justify-content-end align-items-center">
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
                <Col>
                    <Button
                        className="btn btn-dark w-100"
                        onClick={() => {
                            openModal();
                        }}
                    >
                        <FontAwesomeIcon icon={faClipboardUser}/> Add
                    </Button>
                </Col>
            </Container>
            <Container className="table-container">
                <DataTable
                    columns={columns}
                    data={records}
                    customStyles={customStyles}
                    progressPending={progressPending}
                />
            </Container>
            <Row className="d-flex justify-content-center align-items-center">
                <Col xs={12} className="d-flex justify-content-center">
                    <Pagination style={{cursor: "pointer", color: "#cc9966"}}>
                        {renderButtonPage()}
                    </Pagination>
                </Col>
            </Row>
            <ModifyCustomerModal
                isOpen={isModalOpen}
                onClose={closeModal}
                id={idCustomer}
            />
        </Container>
    );
};

export default Customer;
