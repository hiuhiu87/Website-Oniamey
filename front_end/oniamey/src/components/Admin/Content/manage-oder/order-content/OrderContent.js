<<<<<<< HEAD
import * as OrdersApi from '../../../../../services/OrdersApi'
import './OrderContent.scss';
import '../common/text-custom.scss';
import { Pagination } from 'antd';
import { Input, Select } from 'antd';
import NavOrder from '../nav-order/NavOrder';
import { FaFilter, FaThList, FaEye } from 'react-icons/fa'; 
import { Link } from 'react-router-dom';
import { FaMoneyBill } from 'react-icons/fa';
import { useState, useEffect, useMemo } from "react";
import { Col, Form, Row } from 'react-bootstrap';

const OrderContent = (Props) => {
    const [countStatus, setCountStatus] = useState({});
    const getCountStatus = async (orderType, keySearch) => {
        const result = await OrdersApi.getCountStatus(orderType, keySearch);
        setCountStatus(result);
    }
    const [orderType, setOrderType] = useState('none');
    const [keySearch, setKeySearch] = useState('none');
    const [data, setData] = useState({});
    const [pageActive, setPageActive] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [size, setSize] = useState(5);

    const getByStatus = async (page, sizeProp, status, orderType, keySearch) => {
        const result = await OrdersApi.getOrdersByStatus(page, sizeProp, status, orderType, keySearch);
        getCountStatus(orderType, keySearch);
        setData(result);
    }
    const handleSize = (value) => {
        setSize(value);
        getByStatus(0, value, Props.status, orderType, keySearch);
=======
import * as OrdersApi from '../../../../../services/OderApi'
import './OrderContent.scss'
import { FaThList, FaEye } from 'react-icons/fa';
import { useState, useEffect } from "react";
const OrderContent = (Props) => {
    const [data, setData] = useState({});
    const [listData, setListData] = useState();
    const [pageActive, setPageActive] = useState(0);
    const [currentPage, setCurrentPage] = useState(0);
    const [size, setSize] = useState(5);
    const [checked, setChecked] = useState([]);
    const fomatDate = (time) => {
        const date = new Date(time);
        return `${date.getDate()}/${date.getMonth()}/${date.getFullYear()} ${date.getHours()}:${date.getDate()}`;
    }
    const getByStatus = async (page, sizeProp, status) => {
        const result = await OrdersApi.getOrdersByStatus(page, sizeProp, status);
        setData(result);
        getAll();
    }
    const handleSize = (value) => {
        setSize(value);
        getByStatus(0, value, Props.status);
>>>>>>> 2688de69465689eb80f298b598da8f3ce3565eca
        setCurrentPage(1);
    }
    useEffect(() => {
        setPageActive(0);
        setCurrentPage(1);
<<<<<<< HEAD
        getByStatus(0, size, Props.status, orderType, keySearch);
    }, [Props.status]);
    useEffect(() => {
        getByStatus(0, size, Props.status, orderType, keySearch);
    }, []);
    const handleChangePage = (index) => {
        setPageActive(index)
        setCurrentPage(index);
        getByStatus(index - 1, size, Props.status, orderType, keySearch);
    }

    const handleChangeType = (value) => {
        getByStatus(0, size, Props.status, value, keySearch);
        setOrderType(value);
    }
    const handleSearch = (value) => {
        if (value === '') {
            getByStatus(0, size, Props.status, orderType, 'none');
            setKeySearch('none');
        } else {
            getByStatus(0, size, Props.status, orderType, value);
            setKeySearch(value);
        }
    }
    return <div className='manage-order-all-content'>
        <div className='manager-order-title'>
            <div className="order-title">
                <FaMoneyBill /> Quản Lý Hóa Đơn
            </div>
        </div>
        <div className='order-content-form-search'>
            <div className='title-bo-loc'><FaFilter size={26} /> Bộ Lọc</div>

            <Form>
                <Row className="mb-3 justify-content-md-center">
                    <Form.Label column sm="1">
                        Tìm kiếm
                    </Form.Label>
                    <Col sm="6" xs lg="4">
                        <Input placeholder="Tìm kiếm hóa đơn" onChange={e => { handleSearch(e.target.value) }} />
                    </Col>
                </Row>
                <Row className="mb-3 justify-content-md-center ">
                    <Form.Label column sm="1">
                        Loại
                    </Form.Label>
                    <Col sm="6" xs lg="4">
                        <Select
                            defaultValue="Tất cả"
                            style={{ width: '150px' }}
                            onChange={handleChangeType}
                            options={[
                                {
                                    label: 'Loại hóa đơn',
                                    options: [
                                        {
                                            label: 'Tất cả',
                                            value: 'none',
                                        }, {
                                            label: 'Offline',
                                            value: 'OFFLINE',
                                        },
                                        {
                                            label: 'Online',
                                            value: 'ONLINE',
                                        },
                                    ],
                                }
                            ]}
                        />
                    </Col>
                </Row>
            </Form>
        </div>
=======
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
    const handleCheckBox = (id) => {
        setChecked(preChecked => {
            const isCheck = checked.includes(id);
            if (isCheck) {
                return checked.filter((item) => item !== id);
            } else {
                return [...preChecked, id];
            }
        });
    }
    const getAll = async () => {
        const res = await OrdersApi.getByStatus(Props.status);
        setListData(res);
    }
    const handleSelectAll = () => {
        if (data.totalElements === checked.length) {
            setChecked([])
        } else {
            const listId = () => {
                const list = [];
                listData.map((item) => {
                    list.push(item.id);
                });
                return list;
            }
            setChecked(listId());
        }
    }
    return <div>
>>>>>>> 2688de69465689eb80f298b598da8f3ce3565eca
        <div className='manage-order-content-table'>
            <div className='form-search-order'>
                <div className='or-title'>
                    <div className="title">
                        <FaThList size={26} /> Danh Sách Hóa Đơn
                    </div>
                </div>
                <form className='nav-form-search'>
<<<<<<< HEAD
                    <div className='order-formGroup'>
                        <select className='order-input form-select'
                            value={size}
                            onChange={e => {
                                handleSize(e.target.value)
                            }}  >
=======
                    {/* <div className='formGroup'>
                        <select className='input' value={'mahd'} >
                            <option disabled value={'mahd'} >Mã HD</option>
                            {data.content && data.content.map((item, index) => {
                                return <option key={index} value={item.id}>{item.code}</option>
                            })}
                        </select>
                    </div>  */}
                    <div className='formGroup'>
                        <label className='label' ></label>
                        <select className='input'
                            value={size}
                            onChange={e => { handleSize(e.target.value) }}
                        >
>>>>>>> 2688de69465689eb80f298b598da8f3ce3565eca
                            <option value={5}>5</option>
                            <option value={10}>10</option>
                            <option value={15}>15</option>
                            <option value={20}>20</option>
                        </select>
                    </div>
                </form>
<<<<<<< HEAD

            </div>
            <div className='nav-order-contentt'>
                <NavOrder countStatus={countStatus} />
=======
>>>>>>> 2688de69465689eb80f298b598da8f3ce3565eca
            </div>
            <table className="table">
                <thead>
                    <tr>
<<<<<<< HEAD
                        <th>STT</th>
                        <th>Mã HD</th>
                        <th>Tên nhân viên</th>
                        <th>Tên Khách Hàng</th>
                        <th>Số Điện Thoại</th>
                        <th>Tổng Tiền</th>
                        <th>Loại hóa đơn</th>
                        <th>Trạng thái</th>
=======
                        <th><input type='checkbox'
                            checked={data.totalElements === checked.length}
                            onChange={handleSelectAll} /></th>
                        <th>Mã HD</th>
                        <th>Khách Hàng</th>
                        <th>Số Điện Thoại</th>
                        <th>Tổng Tiền</th>
                        <th>Ngày Mua</th>
>>>>>>> 2688de69465689eb80f298b598da8f3ce3565eca
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {data.content && data.content.map((item, index) => {
                        return (<tr key={index}>
<<<<<<< HEAD
                            <td>{index + data.pageable.offset + 1}</td>
                            <td>{item.code}</td>
                            <td>{item.tenNhanVien}</td>
                            <td>{item.userName}</td>
                            <td>{item.phoneNumber}</td>
                            <td>{item.totalMoney}</td>
                           <td > <div id={`text-id-${item.type}`}>{item.type}</div></td> 
                            <td>{item.status}</td>
                            <td><Link to={`../${item.id}`}>{<FaEye style={{ color: 'black', fontSize: '24px' }} />}</Link></td>
=======
                            <td><input type='checkbox'
                                checked={checked.includes(item.id)}
                                onChange={() => { handleCheckBox(item.id) }} /></td>
                            <td>{item.code}</td>
                            <td>{item.userName}</td>
                            <td>{item.phoneNumber}</td>
                            <td>{item.totalMoney}</td>
                            <td>{fomatDate(item.createdAt)}</td>
                            <td>{<FaEye style={{ color: '#cc9966', fontSize: '24px' }} />}</td>
>>>>>>> 2688de69465689eb80f298b598da8f3ce3565eca
                        </tr>)
                    })}
                </tbody>
            </table>
            <div className='page-footer'>
<<<<<<< HEAD
                {data.content && data.content.length > 0 ? <Pagination
                    onChange={(pageNumber) => handleChangePage(pageNumber)}
                    simple
                    current={currentPage}
                    defaultCurrent={1}
                    total={data.totalPages ? (data.totalPages * 10) : 1} /> : null}
=======
                {data.totalPages ? <div >{'Trang: ' + currentPage + '/' + data.totalPages}</div> : null}
                {data.totalPages ? (<div className='page-item'>
                    {Array.from({ length: data.totalPages }, (_, index) => (
                        <button className={`${pageActive === index ? 'page-active' : ''} item `} key={index + 1}
                            onClick={() => { handleChangePage(index) }}>
                            {index + 1}
                        </button>
                    ))}
                </div>) : null}
>>>>>>> 2688de69465689eb80f298b598da8f3ce3565eca
            </div>
        </div>
    </div>
}

<<<<<<< HEAD
export default OrderContent;
=======
export default OrderContent;
>>>>>>> 2688de69465689eb80f298b598da8f3ce3565eca
