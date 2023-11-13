import React, {useState, useEffect} from "react";
import "./ManagePromotion.scss";
import {
    Button, Col, Container, Dropdown, DropdownButton, FloatingLabel, Form, InputGroup, Row,
} from "react-bootstrap";
// import { useParams } from "react-router-dom";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import {DatePicker, Space, Table} from "antd";
import promotionService from "../../../../services/promotion/PromotionService";
import {Navigator, useNavigate} from "react-router-dom";
import {getAllProducts} from "../../../../services/apiService";
import DataTable from "react-data-table-component";
import {FaAccusoft, FaFilter, FaTag} from "react-icons/fa";
import Swal from "sweetalert2";

const noDataComponent = () => {
    return (<div className="no-data-component">
        <h5>Không có dữ liệu</h5>
    </div>);
}

const ModifyPromotion = (props) => {
    const [selectedType, setSelectedType] = useState("percentage");
    const [recordProducts, setRecordProducts] = useState([]);
    const [recordProductDetails, setRecordProductDetails] = useState([]);
    const [listProduct, setListProduct] = useState([]);
    const [selectedRows, setSelectedRows] = useState(false);
    const [selectedRowsProduct, setSelectedRowsProduct] = useState(false);
    const [listProductDetail, setListProductDetail] = useState([]);
    const [productDetailId, setProductDetailId] = useState([]);
    const [listSearchProductDetail, setListSearchProductDetail] = useState([]);
    let navigate = useNavigate();
    // ----- them promotion
    const [promotion, setPromotion] = useState({
        promotionName: "",
        promotionCode: "",
        promotionValue: "",
        promotionType: "",
        promotionDeleted: "",
        promotionStartDate: "",
        promotionEndDate: "",
        promotionProductID: [],
        promotionProductDetailID: []
    });

    const {
        promotionName,
        promotionCode,
        promotionValue,
        promotionType,
        promotionDeleted,
        promotionStartDate,
        promotionEndDate,
        promotionProductID,
        promotionProductDetailID,
    } = promotion;

    const getValuePromotionPriceAfter = (promotionType, promotionValue, productDetailPrice) => {
        if (promotionType === "Percentage") {
            const giaSauGiam = parseFloat(productDetailPrice - (promotionValue * productDetailPrice) / 100);
            return giaSauGiam + " VNĐ";
        } else {
            const giaSauGiam = parseFloat(productDetailPrice - promotionValue);
            return giaSauGiam + " VNĐ";
        }
    };

    const onInputChangeFormAddPromotion = (e) => {
        const {name, value} = e.target;
        setPromotion({...promotion, [name]: value});
    };

    // -- het them promotion

    const handleTypeSelect = (type) => {
        setSelectedType(type);
        setPromotion({...promotion, promotionType: type});
        console.log({...promotion, promotionType: type})
    };

    // time
    dayjs.extend(customParseFormat);

    const {RangePicker} = DatePicker;

    const range = (start, end) => {
        const result = [];
        for (let i = start; i < end; i++) {
            result.push(i);
        }
        return result;
    };

    // eslint-disable-next-line arrow-body-style
    const disabledDate = (current) => {
        // Can not select days before today and today
        return current && current < dayjs().endOf("day");
    };

    const disabledRangeTime = (_, type) => {
        if (type === "start") {
            return {
                disabledHours: () => range(0, 60).splice(4, 20),
                disabledMinutes: () => range(30, 60),
                disabledSeconds: () => [55, 56],
            };
        }
        return {
            disabledHours: () => range(0, 60).splice(20, 4),
            disabledMinutes: () => range(0, 31),
            disabledSeconds: () => [55, 56],
        };
    };

    const addPromotion = (e) => {
        Swal.fire({
            title: "Thông báo",
            text: "Bạn muốn thêm khuyến mại!",
            icon: "infor",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Có",
            cancelButtonText: "Hủy",
        }).then((result) => {
            if (result.isConfirmed) {
                e.preventDefault();
                promotionService
                    .createPromotion(promotion)
                    .then((response) => {
                        console.log(response.data);
                        navigate("../manage-promotion");
                        Swal.fire({
                            title: "Thành công!",
                            text: "Bản đã thêm khuyến mại thành công!",
                            icon: "success",
                            confirmButtonColor: "#3085d6",
                            confirmButtonText: "OK",
                        }).then((result) => {
                            console.log("em");
                        });
                    })
                    .catch((error) => {
                        Swal.fire({
                            title: "Thất bại!",
                            text: "Xem lại code đi :)))!",
                            icon: "danger",
                            confirmButtonColor: "#3085d6",
                            confirmButtonText: "OK",
                        }).then((result) => {
                            console.log(error);
                        });
                    });
            }
        });
    };

    const handleChange = ({selectedRows}) => {
        setSelectedRows(selectedRows);
    };

    const handleChangeProductDetails = ({selectedRows}) => {
        console.log(selectedRows);
        setSelectedRowsProduct(selectedRows);
    }

    const handleSelectsRowProduct = (selectedRowsProduct) => {
        const listID = [];
        if (selectedRowsProduct.length > 0) {
            for (const selectedRowProduct of selectedRowsProduct) {
                listID.push(selectedRowProduct.productDetailID);
            }
            setPromotion({...promotion, promotionProductDetailID: listID});
            console.log(listID);
        }
        console.log({...promotion, promotionProductDetailID: listID});
    }

    const handleSelectsRow = (selectedRows) => {
        const listID = [];
        const listEqual = [];

        if (selectedRows.length > 0) {
            for (const selectedRow of selectedRows) {
                listID.push(selectedRow.id);
            }
            setPromotion({...promotion, promotionProductID: listID});
            console.log("ID PRODUCT: " + listID);
        }
        console.log({...promotion, promotionProductID: listID});
        if (listID.length > 0) {
            for (const id of listID) {
                const productDetailEqualId = listProductDetail.find((productDetail) => productDetail.productDetailID === id)
                listEqual.push(productDetailEqualId);
            }
        }

        if (listEqual.length > 0) {
            const listProductDetailID = []
            const listProductDetail = promotion.promotionProductDetailID;
            for (const productDetailID of listEqual) {
                for (const promotionProductDetailID of listProductDetail) {
                    const list = listEqual.find((listEqual) => productDetailID === promotionProductDetailID)
                    listProductDetailID.push(list);
                }
            }
            console.log("á")
            console.log(listProductDetailID);

        }

        setListSearchProductDetail(listEqual);
        setRecordProductDetails(listEqual);
    }

    // const handleSelectsRowProduct = (selectedRows) =>{
    //     const listID = [];
    //     if (selectedRows.length > 0) {
    //         for (const selectedRow of selectedRows) {
    //             listID.push(selectedRow.id);
    //         }
    //     }
    //     setProductDetailId(listID);
    //     console.log(listID);
    // }


    const fetchListProduct = async () => {
        let response = await getAllProducts();
        setListProduct(response.data);
        setRecordProducts(response.data);
    };

    const fetchListProductDetail = async () => {
        promotionService
            .getProductByPromotion()
            .then((response) => {
                setListProductDetail(response.data);
                console.log(response.data);
            })
            .catch((e) => {
                console.log(e);
            });
    };

    const onChangeFindProduct = (e) => {
        const valueSearch = e.target.value;

        const filteredProducts = listProduct.filter((product) => {
            const name = product.name
                .toLowerCase()
                .includes(valueSearch.toLowerCase());
            const code = product.code
                .toLowerCase()
                .includes(valueSearch.toLowerCase());
            return name || code;
        });

        setRecordProducts(filteredProducts);

        if (valueSearch === "") {
            setRecordProducts(listProduct);
        }
    };


    const handleTimeSearch = (dates, dateStrings) => {

        console.log(dateStrings);

        const [start, end] = dateStrings;

        console.log(start);

        console.log(dateStrings);

        if (start && end) {
            const startTime = dayjs(start, "HH:mm:ss YYYY-MM-DD").valueOf();
            const endTime = dayjs(end, "HH:mm:ss YYYY-MM-DD").valueOf();
            console.log("Start Time (long): ", startTime);
            console.log("End Time (long): ", endTime);
            setPromotion({
                ...promotion,
                promotionStartDate: startTime,
                promotionEndDate: endTime,
            })
        } else {
            setPromotion({
                ...promotion,
                promotionStartDate: "",
                promotionEndDate: "",
            })
        }
    };

    const onChangeFindProductDetails = (e) => {
        const valueSearch = e.target.value;

        const filteredProductDetails = listSearchProductDetail.filter((productDetails) => {
            const name = productDetails.productDetailName.toLowerCase().includes(valueSearch.toLowerCase());
            const code = productDetails.productDetailCode.toLowerCase().includes(valueSearch.toLowerCase());
            const value = productDetails.productDetailPrice.toString().toLowerCase().includes(valueSearch.toLowerCase());
            return name || code || value;
        })

        setRecordProductDetails(filteredProductDetails);

        if (valueSearch === "") {
            setRecordProductDetails(listSearchProductDetail);
        }
    }

    const columnsProductDetails = [{
        name: "STT",
        selector: (row) => recordProductDetails.indexOf(row) + 1,
        minWidth: "40px",
        maxWidth: "80px",
        center: "true",
    }, // {
        //     name: "Ảnh",
        //     selector: (row) => row.imageUrl,
        //     center: "true",
        // },
        {
            name: "Tên sản phẩm", selector: (row) => row.productDetailName, center: "true",
            sorter: (a, b) => a.productDetailName.localeCompare(b.productDetailName),
        }, {
            name: "Mã sản phẩm", selector: (row) => row.productDetailCode, center: "true",
        }, // {
        //   name: "Chất liệu",
        //   selector: (row) => row.material,
        //   center: "true",
        // },
        // {
        //   name: "Kích cỡ",
        //   selector: (row) => row.,
        //   center: "true",
        // },
        {
            name: "giá sau áp dụng",
            selector: (row) => getValuePromotionPriceAfter(promotion.promotionType, promotion.promotionValue, row.productDetailPrice),
            center: "true",
        }, // {
        //     name: "Cân nặng",
        //     selector: (row) => row.productDetailWeight,
        //     center: "true",
        // },
        {
            name: "Giá", selector: (row) => row.productDetailPrice + " VNĐ", center: "true",
        }, {
            name: "Trạng thái", selector: (row) => {
                if (row.productDetailDeleted === true) {
                    return <span className="text-success">Hoạt Động</span>;
                } else {
                    return <span className="text-danger">Ngừng Hoạt Động</span>;
                }
            }, center: "true",
        },];

    const columnsProduct = [{
        name: "STT",
        selector: (row) => recordProducts.indexOf(row) + 1,
        minWidth: "40px",
        maxWidth: "80px",
        center: "true",
    }, {
        name: "Tên sản phẩm", selector: (row) => row.name, center: "true",

    }, {
        name: "Mã sản phẩm", selector: (row) => row.code, center: "true",
    }, {
        name: "Trạng thái", selector: (row) => {
            if (row.deleted === true) {
                return <span className="text-success">Hoạt Động</span>;
            } else {
                return <span className="text-danger">Ngừng Hoạt Động</span>;
            }
        }, center: "true",
    },];

    const paginationComponentOptions = {
        rowsPerPageText: "Số Bản Ghi Một Trang",
        rangeSeparatorText: "Trên",
        selectAllRowsItem: true,
        selectAllRowsItemText: "Tất Cả",
    };

    useEffect(() => {
        fetchListProduct();
        fetchListProductDetail();
    }, []);

    useEffect(() => {
        handleSelectsRow(selectedRows);
    }, [selectedRows])

    useEffect(() => {
        handleSelectsRowProduct(selectedRowsProduct);
    }, [selectedRowsProduct])

    return (<Container className="manage-modifypromotion-container">
        <Row className="relative">
            <Col xs lg={4} className="fixed manage-addpromotion-container border border-black">
                <Form className="p-4 ">
                    <h3 className="text-center pb-2">Thêm khuyến mại</h3>

                    <Form.Group className="mb-3" controlId="formBasicName">
                        <Form.Label>Tên khuyến mại</Form.Label>
                        <Form.Control
                            name="promotionName"
                            type="text"
                            placeholder="nhập vào tên khuyến mại"
                            value={promotionName}
                            onChange={(e) => onInputChangeFormAddPromotion(e)}
                        />
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Giá trị khuyến mại</Form.Label>
                        <InputGroup className="mb-3">
                            <Form.Control
                                name="promotionValue"
                                type="Text"
                                placeholder="nhập vào giá trị khuyến mại"
                                value={promotionValue}
                                onChange={(e) => onInputChangeFormAddPromotion(e)}
                            />

                            <DropdownButton
                                title={`${selectedType === "Percentage" ? "%" : "VNĐ"}`}
                                name="promotionType"
                                onSelect={handleTypeSelect}
                                variant="outline-secondary"
                                align="end"
                                value={selectedType}
                                onChange={(e) => onInputChangeFormAddPromotion(e)}
                            >
                                <Dropdown.Item
                                    eventKey="Percentage"
                                    className="background-hover-dropdown-item"
                                >
                                    Kiểu 1: %
                                </Dropdown.Item>
                                <Dropdown.Item
                                    eventKey="Fixed Amount"
                                    className="background-hover-dropdown-item"
                                >
                                    Kiểu 2: Giá trị cố định
                                </Dropdown.Item>
                            </DropdownButton>
                        </InputGroup>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Thời gian khuyến mại</Form.Label>
                        <Space direction="vertical" size={12} className="w-100">
                            <RangePicker
                                className="w-100 p-2 text-light"
                                disabledDate={disabledDate}
                                // disabledTime={disabledRangeTime}
                                showTime={{format: "HH:mm:ss"}}
                                format="HH:mm:ss YYYY-MM-DD"
                                onChange={handleTimeSearch}
                            />
                        </Space>
                    </Form.Group>
                    <Form.Group className="text-center pt-4">
                        <Button variant="outline-dark" onClick={(e) => addPromotion(e)}>
                            Thêm khuyến mãi
                        </Button>
                    </Form.Group>
                </Form>
            </Col>
            <Col ms lg={7} className="relative">
                <Row className="manage-addpromotion-container justify-content-center">
                    <Col ms log={10} className="absolute-col-2">


                        <Row
                            className="p-3 border-3 border border-black rounded-4 manage-listproduct-container ms-3">
                            <div className="manage-promotion-title p-3">
                                <div className="title">
                                    <FaAccusoft size={32}/> Danh sách sản phẩm
                                </div>
                            </div>
                            <Row className="mb-3 justify-content-md-end ">
                                {/*<Col sm="6" xs lg="3">*/}
                                {/*    <FloatingLabel*/}
                                {/*        controlId="floatingInput"*/}
                                {/*        label="Trạng thái"*/}
                                {/*        className="mb-3"*/}
                                {/*    >*/}
                                {/*        <Form.Select*/}
                                {/*            onChange={(e) => onChangeFindProduct(e)}*/}
                                {/*            name="productStatus"*/}
                                {/*        >*/}
                                {/*            <option value="">Tất Cả</option>*/}
                                {/*            <option value="1">Hoạt Động</option>*/}
                                {/*            <option value="0">Ngừng Hoạt Động</option>*/}
                                {/*        </Form.Select>*/}
                                {/*    </FloatingLabel>*/}
                                {/*</Col>*/}
                                <Col sm="6" xs lg="4">
                                    <FloatingLabel
                                        controlId="floatingInput"
                                        label="Tìm kiếm sản phẩm"
                                        className="mb-3"
                                    >
                                        <Form.Control
                                            name="promotionInput"
                                            type="text"
                                            placeholder="Tìm theo tên - mã"
                                            onChange={(e) => onChangeFindProduct(e)}
                                        />
                                    </FloatingLabel>
                                </Col>
                            </Row>
                            <DataTable
                                columns={columnsProduct}
                                data={recordProducts}
                                pagination
                                paginationComponentOptions={paginationComponentOptions}
                                highlightOnHover
                                pointerOnHover
                                paginationRowsPerPageOptions={[5, 10, 15]}
                                selectableRows
                                onSelectedRowsChange={handleChange}
                                noDataComponent={noDataComponent()}
                                // onRowClicked={(row) => handleClickTable(row)}
                            />
                        </Row>
                        <Row
                            className="p-3 border-3 border border-black rounded-4 manage-listproduct-container mt-4 ms-3 mb-5">
                            <div className="manage-promotion-title p-3">
                                <div className="title">
                                    <FaAccusoft size={32}/> Danh sách chi tiết sản phẩm
                                </div>
                            </div>
                            <Row className="mb-3 justify-content-md-end">
                                {/*<Col sm="6" xs lg="3">*/}
                                {/*    <FloatingLabel*/}
                                {/*        controlId="floatingInput"*/}
                                {/*        label="Trạng thái"*/}
                                {/*        className="mb-3"*/}
                                {/*    >*/}
                                {/*        <Form.Select*/}
                                {/*            // onChange={(e) => onChangeFilters(e)}*/}
                                {/*            name="promotionStatus"*/}
                                {/*        >*/}
                                {/*            <option value="">Tất Cả</option>*/}
                                {/*            <option value="1">Hoạt Động</option>*/}
                                {/*            <option value="0">Ngừng Hoạt Động</option>*/}
                                {/*        </Form.Select>*/}
                                {/*    </FloatingLabel>*/}
                                {/*</Col>*/}
                                <Col sm="6" xs lg="4">
                                    <FloatingLabel
                                        controlId="floatingInput"
                                        label="Tìm kiếm sản phẩm"
                                        className="mb-3"
                                    >
                                        <Form.Control
                                            name="promotionInput"
                                            type="text"
                                            placeholder="Tìm theo tên - mã"
                                            onChange={(e) => onChangeFindProductDetails(e)}
                                        />
                                    </FloatingLabel>
                                </Col>
                            </Row>
                            <Row>
                                <DataTable
                                    columns={columnsProductDetails}
                                    data={recordProductDetails}
                                    pagination
                                    paginationComponentOptions={paginationComponentOptions}
                                    highlightOnHover
                                    pointerOnHover
                                    paginationRowsPerPageOptions={[5, 10, 15]}
                                    selectableRows
                                    noDataComponent={noDataComponent()}
                                    onSelectedRowsChange={handleChangeProductDetails}
                                />
                            </Row>
                        </Row>
                    </Col>
                </Row>
            </Col>
        </Row>
    </Container>);
};

export default ModifyPromotion;
