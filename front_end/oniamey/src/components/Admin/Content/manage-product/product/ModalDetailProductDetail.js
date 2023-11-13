import { React, useState, useEffect } from 'react';
import { Modal, Upload } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { MdLibraryAdd } from 'react-icons/md';
import _ from 'lodash';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import FloatingLabel from "react-bootstrap/FloatingLabel";
import {Form} from "react-bootstrap";
import {putUpdateProductDetail} from "../../../../../services/apiService";

const ModalDetailProductDetail = (props) => {

    const { brandId, setBrandId, listBrand } = props;
    const { categoryId, setCategoryId, listCategory } = props;
    const { materialId, setMaterialId, listMaterial } = props;
    const { collarId, setCollarId, listCollar } = props;
    const { sleeveLengthId, setSleeveLengthId, listSleeveLength } = props;
    const { sizeId, setSizeId, listSize } = props;
    const { colorId, setColorId, listColor } = props;
    const { dataDetail, resetDataDetail } = props;


    const [quantity, setQuantity] = useState('');
    const [price, setPrice] = useState('');
    const [name, setName] = useState('');

    useEffect(() => {
        setBrandId(dataDetail.brandId);
        setCategoryId(dataDetail.categoryId);
        setMaterialId(dataDetail.materialId);
        setCollarId(dataDetail.collarId);
        setSleeveLengthId(dataDetail.sleeveLengthId);
        setSizeId(dataDetail.sizeId);
        setColorId(dataDetail.colorId);
        setName(dataDetail.name);
        setPrice(dataDetail.price);
        setQuantity(dataDetail.quantity);
    }, [dataDetail])

    const { show, setShow } = props;

    const handleClose = () => {
        setShow(false);
        setQuantity('');
        setPrice('');
        resetDataDetail();
    };

    const handleSubmitUpdateProductDetail = async () => {
        await putUpdateProductDetail(props.productId, dataDetail.id, sizeId, colorId, price, quantity);
        props.fetchListProductDetailByProductId();
        handleClose();
    }

    const maxFileCount = 8; // Số lượng tệp ảnh tối đa

    const [fileList, setFileList] = useState([]); // Danh sách các tệp ảnh
    const [previewVisible, setPreviewVisible] = useState(false); // Hiển thị trình xem trước
    const [previewImage, setPreviewImage] = useState(''); // Đường dẫn ảnh xem trước
    const [previewTitle, setPreviewTitle] = useState(''); // Tiêu đề ảnh xem trước

    const handleCancel = () => setPreviewVisible(false); // Đóng trình xem trước

    const handlePreview = async (file) => {
        if (!file.url && !file.preview) {
            // file.preview = await getBase64(file.originFileObj);
        }
        setPreviewImage(file.url || file.preview);
        setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf('/') + 1));
        setPreviewVisible(true); // Mở trình xem trước
    };

    const handleChange = ({ fileList }) => {
        // Kiểm tra nếu số lượng tệp ảnh vượt quá maxFileCount, loại bỏ các tệp vượt quá
        if (fileList.length > maxFileCount) {
            fileList.splice(maxFileCount, fileList.length - maxFileCount);
        }
        setFileList(fileList); // Cập nhật danh sách tệp ảnh
    };

    console.log(props.productId)
    // console.log('product name ', listProduct.find((product) => product.id === 1).description)


    return (
        <>
            <Modal width={1200} centered
                   open={show} onOk={() => handleSubmitUpdateProductDetail()} onCancel={handleClose}>
                <Row className="mt-4 justify-content-md-center">
                    <Col lg="6">
                        <FloatingLabel
                            controlId="floatingInput"
                            label="Tên sản phẩm"
                        >
                            <Form.Control type="text" value={props.productName} />
                        </FloatingLabel>
                    </Col>
                    <Col lg="6">
                        <FloatingLabel
                            controlId="floatingInput"
                            label="Mô tả"
                        >
                            <Form.Control type="text" placeholder="name@example.com" />
                        </FloatingLabel>
                        {/*value={listProduct.find((product) => product.id === props.productId).description}*/}
                    </Col>
                </Row>
                <Row className="mt-3 mb-3 justify-content-md-center">
                    <Col lg="3">
                        <FloatingLabel controlId="floatingSelect" label="Thương hiệu">
                            <Form.Select value={brandId} onChange={(e) => setBrandId(e.target.value)}>
                                {listBrand.map(brand => (
                                    <option key={brand.id} value={brand.id}>
                                        {brand.name}
                                    </option>
                                ))}
                            </Form.Select>
                        </FloatingLabel>
                    </Col>
                    <Col lg="3">
                        <FloatingLabel controlId="floatingSelect" label="Danh mục">
                            <Form.Select value={categoryId} onChange={(e) => setCategoryId(e.target.value)}>
                                {listCategory.map(category => (
                                    <option key={category.id} value={category.id}>
                                        {category.name}
                                    </option>
                                ))}
                            </Form.Select>
                        </FloatingLabel>
                    </Col>
                    <Col lg="3">
                        <FloatingLabel controlId="floatingSelect" label="Chất liệu">
                            <Form.Select value={materialId} onChange={(e) => setMaterialId(e.target.value)}>
                                {listMaterial.map(material => (
                                    <option key={material.id} value={material.id}>
                                        {material.name}
                                    </option>
                                ))}
                            </Form.Select>
                        </FloatingLabel>
                    </Col>
                </Row>
                <Row className="mt-3 mb-3 justify-content-md-center">
                    <Col lg="3">
                        <FloatingLabel controlId="floatingSelect" label="Cổ áo">
                            <Form.Select value={collarId} onChange={(e) => setCollarId(e.target.value)}>
                                {listCollar.map(collar => (
                                    <option key={collar.id} value={collar.id}>
                                        {collar.name}
                                    </option>
                                ))}
                            </Form.Select>
                        </FloatingLabel>
                    </Col>
                    <Col lg="2">
                        <FloatingLabel controlId="floatingSelect" label="Chiều dài tay">
                            <Form.Select value={sleeveLengthId} onChange={(e) => setSleeveLengthId(e.target.value)}>
                                {listSleeveLength.map(sleeveLength => (
                                    <option key={sleeveLength.id} value={sleeveLength.id}>
                                        {sleeveLength.name}
                                    </option>
                                ))}
                            </Form.Select>
                        </FloatingLabel>
                    </Col>
                    <Col lg="2">
                        <FloatingLabel controlId="floatingSelect" label="Màu sắc">
                            <Form.Select value={colorId} onChange={(e) => setColorId(e.target.value)}>
                                {listColor.map(color => (
                                    <option key={color.id} value={color.id}>
                                        {color.name}
                                    </option>
                                ))}
                            </Form.Select>
                        </FloatingLabel>
                    </Col>
                    <Col lg="3">
                        <FloatingLabel controlId="floatingSelect" label="Kích cỡ">
                            <Form.Select value={sizeId} onChange={(e) => setSizeId(e.target.value)}>
                                {listSize.map(size => (
                                    <option key={size.id} value={size.id}>
                                        {size.name}
                                    </option>
                                ))}
                            </Form.Select>
                        </FloatingLabel>
                    </Col>
                </Row>
                <Row className="mt-3 mb-3 justify-content-md-center">

                    <Col lg="4">
                        <FloatingLabel
                            controlId="floatingInput"
                            label="Số lượng"
                        >
                            <Form.Control type="number" defaultValue={quantity} onChange={(e) => setQuantity(e.target.value)}/>
                        </FloatingLabel>
                    </Col>
                    <Col lg="4">
                        <FloatingLabel
                            controlId="floatingInput"
                            label="Giá bán"
                        >
                            <Form.Control type="number" defaultValue={price} onChange={(e) => setPrice(e.target.value)}/>
                        </FloatingLabel>
                    </Col>
                </Row>
                <Row>
                    <Col className="d-flex justify-content-md-center">
                        <img src={`https://upload-product-image-file.s3.us-west-2.amazonaws.com/${name}-QRCODE.png`} style={{width: "20%"}}/>
                    </Col>
                </Row>
                <Row className="mt-3">
                    <Col className='d-flex justify-content-md-center'>
                        <Upload
                            action="URL_API_TAI_LEN"
                            listType="picture-card"
                            fileList={fileList}
                            onPreview={handlePreview}
                            onChange={handleChange}
                            multiple={true}
                            className='d-flex justify-content-md-center'
                        >
                            {fileList.length >= 8 ? null : (
                                <div>
                                    <PlusOutlined />
                                    <div style={{ marginTop: 8 }}>Tải lên</div>
                                </div>
                            )}
                        </Upload>
                        <Modal visible={previewVisible} title={previewTitle} footer={null} onCancel={handleCancel}>
                            <img alt="example" style={{ width: '100%' }} src={previewImage} />
                        </Modal>
                    </Col>
                </Row>
            </Modal >
        </>
    );
}

export default ModalDetailProductDetail;