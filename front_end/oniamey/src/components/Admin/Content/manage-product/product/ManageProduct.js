import { React, useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { FaFilter, FaThList, FaProductHunt, FaPenSquare } from "react-icons/fa";
import { MdLibraryAdd, MdDeleteSweep } from "react-icons/md";
import { AiFillEye } from "react-icons/ai";
import { getAllProducts } from "../../../../../services/apiService";
import { getAllProductDetails } from "../../../../../services/apiService";
import "./ManageProduct.scss";
import ModalCreateProduct from "./ModalCreateProduct";
import ModalDeleteProduct from "./ModalDeleteProduct";
import { Tabs, Slider } from "antd";
import { Col, Form, Row, Button } from "react-bootstrap";
import "antd-button-color/dist/css/style.css";
import DataTable from "react-data-table-component";
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import { Spin } from 'antd';

const ManageProduct = (props) => {
    const { TabPane } = Tabs;

    const [showModalCreateProduct, setShowModalCreateProduct] = useState(false);
    const [showModalDeleteProduct, setShowModalDeleteProduct] = useState(false);

    const [dataUpdate, setDataUpdate] = useState({});
    const [dataDelete, setDataDelete] = useState({});

    const [listProduct, setListProduct] = useState([]);
    const [productId, setProductId] = useState("");

    const [listProductDetail, setListProductDetail] = useState([]);
    const [productDetailId, setProductDetailId] = useState("");

    const [selectAll, setSelectAll] = useState(false);
    const [selectedItems, setSelectedItems] = useState({});

    const handleSelectAll = () => {
        const newSelectedItems = {};
        listProduct.forEach((item, index) => {
            newSelectedItems[index] = !selectAll;
        });
        setSelectedItems(newSelectedItems);
        setSelectAll(!selectAll);
    };

    const handleSelectRow = (index) => {
        const newSelectedItems = { ...selectedItems };
        newSelectedItems[index] = !selectedItems[index];
        setSelectedItems(newSelectedItems);
    };

    useEffect(() => {
        fetchListProduct();
        fetchListProductDetail();
    }, []);

    const fetchListProduct = async () => {
        let response = await getAllProducts();
        setListProduct(response.data);
    };

    const fetchListProductDetail = async () => {
        let response = await getAllProductDetails();
        setListProductDetail(response.data);
    };

    const handleClickBtnUpdate = (product) => {
        setDataUpdate(product);
        setProductId(product.id);
    };

    const handleClickBtnDelete = (product) => {
        setDataDelete(product);
        setShowModalDeleteProduct(true);
    };

    const resetDataUpdate = () => {
        setDataUpdate({});
    };

    const resetDataDelete = () => {
        setDataDelete({});
    };

    const columnsProduct = [
        {
            name: "STT",
            selector: (row) => listProduct.indexOf(row) + 1,
            minWidth: "40px",
            maxWidth: "80px",
            center: "true",
        },
        {
            name: "Mã sản phẩm",
            selector: (row) => row.code,
            center: "true",
        },
        {
            name: "Tên sản phẩm",
            selector: (row) => row.productName,
            center: "true",
        },
        {
            name: "Số lượng",
            selector: (row) => row.quantity,
            center: "true",
        },
        {
            name: "Trạng thái",
            selector: (row) =>
                row.deleted === false ? "Hoạt động" : "Ngừng hoạt động",
            center: "true",
        },
        {
            name: "Hành động",
            cell: (row) => (
                <>
                    <Link
                        className="btn btn-dark me-2 w-25"
                        onClick={() => handleClickBtnUpdate(row)}
                        to={`/admins/update-products/${row.id}`}
                        state={{ productName: row.productName }}
                    >
                        <FaPenSquare color="#ffffff" />
                    </Link>
                    <Button
                        variant="dark"
                        className=" w-25"
                        onClick={() => handleClickBtnDelete(row)}
                    >
                        <MdDeleteSweep />
                    </Button>
                </>
            ),
            center: "true",
        },
    ];

    const columnsProductDetail = [
        {
            name: "STT",
            selector: (row) => listProductDetail.indexOf(row) + 1,
            minWidth: "40px",
            maxWidth: "80px",
            center: "true",
        },
        {
            name: "Ảnh",
            cell: (row) => (
                <div
                    className="text-center image-product-detail"
                    style={{ verticalAlign: "middle", width: "100px" }}
                >
                    <img
                        style={{ width: "100%", padding: "5px" }}
                        src={`https://upload-product-image-file.s3.us-west-2.amazonaws.com/${row.cover}`}
                    />
                </div>
            ),
            center: "true",
        },
        {
            name: "Tên sản phẩm",
            selector: (row) => row.name,
            center: "true",
        },
        {
            name: "Số lượng",
            selector: (row) => row.quantity,
            center: "true",
        },
        {
            name: "Giá bán",
            selector: (row) => row.price,
            center: "true",
        },
        {
            name: "Kích cỡ",
            selector: (row) => row.size,
            center: "true",
        },
        {
            name: "Màu sắc",
            selector: (row) => row.color,
            center: "true",
        },
        {
            name: "Trạng thái",
            selector: (row) =>
                row.deleted === false ? "Hoạt động" : "Ngừng hoạt động",
            center: "true",
        },
        {
            name: "Hành động",
            cell: (row) => (
                <>
                    <Button
                        type="button"
                        variant="dark"
                        className="me-2"
                        onClick={() => handleClickBtnUpdate(row)}
                    >
                        <FaPenSquare color="#ffffff" />
                    </Button>
                    <Button
                        type="button"
                        variant="dark"
                        onClick={() => handleClickBtnDelete(row)}
                    >
                        <MdDeleteSweep />
                    </Button>
                </>
            ),
            center: "true",
        },
    ];

    const paginationComponentOptions = {
        rowsPerPageText: "Số Bản Ghi Một Trang",
        rangeSeparatorText: "Trên",
        selectAllRowsItem: true,
        selectAllRowsItemText: "Tất Cả",
    };

    return (
        <div className="manage-product-container">
            <div className="manage-product-title">
                <div className="title">
                    <FaProductHunt size={32} /> Quản Lý Sản Phẩm
                </div>
            </div>
            <Tabs defaultActiveKey="1" className="mb-3 px-3 tab-product">
                <TabPane
                    tab={
                        <span>
              <FaProductHunt size={15} className="mb-1 mx-1" /> Sản Phẩm
            </span>
                    }
                    key="1"
                >
                    <div className="manage-product-search">
                        <div className="search-product-title">
                            <div className="title">
                                <FaFilter size={26} /> Bộ Lọc
                            </div>
                        </div>
                        <Form>
                            <Row className="justify-content-md-center">
                                <Col lg="4">
                                    <FloatingLabel
                                        controlId="floatingInput"
                                        label="Tìm kiếm"
                                    >
                                        <Form.Control type="text" placeholder="name@example.com" />
                                    </FloatingLabel>
                                </Col>
                                <Col lg="2">
                                    <FloatingLabel controlId="floatingSelect" label="Trạng thái">
                                        <Form.Select>
                                            <option>Tất cả</option>
                                            <option value={false}>Hoạt động</option>
                                            <option value={true}>Ngừng hoạt động</option>
                                        </Form.Select>
                                    </FloatingLabel>
                                </Col>
                                <Col lg="2" className="mt-1">
                                    Số lượng
                                    <Slider defaultValue={0} />
                                </Col>
                            </Row>
                        </Form>
                    </div>
                    <div className="manage-product-table">
                        <div className="list-product-title">
                            <div className="title">
                                <FaThList size={26} /> Danh Sách Sản Phẩm
                            </div>
                            <Link to="/admins/add-products">
                                <button type="button" className="btn btn-dark">
                                    <MdLibraryAdd /> Thêm Sản Phẩm
                                </button>
                            </Link>
                        </div>
                        <DataTable
                            rounded-3
                            columns={columnsProduct}
                            data={listProduct}
                            pagination
                            paginationComponentOptions={paginationComponentOptions}
                            highlightOnHover
                            pointerOnHover
                            paginationRowsPerPageOptions={[5, 10, 15]}
                            // onRowClicked={(row) => handleClickTable(row)}
                        />
                    </div>
                </TabPane>
                <TabPane
                    tab={
                        <span>
              <FaProductHunt size={15} className="mb-1 mx-1" /> Sản Phẩm Chi
              Tiết
            </span>
                    }
                    key="2"
                >
                    <div className="manage-product-detail-search">
                        <div className="search-product-detail-title">
                            <div className="title">
                                <FaFilter size={26} /> Bộ Lọc
                            </div>
                        </div>
                        <Form>
                            <Row className="mb-3 justify-content-md-center ">
                                <Col lg="5">
                                    <FloatingLabel
                                        controlId="floatingInput"
                                        label="Tìm kiếm"
                                    >
                                        <Form.Control type="text" placeholder="name@example.com" />
                                    </FloatingLabel>
                                </Col>
                            </Row>
                            <Row className="mb-3 justify-content-md-center ">
                                <Col lg="2">
                                    <FloatingLabel controlId="floatingSelect" label="Thương hiệu">
                                        <Form.Select aria-label="Floating label select example">
                                            <option>Tất cả</option>
                                            {/* {listBrand.map(brand => (
                                            <option key={brand.id} value={brand.id}>
                                                {brand.name}
                                            </option>
                                        ))} */}
                                        </Form.Select>
                                    </FloatingLabel>
                                </Col>
                                <Col lg="2">
                                    <FloatingLabel controlId="floatingSelect" label="Danh mục">
                                        <Form.Select aria-label="Floating label select example">
                                            <option value="">Tất cả</option>
                                            {/* {listCategory.map(category => (
                                            <option key={category.id} value={category.id}>
                                                {category.name}
                                            </option>
                                        ))} */}
                                        </Form.Select>
                                    </FloatingLabel>
                                </Col>
                                <Col lg="2">
                                    <FloatingLabel controlId="floatingSelect" label="Chất liệu">
                                        <Form.Select aria-label="Floating label select example">
                                            <option value="">Tất cả</option>
                                            {/* {listMaterial.map(material => (
                                            <option key={material.id} value={material.id}>
                                                {material.name}
                                            </option>
                                        ))} */}
                                        </Form.Select>
                                    </FloatingLabel>
                                </Col>
                                <Col lg="2">
                                    <FloatingLabel controlId="floatingSelect" label="Cổ áo">
                                        <Form.Select aria-label="Floating label select example">
                                            <option value="">Tất cả</option>
                                            {/* {listCollar.map(collar => (
                                            <option key={collar.id} value={collar.id}>
                                                {collar.name}
                                            </option>
                                        ))} */}
                                        </Form.Select>
                                    </FloatingLabel>
                                </Col>
                            </Row>
                            <Row className="mb-3 justify-content-md-center ">
                                <Col lg="2">
                                    <FloatingLabel controlId="floatingSelect" label="Chiều dài tay">
                                        <Form.Select aria-label="Floating label select example">
                                            <option value="">Tất cả</option>
                                            <option value="">Tất cả</option>
                                            {/* {listSleeveLength.map(sleeveLength => (
                                            <option key={sleeveLength.id} value={sleeveLength.id}>
                                                {sleeveLength.name}
                                            </option>
                                        ))} */}
                                        </Form.Select>
                                    </FloatingLabel>
                                </Col>
                                <Col lg="2">
                                    <FloatingLabel controlId="floatingSelect" label="Màu sắc">
                                        <Form.Select aria-label="Floating label select example">
                                            <option value="">Tất cả</option>
                                            {/* {listSleeveLength.map(sleeveLength => (
                                            <option key={sleeveLength.id} value={sleeveLength.id}>
                                                {sleeveLength.name}
                                            </option>
                                        ))} */}
                                        </Form.Select>
                                    </FloatingLabel>
                                </Col>
                                <Col lg="2">
                                    <FloatingLabel controlId="floatingSelect" label="Kích cỡ">
                                        <Form.Select aria-label="Floating label select example">
                                            <option value="">Tất cả</option>
                                            {/* {listSleeveLength.map(sleeveLength => (
                                            <option key={sleeveLength.id} value={sleeveLength.id}>
                                                {sleeveLength.name}
                                            </option>
                                        ))} */}
                                        </Form.Select>
                                    </FloatingLabel>
                                </Col>
                                <Col lg="2" className="mt-1">
                                    Khoảng giá
                                    <Slider
                                        range
                                        step={1}
                                        defaultValue={[0, 50]}
                                    />
                                </Col>
                                <Col lg="2" className="mt-1">
                                    Số lượng
                                    <Slider defaultValue={0} />
                                </Col>
                            </Row>
                        </Form>
                    </div>
                    <div className="manage-product-detail-table">
                        <div className="list-product-detail-title">
                            <div className="title">
                                <FaThList size={26} /> Danh Sách Sản Phẩm Chi Tiết
                            </div>
                        </div>
                        <DataTable
                            rounded-3
                            columns={columnsProductDetail}
                            data={listProductDetail}
                            pagination
                            paginationComponentOptions={paginationComponentOptions}
                            highlightOnHover
                            pointerOnHover
                            paginationRowsPerPageOptions={[5, 10, 15]}
                            // onRowClicked={(row) => handleClickTable(row)}
                        />
                    </div>
                </TabPane>
            </Tabs>
            <ModalCreateProduct
                show={showModalCreateProduct}
                setShow={setShowModalCreateProduct}
                fetchListProduct={fetchListProduct}
                productId={productId}
            />
            <ModalDeleteProduct
                show={showModalDeleteProduct}
                setShow={setShowModalDeleteProduct}
                fetchListProduct={fetchListProduct}
                dataDelete={dataDelete}
                resetDataDelete={resetDataDelete}
            />
        </div>
    );
};

export default ManageProduct;