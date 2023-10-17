import { React, useState, useEffect } from 'react';
import './ManageMaterial.scss';
import { GiExplosiveMaterials } from 'react-icons/gi';
import { FaFilter, FaThList, FaPenSquare } from 'react-icons/fa';
import { MdLibraryAdd, MdDeleteSweep } from 'react-icons/md';
import ModalCreateMaterial from './ModalCreateMaterial';
import ModalUpdateMaterial from './ModalUpdateMaterial';
import ModalDeleteMaterial from './ModalDeleteMaterial';
import { getAllProperties } from '../../../../../services/apiService';

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

    const handleClickBtnUpdate = (material) => {
        setShowModalUpdateMaterial(true);
        setDataUpdate(material);
    }

    const handleClickBtnDelete = (material) => {
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
                <form>
                    <div class="row mb-3">
                        <label for="inputEmail3" class="col-sm-1 col-form-label">Chất Liệu</label>
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
            <div className='manage-material-table'>
                <div className='list-material-title'>
                    <div className="title">
                        <FaThList size={26} /> Danh Sách Chất Liệu
                    </div>
                    <button type="button" class="btn btn-dark" onClick={() => setShowModalCreateMaterial(true)}>
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
                        {listMaterial.length > 0 && listMaterial.map((material, index) => {
                            return (
                                <tr key={`table-brand-${index}`}>
                                    <td className="text-center">{index + 1}</td>
                                    <td className="text-center">{material.name}</td>
                                    <td className="text-center">{material.updatedAt}</td>
                                    <td className="text-center">{material.deleted === false ? 'Active' : 'DeActive'}</td>
                                    <td className="text-center">
                                        <div className="d-flex justify-content-center align-items-center">
                                            <button className="btn-update btn btn-dark mx-3 short-button"
                                                onClick={() => handleClickBtnUpdate(material)}
                                            >
                                                <FaPenSquare color='#ffffff' />
                                            </button>
                                            <button className="btn-delete btn btn-dark short-button"
                                                onClick={() => handleClickBtnDelete(material)}
                                            >
                                                <MdDeleteSweep />
                                            </button>
                                        </div>
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
                </table>
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
