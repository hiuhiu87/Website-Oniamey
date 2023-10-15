import { React, useState, useEffect } from 'react';
import './ManageColor.scss';
import { IoIosColorPalette } from 'react-icons/io';
import { FaFilter, FaThList, FaPenSquare } from 'react-icons/fa';
import { MdLibraryAdd, MdDeleteSweep } from 'react-icons/md';
import ModalCreateColor from './ModalCreateColor';
import ModalUpdateColor from './ModalUpdateColor';
import ModalDeleteColor from './ModalDeleteColor';
import { getAllProperties } from '../../../../../services/apiService';

const ManageColor = (props) => {

    const [showModalCreateColor, setShowModalCreateColor] = useState(false);
    const [showModalUpdateColor, setShowModalUpdateColor] = useState(false);
    const [showModalDeleteColor, setShowModalDeleteColor] = useState(false);

    const [dataUpdate, setDataUpdate] = useState({});
    const [dataDelete, setDataDelete] = useState({});

    const [listColor, setListColor] = useState([]);
    const [colorId, setColorId] = useState('');

    useEffect(() => {
        fetchListColor();
    }, []);

    const fetchListColor = async () => {
        let res = await getAllProperties('color');
        setListColor(res.data);
        setColorId(res.data[0].id)
        console.log(res);
    }

    const handleClickBtnUpdate = (color) => {
        setShowModalUpdateColor(true);
        setDataUpdate(color);
    }

    const handleClickBtnDelete = (color) => {
        setShowModalDeleteColor(true);
        setDataDelete(color);
    }

    const resetDataDelete = () => {
        setDataDelete({});
    }

    const resetDataUpdate = () => {
        setDataUpdate({});
    }

    return (
        <div class="manage-color-container">
            <div className='manage-color-title'>
                <div className="title">
                    <IoIosColorPalette size={32} /> Quản Lý Màu Sắc
                </div>
            </div>
            <div className='manage-color-search'>
                <div className='search-color-title'>
                    <div className="title">
                        <FaFilter size={26} /> Bộ Lọc
                    </div>

                </div>
                <form>
                    <div class="row mb-3">
                        <label for="inputEmail3" class="col-sm-1 col-form-label">Màu Sắc</label>
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
            <div className='manage-color-table'>
                <div className='list-color-title'>
                    <div className="title">
                        <FaThList size={26} /> Danh Sách Màu Sắc
                    </div>
                    <button type="button" class="btn btn-dark" onClick={() => setShowModalCreateColor(true)}>
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
                        {listColor.length > 0 && listColor.map((color, index) => {
                            return (
                                <tr key={`table-brand-${index}`}>
                                    <td className="text-center">{index + 1}</td>
                                    <td className="text-center">{color.name}</td>
                                    <td className="text-center">{color.updatedAt}</td>
                                    <td className="text-center">{color.deleted === false ? 'Active' : 'DeActive'}</td>
                                    <td className="text-center">
                                        <div className="d-flex justify-content-center align-items-center">
                                            <button className="btn-update btn btn-dark mx-3 short-button"
                                                onClick={() => handleClickBtnUpdate(color)}
                                            >
                                                <FaPenSquare color='#ffffff' />
                                            </button>
                                            <button className="btn-delete btn btn-dark short-button"
                                                onClick={() => handleClickBtnDelete(color)}
                                            >
                                                <MdDeleteSweep />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            )
                        })}
                        {listColor && listColor.length === 0 &&
                            <tr>
                                <td colSpan={5}>
                                    Không có Data!
                                </td>
                            </tr>
                        }
                    </tbody>
                </table>
            </div>
            <ModalCreateColor
                show={showModalCreateColor}
                setShow={setShowModalCreateColor}
                fetchListColor={fetchListColor}
            />
            <ModalUpdateColor
                show={showModalUpdateColor}
                setShow={setShowModalUpdateColor}
                fetchListColor={fetchListColor}
                dataUpdate={dataUpdate}
                resetDataUpdate={resetDataUpdate}
            />
            <ModalDeleteColor
                show={showModalDeleteColor}
                setShow={setShowModalDeleteColor}
                fetchListColor={fetchListColor}
                dataDelete={dataDelete}
                resetDataDelete={resetDataDelete}
            />
        </div >
    );
}

export default ManageColor;
