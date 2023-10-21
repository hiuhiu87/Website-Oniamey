
import { Timeline, TimelineEvent } from '@mailtop/horizontal-timeline';
import { useEffect, useState } from 'react';
import { FaEye } from 'react-icons/fa';
import * as OrderApi from '../../../../../services/OrdersApi'
import * as OrderHistoryApi from '../../../../../services/OrderHistoryApi'
import { FaRegCalendarCheck, FaRegFileAlt, FaShippingFast } from 'react-icons/fa';
import { GiCancel } from 'react-icons/gi';
import { AiOutlineFileDone } from 'react-icons/ai';
import { BsFillCalendarCheckFill } from 'react-icons/bs';
import { useParams } from 'react-router-dom';
import './OrderDetail.scss'
const OrderContent = (props) => {
  const params = useParams();
  const [order, SetOrder] = useState({});
  const [history, setHistory] = useState([]);
  const detail = async () => {
    const result = await OrderApi.detail(params.id);
    SetOrder(result);
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
  console.log(order);
  useEffect(() => {
    getHistory();
    detail();
  }, []);
  const fomatDate = (time) => {
    const date = new Date(time);
    return `${date.getDate()}/${date.getMonth()}/${date.getFullYear()} ${date.getHours()}:${date.getDate()}`;
  }
  return <div className='manage-order-detail'>
    <div className='order-detail-title'>
      <div className="detail-title">
        <FaEye size={26} />  Hóa Đơn: {order.code ? order.code : null}
      </div>

      <div className='time-line-order-detail'>
        <Timeline minEvents={5} placeholder>
          {history.map((item, index) => {
            return <TimelineEvent key={index}
              color='#cc9966'
              icon={item.icon}
              title={item.status}
              subtitle={fomatDate(item.createdAt)}
            />
          })}
        </Timeline>
        <button type="button" class="btn order-detail-button-timeline btn-dark">Xác nhận</button>
        {/* <button type="button" class="btn btn-dark">Hủy</button> */}
      </div>
    </div>
  </div>
}

export default OrderContent;