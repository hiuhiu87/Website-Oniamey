import { React, useState, useEffect } from 'react';
import './ManageBrand.scss';
import { SiBrandfolder } from 'react-icons/si';
import { FaFilter, FaThList, FaPenSquare } from 'react-icons/fa';
import { MdLibraryAdd, MdDeleteSweep } from 'react-icons/md';
import ModalCreateBrand from './ModalCreateBrand';
import ModalUpdateBrand from './ModalUpdateBrand';
import ModalDeleteBrand from './ModalDeleteBrand';
import { getAllProperties } from '../../../../../services/apiService';

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

    const handleClickBtnUpdate = (brand) => {
        setShowModalUpdateBrand(true);
        setDataUpdate(brand);
    }

    const handleClickBtnDelete = (brand) => {
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
                    <button type="button" class="btn btn-dark" onClick={() => setShowModalCreateBrand(true)}>
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
                        {listBrand.length > 0 && listBrand.map((brand, index) => {
                            return (
                                <tr key={`table-brand-${index}`}>
                                    <td className="text-center">{index + 1}</td>
                                    <td className="text-center">{brand.name}</td>
                                    <td className="text-center">{brand.updatedAt}</td>
                                    <td className="text-center">{brand.deleted === false ? 'Active' : 'DeActive'}</td>
                                    <td className="text-center">
                                        <div className="d-flex justify-content-center align-items-center">
                                            <button className="btn-update btn btn-dark mx-3 short-button"
                                                onClick={() => handleClickBtnUpdate(brand)}
                                            >
                                                <FaPenSquare color='#ffffff' />
                                            </button>
                                            <button className="btn-delete btn btn-dark short-button"
                                                onClick={() => handleClickBtnDelete(brand)}
                                            >
                                                <MdDeleteSweep />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            )
                        })}
                        {listBrand && listBrand.length === 0 &&
                            <tr>
                                <td colSpan={5}>
                                    Không có Data!
                                </td>
                            </tr>
                        }
                    </tbody>
                </table>
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
        </div >
    );
}

export default ManageBrand;
