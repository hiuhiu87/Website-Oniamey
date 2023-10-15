import { React, useState, useEffect } from 'react';
import './ManageSleeveLength.scss';
import { CgDetailsLess } from 'react-icons/cg';
import { FaFilter, FaThList, FaPenSquare } from 'react-icons/fa';
import { MdLibraryAdd, MdDeleteSweep } from 'react-icons/md';
import ModalCreateSleeveLength from './ModalCreateSleeveLength';
import ModalUpdateSleeveLength from './ModalUpdateSleeveLength';
import ModalDeleteSleeveLength from './ModalDeleteSleeveLength';
import { getAllProperties } from '../../../../../services/apiService';

const ManageSleeveLength = (props) => {

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

    const handleClickBtnUpdate = (sleeveLength) => {
        setShowModalUpdateSleeveLength(true);
        setDataUpdate(sleeveLength);
    }

    const handleClickBtnDelete = (sleeveLength) => {
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
        <div class="manage-sleeve-length-container">
            <div className='manage-sleeve-length-title'>
                <div className="title">
                    <CgDetailsLess size={32} /> Quản Lý Chiều Dài Tay
                </div>
            </div>
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
                    <button type="button" class="btn btn-dark" onClick={() => setShowModalCreateSleeveLength(true)}>
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
                        {listSleeveLength.length > 0 && listSleeveLength.map((sleeveLength, index) => {
                            return (
                                <tr key={`table-brand-${index}`}>
                                    <td className="text-center">{index + 1}</td>
                                    <td className="text-center">{sleeveLength.name}</td>
                                    <td className="text-center">{sleeveLength.updatedAt}</td>
                                    <td className="text-center">{sleeveLength.deleted === false ? 'Active' : 'DeActive'}</td>
                                    <td className="text-center">
                                        <div className="d-flex justify-content-center align-items-center">
                                            <button className="btn-update btn btn-dark mx-3 short-button"
                                                onClick={() => handleClickBtnUpdate(sleeveLength)}
                                            >
                                                <FaPenSquare color='#ffffff' />
                                            </button>
                                            <button className="btn-delete btn btn-dark short-button"
                                                onClick={() => handleClickBtnDelete(sleeveLength)}
                                            >
                                                <MdDeleteSweep />
                                            </button>
                                        </div>
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
                </table>
            </div>
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
    );
}

export default ManageSleeveLength;
