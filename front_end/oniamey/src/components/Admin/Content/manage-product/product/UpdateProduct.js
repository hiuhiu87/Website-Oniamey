import { React, useState, useEffect } from 'react';
import ReactPaginate from 'react-paginate';
import { FaFilter, FaThList, FaProductHunt, FaAngleLeft, FaAngleRight } from 'react-icons/fa';
import { MdLibraryAdd } from 'react-icons/md';
import { AiFillEye } from 'react-icons/ai';
import { getAllProductDetailsByProductId } from '../../../../../services/apiService';
import ModalDetailProductDetail from './ModalDetailProductDetail.js';
import _ from 'lodash';
import { useParams, useLocation } from 'react-router-dom';

const UpdateProduct = (props) => {

    const [showModalDetailProductDetail, setShowModalDetailProductDetail] = useState(false);

    const [dataDetail, setDataDetail] = useState({});

    const resetDataDelete = () => {
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



    const [pageProductDetail, setPageProductDetail] = useState(0);
    const limit = 5;
    const [totalPageProductDetails, setTotalPageProductDetails] = useState(0);

    useEffect(() => {
        fetchListProductDetailByProductId();
        fetchListProductDetailByProductId(productId, pageProductDetail, limit);
    }, [productId, pageProductDetail])

    const handlePageProductDetailChange = data => {
        const selectedPage = data.selected;
        setPageProductDetail(selectedPage);
    };

    const fetchListProductDetailByProductId = async () => {
        let response = await getAllProductDetailsByProductId(productId, pageProductDetail, limit);
        setListProductDetail(response.data.productDetails);
        console.log(response.data)
        setTotalPageProductDetails(response.data.totalPages);
    }

    return (
        <>
            <div class="manage-product-container">
                <div className='manage-material-title'>
                    <div className="title">
                        <FaProductHunt size={32} /> {productName}
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
                                        <td className="text-center">
                                            <input type="checkbox" checked={selectedItems[index]} onChange={() => handleSelectRow(index)} />
                                        </td>
                                        <td className="text-center">{index + 1}</td>
                                        <td className="text-center">
                                            <img src={`abc.png`} />
                                        </td>
                                        <td className="text-center">{item.name}</td>
                                        <td className="text-center">{item.quantity}</td>
                                        <td className="text-center">{item.price}</td>
                                        <td className="text-center">{item.size}</td>
                                        <td className="text-center">{item.color}</td>
                                        <td className="text-center">{item.deleted === false ? 'Hoạt động' : 'Ngừng hoạt động'}</td>
                                        <td className="text-center">
                                            <div className="d-flex justify-content-center align-items-center">
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
                    <div className='justify-content-center'>
                        <ReactPaginate
                            previousLabel={<FaAngleLeft size={25} />}
                            nextLabel={<FaAngleRight size={25} />}
                            breakLabel={'...'}
                            pageCount={totalPageProductDetails}
                            marginPagesDisplayed={2}
                            pageRangeDisplayed={5}
                            onPageChange={handlePageProductDetailChange}
                            containerClassName={'pagination'}
                            subContainerClassName={'pages pagination'}
                        />
                    </div>
                </div>
            </div>
            <ModalDetailProductDetail
                show={showModalDetailProductDetail}
                setShow={setShowModalDetailProductDetail}
                productName={productName}
            />
        </>
    );
}

export default UpdateProduct;