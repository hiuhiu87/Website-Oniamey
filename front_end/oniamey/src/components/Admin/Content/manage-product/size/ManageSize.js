import { React, useState, useEffect } from 'react';
import './ManageSize.scss';
import { SiZend } from 'react-icons/si';
import { FaFilter, FaThList, FaPenSquare } from 'react-icons/fa';
import { MdLibraryAdd, MdDeleteSweep } from 'react-icons/md';
import ModalCreateSize from './ModalCreateSize';
import ModalUpdateSize from './ModalUpdateSize';
import ModalDeleteSize from './ModalDeleteSize';
import { getAllProperties } from '../../../../../services/apiService';

const ManageSize = (props) => {

    const [showModalCreateSize, setShowModalCreateSize] = useState(false);
    const [showModalUpdateSize, setShowModalUpdateSize] = useState(false);
    const [showModalDeleteSize, setShowModalDeleteSize] = useState(false);

    const [dataUpdate, setDataUpdate] = useState({});
    const [dataDelete, setDataDelete] = useState({});

    const [listSize, setListSize] = useState([]);
    const [sizeId, setSizeId] = useState('');

    useEffect(() => {
        fetchListSize();
    }, []);

    const fetchListSize = async () => {
        let res = await getAllProperties('size');
        setListSize(res.data);
        setSizeId(res.data[0].id)
        console.log(res);
    }

    const handleClickBtnUpdate = (size) => {
        setShowModalUpdateSize(true);
        setDataUpdate(size);
    }

    const handleClickBtnDelete = (size) => {
        setShowModalDeleteSize(true);
        setDataDelete(size);
    }

    const resetDataDelete = () => {
        setDataDelete({});
    }

    const resetDataUpdate = () => {
        setDataUpdate({});
    }

    return (
        <div class="manage-size-container">
            <div className='manage-size-title'>
                <div className="title">
                    <SiZend size={32} /> Quản Lý Kích Cỡ
                </div>
            </div>
            <div className='manage-size-search'>
                <div className='search-size-title'>
                    <div className="title">
                        <FaFilter size={26} /> Bộ Lọc
                    </div>

                </div>
                <form>
                    <div class="row mb-3">
                        <label for="inputEmail3" class="col-sm-1 col-form-label">Kích Cỡ</label>
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
            <div className='manage-size-table'>
                <div className='list-size-title'>
                    <div className="title">
                        <FaThList size={26} /> Danh Sách Kích Cỡ
                    </div>
                    <button type="button" class="btn btn-dark" onClick={() => setShowModalCreateSize(true)}>
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
                        {listSize.length > 0 && listSize.map((size, index) => {
                            return (
                                <tr key={`table-brand-${index}`}>
                                    <td className="text-center">{index + 1}</td>
                                    <td className="text-center">{size.name}</td>
                                    <td className="text-center">{size.updatedAt}</td>
                                    <td className="text-center">{size.deleted === false ? 'Active' : 'DeActive'}</td>
                                    <td className="text-center">
                                        <div className="d-flex justify-content-center align-items-center">
                                            <button className="btn-update btn btn-dark mx-3 short-button"
                                                onClick={() => handleClickBtnUpdate(size)}
                                            >
                                                <FaPenSquare color='#ffffff' />
                                            </button>
                                            <button className="btn-delete btn btn-dark short-button"
                                                onClick={() => handleClickBtnDelete(size)}
                                            >
                                                <MdDeleteSweep />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            )
                        })}
                        {listSize && listSize.length === 0 &&
                            <tr>
                                <td colSpan={5}>
                                    Không có Data!
                                </td>
                            </tr>
                        }
                    </tbody>
                </table>
            </div>
            <ModalCreateSize
                show={showModalCreateSize}
                setShow={setShowModalCreateSize}
                fetchListSize={fetchListSize}
            />
            <ModalUpdateSize
                show={showModalUpdateSize}
                setShow={setShowModalUpdateSize}
                fetchListSize={fetchListSize}
                dataUpdate={dataUpdate}
                resetDataUpdate={resetDataUpdate}
            />
            <ModalDeleteSize
                show={showModalDeleteSize}
                setShow={setShowModalDeleteSize}
                fetchListSize={fetchListSize}
                dataDelete={dataDelete}
                resetDataDelete={resetDataDelete}
            />
        </div >
    );
}

export default ManageSize;
