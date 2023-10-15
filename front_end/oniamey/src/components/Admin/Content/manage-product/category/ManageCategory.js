import { React, useState, useEffect } from 'react';
import './ManageCategory.scss';
import { MdCategory } from 'react-icons/md';
import { FaFilter, FaThList, FaPenSquare } from 'react-icons/fa';
import { MdLibraryAdd, MdDeleteSweep } from 'react-icons/md';
import ModalCreateCategory from './ModalCreateCategory';
import ModalUpdateCategory from './ModalUpdateCategory';
import ModalDeleteCategory from './ModalDeleteCategory';
import { getAllProperties } from '../../../../../services/apiService';

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

    const handleClickBtnUpdate = (category) => {
        setShowModalUpdateCategory(true);
        setDataUpdate(category);
    }

    const handleClickBtnDelete = (category) => {
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
                <form>
                    <div class="row mb-3">
                        <label for="inputEmail3" class="col-sm-1 col-form-label">Danh Mục</label>
                        <div class="col-sm-6 d-flex">
                            <input type="text" class="form-control me-2" id="inputEmail3" />
                            <button type="button" class="btn btn-secondary">Tìm Kiếm</button>
                        </div>
                    </div>
                    <div class="row mb-3">
                        <label for="inputPassword3" class="col-sm-1 col-form-label">Trạng Thái</label>
                        <div class="col-sm-6 d-flex">
                            <select class="form-select me-2" id="inputPassword3">
                                <option value="option1">Option 1</option>
                                <option value="option2">Option 2</option>
                                <option value="option3">Option 3</option>
                            </select>
                            <button type="button" class="btn btn-secondary">Làm Mới</button>
                        </div>
                    </div>
                </form>
            </div>
            <div className='manage-category-table'>
                <div className='list-category-title'>
                    <div className="title">
                        <FaThList size={26} /> Danh Sách Danh Mục
                    </div>
                    <button type="button" class="btn btn-dark" onClick={() => setShowModalCreateCategory(true)}>
                        <MdLibraryAdd /> Thêm</button>
                </div>
                <table class="table">
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
                                        <div className="d-flex justify-content-center align-items-center">
                                            <button className="btn-update btn btn-dark mx-3 short-button"
                                                onClick={() => handleClickBtnUpdate(category)}
                                            >
                                                <FaPenSquare color='#ffffff' />
                                            </button>
                                            <button className="btn-delete btn btn-dark short-button"
                                                onClick={() => handleClickBtnDelete(category)}
                                            >
                                                <MdDeleteSweep />
                                            </button>
                                        </div>
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
                </table>
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
