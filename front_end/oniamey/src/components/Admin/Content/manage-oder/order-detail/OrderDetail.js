import { Timeline, TimelineEvent } from '@mailtop/horizontal-timeline';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { Modal, Input } from 'antd';
import { FaEye } from 'react-icons/fa';
import * as OrderApi from '../../../../../services/OrdersApi'
import * as OrderHistoryApi from '../../../../../services/OrderHistoryApi'
import * as OrderDetailApi from '../../../../../services/OrderDetailApi'
import { FaRegCalendarCheck, FaRegFileAlt, FaShippingFast } from 'react-icons/fa';
import { GiCancel } from 'react-icons/gi';
import { AiOutlineFileDone } from 'react-icons/ai';
import { BsFillCalendarCheckFill } from 'react-icons/bs';
import { useParams } from 'react-router-dom';
import './OrderDetail.scss'
import { Col, Container, Row } from 'react-bootstrap';
const { TextArea } = Input;
const OrderContent = (props) => {
    const [listProduct, setListProduct] = useState([]);
    const params = useParams();
    const [order, setOrder] = useState({});
    const [descript, setDescript] = useState('');
    const [history, setHistory] = useState([]);
    const detail = async () => {
        const result = await OrderApi.detail(params.id);
        setOrder(result);
    }
    const getListProduct = async () => {
        const result = await OrderDetailApi.getListProductByOrderId(params.id);
        setProductTotalMoney(0);
        if (result) {
            result.map((item) => {
                setProductTotalMoney(preValue => {
                    return +(preValue) + (+(item.totalMoney));
                });
            })
        }
        setListProduct(result);
    }
    const [productTotalMoney, setProductTotalMoney] = useState(0);
    const getHistory = async () => {
        const result = await OrderHistoryApi.getOrderHistoryByOrderId(params.id);
        setHistory(
            result.map((item) => {
                const icon = item.status === "Chờ xác nhận" ? FaRegFileAlt :
                    item.status === "Đã xác nhận" ? AiOutlineFileDone :
                        item.status === "Đang giao" ? FaShippingFast :
                            item.status === "Đã giao" ? FaRegCalendarCheck :
                                item.status === "Hoàn thành" ? BsFillCalendarCheckFill : GiCancel;
                const newItem = {
                    createdAt: item.createdAt,
                    description: item.description,
                    confirmedBy: item.confirmedBy,
                    status: item.status,
                    icon: icon
                }
                return newItem;
            })
        );
    }
    useEffect(() => {
        getHistory();
        detail();
        getListProduct();
    }, []);
    const [newStatus, setNewStatus] = useState('');
    const [open, setOpen] = useState(false);
    const [openDetail, setOpenDetail] = useState(false);
    const showModal = (status) => {
        setNewStatus(status);
        setOpen(true);
    };
    const showOpenDetail = () => {
        setOpenDetail(true);
    };
    const handleChangeStatus = async () => {
        const data = {
            idOrder: params.id,
            actionDescription: descript,
            status: newStatus
        }
        const result = await OrderHistoryApi.updateOrderStatus(data);
        getHistory();
        detail();
        if (result.length > 0) {
            toast.success("Thành công!");
        } else {
            toast.error("Thất bại!");
        }
        setOpen(false)
    }

    return <div className='manage-order-detail'>
        <div className='order-detail-title'>
            <div className="detail-title">
                <FaEye size={26} /> Hóa Đơn: {order.code ? order.code : null}
            </div>

            <div className='time-line-order-detail'>
                <Timeline minEvents={5} placeholder>
                    {history.map((item, index) => {
                        return <TimelineEvent key={index}
                            color='#cc9966'
                            icon={item.icon}
                            title={item.status}
                            subtitle={OrderApi.formatDateTime(item.createdAt)}
                        />
                    })}
                </Timeline>
                <div>
                    {order.status === 'CANCEL' || order.status === 'SUCCESS' ? null : <div>
                        {order.status === 'PENDING' ? <button onClick={() => { showModal('CONFIRMED') }} type="button" className="btn order-detail-button-timeline btn-dark">Xác nhận</button> : null}
                        {order.status === 'CONFIRMED' && order.type === 'ONLINE' ? <button onClick={() => { showModal('SHIPPING') }} type="button" className="btn order-detail-button-timeline btn-dark">Giao hàng</button> : null}
                        {order.status === 'SHIPPING' && order.type === 'ONLINE' ? <button onClick={() => { showModal('SHIPPED') }} type="button" className="btn order-detail-button-timeline btn-dark">Đã giao</button> : null}
                        {order.status === 'SHIPPED' || (order.type === 'OFFLINE' && order.status === 'CONFIRMED') ? <button onClick={() => { showModal('SUCCESS') }} type="button" className="btn order-detail-button-timeline btn-dark">Hoàn thành</button> : null}
                        {order.status === 'PENDING' || (order.status === 'CONFIRMED' && order.status === 'CONFIRMED')
                            || order.status === "SHIPPING" ? <button type="button" onClick={() => { showModal('CANCEL') }} className="order-detail-button-cancel btn btn-dark">Hủy</button> : null}
                    </div>}
                    <button onClick={showOpenDetail} type="button" className="btn order-detail-button-history btn-dark">Lịch sử</button>
                </div>
                <div>
                    <Modal
                        open={open}
                        title="Xác nhận"
                        onCancel={() => { setOpen(false) }}
                        footer={[
                            <button className="btn  btn-dark" key="back" onClick={handleChangeStatus}>
                                Xác nhận
                            </button>,
                        ]}
                    >
                        <TextArea style={{ height: '100px' }} placeholder='Mô tả' showCount maxLength={200} onChange={(e) => { setDescript(e.target.value) }} /> <br /><br />
                    </Modal>
                    <Modal
                        open={openDetail}
                        title="Chi tiết"
                        onCancel={() => { setOpenDetail(false) }}
                        footer={null}
                        width={950}
                    >
                        <div>
                            <table className="table-order-history">
                                <thead>
                                    <tr>
                                        <th></th>
                                        <th>Trạng thái</th>
                                        <th>Thời gian</th>
                                        <th>Người xác nhận</th>
                                        <th>Ghi chú</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {history.map((item, index) => {
                                        return (<tr key={index}>
                                            <td>{<item.icon color={'#cc9966'} size={26} />}</td>
                                            <td>{item.status}</td>
                                            <td>{OrderApi.formatDateTime(item.createdAt)}</td>
                                            <td>{item.confirmedBy}</td>
                                            <td>{item.description}</td>
                                        </tr>)
                                    })}
                                    {history.length === 0 ? <tr>
                                        <td>{`-`}</td>
                                        <td> </td>
                                        <td> </td>
                                        <td> </td>
                                        <td> </td>
                                    </tr> : null
                                    }
                                </tbody>
                            </table>
                        </div>
                    </Modal>
                </div>
            </div>
            <div className='order-detail-information'>
                <div className='order-detail-information-title'>
                    <h4>Thông tin hóa đơn</h4>
                </div>
                <div className='information-order'>
                    <div className='information-order-header'>
                        <div className='order-infor-detail'>
                            <div className='item-information-order'>
                                Trạng thái:  <div>{order.status === 'PENDING' ? "Chờ xác nhận" : null}
                                    {order.status === 'CONFIRMED' ? "Đã xác nhận" : null}
                                    {order.status === 'SHIPPING' ? "Đang giao" : null}
                                    {order.status === 'SHIPPED' ? "Đã giao" : null}
                                    {order.status === 'SUCCESS' ? "Hoàn thành" : null}
                                    {order.status === 'CANCEL' ? "Hủy" : null}</div>
                            </div>
                            <div className='item-information-order'>
                                Tên nhân viên:  <div>{order.tenNhanVien}</div>
                            </div>
                            <div className='item-information-order'>
                                Số điện thoại:  <div>{order.phoneNumber || "-"}</div>
                            </div>
                            {order.type === 'ONLINE' ? <div className='item-information-order'>
                                Ngày nhận dự kiến:  <div>{OrderApi.formatDateTime(order.shipDate)}</div>
                            </div> : null}
                        </div>
                        <div className='order-infor-detail'>
                            <div className='item-information-order'>
                                Loại:  <div>{order.type === 'OFFLINE' ? "Tại quầy" : "Giao hàng"}   </div>
                            </div>
                            <div className='item-information-order'>
                                Tên khách hàng:  <div>{order.userName}</div>
                            </div>
                            {order.type === 'ONLINE' ? <div className='item-information-order'>
                                Địa chỉ:  <div>{order.address || "-"}   </div>
                            </div> : null}
                            <div className='item-information-order'>
                                Ghi chú đơn hàng:  <div>{order.note || "-"}   </div>
                            </div>
                            {order.type === 'ONLINE' ? <div className='item-information-order'>
                                Phí vận chuyển:  <div>{order.moneyShip}</div>
                            </div> : null}
                        </div>
                    </div>
                    <hr />
                    {/* <h6>Danh sách sản phẩm</h6> */}
                    <div>
                        {listProduct && listProduct.map((item, index) => {
                            return <Container key={index}>
                                <Row className='d-flex justify-content-sm-center align-items-center'>
                                    <Col xs lg={3}>
                                        <img src='./path/to/decorative-ima' alt='ảnh lỗi vl' />
                                    </Col>
                                    <Col xs lg={4}>
                                        <div><h6>{item.productDetailName}</h6></div>
                                        <div>{`Kích cỡ: ${item.sizeName}`}</div>
                                        <div>{`Màu: ${item.colorName}`}</div>
                                        <div>{`x ${item.quantity}`}</div>
                                    </Col>
                                    <Col xs lg={2}>
                                        {`Đơn giá: ${item.price} VND`}
                                    </Col>
                                    <Col xs lg={3}>
                                        {`Thành tiền: ${item.totalMoney} VND`}
                                    </Col>
                                </Row>
                            </Container>
                        })}
                    </div>
                    <hr />
                    <div className='order-detail-footer'>
                        <div>
                            <div className='d-flex money-footer'>Tiền hàng: <div>{`${productTotalMoney} VND`}</div></div>
                            <div className='d-flex money-footer'> Phí vận chuyển: <div>{`${order.moneyShip} VND`}</div></div>
                            <div className='d-flex money-footer'> Tiền giảm giá: <div>{`${order.moneyReduced} VND`}</div></div>
                            <div className='d-flex money-footer'>Tổng tiền: <div>{`${productTotalMoney + order.moneyShip + order.moneyReduced} VND`}</div></div>
                        </div>
                    </div>
                    <button className="btn  btn-dark" key="back" >
                        Xác nhận thanh toán
                    </button>
                </div>
            </div>
        </div>
    </div>
}

export default OrderContent;