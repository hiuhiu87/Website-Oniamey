import * as OrdersApi from '../../../../../services/OrdersApi'
import './OrderContent.scss';
import NavOrder from '../nav-order/NavOrder';
import { Link } from 'react-router-dom';
import { FaThList, FaEye } from 'react-icons/fa';
import { useState, useEffect } from "react";
const OrderContent = (Props) => {
    const [data, setData] = useState({});
    const [pageActive, setPageActive] = useState(0);
    const [currentPage, setCurrentPage] = useState(0);
    const [size, setSize] = useState(5);
  
    const getByStatus = async (page, sizeProp, status) => {
        const result = await OrdersApi.getOrdersByStatus(page, sizeProp, status);
        setData(result);
    }
    const handleSize = (value) => {
        setSize(value);
        getByStatus(0, value, Props.status);
        setCurrentPage(1);
    }
    useEffect(() => {
        setPageActive(0);
        setCurrentPage(1);
        getByStatus(0, size, Props.status);
    }, [Props.status]);
    useEffect(() => {
        getByStatus(0, size, Props.status);
    }, []);
    const handleChangePage = (index) => {
        setPageActive(index)
        setCurrentPage(index + 1);
        getByStatus(index, size, Props.status);
    }

    return <div>
        <div className='nav-order'>
                <NavOrder/>
            </div>
        <div className='manage-order-content-table'>
            <div className='form-search-order'>
                <div className='or-title'>
                    <div className="title">
                        <FaThList size={26} /> Danh Sách Hóa Đơn
                    </div>
                </div>
                <form className='nav-form-search'>
                    <div className='order-formGroup'>
                        <select className='order-input form-select'
                            value={size}
                            onChange={e => { handleSize(e.target.value) }}
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
                        <th>STT</th>
                        <th>Mã HD</th>
                        <th>Tên nhân viên</th>
                        <th>Tên Khách Hàng</th>
                        <th>Số Điện Thoại</th>
                        <th>Tổng Tiền</th>
                        <th>Loại hóa đơn</th>
                        <th>Trạng thái</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {data.content && data.content.map((item, index) => {
                        return (<tr key={index}>
                            <td>{index + data.pageable.offset + 1}</td>
                            <td>{item.code}</td>
                            <td>{item.tenNhanVien}</td>
                            <td>{item.userName}</td>
                            <td>{item.phoneNumber}</td>
                            <td>{item.totalMoney}</td>
                            <td>{item.type}</td>
                            <td>{item.status}</td>
                            <td><Link to={`../${item.id}`}>{<FaEye style={{ color: 'black', fontSize: '24px' }}/>}</Link></td>
                        </tr>)
                    })}
                </tbody>
            </table>
            <div className='page-footer'>
                {data.totalPages ? <div >{'Trang: ' + currentPage + '/' + data.totalPages}</div> : null}
                {data.totalPages ? (<div className='page-item'>
                    {Array.from({ length: data.totalPages }, (_, index) => (
                        <button className={`${pageActive === index ? 'page-active' 
                        : ''} item `} key={index + 1}
                            onClick={() => { handleChangePage(index) }}>
                            {index + 1}
                        </button>
                    ))}
                </div>) : null}
            </div>
        </div>
    </div>
}

export default OrderContent;