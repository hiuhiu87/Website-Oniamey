import { React, useState, useEffect, Fragment, useMemo } from 'react';
import './ManageProduct.scss';
import { Modal, Button } from 'antd';
import {Col, Form, Row} from 'react-bootstrap';
import { FaMousePointer, FaThList } from 'react-icons/fa';
import { MdLibraryAdd, MdDeleteSweep } from 'react-icons/md';
import { TbLayoutGridAdd } from 'react-icons/tb';
import {getAllProducts} from '../../../../../services/apiService';
import { getAllProperties } from '../../../../../services/apiService';
import { postProductDetail } from '../../../../../services/apiService';
import { postCreateProduct } from '../../../../../services/apiService';
import { postImageForProductDetails } from '../../../../../services/apiService';
import ModalCreateProduct from './ModalCreateProduct';
import ModalCreateBrand from '../brand/ModalCreateBrand';
import ModalCreateMaterial from '../material/ModalCreateMaterial';
import ModalCreateCategory from '../category/ModalCreateCategory';
import ModalCreateCollar from '../collar/ModalCreateCollar';
import ModalCreateSleeveLength from '../sleeve-length/ModalCreateSleeveLength';
import { Upload } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { Spin } from 'antd';
import {toast} from "react-toastify";

const AddProduct = (props) => {

    const [brandId, setBrandId] = useState('');
    const [listBrand, setListBrand] = useState([]);
    const [categoryId, setCategoryId] = useState('');
    const [listCategory, setListCategory] = useState([]);
    const [materialId, setMaterialId] = useState('');
    const [listMaterial, setListMaterial] = useState([]);
    const [collarId, setCollarId] = useState('');
    const [listCollar, setListCollar] = useState([]);
    const [sleeveLengthId, setSleeveLengthId] = useState('');
    const [listSleeveLength, setListSleeveLength] = useState([]);
    const [sizeId, setSizeId] = useState('');
    const [listSize, setListSize] = useState([]);
    const [colorId, setColorId] = useState('');
    const [listColor, setListColor] = useState([]);

    const [showModalCreateProduct, setShowModalCreateProduct] = useState(false);
    const [showModalCreateBrand, setShowModalCreateBrand] = useState(false);
    const [showModalCreateCategory, setShowModalCreateCategory] = useState(false);
    const [showModalCreateMaterial, setShowModalCreateMaterial] = useState(false);
    const [showModalCreateCollar, setShowModalCreateCollar] = useState(false);
    const [showModalCreateSleeveLength, setShowModalCreateSleeveLength] = useState(false);


    const [listProduct, setListProduct] = useState([]);
    const [productName, setProductName] = useState('');
    const nameError = productName.trim() === "" ? "* Tên không được để trống!" : "";
    const [description, setDescription] = useState('');

    const [selectedColors, setSelectedColors] = useState([]);
    const [selectedSizes, setSelectedSizes] = useState([]);

    const [productDetails, setProductDetails] = useState([]);

    const [isColorModalVisible, setColorModalVisible] = useState(false);
    const [isSizeModalVisible, setSizeModalVisible] = useState(false);

    const navigation = useNavigate();

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchListProduct();
        fetchListBrand();
        fetchListCategory();
        fetchListCollar();
        fetchListSleeveLength();
        fetchListMaterial();
        fetchListSize();
        fetchListColor();
    }, []);

    const fetchListProduct = async () => {
        let response = await getAllProducts();
        setListProduct(response.data);
    }

    const fetchListBrand = async () => {
        let response = await getAllProperties('brand');
        setListBrand(response.data);
    }

    const fetchListCategory = async () => {
        let response = await getAllProperties('category');
        setListCategory(response.data);
    }

    const fetchListMaterial = async () => {
        let response = await getAllProperties('material');
        setListMaterial(response.data);
    }

    const fetchListCollar = async () => {
        let response = await getAllProperties('collar');
        setListCollar(response.data);
    }

    const fetchListSleeveLength = async () => {
        let response = await getAllProperties('sleeve-length');
        setListSleeveLength(response.data);
    }

    const fetchListColor = async () => {
        let response = await getAllProperties('color');
        setListColor(response.data);
    }

    const fetchListSize = async () => {
        let res = await getAllProperties('size');
        setListSize(res.data);
    }

    const showColorModal = () => {
        setColorModalVisible(true);
    };

    const hideColorModal = () => {
        setColorModalVisible(false);
    };

    const showSizeModal = () => {
        setSizeModalVisible(true);
    };

    const hideSizeModal = () => {
        setSizeModalVisible(false);
    };

    const handleColorChange = (color) => {
        if (selectedColors.includes(color)) {
            setSelectedColors(selectedColors.filter((c) => c !== color));
        } else {
            setSelectedColors([...selectedColors, color]);
        }
        setProductDetails([]);
    };

    const handleSizeChange = (size) => {
        if (selectedSizes.includes(size)) {
            setSelectedSizes(selectedSizes.filter((s) => s !== size));
        } else {
            setSelectedSizes([...selectedSizes, size]);
        }
        setProductDetails([]);
    };

    const renderColorButtons = () => {
        return listColor.map((color) => (
            <Button
                key={color.id}
                className={selectedColors.includes(color.id) ? 'selected-button' : ''}
                style={{ marginLeft: '8px', marginBottom: '8px' }}
                onClick={() => handleColorChange(color.id)}
            >
                {color.name}
            </Button>
        ));
    };

    const renderSizeButtons = () => {
        return listSize.map((size) => (
            <Button
                key={size.id}
                className={selectedSizes.includes(size.id) ? 'selected-button' : ''}
                style={{ marginLeft: '8px', marginBottom: '8px' }}
                onClick={() => handleSizeChange(size.id)}
            >
                {size.name}
            </Button>
        ));
    };

    const handleBrandChange = (event) => {
        const selectedBrandId = event.target.value;
        setBrandId(selectedBrandId);
    };

    const handleCategoryChange = (event) => {
        const selectedCategoryId = event.target.value;
        setCategoryId(selectedCategoryId);
    };

    const handleMaterialChange = (event) => {
        const selectedMaterialId = event.target.value;
        setMaterialId(selectedMaterialId);
    };

    const handleCollarChange = (event) => {
        const selectedCollarId = event.target.value;
        setCollarId(selectedCollarId);
    };

    const handleSleeveLengthChange = (event) => {
        const selectedSleeveLengthId = event.target.value;
        setSleeveLengthId(selectedSleeveLengthId);
    };

    useEffect(() => {
        updateProductDetails();
    }, [selectedColors, selectedSizes]);

    const [quantityInput, setQuantityInput] = useState([]);
    const [priceInput, setPriceInput] = useState([]);
    const [names, setNames] = useState([]);

    const updateProductDetails = () => {
        if (selectedColors.length === 0 || selectedSizes.length === 0) {
            return;
        }

        const newProductDetails = [];
        const newQuantityInput = [];
        const newPriceInput = [];
        const newNames = [];

        selectedColors.forEach((colorId) => {
            selectedSizes.forEach((sizeId) => {
                const selectedColor = listColor.find((color) => color.id === colorId);
                const selectedSize = listSize.find((size) => size.id === sizeId);
                const name = `${productName} - [${selectedColor.name}][${selectedSize.name}]`;
                const productDetail = {
                    name: name,
                    brandId: brandId,
                    categoryId: categoryId,
                    materialId: materialId,
                    collarId: collarId,
                    sleeveLengthId: sleeveLengthId,
                    colorId: colorId,
                    colorName: selectedColor.name,
                    sizeId: sizeId,
                    sizeName: selectedSize.name,
                    price: 100000,
                    quantity: 10,
                };
                newProductDetails.push(productDetail);

                newQuantityInput.push(10);
                newPriceInput.push(100000);
                newNames.push(name);
            });
        });

        setProductDetails(newProductDetails);
        setQuantityInput(newQuantityInput);
        setPriceInput(newPriceInput);
        setNames(newNames);
    };

    const maxFileCount = 5;
    const uniqueColorGroups = useMemo(() => {
        return Array.from(new Set(productDetails.map(item => item.colorId)));
    }, [productDetails]);

    const [fileLists, setFileLists] = useState({});

    useEffect(() => {
        const initialFileLists = {};
        uniqueColorGroups.forEach(color => {
            initialFileLists[color] = [];
        });
        setFileLists(initialFileLists);
    }, [uniqueColorGroups]);

    const handleChange = (color, newFileList) => {
        if (newFileList.length > maxFileCount) {
            newFileList.splice(maxFileCount, newFileList.length - maxFileCount);
        }
        setFileLists(prevFileLists => ({
            ...prevFileLists,
            [color]: newFileList,
        }));
    };


    const renderRow = (colorId) => {
        const fileList = fileLists[colorId];
        return (
            <tr>
                <td colSpan={7}>
                    <div className="d-flex justify-content-center">
                        <Row
                            fileList={fileList}
                            onChange={({ fileList }) => handleChange(colorId, fileList)}
                        >
                            {fileList && fileLists[colorId].length >= maxFileCount ? null : (
                                <div>
                                    <b>Danh sách sản phẩm màu: {listColor.find((color) => color.id === colorId).name}</b>
                                </div>
                            )}
                        </Row>
                    </div>
                </td>
            </tr>
        );
    };

    const renderImageUploadRow = (colorId) => {
        const fileList = fileLists[colorId];
        return (
            <tr>
                <td colSpan={7}>
                    <div className="ant-upload-wrapper ant-upload-picture-card-wrapper">
                        <Upload
                            listType="picture-card"
                            fileList={fileList}
                            onChange={({ fileList }) => handleChange(colorId, fileList)}
                            onClick={() => handleColorClick(colorId)}
                            multiple={true}
                        >
                            {fileList && fileLists[colorId].length >= maxFileCount ? null : (
                                <div>
                                    <PlusOutlined />
                                    <div style={{ marginTop: 8 }}></div>
                                </div>
                            )}
                        </Upload>
                    </div>
                </td>
            </tr>
        );
    }

    const [selectedColorIds, setSelectedColorIds] = useState([]);

    const handleColorClick = (colorId) => {
        if (selectedColorIds.includes(colorId)) {
            setSelectedColorIds(selectedColorIds.filter((id) => id !== colorId));
        } else {
            setSelectedColorIds([...selectedColorIds, colorId]);
        }
    };

    const handleSubmitCreateProduct = () => {
        Swal.fire({
            title: "Thông báo",
            text: "Xác nhận thêm!",
            icon: "infor",
            showCancelButton: true,
            confirmButtonColor: "#000",
            cancelButtonColor: "#000",
            confirmButtonText: "Đồng ý",
            cancelButtonText: "Hủy",
        }).then(async (result) => {
            if (result.isConfirmed) {
                if (nameError) {
                    return;
                }

                // if(selectedColorIds.length === 0) {
                //     return;
                // }
                //
                // if(selectedSizes.length === 0) {
                //     return;
                // }

                try {
                    setLoading(true);
                    const newProduct = await postCreateProduct(productName, description, false);
                    setListProduct([newProduct, ...listProduct]);

                    const quantities = quantityInput.map((quantity) => parseInt(quantity) || 10);
                    const prices = priceInput.map((price) => parseFloat(price) || 100000);

                    const productDetailIds = [];
                    for (const colorId of selectedColorIds) {
                        const productDetailsForColor = productDetails.filter((item) => item.colorId === colorId);
                        const idsForColor = productDetailsForColor.map((item) => item.id);
                        productDetailIds.push(...idsForColor);
                    }

                    let res = await postProductDetail(
                        newProduct.data.id,
                        categoryId,
                        selectedSizes,
                        selectedColors,
                        materialId,
                        brandId,
                        collarId,
                        sleeveLengthId,
                        names,
                        quantities,
                        prices
                    );

                    const addedProductDetailIds = res.data.map((productDetail) => productDetail);

                    for (const colorId of selectedColorIds) {
                        const productDetailIds = addedProductDetailIds
                            .filter((item) => item.color.id === colorId)
                            .map((item) => item.id);
                        console.log(productDetailIds)

                        const images = fileLists[colorId];
                        await postImageForProductDetails(colorId, productDetailIds, images);
                        setLoading(false);
                    }
                } catch (error) {
                    console.error("Error:", error);
                }

                navigation('/admins/manage-products');
            }
        });
    };

    useEffect(() => {
        fetchListSize();
    }, []);
    
    return (
        <Spin spinning={loading} delay={500}>
        <div className="manage-product-add-container">
            <div className='manage-product-add-title'>
                <div className="title">
                    <TbLayoutGridAdd size={32} /> Thêm Sản Phẩm
                </div>
            </div>
            <div className='manage-product-add-search'>
                <div className='search-product-add-title'>
                    <div className="title">
                        <FaMousePointer size={26} /> Lựa chọn thuộc tính
                    </div>
                </div>
                <div className='main-search row d-flex justify-content-center'>
                    <Row className="mb-3 justify-content-md-center">
                        <Col lg="4">
                            <FloatingLabel
                                controlId="floatingInput"
                                label="Tên sản phẩm"
                                value={productName}
                                onChange={(e) => setProductName(e.target.value)}
                            >
                                <Form.Control type="text" placeholder="name@example.com" />
                            </FloatingLabel>
                            {nameError && (
                                <p style={{ color: "red", marginTop: "1px" }}>{nameError}</p>
                            )}
                        </Col>
                        <Col lg="4">
                            <FloatingLabel
                                controlId="floatingInput"
                                label="Mô tả"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            >
                                <Form.Control type="text" placeholder="name@example.com" />
                            </FloatingLabel>
                        </Col>
                    </Row>
                    <Row className="mb-3 justify-content-md-center">
                        <Col lg="2">
                            <FloatingLabel controlId="floatingSelect" label="Thương hiệu">
                                <Form.Select value={brandId} onChange={handleBrandChange}>
                                    <option key="no-value-option">
                                        -- Chọn --
                                    </option>
                                    {listBrand.map(brand => (
                                        <option key={brand.id} value={brand.id}>
                                            {brand.name}
                                        </option>
                                    ))}
                                </Form.Select>
                            </FloatingLabel>
                        </Col>
                        <button type="button" className="btn btn-dark mt-3 me-3 btn-add-property" onClick={() => setShowModalCreateBrand(true)}><MdLibraryAdd /></button>
                            <Col lg="2">
                                <FloatingLabel controlId="floatingSelect" label="Danh mục">
                                    <Form.Select value={categoryId} onChange={handleCategoryChange}>
                                        <option key="no-value-option">
                                            -- Chọn --
                                        </option>
                                        {listCategory.map(category => (
                                            <option key={category.id} value={category.id}>
                                                {category.name}
                                            </option>
                                        ))}
                                    </Form.Select>
                                </FloatingLabel>
                            </Col>
                            <button type="button" className="btn btn-dark mt-3 me-3 btn-add-property" onClick={() => setShowModalCreateCategory(true)}><MdLibraryAdd /></button>
                      <Col lg="2">
                        <FloatingLabel controlId="floatingSelect" label="Chất liệu">
                          <Form.Select value={materialId} onChange={handleMaterialChange}>
                              <option key="no-value-option">
                                  -- Chọn --
                              </option>
                            {listMaterial.map(material => (
                                <option key={material.id} value={material.id}>
                                  {material.name}
                                </option>
                            ))}
                          </Form.Select>
                        </FloatingLabel>
                      </Col>
                      <button type="button" className="btn btn-dark mt-3 me-3 btn-add-property" onClick={() => setShowModalCreateMaterial(true)}><MdLibraryAdd /></button>
                      <Col lg="2">
                        <FloatingLabel controlId="floatingSelect" label="Cổ áo">
                          <Form.Select value={collarId} onChange={handleCollarChange}>
                              <option key="no-value-option">
                                  -- Chọn --
                              </option>
                            {listCollar.map(collar => (
                                <option key={collar.id} value={collar.id}>
                                  {collar.name}
                                </option>
                            ))}
                          </Form.Select>
                        </FloatingLabel>
                      </Col>
                      <button type="button" className="btn btn-dark mt-3 me-3 btn-add-property" onClick={() => setShowModalCreateCollar(true)}><MdLibraryAdd /></button>
                      <Col lg="2">
                        <FloatingLabel controlId="floatingSelect" label="Chiều dài tay">
                          <Form.Select value={sleeveLengthId} onChange={handleSleeveLengthChange}>
                              <option key="no-value-option">
                                  -- Chọn --
                              </option>
                            {listSleeveLength.map(sleeveLength => (
                                <option key={sleeveLength.id} value={sleeveLength.id}>
                                  {sleeveLength.name}
                                </option>
                            ))}
                          </Form.Select>
                        </FloatingLabel>
                      </Col>
                      <button type="button" className="btn btn-dark mt-3 btn-add-property" onClick={() => setShowModalCreateSleeveLength(true)}><MdLibraryAdd /></button>
                    </Row>
                    <div className='d-flex justify-content-center align-items-center' >
                        <Button onClick={showColorModal} className="button-color mb-2">
                            Màu sắc
                        </Button>
                        <Button onClick={showSizeModal} className="button-size mb-2 ms-2">
                            Kích cỡ
                        </Button>
                        <Modal
                            maskClosable={false}
                            open={isColorModalVisible}
                            onOk={hideColorModal}
                            onCancel={hideColorModal}
                        >
                            <div className='mb-3 mt-3'>
                                <h5>Màu sắc:</h5>
                                {renderColorButtons()}
                            </div>
                        </Modal>

                        <Modal
                            maskClosable={false}
                            open={isSizeModalVisible}
                            onOk={hideSizeModal}
                            onCancel={hideSizeModal}
                        >
                            <div>
                                <h5>Kích cỡ:</h5>
                                {renderSizeButtons()}
                            </div>
                        </Modal>
                    </div>
                    <Row>
                        <Col className='d-flex justify-content-center align-items-center flex-wrap'>
                            {selectedColors.map((colorId, index) => (
                                <Button
                                    variant="outline-dark"
                                    key={`color-${index}`}
                                    className="selected-button m-1"
                                    onClick={() => handleColorChange(colorId)}
                                >
                                    {listColor.find(color => color.id === colorId).name}
                                </Button>
                            ))}
                            {selectedSizes.map((sizeId, index) => (
                                <Button
                                    variant="outline-dark"
                                    key={`size-${index}`}
                                    className="selected-button m-1"
                                    onClick={() => handleSizeChange(sizeId)}
                                >
                                    {listSize.find(size => size.id === sizeId).name}
                                </Button>
                            ))}</Col>
                    </Row>
                </div>
            </div>
            <div className='manage-product-add-table'>
                <div className='list-product-add-title'>
                    <div className="title">
                        <FaThList size={26} /> Danh Sách Sản Phẩm Chi Tiết
                    </div>
                    <button type="button" className="btn btn-dark" onClick={handleSubmitCreateProduct}>
                        <MdLibraryAdd /> Hoàn Tất</button>

                </div>
                <table className="table">
                    <thead style={{ backgroundColor: "black" }}>
                        <tr>
                            <th scope="col" className='px-2 text-center'>#</th>
                            <th scope="col" className='px-5 text-center'>Sản phẩm</th>
                            <th scope="col" className='px-2 text-center'>Số lượng</th>
                            <th scope="col" className='px-2 text-center'>Giá bán</th>
                            <th scope="col" className='px-2 text-center'>Kích cỡ</th>
                            <th scope="col" className='px-2 text-center'>Màu sắc</th>
                            <th scope="col" className='px-2 text-center'>Hành động</th>
                        </tr>
                    </thead>
                    <tbody>
                        {uniqueColorGroups.map((colorId, colorIndex) => {
                            return (
                                <Fragment key={`color-group-${colorIndex}`}>
                                    {renderRow(colorId)}
                                    {productDetails.map((item, index) => {
                                        if (item.colorId === colorId) {
                                            return (
                                                <tr key={`table-product-${index}`} className={"room"}>
                                                    <td className="text-center" style={{ verticalAlign: 'middle' }}>
                                                        <div className='center-content'>
                                                            {index + 1}
                                                        </div>
                                                    </td>
                                                    <td className="text-center" style={{ verticalAlign: 'middle' }}>
                                                        <div className='center-content'>
                                                            {item.name}
                                                        </div>
                                                    </td>
                                                    <td className="text-center" style={{ verticalAlign: 'middle' }}>
                                                        <div className='center-content'>
                                                            <input
                                                                type="number"
                                                                value={quantityInput[index]}
                                                                onChange={(e) => {
                                                                    const newQuantityInput = [...quantityInput];
                                                                    newQuantityInput[index] = e.target.value;
                                                                    setQuantityInput(newQuantityInput);
                                                                }}
                                                            />
                                                        </div>
                                                    </td>
                                                    <td className="text-center" style={{ verticalAlign: 'middle' }}>
                                                        <div className='center-content'>
                                                            <input
                                                                type="number"
                                                                value={priceInput[index]}
                                                                onChange={(e) => {
                                                                    const newPriceInput = [...priceInput];
                                                                    newPriceInput[index] = e.target.value;
                                                                    setPriceInput(newPriceInput);
                                                                }}
                                                            />
                                                        </div>
                                                    </td>
                                                    <td className="text-center" style={{ verticalAlign: 'middle' }}>
                                                        <div className='center-content'>
                                                            {item.sizeName}
                                                        </div>
                                                    </td>
                                                    <td className="text-center" style={{ verticalAlign: 'middle' }}>
                                                        <div className='center-content'>
                                                            {item.colorName}
                                                        </div>
                                                    </td>
                                                    <td className="text-center" style={{ verticalAlign: 'middle' }}>
                                                        <div className='center-content'>
                                                            <button className="btn-delete btn btn-dark short-button" style={{ width: '40%' }}>
                                                                <MdDeleteSweep />
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            );
                                        }
                                        return null;
                                    })}
                                    {renderImageUploadRow(colorId)}
                                </Fragment>
                            );
                        })}
                    </tbody>
                </table>

            </div >
            <ModalCreateProduct
                show={showModalCreateProduct}
                setShow={setShowModalCreateProduct}
                fetchListProduct={fetchListProduct}
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
        </Spin>
    );
}

export default AddProduct;
