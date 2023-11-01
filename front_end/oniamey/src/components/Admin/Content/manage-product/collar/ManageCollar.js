import { React, useState, useEffect } from 'react';
import './ManageCollar.scss';
import { GiHeavyCollar } from 'react-icons/gi';
import { FaFilter, FaThList, FaPenSquare } from 'react-icons/fa';
import { MdLibraryAdd, MdDeleteSweep } from 'react-icons/md';
import ModalCreateCollar from './ModalCreateCollar';
import ModalUpdateCollar from './ModalUpdateCollar';
import ModalDeleteCollar from './ModalDeleteCollar';
import { getAllProperties } from '../../../../../services/apiService';
import { Button, Col, Container, Form, Row, Table } from 'react-bootstrap';

const ManageCollar = (props) => {

    const [showModalCreateCollar, setShowModalCreateCollar] = useState(false);
    const [showModalUpdateCollar, setShowModalUpdateCollar] = useState(false);
    const [showModalDeleteCollar, setShowModalDeleteCollar] = useState(false);

    const [dataUpdate, setDataUpdate] = useState({});
    const [dataDelete, setDataDelete] = useState({});

    const [listCollar, setListCollar] = useState([]);
    const [CollarId, setCollarId] = useState('');

    useEffect(() => {
        fetchListCollar();
    }, []);

    const fetchListCollar = async () => {
        let res = await getAllProperties('collar');
        setListCollar(res.data);
        setCollarId(res.data[0].id)
        console.log(res);
    }

    const handleShowModalUpdateCollar = (collar) => {
        setShowModalUpdateCollar(true);
        setDataUpdate(collar);
    }

    const handleShowModalDeleteCollar = (collar) => {
        setShowModalDeleteCollar(true);
        setDataDelete(collar);
    }

    const resetDataDelete = () => {
        setDataDelete({});
    }

    const resetDataUpdate = () => {
        setDataUpdate({});
    }

    return (
        <div class="manage-collar-container">
            <div className='manage-collar-title'>
                <div className="title">
                    <GiHeavyCollar size={32} /> Quản Lý Cổ Áo
                </div>
            </div>
            <div className='manage-collar-search'>
                <div className='search-collar-title'>
                    <div className="title">
                        <FaFilter size={26} /> Bộ Lọc
                    </div>

                </div>
                <Form>
                    <Row className="mb-3 justify-content-md-center">
                        <Form.Label column sm="1">
                            Cổ áo
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
            <div className='manage-collar-table'>
                <div className='list-collar-title'>
                    <div className="title">
                        <FaThList size={26} /> Danh Sách Cổ Áo
                    </div>
                    <button type="button" class="btn btn-dark" onClick={() => setShowModalCreateCollar(true)}>
                        <MdLibraryAdd /> Thêm</button>
                </div>
                <Table striped hover responsive>
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
                        {listCollar.length > 0 && listCollar.map((collar, index) => {
                            return (
                                <tr key={`table-brand-${index}`}>
                                    <td className="text-center">{index + 1}</td>
                                    <td className="text-center">{collar.name}</td>
                                    <td className="text-center">{collar.updatedAt}</td>
                                    <td className="text-center">{collar.deleted === false ? 'Active' : 'DeActive'}</td>
                                    <td className="text-center">
                                        <Row className='justify-content-md-center'>
                                            <Col md="auto">
                                                <Button
                                                    variant="dark"
                                                    onClick={() => handleShowModalUpdateCollar(collar)}
                                                >
                                                    <FaPenSquare />
                                                </Button>
                                            </Col>
                                            <Col xs lg="2">
                                                <Button
                                                    variant="dark"
                                                    onClick={() => handleShowModalDeleteCollar(collar)}
                                                >
                                                    <MdDeleteSweep />
                                                </Button>
                                            </Col>
                                        </Row>
                                    </td>
                                </tr>
                            )
                        })}
                        {listCollar && listCollar.length === 0 &&
                            <tr>
                                <td colSpan={5}>
                                    Không có Data!
                                </td>
                            </tr>
                        }
                    </tbody>
                </Table>
            </div>
            <ModalCreateCollar
                show={showModalCreateCollar}
                setShow={setShowModalCreateCollar}
                fetchListCollar={fetchListCollar}
            />
            <ModalUpdateCollar
                show={showModalUpdateCollar}
                setShow={setShowModalUpdateCollar}
                fetchListCollar={fetchListCollar}
                dataUpdate={dataUpdate}
                resetDataUpdate={resetDataUpdate}
            />
            <ModalDeleteCollar
                show={showModalDeleteCollar}
                setShow={setShowModalDeleteCollar}
                fetchListCollar={fetchListCollar}
                dataDelete={dataDelete}
                resetDataDelete={resetDataDelete}
            />
        </div >
    );
}

export default ManageCollar;