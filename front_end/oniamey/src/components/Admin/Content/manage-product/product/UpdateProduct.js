import { React, useState, useEffect } from 'react';
import ReactPaginate from 'react-paginate';
import { FaFilter, FaThList, FaProductHunt, FaAngleLeft, FaAngleRight } from 'react-icons/fa';
import { MdLibraryAdd } from 'react-icons/md';
import { AiFillEye } from 'react-icons/ai';
import { getAllProductDetailsByProductId } from '../../../../../services/apiService';
import { getAllProperties } from '../../../../../services/apiService';
import ModalDetailProductDetail from './ModalDetailProductDetail.js';
import _ from 'lodash';
import { useParams, useLocation } from 'react-router-dom';

const UpdateProduct = (props) => {

    const [brandId, setBrandId] = useState('');
    const [listBrand, setListBrand] = useState([]);
    const [categoryId, setCategoryId] = useState('');
    const [listCategory, setListCategory] = useState([]);
    const [materialId, setMaterialId] = useState('');
    const [listMaterial, setListMaterial] = useState([]);
    const [collarId, setCollarId] = useState('');
    const [listCollar, setListCollar] = useState([]);
    const [sleeveLengthId, setSleeveLengthId] = useState('');
    const [listSleeveLength, setListSleeveLength] = useState([]);
    const [sizeId, setSizeId] = useState('');
    const [listSize, setListSize] = useState([]);
    const [colorId, setColorId] = useState('');
    const [listColor, setListColor] = useState([]);

    const [showModalDetailProductDetail, setShowModalDetailProductDetail] = useState(false);

    const [dataDetail, setDataDetail] = useState({});

    useEffect(() => {
        fetchListBrand();
        fetchListCategory();
        fetchListCollar();
        fetchListSleeveLength();
        fetchListMaterial();
        fetchListSize();
        fetchListColor();
    }, []);

    const fetchListBrand = async () => {
        let response = await getAllProperties('brand');
        setListBrand(response.data);
        setBrandId(response.data[0].id);
    }

    const fetchListCategory = async () => {
        let response = await getAllProperties('category');
        setListCategory(response.data);
        setCategoryId(response.data[0].id)
    }

    const fetchListMaterial = async () => {
        let response = await getAllProperties('material');
        setListMaterial(response.data);
        setMaterialId(response.data[0].id)
    }

    const fetchListCollar = async () => {
        let response = await getAllProperties('collar');
        setListCollar(response.data);
        setCollarId(response.data[0].id)
    }

    const fetchListSleeveLength = async () => {
        let response = await getAllProperties('sleeve-length');
        setListSleeveLength(response.data);
        setSleeveLengthId(response.data[0].id)
    }

    const fetchListColor = async () => {
        let response = await getAllProperties('color');
        setListColor(response.data);
        setColorId(response.data[0].id)
    }

    const fetchListSize = async () => {
        let response = await getAllProperties('size');
        setListSize(response.data);
        setSizeId(response.data[0].id)
    }

    const resetDataDetail = () => {
        setDataDetail({});
    }

    const handleClickBtnDetail = (productDetail) => {
        setShowModalDetailProductDetail(true);
        setDataDetail(productDetail);
    }

    const { productId } = useParams();

    const location = useLocation();
    const productName = location.state.productName;

    const [listProductDetail, setListProductDetail] = useState([]);

    const [selectAll, setSelectAll] = useState(false);
    const [selectedItems, setSelectedItems] = useState({});

    const handleSelectAll = () => {
        const newSelectedItems = {};
        listProductDetail.forEach((item, index) => {
            newSelectedItems[index] = !selectAll;
        });
        setSelectedItems(newSelectedItems);
        setSelectAll(!selectAll);
    };

    const handleSelectRow = (index) => {
        const newSelectedItems = { ...selectedItems };
        newSelectedItems[index] = !selectedItems[index];
        setSelectedItems(newSelectedItems);
    };

    useEffect(() => {
        fetchListProductDetailByProductId();
    }, [productId])

    const fetchListProductDetailByProductId = async () => {
        let response = await getAllProductDetailsByProductId(productId);
        setListProductDetail(response.data);
    }

    console.log(listProductDetail)

    return (
        <>
            <div class="manage-product-container">
                <div className='manage-material-title'>
                    <div className="title">
                        <FaProductHunt size={32} /> Sản phẩm: {productName}
                    </div>
                </div>
                <div className='manage-material-search'>
                    <div className='search-material-title'>
                        <div className="title">
                            <FaFilter size={26} /> Bộ Lọc
                        </div>
                    </div>
                    <div className='main-search'>
                        <div className='w-50'>
                            <div class="row mb-3">
                                <label for="inputEmail3" class="col-sm-2 col-form-label">Sản phẩm</label>
                                <div class="col d-flex align-content-between">
                                    <input type="text" class="form-control me-4" id="inputEmail3" />
                                    <button type="button" class="btn btn-secondary">Tìm kiếm</button>
                                </div>
                            </div>
                            <div class="row mb-3">
                                <label for="inputPassword3" class="col-sm-2 col-form-label">Trạng thái</label>
                                <div class="col d-flex">
                                    <select class="form-select me-4" id="inputPassword3">
                                        <option value="option1">Option 1</option>
                                        <option value="option2">Option 2</option>
                                        <option value="option3">Option 3</option>
                                    </select>
                                    <button type="button" class="btn btn-secondary">Làm mới</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='manage-material-table'>
                    <div className='list-material-title'>
                        <div className="title">
                            <FaThList size={26} /> Danh Sách Sản Phẩm Chi Tiết
                        </div>
                        <button type="button" class="btn btn-dark">
                            <MdLibraryAdd /> Cập nhật</button>

                    </div>
                    <table className="table">
                        <thead style={{ backgroundColor: "black" }}>
                            <tr>
                                <th scope="col" className='px-1 text-center'>
                                    <input type="checkbox" checked={selectAll} onChange={handleSelectAll} />
                                </th>
                                <th scope="col" className='px-3 text-center'>#</th>
                                <th scope="col" className='px-5 text-center'>Ảnh</th>
                                <th scope="col" className='px-5 text-center'>Tên</th>
                                <th scope="col" className='px-4 text-center'>Số lượng</th>
                                <th scope="col" className='px-4 text-center'>Giá bán</th>
                                <th scope="col" className='px-4 text-center'>Kích cỡ</th>
                                <th scope="col" className='px-4 text-center'>Màu</th>
                                <th scope="col" className='px-4 text-center'>Trạng thái</th>
                                <th scope="col" className='px-3 text-center'>Hành động</th>
                            </tr>
                        </thead>
                        <tbody>
                            {listProductDetail.length > 0 && listProductDetail.map((item, index) => {
                                return (
                                    <tr key={`table-material-${index}`} className="room">
                                        <td className="text-center" style={{ verticalAlign: 'middle' }}>
                                            <input type="checkbox" checked={selectedItems[index]} onChange={() => handleSelectRow(index)} />
                                        </td>
                                        <td className="text-center" style={{ verticalAlign: 'middle' }}>{index + 1}</td>
                                        <td className="text-center image-product-detail" style={{ verticalAlign: 'middle', width: '5%' }}>
                                            <img src={`https://upload-product-image-file.s3.us-west-2.amazonaws.com/${item.cover}`} />
                                        </td>
                                        <td className="text-center" style={{ verticalAlign: 'middle' }}>{item.name}</td>
                                        <td className="text-center" style={{ verticalAlign: 'middle' }}>{item.quantity}</td>
                                        <td className="text-center" style={{ verticalAlign: 'middle' }}>{item.price}</td>
                                        <td className="text-center" style={{ verticalAlign: 'middle' }}>{item.size}</td>
                                        <td className="text-center" style={{ verticalAlign: 'middle' }}>{item.color}</td>
                                        <td className="text-center" style={{ verticalAlign: 'middle' }}>{item.deleted === false ? 'Hoạt động' : 'Ngừng hoạt động'}</td>
                                        <td className="text-center" style={{ verticalAlign: 'middle' }}>
                                            <div className="d-flex justify-content-center align-items-center" >
                                                <button className="btn-update btn btn-dark mx-3 short-button"
                                                    onClick={() => handleClickBtnDetail(item)}
                                                >
                                                    <AiFillEye color='#ffffff' />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                );
                            })}

                        </tbody>
                    </table>
                </div>
            </div>
            <ModalDetailProductDetail
                show={showModalDetailProductDetail}
                setShow={setShowModalDetailProductDetail}
                productName={productName}
                productId={productId}
                brandId={brandId}
                setBrandId={setBrandId}
                listBrand={listBrand}
                categoryId={categoryId}
                setCategoryId={setCategoryId}
                listCategory={listCategory}
                materialId={materialId}
                setMaterialId={setMaterialId}
                listMaterial={listMaterial}
                collarId={collarId}
                setCollarId={setCollarId}
                listCollar={listCollar}
                sleeveLengthId={sleeveLengthId}
                setSleeveLengthId={setSleeveLengthId}
                listSleeveLength={listSleeveLength}
                sizeId={sizeId}
                setSizeId={setSizeId}
                listSize={listSize}
                colorId={colorId}
                setColorId={setColorId}
                listColor={listColor}
                dataDetail={dataDetail}
                resetDataDetail={resetDataDetail}
            />
        </>
    );
}

export default UpdateProduct;