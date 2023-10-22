import { Timeline, TimelineEvent } from '@mailtop/horizontal-timeline';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { Button, Modal, Input } from 'antd';
import { FaEye } from 'react-icons/fa';
import * as OrderApi from '../../../../../services/OrdersApi'
import * as OrderHistoryApi from '../../../../../services/OrderHistoryApi'
import { FaRegCalendarCheck, FaRegFileAlt, FaShippingFast } from 'react-icons/fa';
import { GiCancel } from 'react-icons/gi';
import { AiOutlineFileDone } from 'react-icons/ai';
import { BsFillCalendarCheckFill } from 'react-icons/bs';
import { useParams } from 'react-router-dom';
import './OrderDetail.scss'
const { TextArea } = Input;

const OrderContent = (props) => {
    const params = useParams();
    const [order, setOrder] = useState({});
    const [descript, setDescript] = useState('');
    const [history, setHistory] = useState([]);
    const detail = async () => {
        const result = await OrderApi.detail(params.id);
        setOrder(result);
    }
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
    }, []);
     
    const [newStatus,setNewStatus]=useState('');
    const [open, setOpen] = useState(false);
    const [openDetail, setOpenDetail] = useState(false);
    const showModal = (status) => {
        setNewStatus(status);
        setOpen(true);
    };
    const showOpenDetail = () => {
        setOpenDetail(true);
    };  
    const handleChangeStatus = async() => {
        const data={
            idOrder:params.id,
            actionDescription:descript,
            status:newStatus
        } 
        const result= await OrderHistoryApi.updateOrderStatus(data);
        getHistory();
        detail();
        if(result.length>0){
            toast.success("Thành công!");
        }else{
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
                        {order.status === 'PENDING' ? <button onClick={()=>{showModal('CONFIRMED')}} type="button" className="btn order-detail-button-timeline btn-dark">Xác nhận</button> : null}
                        {order.status === 'CONFIRMED' && order.type==='ONLINE'? <button onClick={()=>{showModal('SHIPPING')}} type="button" className="btn order-detail-button-timeline btn-dark">Giao hàng</button> : null}
                        {order.status === 'SHIPPING'&& order.type==='ONLINE'? <button onClick={()=>{showModal('SHIPPED')}} type="button" className="btn order-detail-button-timeline btn-dark">Đã giao</button> : null}
                        {order.status === 'SHIPPED' ||  order.type==='OFFLINE'? <button onClick={()=>{showModal('SUCCESS')}} type="button" className="btn order-detail-button-timeline btn-dark">Hoàn thành</button> : null}
                        {order.status === 'PENDING' || (order.status === 'CONFIRMED' && order.status==='CONFIRMED') ||order.status==="SHIPPING"? <button type="button" onClick={()=>{showModal('CANCEL')}} className="order-detail-button-cancel btn btn-dark">Hủy</button> : null}
                    </div>}
                    <button onClick={showOpenDetail} type="button" className="btn order-detail-button-history btn-dark">Lịch sử</button>
                </div>
                <div>
                    <Modal
                        open={open}
                        title="Xác nhận"
                        onCancel={()=>{setOpen(false)}}
                        footer={[
                            <button className="btn  btn-dark" key="back" onClick={handleChangeStatus}>
                                Xác nhận
                            </button>,
                        ]}
                    >
                        <TextArea style={{ height: '100px' }} placeholder='Mô tả' showCount maxLength={200} onChange={(e)=>{setDescript(e.target.value)}} /> <br /><br />
                    </Modal>
                    <Modal
                        open={openDetail}
                        title="Chi tiết"
                        onCancel={()=>{setOpenDetail(false)}}
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
                                    { history.length===0?<tr>
                                        <td>{`-`}</td>
                                        <td> </td>
                                        <td> </td>
                                        <td> </td>
                                        <td> </td>
                                    </tr>:null
                                    }
                                </tbody>
                            </table>
                        </div>
                    </Modal>
                </div>
            </div>
        </div>
    </div>
}

export default OrderContent;