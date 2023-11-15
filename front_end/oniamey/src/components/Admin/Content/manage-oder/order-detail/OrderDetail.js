import { Timeline, TimelineEvent } from '@mailtop/horizontal-timeline';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { Modal, Input, Select } from 'antd';
import { FaEye } from 'react-icons/fa';
import * as OrderApi from '../../../../../services/OrdersApi'
import * as OrderHistoryApi from '../../../../../services/OrderHistoryApi'
import * as OrderDetailApi from '../../../../../services/OrderDetailApi'
import * as OrderPaymentMethodApi from '../../../../../services/OrderPaymentMethodApi'
import { FaRegCalendarCheck, FaRegFileAlt, FaShippingFast } from 'react-icons/fa';
import { GiCancel } from 'react-icons/gi';
import { AiOutlineFileDone } from 'react-icons/ai';
import { BsFillCalendarCheckFill } from 'react-icons/bs';
import { useParams } from 'react-router-dom';
import './OrderDetail.scss'
import '../common/text-custom.scss'
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
    const [note, setNote] = useState('');
    const [money, setMoney] = useState(0);
    const [paymentMethod, setPaymentMethod] = useState(1);
    const handleThanhToan = async () => {
        const result = await OrderPaymentMethodApi.createOrderPaymentMethod({
            idOrder: params.id,
            description: note,
            idMethod: paymentMethod,
            money: money
        });
        if (result) {
            toast.success("Thanh toán thành công!");
        } else {
            toast.error("Thanh toán thất bại!");
        }
        setOpenThanhToan(false);
    }
    const [lichSuThanhToan, setLichSuThanhToan] = useState([]);
    const [openLichSuThanhToan, setOpenLichSuThanhToan] = useState(false);
    const handleLichSuThanhToan = async () => {
        setOpenLichSuThanhToan(true);
        const result = await OrderPaymentMethodApi.getOPM(params.id);
        setLichSuThanhToan(result);
    }
    const handleChange = (value) => {
        setPaymentMethod(value);
    };
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
    const [daThanhToan, setDaThanhToan] = useState(0);
    const handleXacNhanThanhToan = async () => {
        const result = await OrderPaymentMethodApi.getOPM(params.id);
        if (result) {
            setDaThanhToan(0);
            result.map(item => {
                setDaThanhToan(preValue => { return preValue + (+(item.soTienThanhToan)) })
            });
        }
        setOpenThanhToan(true)
    }
    useEffect(() => {
        getHistory();
        detail();
        getListProduct();
    }, []);
    const [newStatus, setNewStatus] = useState('');
    const [open, setOpen] = useState(false);
    const [openThanhToan, setOpenThanhToan] = useState(false);

    const [openDetail, setOpenDetail] = useState(false);
    const showModal = (status) => {
        setDescript('');
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
                        {(order.status === 'SHIPPED' && ((+(productTotalMoney) + (+(order.moneyShip)) + (+(order.moneyReduced))) - daThanhToan).toFixed(0) < 1) || (order.type === 'OFFLINE' && order.status === 'CONFIRMED' && ((+(productTotalMoney) + (+(order.moneyShip)) + (+(order.moneyReduced))) - daThanhToan).toFixed(0) < 1) ? <button onClick={() => { showModal('SUCCESS') }} type="button" className="btn order-detail-button-timeline btn-dark">Hoàn thành</button> : null}
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
                        <TextArea style={{ height: '100px' }} placeholder='Mô tả'
                            value={descript} showCount maxLength={200} onChange={(e) => { setDescript(e.target.value) }} /> <br /><br />
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
                    <div className='information-order-detail'>
                        <Row>
                            <Col xs lg={2}>
                                <div>Trạng thái:</div>
                                <div>Tên nhân viên: </div>
                                <div>Số điện thoại:</div>
                                <div>  {order.type === 'ONLINE' ? 'Ngày nhận dự kiến:' : null}</div>
                            </Col>
                            <Col className='price-col-order-detail2' xs lg={4}>
                                <div>{order.status === 'PENDING' ? "Chờ xác nhận" : null}
                                    {order.status === 'CONFIRMED' ? "Đã xác nhận" : null}
                                    {order.status === 'SHIPPING' ? "Đang giao" : null}
                                    {order.status === 'SHIPPED' ? "Đã giao" : null}
                                    {order.status === 'SUCCESS' ? "Hoàn thành" : null}
                                    {order.status === 'CANCEL' ? "Hủy" : null}</div>
                                <div>{order.tenNhanVien}</div>
                                <div>{order.phoneNumber || "-"}</div>
                                <div >{order.type === 'ONLINE' ? OrderApi.formatDateTime(order.shipDate) : null} </div>
                            </Col>
                            <Col xs lg={2}>
                                <div>Loại:</div>
                                <div>Tên khách hàng:</div>
                                <div>Ghi chú đơn hàng:</div>
                                <div>{order.type === 'ONLINE' ?
                                    'Địa chỉ: ' : null}</div>
                            </Col>
                            <Col xs lg={4} className='price-col-order-detail2'>
                                <div id={`text-id-${order.type}`}>{order.type === 'OFFLINE' ? "Tại quầy" : "Giao hàng"}   </div>
                                <div>{order.userName}</div>
                                <div>{order.type === 'ONLINE' ? order.address || "-" : null}</div>
                                <div>{order.note || "-"}   </div>
                            </Col>

                        </Row>
                    </div>
                    <div className='table-order-detail'>
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>STT</th>
                                    <th>Ảnh</th>
                                    <th>Tên Sản Phẩm</th>
                                    <th>Kích Cỡ</th>
                                    <th>Màu Sắc</th>
                                    <th>Số Lượng</th>
                                    <th>Đơn Giá</th>
                                    <th>Thành tiền</th>
                                </tr>
                            </thead>
                            <tbody>
                                {listProduct && listProduct.map((item, index) => {
                                    return (<tr key={index}>
                                        <td>{index + 1}</td>
                                        <td style={{width:'10px'}}><img src={`https://upload-product-image-file.s3.us-west-2.amazonaws.com/${item.img}`} width={80} height={80} /></td>
                                        <td>{item.productDetailName}</td>
                                        <td>{item.sizeName}</td>
                                        <td>{item.colorName}</td>
                                        <td>{item.quantity}</td>
                                        <td>{item.price}</td>
                                        <td>{item.totalMoney}</td>

                                    </tr>)
                                })}
                            </tbody>
                        </table>
                    </div>
                    <hr />
                    <div>
                        <Row>
                            <Col xs lg={2} className='money-footer-title'>
                                <div >Tiền hàng      :</div>
                                <div >Phí vận chuyển : </div>
                                <div >Giảm giá       : </div>
                                <div >Tổng tiền      : </div>
                            </Col>
                            <Col className='money-order-footer' xs lg={3}>
                                <div>{`${order && order.moneyReduced ? productTotalMoney.toFixed(2) : 0} VND`}</div>
                                <div>{`${order && order.moneyReduced ? order.moneyShip.toFixed(2) : 0} VND`}</div>
                                <div>{`${(order && order.moneyReduced ? (+(order.moneyReduced)).toFixed(2) : 0)} VND`}</div>
                                <div>{`${order && order.moneyReduced ? (+(productTotalMoney) + (+(order.moneyShip)) + (+(order.moneyReduced))).toFixed(0) : 0} VND`}</div>
                            </Col>
                            <Col className=' d-flex justify-content-center'>
                                <div className='btn-confirm-order-detail'>
                                    <div>
                                        {order.status === 'SUCCESS' || order.status === 'CANCEL' ? null : <button className="btn  btn-dark" onClick={handleXacNhanThanhToan}>
                                            Xác nhận thanh toán
                                        </button>}</div>
                                    <Modal
                                        open={openThanhToan}
                                        title="Xác nhận thanh toán"
                                        onCancel={() => { setOpenThanhToan(false) }}
                                        width={600}
                                        footer={[
                                            <button className="btn  btn-dark" key="back" onClick={handleThanhToan}>
                                                Xác nhận
                                            </button>,
                                        ]}
                                    >
                                        <div>Số tiền</div>
                                        <Input placeholder="Nhập số tiền" onChange={e => { setMoney(e.target.value) }} />
                                        <div>Mô tả</div>
                                        <TextArea style={{ height: '100px' }} placeholder='Mô tả' showCount maxLength={200} onChange={(e) => { setNote(e.target.value) }} /> <br /><br />

                                        <Row>
                                            <Col xs lg={6}>
                                                <div>Phương thức thanh toán</div>
                                                <Select
                                                    defaultValue="Tiền mặt"
                                                    style={{
                                                        width: 200,
                                                    }}
                                                    onChange={handleChange}
                                                    options={[
                                                        {
                                                            label: 'Phương thức thanh toán',
                                                            options: [
                                                                {
                                                                    label: 'Tiền mặt',
                                                                    value: 1,
                                                                },
                                                                {
                                                                    label: 'Chuyển khoản',
                                                                    value: 2,
                                                                },
                                                            ],
                                                        }
                                                    ]}
                                                /></Col>
                                            <Col xs lg={3}>
                                                <br />
                                                <div>Chưa thanh toán  </div>
                                                <div> Đã thanh toán    </div>
                                            </Col>
                                            <Col className='price-col-order-detail'>
                                                <br />
                                                <div>{`${((+(productTotalMoney) + (+(order.moneyShip)) + (+(order.moneyReduced))) - daThanhToan).toFixed(0)} VND`}</div>
                                                <div>{`${daThanhToan.toFixed(0)} VND`}</div>
                                            </Col>

                                        </Row>
                                    </Modal>
                                    <div>
                                        {order.status === 'SUCCESS' || order.status === 'CANCEL' ? null : <button className="btn  btn-dark" onClick={handleLichSuThanhToan}>
                                            Lịch sử thanh toán
                                        </button>}
                                        <Modal
                                            open={openLichSuThanhToan}
                                            title="Lịch sử thanh toán"
                                            onCancel={() => { setOpenLichSuThanhToan(false) }}
                                            footer={[]}
                                            width={800}
                                        >
                                            <hr />
                                            <Row>
                                                <Col xs lg={2}>
                                                    Số tiền
                                                </Col>
                                                <Col xs lg={3} >
                                                    Ngày thanh toán
                                                </Col>
                                                <Col xs lg={2}>
                                                    Phương thức
                                                </Col>
                                                <Col xs lg={3}>
                                                    Nhân viên xác nhận
                                                </Col>
                                                <Col xs lg={2}>
                                                    Ghi chú
                                                </Col>
                                            </Row>
                                            <hr />
                                            {lichSuThanhToan && lichSuThanhToan.map((item, index) => {
                                                return <Row key={index}>
                                                    <Col xs lg={2}> {`${item.soTienThanhToan} VND`} </Col>
                                                    <Col xs lg={3}> {OrderApi.formatDateTime(item.ngayThanhToan)} </Col>
                                                    <Col xs lg={2}> {item.methodName} </Col>
                                                    <Col xs lg={3}> {item.tenNhanVien} </Col>
                                                    <Col xs lg={2}> {item.note} </Col>
                                                </Row>
                                            })}
                                        </Modal>
                                    </div>
                                </div>
                            </Col>
                        </Row>
                    </div>
                </div>

            </div>
        </div >
    </div >

}

export default OrderContent;