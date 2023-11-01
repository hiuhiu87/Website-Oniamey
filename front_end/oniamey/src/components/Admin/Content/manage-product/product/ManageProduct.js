import { React, useState, useEffect } from 'react';
import axios from "axios";
import ReactPaginate from 'react-paginate';
import { Link } from 'react-router-dom';
import { FaFilter, FaThList, FaProductHunt, FaPenSquare, FaAngleLeft, FaAngleRight } from 'react-icons/fa';
import { MdLibraryAdd, MdDeleteSweep } from 'react-icons/md';
import { AiFillEye } from 'react-icons/ai';
import { getAllProducts } from '../../../../../services/apiService';
import { getAllProductDetails } from '../../../../../services/apiService';
import { getAllProductDetailsWithPage } from '../../../../../services/apiService';
import { getAllProductsWithPage } from '../../../../../services/apiService';
import './ManageProduct.scss';
import ModalCreateProduct from './ModalCreateProduct';
import ModalUpdateProduct from './UpdateProduct';
import ModalDeleteProduct from './ModalDeleteProduct';
import { Tabs } from 'antd';
import { Col, Container, Form, Row, Button } from 'react-bootstrap';
import 'antd-button-color/dist/css/style.css';

const ManageProduct = (props) => {

    const imageProductDetail = "D:\\Product\\Website-Oniamey\\front_end\\oniamey\\src\\assets\\uploads\\";

    const { TabPane } = Tabs;

    const [showModalCreateProduct, setShowModalCreateProduct] = useState(false);
    const [showModalUpdateProduct, setShowModalUpdateProduct] = useState(false);
    const [showModalDeleteProduct, setShowModalDeleteProduct] = useState(false);

    const [dataUpdate, setDataUpdate] = useState({});
    const [dataDelete, setDataDelete] = useState({});

    const [listProduct, setListProduct] = useState([]);
    const [productId, setProductId] = useState('');

    const [listProductDetail, setListProductDetail] = useState([]);
    const [productDetailId, setProductDetailId] = useState('');

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
        setProductId(response.data[0].id);
    }

    const fetchListProductDetail = async () => {
        let response = await getAllProductDetails();
        setListProductDetail(response.data);
        setProductDetailId(response.data[0].id);
    }

    const handleClickBtnUpdate = (product) => {
        setDataUpdate(product);
        setProductId(product.id);
        setShowModalUpdateProduct(true);
    }

    const handleClickBtnDelete = (product) => {
        setDataDelete(product);
        setShowModalDeleteProduct(true);
    }

    const resetDataUpdate = () => {
        setDataUpdate({});
    }

    const resetDataDelete = () => {
        setDataDelete({});
    }

    const [products, setProducts] = useState([]);
    const [productDetails, setProductDetails] = useState([]);
    const [pageProduct, setPageProduct] = useState(0);
    const [pageProductDetail, setPageProductDetail] = useState(0);
    const limit = 5;
    const [totalPageProducts, setTotalPageProducts] = useState(0);
    const [totalPageProductDetails, setTotalPageProductDetails] = useState(0);

    useEffect(() => {
        fetchListProductWithPage(pageProduct, limit)
        fetchListProductDetailWithPage(pageProductDetail, limit)
    }, [pageProduct, pageProductDetail]);

    const fetchListProductWithPage = async () => {
        try {
            let res = await getAllProductsWithPage(pageProduct, limit);
            if (res.data.products) {
                setProducts(res.data.products);
                setTotalPageProducts(res.data.totalPages);
            }
        } catch (error) {
            console.error('Lỗi khi gọi API:', error);
        }
    }

    const handlePageProductChange = data => {
        const selectedPage = data.selected;
        setPageProduct(selectedPage);
    };

    const handlePageProductDetailChange = data => {
        const selectedPage = data.selected;
        setPageProductDetail(selectedPage);
    };

    const fetchListProductDetailWithPage = async () => {
        let response = await getAllProductDetailsWithPage(pageProductDetail, limit);
        setProductDetails(response.data.productDetails);
        setTotalPageProductDetails(response.data.totalPages);
    }

    return (
        <div class="manage-product-container">
            <div className='manage-product-title'>
                <div className="title">
                    <FaProductHunt size={32} /> Quản Lý Sản Phẩm
                </div>
            </div>
            {/* <Tabs
                defaultActiveKey="product"
                transition={false}
                id="noanim-tab-example"
                className="mb-3 px-3 ms-3 tab-product"
            >
                <Tab eventKey="product" title="Sản phẩm">
                    <div className='manage-material-search'>
                        <div className='search-material-title'>
                            <div className="title">
                                <FaFilter size={26} /> Bộ Lọc
                            </div>

                        </div>
                        <div className='main-search'>
                            <div className='w-50'>
                                <div class="row mb-3">
                                    <label for="inputEmail3" class="col-sm-2 col-form-label">Sản phẩm</label>
                                    <div class="col d-flex align-content-between">
                                        <input type="text" class="form-control me-4" id="inputEmail3" />
                                        <button type="button" class="btn btn-secondary">Tìm kiếm</button>
                                    </div>
                                </div>
                                <div class="row mb-3">
                                    <label for="inputPassword3" class="col-sm-2 col-form-label">Trạng thái</label>
                                    <div class="col d-flex">
                                        <select class="form-select me-4" id="inputPassword3">
                                            <option value="option1">Option 1</option>
                                            <option value="option2">Option 2</option>
                                            <option value="option3">Option 3</option>
                                        </select>
                                        <button type="button" class="btn btn-secondary">Làm Mới</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='manage-material-table'>
                        <div className='list-material-title'>
                            <div className="title">
                                <FaThList size={26} /> Danh Sách Sản Phẩm
                            </div>
                            <Link to="/admins/add-products">
                                <button type="button" class="btn btn-dark btn-add">
                                    <MdLibraryAdd /> Thêm
                                </button>
                            </Link>

                        </div>
                        <table className="table">
                            <thead>
                                <tr>
                                    <th scope="col" className='px-1 text-center'>
                                        <input type="checkbox" checked={selectAll} onChange={handleSelectAll} />
                                    </th>
                                    <th scope="col" className='px-5 text-center'>#</th>
                                    <th scope="col" className='px-5 text-center'>Mã sản phẩm</th>
                                    <th scope="col" className='px-5 text-center'>Tên sản phẩm</th>
                                    <th scope="col" className='px-5 text-center'>Ngày cập nhật</th>
                                    <th scope="col" className='px-5 text-center'>Trạng thái</th>
                                    <th scope="col" className='px-5 text-center'>Hành động</th>
                                </tr>
                            </thead>
                            <tbody>
                                {listProduct.length > 0 && listProduct.map((item, index) => {
                                    return (
                                        <tr key={`table-material-${index}`} className="room">
                                            <td className="text-center">
                                                <input type="checkbox" checked={selectedItems[index]} onChange={() => handleSelectRow(index)} />
                                            </td>
                                            <td className="text-center">{index + 1}</td>
                                            <td className="text-center">{item.code}</td>
                                            <td className="text-center">{item.productName}</td>
                                            <td className="text-center">{item.updatedAt}</td>
                                            <td className="text-center">{item.deleted === false ? 'Active' : 'DeActive'}</td>
                                            <td className="text-center">
                                                <div className="d-flex justify-content-center align-items-center">
                                                    <button className="btn-update btn btn-dark mx-3 short-button"
                                                        onClick={() => handleClickBtnUpdate(item)}
                                                    >
                                                        <FaPenSquare color='#ffffff' />
                                                    </button>
                                                    <button className="btn-delete btn btn-dark short-button"
                                                        onClick={() => handleClickBtnDelete(item)}
                                                    >
                                                        <MdDeleteSweep />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                })}
                                {listProduct && listProduct.length === 0 &&
                                    <tr>
                                        <td colSpan={7} className='text-center'>
                                            Không có dữ liệu!
                                        </td>
                                    </tr>
                                }
                            </tbody>
                        </table>
                    </div>
                </Tab>
                <Tab eventKey="product-detail" title="Sản phẩm chi tiết">
                    <div className='manage-material-search'>
                        <div className='search-material-title'>
                            <div className="title">
                                <FaFilter size={26} /> Bộ Lọc
                            </div>

                        </div>
                        <div className='main-search'>
                            <div className='w-50'>
                                <div class="row mb-3">
                                    <label for="inputEmail3" class="col-sm-2 col-form-label">Sản phẩm</label>
                                    <div class="col d-flex align-content-between">
                                        <input type="text" class="form-control me-4" id="inputEmail3" />
                                        <button type="button" class="btn btn-secondary">Tìm kiếm</button>
                                    </div>
                                </div>
                                <div class="row mb-3">
                                    <label for="inputPassword3" class="col-sm-2 col-form-label">Trạng thái</label>
                                    <div class="col d-flex">
                                        <select class="form-select me-4" id="inputPassword3">
                                            <option value="option1">Option 1</option>
                                            <option value="option2">Option 2</option>
                                            <option value="option3">Option 3</option>
                                        </select>
                                        <button type="button" class="btn btn-secondary">Làm mới</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='manage-material-table'>
                        <div className='list-material-title'>
                            <div className="title">
                                <FaThList size={26} /> Danh Sách Sản Phẩm Chi Tiết
                            </div>
                            <button type="button" class="btn btn-dark">
                                <MdLibraryAdd /> Thêm</button>

                        </div>
                        <table className="table">
                            <thead style={{ backgroundColor: "black" }}>
                                <tr>
                                    <th scope="col" className='px-1 text-center'>
                                        <input type="checkbox" checked={selectAll} onChange={handleSelectAll} />
                                    </th>
                                    <th scope="col" className='px-5 text-center'>#</th>
                                    <th scope="col" className='px-5 text-center'>Ảnh</th>
                                    <th scope="col" className='px-5 text-center'>Tên</th>
                                    <th scope="col" className='px-5 text-center'>SL</th>
                                    <th scope="col" className='px-5 text-center'>GB</th>
                                    <th scope="col" className='px-5 text-center'>KC</th>
                                    <th scope="col" className='px-5 text-center'>Màu</th>
                                    <th scope="col" className='px-5 text-center'>TT</th>
                                    <th scope="col" className='px-5 text-center'>Hành động</th>
                                </tr>
                            </thead>
                            <tbody>
                                {listProductDetail.length > 0 && listProductDetail.map((item, index) => {
                                    return (
                                        <tr key={`table-material-${index}`} className="room">
                                            <td className="text-center">
                                                <input type="checkbox" checked={selectedItems[index]} onChange={() => handleSelectRow(index)} />
                                            </td>
                                            <td className="text-center">{index + 1}</td>
                                            <td className="text-center">
                                                <img src={`${imageProductDetail}${item.imageUrl}`} />
                                            </td>
                                            <td className="text-center">{item.name}</td>
                                            <td className="text-center">{item.quantity}</td>
                                            <td className="text-center">{item.price}</td>
                                            <td className="text-center">{item.size}</td>
                                            <td className="text-center">{item.color}</td>
                                            <td className="text-center">{item.deleted === false ? 'Active' : 'DeActive'}</td>
                                            <td className="text-center">
                                                <div className="d-flex justify-content-center align-items-center">
                                                    <button className="btn-update btn btn-dark mx-3 short-button"
                                                        onClick={() => handleClickBtnUpdate(item)}
                                                    >
                                                        <FaPenSquare color='#ffffff' />
                                                    </button>
                                                    <button className="btn-delete btn btn-dark short-button"
                                                        onClick={() => handleClickBtnDelete(item)}
                                                    >
                                                        <MdDeleteSweep />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                })}
                                {listProduct && listProduct.length === 0 &&
                                    <tr>
                                        <td colSpan={7} className='text-center'>
                                            Không có dữ liệu!
                                        </td>
                                    </tr>
                                }
                            </tbody>
                        </table>
                    </div>
                </Tab >
            </Tabs > */}
            <Tabs defaultActiveKey="1" className="mb-3 px-3 tab-product">
                <TabPane
                    tab={
                        <span>
                            <FaProductHunt size={15} className='mb-1 mx-1' /> Sản Phẩm
                        </span>
                    }
                    key="1"
                >
                    <div className='manage-product-search'>
                        <div className='search-product-title'>
                            <div className="title">
                                <FaFilter size={26} /> Bộ Lọc
                            </div>

                        </div>
                        <Form>
                            <Row className="mb-3 justify-content-md-center ">
                                <Form.Label column sm="1">
                                    Sản phẩm
                                </Form.Label>
                                <Col sm="6" xs lg="4">
                                    <Form.Control type="text" />
                                </Col>
                                <Col xs lg="1">
                                    <Button variant="secondary">Tìm Kiếm</Button>
                                </Col>
                            </Row>
                            <Row className="mb-3 justify-content-md-center">
                                <Form.Label column sm="1">
                                    Trạng Thái
                                </Form.Label>
                                <Col sm="6" xs lg="4">
                                    <Form.Select>
                                        <option value="option1">Option 1</option>
                                        <option value="option2">Option 2</option>
                                        <option value="option3">Option 3</option>
                                    </Form.Select>
                                </Col>
                                <Col xs lg="1">
                                    <Button variant="secondary">Tìm Kiếm</Button>
                                </Col>
                            </Row>
                        </Form>

                    </div>
                    <div className='manage-product-table'>
                        <div className='list-product-title'>
                            <div className="title">
                                <FaThList size={26} /> Danh Sách Sản Phẩm
                            </div>
                            <Link to="/admins/add-products">
                                <button type="button" class="btn btn-dark btn-add">
                                    <MdLibraryAdd /> Thêm
                                </button>
                            </Link>

                        </div>
                        <table className="table">
                            <thead>
                                <tr>
                                    <th scope="col" className='px-5 text-center'>#</th>
                                    <th scope="col" className='px-5 text-center'>Mã sản phẩm</th>
                                    <th scope="col" className='px-5 text-center'>Tên sản phẩm</th>
                                    <th scope="col" className='px-5 text-center'>Số lượng</th>
                                    <th scope="col" className='px-5 text-center'>Trạng thái</th>
                                    <th scope="col" className='px-5 text-center'>Hành động</th>
                                </tr>
                            </thead>
                            <tbody>
                                {products.map((product, index) => (
                                    <tr key={`table-product-${index}`} className="room">
                                        <td className="text-center">{index + 1}</td>
                                        <td className="text-center">{product.code}</td>
                                        <td className="text-center">{product.productName}</td>
                                        <td className="text-center">{product.quantity}</td>
                                        <td className="text-center">{product.deleted === false ? 'Hoạt động' : 'Ngừng hoạt động'}</td>
                                        <td className="text-center">
                                            <div className="d-flex justify-content-center align-items-center">
                                                <button className="btn-delete btn btn-dark short-button"
                                                    onClick={() => handleClickBtnDelete(product)}
                                                >
                                                    <AiFillEye />
                                                </button>
                                                <Link to={`/admins/update-products/${product.id}`} state={{ productName: product.productName }}>
                                                    <button className="btn-update btn btn-dark mx-3 short-button"
                                                        onClick={() => handleClickBtnUpdate(product)}
                                                    >
                                                        <FaPenSquare color='#ffffff' />
                                                    </button>
                                                </Link>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <div className='justify-content-center'>
                            <ReactPaginate
                                previousLabel={<FaAngleLeft size={25} />}
                                nextLabel={<FaAngleRight size={25} />}
                                breakLabel={'...'}
                                pageCount={totalPageProducts}
                                marginPagesDisplayed={2}
                                pageRangeDisplayed={5}
                                onPageChange={handlePageProductChange}
                                containerClassName={'pagination'}
                                subContainerClassName={'pages pagination'}
                            />
                        </div>
                    </div>
                </TabPane>
                <TabPane
                    tab={
                        <span>
                            <FaProductHunt size={15} className='mb-1 mx-1' /> Sản Phẩm Chi Tiết
                        </span>
                    }
                    key="2"
                >
                    <div className='manage-product-search'>
                        <div className='search-product-title'>
                            <div className="title">
                                <FaFilter size={26} /> Bộ Lọc
                            </div>

                        </div>
                        <Form>
                            <Row className="mb-3 justify-content-md-center ">
                                {/* <Form.Label column sm="1">
                                    Sản phẩm
                                </Form.Label> */}
                                <Col sm="6" xs lg="8">
                                    <Form.Control type="text" />
                                </Col>
                            </Row>
                            <Row className="mt-2 mb-3 justify-content-md-center">
                                <Col lg="3">
                                    <div className="col-md-2">
                                        <div className='d-flex justify-content-between align-items-center'>
                                            <div className="form-floating">
                                                <select className="form-select" style={{ minWidth: '200px' }}>
                                                    <option value="">Chọn</option>
                                                    {/* {listBrand.map(brand => (
                                            <option key={brand.id} value={brand.id}>
                                                {brand.name}
                                            </option>
                                        ))} */}
                                                </select>
                                                <label htmlFor="floatingSelectGrid" className='text-floating'>Thương hiệu</label>
                                            </div>
                                            <button type="button" className="btn btn-dark ms-2 btn-add-property"><MdLibraryAdd /></button>
                                        </div>
                                    </div>
                                </Col>
                                <Col lg="3">
                                    <div class="col-md-2">
                                        <div className='d-flex justify-content-between align-items-center'>
                                            <div className="form-floating">
                                                <select className="form-select" style={{ minWidth: '200px' }}>
                                                    <option value="">Chọn</option>
                                                    {/* {listCategory.map(category => (
                                            <option key={category.id} value={category.id}>
                                                {category.name}
                                            </option>
                                        ))} */}
                                                </select>
                                                <label htmlFor="floatingSelectGrid" className='text-floating'>Danh mục</label>
                                            </div>
                                            <button type="button" className="btn btn-dark ms-2 btn-add-property"><MdLibraryAdd /></button>
                                        </div>
                                    </div>
                                </Col>
                                <Col lg="4">
                                    <div class="col-md-2">
                                        <div className='d-flex justify-content-between align-items-center'>
                                            <div className="form-floating">
                                                <select className="form-select" style={{ minWidth: '200px' }}>
                                                    <option value="">Chọn</option>
                                                    {/* {listMaterial.map(material => (
                                            <option key={material.id} value={material.id}>
                                                {material.name}
                                            </option>
                                        ))} */}
                                                </select>
                                                <label htmlFor="floatingSelectGrid" className='text-floating'>Chất liệu</label>
                                            </div>
                                            <button type="button" className="btn btn-dark ms-2 btn-add-property"><MdLibraryAdd /></button>
                                        </div>
                                    </div>
                                </Col>
                            </Row>
                            <Row className="mt-3 mb-3">
                                <Col xs lg="3">
                                    <div class="col-md-2">
                                        <div className='d-flex justify-content-between align-items-center'>
                                            <div className="form-floating">
                                                <select className="form-select" style={{ minWidth: '200px' }}>
                                                    <option value="">Chọn</option>
                                                    {/* {listCollar.map(collar => (
                                            <option key={collar.id} value={collar.id}>
                                                {collar.name}
                                            </option>
                                        ))} */}
                                                </select>
                                                <label htmlFor="floatingSelectGrid" className='text-floating'>Cổ áo</label>
                                            </div>
                                            <button type="button" className="btn btn-dark ms-2 btn-add-property"><MdLibraryAdd /></button>
                                        </div>
                                    </div>
                                </Col>
                                <Col xs lg="3">
                                    <div class="col-md-2">
                                        <div className='d-flex justify-content-between align-items-center'>
                                            <div className="form-floating">
                                                <select className="form-select" style={{ minWidth: '200px' }}>
                                                    <option value="">Chọn</option>
                                                    {/* {listSleeveLength.map(sleeveLength => (
                                            <option key={sleeveLength.id} value={sleeveLength.id}>
                                                {sleeveLength.name}
                                            </option>
                                        ))} */}
                                                </select>
                                                <label htmlFor="floatingSelectGrid" className='text-floating'>Chiều dài tay</label>
                                            </div>
                                            <button type="button" className="btn btn-dark ms-2 btn-add-property"><MdLibraryAdd /></button>
                                        </div>
                                    </div>
                                </Col>
                                <Col xs lg="3">
                                    <div class="col-md-2">
                                        <div className='d-flex justify-content-between align-items-center'>
                                            <div className="form-floating">
                                                <select className="form-select" style={{ minWidth: '200px' }}>
                                                    <option value="">Chọn</option>
                                                    {/* {listSleeveLength.map(sleeveLength => (
                                            <option key={sleeveLength.id} value={sleeveLength.id}>
                                                {sleeveLength.name}
                                            </option>
                                        ))} */}
                                                </select>
                                                <label htmlFor="floatingSelectGrid" className='text-floating'>Màu sắc</label>
                                            </div>
                                            <button type="button" className="btn btn-dark ms-2 btn-add-property"><MdLibraryAdd /></button>
                                        </div>
                                    </div>
                                </Col>
                                <Col xs lg="2">
                                    <div class="col-md-2">
                                        <div className='d-flex justify-content-between align-items-center'>
                                            <div className="form-floating">
                                                <select className="form-select" style={{ minWidth: '200px' }}>
                                                    <option value="">Chọn</option>
                                                    {/* {listSleeveLength.map(sleeveLength => (
                                            <option key={sleeveLength.id} value={sleeveLength.id}>
                                                {sleeveLength.name}
                                            </option>
                                        ))} */}
                                                </select>
                                                <label htmlFor="floatingSelectGrid" className='text-floating'>Màu sắc</label>
                                            </div>
                                            <button type="button" className="btn btn-dark ms-2 btn-add-property"><MdLibraryAdd /></button>
                                        </div>
                                    </div>
                                </Col>
                            </Row>
                            <Row>
                                <Col xs={6}>
                                    <div className="col-md-12">
                                        <label className="form-label">Số lượng</label>
                                        <input
                                            type="number"
                                            className="form-control"
                                        />
                                    </div>
                                </Col>
                                <Col xs={6}>
                                    <div className="col-md-12">
                                        <label className="form-label">Giá bán</label>
                                        <input
                                            type="number"
                                            className="form-control"
                                        />
                                    </div>
                                </Col>
                            </Row>
                        </Form>
                    </div>
                    <div className='manage-product-table'>
                        <div className='list-product-title'>
                            <div className="title">
                                <FaThList size={26} /> Danh Sách Sản Phẩm Chi Tiết
                            </div>
                        </div>
                        <table className="table">
                            <thead style={{ backgroundColor: "black" }}>
                                <tr>
                                    <th scope="col" className='px-3 text-center'>#</th>
                                    <th scope="col" className='px-5 text-center'>Ảnh</th>
                                    <th scope="col" className='px-5 text-center'>Tên</th>
                                    <th scope="col" className='px-4 text-center'>Số lượng</th>
                                    <th scope="col" className='px-4 text-center'>Giá bán</th>
                                    <th scope="col" className='px-4 text-center'>Kích cỡ</th>
                                    <th scope="col" className='px-4 text-center'>Màu</th>
                                    <th scope="col" className='px-4 text-center'>Trạng thái</th>
                                    <th scope="col" className='px-3 text-center'>Hành động</th>
                                </tr>
                            </thead>
                            <tbody>
                                {productDetails.length > 0 && productDetails.map((item, index) => {
                                    return (
                                        <tr key={`table-product-${index}`} className="room">
                                            <td className="text-center">{index + 1}</td>
                                            <td className="text-center">
                                                <img src={`${imageProductDetail}${item.imageUrl}`} />
                                            </td>
                                            <td className="text-center">{item.name}</td>
                                            <td className="text-center">{item.quantity}</td>
                                            <td className="text-center">{item.price}</td>
                                            <td className="text-center">{item.size}</td>
                                            <td className="text-center">{item.color}</td>
                                            <td className="text-center">{item.deleted === false ? 'Hoạt động' : 'Ngừng hoạt động'}</td>
                                            <td className="text-center">
                                                <div className="d-flex justify-content-center align-items-center">
                                                    <button className="btn-update btn btn-dark mx-3 short-button"
                                                        onClick={() => handleClickBtnUpdate(item)}
                                                    >
                                                        <FaPenSquare color='#ffffff' />
                                                    </button>
                                                    <button className="btn-delete btn btn-dark short-button"
                                                        onClick={() => handleClickBtnDelete(item)}
                                                    >
                                                        <MdDeleteSweep />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                })}
                                {listProduct && listProduct.length === 0 &&
                                    <tr>
                                        <td colSpan={7} className='text-center'>
                                            Không có dữ liệu!
                                        </td>
                                    </tr>
                                }
                            </tbody>
                        </table>
                        <div className='justify-content-center'>
                            <ReactPaginate
                                previousLabel={<FaAngleLeft size={25} />}
                                nextLabel={<FaAngleRight size={25} />}
                                breakLabel={'...'}
                                pageCount={totalPageProductDetails}
                                marginPagesDisplayed={2}
                                pageRangeDisplayed={5}
                                onPageChange={handlePageProductDetailChange}
                                containerClassName={'pagination'}
                                subContainerClassName={'pages pagination'}
                            />
                        </div>
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
        </div >
    );
}

export default ManageProduct;