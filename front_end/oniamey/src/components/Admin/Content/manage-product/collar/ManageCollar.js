import { React, useState, useEffect } from 'react';
import './ManageCollar.scss';
import { GiHeavyCollar } from 'react-icons/gi';
import { FaFilter, FaThList, FaPenSquare } from 'react-icons/fa';
import { MdLibraryAdd, MdDeleteSweep } from 'react-icons/md';
import ModalCreateCollar from './ModalCreateCollar';
import ModalUpdateCollar from './ModalUpdateCollar';
import ModalDeleteCollar from './ModalDeleteCollar';
import { getAllProperties } from '../../../../../services/apiService';

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

    const handleClickBtnUpdate = (collar) => {
        setShowModalUpdateCollar(true);
        setDataUpdate(collar);
    }

    const handleClickBtnDelete = (collar) => {
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
                <form>
                    <div class="row mb-3">
                        <label for="inputEmail3" class="col-sm-1 col-form-label">Cổ Áo</label>
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
            <div className='manage-collar-table'>
                <div className='list-collar-title'>
                    <div className="title">
                        <FaThList size={26} /> Danh Sách Cổ Áo
                    </div>
                    <button type="button" class="btn btn-dark" onClick={() => setShowModalCreateCollar(true)}>
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
                        {listCollar.length > 0 && listCollar.map((collar, index) => {
                            return (
                                <tr key={`table-brand-${index}`}>
                                    <td className="text-center">{index + 1}</td>
                                    <td className="text-center">{collar.name}</td>
                                    <td className="text-center">{collar.updatedAt}</td>
                                    <td className="text-center">{collar.deleted === false ? 'Active' : 'DeActive'}</td>
                                    <td className="text-center">
                                        <div className="d-flex justify-content-center align-items-center">
                                            <button className="btn-update btn btn-dark mx-3 short-button"
                                                onClick={() => handleClickBtnUpdate(collar)}
                                            >
                                                <FaPenSquare color='#ffffff' />
                                            </button>
                                            <button className="btn-delete btn btn-dark short-button"
                                                onClick={() => handleClickBtnDelete(collar)}
                                            >
                                                <MdDeleteSweep />
                                            </button>
                                        </div>
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
                </table>
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
