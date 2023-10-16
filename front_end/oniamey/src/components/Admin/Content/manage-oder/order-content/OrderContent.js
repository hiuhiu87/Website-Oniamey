import * as OrdersApi from '../../../../../services/OrdersApi'
import './OrderContent.scss'
import { FaThList } from 'react-icons/fa';
import { useState, useEffect } from "react";
const OrderContent = (Props) => {
    const [data, setData] = useState({});
    const [pageActive, setPageActive] = useState(0);
    const [currentPage, setCurrentPage] = useState(0);
    const [size, setSize] = useState(5);
    const [checked, setChecked] = useState([]);
    const [checkAll, setCheckAll] = useState(false);
    const fomatDate = (time) => {
        const date = new Date(time);
        return `${date.getDate()}/${date.getMonth()}/${date.getFullYear()} ${date.getHours()}:${date.getDate()}`;
    }
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
    console.log(checked.length+'===='+data.totalElements)
    console.log(checkAll)
    const handleCheckBox = (id) => {
        if(checked.length===data.totalElements){
            setCheckAll(true);
        }else{
            setCheckAll(false);
        }
        setChecked(preChecked => {
            const isCheck = checked.includes(id);
            if (isCheck) {
                return checked.filter((item) => item !== id);
            } else {
                return [...preChecked, id];
            }
        });
    }
    console.log(checked);
    const handleSelectAll = () => {
        if (checkAll) {
            setChecked([])
            setCheckAll(false);
        } else {
            data.content.map((item) => {
                setChecked(preCheck => {
                    return [...preCheck, item.id]
                });
            });
            setCheckAll(true)
        }
    }
    return <div>
        <div className='manage-order-content-table'>
            <div className='form-search-order'>
                <div className='or-title'>
                    <div className="title">
                        <FaThList size={26} /> Danh Sách Hóa Đơn
                    </div>
                </div>
                <form className='nav-form-search'>
                    <div className='formGroup'>
                        <select className='input'  >
                            <option disabled selected >Mã HD</option>
                            {data.content && data.content.map((item, index) => {
                                return <option key={index} value={item.id}>{item.code}</option>
                            })}
                        </select>
                    </div> 
                    <div className='formGroup'>
                        <label className='label' ></label>
                        <select className='input'
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
                        <th><input type='checkbox'
                            checked={checkAll}
                            onChange={handleSelectAll} /></th>
                        <th>Mã HD</th>
                        <th>Khách Hàng</th>
                        <th>Số Điện Thoại</th>
                        <th>Tổng Tiền</th>
                        <th>Ngày Mua</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {data.content && data.content.map((item, index) => {
                        return (<tr key={index}>
                            <td><input type='checkbox'
                                checked={checked.includes(item.id)}
                                onChange={() => { handleCheckBox(item.id) }} /></td>
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
            <div className='page-footer'>
                {data.totalPages ? <div >{'Trang: ' + currentPage + '/' + data.totalPages}</div> : null}
                {data.totalPages ? (<div className='page-item'>
                    {Array.from({ length: data.totalPages }, (_, index) => (
                        <div className={`${pageActive === index ? 'page-active' : ''} item `} key={index + 1} onClick={() => { handleChangePage(index) }}>
                            {index + 1}
                        </div>
                    ))}
                </div>) : null}
            </div>
        </div>
    </div>
}

export default OrderContent;