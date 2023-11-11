import { React, useState, useEffect } from 'react';
import './ManageSleeveLength.scss';
<<<<<<< HEAD
import {CgDetailsLess} from 'react-icons/cg';
import {FaFilter, FaThList} from 'react-icons/fa';
import {MdLibraryAdd} from 'react-icons/md';
import {Container} from 'react-bootstrap';
import BreadcrumbsPage from '../../../BreadCrumbs/BreadcrumbsPage';

const ManageSleeveLength = (props) => {
    return (
        <div class="manage-sleeve-length-container">
            <div className='manage-sleeve-length-title'>
                <div className="title">
                    <CgDetailsLess size={32}/> Quản Lý Chiều Dài Tay
                </div>
            </div>
            <BreadcrumbsPage/>
=======
import { CgDetailsLess } from 'react-icons/cg';
import { FaFilter, FaThList, FaPenSquare } from 'react-icons/fa';
import { MdLibraryAdd, MdDeleteSweep } from 'react-icons/md';
import ModalCreateSleeveLength from './ModalCreateSleeveLength';
import ModalUpdateSleeveLength from './ModalUpdateSleeveLength';
import ModalDeleteSleeveLength from './ModalDeleteSleeveLength';
import { getAllProperties } from '../../../../../services/apiService';
import { Button, Col, Container, Form, Row, Table } from 'react-bootstrap';

const ManageSleeveLength = (props) => {
>>>>>>> 2688de69465689eb80f298b598da8f3ce3565eca

    const [showModalCreateSleeveLength, setShowModalCreateSleeveLength] = useState(false);
    const [showModalUpdateSleeveLength, setShowModalUpdateSleeveLength] = useState(false);
    const [showModalDeleteSleeveLength, setShowModalDeleteSleeveLength] = useState(false);

    const [dataUpdate, setDataUpdate] = useState({});
    const [dataDelete, setDataDelete] = useState({});

    const [listSleeveLength, setListSleeveLength] = useState([]);
    const [SleeveLengthId, setSleeveLengthId] = useState('');

    useEffect(() => {
        fetchListSleeveLength();
    }, []);

    const fetchListSleeveLength = async () => {
        let res = await getAllProperties('sleeve-length');
        setListSleeveLength(res.data);
        setSleeveLengthId(res.data[0].id)
        console.log(res);
    }

    const handleShowModalUpdateSleeveLength = (sleeveLength) => {
        setShowModalUpdateSleeveLength(true);
        setDataUpdate(sleeveLength);
    }

    const handleShowModalDeleteSleeveLength = (sleeveLength) => {
        setShowModalDeleteSleeveLength(true);
        setDataDelete(sleeveLength);
    }

    const resetDataDelete = () => {
        setDataDelete({});
    }

    const resetDataUpdate = () => {
        setDataUpdate({});
    }

    return (
        <Container>
            <div class="manage-sleeve-length-container">
                <div className='manage-sleeve-length-title'>
                    <div className="title">
<<<<<<< HEAD
                        <FaFilter size={26}/> Bộ Lọc
                    </div>
                </div>

                <div className='main-container'>
                    <div className='w-50'>
                        <div class="row mb-3">
                            <label for="inputEmail3" class="col-sm-2 col-form-label">Chiều Dài Tay</label>
                            <div class="col d-flex align-content-between">
                                <input type="text" class="form-control me-4" id="inputEmail3"/>
                                <button type="button" class="btn btn-secondary">Tìm Kiếm</button>
                            </div>
=======
                        <CgDetailsLess size={32} /> Quản Lý Chiều Dài Tay
                    </div>
                </div>
                <div className='manage-sleeve-length-search'>
                    <div className='search-sleeve-length-title'>
                        <div className="title">
                            <FaFilter size={26} /> Bộ Lọc
>>>>>>> 2688de69465689eb80f298b598da8f3ce3565eca
                        </div>
                    </div>
                    <Form>
                        <Row className="mb-3 justify-content-md-center">
                            <Form.Label column sm="1">
                                Chiều dài
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
                <div className='manage-sleeve-length-table'>
                    <div className='list-sleeve-length-title'>
                        <div className="title">
                            <FaThList size={26} /> Danh Sách Chiều Dài Tay
                        </div>
                        <button type="button" class="btn btn-dark" onClick={() => setShowModalCreateSleeveLength(true)}>
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
                            {listSleeveLength.length > 0 && listSleeveLength.map((sleeveLength, index) => {
                                return (
                                    <tr key={`table-brand-${index}`}>
                                        <td className="text-center">{index + 1}</td>
                                        <td className="text-center">{sleeveLength.name}</td>
                                        <td className="text-center">{sleeveLength.updatedAt}</td>
                                        <td className="text-center">{sleeveLength.deleted === false ? 'Active' : 'DeActive'}</td>
                                        <td className="text-center">
                                            <Row className='justify-content-md-center'>
                                                <Col md="auto">
                                                    <Button
                                                        variant="dark"
                                                        onClick={() => handleShowModalUpdateSleeveLength(sleeveLength)}
                                                    >
                                                        <FaPenSquare />
                                                    </Button>
                                                </Col>
                                                <Col xs lg="2">
                                                    <Button
                                                        variant="dark"
                                                        onClick={() => handleShowModalDeleteSleeveLength(sleeveLength)}
                                                    >
                                                        <MdDeleteSweep />
                                                    </Button>
                                                </Col>
                                            </Row>
                                        </td>
                                    </tr>
                                )
                            })}
                            {listSleeveLength && listSleeveLength.length === 0 &&
                                <tr>
                                    <td colSpan={5}>
                                        Không có Data!
                                    </td>
                                </tr>
                            }
                        </tbody>
                    </Table>
                </div>
<<<<<<< HEAD


            </div>
            <div className='manage-sleeve-length-table'>
                <div className='list-sleeve-length-title'>
                    <div className="title">
                        <FaThList size={26}/> Danh Sách Chiều Dài Tay
                    </div>
                    <button type="button" class="btn btn-dark">
                        <MdLibraryAdd/> Thêm
                    </button>
                </div>
                <table class="table">
                    <thead>
                    <tr>
                        <th>STT</th>
                        <th>Tên</th>
                        <th>Ngày cập nhật</th>
                        <th>Trạng thái</th>
                        <th>Hành động</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td>Data 1</td>
                        <td>Data 2</td>
                        <td>Data 3</td>
                        <td>Data 3</td>
                        <td>Data 3</td>
                    </tr>
                    <tr>
                        <td>Data 1</td>
                        <td>Data 2</td>
                        <td>Data 3</td>
                        <td>Data 3</td>
                        <td>Data 3</td>
                    </tr>
                    <tr>
                        <td>Data 1</td>
                        <td>Data 2</td>
                        <td>Data 3</td>
                        <td>Data 3</td>
                        <td>Data 3</td>
                    </tr>
                    <tr>
                        <td>Data 1</td>
                        <td>Data 2</td>
                        <td>Data 3</td>
                        <td>Data 3</td>
                        <td>Data 3</td>
                    </tr>
                    <tr>
                        <td>Data 1</td>
                        <td>Data 2</td>
                        <td>Data 3</td>
                        <td>Data 3</td>
                        <td>Data 3</td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </div>
=======
                <ModalCreateSleeveLength
                    show={showModalCreateSleeveLength}
                    setShow={setShowModalCreateSleeveLength}
                    fetchListSleeveLength={fetchListSleeveLength}
                />
                <ModalUpdateSleeveLength
                    show={showModalUpdateSleeveLength}
                    setShow={setShowModalUpdateSleeveLength}
                    fetchListSleeveLength={fetchListSleeveLength}
                    dataUpdate={dataUpdate}
                    resetDataUpdate={resetDataUpdate}
                />
                <ModalDeleteSleeveLength
                    show={showModalDeleteSleeveLength}
                    setShow={setShowModalDeleteSleeveLength}
                    fetchListSleeveLength={fetchListSleeveLength}
                    dataDelete={dataDelete}
                    resetDataDelete={resetDataDelete}
                />
            </div >
        </Container>
>>>>>>> 2688de69465689eb80f298b598da8f3ce3565eca
    );
}

export default ManageSleeveLength;
