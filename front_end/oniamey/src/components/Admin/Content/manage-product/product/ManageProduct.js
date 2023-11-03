import { React, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaFilter, FaThList, FaProductHunt, FaPenSquare } from 'react-icons/fa';
import { MdLibraryAdd, MdDeleteSweep } from 'react-icons/md';
import { AiFillEye } from 'react-icons/ai';
import { getAllProducts } from '../../../../../services/apiService';
import { getAllProductDetails } from '../../../../../services/apiService';
import './ManageProduct.scss';
import ModalCreateProduct from './ModalCreateProduct';
import ModalDeleteProduct from './ModalDeleteProduct';
import { Tabs, Slider } from 'antd';
import { Col, Form, Row, Button } from 'react-bootstrap';
import 'antd-button-color/dist/css/style.css';

const ManageProduct = (props) => {

    const { TabPane } = Tabs;

    const [showModalCreateProduct, setShowModalCreateProduct] = useState(false);
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

    return (
        <div class="manage-product-container">
            <div className='manage-product-title'>
                <div className="title">
                    <FaProductHunt size={32} /> Quản Lý Sản Phẩm
                </div>
            </div>
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
                                {listProduct.map((product, index) => (
                                    <tr key={`table-product-${index}`} className="room">
                                        <td className="text-center">{index + 1}</td>
                                        <td className="text-center">{product.code}</td>
                                        <td className="text-center">{product.productName}</td>
                                        <td className="text-center">{product.quantity}</td>
                                        <td className="text-center">{product.deleted === false ? 'Hoạt động' : 'Ngừng hoạt động'}</td>
                                        <td className="text-center">
                                            <div className="d-flex justify-content-center align-items-center">
                                                <Link to={`/admins/update-products/${product.id}`} state={{ productName: product.productName }}>
                                                    <button className="btn-update btn btn-dark mx-3 short-button"
                                                        onClick={() => handleClickBtnUpdate(product)}
                                                    >
                                                        <FaPenSquare color='#ffffff' />
                                                    </button>
                                                </Link>
                                                <button className="btn-delete btn btn-dark short-button"
                                                // onClick={() => handleClickBtnDelete(item)}
                                                >
                                                    <MdDeleteSweep />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
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
                                                    <option value="">Tất cả</option>
                                                    {/* {listBrand.map(brand => (
                                            <option key={brand.id} value={brand.id}>
                                                {brand.name}
                                            </option>
                                        ))} */}
                                                </select>
                                                <label htmlFor="floatingSelectGrid" className='text-floating'>Thương hiệu</label>
                                            </div>
                                        </div>
                                    </div>
                                </Col>
                                <Col lg="3">
                                    <div class="col-md-2">
                                        <div className='d-flex justify-content-between align-items-center'>
                                            <div className="form-floating">
                                                <select className="form-select" style={{ minWidth: '200px' }}>
                                                    <option value="">Tất cả</option>
                                                    {/* {listCategory.map(category => (
                                            <option key={category.id} value={category.id}>
                                                {category.name}
                                            </option>
                                        ))} */}
                                                </select>
                                                <label htmlFor="floatingSelectGrid" className='text-floating'>Danh mục</label>
                                            </div>
                                        </div>
                                    </div>
                                </Col>
                                <Col lg="4">
                                    <div class="col-md-2">
                                        <div className='d-flex justify-content-between align-items-center'>
                                            <div className="form-floating">
                                                <select className="form-select" style={{ minWidth: '200px' }}>
                                                    <option value="">Tất cả</option>
                                                    {/* {listMaterial.map(material => (
                                            <option key={material.id} value={material.id}>
                                                {material.name}
                                            </option>
                                        ))} */}
                                                </select>
                                                <label htmlFor="floatingSelectGrid" className='text-floating'>Chất liệu</label>
                                            </div>
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
                                                    <option value="">Tất cả</option>
                                                    {/* {listCollar.map(collar => (
                                            <option key={collar.id} value={collar.id}>
                                                {collar.name}
                                            </option>
                                        ))} */}
                                                </select>
                                                <label htmlFor="floatingSelectGrid" className='text-floating'>Cổ áo</label>
                                            </div>
                                        </div>
                                    </div>
                                </Col>
                                <Col xs lg="3">
                                    <div class="col-md-2">
                                        <div className='d-flex justify-content-between align-items-center'>
                                            <div className="form-floating">
                                                <select className="form-select" style={{ minWidth: '200px' }}>
                                                    <option value="">Tất cả</option>
                                                    {/* {listSleeveLength.map(sleeveLength => (
                                            <option key={sleeveLength.id} value={sleeveLength.id}>
                                                {sleeveLength.name}
                                            </option>
                                        ))} */}
                                                </select>
                                                <label htmlFor="floatingSelectGrid" className='text-floating'>Chiều dài tay</label>
                                            </div>
                                        </div>
                                    </div>
                                </Col>
                                <Col xs lg="3">
                                    <div class="col-md-2">
                                        <div className='d-flex justify-content-between align-items-center'>
                                            <div className="form-floating">
                                                <select className="form-select" style={{ minWidth: '200px' }}>
                                                    <option value="">Tất cả</option>
                                                    {/* {listSleeveLength.map(sleeveLength => (
                                            <option key={sleeveLength.id} value={sleeveLength.id}>
                                                {sleeveLength.name}
                                            </option>
                                        ))} */}
                                                </select>
                                                <label htmlFor="floatingSelectGrid" className='text-floating'>Màu sắc</label>
                                            </div>
                                        </div>
                                    </div>
                                </Col>
                                <Col xs lg="2">
                                    <div class="col-md-2">
                                        <div className='d-flex justify-content-between align-items-center'>
                                            <div className="form-floating">
                                                <select className="form-select" style={{ minWidth: '200px' }}>
                                                    <option value="">Tất cả</option>
                                                    {/* {listSleeveLength.map(sleeveLength => (
                                            <option key={sleeveLength.id} value={sleeveLength.id}>
                                                {sleeveLength.name}
                                            </option>
                                        ))} */}
                                                </select>
                                                <label htmlFor="floatingSelectGrid" className='text-floating'>Màu sắc</label>
                                            </div>
                                        </div>
                                    </div>
                                </Col>
                            </Row>
                            <Row>
                                <Col xs={6}>
                                    <div className="col-md-12">
                                        <label className="form-label">Số lượng</label>
                                        <Slider defaultValue={0} />
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
                                {listProductDetail.length > 0 && listProductDetail.map((item, index) => {
                                    return (
                                        <tr key={`table-product-${index}`} className="room">
                                            <td className="text-center">{index + 1}</td>
                                            <td className="text-center image-product-detail" style={{ verticalAlign: 'middle', width: '5%' }}>
                                                <img src={`https://upload-product-image-file.s3.us-west-2.amazonaws.com/${item.cover}`} />
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
                                {listProductDetail && listProductDetail.length === 0 &&
                                    <tr>
                                        <td colSpan={7} className='text-center'>
                                            Không có dữ liệu!
                                        </td>
                                    </tr>
                                }
                            </tbody>
                        </table>
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