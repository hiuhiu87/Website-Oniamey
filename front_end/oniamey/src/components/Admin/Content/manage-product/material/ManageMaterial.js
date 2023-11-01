import { React, useState, useEffect } from 'react';
import './ManageMaterial.scss';
import { GiExplosiveMaterials } from 'react-icons/gi';
import { FaFilter, FaThList, FaPenSquare } from 'react-icons/fa';
import { MdLibraryAdd, MdDeleteSweep } from 'react-icons/md';
import ModalCreateMaterial from './ModalCreateMaterial';
import ModalUpdateMaterial from './ModalUpdateMaterial';
import ModalDeleteMaterial from './ModalDeleteMaterial';
import { getAllProperties } from '../../../../../services/apiService';
import { Button, Col, Container, Form, Row, Table } from 'react-bootstrap';

const ManageMaterial = (props) => {

    const [showModalCreateMaterial, setShowModalCreateMaterial] = useState(false);
    const [showModalUpdateMaterial, setShowModalUpdateMaterial] = useState(false);
    const [showModalDeleteMaterial, setShowModalDeleteMaterial] = useState(false);

    const [dataUpdate, setDataUpdate] = useState({});
    const [dataDelete, setDataDelete] = useState({});

    const [listMaterial, setListMaterial] = useState([]);
    const [materialId, setMaterialId] = useState('');

    useEffect(() => {
        fetchListMaterial();
    }, []);

    const fetchListMaterial = async () => {
        let res = await getAllProperties('material');
        setListMaterial(res.data);
        setMaterialId(res.data[0].id)
        console.log(res);
    }

    const handleShowModalUpdateMaterial = (material) => {
        setShowModalUpdateMaterial(true);
        setDataUpdate(material);
    }

    const handleShowModalDeleteMaterial = (material) => {
        setShowModalDeleteMaterial(true);
        setDataDelete(material);
    }

    const resetDataDelete = () => {
        setDataDelete({});
    }

    const resetDataUpdate = () => {
        setDataUpdate({});
    }

    return (
        <div class="manage-material-container">
            <div className='manage-material-title'>
                <div className="title">
                    <GiExplosiveMaterials size={32} /> Quản Lý Chất Liệu
                </div>
            </div>
            <div className='manage-material-search'>
                <div className='search-material-title'>
                    <div className="title">
                        <FaFilter size={26} /> Bộ Lọc
                    </div>
                </div>
                <Form>
                    <Row className="mb-3 justify-content-md-center">
                        <Form.Label column sm="1">
                            Chất liệu
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
            <div className='manage-material-table'>
                <div className='list-material-title'>
                    <div className="title">
                        <FaThList size={26} /> Danh Sách Chất Liệu
                    </div>
                    <button type="button" class="btn btn-dark" onClick={() => setShowModalCreateMaterial(true)}>
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
                        {listMaterial.length > 0 && listMaterial.map((material, index) => {
                            return (
                                <tr key={`table-brand-${index}`}>
                                    <td className="text-center">{index + 1}</td>
                                    <td className="text-center">{material.name}</td>
                                    <td className="text-center">{material.updatedAt}</td>
                                    <td className="text-center">{material.deleted === false ? 'Active' : 'DeActive'}</td>
                                    <td className="text-center">
                                        <Row className='justify-content-md-center'>
                                            <Col md="auto">
                                                <Button
                                                    variant="dark"
                                                    onClick={() => handleShowModalUpdateMaterial(material)}
                                                >
                                                    <FaPenSquare />
                                                </Button>
                                            </Col>
                                            <Col xs lg="2">
                                                <Button
                                                    variant="dark"
                                                    onClick={() => handleShowModalDeleteMaterial(material)}
                                                >
                                                    <MdDeleteSweep />
                                                </Button>
                                            </Col>
                                        </Row>
                                    </td>
                                </tr>
                            )
                        })}
                        {listMaterial && listMaterial.length === 0 &&
                            <tr>
                                <td colSpan={5}>
                                    Không có Data!
                                </td>
                            </tr>
                        }
                    </tbody>
                </Table>
            </div>
            <ModalCreateMaterial
                show={showModalCreateMaterial}
                setShow={setShowModalCreateMaterial}
                fetchListMaterial={fetchListMaterial}
            />
            <ModalUpdateMaterial
                show={showModalUpdateMaterial}
                setShow={setShowModalUpdateMaterial}
                fetchListMaterial={fetchListMaterial}
                dataUpdate={dataUpdate}
                resetDataUpdate={resetDataUpdate}
            />
            <ModalDeleteMaterial
                show={showModalDeleteMaterial}
                setShow={setShowModalDeleteMaterial}
                fetchListMaterial={fetchListMaterial}
                dataDelete={dataDelete}
                resetDataDelete={resetDataDelete}
            />
        </div >
    );
}

export default ManageMaterial;