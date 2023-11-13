import { React, useState, useEffect } from 'react';
import './ManageColor.scss';
import { IoIosColorPalette } from 'react-icons/io';
import { FaFilter, FaThList, FaPenSquare } from 'react-icons/fa';
import { MdLibraryAdd, MdDeleteSweep } from 'react-icons/md';
import ModalCreateColor from './ModalCreateColor';
import ModalUpdateColor from './ModalUpdateColor';
import ModalDeleteColor from './ModalDeleteColor';
import { getAllProperties } from '../../../../../services/apiService';
import { Button, Col, Container, Form, Row, Table } from 'react-bootstrap';

const ManageColor = (props) => {

    const [showModalCreateColor, setShowModalCreateColor] = useState(false);
    const [showModalUpdateColor, setShowModalUpdateColor] = useState(false);
    const [showModalDeleteColor, setShowModalDeleteColor] = useState(false);

    const [dataUpdate, setDataUpdate] = useState({});
    const [dataDelete, setDataDelete] = useState({});

    const [listColor, setListColor] = useState([]);
    const [colorId, setColorId] = useState('');

    useEffect(() => {
        fetchListColor();
    }, []);

    const fetchListColor = async () => {
        let res = await getAllProperties('color');
        setListColor(res.data);
        setColorId(res.data[0].id)
        console.log(res);
    }

    const handleShowModalUpdateColor = (color) => {
        setShowModalUpdateColor(true);
        setDataUpdate(color);
    }

    const handleShowModalDeleteColor = (color) => {
        setShowModalDeleteColor(true);
        setDataDelete(color);
    }

    const resetDataDelete = () => {
        setDataDelete({});
    }

    const resetDataUpdate = () => {
        setDataUpdate({});
    }

    return (
        <Container>
            <div class="manage-color-container">
                <div className='manage-color-title'>
                    <div className="title">
                        <IoIosColorPalette size={32} /> Quản Lý Màu Sắc
                    </div>
                </div>
                <div className='manage-color-search'>
                    <div className='search-color-title'>
                        <div className="title">
                            <FaFilter size={26} /> Bộ Lọc
                        </div>

                    </div>
                    <Form>
                        <Row className="mb-3 justify-content-md-center">
                            <Form.Label column sm="1">
                                Màu sắc
                            </Form.Label>
                            <Col sm="6" xs lg ="4">
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
                            <Col sm="6" xs lg ="4">
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
                <div className='manage-color-table'>
                    <div className='list-color-title'>
                        <div className="title">
                            <FaThList size={26} /> Danh Sách Màu Sắc
                        </div>
                        <button type="button" class="btn btn-dark" onClick={() => setShowModalCreateColor(true)}>
                            <MdLibraryAdd /> Thêm</button>
                    </div>
                    <Table striped bordered hover responsive>
                        <thead>
                            <tr>
                                <th scope="col" className='px-5 text-center'>STT</th>
                                <th scope="col" className='px-5 text-center'>Tên</th>
                                <th scope="col" className='px-5 text-center'>Ngày Cập Nhật</th>
                                <th scope="col" className='px-5 text-center'>Trạng Thái</th>
                                <th scope="col" className='px-5 text-center'>Hành Động</th>
                            </tr>
                        </thead>
                        <tbody>
                            {listColor.length > 0 && listColor.map((color, index) => {
                                return (
                                    <tr key={`table-brand-${index}`}>
                                        <td className="text-center">{index + 1}</td>
                                        <td className="text-center">{color.name}</td>
                                        <td className="text-center">{color.updatedAt}</td>
                                        <td className="text-center">{color.deleted === false ? 'Active' : 'DeActive'}</td>
                                        <td className="text-center">
                                            <Row className='justify-content-md-center'>
                                                <Col md="auto">
                                                    <Button
                                                        variant="dark"
                                                        onClick={() => handleShowModalUpdateColor(color)}
                                                    >
                                                        <FaPenSquare />
                                                    </Button>
                                                </Col>
                                                <Col xs lg="2">
                                                    <Button
                                                        variant="dark"
                                                        onClick={() => handleShowModalDeleteColor(color)}
                                                    >
                                                        <MdDeleteSweep />
                                                    </Button>
                                                </Col>
                                            </Row>
                                        </td>
                                    </tr>
                                )
                            })}
                            {listColor && listColor.length === 0 &&
                                <tr>
                                    <td colSpan={5}>
                                        Không có Data!
                                    </td>
                                </tr>
                            }
                        </tbody>
                    </Table>
                </div>
                <ModalCreateColor
                    show={showModalCreateColor}
                    setShow={setShowModalCreateColor}
                    fetchListColor={fetchListColor}
                />
                <ModalUpdateColor
                    show={showModalUpdateColor}
                    setShow={setShowModalUpdateColor}
                    fetchListColor={fetchListColor}
                    dataUpdate={dataUpdate}
                    resetDataUpdate={resetDataUpdate}
                />
                <ModalDeleteColor
                    show={showModalDeleteColor}
                    setShow={setShowModalDeleteColor}
                    fetchListColor={fetchListColor}
                    dataDelete={dataDelete}
                    resetDataDelete={resetDataDelete}
                />
            </div >
        </Container>
    );
}

export default ManageColor;
