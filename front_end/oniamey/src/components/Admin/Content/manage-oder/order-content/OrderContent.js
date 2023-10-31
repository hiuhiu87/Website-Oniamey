import * as OrdersApi from '../../../../../services/OrdersApi'
import './OrderContent.scss';
import { Pagination } from 'antd';
import { Input, Select } from 'antd';
import NavOrder from '../nav-order/NavOrder';
import { FaFilter, FaThList, FaEye } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { FaMoneyBill } from 'react-icons/fa';
import { useState, useEffect,useMemo } from "react";
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
    const handleSize = ( value) => {
        setSize(value);
        getByStatus(0, value, Props.status, orderType, keySearch);
        setCurrentPage(1);
    }
    useEffect(() => {
        setPageActive(0);
        setCurrentPage(1);
        getByStatus(0, size, Props.status, orderType, keySearch);
    }, [Props.status]);
    useEffect(() => {
        getByStatus(0, size, Props.status, orderType, keySearch);
    }, []);
    const handleChangePage = (index) => {
        setPageActive(index)
        setCurrentPage(index );
        getByStatus(index-1, size, Props.status, orderType, keySearch);
    }
    
    const handleChangeType = (value) => {
        getByStatus(0, size, Props.status, value, keySearch);
        setOrderType(value);
    }
    const handleSearch = (value) => {
        if (value === '') {
            getByStatus(0, size, Props.status, orderType, 'none');
            setKeySearch('none');
        }else{
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
                        <Input placeholder="Tìm kiếm" onChange={e => { handleSearch(e.target.value) }} />
                    </Col>
                </Row>
                <Row className="mb-3 justify-content-md-center ">
                    <Form.Label column sm="1">
                        Loại
                    </Form.Label>
                    <Col sm="6" xs lg="4">
                        <Select
                            defaultValue="Tất cả"
                            
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
                            onChange={e => {
                                handleSize(e.target.value)
                            }}  >
                            <option value={5}>5</option>
                            <option value={10}>10</option>
                            <option value={15}>15</option>
                            <option value={20}>20</option>
                        </select>
                    </div>
                </form>

            </div>
            <div className='nav-order-contentt'>
                <NavOrder countStatus={countStatus} />
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
                            <td><Link to={`../${item.id}`}>{<FaEye style={{ color: 'black', fontSize: '24px' }} />}</Link></td>
                        </tr>)
                    })}
                </tbody>
            </table>
            <div className='page-footer'>  
                   {data.content && data.content.length>0? <Pagination
                    onChange={(pageNumber)=>handleChangePage(pageNumber)}
                    simple
                    current={currentPage}
                     defaultCurrent ={1}
                    total={data.totalPages?(data.totalPages*10):1}/> :null}
            </div>
        </div>
    </div>
}

export default OrderContent;