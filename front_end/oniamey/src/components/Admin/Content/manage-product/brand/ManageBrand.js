import React from 'react';
import './ManageBrand.scss';
import { SiBrandfolder } from 'react-icons/si';
import { FaFilter, FaThList } from 'react-icons/fa';
import { MdLibraryAdd } from 'react-icons/md';

const ManageBrand = (props) => {
    return (
        <div class="manage-brand-container">
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
                <form>
                    <div class="row mb-3">
                        <label for="inputEmail3" class="col-sm-1 col-form-label">Thương Hiệu</label>
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
            <div className='manage-brand-table'>
                <div className='list-brand-title'>
                    <div className="title">
                        <FaThList size={26} /> Danh Sách Thương Hiệu
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

export default ManageBrand;
