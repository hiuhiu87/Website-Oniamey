import { React, useState, useEffect } from 'react';
import './ManageBrand.scss';
import { SiBrandfolder } from 'react-icons/si';
import { FaFilter, FaThList, FaPenSquare } from 'react-icons/fa';
import { MdLibraryAdd, MdDeleteSweep } from 'react-icons/md';
import ModalCreateBrand from './ModalCreateBrand';
import ModalUpdateBrand from './ModalUpdateBrand';
import ModalDeleteBrand from './ModalDeleteBrand';
import { getAllProperties } from '../../../../../services/apiService';
import { Button, Col, Container, Form, Row, Table } from 'react-bootstrap';

const ManageBrand = (props) => {

    const [showModalCreateBrand, setShowModalCreateBrand] = useState(false);
    const [showModalUpdateBrand, setShowModalUpdateBrand] = useState(false);
    const [showModalDeleteBrand, setShowModalDeleteBrand] = useState(false);

    const [dataUpdate, setDataUpdate] = useState({});
    const [dataDelete, setDataDelete] = useState({});

    const [listBrand, setListBrand] = useState([]);
    const [brandId, setBrandId] = useState('');

    useEffect(() => {
        fetchListBrand();
    }, []);

    const fetchListBrand = async () => {
        let res = await getAllProperties('brand');
        setListBrand(res.data);
        setBrandId(res.data[0].id)
        console.log(res);
    }

    const handleShowModalUpdateBrand = (brand) => {
        setShowModalUpdateBrand(true);
        setDataUpdate(brand);
    }

    const handleShowModalDeleteBrand = (brand) => {
        setShowModalDeleteBrand(true);
        setDataDelete(brand);
    }

    const resetDataDelete = () => {
        setDataDelete({});
    }

    const resetDataUpdate = () => {
        setDataUpdate({});
    }

    return (
        <div className="manage-brand-container">
            <div className='manage-brand-title'>
                <div className="title">
                    <SiBrandfolder size={32} /> Quản Lý Thương Hiệu
                </div>
            </div>
            <div className='manage-brand-search'>
                <div className='search-brand-title'>
                    <div className="title">
                        <FaFilter size={26} /> Bộ Lọc
                    </div>
                </div>
                <Form>
                    <Row className="mb-3 justify-content-md-center">
                        <Form.Label column sm="1">
                            Thương Hiệu
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
            <div className='manage-brand-table'>
                <div className='list-brand-title'>
                    <div className="title">
                        <FaThList size={26} /> Danh Sách Thương Hiệu
                    </div>
                    <Button
                        type="button"
                        variant="dark"
                        onClick={() => setShowModalCreateBrand(true)}
                    >
                        <MdLibraryAdd /> Thêm
                    </Button>
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
                        {listBrand.length > 0 && listBrand.map((brand, index) => {
                            return (
                                <tr key={`table-brand-${index}`}>
                                    <td className="text-center">{index + 1}</td>
                                    <td className="text-center">{brand.name}</td>
                                    <td className="text-center">{brand.updatedAt}</td>
                                    <td className="text-center">
                                        {brand.deleted === false ? 'Active' : 'Deactive'}
                                    </td>
                                    <td>
                                        <Row className='justify-content-md-center'>
                                            <Col md="auto">
                                                <Button
                                                    variant="dark"
                                                    onClick={() => handleShowModalUpdateBrand(brand)}
                                                >
                                                    <FaPenSquare />
                                                </Button>
                                            </Col>
                                            <Col xs lg="2">
                                                <Button
                                                    variant="dark"
                                                    onClick={() => handleShowModalDeleteBrand(brand)}
                                                >
                                                    <MdDeleteSweep />
                                                </Button>
                                            </Col>
                                        </Row>
                                    </td>
                                </tr>
                            );
                        })}
                        {listBrand && listBrand.length === 0 && (
                            <tr>
                                <td colSpan={5}>Không có Data!</td>
                            </tr>
                        )}
                    </tbody>
                </Table>
            </div>
            <ModalCreateBrand
                show={showModalCreateBrand}
                setShow={setShowModalCreateBrand}
                fetchListBrand={fetchListBrand}
            />
            <ModalUpdateBrand
                show={showModalUpdateBrand}
                setShow={setShowModalUpdateBrand}
                fetchListBrand={fetchListBrand}
                dataUpdate={dataUpdate}
                resetDataUpdate={resetDataUpdate}
            />
            <ModalDeleteBrand
                show={showModalDeleteBrand}
                setShow={setShowModalDeleteBrand}
                fetchListBrand={fetchListBrand}
                dataDelete={dataDelete}
                resetDataDelete={resetDataDelete}
            />
        </div>
    );
}

export default ManageBrand;