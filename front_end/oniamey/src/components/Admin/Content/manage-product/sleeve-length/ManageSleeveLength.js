import React from 'react';
import './ManageSleeveLength.scss';
import { CgDetailsLess } from 'react-icons/cg';
import { FaFilter, FaThList } from 'react-icons/fa';
import { MdLibraryAdd } from 'react-icons/md';
import { Container } from 'react-bootstrap';
import BreadcrumbsPage from '../../../BreadCrumbs/BreadcrumbsPage';

const ManageSleeveLength = (props) => {
    return (
        <div class="manage-sleeve-length-container">
            <div className='manage-sleeve-length-title'>
                <div className="title">
                    <CgDetailsLess size={32} /> Quản Lý Chiều Dài Tay
                </div>
            </div>
            <BreadcrumbsPage />

            <div className='manage-sleeve-length-search'>
                <div className='search-sleeve-length-title'>
                    <div className="title">
                        <FaFilter size={26} /> Bộ Lọc
                    </div>
                </div>

                <div className='main-container'>
                    <div className='w-50'>
                        <div class="row mb-3">
                            <label for="inputEmail3" class="col-sm-2 col-form-label">Chiều Dài Tay</label>
                            <div class="col d-flex align-content-between">
                                <input type="text" class="form-control me-4" id="inputEmail3" />
                                <button type="button" class="btn btn-secondary">Tìm Kiếm</button>
                            </div>
                        </div>
                        <div class="row mb-3">
                            <label for="inputPassword3" class="col-sm-2 col-form-label">Trạng Thái</label>
                            <div class="col d-flex">
                                <select class="form-select me-4" id="inputPassword3">
                                    <option value="option1">Option 1</option>
                                    <option value="option2">Option 2</option>
                                    <option value="option3">Option 3</option>
                                </select>
                                <button type="button" class="btn btn-secondary">Làm Mới</button>
                            </div>
                        </div>
                    </div>
                </div>


            </div>
            <div className='manage-sleeve-length-table'>
                <div className='list-sleeve-length-title'>
                    <div className="title">
                        <FaThList size={26} /> Danh Sách Chiều Dài Tay
                    </div>
                    <button type="button" class="btn btn-dark">
                        <MdLibraryAdd /> Thêm</button>
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
        </div >
    );
}

export default ManageSleeveLength;
