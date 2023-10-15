import { React, useState, useEffect } from 'react';
import { FaFilter, FaThList, FaProductHunt, FaPenSquare, FaMousePointer } from 'react-icons/fa';
import { MdLibraryAdd, MdDeleteSweep } from 'react-icons/md';
import { getAllProducts } from '../../../../../services/apiService';
import { getAllProductDetails } from '../../../../../services/apiService';
import { getAllProperties } from '../../../../../services/apiService';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import './ManageProduct.scss';
import ModalCreateProduct from './ModalCreateProduct';
import ModalUpdateProduct from './ModalUpdateProduct';
import ModalDeleteProduct from './ModalDeleteProduct';
import ModalCreateBrand from '../brand/ModalCreateBrand';
import ModalCreateMaterial from '../material/ModalCreateMaterial';
import ModalCreateCategory from '../category/ModalCreateCategory';
import ModalCreateCollar from '../collar/ModalCreateCollar';
import ModalCreateSleeveLength from '../sleeve-length/ModalCreateSleeveLength';
import { Modal, Button } from 'antd';
import 'antd-button-color/dist/css/style.css';
import { Col, Row } from 'react-bootstrap';
import imageServer from './../../../../../assets/uploads'

const ManageProduct = (props) => {

    const [brandId, setBrandId] = useState('');
    const [listBrand, setListBrand] = useState([]);
    const [categoryId, setCategoryId] = useState('');
    const [listCategory, setListCategory] = useState([]);
    const [materialId, setMaterialId] = useState('');
    const [listMaterial, setListMaterial] = useState([]);
    const [collarId, setCollarId] = useState('');
    const [listCollar, setListCollar] = useState([]);
    const [sleeveLengthId, setSleeveLengthlId] = useState('');
    const [listSleeveLength, setListSleeveLength] = useState([]);

    const [showModalCreateProduct, setShowModalCreateProduct] = useState(false);
    const [showModalUpdateProduct, setShowModalUpdateProduct] = useState(false);
    const [showModalDeleteProduct, setShowModalDeleteProduct] = useState(false);

    const [showModalCreateBrand, setShowModalCreateBrand] = useState(false);
    const [showModalCreateCategory, setShowModalCreateCategory] = useState(false);
    const [showModalCreateMaterial, setShowModalCreateMaterial] = useState(false);
    const [showModalCreateCollar, setShowModalCreateCollar] = useState(false);
    const [showModalCreateSleeveLength, setShowModalCreateSleeveLength] = useState(false);


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
        fetchListBrand();
        fetchListCategory();
        fetchListCollar();
        fetchListSleeveLength();
        fetchListMaterial();
        fetchListProductDetail();
    }, []);

    const fetchListProduct = async () => {
        let response = await getAllProducts();
        setListProduct(response.data);
        setProductId(response.data[0].id);
        console.log(typeof (response.data));
    }

    const fetchListProductDetail = async () => {
        let response = await getAllProductDetails();
        setListProductDetail(response.data);
        setProductDetailId(response.data[0].id);
        console.log(typeof (response.data));
    }

    const fetchListBrand = async () => {
        let response = await getAllProperties('brand');
        setListBrand(response.data);
        setBrandId(response.data[0].id);
    }

    const fetchListCategory = async () => {
        let response = await getAllProperties('category');
        setListCategory(response.data);
        setCategoryId(response.data[0].id)
    }

    const fetchListMaterial = async () => {
        let response = await getAllProperties('material');
        setListMaterial(response.data);
        setMaterialId(response.data[0].id)
    }

    const fetchListCollar = async () => {
        let response = await getAllProperties('collar');
        setListCollar(response.data);
        setCollarId(response.data[0].id)
    }

    const fetchListSleeveLength = async () => {
        let response = await getAllProperties('sleeve-length');
        setListSleeveLength(response.data);
        setSleeveLengthlId(response.data[0].id)
    }

    const handleClickBtnUpdate = (product) => {
        setDataUpdate(product);
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

    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedColors, setSelectedColors] = useState([]);
    const [selectedSizes, setSelectedSizes] = useState([]);

    const colors = [
        'Red', 'Green', 'Blue', 'Yellow', 'Orange', '123', '456', '789'
        // Thêm các màu khác ở đây
    ];

    const sizes = [
        'Small', 'Medium', 'Large', 'X-Large', 'XX-Large', '567', 'abc', 'def'
        // Thêm các kích thước khác ở đây
    ];

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = () => {
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const handleColorChange = (color) => {
        if (selectedColors.includes(color)) {
            const updatedSelectedColors = selectedColors.filter((c) => c !== color);
            setSelectedColors(updatedSelectedColors);
        } else {
            setSelectedColors([...selectedColors, color]);
        }
    };

    const handleSizeChange = (size) => {
        if (selectedSizes.includes(size)) {
            const updatedSelectedSizes = selectedSizes.filter((s) => s !== size);
            setSelectedSizes(updatedSelectedSizes);
        } else {
            setSelectedSizes([...selectedSizes, size]);
        }
    };

    const renderColorButtons = () => {
        return colors.map((color) => (
            <Button
                key={color}
                className={selectedColors.includes(color) ? 'selected-button' : ''}
                style={{ marginLeft: '8px', marginBottom: '8px' }}
                onClick={() => handleColorChange(color)}
            >
                {color}
            </Button>
        ));
    };

    const renderSizeButtons = () => {
        return sizes.map((size) => (
            <Button
                key={size}
                className={selectedSizes.includes(size) ? 'selected-button' : ''}
                style={{ marginLeft: '8px', marginBottom: '8px' }}
                onClick={() => handleSizeChange(size)}
            >
                {size}
            </Button>
        ));
    };

    return (
        <div class="manage-material-container">
            <div className='manage-material-title'>
                <div className="title">
                    <FaProductHunt size={32} /> Quản Lý Sản Phẩm
                </div>
            </div>
            <Tabs
                defaultActiveKey="product"
                transition={false}
                id="noanim-tab-example"
                className="mb-3 px-3 ms-3 tab-product"
            >
                <Tab eventKey="product" title="Product">
                    <div className='manage-material-search'>
                        <div className='search-material-title'>
                            <div className="title">
                                <FaFilter size={26} /> Filter
                            </div>

                        </div>
                        <div className='main-search'>
                            <div className='w-50'>
                                <div class="row mb-3">
                                    <label for="inputEmail3" class="col-sm-2 col-form-label">Product</label>
                                    <div class="col d-flex align-content-between">
                                        <input type="text" class="form-control me-4" id="inputEmail3" />
                                        <button type="button" class="btn btn-secondary">Search</button>
                                    </div>
                                </div>
                                <div class="row mb-3">
                                    <label for="inputPassword3" class="col-sm-2 col-form-label">Status</label>
                                    <div class="col d-flex">
                                        <select class="form-select me-4" id="inputPassword3">
                                            <option value="option1">Option 1</option>
                                            <option value="option2">Option 2</option>
                                            <option value="option3">Option 3</option>
                                        </select>
                                        <button type="button" class="btn btn-secondary">Refresh</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='manage-material-table'>
                        <div className='list-material-title'>
                            <div className="title">
                                <FaThList size={26} /> Product List
                            </div>
                            <button type="button" class="btn btn-dark btn-add" onClick={() => setShowModalCreateProduct(true)}>
                                <MdLibraryAdd /> Add</button>

                        </div>
                        <table className="table">
                            <thead>
                                <tr>
                                    <th scope="col" className='px-1 text-center'>
                                        <input type="checkbox" checked={selectAll} onChange={handleSelectAll} />
                                    </th>
                                    <th scope="col" className='px-5 text-center'>No.</th>
                                    <th scope="col" className='px-5 text-center'>Code</th>
                                    <th scope="col" className='px-5 text-center'>Name</th>
                                    <th scope="col" className='px-5 text-center'>Update Day</th>
                                    <th scope="col" className='px-5 text-center'>Status</th>
                                    <th scope="col" className='px-5 text-center'>Action</th>
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
                                            <td className="text-center">{item.name}</td>
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
                                            Not found data!
                                        </td>
                                    </tr>
                                }
                            </tbody>
                        </table>
                    </div>
                </Tab>
                <Tab eventKey="product-detail" title="Product Detail">
                    <Tabs
                        defaultActiveKey="listProductDetail"
                        id="uncontrolled-tab-example"
                        className="mb-3 px-3 ms-3 tab-product"
                    >
                        <Tab eventKey="listProductDetail" title="List">
                            <div className='manage-material-search'>
                                <div className='search-material-title'>
                                    <div className="title">
                                        <FaFilter size={26} /> Filter
                                    </div>

                                </div>
                                <div className='main-search'>
                                    <div className='w-50'>
                                        <div class="row mb-3">
                                            <label for="inputEmail3" class="col-sm-2 col-form-label">Product Detail</label>
                                            <div class="col d-flex align-content-between">
                                                <input type="text" class="form-control me-4" id="inputEmail3" />
                                                <button type="button" class="btn btn-secondary">Search</button>
                                            </div>
                                        </div>
                                        <div class="row mb-3">
                                            <label for="inputPassword3" class="col-sm-2 col-form-label">Status</label>
                                            <div class="col d-flex">
                                                <select class="form-select me-4" id="inputPassword3">
                                                    <option value="option1">Option 1</option>
                                                    <option value="option2">Option 2</option>
                                                    <option value="option3">Option 3</option>
                                                </select>
                                                <button type="button" class="btn btn-secondary">Refresh</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='manage-material-table'>
                                <div className='list-material-title'>
                                    <div className="title">
                                        <FaThList size={26} /> Product Detail List
                                    </div>
                                    <button type="button" class="btn btn-dark">
                                        <MdLibraryAdd /> Add</button>

                                </div>
                                <table className="table">
                                    <thead style={{ backgroundColor: "black" }}>
                                        <tr>
                                            <th scope="col" className='px-1 text-center'>
                                                <input type="checkbox" checked={selectAll} onChange={handleSelectAll} />
                                            </th>
                                            <th scope="col" className='px-5 text-center'>No.</th>
                                            <th scope="col" className='px-5 text-center'>Image</th>
                                            <th scope="col" className='px-5 text-center'>Name</th>
                                            <th scope="col" className='px-5 text-center'>Quantity</th>
                                            <th scope="col" className='px-5 text-center'>Price</th>
                                            <th scope="col" className='px-5 text-center'>Size</th>
                                            <th scope="col" className='px-5 text-center'>Color</th>
                                            <th scope="col" className='px-5 text-center'>Status</th>
                                            <th scope="col" className='px-5 text-center'>Action</th>
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
                                                        <img src={`${imageServer}\\${item.imageUrl}`} />
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
                                                    Not found data!
                                                </td>
                                            </tr>
                                        }
                                    </tbody>
                                </table>
                            </div>
                        </Tab>
                        <Tab eventKey="addProductDetail" title="Add">
                            <div className='manage-product-search'>
                                <div className='search-material-title'>
                                    <div className="title">
                                        <FaMousePointer size={26} /> Select Properties
                                    </div>
                                </div>
                                <div className='main-search row'>
                                    <div className='col-5 mb-4'>
                                        <div class="col-md">
                                            <div class="form-floating">
                                                <select className="form-select" value={productId} >
                                                    {listProduct.map(product => (
                                                        <option key={product.id} value={product.id}>
                                                            {product.name}
                                                        </option>
                                                    ))}
                                                </select>
                                                <label for="floatingSelectGrid" className='text-floating'>Product</label>
                                            </div>

                                        </div>
                                    </div>

                                    <div className='row d-flex justify-content-center align-items-center mb-3'>
                                        <div className="col-md-2">
                                            <div className='d-flex justify-content-between align-items-center'>
                                                <div className="form-floating">
                                                    <select className="form-select" value={brandId} style={{ minWidth: '200px' }}>
                                                        {listBrand.map(brand => (
                                                            <option key={brand.id} value={brand.id}>
                                                                {brand.name}
                                                            </option>
                                                        ))}
                                                    </select>
                                                    <label htmlFor="floatingSelectGrid" className='text-floating'>Brand</label>
                                                </div>
                                                <button type="button" className="btn btn-dark ms-2 btn-add-property" onClick={() => setShowModalCreateBrand(true)}><MdLibraryAdd /></button>
                                            </div>
                                        </div>
                                        <div class="col-md-2">
                                            <div className='d-flex justify-content-between align-items-center'>
                                                <div className="form-floating">
                                                    <select className="form-select" value={categoryId} style={{ minWidth: '200px' }}>
                                                        {listCategory.map(category => (
                                                            <option key={category.id} value={category.id}>
                                                                {category.name}
                                                            </option>
                                                        ))}
                                                    </select>
                                                    <label htmlFor="floatingSelectGrid" className='text-floating'>Category</label>
                                                </div>
                                                <button type="button" className="btn btn-dark ms-2 btn-add-property" onClick={() => setShowModalCreateCategory(true)}><MdLibraryAdd /></button>
                                            </div>
                                        </div>
                                        <div class="col-md-2">
                                            <div className='d-flex justify-content-between align-items-center'>
                                                <div className="form-floating">
                                                    <select className="form-select" value={materialId} style={{ minWidth: '200px' }}>
                                                        {listMaterial.map(material => (
                                                            <option key={material.id} value={material.id}>
                                                                {material.name}
                                                            </option>
                                                        ))}
                                                    </select>
                                                    <label htmlFor="floatingSelectGrid" className='text-floating'>Material</label>
                                                </div>
                                                <button type="button" className="btn btn-dark ms-2 btn-add-property" onClick={() => setShowModalCreateMaterial(true)}><MdLibraryAdd /></button>
                                            </div>
                                        </div>
                                        <div class="col-md-2">
                                            <div className='d-flex justify-content-between align-items-center'>
                                                <div className="form-floating">
                                                    <select className="form-select" value={collarId} style={{ minWidth: '200px' }}>
                                                        {listCollar.map(collar => (
                                                            <option key={collar.id} value={collar.id}>
                                                                {collar.name}
                                                            </option>
                                                        ))}
                                                    </select>
                                                    <label htmlFor="floatingSelectGrid" className='text-floating'>Collar</label>
                                                </div>
                                                <button type="button" className="btn btn-dark ms-2 btn-add-property" onClick={() => setShowModalCreateCollar(true)}><MdLibraryAdd /></button>
                                            </div>
                                        </div>
                                        <div class="col-md-2">
                                            <div className='d-flex justify-content-between align-items-center'>
                                                <div className="form-floating">
                                                    <select className="form-select" value={sleeveLengthId} style={{ minWidth: '200px' }}>
                                                        {listSleeveLength.map(sleeveLength => (
                                                            <option key={sleeveLength.id} value={sleeveLength.id}>
                                                                {sleeveLength.name}
                                                            </option>
                                                        ))}
                                                    </select>
                                                    <label htmlFor="floatingSelectGrid" className='text-floating'>Sleeve Length</label>
                                                </div>
                                                <button type="button" className="btn btn-dark ms-2 btn-add-property" onClick={() => setShowModalCreateSleeveLength(true)}><MdLibraryAdd /></button>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='d-flex justify-content-center align-items-center' >
                                        <Button type="dark" onClick={showModal} className='mb-2 mt-2'>
                                            Color & Size
                                        </Button>

                                        <Modal title="Color & Size" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
                                            <div className='mb-3 mt-3'>
                                                <h4>Color:</h4>
                                                {renderColorButtons()}
                                            </div>
                                            <div>
                                                <h4>Size:</h4>
                                                {renderSizeButtons()}
                                            </div>
                                        </Modal>
                                    </div>
                                    <Row>
                                        <Col className='d-flex justify-content-center align-items-center flex-wrap'>
                                            {selectedColors.map((color, index) => (
                                                <Button
                                                    key={`color-${index}`}
                                                    className="selected-button"
                                                    style={{ marginLeft: '8px', marginBottom: '8px' }}
                                                    onClick={() => handleColorChange(color)}
                                                >
                                                    {color} (Xóa)
                                                </Button>
                                            ))}
                                            {selectedSizes.map((size, index) => (
                                                <Button
                                                    key={`size-${index}`}
                                                    className="selected-button"
                                                    style={{ marginLeft: '8px' }}
                                                    onClick={() => handleSizeChange(size)}
                                                >
                                                    {size} (Xóa)
                                                </Button>
                                            ))}</Col>
                                    </Row>
                                </div>
                            </div>
                            <div className='manage-material-table'>
                                <div className='list-material-title'>
                                    <div className="title">
                                        <FaThList size={26} /> Product Detail List
                                    </div>
                                    <button type="button" class="btn btn-dark">
                                        <MdLibraryAdd /> Add</button>

                                </div>
                                <table className="table">
                                    <thead style={{ backgroundColor: "black" }}>
                                        <tr>
                                            <th scope="col" className='px-1 text-center'>
                                                <input type="checkbox" checked={selectAll} onChange={handleSelectAll} />
                                            </th>
                                            <th scope="col" className='px-5 text-center'>No.</th>
                                            <th scope="col" className='px-5 text-center'>Image</th>
                                            <th scope="col" className='px-5 text-center'>Name</th>
                                            <th scope="col" className='px-5 text-center'>Quantity</th>
                                            <th scope="col" className='px-5 text-center'>Price</th>
                                            <th scope="col" className='px-5 text-center'>Size</th>
                                            <th scope="col" className='px-5 text-center'>Color</th>
                                            <th scope="col" className='px-5 text-center'>Status</th>
                                            <th scope="col" className='px-5 text-center'>Action</th>
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
                                                    <td className="text-center">{item.name}</td>
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
                                                    Not found data!
                                                </td>
                                            </tr>
                                        }
                                    </tbody>
                                </table>
                            </div>
                        </Tab>
                    </Tabs>
                </Tab>
            </Tabs >
            <ModalCreateProduct
                show={showModalCreateProduct}
                setShow={setShowModalCreateProduct}
                fetchListProduct={fetchListProduct}
            />
            <ModalUpdateProduct
                show={showModalUpdateProduct}
                setShow={setShowModalUpdateProduct}
                fetchListProduct={fetchListProduct}
                dataUpdate={dataUpdate}
                resetDataUpdate={resetDataUpdate}
            />
            <ModalDeleteProduct
                show={showModalDeleteProduct}
                setShow={setShowModalDeleteProduct}
                fetchListProduct={fetchListProduct}
                dataDelete={dataDelete}
                resetDataDelete={resetDataDelete}
            />
            <ModalCreateBrand
                show={showModalCreateBrand}
                setShow={setShowModalCreateBrand}
                fetchListBrand={fetchListBrand}
            />
            <ModalCreateCategory
                show={showModalCreateCategory}
                setShow={setShowModalCreateCategory}
                fetchListCategory={fetchListCategory}
            />
            <ModalCreateMaterial
                show={showModalCreateMaterial}
                setShow={setShowModalCreateMaterial}
                fetchListMaterial={fetchListMaterial}
            />
            <ModalCreateCollar
                show={showModalCreateCollar}
                setShow={setShowModalCreateCollar}
                fetchListCollar={fetchListCollar}
            />
            <ModalCreateSleeveLength
                show={showModalCreateSleeveLength}
                setShow={setShowModalCreateSleeveLength}
                fetchListSleeveLength={fetchListSleeveLength}
            />
        </div >
    );
}

export default ManageProduct;