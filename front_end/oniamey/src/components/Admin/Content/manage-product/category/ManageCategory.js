import { React, useState, useEffect } from 'react';
import './ManageCategory.scss';
import { MdCategory } from 'react-icons/md';
import { FaFilter, FaThList, FaPenSquare } from 'react-icons/fa';
import { MdLibraryAdd, MdDeleteSweep } from 'react-icons/md';
import ModalCreateCategory from './ModalCreateCategory';
import ModalUpdateCategory from './ModalUpdateCategory';
import ModalDeleteCategory from './ModalDeleteCategory';
import { getAllProperties } from '../../../../../services/apiService';
import { Button, Col, Container, Form, Row, Table } from 'react-bootstrap';

const ManageCategory = (props) => {

    const [showModalCreateCategory, setShowModalCreateCategory] = useState(false);
    const [showModalUpdateCategory, setShowModalUpdateCategory] = useState(false);
    const [showModalDeleteCategory, setShowModalDeleteCategory] = useState(false);

    const [dataUpdate, setDataUpdate] = useState({});
    const [dataDelete, setDataDelete] = useState({});

    const [listCategory, setListCategory] = useState([]);
    const [CategoryId, setCategoryId] = useState('');

    useEffect(() => {
        fetchListCategory();
    }, []);

    const fetchListCategory = async () => {
        let res = await getAllProperties('category');
        setListCategory(res.data);
        setCategoryId(res.data[0].id)
        console.log(res);
    }

    const handleShowModalUpdateCategory = (category) => {
        setShowModalUpdateCategory(true);
        setDataUpdate(category);
    }

    const handleShowModalDeleteCategory = (category) => {
        setShowModalDeleteCategory(true);
        setDataDelete(category);
    }

    const resetDataDelete = () => {
        setDataDelete({});
    }

    const resetDataUpdate = () => {
        setDataUpdate({});
    }

    return (
        <div class="manage-category-container">
            <div className='manage-category-title'>
                <div className="title">
                    <MdCategory size={32} /> Quản Lý Danh Mục
                </div>
            </div>
            <div className='manage-category-search'>
                <div className='search-category-title'>
                    <div className="title">
                        <FaFilter size={26} /> Bộ Lọc
                    </div>

                </div>
                <Form>
                    <Row className="mb-3 justify-content-md-center">
                        <Form.Label column sm="1">
                            Danh mục
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
            <div className='manage-category-table'>
                <div className='list-category-title'>
                    <div className="title">
                        <FaThList size={26} /> Danh Sách Danh Mục
                    </div>
                    <button type="button" class="btn btn-dark" onClick={() => setShowModalCreateCategory(true)}>
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
                        {listCategory.length > 0 && listCategory.map((category, index) => {
                            return (
                                <tr key={`table-brand-${index}`}>
                                    <td className="text-center">{index + 1}</td>
                                    <td className="text-center">{category.name}</td>
                                    <td className="text-center">{category.updatedAt}</td>
                                    <td className="text-center">{category.deleted === false ? 'Active' : 'DeActive'}</td>
                                    <td className="text-center">
                                        <Row className='justify-content-md-center'>
                                            <Col md="auto">
                                                <Button
                                                    variant="dark"
                                                    onClick={() => handleShowModalUpdateCategory(category)}
                                                >
                                                    <FaPenSquare />
                                                </Button>
                                            </Col>
                                            <Col xs lg="2">
                                                <Button
                                                    variant="dark"
                                                    onClick={() => handleShowModalDeleteCategory(category)}
                                                >
                                                    <MdDeleteSweep />
                                                </Button>
                                            </Col>
                                        </Row>
                                    </td>
                                </tr>
                            )
                        })}
                        {listCategory && listCategory.length === 0 &&
                            <tr>
                                <td colSpan={5}>
                                    Không có Data!
                                </td>
                            </tr>
                        }
                    </tbody>
                </Table>
            </div>
            <ModalCreateCategory
                show={showModalCreateCategory}
                setShow={setShowModalCreateCategory}
                fetchListCategory={fetchListCategory}
            />
            <ModalUpdateCategory
                show={showModalUpdateCategory}
                setShow={setShowModalUpdateCategory}
                fetchListCategory={fetchListCategory}
                dataUpdate={dataUpdate}
                resetDataUpdate={resetDataUpdate}
            />
            <ModalDeleteCategory
                show={showModalDeleteCategory}
                setShow={setShowModalDeleteCategory}
                fetchListCategory={fetchListCategory}
                dataDelete={dataDelete}
                resetDataDelete={resetDataDelete}
            />
        </div >
    );
}

export default ManageCategory;