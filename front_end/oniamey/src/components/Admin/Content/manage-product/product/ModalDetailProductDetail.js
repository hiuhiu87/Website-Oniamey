import { React, useState } from 'react';
import { Modal, QRCode, Space, Upload } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { MdLibraryAdd, MdDeleteSweep } from 'react-icons/md';
import _ from 'lodash';
import { getAllProperties } from '../../../../../services/apiService';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';

const ModalDetailProductDetail = (props) => {

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

    const { show, setShow } = props;

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [deleted, setDeleted] = useState(false);

    const handleClose = () => {
        setShow(false);
        setName('');
        setDescription('');
        setDeleted(false);
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
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </div>
                    <Row className="mt-5 mb-3 justify-content-md-center">
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
                    <Row className=' justify-content-center mt-3'>
                        <Col>
                            <div>
                                <div className="col-md-12 mb-3">
                                    <label className="form-label">Số lượng</label>
                                    <input
                                        type="number"
                                        className="form-control"
                                    />
                                </div>
                                <div className="col-md-12">
                                    <label className="form-label">Giá bán</label>
                                    <input
                                        type="number"
                                        className="form-control"
                                    />
                                </div>
                            </div>
                        </Col>
                        <Col className='ms-5 d-flex justify-content-center align-items-center'>
                            <Space>
                                <QRCode type="canvas" value="https://ant.design/" />
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