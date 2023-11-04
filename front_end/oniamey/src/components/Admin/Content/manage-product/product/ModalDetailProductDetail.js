import { React, useState, useEffect } from 'react';
import { Modal, QRCode, Space, Upload } from 'antd';
import { ConsoleSqlOutlined, PlusOutlined } from '@ant-design/icons';
import { MdLibraryAdd } from 'react-icons/md';
import _ from 'lodash';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import ModalCreateProduct from './ModalCreateProduct';
import ModalCreateBrand from '../brand/ModalCreateBrand';
import ModalCreateMaterial from '../material/ModalCreateMaterial';
import ModalCreateCategory from '../category/ModalCreateCategory';
import ModalCreateCollar from '../collar/ModalCreateCollar';
import ModalCreateSleeveLength from '../sleeve-length/ModalCreateSleeveLength';

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

    console.log('data', dataDetail)
    console.log('dataa', sizeId)

    useEffect(() => {
        setBrandId(dataDetail.brand);
        setCategoryId(dataDetail.category);
        setMaterialId(dataDetail.material);
        setCollarId(dataDetail.collar);
        setSleeveLengthId(dataDetail.sleeveLength);
        setSizeId(dataDetail.size);
        setColorId(dataDetail.color);
        setName(dataDetail.name);
        setPrice(dataDetail.price);
        setQuantity(dataDetail.quantity);
    }, [dataDetail])

    const { show, setShow } = props;

    const [showModalCreateBrand, setShowModalCreateBrand] = useState(false);
    const [showModalCreateCategory, setShowModalCreateCategory] = useState(false);
    const [showModalCreateMaterial, setShowModalCreateMaterial] = useState(false);
    const [showModalCreateCollar, setShowModalCreateCollar] = useState(false);
    const [showModalCreateSleeveLength, setShowModalCreateSleeveLength] = useState(false);

    const handleClose = () => {
        setShow(false);
        resetDataDetail();
    };

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
            <Modal title="Chi Tiết Sản Phẩm" width={1200} centered
                open={show} onOk={handleClose} onCancel={handleClose}>
                <Container className="row g-3">
                    <div className="col-md-12">
                        <label className="form-label">Tên</label>
                        <input
                            type="text"
                            className="form-control"
                            value={props.productName}
                        />
                    </div>
                    <div className="col-md-12">
                        <label className="form-label">Mô tả</label>
                        <textarea
                            type="text"
                            className="form-control"
                        // value={listProduct.find((product) => product.id === props.productId).description}
                        />
                    </div>
                    <Row className="mt-5 mb-3 justify-content-md-center">
                        <Col lg="3">
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
                                        <label htmlFor="floatingSelectGrid" className='text-floating'>Thương hiệu</label>
                                    </div>
                                    <button type="button" className="btn btn-dark ms-2 btn-add-property" onClick={() => setShowModalCreateBrand(true)}><MdLibraryAdd /></button>
                                </div>
                            </div>
                        </Col>
                        <Col lg="3">
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
                                        <label htmlFor="floatingSelectGrid" className='text-floating'>Danh mục</label>
                                    </div>
                                    <button type="button" className="btn btn-dark ms-2 btn-add-property" onClick={() => setShowModalCreateCategory(true)}><MdLibraryAdd /></button>
                                </div>
                            </div>
                        </Col>
                        <Col lg="4">
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
                                        <label htmlFor="floatingSelectGrid" className='text-floating' >Chất liệu</label>
                                    </div>
                                    <button type="button" className="btn btn-dark ms-2 btn-add-property" onClick={() => setShowModalCreateMaterial(true)}><MdLibraryAdd /></button>
                                </div>
                            </div>
                        </Col>
                    </Row>
                    <Row className="mt-3 mb-3">
                        <Col xs lg="3">
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
                                        <label htmlFor="floatingSelectGrid" className='text-floating'>Cổ áo</label>
                                    </div>
                                    <button type="button" className="btn btn-dark ms-2 btn-add-property" onClick={() => setShowModalCreateCollar(true)}><MdLibraryAdd /></button>
                                </div>
                            </div>
                        </Col>
                        <Col xs lg="3">
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
                                        <label htmlFor="floatingSelectGrid" className='text-floating'>Chiều dài tay</label>
                                    </div>
                                    <button type="button" className="btn btn-dark ms-2 btn-add-property" onClick={() => setShowModalCreateSleeveLength(true)}><MdLibraryAdd /></button>
                                </div>
                            </div>
                        </Col>
                        <Col xs lg="3">
                            <div class="col-md-2">
                                <div className='d-flex justify-content-between align-items-center'>
                                    <div className="form-floating">
                                        <select className="form-select" value={colorId} style={{ minWidth: '200px' }}>
                                            {listColor.map(color => (
                                                <option key={color.id} value={color.id}>
                                                    {color.name}
                                                </option>
                                            ))}
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
                                        <select className="form-select" value={sizeId} style={{ minWidth: '200px' }}>
                                            {listSize.map(size => (
                                                <option key={size.id} value={size.id}>
                                                    {size.name}
                                                </option>
                                            ))}
                                        </select>
                                        <label htmlFor="floatingSelectGrid" className='text-floating'>Kích cỡ</label>
                                    </div>
                                    <button type="button" className="btn btn-dark ms-2 btn-add-property"><MdLibraryAdd /></button>
                                </div>
                            </div>
                        </Col>
                    </Row>
                    <Row className=' justify-content-center mt-3'>
                        <Col>
                            <div>
                                <div className="col-md-12 mb-3">
                                    <label className="form-label">Số lượng</label>
                                    <input
                                        type="number"
                                        className="form-control"
                                        defaultValue={quantity}
                                    />
                                </div>
                                <div className="col-md-12">
                                    <label className="form-label">Giá bán</label>
                                    <input
                                        type="number"
                                        className="form-control"
                                        defaultValue={price}
                                    />
                                </div>
                            </div>
                        </Col>
                        <Col className='ms-5 d-flex justify-content-center align-items-center'>
                            <Space>
                                <img src={`https://upload-product-image-file.s3.us-west-2.amazonaws.com/${name}-QRCODE.png`} />
                            </Space>
                        </Col>
                    </Row>
                    <Row className='mt-5 mb-5'>
                        <Col>
                            Hình ảnh
                            <div className='mt-2'>
                                <Upload
                                    action="URL_API_TAI_LEN"
                                    listType="picture-card"
                                    fileList={fileList}
                                    onPreview={handlePreview}
                                    onChange={handleChange}
                                    multiple={true}
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
                            </div>
                        </Col>
                    </Row>
                </Container>
            </Modal >
        </>
    );
}

export default ModalDetailProductDetail;