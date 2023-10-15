import * as OrdersApi from '../../../../../services/OrdersApi'
import ReactPaginate from 'react-paginate';
import { FaThList } from 'react-icons/fa';
import { useState, useEffect } from "react";
import { Checkbox } from 'antd';
const OrderContent = (props) => {
    const [data, setData] = useState({});
    const [order, setOrder] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [size, setSize] = useState(5);
    const getByStatus = async (sizeProp) => {
        const result = await OrdersApi.getOrdersByStatus(currentPage,sizeProp, props.status);
        setData(result);
        setOrder(result.content);
    }
    useEffect(() => {
        getByStatus(size);
    }, [])
    const fomatDate = (time) => {
        const date = new Date(time);
        return `${date.getDate()}/${date.getMonth()}/${date.getFullYear()} ${date.getHours()}:${date.getDate()}`;
    }
    // const handleSize=(vl)=>{
    //     setSize(vl);
    //     getByStatus();
    // }
    console.log(size)
    const handlePageClick = ({ selected }) => {
        setCurrentPage(selected);
        getByStatus(size);
    }
    return <div>
        <div className='manage-brand-table'>
            <div className='form-search-order'>
                <div className='list-brand-title'>
                    <div className="title">
                        <FaThList size={26} /> Danh Sách Hóa Đơn
                    </div>
                </div>
                <form className='nav-form-search'>
                    <div className='formGroup'>
                        <label className='label' >Mã HD</label>
                        <select className='input' >
                            {order.map((item, index) => {
                                return <option key={index} value={item.id}>HD2023{item.id}</option>
                            })}
                        </select>
                    </div>
                    <div className='formGroup'>
                        <label className='label' >price</label>
                        <input className='input' type="text"
                        />
                    </div>
                    <div className='formGroup'>
                        <label className='label' ></label>
                        <select className='input' 
                        // onChange={e=>{handleSize(e.target.value)}}
                        >
                            <option value={5}>5</option>
                            <option value={10}>10</option>
                            <option value={15}>15</option>
                            <option value={20}>20</option>
                        </select>
                    </div>
                </form>
            </div>
            <table className="table">
                <thead>
                    <tr>
                        <th><input type='checkbox' /></th>
                        <th>Mã HD</th>
                        <th>Khách Hàng</th>
                        <th>Số Điện Thoại</th>
                        <th>Tổng Tiền</th>
                        <th>Ngày Mua</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {order.map((item, index) => {
                        return (<tr key={index}>
                            <td><input type='checkbox' /></td>
                            <td>{item.code}</td>
                            <td>{item.userName}</td>
                            <td>{item.phoneNumber}</td>
                            <td>{item.totalMoney}</td>
                            <td>{fomatDate(item.createdAt)}</td>
                            <td>icon</td>
                        </tr>)
                    })}
                </tbody>
            </table>
            <div>
                <ReactPaginate
                    nextLabel={null}
                    onPageChange={handlePageClick}
                    pageRangeDisplayed={3}
                    marginPagesDisplayed={2}
                    pageCount={data.totalPages}
                    previousLabel={null}
                    pageClassName="page-item"
                    pageLinkClassName="page-link"
                    breakLabel="..."
                    breakClassName="page-item"
                    breakLinkClassName="page-link"
                    containerClassName="pagination"
                    activeClassName="active"
                    renderOnZeroPageCount={null}
                />
            </div>
        </div>
    </div>
}
export default OrderContent;